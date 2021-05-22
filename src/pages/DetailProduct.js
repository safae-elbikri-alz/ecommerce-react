import React , {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {FaAngleLeft, FaMinus, FaPlus} from 'react-icons/fa'
import {Button, BlackButton} from '../parts/Button'
import {addToCart} from "../redux/panier/PanierActions"
import { getProductById } from '../redux/product/productActions'

function DetailProduct(props){
    const cart = useSelector(state => state.panier.cart);
    const products = useSelector(state => state.product.produits);
    const dispatch = useDispatch();
    const [inCart, setInCart] = useState(false);
    const [loading, setLoading] = useState(true);
    const [singleProduct,setproduct] = useState(null);   
    const [cartItem, setCartItem] = useState({
        id: 0,
        count: 1,
        couleur: 0,
        couleurs: [],
        prixReel: 0,
        photo: "",
        nom: ""
    });

    useEffect(()=>{
        const idp = parseInt(props.match.params.id);
        const product = products.filter(item => item.id === idp)[0];
        if(!product) {
            dispatch(getProductById(idp))
                .then(res => {
                    setproduct(res.data);
                    setCartItem({
                        id: res.data.id,
                        count: 1,
                        couleur: 0,
                        couleurs: res.data.couleurs,
                        prixReel: res.data.prixReel,
                        photo: res.data.photo,
                        nom: res.data.nom,
                    });
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err);
                    setLoading(false);
                });
        }else{
            setproduct(product);
            setCartItem({
                id: product.id,
                count: 1,
                couleur: 0,
                couleurs: product.couleurs,
                prixReel: product.prixReel,
                photo: product.photo,
                nom: product.nom,
            });
            setLoading(false);
        }

        
    },[])

    useEffect(() => {
        const idp = parseInt(props.match.params.id);
        const searchRes = cart.filter(p => parseInt(p.id) === idp);
        if(searchRes && searchRes.length > 0){
            setInCart(true);
        }else{
            setInCart(false);
        }
    }, [cart]);

    useEffect(() => {
        if(singleProduct){
            setCartItem({
                ...cartItem,
                couleur: (singleProduct.couleurs && singleProduct.couleurs.length > 0) 
                    ? singleProduct.couleurs[0].id
                    : 0
            });
        }
    }, [singleProduct])

    if(!loading && (singleProduct === '' || !singleProduct)){
        return(
            <div className="no-result page-container">
                <h3>NO SUCH PRODUCT COULD BE FOUND...</h3>
                <Button className="banner-btn btn"><Link to="/shop" >back to rooms</Link></Button>
            </div>
        )
    } else if(loading){
        return <div></div>;
    }
                                        
    return(
        <>
            <div className="page page-container">
                <Link to='/shop' className="inner-link"><FaAngleLeft className="bigger"/>Retour à la liste des produits</Link>
                <section className="detail-page-container">
                    <div className="detail-container">
                        <div className="detail-image-container">
                            <div className="album" style={{width: '100px'}}>
                                <img 
                                    className="album-img" 
                                    src={`${axios.defaults.baseURL}/files/produits/${singleProduct.photo}`} 
                                    alt="produit"
                                />
                            </div>
                            <div className="mainImg">
                                <img src={`${axios.defaults.baseURL}/files/produits/${singleProduct.photo}`} alt={singleProduct.nom}/>
                            </div>
                        </div>
                        <div className="detail-detail-container">
                            <p className="name">{singleProduct.nom}</p>
                            <p className="price">
                                {singleProduct.prixReel} €
                            </p>
                            <div>
                                <div className="row">
                                    {
                                        singleProduct.couleurs && singleProduct.couleurs.length > 0 &&
                                        <div className="counter-box">
                                            <select
                                                className="product-color-selector" 
                                                defaultValue={singleProduct.couleurs && singleProduct.couleurs[0].id} 
                                                onChange={(e) => setCartItem({...cartItem, couleur: parseInt(e.target.value)})}
                                            >
                                                {
                                                    singleProduct.couleurs.map((c,idx) => <option key={idx} value={c.id}>{c.nom}</option>)
                                                }
                                            </select>
                                        </div>
                                    }
                                    <div className="counter-box">
                                        <div className="counter">{cartItem.count}</div>
                                        <div className="increment-box">
                                            <button className="increase" onClick={()=> setCartItem({...cartItem, count: cartItem.count+1})}><FaPlus /></button>
                                            <button className="decrease" onClick={()=> setCartItem({...cartItem, count: cartItem.count-1})}><FaMinus /></button>
                                        </div>

                                    </div>
                                    <Button className={inCart ? "no-margin btn-disabled" : "no-margin"} onClick={()=> {dispatch(addToCart(cartItem)); setInCart(true)}} disabled={inCart}>
                                        {inCart? "Déjà au panier" : "Ajouter au panier"}
                                    </Button>
                                </div>
                                <Link to="/checkout" onClick={()=> dispatch(addToCart(cartItem))}><BlackButton>Procéder au payement</BlackButton></Link>
                                <p className="description">{singleProduct.description}</p>
                            </div>
                            <p>Categorie:
                                <span className="category-span">{` ${singleProduct.categorie}`}</span>
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )    
}

export default DetailProduct;

