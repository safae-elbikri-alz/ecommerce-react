import React , {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {FaAngleLeft, FaMinus, FaPlus} from 'react-icons/fa'
import {Button, BlackButton} from '../parts/Button'
import {addToCart} from "../redux/panier/PanierActions"
import { getProductById } from '../redux/product/productActions'

function DetailProduct(props){

    const products = useSelector(state => state.product.produits);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [singleProduct,setproduct] = useState({});   
    const [cartItem, setCartItem] = useState({
        id: 0,
        count: 0,
        couleur: 0,
        prixReel: 0,
        photo: "",
        nom: ""
    });

    useEffect(()=>{
        var idp = parseInt(props.match.params.id);
        const product = products.filter(item => item.id === idp)[0];
        if(!product) {
            dispatch(getProductById(idp))
                .then(res => {
                    setproduct(res.data);
                    setCartItem({
                        id: res.data.id,
                        count: 1,
                        couleur: 0,
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
                prixReel: product.prixReel,
                photo: product.photo,
                nom: product.nom,
            });
            setLoading(false);
        }
    },[])

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

    let {id,name, category,count,description,quantite,incart, price,couleurs} = {id:singleProduct.id,name:singleProduct.nom,category:singleProduct.categorie,
                                                                        count:0,description:singleProduct.description,quantite:singleProduct.quantite,incart:false,
                                                                        price:singleProduct.prixReel,
                                                                        couleurs : singleProduct.couleurs
                                                                     }
                                        
    return(
        <>
            <div className="page page-container">
                <Link to='/shop' className="inner-link"><FaAngleLeft className="bigger"/>Back to products</Link>
                <section className="detail-page-container">
                <div className="detail-container">
                    <div className="detail-image-container">
                        <div className="mainImg">
                            <img src={`${axios.defaults.baseURL}/files/produits/${singleProduct.photo}`} alt={name}/>
                        </div>
                    </div>
                    <div className="detail-detail-container">
                        <p className="name">{name}</p>
                        <p className="price">
                            {price} €
                        </p>
                        <span className="h-line"></span>
                        {
                            couleurs && couleurs.length !== 0 &&
                            <select defaultValue={0} onChange={(e) => setCartItem({...cartItem, couleur: e.target.value})}>
                                {
                                    couleurs.map((c,idx) => <option key={idx} value={idx}>{c.nom}</option>)
                                }
                            </select>
                        }
                        <div className="counter-box">
                            <div className="counter">{cartItem.count}</div>
                            <div className="increment-box">
                                <button className="increase" onClick={()=> setCartItem({...cartItem, count: cartItem.count+1})}><FaPlus /></button>
                                <button className="decrease" onClick={()=> setCartItem({...cartItem, count: cartItem.count-1})}><FaMinus /></button>
                            </div>

                        </div>
                        <div className="fix-width">
                            <div className="row">
                                <h3>{quantite} items disponible</h3>
                                <Button className={incart ? "no-margin btn-disabled" : "no-margin"} onClick={()=> dispatch(addToCart(cartItem))} disabled={incart}>
                                    {incart? "Déjà au panier" : "Ajouter au panier"}
                                </Button>
                            </div>
                            <Link to="/checkout"><BlackButton>Procéder au payement</BlackButton></Link>
                            <p className="description">{description}</p>
                        </div>
                        <p>Categorie:
                            <span className="category-span">{` ${category}`}</span>
                        </p>
                    </div>
                </div>
                </section>
            </div>
        </>
    )    
}

export default DetailProduct;

