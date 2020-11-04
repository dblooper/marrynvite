import React from 'react';
import classes from './AccControl.module.css'
import Form from '../form/Form'

const AccControl = (props) => {
    return(
        <div>
            <Form title="Zakwaterowanie i nocleg">
                <div>
                    <input type="radio" id="accTrue" name="accomodation" value="true"></input>
                    <label for="accTrue">Nie potrzebujemy noclegu</label>
                </div>
                <div>
                    <input type="radio" id="accFalse" name="accomodation" value="false"></input>
                    <label for="accFalse">Tak, będziemy nocować</label>
                </div>
            </Form>
        </div>
    );
}

export default AccControl;