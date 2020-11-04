import React, {useEffect, useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import classes from './Accomodation.module.css';

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
}))
const accomodations = [
    {
      value: '2',
      label: 'Dwa',
    },
    {
      value: '1',
      label: 'Jeden',
    }
]
const Accomodation = ({formData, setForm}) => {   
    const muiClasses = useStyles();
    const [value, setValue] = React.useState('');
    const [accqty, accQtyChange] = React.useState(formData.confirmAccQty)
    const [error, setError] = React.useState(false);
    const [helperText, setHelperText] = React.useState('Wybierz jedną z dwóch opcji powyżej') 
    const [components, setComponents] = useState(<div></div>);

    const handleAccChange = (event) => {
        setForm(event);
        accQtyChange(event.target.value)
    }

    const handleRadioChange = (event) => {
        setForm(event);
        setValue(event.target.value);
        event.target.value === 'true' ? setComponents(<TextField
                        id="outlined-select-accomodation"
                        select
                        label="Wybierz liczbę noclegów"
                        defaultValue={accqty}
                        name="confirmAccQty"
                        onChange={handleAccChange}
                        variant="outlined"
                    >
                        {accomodations.map((option) => (
                        <option key={option.value} value={option.value}>
                        {option.label}
                        </option>
                    ))}
                    </TextField>) : setComponents(<div></div>);
        setHelperText(' ');
        setError(false);
    }
    
    return (
            <FormControl component="fieldset"
                        error={error}
                        className={muiClasses.formControl}>
                <FormLabel className={muiClasses.radioControl} component="legend">Czy potrzebujecie noclegu?</FormLabel>
                <RadioGroup aria-label="confirmAccomodation" 
                            name="confirmAccomodation" 
                            value={value}
                            onChange={handleRadioChange}
                >
                    <FormControlLabel value="true" control={<Radio />} label="Tak, potrzebujemy noclegu" />
                    <FormControlLabel value="false" control={<Radio />} label="Nie potrzebujemy nocować" />
                </RadioGroup>
                <FormHelperText>{helperText}</FormHelperText>
                {components}
            </FormControl>
    )
}

export default Accomodation
