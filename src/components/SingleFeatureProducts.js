import React from 'react'
import {Link} from 'react-router-dom'
import {AiOutlineSearch,AiOutlineShopping} from 'react-icons/ai'
import axios from 'axios'

function SingleFeatureProducts({product,quickView,openModal}) {
    let{id, name, price, incart, categorie} = {
        id: product.id, 
        name: product.nom, 
        price: product.prixReel,
        incart: false,
        categorie: product.categorie
    }

    return (
        <div className="single-product">
            <Link to={`/detail/${id}`}>
                <img src={`${axios.defaults.baseURL}/files/produits/${product.photo}`} className="product-image"
                    alt={name}
                />
            </Link>
            <p>{name}</p>
            <p className="price">{price} € </p>
            <p>{categorie}</p>
            <div className="circle-icons-container">
                <button className="circle-icon circle-icon-cart" onClick={()=> openModal(product)} disabled={incart}>
                    <AiOutlineShopping />
                    <span className="tooltip-text">{incart ? " Déjà au panier" : "Ajouter au panier" }</span>
                </button>
                <button className="circle-icon circle-icon-search" onClick={()=> quickView(product)}>
                    <AiOutlineSearch />
                    <span className="tooltip-text">Petit aperçu</span>
                </button>
            </div>
        </div>
    )
}

export default SingleFeatureProducts;
