import React from 'react'
import classes from './ConfirmControl.module.css'
import Form from '../form/Form'

const ConfirmControl = (props) => {
    return(
        <div>
            <Form title="Podstawowe potwierdzenie">
                <div>
                    <input type="radio" id="confirm" name="confirmation" value="confirm"></input>
                    <label for="confirm">Potwierdzam przybycie</label>
                </div>
                <div className={classes.PartlyConfirm}>
                    <div>
                        <input type="radio" id="partlyConfirm" name="confirmation" value="partlyConfirm"></input>
                        <label for="partlyConfirm">Potwierdzam przybycie, ale będzie nas mniej.</label>
                    </div>
                    <div className={classes.Indend}>
                        <label for="partlyConfirm">Liczba osób: </label>
                        <input type="number" id="partlyConfirm" min="1" max={props.maxQty} disabled></input>
                    </div>
                </div>
                <div>
                    <input type="radio" id="reject" name="confirmation" value="reject"></input>
                    <label for="reject">Nie dam rady przyjechać</label>
                </div>
            </Form>

        </div>
    );
}
export default ConfirmControl;