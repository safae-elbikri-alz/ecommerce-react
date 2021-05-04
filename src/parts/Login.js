import React,{useEffect, useState } from 'react'
import {BlackBlackButton, DefaultButton,BlackBlackButton2} from './Button'
import {FaTimes} from 'react-icons/fa'
import {Link,BrowserRouter as Router, useHistory} from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { loginUser } from '../redux/auth/authActions'
import { loginVisible } from '../redux/app/appActions'


function Login({closeMenu}) {
    const history = useHistory();
    const dispatch = useDispatch();
    const isLoginVisible = useSelector(state => state.app.loginVisible);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    function closeLoginOverlay(){
        dispatch(loginVisible(false));
        document.querySelector('.login-overlay').classList.add('hidden');
    }

    useEffect(() => {
        !isLoginVisible && document.querySelector('.login-overlay').classList.add('hidden');
        
    }, [isLoginVisible])

    function closeLoginAndRedirect(){
        closeLoginOverlay();
        history.push("/register");
    }


    const handleFormSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(formData));
        closeLoginOverlay();
    }

    return (
        <>
        <div className="login-register-container">
        <button className="close-menu-btn icon-btn no-display-small">
            <FaTimes onClick={closeLoginOverlay}/>
        </button>
        <div className="no-display-small login-logo-box">
        <h2 style={{fontFamily:"serif"}}>Tout-Destock</h2>
        </div>
        <div className="login-container">
            <div className="login-box box">
                <form className="login-form" onSubmit={handleFormSubmit}>
                    <h3 className="no-display-small login-box-header">Super de vous revoir!</h3>
                    <div className="input-group-login">
                        <input 
                            type="email" 
                            id="email" 
                            placeholder="Email Address" 
                            onChange={(e) => setFormData({...formData, email: e.target.value})} 
                        />
                        <input 
                            type="password" 
                            id="password" 
                            placeholder="Password"
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="agreement">Mot de passe oublié ?</label>
                    </div>
                    <BlackBlackButton>SE CONNECTER</BlackBlackButton>
                </form>
                <Router>
                    <Link to="/register"><BlackBlackButton2 onClick={closeLoginAndRedirect}>S'ENREGISTRER</BlackBlackButton2></Link>
                </Router>
            </div>
        </div>
        <DefaultButton className="close-login-btn" onClick={closeMenu}>X CLOSE</DefaultButton>
        </div>
        <div className="login-box-large-screen"></div>
        </>
    )
}

export default Login;
