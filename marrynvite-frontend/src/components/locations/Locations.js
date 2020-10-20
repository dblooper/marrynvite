import React from 'react'
import classes from './Locaitons.module.css'

const Locations = (props) => {
    return(<div className={classes.Locations}>
                <p>{props.orderNumber}</p>
                <p className={classes.Title}>{props.title}</p>
                <p>{props.what} odbędzie się w {props.place}.<br/>
                Wszelkie informacje dotyczące dojazdu i lokalizacji można znaleźć na mapie poniżej
                </p>
                <iframe class={classes.Map} src={props.link} width="600" height="450" frameborder="0" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
            </div>)
}

export default Locations;