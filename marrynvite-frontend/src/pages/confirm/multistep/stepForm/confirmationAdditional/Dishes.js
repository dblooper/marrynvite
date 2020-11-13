import React, {useEffect, useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import classes from './Dishes.module.css';

export const DISHES_ARRAY = {
    "-1": "Brak, tej osoby nie będzie",
    "0": "Dania tradycyjne",
    "1": "Dania wegetariańskie",
    "2": "Dania wegańskie"
}

const useStyles = makeStyles((theme) => ({
    formControl: {
        marginTop: theme.spacing(0),
        marginBottom: theme.spacing(2),
        marginLeft: theme.spacing(0),
        marginRight: theme.spacing(0)
    },
    radioControl: {
        textAlign: 'left',
        fontSize: '1.2rem'
    },
    dishPersonLabel: {
        textAlign: 'left',
        fontSize: '1.05rem'
    },
}))
const Dishes = ({formData, setForm}) => {
    
    const muiClasses = useStyles();
    const [dishesForMe, setdishesForMe] = React.useState('');
    const [dishesForPartner, setdishesForPartner] = React.useState('');
    const [error, setError] = React.useState(false);
    const [helperPartnerText, sethelperPartnerText] = React.useState('Wybierz jedną z trzech opcji powyżej') 
    const [helperMeText, setHelperMeText] = React.useState('Wybierz jedną z trzech opcji powyżej') 
    const [components, setComponents] = useState(<div></div>);
    const [confirmedQty, setConfirmedQty] = useState(formData.confirmedQty)
    const handledishesForMe = (event) => {
        setForm(event);
        setdishesForMe(event.target.value);
        setHelperMeText(' ');
        setError(false);
    }

    const handledishesForPartner = (event) => {
        setForm(event);
        setdishesForPartner(event.target.value);
        sethelperPartnerText(' ');
        setError(false);
        console.log('LOLOLO:' + formData.confirmedQty)
    }
    
    useEffect(() => {
        setConfirmedQty(formData.confirmedQty)
        console.log('Updated')
    }, [formData.confirmedQty])

    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            <FormControl component="fieldset"
                        error={error}
                        className={muiClasses.formControl}>
                <FormLabel className={muiClasses.radioControl} component="legend">Jakie dania preferujecie?</FormLabel>
                <hr/>
                <FormLabel className={muiClasses.dishPersonLabel} component="legend">Dla {formData.clientName}</FormLabel>
                <RadioGroup aria-label="dishesForMe" 
                            name="dishesForMe" 
                            value={dishesForMe}
                            onChange={handledishesForMe}
                >
                    <FormControlLabel value="0" control={<Radio />} label={DISHES_ARRAY[0]} />
                    <FormControlLabel value="1" control={<Radio />} label={DISHES_ARRAY[1]} />
                    <FormControlLabel value="2" control={<Radio />} label={DISHES_ARRAY[2]} />
                    <FormControlLabel value="-1" control={<Radio />} label={DISHES_ARRAY[-1]} />
                </RadioGroup>
                <FormHelperText>{helperMeText}</FormHelperText>
            </FormControl>
            <FormControl component="fieldset"
                        error={error}
                        className={muiClasses.formControl}>
                <FormLabel className={muiClasses.dishPersonLabel} component="legend">Dla {formData.clientPartnerName !== '' ? formData.clientPartnerName : 'osoby towarzyszącej'}</FormLabel>
                <RadioGroup aria-label="dishesForPartner" 
                            name="dishesForPartner" 
                            value={dishesForPartner}
                            onChange={handledishesForPartner}
                >
                    <FormControlLabel value="0" control={<Radio />} label={DISHES_ARRAY[0]} />
                    <FormControlLabel value="1" control={<Radio />} label={DISHES_ARRAY[1]} />
                    <FormControlLabel value="2" control={<Radio />} label={DISHES_ARRAY[2]} />
                    <FormControlLabel value="-1" control={<Radio />} label={DISHES_ARRAY[-1]} />
                </RadioGroup>
                <FormHelperText>{helperPartnerText}</FormHelperText>
            </FormControl>
        </div>
    )
}

export default Dishes
