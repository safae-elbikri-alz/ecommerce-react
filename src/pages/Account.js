import React, { useEffect,useState } from 'react'
import {StyledHero} from '../parts/StyledHero'
import { useDispatch, useSelector } from 'react-redux';
import '../Account.css';


import axios from 'axios';


function Account(){

    const currentUser = useSelector(state => state.auth.user);
    const [User, setUser] = useState(currentUser);

    const showedit = () => {
         document.querySelector('.edit').classList.remove('hidden');
         document.querySelector('.info').classList.add('hidden'); 
         document.querySelector('.commande').classList.add('hidden');  
    }

    const showinfo = () => {
        document.querySelector('.info').classList.remove('hidden');
        document.querySelector('.edit').classList.add('hidden'); 
        document.querySelector('.commande').classList.add('hidden');  
   }

     const showcommande = () => {
        document.querySelector('.commande').classList.remove('hidden');
        document.querySelector('.edit').classList.add('hidden'); 
        document.querySelector('.info').classList.add('hidden');  
    }

    const [countries,setCountry] = useState([]);
    const [selectedValue,setSelectedValue] = useState(0);
    const [currentTelCode, setCurrentTelCode] = useState("");
    const [response, setResponse] = useState({
        completed: false,
        status: "",
        message: "", 
    });

 

    useEffect(()=>{
        axios.get('/pays')
        .then((response)=>{
            setCountry(response.data);
        })
        .catch(error=>console.error(`Error: ${error}`));
    },[]);

    useEffect(() => {
        const currentCountry = countries.filter(country => country.id === selectedValue);
        const temp = currentCountry.length !== 0 ? currentCountry[0].codePaysTelephone : "";
        setCurrentTelCode(temp);
    }, [selectedValue])

    const handleFormSubmit = (e) => {
        e.preventDefault()
        setResponse({
            completed: false,
            status: "",
            message: "",
        })

        if(e.target[8].value !== e.target[9].value){
            alert("Veuillez confirmer votre mot de passe!");
            return;
        }
        
        const formData = {
            nom: e.target[0].value,
            prenom: e.target[1].value,
            adresse: e.target[2].value,
            zip: e.target[3].value,
            pays : e.target[4].value,
            ville: e.target[5].value,
            telephone: e.target[6].value,
            email : e.target[7].value,
            password : e.target[8].value
        };
        
        axios.put('/user/update',[ formData , currentUser.id ] )
            .then((response) => {
                setResponse({
                    completed: true,
                    status: "success",
                    message: "Le compte a bien été modifié!",
                })
            })
            .catch((error) => {
                setResponse({
                    completed: true,
                    status: "danger",
                    message: "Une erreur s'est produite!",
                })
            })
    }

    const handleInputChange = (e) => {
        setUser(state => ({...state, [e.target.name]: e.target.value}))
      };
 

    return (

        <div className="page page-container">
            <StyledHero title1='Products' >
                <span className="hero-overlay">
                    <h2>Mon profile</h2>
                </span>
            </StyledHero>
            <section >
                <div class="card">   
  

                <div class="nav"> 
                            <div class="form-white-background">                        
                                <p class="form-title-row"><h1>Mes données</h1></p>
                               <ul className="sbmenu-list">
                                   <li  onClick={ showinfo } ><a href="#" >Mes informations</a></li>
                                   <li  onClick={ showedit } ><a href="#" >Modifier mes infos</a></li>
                                   <li  onClick={ showcommande } ><a href="#" >Mes commandes</a></li>
                               </ul>
                            </div>
                        </div> 

{/* Partie mes informations */}         

                        <div class="info"  > 
                            <div class="form-white-background" >                        
                                <p class="form-title-row"><h1>Mes informations</h1></p>
                                <div className="form-row">
                                    <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
                                        <span>Nom :</span>
                                    </label>
                                    {currentUser.nom}
                                </div>

                                <div className="form-row">
                                    <label htmlFor="defaultFormRegisterPrenomEx" className="grey-text">
                                        <span> Prénom :</span>
                                    </label>
                                    {currentUser.prenom}
                                </div>
                                
                                <div className="form-row">
                                    <label htmlFor="defaultFormRegisterAdresseEx" className="grey-text">
                                        <span> Adresse : </span>
                                    </label>
                                    {currentUser.adresse} 
                                   
                                </div>

                                <div className="form-row">
                                    <label htmlFor="defaultFormRegisterZipEx" className="grey-text">
                                        <span>Code postal : </span>
                                    </label>
                                    {currentUser.zip}
                                </div>

                                <div className="form-row">
                                    <label htmlFor="defaultFormRegisterTelephoneEx" className="grey-text">
                                        <span>Téléphone :</span>
                                    </label>
                                    {currentUser.telephone}
                                </div>

                                <div className="form-row">
                                    <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
                                        <span> Email :</span>
                                    </label>
                                    {currentUser.email}
                                </div>
 
                                <div className="form-row text-center">
                                    <button  onClick={showedit}  >Editer</button>
                                </div>
                                
                            </div>
                        </div>                                     
              


{/* Partie edit informations */}
                         
                        <div  className="edit hidden"   > 
                        <form onSubmit={handleFormSubmit} > 
                            <div class="form-white-background" >                        
                                <p class="form-title-row"><h1>Modifier mes infos</h1></p>
                                <div className="form-row">
                                    <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
                                        <span>Nom :</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        name="nom" 
                                        id="defaultFormRegisterNameEx"     
                                        value= {User.nom}    
                                        onChange={handleInputChange}          
                                        required
                                    />
                                </div>

                                <div className="form-row">
                                    <label htmlFor="defaultFormRegisterPrenomEx" className="grey-text">
                                        <span> Prénom :</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        name="prenom" 
                                        id="defaultFormRegisterPrenomEx"  
                                        value= {User.prenom}    
                                        onChange={handleInputChange}                          
                                        required
                                    />
                                </div>
                                
                                <div className="form-row">
                                    <label htmlFor="defaultFormRegisterAdresseEx" className="grey-text">
                                        <span> Adresse :</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        name="adresse" 
                                        id="defaultFormRegisterAdresseEx" 
                                        value= {User.adresse}    
                                        onChange={handleInputChange}                           
                                        required
                                    />
                                </div>

                                <div className="form-row">
                                    <label htmlFor="defaultFormRegisterZipEx" className="grey-text">
                                        <span>Code postal : </span>
                                    </label>
                                    <input 
                                        type="text" 
                                        name="zip" 
                                        id="defaultFormRegisterZipEx"      
                                        value= {User.zip} 
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                
                                <div className="form-row">
                                    <label htmlFor="defaultFormRegisterPaysEx" className="grey-text">
                                        <span> Pays de résidence</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        name="zip" 
                                        id="defaultFormRegisterZipEx"      
                                        value= {User.pays} 
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>


                                <div className="form-row">
                                    <label htmlFor="defaultFormRegisterVilleEx" className="grey-text">
                                        <span> Ville de résidence</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        name="ville"
                                        id="defaultFormRegisterVilleEx" 
                                        value= {User.ville} 
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>


                                <div className="form-row">
                                    <label htmlFor="defaultFormRegisterTelephoneEx" className="grey-text">
                                        <span>Téléphone </span>
                                    </label>
                                    
                                    <input 
                                        type="text" 
                                        name="telephone"
                                        id="defaultFormRegisterTelephoneEx" 
                                        
                                        value = {User.telephone}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="form-row">
                                    <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
                                        <span> Email :</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        name="email" 
                                        id="defaultFormRegisterEmailEx"    
                                        value= {User.email}     
                                        onChange={handleInputChange}                       
                                        required
                                    />
                                </div>
                                <p style={ {fontFamily: 'verdana', fontSize:'20px', padding:'20px'}}>Modifier votre mdp ou confirmer les changements :</p>
                                <div className="form-row">
                                    <label htmlFor="defaultFormRegisterPasswordEx" className="grey-text">
                                        <span> Mot de passe</span>
                                    </label>
                                    <input 
                                        name="password"
                                        type="password" 
                                        id="defaultFormRegisterPasswordEx"  
                                        value= {User.password}   
                                        onChange={handleInputChange}                             
                                        required
                                    />
                                </div>
                                <div className="form-row">
                                    <label htmlFor="defaultFormRegisterConfirmEx" className="grey-text">
                                        <span>Confirmer le mot de passe </span>
                                    </label>
                                    <input 
                                        type="password" 
                                        name="confirmPassword"
                                        id="defaultFormRegisterConfirmEx"                                 
                                        required
                                    />
                                </div>
 
                                <div className="form-row ">                                                          
                                    <button type="submit" >Sauvegarder</button>                                 
                                </div>
                               
                                
                                
                            </div>
                            </form>
                        </div> 
                       
                       
                              

{/* Partie commandes */}
                        <div class="commande hidden"> 
                            <div class="form-white-background">                        
                                <p class="form-title-row"><h1>Mes commandes</h1></p>
                                <p >Votre historique de commande est vide.</p>
                            </div>
                        </div> 
        
                </div>





            </section>
        </div>


    )
}

export default Account
