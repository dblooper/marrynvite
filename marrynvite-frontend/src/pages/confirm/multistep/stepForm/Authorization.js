import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import classes from './Authorization.module.css'
import MaterialWrapper from '../../../../components/materialUI/MaterialWrapper'
import Button from '@material-ui/core/Button'

export const Authorization = ({formData, setForm, navigation}) => {
    const {clientId, clientName} = formData;
    console.log(formData)
    return (
        <Container>
            <h3>Pozwól nam Ciebie zidentyfikować</h3>
                <MaterialWrapper className={classes.Authorization}>
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
                    <Button
                        variant="contained"
                        color="primary"
                        style={{marginTop: '1rem'}}
                        onClick={() => navigation.next()}
                    >Przejdź dalej</Button>
                </MaterialWrapper>
        </Container>
    )
}
