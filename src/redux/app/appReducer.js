import { FULL_HEIGHT_PAGE, LOGIN_VISIBLE } from "./appTypes";

const initialState = {
    loginVisible: false,
    fullheightpage: false
}

const appReducer = (state = initialState, action) => {
    switch(action.type){
        case LOGIN_VISIBLE:
            return {
                ...state,
                loginVisible: action.visible
            };
        case FULL_HEIGHT_PAGE:
            return {
                ...state,
                fullheightpage: action.fullheightpage
            }
        default: return state;
    }
}

export default appReducer;