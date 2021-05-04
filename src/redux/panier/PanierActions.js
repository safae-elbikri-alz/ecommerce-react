import { ADD_TO_CART,INCREMENT,DECREMENT,CLEAR_PANIER,REMOVE_ITEM_FROM_PANIER } from "./PanierTypes"




export const addToCart = (cartItem)=>{ 
    return {
        type: ADD_TO_CART,
        payload: cartItem
    };
};


export const increment = (id)=>{
    return {
        type: INCREMENT,
        id: id
    }
}

export const decrement = (id)=>{
    return {
        type: DECREMENT,
        id: id
    }
}

export const clearPanier = ()=>{
    return {
        type: CLEAR_PANIER
    }
}

export const removeItem = (id)=>{
    return {
        type: REMOVE_ITEM_FROM_PANIER,
        id: id
    }
}