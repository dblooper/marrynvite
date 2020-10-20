import fs = require('fs');
import csv = require('csv-parser');
import {CsvUser} from '../csvObjects/CsvUser';
import {User} from "../entity/User";
import utils = require("../utils/Utils");

const CSV_FILE_PATH: string = __dirname + `/../../public/sourceData/invite.csv`;

export class CsvService {
    
    async run() { 
        return new Promise<User[]>(function(resolve, reject) {
            const myArray:User[] = [];
            fs.createReadStream(CSV_FILE_PATH)
            .pipe(csv({separator: ';'}))
            .on('data', (row) => { 
                let converted = (row as unknown as CsvUser);
                if(converted) {
                    let user = new User();
                    user.id =  utils.generateUniqueKey();
                    user.firstname = converted.firstname.trim();
                    user.lastname = converted.surname.trim();
                    user.partnerName = converted.partnerName.trim();
                    user.phoneNo = converted.phoneNo.trim();
                    user.quantity = parseInt(converted.quantity.trim());
                    user.expectedAccQty = parseInt(converted.expectedAccQty.trim());
                    myArray.push(user);
                }
            })
            .on('end', () => {
                console.log('CSV file processed successfully')
                resolve(myArray);
            })
            .on('error', () => {
                console.log("Problem occured when retrieving data from csv")
                return reject
            });
        })
        
    }

}
