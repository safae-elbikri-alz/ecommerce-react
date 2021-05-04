  import React from 'react'
import {Link} from 'react-router-dom'
import {FaFacebookF, FaInstagram, FaLocationArrow, FaPhoneAlt,FaEnvelope} from 'react-icons/fa'

export default function Footer() {
    
    return (
       // <div className={fullheightpage ? 'hidden footer-container': 'footer-container'}>
       <div className= "footer-container">
            <section className="footer-top">
                <div className="footer-single">
                <h2 style={{fontFamily:"serif"}}>Tout-Destock</h2>
                    <p>Soyez le premier à découvrir nos super produits!</p>
                    <div className="socialmedia-icons">
                        <a href="https://www.facebook.com/Tout-Destock-1571562399581645" target="_blank"><FaFacebookF /></a>
                        <a href="https://www.instagram.com/explore/locations/1571562399581645/Tout-Destock/?hl=fr" target="_blank"><FaInstagram /></a>
                    </div>
                </div>
                <div className="footer-group">
                    <div className="footer-top-menu">
                    <h3>Informations</h3>
                        <Link to="/conditions">Termes et conditions </Link>
                        <Link to="/Terms">Politique de confidentialité</Link>
                        <Link to="/about">A propos</Link>
                    </div>
                    <div className="footer-top-menu">
                    <h3>Coordonnées </h3>
                        <a href="tel:+3366-354-2177"><FaPhoneAlt className="mr" /> 06 63 54 21 77</a>
                        <a href="mailto:info@example.com"><FaEnvelope className="mr" />toutdestock@gmail.com</a>
                        <a href="https://goo.gl/maps/D54GY2TbntQnbp5c9" target="_blank"><FaLocationArrow className="mr"/>127 Rue de leulène 62610 Louches </a>
                    </div>
                </div>
            </section>
           <section className="footer-bottom">
                <p>Copyright © 2021 -{new Date().getFullYear()} <Link to='/'>Tout Destock</Link> By Isabele</p>
            </section>
        </div>
    )
}
 