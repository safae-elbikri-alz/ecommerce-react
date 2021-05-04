import {
    SET_COULEURS
} from './couleurTypes';


const initialState = {
    couleurs:[],
    
}

function couleurReducer(state = initialState, action){
    switch(action.type){
        case SET_COULEURS:
        return {
            ...state,
            couleurs:action.couleurs,
            

        }
        default: return state
    }

}

export default couleurReducer;