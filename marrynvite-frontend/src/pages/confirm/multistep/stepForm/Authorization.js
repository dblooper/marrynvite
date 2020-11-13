import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import classes from './Authorization.module.css'
import MaterialWrapper from '../../../../components/materialUI/MaterialWrapper'
import Button from '@material-ui/core/Button'
import axiosConfirm from '../axios-confirm'
import { LinearProgress } from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

export const Authorization = ({formData, setForm, navigation}) => {
    const {clientId, clientName} = formData;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [helperText, setHelperText] = useState('Wypełnij dane zgodnie z otrzymanym zaproszeniem');
    console.log(formData)
    const handleAuth = () => {
        setLoading(true);
        axiosConfirm.post('/user', {clientId: clientId, clientName: clientName})
                    .then(res => {
                        console.log(res);
                        console.log(res.data);
                        setLoading(false);
                        if(res.data.status === 0) {
                            const response = res.data.response;
                            formData.confirmed = response.confirmed;
                            formData.clientId = clientId;
                            formData.clientPartnerName = response.clientPartnerName;
                            formData.accomodation = response.expectedAccQty > 0 ? 1 : 0;     
                            formData.confirmDate = response.confirmationDate;
                            if(formData.confirmed === '1') {
                                formData.confirmedQty = response.confirmedQty;
                                formData.confirmAccomodation = response.confirmAccomodation;
                                formData.confirmAccQty = response.accomodationQty;
                                formData.dishesForMe = response.dishesForMe;
                                formData.dishesForPartner = response.dishesForPartner;
                                navigation.go(3)
                            }else {
                                navigation.next();
                            }
                        } else {
                            let errorInfo = res.data.response.error === 0 ? 'Użytkownik nie istnieje. Wpisz dane uważnie!' : 'Wystąpił błąd, skontaktuj się z Danielem.';
                            setError(true);
                            setHelperText(errorInfo)
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
    }
    return (
        <Container>
            <h3>Pozwól nam Ciebie zidentyfikować</h3>
                <MaterialWrapper className={classes.Authorization}>
                <FormControl component="fieldset"
                            error={error}>     
                        <TextField
                            label="Numer zaproszenia"
                            variant="outlined"
                            margin="normal"
                            name="clientId"
                            value={clientId}
                            onChange={setForm}
                            color='primary'
                            autoComplete="off"
                        ></TextField>
                        <TextField
                            label="Pierwsze imię z zaproszenia"
                            variant="outlined"
                            margin="normal"
                            name="clientName"
                            value={clientName}
                            onChange={setForm}
                            color='primary'
                            autoComplete="off"
                        ></TextField>
                        { loading ? <LinearProgress color="secondary" /> : <FormHelperText>{helperText}</FormHelperText>}
                        <Button
                            variant="contained"
                            color="primary"
                            style={{marginTop: '1rem'}}
                            onClick={handleAuth}
                        >Przejdź dalej</Button>
                    </FormControl> 
                </MaterialWrapper>
        </Container>
    )
}
