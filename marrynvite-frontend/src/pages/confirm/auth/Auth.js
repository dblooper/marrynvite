import React from 'react'
import classes from './Auth.module.css'
import Form from '../form/Form'

const Auth = (props) => {
    return(
        <Form title="Pozwól nam Ciebie zidentyfikować">
            <div>
                <label for="authId">Wpisz imię pierwszej osoby z zaproszenia: </label>
                <input type="text" id="authName" name="authName" required></input>
            </div>
            <div>
                <label for="authId">Wpisz numer zaproszenia: </label>
                <input type="text" id="authId" name="authId" required></input>
            </div>
        </Form>
    )
}
export default Auth;