import axios from "axios"
import { CLEAR_CURRENT_COMMANDE, SET_CURRENT_COMMANDE_REQUEST, SET_LIST_COMMNADES, SET_SELECTED_COMMANDE } from "./commandeTypes";


export const createCommande = (commande) => {
    return (dispatch) => axios.post('/commande/save', commande);
};

export const setCurrentCommande = (commande) => {
    return {
        type: SET_CURRENT_COMMANDE_REQUEST,
        commande: commande
    };
};

export const clearCurrentCommande = () => {
    return {
        type: CLEAR_CURRENT_COMMANDE
    };
};

export const getCommande = (id_commande) => {
    return (dispatch) => {
        axios.get(`/commande/${id_commande}`)
            .then(res => {
                dispatch(setSelectedCommande(res.data));
            });
    };
};

export const getListCommandes = (page, size) => {
    let url = '/commande';
    if(page && size){
        url += `?page=${page}&size=${size}`;
    }
    return (dispatch) => {
        axios.get(url)
            .then(res => {
                dispatch(setListCommandes(res.data));
            });
    };
};

export const setSelectedCommande = (commande) => {
    return {
        type: SET_SELECTED_COMMANDE,
        commande: commande
    }
};

export const setListCommandes = (commandes) => {
    return {
        type: SET_LIST_COMMNADES,
        commandes: commandes
    }
};