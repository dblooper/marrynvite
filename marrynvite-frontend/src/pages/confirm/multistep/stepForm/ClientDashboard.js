import React from 'react'
import {formDataMap} from './Summary'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import MaterialWrapper from '../../../../components/materialUI/MaterialWrapper'

const ClientDashboard = ({formData, setForm, navigation}) => {
    let invitation = formData.clientPartnerName === "" ? 
    <h3>{`Witaj ${formData.clientName}! Fajnie, że zawitałeś ponownie.`}<br></br>{`Poniżej możesz sprawwdzić, czy dane odnośnie potwierdzenia się zgadzają.`}</h3>
                                          :<h3>{`Witajcie ${formData.clientName}, ${formData.clientPartnerName}! Fajnie, że zawitaliście ponownie. Poniżej możecie sprawwdzić, czy dane odnośnie potwierdzenia się zgadzają.`}</h3>

    return (
        <Container>
            <MaterialWrapper>
                {invitation}
                {formDataMap(formData)}
                <Button
                    color="primary"
                    variant="contained"
                    style={{marginTop: "1rem"}}
                >Zmień preferencje</Button>
                <Button
                    color="primary"
                    variant="outlined"
                    style={{margin: "1rem"}}
                >Anuluj potwierdzenie</Button>
            </MaterialWrapper>
        </Container>
    )
}

export default ClientDashboard
