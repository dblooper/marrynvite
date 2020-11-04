import React, {useEffect, useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import MaterialWrapper from '../../../../components/materialUI/MaterialWrapper';
import Button from '@material-ui/core/Button';
import Accomodation from './confirmationAdditional/Accomodation'
import Dishes from './confirmationAdditional/Dishes';
import TextField from '@material-ui/core/TextField';

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

export const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        alingItems: 'center',
        width: '70%'
    },
    radioControl: {
        textAlign: 'left',
        fontSize: '1.2rem'
    },
    helper: {
        margin: '0',

    },
    button: {
        margin: theme.spacing(1,1,0,0)
    }
}))

export const ConfirmationDetails = ({formData, setForm, navigation}) => {
    const muiClasses = useStyles();
    const [value, setValue] = React.useState('');
    const [error, setError] = React.useState(false);
    const [helperText, setHelperText] = React.useState('Wybierz jedną z dwóch opcji powyżej') 
    const [components, setComponents] = useState(<div></div>);
    const propsAcc = {formData, setForm};
    const [confQtyComp, setConfQtyComp] = useState(<div></div>);
    
    const handleQtyChange = (event) => {
        setForm(event);
    }

    const handleRadioChange = (event) => {
        setForm(event);
        let componentsToGenerate = <div style={{margin: "0", padding: "0", boxSizing: "border-box", width: '100%', display: "flex", flexDirection: "column"}}>
                                        <h3 style={{margin: "0 0 1rem 0", textDecoration: "underline"}}>Super że będziecie!</h3>
                                        <Accomodation {...propsAcc} />
                                        <hr></hr>
                                        <Dishes {...propsAcc}/>
                                    </div>
        let confQtyCompToGenerate = <TextField
                                        id="outlined-select-confirm"
                                        select
                                        label="Wybierz jak spędzisz z nami czas"
                                        defaultValue={formData.confirmedQty}
                                        name="confirmedQty"
                                        onChange={handleQtyChange}
                                        variant="outlined"
                                    >
                                        {person.map((option) => (
                                        <option key={option.value} value={option.value}>
                                        {option.label}
                                        </option>
                                    ))}
                                    </TextField>
        if(event.target.value === '1') {
            setComponents(componentsToGenerate)
            setConfQtyComp(confQtyCompToGenerate)
        } else {
            setComponents(<div></div>)
            setConfQtyComp(<div></div>)
        }
        setValue(event.target.value);
        setHelperText(' ');
        setError(false);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData)
        if (formData.confirmed === '1') {
          setHelperText('Potwierdziłeś, że będziecie uczestniczyć. Dziękujemy i czekamy na was!');
          setError(false);
          navigation.next()
        } else if (formData.confirmed === '0') {
          setHelperText('Potwierdziłeś, że nie będziecie uczestniczyć.');
          setError(false);
        } else {
          setHelperText('Musisz wybrać jedną z opcji');
          setError(true);
        }
      };

      let invitation = formData.clientPartnerName === "" ? 
      <h3>{`Witaj ${formData.clientName}! Niezmiernie nam miło że tu jesteś :)`}</h3>
                                            :<h3>{`Witajcie ${formData.clientName} ${formData.clientPartnerName}! Niezmiernie nam miło że tu jesteście :)`}</h3>
      let instruction = formData.clientPartnerName === "" ? 
      <p>Poniżej znajdziesz kilka pytań od nas. <br/>Uzupełnij zgodnie ze swoimi preferencjami. Ułatwi nam to dostosowanie się do Twoich potrzeb.</p>
      : <p>Poniżej znajdziecie kilka pytań od nas. <br/>Uzupełnijcie je zgodnie ze swoimi preferencjami. Ułatwi nam to dostosowanie się do Twoich potrzeb.</p>

    return (
        <MaterialWrapper>
            {invitation}
            {instruction}
            <form onSubmit={handleSubmit} style={{width: "100%"}}>
                <FormControl component="fieldset"
                            error={error}
                            className={muiClasses.formControl}>
                    <FormLabel className={muiClasses.radioControl} component="legend">Czy zechcecie nas zaszczycić swoją obecnością?</FormLabel>
                    <RadioGroup aria-label="confirmed" 
                                name="confirmed" 
                                value={value}
                                onChange={handleRadioChange}
                    >
                        <FormControlLabel value="1" control={<Radio />} label="Tak, potwierdzam przybycie" />
                        <FormControlLabel value="0" control={<Radio />} label="Nie będzie nas" />
                    </RadioGroup>
                    <FormHelperText className={muiClasses.helper}>{helperText}</FormHelperText>
                    {confQtyComp}
                    <hr></hr>
                    {components}
                    <Button
                        type="summit"
                        variant="contained"
                        color="primary"
                    >Potwierdź</Button>
                </FormControl>
            </form>
        </MaterialWrapper>
    )
}
