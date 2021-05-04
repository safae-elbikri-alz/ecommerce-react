import { SET_COULEURS} from './couleurTypes'
import axios from 'axios'

export const getCouleurs = ()  => {

  return (dispatch)=>{
    axios.get('/couleur/couleurs')
        .then((response)=>{
            console.log(response.data);
            dispatch(setCouleur(response.data));
        })
        .catch((error)=>{
            console.log(error);
        });

  }
}

const setCouleur = (couleurs)=>{
    return{
      type : SET_COULEURS,
      couleurs : couleurs
    }
}