import { ADD_TO_CART, INCREMENT, DECREMENT, REMOVE_ITEM_FROM_PANIER,CLEAR_PANIER, CHANGE_COLOR} from "./PanierTypes";

const initCart = JSON.parse(localStorage.getItem('cart') || JSON.stringify([]));

const initial = {
    cart : initCart,
    countPanier : initCart.length
}

const PanierReducer = (state = initial,action)=>{
    switch(action.type){
        case ADD_TO_CART:
            return addToCart(state, action.payload);
        case REMOVE_ITEM_FROM_PANIER:
            return removeFromCart(state, action.id);
        case CHANGE_COLOR:
            return changeColor(state, action.id, action.color);
        case INCREMENT:
            return increment(state, action.id);
        case DECREMENT:
            return decrement(state, action.id);
        case CLEAR_PANIER:
            return clearCart(state);
        default: return state;
    }
}

const addToCart = (state, payload) => {
    let cartLocalStorage = JSON.parse(localStorage.getItem('cart') || JSON.stringify([]));
    if(!cartLocalStorage.map(prod => prod.id).includes(payload.id)){
        cartLocalStorage = [
            ...cartLocalStorage, payload
        ]
    }
    
    localStorage.setItem('cart', JSON.stringify(cartLocalStorage));
    return {
        ...state,
        cart: cartLocalStorage,
        countPanier: cartLocalStorage.length
    }
}

const removeFromCart = (state, id) => {
    let cartLocalStorage = JSON.parse(localStorage.getItem('cart') || JSON.stringify([]));
    cartLocalStorage = cartLocalStorage.filter(item => item.id !== id);
    
    localStorage.setItem('cart', JSON.stringify(cartLocalStorage));
    
    return {
        ...state,
        cart: cartLocalStorage,
        countPanier: cartLocalStorage.length
    }
}


const clearCart = (state)=>{

    localStorage.removeItem("cart");
    return{
        ...state,
        cart : [],
        countPanier : 0, 
    }
}

const changeColor = (state, id, color) => {
    let cartLocalStorage = JSON.parse(localStorage.getItem('cart') || JSON.stringify([]));
    cartLocalStorage = cartLocalStorage.map(item => {
        if(item.id === id){
            item.couleur = color;
        }

        return item;
    });

    localStorage.setItem('cart', JSON.stringify(cartLocalStorage));
    
    return {
        ...state,
        cart: cartLocalStorage
    }
}

const increment = (state, id) => {
    let cartLocalStorage = JSON.parse(localStorage.getItem('cart') || JSON.stringify([]));
    cartLocalStorage = cartLocalStorage.map(item => {
        if(item.id === id){
            ++(item.count);
        }

        return item;
    });

    localStorage.setItem('cart', JSON.stringify(cartLocalStorage));
    
    return {
        ...state,
        cart: cartLocalStorage,
        countPanier: cartLocalStorage.length
    }
}

const decrement = (state, id) => {
    let cartLocalStorage = JSON.parse(localStorage.getItem('cart') || JSON.stringify([]));
    cartLocalStorage = cartLocalStorage.map(item => {
        if(item.id === id){
            --(item.count);
        }

        return item;
    });

    localStorage.setItem('cart', JSON.stringify(cartLocalStorage));
    
    return {
        ...state,
        cart: cartLocalStorage,
        countPanier: cartLocalStorage.length
    }
}

export default PanierReducer;