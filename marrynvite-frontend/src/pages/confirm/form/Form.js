import React from 'react'
import classes from './Form.module.css'

const Form = (props) => {
    return(
    <div className={classes.Form}>
        <p>{props.title}</p>
        <div className={classes.Content}>
            {props.children}
        </div>
    </div>
    );
}

export default Form;