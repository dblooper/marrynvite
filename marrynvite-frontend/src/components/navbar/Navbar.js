import React, {useState, useEffect} from 'react'
import classes from './Navbar.module.css'
import LinkRouter from './link/LinkRouter'

const Navbar = (props) => {
    const [classesAppended, appendFunction] = useState([classes.Navbar])
    const [linkClasses, linkFunct] = useState([''])
    useEffect(() => {
        const changeClass = () => {
            if(window.pageYOffset <= 350) {
                if(classesAppended !== classes.Navbar) {
                    appendFunction([classes.Navbar])
                    linkFunct(['Navbar'])
                }
            } else if(window.pageYOffset > 150) {
                appendFunction([classes.SideNav]);
                linkFunct(['LinkSide'])
            }
        }
        window.addEventListener('scroll', changeClass);
        return () => window.removeEventListener('scroll', changeClass)
    })

    return(
        <div className={classesAppended.join(' ')}>
            <div className={classes.Up}>
                <LinkRouter local={true} link="jumbo" smooth={true} spy={true} duration={800} additionalClasses={'Up,' + linkClasses.join(',')}>Do góry</LinkRouter>
            </div>
            <ul>   
                {window.location.pathname === '/signup' ? 
                <LinkRouter link="/" additionalClasses={linkClasses.join(',')} >Strona główna</LinkRouter> : <LinkRouter link="/signup" additionalClasses={'SignUp,' + linkClasses.join(',')} >Potwierdź zaproszenie</LinkRouter>
                }
                {window.location.pathname === '/' ? <LinkRouter local={true} link="wedding" smooth={true} spy={true} duration={800} additionalClasses={linkClasses.join(',')}>Miejsce zaślubin</LinkRouter> : ''}
                {window.location.pathname === '/' ? <LinkRouter local={true} link="party" smooth={true} spy={true} duration={800} additionalClasses={linkClasses.join(',')}>Gdzie się bawimy</LinkRouter> : ''}
                {window.location.pathname === '/myplace' ? 
                <LinkRouter link="/" additionalClasses={linkClasses.join(',')} >Strona główna</LinkRouter> : <LinkRouter link="/myplace" additionalClasses = {linkClasses.join(',')}>Mój stolik</LinkRouter>
                }
            </ul>
        </div>
    )
}

export default Navbar;