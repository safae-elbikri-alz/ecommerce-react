import React, { useEffect, useState } from 'react'
import ContactInfo from './ContactInfo'
import ShippingInfo from './ShippingInfo'
import Payment from './Payment'
import BreadCrumbs from './BreadCrumbs'
import CheckoutNavigation from './CheckoutNavigation'



function CheckoutInfo({payement, setPayement, shipping, setShipping, step, setStep}){
    const [state, setState] = useState({
        province:'',
        pays: {
            id: '',
            nom: ''
        },
        email:'',
        firstname:'',
        lastname:'',
        adresse:'',
        suite:'',
        ville:'',
        zip: ''
    })

    const navigate = () =>{
        if(step===1){
            //if form is untauched, should check validate the form
            let allInputs = document.querySelectorAll('.contact-information-form input')
            let allSelects = document.querySelectorAll('.contact-information-form select')
            allInputs.forEach(item => validateField(item))
            allSelects.forEach(item => validateField(item))
            //check for any error in the form
            let errors = document.querySelectorAll('.errormsg:not(.hidden)')
            let hasError = errors.length !== 0 ? true : false

            if(!hasError){
                setStep(step+1);
            }
            else{return false}
        }
        else if(step!==1){
            setStep(step+1);
        }
    }

    const updateState = (e)=>{
        const name = Object.keys(e)[0];
        // let name = e.target.name
        // let value = e.target.value
        // const type = e.target.type
        // value = type === 'checkbox' ? e.target.checked : value
        if(name === "payement") setPayement(e.payement);
        setState({
            ...state,
            ...e
        })
    }

    const updateList = (name,value)=>{
        setState({
            ...state,
            [name]:value
        })
    }

    const stepBack = ()=>{
        setStep(1);
    }

    const changeStep = (s) =>{
        //if form is untauched, should check validate the form
        let allInputs = document.querySelectorAll('.contact-information-form input')
        let allSelects = document.querySelectorAll('.contact-information-form select')
        allInputs.forEach(item => validateField(item))
        allSelects.forEach(item => validateField(item))
        //check for any error in the form
        let errors = document.querySelectorAll('.errormsg:not(.hidden)')
        let hasError = errors.length !== 0 ? true : false
        
        if(!hasError) setStep(s);
    }

    const shippingMethod=(shipping)=>{
        setShipping({
            id: shipping.id,
            prix: shipping.prix,
            nom: shipping.nom
        });
    }

    const validateField = (item) =>{
        const errorBox = item.nextSibling
        if(item.type != 'checkbox'){
            if(errorBox){errorBox.classList.add('hidden')}
        }
        //check for empty field
        if(item.required  && item.value === ''){
            errorBox.classList.remove('hidden')
            errorBox.innerText = 'This field is required'
        }
        //check for email field
        if(item.type === 'email' && item.value !==''){
            if (/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(item.value))
            {return true}
            errorBox.classList.remove('hidden')
            errorBox.innerText = "Email format dosen't look right"
        }
    }

    useEffect(() => {
        let allInputs = document.querySelectorAll('.contact-information-form input')
        let allSelects = document.querySelectorAll('.contact-information-form select')
        allInputs.forEach(item => item.addEventListener('focusout',()=> validateField(item)))
        allSelects.forEach(item => item.addEventListener('focusout',()=> validateField(item)))
        allInputs.forEach(item => item.addEventListener('change',()=> validateField(item)))
        allSelects.forEach(item => item.addEventListener('change',()=> validateField(item)))
    }, [])

    switch (step) {
        case 1:
            return(
                <>
                    <BreadCrumbs step={step} changeStep={changeStep}/>
                    <ContactInfo updateState={updateState} updateList={updateList} inputInfo={state}/>
                    <CheckoutNavigation navigate={navigate} btnText='Continue to shopping'/>
                </>
            )
        case 2:
            return(
                <>
                    <BreadCrumbs step={step} changeStep={changeStep}/>
                    <ShippingInfo contactInfo={state} stepBack={stepBack} shippingMethod={shippingMethod} selectedShipping={shipping.id} />
                    <CheckoutNavigation navigate={navigate} btnText='Continue to payment'/>
                </>
            )
        case 3:
            return(
                <>
                    <BreadCrumbs step={step} changeStep={changeStep}/>
                    <Payment updateState={updateState} contactInfo={state} stepBack={stepBack} payement={payement} shipping={shipping} />
                    <CheckoutNavigation />
                </>
            )
        default:
            return(
                <>
                    <BreadCrumbs step={step}/>
                    <ContactInfo />
                    <CheckoutNavigation navigate={navigate}/>
                </>
            )
    }

}

export default CheckoutInfo;