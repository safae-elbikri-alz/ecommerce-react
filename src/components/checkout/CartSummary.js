import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import {FaChevronDown , FaChevronUp} from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import { fullPage } from '../../redux/app/appActions';
import PaypalButton from './PaypalButton';
import ReactStripe from './ReactStripe';

function CartSummary({shipping, payement, step}){
    const dispatch = useDispatch();
    const [isMenuOpen, setOpenMenu] = useState(false);
    const cart = useSelector(state => state.panier.cart);
    const cartTotal = cart.map(item => item.prixReel * item.count).reduce((a,b) => a+b, 0);
    const total = Number((( cartTotal + shipping.prix ).toFixed(2)));

    const toggleMenu = () =>{
        setOpenMenu(!isMenuOpen);
    }

    const handleHeight = () =>{        
        const container = document.querySelector('.cart-summary-container')
        if(isMenuOpen){
           container.style.height = '100%'
        } else {
            container.style.height = '0'
        }
    }

    const cartItems = cart.map(item =>{
        const couleur = item.couleurs ? item.couleurs.filter(c => c.id === item.couleur) : null;
        return(
            <tr key={item.id} className="cart-summary-row">
                <td className="cart-summary-small-img">
                    <span className="count-summary-item">{item.count}</span>
                    <img src={`${axios.defaults.baseURL}/files/produits/${item.photo}`} alt="cart item"/>
                </td>                
                <td className="cart-summary-small-name">
                    {
                        couleur && couleur.length > 0 &&
                        <span className="color-summary-item">{couleur[0].nom}</span> 
                    }
                    {` ${item.nom}`}
                </td>
                <td>{item.prixReel * item.count}€</td>
            </tr>
        )
    })

    useEffect(() => {
        dispatch(fullPage(true));
        return () => dispatch(fullPage(false));
    }, []);

    useEffect(() => {
        handleHeight();
    }, [isMenuOpen]);

    return (
        <>
        <div className="cart-summary-link group-row" onClick={toggleMenu}>
            <span className="cart-summary-title cart-summary-title-top">
                <AiOutlineShoppingCart/> 
                Show order summary 
                {isMenuOpen ? <FaChevronUp /> : <FaChevronDown />}</span>
            <span className="">{cartTotal}€</span>
        </div>
        <div className="cart-summary-container">
            <table className="cart-summary-table">
                <tbody>{cartItems}</tbody>              
            </table>
            <div className="cart-summary-subtotal">
                <div className="group-row">
                    <span className="cart-summary-title">Total</span>
                    <span className="text-bold">{cartTotal}€</span>
                </div>
                {
                    step === 3 &&
                    <>
                        <div className="group-row">
                            <span className="cart-summary-title">Livraison</span>
                            <span className="text-bold">{shipping.prix}€</span>
                        </div>
                        <div className="group-row">
                            <span className="cart-summary-title" style={{fontWeight: "500"}}>Total de la commande</span>
                            <span className="text-bold">{total}€</span>
                        </div>
                    </>
                }
            </div>
            {
                step === 3 &&
                <>
                    {
                        payement === 0
                        ? <PaypalButton shipping={shipping} />
                        : <ReactStripe shipping={shipping} />
                    }
                </>
            }
        </div>
        </>
    )
}


export default CartSummary;
