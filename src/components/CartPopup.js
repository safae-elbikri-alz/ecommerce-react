import React,{ useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import {FaTimes , FaCheck} from 'react-icons/fa'
import {DefaultButton , OutlineButton} from '../parts/Button'
import axios from 'axios'
import { useSelector } from 'react-redux'

function CartPopup({singleProduct}) {
    const checkoutBtn = document.querySelector('.checkout-btn')
    const [centerImage, setCenterImage] = useState('');
    const cart = useSelector(state => state.panier.cart);
    const cartCount = cart.length;
    const cartTotal = cart.map(item => item.prixReel * item.count).reduce((a,b) => a+b, 0);
                        
    useEffect(() => {
        if(singleProduct){
            setCenterImage(`${axios.defaults.baseURL}/files/produits/${singleProduct.photo}`)
        }
    }, [singleProduct]);

    const closecart = (e) =>{
        const overlay = e.target.closest('.overlay')
        overlay.classList.add('hidden')
    }

    let{id,name,price,count} = {id:singleProduct.id,name:singleProduct.nom,price:singleProduct.prixReel,count:singleProduct.count || 1}

    return (
        <div className="cart-popup-container cart-popup">
           <div className="cart-left-container">
               <p className="success-add-to-cart"><FaCheck/>Produit ajouté au panier avec succès</p>
               <img src={centerImage} alt={name} />
               <p className="name">{name}</p>
               <p className="price">PRIX: <span>${price}</span></p>
               <p className="qty">QUANTITE: <span>{count}</span></p>
               <p className="cart-total">LE TOTAL: <span>$ {price * count}</span></p>
           </div>
           <div className="cart-right-container">
               <p>Il y'a <span>{cartCount}</span> produits dans votre panier</p>
               <p className="cart-total">LE TOTAL DU PANIER: <span>${cartTotal}</span></p>
               <OutlineButton onClick={(e)=>closecart(e)}><Link to="/shop">Continuer votre achat</Link></OutlineButton>
                <DefaultButton><Link to="/cart">Aller au panier</Link></DefaultButton>
            </div>
           <div className="close-btn" onClick={(e)=>closecart(e)}>
                <FaTimes />
           </div>
        </div>
    )
}

export default CartPopup;
