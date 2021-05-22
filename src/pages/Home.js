import React from 'react'
import Hero from '../parts/Hero'
import FeaturedProducts from '../components/FeaturedProducts'

function Home() {

    return (
        <div className="home-container page">
            <Hero title1="Les Breloques" title2="Le monde des bijoux à petits prix"></Hero>
            <div style={{height: '20px'}}>
                <p style={{textAlign:'center',fontSize:'30px'}}>Nos produits top</p>
            </div>
            <div className="page page-container">
                <section>
                    <FeaturedProducts/>
                </section>
            </div>
        </div>
    )
}

export default Home;
