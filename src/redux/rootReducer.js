import { combineReducers } from "redux";
import authReducer from './auth/authReducer';
import appReducer from './app/appReducer';
import ProductReducer from "./product/productReducers";
import catReducer from "./categorie/categorieReducers";
import couleurReducer from "./couleur/couleurReducers";
import PanierReducer from "./panier/PanierReducers";
import CheckoutReducer from './checkout/checkoutReducer';

const rootReducer = combineReducers({
    auth : authReducer,
    app: appReducer,
    product : ProductReducer,
    categorie : catReducer,
    couleur : couleurReducer,
    panier : PanierReducer,
    checkout : CheckoutReducer
})

export default rootReducer;