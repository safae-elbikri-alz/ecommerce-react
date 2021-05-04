import {
    SET_CATEGORIES
} from './categorieTypes';


const initialState = {
    categories:[],
    loading:true
}

function catReducer(state = initialState, action){
    switch(action.type){
        case SET_CATEGORIES:
        return {
            ...state,
            categories:action.categories,
            loading:false

        }
        default: return state
    }

}

export default catReducer;