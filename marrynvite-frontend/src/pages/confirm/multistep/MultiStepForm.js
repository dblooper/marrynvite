import React from 'react'
import { useForm, useStep } from 'react-hooks-helper'
import { ConfirmationDetails } from './stepForm/ConfirmationDetails'
import { Summary } from './stepForm/Summary'
import { Authorization } from './stepForm/Authorization'
import ClientDashboard from './stepForm/ClientDashboard'

const defaultData = {
    clientId: "",
    clientName: "",
    clientPartnerName:"",
    confirmed: "",
    confirmedQty: "",
    accomodation: "",
    confirmAccomodation: "",
    confirmAccQty: "",
    dishesForMe: "",
    dishesForPartner:"",
    confirmDate: null
}

const steps = [
    {id: 'names'},
    {id: 'confirmationDetails'},
    {id: 'summary'},
    {id: 'clientDashboard'},
]

export const MultiStepForm = (props) => {
    const [formData, setForm] = useForm(defaultData);
    const { step, navigation } = useStep({
        steps,
        initialStep: props.initial
    })

    const ownProps = { formData, setForm, navigation };
    switch(step.id) {
        case 'names' : return <Authorization {...ownProps}></Authorization>
        case "confirmationDetails": return <ConfirmationDetails {...ownProps}></ConfirmationDetails>
        case "summary": return <Summary {...ownProps}></Summary>
        case 'clientDashboard' : return <ClientDashboard {...ownProps}></ClientDashboard>
    }
    return (
        <div style={{margin: '10rem'}}>
            <h1>Multistep From</h1>
        </div>
    )
}
