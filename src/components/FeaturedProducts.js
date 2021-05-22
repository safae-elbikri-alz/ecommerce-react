import React, { useEffect, useState } from 'react'
import SingleFeatureProducts from './SingleFeatureProducts'
import CartPopup from '../components/CartPopup'
import QuickView from '../components/QuickView'
import { useDispatch, useSelector } from 'react-redux'
import {getProducts} from '../redux/product/productActions'
import { addToCart } from '../redux/panier/PanierActions'

function FeaturedProducts() {

    const dispatch = useDispatch();
    const productList = useSelector(state=>state.product.sortedProducts);
    const [singleProduct, setSingleProduct] = useState(null);
    const [featuredProduct, setFeaturedProducts] = useState([]);

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

    useEffect(() => {
        dispatch(getProducts(0,20));
    },[]);

    useEffect(() => {
        setFeaturedProducts(productList.filter(product=>product.status === 1));
    }, [productList]);

    return (
        <>
            <div className="products-container">
                {
                    featuredProduct.map(product => {
                        return <SingleFeatureProducts 
                                    key={product.id}
                                    featured ={product.status}
                                    product={product} 
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
                    <QuickView singleProduct={singleProduct} />
                }
            </div>
        </>
    )
}

export default FeaturedProducts;