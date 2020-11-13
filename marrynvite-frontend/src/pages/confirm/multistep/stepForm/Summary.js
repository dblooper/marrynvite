import { Backdrop } from '@material-ui/core'
import React from 'react'
import {DISHES_ARRAY } from './confirmationAdditional/Dishes'

export const formDataMap = (formData) => {

            return(<div>
                <h3>Potwierdzam przybycie: {formData.confirmed === '1' ? 'TAK' : 'NIE'}</h3>
                {formData.confirmed === '1' ? <h3>Liczba uczestników: {formData.confirmedQty}</h3> : ''}
                {formData.confirmed === '1' ? <h3>Potrzebuję noclegu: {formData.confirmAccomodation === '1' ? 'TAK' : 'NIE'}</h3>:''}
                {formData.confirmAccomodation === '1' ? <h3>Liczba miejsc noclegowych: {formData.confirmAccQty}</h3>: ''}
                {parseInt(formData.confirmedQty) > 0 ? <h3>Preferowane dania dla {formData.clientName}: {DISHES_ARRAY[formData.dishesForMe]}</h3> : ''}
                {parseInt(formData.confirmedQty) > 1 ? <h3>Preferowane dania dla {formData.clientPartnerName}: : {DISHES_ARRAY[formData.dishesForPartner]}</h3> : ''}
            </div>)
}

export const Summary = ({formData, setFrom, navigation}) => {
    console.log(formData)
    return (
        <div>
            <h1>Już Prawie Koniec :) <br></br>Potwierdź proszę czy wszystko się zgadza</h1>
            {formDataMap(formData)}
        </div>
    )
}
