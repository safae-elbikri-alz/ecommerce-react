
import React ,{useEffect } from 'react';
import {Route , Switch} from 'react-router-dom'
import './App.css';
import Home from './pages/Home'
import Navbar from './parts/Navbar'
import Footer from './parts/Footer'
import Shop from './pages/Shop'
import DetailProduct from './pages/DetailProduct'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Account from './pages/Account'
import AboutUs from './pages/AboutUs'
import Terms from './pages/Terms'
import MentionsLegal from './pages/MentionsLegal'
import Conditions from './pages/Conditions'
import Register from './pages/Register'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { fetchCurrentUser, isAuthenticated } from './redux/auth/authActions';
import PrivateRoute from './components/PrivateRoute';
import ScrollToTop from './components/ScrollToTop';

function App(){
 	const authenticated = useSelector(state => state.auth.authenticated);
	const dispatch = useDispatch();

	useEffect(() => {
		const jwt = localStorage.getItem("jwt");
		axios.defaults.headers.common['Authorization'] = jwt == null ? '' : `Bearer ${jwt}`;
		dispatch(isAuthenticated());
		if(authenticated){
			dispatch(fetchCurrentUser());
		}
	}, [authenticated]);

    return (
      <>
        <Navbar />
		<ScrollToTop />
		<Switch>
			<Route path="/" exact component={Home} />
			<PrivateRoute path="/register" loginRequired={false}>
				<Register/>
			</PrivateRoute>
			<Route path="/shop" component={Shop} />
			<Route path="/about" component={AboutUs} />
			<Route path="/terms" component={Terms} />
			<Route path="/conditions" component={Conditions} />
			<Route path="/mentionsLegal" component={MentionsLegal} />
			<PrivateRoute path="/account" loginRequired={true}>
				<Account/>
			</PrivateRoute>
			<Route path="/cart" component={Cart} />
			<PrivateRoute path="/checkout" loginRequired={true}>
				<Checkout/>
			</PrivateRoute>
			<Route path="/detail/:id" component={DetailProduct} />
		</Switch>
        <Footer />
      </>
	);
}

export default App;
