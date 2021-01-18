import {UserData} from './UserData'

export class UserDataBuilder {
    private readonly _userData: UserData;

    constructor() {
        this._userData = {
            clientName: "",
            clientLastname: "",
            clientPartnerName: "",
            confirmed: 0,
            confirmedQty: 0,
            expectedAccQty: 0,
            confirmAccomodation: 0,
            accomodationQty: 0,
            dishesForMe: 0,
            dishesForPartner: 0,
            comment: "",
            confirmationDate: new Date,
            confirmationDueDate: new Date
        };
    }

    clientName(clientName: string): UserDataBuilder {
        this._userData.clientName = clientName;
        return this;
    }

    clientLastname(clientLastname: string): UserDataBuilder {
        this._userData.clientLastname = clientLastname;
        return this;
    }

    clientPartnerName(clientPartnerName: string): UserDataBuilder {
        this._userData.clientPartnerName = clientPartnerName;
        return this;
    }

    confirmed(confirmed: number): UserDataBuilder {
        this._userData.confirmed = confirmed;
        return this;
    }

    confirmedQty(confirmedQty: number): UserDataBuilder {
        this._userData.confirmedQty = confirmedQty;
        return this;
    }

    expectedAccQty(expectedAccQty: number): UserDataBuilder {
        this._userData.expectedAccQty = expectedAccQty;
        return this;
    }

    confirmAccomodation(confirmAccomodation: number): UserDataBuilder {
        this._userData.confirmAccomodation = confirmAccomodation;
        return this;
    }

    accomodationQty(accomodationQty: number): UserDataBuilder {
        this._userData.accomodationQty = accomodationQty;
        return this;
    }

    dishesForMe(dishesForMe: number): UserDataBuilder {
        this._userData.dishesForMe = dishesForMe;
        return this;
    }

    dishesForPartner(dishesForPartner: number): UserDataBuilder {
        this._userData.dishesForPartner = dishesForPartner;
        return this;
    }

    comment(comment: string): UserDataBuilder {
        this._userData.comment = comment;
        return this;
    }

    confirmationDate(confirmationDate: Date): UserDataBuilder {
        this._userData.confirmationDate = confirmationDate;
        return this;
    }

    confirmationDueDate(confirmationDueDate: Date): UserDataBuilder {
        this._userData.confirmationDueDate = confirmationDueDate;
        return this;
    }

    build(): UserData {
        return this._userData;
    }
}