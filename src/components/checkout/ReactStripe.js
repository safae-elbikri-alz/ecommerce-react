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
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { setCurrentCommande } from "../../redux/commande/commandeActions";

const CreditCardForm = ({shipping}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [cardComplete, setCardComplete] = useState(false);
    const [processing, setProcessing] = useState(false);
    const commande = useSelector(state => state.commande.request);
    const cart = useSelector(state => state.panier.cart);
    const cartTotal = cart.map(item => item.prixReel * item.count).reduce((a,b) => a+b, 0);
    const total = Number((( cartTotal + shipping.prix ).toFixed(2)));
    const user = useSelector(state => state.auth.user);
  
    const handleSubmit = async () => {
    
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
                amount: Math.round(total * 100),
                currency: (process.env.REACT_APP_PAYMENT_CURRENCY && process.env.REACT_APP_PAYMENT_CURRENCY.toLowerCase()) || 'eur',
                payment_method_types: [payload.paymentMethod.type],
            };
    
            axios.post("/paiement/intent/create", data)
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
                        setProcessing(false);
                        const newCommande = {
                            ...commande,
                            paiement: {
                                idPaiement: res.paymentIntent.id,
                                type: 'stripe',
                                total: total,
                                nom: `${user.nom} ${user.prenom}`,
                                email: user.email,
                                currency: data.currency.toUpperCase()
                            },
                            paid: true
                        }
                        dispatch(setCurrentCommande(newCommande));
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
                    <label>Numéro de carte</label>
                    <CardNumberElement onChange={onChange} />
                </div>
        
                <div className="FormRow">
                    <div className="FormCol">
                        <label>Date d'expiration</label>
                        <CardExpiryElement onChange={onChange} />
                    </div>
        
                    <div className="FormCol">
                        <label>CVC</label>
                        <CardCvcElement onChange={onChange} />
                    </div>
                </div>
            </div>
    
            {error && <div>{error.message}</div>}
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