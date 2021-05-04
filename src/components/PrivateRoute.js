import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, useHistory } from "react-router-dom";
import { loginVisible } from "../redux/app/appActions";

function PrivateRoute({loginRequired, children, ...rest}) {
    const dispatch = useDispatch();
	const loading = useSelector(state => state.auth.loading);
	const authenticated = useSelector(state => state.auth.authenticated);
    const history = useHistory();
    
    if (loading){
        return <div />;
    }else{
        const redirectToHome = (props) => {
            dispatch(loginVisible(true));
            return <Redirect to={{pathname: "/", from: props.location}} />;
        };

        const redirectToAccount = () => {
            dispatch(loginVisible(true));
            return <Redirect to={{pathname: "/account"}} />;
        };
        
        const proceed = () => {
            dispatch(loginVisible(false));
            return children;
        }

        const renderChild = (props) => {
            if(loginRequired){
                return authenticated === true ? proceed() : redirectToHome(props);
            }else{
                return authenticated === true ? redirectToAccount() : proceed();
            }
        }
        
        return (
            <Route {...rest} render={(props) => renderChild(props)} />
        )
    }
}

export default PrivateRoute;