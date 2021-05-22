import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'
import {FaPlus , FaMinus, FaTimes} from 'react-icons/fa'
import {DefaultButton, BlackButton} from '../parts/Button'
import {StyledHero} from '../parts/StyledHero'
import {increment,decrement,removeItem,clearPanier, changeColor} from "../redux/panier/PanierActions"
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'


function Cart() {

    const dispatch = useDispatch();
    const cart = useSelector(state => state.panier.cart);
    const authenticated = useSelector((state) => state.auth.authenticated);

    if(cart.length === 0){
        return (
            <div className="page page-container">
                <StyledHero title1='Products' >
                <span className="hero-overlay">
                    <h2>Cart</h2>
                </span>
                </StyledHero>
                <section>
                    <div className="empty-cart">
                        Votre panier est vide.
                    </div>
                </section>                
            </div>
        )
    }


    const cartTotal = cart.map(item => item.prixReel * item.count).reduce((x, y) => x+y, 0);
    const cartItems = cart.map(item =>{
        return(
            <tr key={item.id}>
                <td className="cart-small-img"><img src={`${axios.defaults.baseURL}/files/produits/${item.photo}`}  alt={item.nom} />{item.nom}</td>
                <td>{item.prixReel} €</td>
                <td>
                    {
                        item.couleurs && item.couleurs.length !== 0 &&
                        <div className="counter-box" style={{height: '31px'}}>
                            <select
                                className="product-color-selector" 
                                defaultValue={item.couleur} 
                                onChange={(e) => dispatch(changeColor(item.id, parseInt(e.target.value)))}
                            >
                                {
                                    item.couleurs.map((c,idx) => <option key={idx} value={c.id}>{c.nom}</option>)
                                }
                            </select>
                        </div>
                    }
                </td>
                <td>
                    <div className="counter-box">
                        <div className="counter">{item.count}</div>
                        <div className="increment-box">
                            <button className="increase" onClick={()=>dispatch(increment(item.id))}><FaPlus /></button>
                            <button className="decrease" onClick={()=>dispatch(decrement(item.id))}><FaMinus /></button>
                        </div>
                    </div>
                </td>
                <td>${item.prixReel * item.count}</td>
                <td className="remove-from-cart"><button onClick={()=>dispatch(removeItem(item.id))}><FaTimes /></button></td>
            </tr>
        )
    })
    
    const handleClick = (e) => {
        if(!authenticated){
            e.preventDefault();
            document.querySelector('.login-overlay').classList.remove('hidden');
        }
    };
    
    return (
        <div className="page page-container">
            <StyledHero title1='Products' >
                <span className="hero-overlay">
                    <h2>Panier</h2>
                </span>
            </StyledHero>
            <section>
            <div className="cart-container">                
                <table className="cart-table">
                    <thead>
                    <tr>
                        <th>NOM DU PRODUIT</th>
                        <th>PRIX</th>
                        <th>COULEUR</th>
                        <th>QUANTITE</th>
                        <th>TOTAL</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        {cartItems}
                    </tbody>
                </table>
                <Link to='/shop'><DefaultButton>Continuer votre achat</DefaultButton></Link>
                <BlackButton className="clear-cart-btn" onClick={()=>dispatch(clearPanier())}>Vider le panier</BlackButton>
                <div className="cart-total-box">
                    <p>TOTAL DU PANIER</p>
                    {<p>Total: ${cartTotal}</p>}
                    <Link to='/checkout' onClick={(e) => handleClick(e)}><DefaultButton /*onClick={()=>fullPage(true)}*/>Procéder au payement</DefaultButton></Link>
                </div>
            </div>
            </section>
        </div>
    )
}

export default  Cart;
