import axios from "axios"


export const creerCommande = (commande) => {
    return (dispatch) => {
        return axios.post('/commande/save', commande);
    }
}