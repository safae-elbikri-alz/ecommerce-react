import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function ShippingInfo({contactInfo,stepBack,shippingMethod,selectedShipping}) {
    const fullAddress = contactInfo.suite+' '+contactInfo.adresse+', '+contactInfo.ville+' '+contactInfo.province+', '+contactInfo.zip+', '+contactInfo.pays.nom
    const [shipping, setShipping] = useState([]);

    const isChecked = (value) =>{
        if(selectedShipping == value){
            return true
        }
        return false;
    }

    useEffect(() => { 
        axios.get('/shipping')
            .then(res => {
                if(!selectedShipping){
                    shippingMethod(res.data[0]);
                }else{
                    shippingMethod(res.data.filter(s => s.id === selectedShipping)[0]);
                }
                setShipping(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    
    return (
        <div>
            <h3 className="contact-form-header">Information de livraison</h3>
            <div className="shipping-top-box">
                <span className="shipping-title">Contact</span><span>{contactInfo.email}</span><span className="changeBtn" onClick={stepBack}>Changer</span>
                <span className="shipping-title">Livré à</span><span>{fullAddress}</span><span className="changeBtn" onClick={stepBack}>Changer</span>
            </div>
            <h3 className="contact-form-header">Méthodes de livraison</h3>
            <div className="shipping-method-box" style={{display: "flex", flexWrap: "wrap"}}>
                {
                    shipping.map(item => (
                        <div key={item.id} style={{display: "flex", justifyContent: "space-between", width: "100%"}}>
                            <div>
                                <input type="radio" name="shippingmethod" onChange={()=>shippingMethod(item)} checked={isChecked(item.id)}/>
                                <label>{item.nom}</label>
                            </div>
                            <p>{item.prix}€</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
