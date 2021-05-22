import React, { useEffect, useState ,useRef } from 'react'
import { Link, BrowserRouter as Router, useHistory } from 'react-router-dom'
import { AiOutlineUser, AiOutlineShopping, AiOutlineAlignLeft } from 'react-icons/ai'
import { FaTimes } from 'react-icons/fa'
import Login from './Login'
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/auth/authActions';
import { loginVisible } from '../redux/app/appActions';
import { useDetectOutsideClick } from "./useDetectOutsideClick";
import '../parts/dropdown.css';

function Navbar() {

    const [isOpen, setOpen] = useState(false);
    const dispatch = useDispatch();

    const history = useHistory();
    const authenticated = useSelector(state => state.auth.authenticated);
    const currentUser = useSelector(state => state.auth.user);
    const isLoginVisible = useSelector(state => state.app.loginVisible);

    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
    const onClick = () => setIsActive(!isActive);

    var allBtns = document.querySelectorAll('.btn-top-menu-open')
    allBtns.forEach(item => item.addEventListener('click', (e) => controlMenu(e), false))
    const fullheightpage = useSelector(state => state.app.fullheightpage);
    const cartCount = useSelector(state=>state.panier.countPanier)

    const controlMenu = (e) => {
        let mynode = e.target
        if (e.target.nodeName !== 'BUTTON') {
            mynode = e.target.parentNode
        }
        //remove active class from all
        let allBtns = document.querySelectorAll('.btn-top-menu-open')
        allBtns.forEach(item => item.classList.remove('active'))
        //add active class to the clicked btn
        mynode.classList.add('active')
        let target = mynode.dataset.click

        let menuBox = document.querySelector('.menu-container')
        let loginBox = document.querySelector('.login-containers')
        if (target === 'menu') {
            menuBox.classList.remove('hidden')
            loginBox.classList.add('hidden')
        }
        if (target === 'login') {
            menuBox.classList.add('hidden')
            loginBox.classList.remove('hidden')
        }
    }

    const toggleMenu = (e) => {
        e.stopPropagation()
        setOpen(!isOpen);
    }

    const closeMenu = () => {
        setOpen(false);
    }

    const openLoginOverlay = () => {
        dispatch(loginVisible(true));
    }

    useEffect(() => {
        if (authenticated) {
            history.push("/");
        } else if (isLoginVisible) {
            document.querySelector('.login-overlay').classList.remove('hidden');
        }
    }, [isLoginVisible])

    const logout = () => {
        dispatch(logoutUser());
        history.push("/");
        closeMenu();
    }

    useEffect(() => {
        const overlay = document.querySelector('.overlay-navbar')
        overlay.addEventListener('click', () => {
            if (isOpen) {
                closeMenu();
            }
        })
        const navbar = document.querySelector('.navbar')
        window.addEventListener('scroll', (e) => {

            if (window.scrollY > 60) {
                navbar.classList.add('navbar-bg')
            }
            if (window.scrollY < 60) {
                navbar.classList.remove('navbar-bg')
            }
        })
    }, []);

    return (
        <div >
            <div className="login-overlay hidden">
                <Login closeMenu={closeMenu} />
            </div>
            <nav className={fullheightpage ? 'hidden' : ''}>
                <div className={isOpen ? "overlay-navbar" : "overlay-navbar hidden"}></div>
                <div className="navbar">
                    <button className="burger-icon icon-btn" onClick={toggleMenu}>
                        <AiOutlineAlignLeft />
                    </button>
                    <div className="logo-container">
                        <h1 style={{ fontFamily: "serif", fontSize: '30px' }}><Link to="/" style={{color: 'black', textDecoration: 'none'}}>Tout Destock</Link></h1>
                    </div>
                    <div className="menu-right">
                        
                        <button onClick={authenticated ? () => onClick() : openLoginOverlay } className="menu-trigger"><AiOutlineUser/> </button>
                    <nav
                        ref={dropdownRef}
                        className={`menuu ${isActive ? "active" : "inactive"}`}
                        >
                        <ul>
                            <li style={{textAlign:'center', Padding:'2px', fontSize:'20px'}}>
                            {currentUser.nom} {currentUser.prenom}
                            </li>
                            <li>
                            <Link to="/account">Mon compte</Link>
                            </li>
                            {authenticated && <li onClick={logout}><Link to="#">Se déconnecter</Link></li>}
                            
                        </ul>
        </nav>




                        
                        <button className="icon-btn menu-right-cart-icon"><Link to="/cart"><AiOutlineShopping /></Link>
                            <span className="cart-count-navbar">{cartCount}</span>
                        </button>
                    </div>
                    <div className={isOpen ? 'submenu-container submenu-open' : 'submenu-container '}>
                        <div className="menu-open-top-container">
                            <button className="icon-btn btn-top-menu-open active" data-click="menu"><AiOutlineAlignLeft /> <span>menu</span></button>
                            <button className="icon-btn btn-top-menu-open" data-click="login"><AiOutlineUser /> <span>login</span></button>
                        </div>
                        <div className="full-height hidden login-containers">
                            <Login closeMenu={closeMenu} />
                        </div>
                        <ul className="submenu-list menu-container">
                            <li onClick={closeMenu} className="close-btn-container">
                                <button className="close-menu-btn icon-btn">
                                    <FaTimes />
                                </button>
                            </li>
                            <li onClick={closeMenu}><Link to="/">Accueil</Link></li>
                            <li onClick={closeMenu}><Link to="/shop">Produits</Link></li>
                            <li onClick={closeMenu}><Link to="/about">A propos de nous</Link></li>
                            {!authenticated && <li onClick={closeMenu}><Link to="/register">Inscription</Link></li>}
                            
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;