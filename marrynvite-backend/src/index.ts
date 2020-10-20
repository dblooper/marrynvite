import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./entity/User";
import * as express from "express";
import * as bodyParser from "body-parser"
import {Routes} from './routes'
import {Request, Response} from "express";
import short = require('short-uuid');
import {CsvService} from './service/CsvService'

const PORT: number = parseInt(process.env.port) || 8080;
const csvService = new CsvService();

createConnection().then(async connection => {
    console.log("Connected to db")
    connection.createQueryBuilder().delete().from(User).execute();

    const app = express();
    app.use(bodyParser.json());

    Routes.forEach(route => {
        (app as any)[route.method](route.route, 
            (req: Request, res: Response, next: Function) => {
                    const result = (new (route.controller as any))[route.action](req, res, next);
                    if(result instanceof Promise) {
                        result.then(result => {
                            if(result !== null && result !== undefined) {
                                res.status(route.status)
                                res.send(result)
                             } else {
                                res.status(404);
                                res.send({message: "error!"})
                             }
                        })
                    } else if(result !== null && result !== undefined) {
                        res.status(route.status)
                        res.json(result);
                    }
            }
        )
    })
    console.log("Routes estabilished")
    
    console.info("Retrieving data from csv...")
    const retirevedArray: User[] = await csvService.run();
    console.log('Processing data read from csv:');
    for(let member of retirevedArray) {
        console.log(member.firstname + " " + member.lastname);
        await connection.manager.save(member);
        console.log(`Member ${member.firstname} ${member.lastname} has been added to db.`) 
    }
    console.info("Processing finished.")

    app.listen(PORT, () => console.log(`App listening at port ${PORT}`));
}).catch(error => console.log(error));



