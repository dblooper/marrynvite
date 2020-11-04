import React from 'react'
import classes from './Cardboard.module.css'

const Cardboard = (props) => {
    let specialClass = ['Cardboard'];
    if(props.specialClass) {
        specialClass = [specialClass , ...props.specialClass.split(',')];
    }

    return(<div className={specialClass.map(s => classes[s]).join(' ')}>
        {props.children}
    </div>)
}

export default Cardboard