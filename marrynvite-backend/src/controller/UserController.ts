import {getRepository} from 'typeorm'
import {NextFunction, Request, Response} from 'express';
import {UpdateStatus} from '../dto/UpdateStatus'
import {UserData} from '../dto/UserData'
import {UserDataBuilder} from '../dto/UserDataBuilder'
import {User} from '../entity/User'

export class UserController {
    private userRepository = getRepository(User);

    async all(req: Request, res: Response, next: NextFunction) {
        console.info("Retrieve users call...")
        const users = (await this.userRepository.find()).map(user => {
                                                                return {name: user.firstname
                                                                        ,surname: user.lastname
                                                                        ,partnerName: user.partnerName
                                                                        ,confirmed: user.confirmed
                                                                        ,confirmedQty: user.confirmedQty
                                                                        ,confirmationDate: user.confirmationDate
                                                                        ,created: user.insertDate
                                                                        ,lastVisit: user.lastVisitDate
                                                                    }
                                                            }
                                                    );
        //console.log(users.map(user => JSON.stringify(user)))
        return users;
    }

    async findByAuthData(req: Request, res: Response, next: NextFunction) {
        let result: User;
        console.info(`User: ${req.query.firstname} authorization`)
        if(req.query.id && req.query.firstname) {
            result = await this.userRepository
                                .createQueryBuilder("user")
                                .where("user.id = :id", {id: req.query.id})
                                .getOne();
            if(result !== undefined && req.query.firstname === result.firstname) {
                console.info(`User: ${result.firstname} ${result.lastname} found!`)
                let user: UserData = new UserDataBuilder()
                                        .clientName(result.firstname)
                                        .clientPartnerName(result.partnerName === "?" ? "" : result.partnerName)
                                        .confirmed(result.confirmed)
                                        .confirmedQty(result.confirmedQty)
                                        .accomodationQty(result.accomodationQty)
                                        .expectedAccQty(result.expectedAccQty)
                                        .confirmAccomodation(result.accomodationQty > 0 ? 1 : 0)
                                        .dishesForMe(result.dishesForFirstPerson)
                                        .dishesForPartner(result.dishesForSecondPerson)
                                        .comment(result.comment)
                                        .confirmationDate(result.confirmationDate)
                                        .confirmationDueDate(result.confirmationDate)
                                        .build();
                return user;
            }
        }
        return {error: 0, errorMessage: "User does not exist"};
    }

    async findById(req: Request, res: Response, next: NextFunction) {
        console.info(`Find user by id call: ${req.params.id}`)
        let result = await this.userRepository
                    .createQueryBuilder("user")
                    .where("user.id = :id", {id: req.params.id})
                    .getOne();
        
        return result;
    }

    async saveCancelation(req: Request, res: Response, next: NextFunction) {
        let input = {
            id: req.body.id,
            firstname: req.body.firstname
        }
        console.info('Cancelation start');
        let user = undefined;
        if(req.body.id) {
            user = await this.userRepository
                                .createQueryBuilder("user")
                                .where("user.id=:id", {id: req.body.id})
                                .getOne();
            if(user.firstname && user.firstname === req.body.firstname) {
                if(user.confirmed === -1) {
                    return {error: 5, errorMessage: "User did not confirm the invitation. Cannot cancel it."}
                }
                if(user.confirmed === 0) {
                    return {error: 5, errorMessage: "User have already cancelled the invitation!"}
                }
                user.confirmed = 0;
                user.confirmedQty = -1;
                user.dishesForFirstPerson = -2;
                user.dishesForSecondPerson = -2;
                user.accomodationQty = -1;
                user.comment = '';
                user.updateDate = new Date();
                await this.userRepository.save(user);
                console.info('User ' + user.firstname + ' ' + user.lastname + ' has canceled the invitation')
                return new UpdateStatus("Confirmation cancelled!", req.body.id, req.body.firstname, req.body.confirmed);
            }
        }
        return {error: 1, errorMessage: "Problem with invitation cancelation. User does not exist"};
    }

    async saveConfirmation(req: Request, res:Response, next: NextFunction) {
        console.info('Update invitation start')
        let user = undefined;
        let errorFields = [];
        if(req.body.id) {
            user = await this.userRepository
            .createQueryBuilder("user")
            .where("user.id = :id", {id: req.body.id})
            .getOne();
            if(user.firstname && user.firstname === req.body.firstname) {
                if(!req.body.confirmed || req.body.confirmed.length === 0 || (parseInt(req.body.confirmed) !== 1
                                            && parseInt(req.body.confirmed) !== 0)) {
                    errorFields.push('confirmed')
                }
                user.confirmed = parseInt(req.body.confirmed);
                if(user.confirmed === 1) {

                    if((!req.body.confirmedQty || req.body.confirmedQty.length === 0 || parseInt(req.body.confirmed) < 0
                                                    || parseInt(req.body.confirmed) > 2
                    )) {
                        errorFields.push('confirmedQty')
                    }
                    if(!req.body.partnerName || req.body.partnerName.length === 0) {
                        errorFields.push('partnerName')
                    }
                    if(!req.body.accomodationQty || req.body.accomodationQty.length === 0 || parseInt(req.body.accomodationQty) > 2 || parseInt(req.body.accomodationQty) < 0) {
                        errorFields.push('accomodationQty')
                    }
                    if(!req.body.dishesForFirstPerson || req.body.dishesForFirstPerson.length === 0 || parseInt(req.body.dishesForFirstPerson) > 2 || parseInt(req.body.dishesForFirstPerson) < -1) {
                        errorFields.push('dishesForFirstPerson')
                    }
                    if(!req.body.dishesForSecondPerson || req.body.dishesForSecondPerson.length === 0 || parseInt(req.body.dishesForSecondPerson) > 2 || parseInt(req.body.dishesForSecondPerson) < -1) {
                        errorFields.push('dishesForSecondPerson')
                    }
                    if(errorFields.length > 0) {
                        return {error: 2, errorMessage: "Problem with confimration update.Erroneous fields: " + errorFields.join(', ')};
                    }
                    if(parseInt(req.body.confirmed) === 1) {
                        user.confirmedQty = parseInt(req.body.confirmedQty);
                        user.partnerName = req.body.partnerName;
                        user.accomodationQty = parseInt(req.body.accomodationQty);
                        user.dishesForFirstPerson = parseInt(req.body.dishesForFirstPerson);
                        user.dishesForSecondPerson = parseInt(req.body.dishesForSecondPerson);
                    } else {
                        user.confirmedQty = -1;
                        user.partnerName = '?';
                        user.accomodationQty = -1;
                        user.dishesForFirstPerson = -2;
                        user.dishesForSecondPerson = -2;
                    }
                   
                }
                if(errorFields.length > 0) {
                    return {error: 2, errorMessage: "Problem with confimration update.Erroneous fields: " + errorFields.join(', ')};
                }
                user.comment = req.body.comment;
                user.confirmationDate = new Date();
                user.updateDate = new Date();
                await this.userRepository.save(user);
                console.info('User ' + user.firstname + ' ' + user.lastname + ' has confirmed the invitation')
                return new UpdateStatus("Confirmed", req.body.id, req.body.firstname, req.body.confirmed);
            }
        }
        return {error: 1, errorMessage: "Problem with confimration update. User does not exist"};
        
    }
}