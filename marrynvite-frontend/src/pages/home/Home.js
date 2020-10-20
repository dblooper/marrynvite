import React from 'react'
import classes from './Home.module.css'
import Logo from './logo/Logo'
import Counter from '../../components/items/counter/Counter'
import Cardboard from '../../components/cardboard/Cardboard'
import Locations from '../../components/locations/Locations'

const Home = (props) => {
    let locationCB =  
    [<div id="wedding"><Locations 
    // orderNumber="1"
    title="Ceremonia ślubna"
    what="Nasz ślub"
    place="Parafii w Krakowskich Dębnikach"
    link="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10247.831803029063!2d19.9273442!3d50.049619!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x3c8e5127f84d8d7!2zS2_Fm2Npw7PFgiDFm3cuIFN0YW5pc8WCYXdhIEtvc3RraSB3IETEmWJuaWthY2g!5e0!3m2!1spl!2spl!4v1603135747685!5m2!1spl!2spl"/>
    </div>,
    <div id="party"><Locations 
    // orderNumber="2"
    title="Gdzie się bawimy?"
    what="Nasze wesele"
    place="Chochołowym Dworze w miejscowości Jerzmanowice"
    link="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d40856.742929655586!2d19.741348993335375!3d50.207008511355184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xa33e5d3d5eaafa31!2zQ2hvY2hvxYJvd3kgRHfDs3I!5e0!3m2!1spl!2spl!4v1603133588454!5m2!1spl!2spl"/>
    </div>
    ]
    return(<div>
        <div className={classes.Logo}>
            <Logo/> 
        </div>
        <hr className={classes.Hr}/>
        <Counter/>
        <Cardboard>{locationCB}</Cardboard>
        </div>
    )
}

export default Home;