import React, { useEffect, useState } from 'react'
import SingleProduct from './SingleProduct'
import CartPopup from '../components/CartPopup'
import QuickView from '../components/QuickView'
import { useDispatch, useSelector } from 'react-redux'
import {getProducts} from '../redux/product/productActions'
import { addToCart } from '../redux/panier/PanierActions'


function ProductList() {

    const dispatch = useDispatch();
    const productList = useSelector(state=>state.product.sortedProducts);
    const [singleProduct, setSingleProduct] = useState();

    const quickView = (product) => {
        setSingleProduct(product);
        const overlay = document.querySelector('.quick-view-overlay')
        overlay.classList.remove('hidden')
    }

    const openModal = (product) =>{  
        setSingleProduct(product);
        const overlay = document.querySelector('.cart-overlay')
        overlay.classList.remove('hidden')
        const cartItem = {
            id: product.id,
            count: product.count || 1,
            couleur: product.couleur || 0,
            prixReel: product.prixReel,
            photo: product.photo,
            nom: product.nom
        }
        dispatch(addToCart(cartItem)); 
    }

    const getProduct = (id)=>{
        const singleProduct = productList.filter(product => product.id === id)
        return singleProduct
    }

    useEffect(() => {
        dispatch(getProducts(0,20));
    },[]);

    return (
        <>
            <div className="products-container">
                {
                    productList.map(product => {
                        return <SingleProduct 
                                    key={product.id} 
                                    product={product}
                                    getProduct={getProduct}
                                    addtocart={() => console.log("addtocart")}
                                    quickView={quickView}
                                    openModal={openModal}
                                />
                    })
                }
            </div>
            <div className="cart-overlay hidden overlay">
                {
                    singleProduct &&
                    <CartPopup singleProduct={singleProduct}/>
                }
            </div>

            <div className="quick-view-overlay hidden overlay">
                {
                    singleProduct && 
                    <QuickView singleProduct={singleProduct} openModal={openModal} /> 
                }
            </div>
        </>
    )
}

export default ProductList;