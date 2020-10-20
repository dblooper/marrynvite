import {getRepository} from 'typeorm'
import {NextFunction, Request, Response} from 'express';
import {UpdateStatus} from '../dto/UpdateStatus'

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
        console.log(users.map(user => JSON.stringify(user)))
        return users;
    }

    async findById(req: Request, res: Response, next: NextFunction) {
        console.info(`Find user by id call: ${req.params.id}`)
        let result = await this.userRepository
                    .createQueryBuilder("user")
                    .where("user.id = :id", {id: req.params.id})
                    .getOne();
        
        return result;
    }

    async saveConfirmation(req: Request, res:Response, next: NextFunction) {
        let user = undefined;
        if(req.body.id) {
            user = await this.userRepository
            .createQueryBuilder("user")
            .where("user.id = :id", {id: req.body.id})
            .getOne();
            user.confirmed = req.body.confirmed;
            user.confirmationDate = new Date();
            await this.userRepository.save(user);
        }
        return new UpdateStatus("Confirmed", req.body.id, req.body.confirmed);
    }
}