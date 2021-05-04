import axios from "axios"
import { SET_AUTHENTICATION, LOGOUT_USER, SET_CURRENT_USER, SET_LOADING } from "./authTypes"

export const loginUser = (formData) => {
    return (dispatch) => {
        axios.post("/auth/login", formData)
            .then((response) => {
                localStorage.setItem("jwt", response.data.jwt);
                dispatch(setAuthentication(true));
            })
            .catch((error)=>{
                console.log(`error: ${error}`);
            })
    }
}

export const setAuthentication = (authenticated) =>{
    return{
        type: SET_AUTHENTICATION,
        authenticated: authenticated
    }
}

export const logoutUser = () => {
    return {
        type: LOGOUT_USER
    }
}

export const setCurrentUser = (payload) => {
    return {
        type: SET_CURRENT_USER,
        payload: payload
    }
}

export const fetchCurrentUser = () => {
    return (dispatch) => {
        axios.get("/auth/current")
            .then(response => {
                dispatch(setCurrentUser(response.data));
            })
            .catch(error => {
                console.log(error);
            })
    }
}


export const isAuthenticated = () => {
    return (dispatch) => {
        axios.get("/auth/authenticated")
            .then(response => {
                dispatch(setAuthentication(true));
            })
            .catch(error => {
                dispatch(setAuthentication(false));
            });
    }
}

export const setLoading = (loading) => {
    return {
        type: SET_LOADING,
        loading: loading
    }
}
