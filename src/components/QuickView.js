import React , {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {FaMinus, FaPlus, FaTimes} from 'react-icons/fa'
import {Button,BlackButton} from '../parts/Button'
import axios from 'axios';
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/panier/PanierActions';

function QuickView({singleProduct, openModal}) {
    const [centerImage, setCenterImage] = useState('');
    const dispatch = useDispatch();
    const [cartItem, setCartItem] = useState({
        id: singleProduct.id,
        count: 1,
        couleur: 0,
        prixReel: singleProduct.prixReel,
        photo: singleProduct.photo,
        nom: singleProduct.nom
    });
    
    const closecart = (e) =>{
        const overlay = e.target.closest('.overlay')
        overlay.classList.add('hidden')
    }

    const handleAddToCart = (e) => {
        dispatch(addToCart(cartItem));
        closecart(e);
        openModal(cartItem);
    }

    useEffect(() => {
        if(singleProduct){
            setCenterImage(`${axios.defaults.baseURL}/files/produits/${singleProduct.photo}`)
        }
    }, [singleProduct]);

    let {id,name,price,description,count,incart,quantite, couleurs} = {id:singleProduct.id,name:singleProduct.nom,
                                                    price:singleProduct.prixReel,
                                                    description:singleProduct.description,
                                                    count : 0,
                                                    incart : false,
                                                    quantite:singleProduct.quantite,
                                                    couleurs: singleProduct.couleurs
                                                    }
    

    description = description?  description.substring(0,150) : ''

    const renderQuickView = () => {
        return (
            <div className="cart-popup-container">
                <div className="quickview-left-container">
                <div className="quickview-image-container">
                    <div className="mainImg">
                        <img src={centerImage} alt={name}/>
                    </div>
                </div>
                </div>
                <div className="quickview-right-container">
                    <h2>{name}</h2>
                    <p className="price">
                        {price} €
                    </p>
                    <hr/>
                    {
                        couleurs && couleurs.length !== 0 &&
                        <select defaultValue={0} onChange={(e) => setCartItem({...cartItem, couleur: e.target.value})}>
                            {
                                couleurs.map((c,idx) => <option key={idx} value={idx}>{c.nom}</option>)
                            }
                        </select>
                    }
                    <div className="counter-box">
                        <div className="counter">{cartItem.count}</div>
                        <div className="increment-box">
                            <button className="increase" onClick={()=> setCartItem({...cartItem, count: cartItem.count+1})}><FaPlus /></button>
                            <button className="decrease" onClick={()=> setCartItem({...cartItem, count: cartItem.count-1})}><FaMinus /></button>
                        </div>

                    </div>
                    <p className="pt-1 pb-1">{description}</p>
                        <div className="row quickview-row">
                            <Button className={incart ? "no-margin btn-disabled" : "no-margin"} onClick={(e) => handleAddToCart(e)} disabled={incart}>
                                {incart? "Dans votre panier" : "Ajouter au panier"}
                            </Button>
                        </div>                    
                    <Link to='/cart' ><BlackButton>Aller au panier</BlackButton></Link>
                </div>
                <div className="close-btn" onClick={(e)=>closecart(e)}>
                    <FaTimes />
                </div>
            </div>
        );
    }

    return singleProduct === '' || !singleProduct ? false : renderQuickView();
}

export default QuickView;