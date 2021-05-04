import React from 'react'
import Filter from '../components/Filter'
import ProductList from '../components/ProductList'
import {StyledHero} from '../parts/StyledHero'

function Shop() {
    return (
        <div className="page page-container">
            <StyledHero title1='Products' >
                <span className="hero-overlay">
                    <h2>Nos produits</h2>
                </span>
            </StyledHero>
            <section>
                <Filter/> 
                <ProductList/>                
            </section>
        </div>
    )
}

export default Shop;


