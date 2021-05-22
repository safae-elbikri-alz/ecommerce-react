import React, { Component, useState } from 'react'
import CartSummary from '../components/checkout/CartSummary'
import CheckoutInfo from '../components/checkout/CheckoutInfo'


function Checkout(){

    const [step, setStep] = useState(1);
    const [payement, setPayement] = useState(0);
    const [shipping, setShipping] = useState({
        id: '',
        nom: '',
        prix: 0
    });

    return (
        <div className="checkout-page">
            <div className="checkout-banner">
                <h1>Tout Destock</h1>
            </div>
            <div className="checkout-summary"><CartSummary shipping={shipping} payement={payement} step={step} /></div>
            <div className="checkout-info">
            <div className="checkout-banner-inside">
                <h1>Tout Destock</h1>
            </div>
                <CheckoutInfo 
                    payement={payement} 
                    setPayement={setPayement} 
                    shipping={shipping} 
                    setShipping={setShipping} 
                    step={step} 
                    setStep={setStep} 
                />
            </div>
        </div>
    )

}

export default Checkout;
