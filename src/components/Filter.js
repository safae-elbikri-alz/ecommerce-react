import React from 'react'
import { useEffect } from 'react'
import {BsFunnel} from 'react-icons/bs'
import {OutlineButtonBlack} from '../parts/Button'
import { useDispatch, useSelector } from 'react-redux'
import {getCategories} from '../redux/categorie/categorieActions'
import {getCouleurs} from '../redux/couleur/couleurActions'
import {getProducts, SortByPrice,filterByPriceInterval,filterByCategorie,filterByColor} from '../redux/product/productActions'


function Filter(){

    const dispatch = useDispatch(); 

    const categories = useSelector(state=>state.categorie.categories);
    const couleurs = useSelector(state=>state.couleur.couleurs);
    const sortedProducts = useSelector(state => state.product.sortedProducts);
    const products = useSelector(state => state.product.produits);

    const prices = [
        {id:1,price :'1 - 5'},
        {id:2,price:'5 - 8'},
        {id:3,price:'8 - 12'},
        {id:4,price:'12 - 20'}
    ];
    
     useEffect(() => {
        dispatch(getCategories());
        dispatch(getCouleurs());
        dispatch(getProducts());
    },[])


    const handleCollapse = (action)=>{
        const menu = document.querySelector('.filter-collapse-container')
        const overlay = document.querySelector('.overlay')
        if(action === 'open'){            
                menu.classList.add('show-filter-collapse')
                overlay.classList.remove('hidden')
            }
        else if(action === 'close'){            
            menu.classList.remove('show-filter-collapse')
            overlay.classList.add('hidden')
        }
    }

    const handleFilterClick = (e,val) =>{
        const target = e.target
        const AllBtn = document.querySelector('.all-btn')
        if(val==='all'){
            const allActives = document.querySelectorAll('.active')
            allActives.forEach(item => item.classList.remove('active'))
            dispatch(getProducts());
        }

        getSiblings(target).map(item => item.classList.remove('active'))
        AllBtn.classList.remove('active')
        target.classList.add('active')
    }

    var getSiblings = function (elem) {
        var siblings = [];
        var sibling = elem.parentNode.firstChild;
        for ( ; sibling; sibling = sibling.nextSibling ) 
           if ( sibling.nodeType == 1 && sibling != elem )
              siblings.push( sibling );
        return siblings;
    }

    const categoriesList = categories.map(item=>{
        return (
            <button key={item.id} onClick={(e)=>{handleFilterClick(e,'');dispatch(filterByCategorie(products,item))}} className="widget-list-btn">{item.nom}</button>
        )
    });

    const couleursList = couleurs.map(item=>{      
        return (           
            <button key={item.id} onClick={(e)=>{handleFilterClick(e,'');dispatch(filterByColor(products,item))}} className="color-select-btn" style={{backgroundColor: item.couleur}}></button>
        )
    });

    const pricesList = prices.map(item=>{
        return (
            <button key={item.id} onClick={(e)=>{handleFilterClick(e,'');dispatch(filterByPriceInterval(products,item))}} className="widget-list-btn">{item.price}</button>
        )
    });

    return (
        <>
        <div className="overlay hidden"></div>
        <div className="filter-collapse-container">
            <div>
                <button className="close-filter-btn" onClick={()=> handleCollapse('close')}>FERMER</button>
            </div>
            <div className="widget-section">
            <div className="widget-filter-list"> 
                <button onClick={(e)=> handleFilterClick(e,'all')} className="widget-list-btn all-btn">Tout Voir</button>
            </div>
                <div className="widget-title">
                    <h3>categories</h3>
                </div>
                <div className="widget-filter-list"> 
                   {categoriesList}
                </div>
            </div>
            <div className="widget-section">
                <div className="widget-title">
                    <h3>Couleurs</h3>
                </div>
                <div className="widget-filter-list">                    
                  {couleursList} 
                </div>
            </div>
            <div className="widget-section">
                <div className="widget-title">
                    <h3>Prices</h3>
                </div>
                <div className="widget-filter-list">                    
                  {pricesList} 
                </div>
            </div>
        </div>

        <div className="filter-container">
            <OutlineButtonBlack className="filter-btn" onClick={()=> handleCollapse('open')}><BsFunnel className="filter-icon"/>Filtrer par</OutlineButtonBlack>
            <div className="sort-box">
                <select className="sort-select" name="sort" id="sort" onChange={(e)=> dispatch(SortByPrice(sortedProducts, e.target.value))}>
                    <option value="sortpricelh">Prix croissant</option>
                    <option value="sortpricehl">Prix décroissant</option>
                </select>
            </div>
        </div> 
        </>
    )
}

export default Filter;
