import {LOGOUT_USER, 
       SET_AUTHENTICATION, 
       SET_CURRENT_USER, 
       SET_LOADING } from "./authTypes";


const initial = {
    loading: true,
    authenticated: false,
    user: {}
}


const authReducer = (state = initial, action) => { 
    switch(action.type){
        case SET_AUTHENTICATION:
            return {
                ...state,
                loading: false,
                authenticated: action.authenticated
            }
        case SET_CURRENT_USER:
            return setCurrentUser(state,action.payload);
        case LOGOUT_USER: 
            return logout();
        case SET_LOADING:
            return {
                ...state,
                loading: action.loading
            }
        default: return state;
    }
}

const setCurrentUser = (state, payload) => {
    return {
        ...state,
        loading: false,
        authenticated: true,
        user: payload
    }
}

const logout = (state) => {
    localStorage.removeItem("jwt");
    return {
        ...state,
        loading: false,
        authenticated: false,
        user: {}
    }
}

export default authReducer;