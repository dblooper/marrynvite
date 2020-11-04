import React from 'react'
import { useForm, useStep } from 'react-hooks-helper'
import { ConfirmationDetails } from './stepForm/ConfirmationDetails'
import { Summary } from './stepForm/Summary'
import { Authorization } from './stepForm/Authorization'

const defaultData = {
    clientId: "",
    clientName: "",
    clientPartnerName:"",
    confirmed: "",
    confirmedQty: "",
    accomodation: true,
    confirmAccomodation: "",
    confirmAccQty: "",
    dishesForMe: "",
    dishesForPartner:""
}

const steps = [
    {id: 'names'},
    {id: 'confirmationDetails'},
    {id: 'summary'},
]

export const MultiStepForm = () => {
    const [formData, setForm] = useForm(defaultData);
    const { step, navigation } = useStep({
        steps,
        initialStep: 0
    })

    const props = { formData, setForm, navigation };
    switch(step.id) {
        case 'names' : return <Authorization {...props}></Authorization>
        case "confirmationDetails": return <ConfirmationDetails {...props}></ConfirmationDetails>
        case "summary": return <Summary {...props}></Summary>
    }
    return (
        <div style={{margin: '10rem'}}>
            <h1>Multistep From</h1>
        </div>
    )
}
