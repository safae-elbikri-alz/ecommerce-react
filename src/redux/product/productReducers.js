import {SET_PRODUITS,
         SORT_PRODUCT_BY_PRICE,
        FILTER_PRODUCT_BY_PRICE_INTERVAL,
        FILTER_PRODUCT_COLOR,
        FILTER_PRODUCT_BY_CATEGORIE} from "./productTypes";


const initial = {
    produits: [],
    sortedProducts : [],
}

const ProductReducer = (state = initial, action) => { 
    switch(action.type){
        case SET_PRODUITS:
            return {
                ...state,
                produits: action.products,
                sortedProducts : action.products,
            }
        case SORT_PRODUCT_BY_PRICE:
            return{
                ...state,
                sortedProducts: action.items,
            }
        case FILTER_PRODUCT_BY_PRICE_INTERVAL:
            return{
                ...state,
                sortedProducts : action.items,
            }
        case FILTER_PRODUCT_COLOR:
            return{
                ...state,
                sortedProducts : action.items
            }
         case FILTER_PRODUCT_BY_CATEGORIE:
            return{
                ...state,
                sortedProducts : action.items
            }   
        default: return state;
    }
}

export default ProductReducer;
