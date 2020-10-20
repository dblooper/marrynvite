import React from 'react'
import classes from './Cardboard.module.css'

const Cardboard = (props) => {
    return(<div className={classes.Cardboard}>
        {props.children}
    </div>)
}

export default Cardboard