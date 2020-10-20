import React from 'react'
import LogoImg from '../../../logo.png'
import classes from './Logo.module.css'

const Logo = (props) => {
    return(
        <div className={classes.Logo}>
            <img src={LogoImg} alt="Wedding logo"></img>
            <p>Pobieramy się!</p>
            <p className={classes.Desc}>Pragniemy, abyście razem z nami przeżyli chwile naszych zaślubin.<br/>Serdecznie zapraszamy i prosimy o potwierdzenie przybycia.</p>
        </div>
    )
}

export default Logo;