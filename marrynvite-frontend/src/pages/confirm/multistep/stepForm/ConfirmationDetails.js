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
import Modal from '../../../../components/modal/Modal';
import {Summary} from './Summary.js'
import ConfirmationQuantity from './confirmationAdditional/ConfirmationQuantity';


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
        width: '100%'
    },
    button: {
        margin: theme.spacing(1,1,0,0)
    }, 
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    }
}))

export const ConfirmationDetails = ({formData, setForm, reset, navigation}) => {
    const muiClasses = useStyles();
    const [value, setValue] = React.useState('');
    const [error, setError] = React.useState(false);
    const [helperText, setHelperText] = React.useState('Wybierz jedną z dwóch opcji powyżej') 
    const [components, setComponents] = useState(<div></div>);
    const [confQtyComp, setConfQtyComp] = useState(<div></div>);
    const [backdropOpen, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [confQty, setConfQty] = useState('');
    const propsAcc = {formData, setForm};
    const handleBackdropClick = () => {
        backdropOpen && !loading ? setOpen(false) : setOpen(true);
    }
    let componentsToGenerate = (<div style={{margin: "0", padding: "0", boxSizing: "border-box", width: '100%', display: "flex", flexDirection: "column"}}>
                                    <Accomodation {...propsAcc} />
                                    <hr></hr>
                                    <Dishes {...propsAcc} conf = {formData.confirmedQty} />
                                </div>)
    let confQtyCompToGenerate = <ConfirmationQuantity {...propsAcc} />
    
    const handleRadioChange = (event) => {
        setForm(event);
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

    const handleGoToSummary = (event) => {
        event.preventDefault();
        if (formData.confirmed === '1'|| formData.confirmed === '0') {
            handleBackdropClick();
        } else {
          setHelperText('Musisz wybrać jedną z opcji');
          setError(true);
        }
    }

    const handleSubmit = (event) => {
        console.log(formData);
        setLoading(true);
      };

 let invitation = formData.clientPartnerName === "" ? 
      <h3>{`Witaj ${formData.clientName}! Niezmiernie nam miło że tu jesteś :)`}</h3>
                                            :<h3>{`Witajcie ${formData.clientName}, ${formData.clientPartnerName}! Niezmiernie nam miło że tu jesteście :)`}</h3>     
      let instruction = formData.clientPartnerName === "" ? 
      <p>Poniżej znajdziesz kilka pytań od nas. <br/>Uzupełnij zgodnie ze swoimi preferencjami. Ułatwi nam to dostosowanie się do Twoich potrzeb.</p>
      : <p>Poniżej znajdziecie kilka pytań od nas. <br/>Uzupełnijcie je zgodnie ze swoimi preferencjami. Ułatwi nam to dostosowanie się do Twoich potrzeb.</p>

    return (
        <MaterialWrapper>
            <Modal backdropOpen={backdropOpen} loading={loading} summit={handleSubmit} clicked={handleBackdropClick}><Summary {...propsAcc}></Summary></Modal>
            {invitation}
            {instruction}
            <form onSubmit={handleGoToSummary} style={{width: "100%"}}>
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
                    >PRZEJDŹ DALEJ</Button>
                </FormControl>
            </form>
        </MaterialWrapper>
    )
}
