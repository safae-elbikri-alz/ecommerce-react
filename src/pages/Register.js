import React, { useEffect,useState } from 'react'
import {StyledHero} from '../parts/StyledHero'
import { MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import {loginVisible} from '../redux/app/appActions'
import axios from 'axios';
import '../form-register.css';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/auth/authActions';

function Register() {
    const dispatch = useDispatch();
    const isLoginVisible = useSelector(state => state.app.loginVisible);
    const [countries,setCountry] = useState([]);
    const [selectedValue,setSelectedValue] = useState(0);
    const [currentTelCode, setCurrentTelCode] = useState("");
    const [response, setResponse] = useState({
        completed: false,
        status: "",
        message: "", 
    });

    const toggleAgreement = () =>{
        document.querySelector('.button').classList.toggle('btn-disabled');
    }

    const handleChange = (e) =>{
        const selected = parseInt(e.target.value);
        setSelectedValue(selected);
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        setResponse({
            completed: false,
            status: "",
            message: "",
        })

        if(e.target[9].value !== e.target[10].value){
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
            telephone: e.target[7].value,
            email : e.target[8].value,
            password : e.target[9].value
        };
        
        dispatch(registerUser(formData))
            .then((response) => {
                setResponse({
                    completed: true,
                    status: "success",
                    message: "Le compte a bien été créé!",
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

    
    useEffect(()=>{
        if(!isLoginVisible){
            document.querySelector('.login-overlay').classList.add('hidden');
        }
    },[isLoginVisible]);

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
    
    return (
        <div className="page page-container">
            <StyledHero title1='Products' >

                <span className="hero-overlay">
                    <h2>S'ENRGISTRER</h2>
                </span>
            </StyledHero>
            <section>
                <div class="form-register">   
                <MDBContainer>
            <MDBRow>
                <MDBCol md="6">
                    <div className={`alert alert-${response.status} ${response.completed ? "d-block" : "d-none"}`} role="alert">
                        {response.message}
                    </div>
                    <form onSubmit={handleFormSubmit} >                       
                        <div class="form-register-with-email"> 
                            <div class="form-white-background">                        
                                <p class="form-title-row"><h1>Créer votre compte</h1></p>
                                <div className="form-row">
                                    <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
                                        <span>Nom  *</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        name="nom" 
                                        id="defaultFormRegisterNameEx"                                
                                        required
                                    />
                                </div>

                                <div className="form-row">
                                    <label htmlFor="defaultFormRegisterPrenomEx" className="grey-text">
                                        <span> Prénom  *</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        name="prenom" 
                                        id="defaultFormRegisterPrenomEx"                                
                                        required
                                    />
                                </div>
                                
                                <div className="form-row">
                                    <label htmlFor="defaultFormRegisterAdresseEx" className="grey-text">
                                        <span> Adresse  *</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        name="adresse" 
                                        id="defaultFormRegisterAdresseEx"                                
                                        required
                                    />
                                </div>

                                <div className="form-row">
                                    <label htmlFor="defaultFormRegisterZipEx" className="grey-text">
                                        <span>Code postal *</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        name="zip" 
                                        id="defaultFormRegisterZipEx"       
                                        required
                                    />
                                </div>

                                <div className="form-row">
                                    <label htmlFor="defaultFormRegisterPaysEx" className="grey-text">
                                        <span> Pays de résidence  *</span>
                                    </label>
                                    <select 
                                        id="defaultFormRegisterPaysEx" 
                                        name="idPays"                              
                                        selected = {selectedValue}
                                        onChange = {handleChange}
                                        required
                                        >
                                        <option value="0">-- Choisir --</option>
                                        {countries.map(country =>
                                            <option key={country.id} value={country.id}>
                                                {country.nom}
                                            </option>
                                        )}
                                    </select>
                                </div>

                                <div className="form-row">
                                    <label htmlFor="defaultFormRegisterVilleEx" className="grey-text">
                                        <span> Ville de résidence  *</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        name="ville"
                                        id="defaultFormRegisterVilleEx" 
                                        required
                                    />
                                </div>

                                <div className="form-row">
                                    <label htmlFor="defaultFormRegisterTelephoneEx" className="grey-text">
                                        <span>Téléphone  *</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        style={{width: "70px"}} 
                                        value={currentTelCode}
                                        disabled 
                                        required />
                                    <input 
                                        type="text" 
                                        name="telephone"
                                        id="defaultFormRegisterTelephoneEx" 
                                        style={{width: "167px"}}
                                        required
                                    />
                                </div>

                                <div className="form-row">
                                    <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
                                        <span> Email  *</span>
                                    </label>
                                    <input 
                                        type="email" 
                                        name="email"
                                        id="defaultFormRegisterEmailEx"                                
                                        required
                                    />
                                </div>
                                <div className="form-row">
                                    <label htmlFor="defaultFormRegisterPasswordEx" className="grey-text">
                                        <span> Mot de passe  *</span>
                                    </label>
                                    <input 
                                        name="password"
                                        type="password" 
                                        id="defaultFormRegisterPasswordEx"                                
                                        required
                                    />
                                </div>
                                <div className="form-row">
                                    <label htmlFor="defaultFormRegisterConfirmEx" className="grey-text">
                                        <span>Confirmer le mot de passe  *</span>
                                    </label>
                                    <input 
                                        type="password" 
                                        name="confirmPassword"
                                        id="defaultFormRegisterConfirmEx"                                 
                                        required
                                    />
                                </div>

                                <div className="form-checkbox">
                                    <input type="checkbox"  name="agreement" onClick={toggleAgreement}/>
                                    <label htmlFor="agreement">J'accepte les conditions générales et la politique de confidentialité</label>
                            </div> 


                                <div className="form-row text-center">
                                    <button className="button btn-disabled registerBtn" type="submit">S'ENREGISTRER</button>
                                </div>
                                <p className="form-log-in-with-existing" onClick={()=>dispatch(loginVisible(true))}>Vous avez deja un compte ? Connectez vous &rarr;</p>
                            </div>
                        </div>
                    </form>                   
                </MDBCol>
            </MDBRow>
        </MDBContainer>
                </div>
            </section>
        </div>
    )
}

export default  Register;
