import { Backdrop, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import React from 'react'
import classes from './Modal.module.css'
import CircularProgress from '@material-ui/core/CircularProgress';

export const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: '500',
        color: '#fff',
    },
    button: {
        margin: theme.spacing(1,1,1,1)
    }
}))

const Modal = (props) => {
    const muiClasses = useStyles();

    let components = props.loading ? <CircularProgress size='8rem' color="secondary" /> : <div><div>
                                                                                                {props.children}
                                                                                            </div>
                                                                                            <div>
                                                                                                <Button className={muiClasses.button}
                                                                                                    onClick={props.summit} 
                                                                                                    variant="contained"
                                                                                                    color="primary">Potwierdź</Button>
                                                                                                <Button className={muiClasses.button}
                                                                                                    onClick={props.clicked} 
                                                                                                    variant="outlined"
                                                                                                    color="primary">Wróć do formularza</Button>
                                                                                            </div></div>
    return (
        <div>
            <Backdrop open={props.backdropOpen} onClick={props.clicked} className={muiClasses.backdrop}>
            </Backdrop>
            <div style={{ transform: props.backdropOpen ? 'translateY(0)' : 'translateY(-100vh)',
                            opacity: props.backdropOpen ? '1' : '0',
                            width: props.loading ? '30%': '50%',
                            top: props.loading ? '35%' : '25%',
                            left: props.loading ? '35%': '25%'
                            }} className={classes.Modal}>
                {components}
            </div>
        </div>
    )
}

export default Modal;