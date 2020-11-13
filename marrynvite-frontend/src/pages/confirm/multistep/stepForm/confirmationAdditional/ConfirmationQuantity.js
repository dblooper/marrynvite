import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import { useStyles } from '../ConfirmationDetails';

const person = [
    {
      value: '2',
      label: 'Z partnerem',
    },
    {
      value: '1',
      label: 'Bez partnera',
    }
]

const ConfirmationQuantity = ({formData, setForm, navigation}) => {
    const muiClasses = useStyles();
    const [helpQtyText, setHelpQtyText] = useState('Wybierz jedną z opcji powyżej');
    const [confQty, setConfQty] = useState(formData.confirmedQty);
    const handleQtyChange = (event) => {
        setForm(event);
        setConfQty(event.target.value);
        if(confQty !== '') { 
            setHelpQtyText(' ')
        }
    }
    
    return (
        <div>
            <h3 style={{display:'block',margin: "0 0 1rem 0", textDecoration: "underline"}}>{confQty === '2' ? 'Super że będziecie!': 'Super że będziesz!'}</h3>
            <TextField
                                        id="outlined-select-confirm"
                                        select
                                        label="Będę..."
                                        defaultValue={formData.confirmedQty}
                                        name="confirmedQty"
                                        onChange={handleQtyChange}
                                        variant="outlined"
                                        className={muiClasses.helper}
                                    >
                                        {person.map((option) => (
                                        <option key={option.value} value={option.value}>
                                        {option.label}
                                        </option>
                                    ))}
                                    </TextField>
            <FormHelperText className={muiClasses.helper}>{helpQtyText}</FormHelperText>
        </div>
    )
}

export default ConfirmationQuantity
