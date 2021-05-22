import { combineReducers } from "redux";
import authReducer from './auth/authReducer';
import appReducer from './app/appReducer';
import ProductReducer from "./product/productReducers";
import catReducer from "./categorie/categorieReducers";
import couleurReducer from "./couleur/couleurReducers";
import PanierReducer from "./panier/PanierReducers";
import commandeReducer from "./commande/commandeReducer";

const rootReducer = combineReducers({
    auth : authReducer,
    app: appReducer,
    product : ProductReducer,
    categorie : catReducer,
    couleur : couleurReducer,
    panier : PanierReducer,
    commande : commandeReducer
})

export default rootReducer;