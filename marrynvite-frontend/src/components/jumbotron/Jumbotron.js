import React, {useState, useEffect} from 'react';
import classes from './Jumbotron.module.css'
import Navbar from '../navbar/Navbar'
import CornerFlowers from '../../corner_flower_trim2.png'
import CornerFlowers2 from '../../corner_flower.png'
import CenterFlower from '../../center_flower.png'

const Jumbotron = (props) => {

    return(
        <div className={classes.Jumbotron}>
            <div className={[classes.Photos, classes[props.additional]].join(' ')}>
                <img className={classes.LeftCorner} src={CornerFlowers2}></img>
                <img className={classes.RightCorner} src={CornerFlowers}></img>
            </div>
            <div className={classes.Nav}>
                <Navbar/>
            </div>
            <div className={classes.CenterFlower}>
                <img className={classes.CenterFlowerSize} src={CenterFlower}></img>
            </div>
            <div className={[classes.Children, classes[props.additional ? 'DistanceZero' : '']].join(' ')}>
                {props.children}
            </div>
        </div>
    )
}

export default Jumbotron;