import React from 'react';
import classes from './CounterItem.module.css'

const CounterItem = (props) => {
    return(
        <div className={classes.CounterItem}>
            <p className={classes.Number}>
                {props.number}
            </p>
            <p className={classes.StringPeriod}>
                {props.stringPeriod}
            </p>
        </div>
    )
}

export default CounterItem;