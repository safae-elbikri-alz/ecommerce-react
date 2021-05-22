import { CLEAR_CURRENT_COMMANDE, SET_CURRENT_COMMANDE_REQUEST, SET_LIST_COMMNADES, SET_SELECTED_COMMANDE } from "./commandeTypes";


const initState = {
    request: {
        firstname: null,
        lastname: null,
        email: null,
        suite: null,
        adresse: null,
        ville: null,
        zip: null,
        province: null,
        idClient: null,
        idPays: null,
        idShipping: null,
        produits: [],
        paid: false,
        paiement: {}
    },
    list: [],
    selected: null
};

const commandeReducer = (state = initState, action) => {
    switch(action.type){
        case SET_CURRENT_COMMANDE_REQUEST:
            return setCommandeRequest(state, action.commande);
        case CLEAR_CURRENT_COMMANDE:
            return initState;
        case SET_SELECTED_COMMANDE:
            return setSelectedCommande(state, action.commande);
        case SET_LIST_COMMNADES:
            return setListCommandes(state, action.commandes);
        default:
            return state;
    }
};

const setCommandeRequest = (state, commande) => {
    return {
        ...state,
        request: commande
    };
};

const setSelectedCommande = (state, commande) => {
    return {
        ...state,
        selected: commande
    };
};

const setListCommandes = (state, commandes) => {
    return {
        ...state,
        list: commandes
    };
};

export default commandeReducer;