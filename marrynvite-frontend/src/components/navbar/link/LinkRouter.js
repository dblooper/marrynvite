import React from 'react'
import classes from './LinkRouter.module.css'
import {NavLink} from 'react-router-dom'
import { Link } from 'react-scroll';

const LinkRouter = (props) => {
    let linkToRender;
    let classesAppended;
    if(props.additionalClasses) {
        classesAppended = [classes.Link];
        props.additionalClasses.split(',').forEach(
            el => classesAppended.push(classes[el])
        )
        classesAppended = classesAppended.join(' ');
    } else {
        classesAppended = classes.Link;
    }

    if(props.local) {
        linkToRender = <Link className={classesAppended} to={props.link} smooth={true} spy={true} duration={800}>{ props.children }</Link>
    } else {
        linkToRender = <NavLink 
            className={classesAppended}
            to={props.link}
            exact={props.exact}
            activeClassName={classes.active}>{ props.children }
        </NavLink>
    }

    return(
       {...linkToRender}
    )
}

export default LinkRouter