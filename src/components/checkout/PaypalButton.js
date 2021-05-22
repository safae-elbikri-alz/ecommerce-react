import React from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { setCurrentCommande } from '../../redux/commande/commandeActions';

const env = process.env.REACT_APP_PAYPAL_ENV || 'sandbox';
const currency = (process.env.REACT_APP_PAYMENT_CURRENCY && process.env.REACT_APP_PAYMENT_CURRENCY.toUpperCase()) || 'EUR';
const client = {
    sandbox:    process.env.REACT_APP_PAYPAL_SANDBOX_CLIENT_ID || '',
    production: process.env.REACT_APP_PAYPAL_PRODUCTION_CLIENT_ID || '',
}

function PaypalButton({shipping}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const cart = useSelector(state => state.panier.cart);
    const commande = useSelector(state => state.commande.request);
    const cartTotal = cart.map(item => item.prixReel).reduce((a,b) => a+b, 0);
    const total = Number((( cartTotal + shipping.prix ).toFixed(2)));

    const onSuccess = (payment) => {
        // creer commande et facture
        const newCommande = {
            ...commande,
            paiement: {
                idPaiement: payment.paymentID,
                type: 'paypal',
                total: total,
                nom: payment.address.recipient_name,
                email: payment.email,
                currency: currency.toUpperCase()
            },
            paid: true
        }
        dispatch(setCurrentCommande(newCommande));
    }

    const onCancel = (data) => {
        console.log(data);
    }

    const onError = (err) => {
        console.log(err);
    }

    return (
        <PaypalExpressBtn 
            style={{size: "responsive"}}
            env={env} 
            client={client} 
            currency={currency} 
            total={total} 
            onError={onError} 
            onSuccess={onSuccess} 
            onCancel={onCancel} 
        />
    );
}

export default PaypalButton;