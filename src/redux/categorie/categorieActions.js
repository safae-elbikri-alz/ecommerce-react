import { SET_CATEGORIES} from './categorieTypes'
import axios from 'axios'

export const getCategories = ()  => {

  return (dispatch)=>{
    axios.get('/categorie/categories')
        .then((response)=>{
            console.log(response.data);
            dispatch(setCategorie(response.data));
        })
        .catch((error)=>{
            console.log(error);
        });

  }
}

const setCategorie = (categories)=>{
    return{
      type : SET_CATEGORIES,
      categories : categories
    }
}