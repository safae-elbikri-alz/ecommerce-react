import React from 'react'
import {StyledHero} from '../parts/StyledHero'
import about1 from '../images/about1.jpg'
import about2 from '../images/about2.jpg'
import about3 from '../images/about3.jpg'

function AboutUs() {
    return (
        <div className="page page-container">
            <StyledHero title1='About us'>
                <span className="hero-overlay">
                    <h2>A propos de nous</h2>
                </span>
            </StyledHero>
            <section>
            <div className="categories-container">
                <div className="category-row">
                    <div className="about-img">
                        <img src={about1} alt="category"/>
                    </div>
                    <div className="about-content">
                        <div className="category-inner about-inner">
                            <p>Notre entreprise</p>
                            <h1>Tout destock</h1>
                            <p>Tout destock est une boutique de fournitures et de loisirs créatifs pour la customisation, le scrapbooking, la création de bijoux et la réalisation d'accessoires de mode. C'est aussi un lieu de rencontre pour les créatrices qui souhaitent présenter leurs créations, demander des conseils ou faire partager leur expérience !

C'est surtout l'histoire d’une créatrice qui désirait créer des bijoux selon sa personnalité et qui un jour a décidé d'en faire profiter ses copines !
Tout simplement ;-)</p>
                        </div>
                    </div>
                </div>
                <div className="category-row">
                    <div className="about-img">
                        <img src={about2} alt="category"/>
                    </div>
                    <div className="about-content">
                        <div className="category-inner about-inner">
                            <p></p>
                            <h1>Notre équipe et nos produits</h1>
                            <p>Une créatrice de talents qui choisit pour vous des produits source d'inspiration et qui vous donne des idées pour rendre unique vos créations.

Des milliers de produits créatifs de qualité avec un important choix de tissus, chaines, apprêts, breloques, fermoirs, embouts et bijoux. Une boutique à votre service 7j/7 avec envoi express et sourires garantis :)</p>
                        </div>
                    </div>
                </div>
                <div className="category-row">
                    <div className="about-img">
                        <img src={about3} alt="category"/>
                    </div>
                    <div className="about-content">
                        <div className="category-inner about-inner">
                            <p> Fondatrice </p>
                            <h1>Isabele</h1>
                            <p>Créatice de Bijoux moi-même, je suis toujours à la recherche de perles et apprèts de qualité dans le monde entier. Soucieuse de la qualité, j'apporte donc un très grand soin au choix de chaque produit.

Toujours à la recherche de nouveautés, notre boutique est en plein développement avec toujours plus de modèles de supports de cabochons pour bagues, bracelets, broches, pendentifs ou boucles d'oreilles, des breloques bronze ou argent, en perles et pierres semi-précieuses et articles de mercerie et de customisation (clous en différents modèles et couleurs).</p>
                        </div>
                    </div>
                </div>
            </div>
            </section>
        </div>
    )
}

export default AboutUs;
