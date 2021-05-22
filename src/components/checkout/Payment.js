import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function Payment(props){
    const {contactInfo,stepBack} = props
    const cart = useSelector(state => state.panier.cart) 
    const fullAddress = contactInfo.suite+' '+contactInfo.adresse+', '+contactInfo.ville+' '+contactInfo.province+', '+contactInfo.zip+', '+contactInfo.pays.nom
    const cartTotal = cart.map(item => item.prixReel).reduce((a,b) => a+b, 0);
    let total =Number((( cartTotal + props.shipping.prix ).toFixed(2)));

    useEffect(() => {
        document.querySelectorAll("input[name='methodes-payement']")[props.payement].checked = true;
    }, [props.contactInfo])

    return (
        <div>
            <h3 className="contact-form-header">Paiement</h3>
            <div className="shipping-top-box payment-top-box">
                <span className="shipping-title">Contact</span><span>{contactInfo.email}</span><span className="changeBtn" onClick={stepBack}>Changer</span>
                <span className="shipping-title">Livré à</span><span>{fullAddress}</span><span className="changeBtn" onClick={stepBack}>Changer</span>
                <span className="shipping-title">Méthode</span><span>{props.shipping.nom} <b>${props.shipping.prix}</b></span><span></span>
            </div>
            <h4 className="contact-form-header">Méthodes de payement</h4>
            <div>
                <div className="form-check" style={{display: "flex", flexWrap: "wrap", alignItems: "center"}}>
                    <input
                        style={{marginTop: "0", marginRight: "25px"}}
                        className="form-check-input"
                        type="radio"
                        name="methodes-payement"
                        id="paypal"
                        defaultChecked
                    />
                    <label className="form-check-label" htmlFor="paypal"><img onClick={() => props.updateState({payement: 0})} src="https://img.staticbg.com/ic_paypal.png" /></label>
                </div>

                <div className="form-check" style={{display: "flex", flexWrap: "wrap", alignItems: "center"}}>
                    <input
                        style={{marginTop: "0", marginRight: "25px"}}
                        className="form-check-input"
                        type="radio"
                        name="methodes-payement"
                        id="credit-card"
                    />
                    <label className="form-check-label" htmlFor="credit-card"><img onClick={() => props.updateState({payement: 1})} src="https://img.staticbg.com/ic_%E5%9B%BD%E9%99%85%E4%BF%A1%E7%94%A8%E5%8D%A1.png" /></label>
                </div>
            </div>              
            <div style={{margin: "auto", width: '400px', height: '300px', backgroundColor: "gray", display: 'none'}} id="credit-card-box">

            </div>
        </div>
    )
}

export default Payment;