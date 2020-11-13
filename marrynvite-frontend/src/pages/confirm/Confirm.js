import React from 'react'
import Cardboard from '../../components/cardboard/Cardboard'
import classes from './Confirm.module.css'
import ConfirmControl from './confirmControl/ConfirmControl'
import AccControl from './accControl/AccControl'
import Menu from './menu/Menu'
import Auth from './auth/Auth'
import { MultiStepForm } from './multistep/MultiStepForm'

const Confirm = (props) => {
    return(
        <div>
            <Cardboard specialClass="Cardboard-confirm">
                <div  style={{margin: '2rem'}}>
                    <MultiStepForm initial={0}/>
                </div>
            </Cardboard>
        </div>
    )
}

export default Confirm