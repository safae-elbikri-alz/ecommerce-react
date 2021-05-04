import React from 'react'
import {Link} from 'react-router-dom'
import {BlueButton} from '../../parts/Button'
import {FaChevronLeft} from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { fullPage } from '../../redux/app/appActions'

function CheckoutNavigation({navigate,btnText}) {
    const dispatch = useDispatch();
    
    return (
        <div className="navigation-checkout">
            <span onClick={()=>dispatch(fullPage(false))}><Link to='/cart' className="back-cart-link"><FaChevronLeft />Return to cart</Link></span>
            { 
                navigate && btnText &&
                <BlueButton onClick={navigate}>{btnText}</BlueButton>
            }
        </div>
    )
}

export default CheckoutNavigation;
