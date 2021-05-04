import React, { useEffect, useState } from 'react'
import SingleFeatureProducts from './SingleFeatureProducts'
import CartPopup from '../components/CartPopup'
import QuickView from '../components/QuickView'
import { useDispatch, useSelector } from 'react-redux'
import {getProducts} from '../redux/product/productActions'

function FeaturedProducts() {

    const dispatch = useDispatch();
    const productList = useSelector(state=>state.product.sortedProducts);
    const featuredProduct = productList.filter(product=>product.status === 1);
    const [singleProduct, setSingleProduct] = useState({});

    const quickView = (product) => {
        setSingleProduct(product);
        const overlay = document.querySelector('.quick-view-overlay')
        overlay.classList.remove('hidden')
    }

    const openModal = (product) =>{  
        setSingleProduct(product);
        const overlay = document.querySelector('.cart-overlay')
        overlay.classList.remove('hidden')
        //this.addtocart(id)
        //dispatch(addToCart(product.id))
    }

    useEffect(() => {
        dispatch(getProducts(0,20));
    },[]);

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
                <CartPopup singleProduct={singleProduct}/>
            </div>

            <div className="quick-view-overlay hidden overlay">
                <QuickView singleProduct={singleProduct} />
            </div>
        </>
    )
}

export default FeaturedProducts;