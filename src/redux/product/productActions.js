import axios from "axios"
import {SET_PRODUITS, 
        SORT_PRODUCT_BY_PRICE,
        FILTER_PRODUCT_BY_PRICE_INTERVAL,
        FILTER_PRODUCT_COLOR,
        FILTER_PRODUCT_BY_CATEGORIE} from "./productTypes"

export const getProducts = (page = 0, size = 20)=>{
    return (dispatch)=>{
        axios.get(`/produit/produits?page=${page}&size=${size}`)
            .then((response)=>{
                dispatch(setProduits(response.data));
            })
            .catch((error)=>{
                console.log(error);
            });
    }
}

export const getProductById = (id) => {
    return () => axios.get(`/produit/edit/${id}`);
}

export const SortByPrice = (products, sortBy)=>(dispatch)=>{
   if(sortBy !== ""){
       if(sortBy === "sortpricelh"){
            products.sort((a,b)=>(a.prixReel>b.prixReel) ? 1 : -1);
       }else if(sortBy === "sortpricehl"){
            products.sort((a,b)=>(a.prixReel>b.prixReel) ? -1 : 1);
       }else{
        products.sort((a,b)=>(a.id>b.id) ? 1 : -1);
       }
   }

   return dispatch({
        type : SORT_PRODUCT_BY_PRICE,
        items : [...products]
   })
}


export const filterByPriceInterval = (products,val)=>(dispatch)=>{
    let pricerange = val.price.split(' - ');
    let SelectMinPrice = Number(pricerange[0]);
    let SelectMaxPrice = Number(pricerange[1]);
    products = products.filter(item=>{return item.prixReel <= SelectMaxPrice && item.prixReel >= SelectMinPrice});
    return dispatch({
        type : FILTER_PRODUCT_BY_PRICE_INTERVAL,
        items : [...products]
    });
}

export const filterByCategorie = (products,val)=>(dispatch)=>{
    let categorie = val.nom;
    products = products.filter(item=>{return item.categorie === categorie});
    return dispatch({
        type : FILTER_PRODUCT_BY_CATEGORIE,
        items : [...products]
    });
}

export const filterByColor = (products,val)=>(dispatch)=>{
    var couleur = val.couleur;
    products = products.filter(produit => produit.couleurs.map(c => c.nom).includes(couleur));
    return dispatch({
        type : FILTER_PRODUCT_COLOR,
        items : [...products]
    });
}

export const setProduits = (products)=>{
    return{
        type : SET_PRODUITS,
        products : products
    }
}

