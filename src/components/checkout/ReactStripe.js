import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
  useElements,
  useStripe
} from "@stripe/react-stripe-js";
import axios from "axios";
import { BlueButton } from "../../parts/Button";
import { useSelector } from "react-redux";
import userEvent from "@testing-library/user-event";

const CreditCardForm = ({shipping}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [cardComplete, setCardComplete] = useState(false);
    const [processing, setProcessing] = useState(false);
    const cart = useSelector(state => state.panier.cart);
    const cartTotal = cart.map(item => item.prixReel).reduce((a,b) => a+b, 0);
    const total = Number((( cartTotal + shipping.prix ).toFixed(2)));
    const user = useSelector(state => state.auth.user);
  
    const handleSubmit = async () => {
        // event.preventDefault();
    
        if (!stripe || !elements) {
            return;
        }
        
        if (error) {
            elements.getElement("card").focus();
            return;
        }
    
        if (cardComplete) {
            setProcessing(true);
        }
    
        const cardElement = elements.getElement(CardNumberElement);
        const payload = await stripe.createPaymentMethod({
            type: "card",
            card: cardElement
        });
    
        if (error) {
            setError(payload.error);
        } else {
            const data = {
                amount: total * 100,
                currency: (process.env.REACT_APP_PAYMENT_CURRENCY && process.env.REACT_APP_PAYMENT_CURRENCY.toLowerCase()) || 'eur',
                payment_method_types: [payload.paymentMethod.type],
            };
    
            axios.post("http://localhost:4242/create-payment-intent", data)
                .then(res => {
                    stripe.confirmCardPayment(res.data.client_secret, {
                        payment_method: {
                            card: cardElement,
                            billing_details: {
                                name: `${user.nom} ${user.prenom}`,
                                email: user.email
                            },
                        },
                    }).then(res => {
                        // creer la commande et la facture
                        console.log(res);
                        setProcessing(false);
                    }).catch(err => {
                        console.log(err);
                        setError("Une erreur est survenue");
                        setProcessing(false);
                    })
                })
                .catch(err => {
                    console.log(err);
                    setError("Une erreur est survenue");
                    setProcessing(false);
                });
        }
    };
  
    const onChange = (e) => {
        setError(e.error);
        setCardComplete(e.complete);
    };
  
    return (
        <div className="credit-card-form">
            <div className="FormGroup">
                <div className="FormRow">
                    <label>Card number</label>
                    <CardNumberElement onChange={onChange} />
                </div>
        
                <div className="FormRow">
                    <div className="FormCol">
                        <label>Expiration date</label>
                        <CardExpiryElement onChange={onChange} />
                    </div>
        
                    <div className="FormCol">
                        <label>CVC</label>
                        <CardCvcElement onChange={onChange} />
                    </div>
                </div>
            </div>
    
            {error && <div>{error.message}</div>}
            {/* <button className="SubmitButton" type="submit" disabled={processing || !stripe}>
                {processing ? "Processing..." : "Pay"}
            </button> */}
            <BlueButton onClick={handleSubmit} style={{width: "100%"}}>
                {processing ? "Traitement..." : "Payer Maintenant"}
            </BlueButton>
        </div>
    );
};
  
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const ReactStripe = ({shipping}) => {
    return (
        <Elements stripe={stripePromise}>
            <CreditCardForm shipping={shipping} />
        </Elements>
    );
};
  
export default ReactStripe;