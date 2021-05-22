import React, { useEffect,useState } from 'react'
import {StyledHero} from '../parts/StyledHero'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ListCommandes from '../components/commande/ListCommandes';
import { Box, CircularProgress, Collapse, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import '../Account.css';
import LabelImportantIcon from '@material-ui/icons/LabelImportant';
import { ArrayUtils, ObjectUtils } from '../utils/helper';
import { changePassword, updateUser } from '../redux/auth/authActions';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EditIcon from '@material-ui/icons/Edit';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';

function Account(){
    const dispatch = useDispatch();
    const [renderComponent, setRenderComponent] = useState(0);
    const currentUser = useSelector(state => state.auth.user);
    const [countries,setCountry] = useState([]);
    const [selectedValue, setSelectedValue] = useState(0);
    const [currentTelCode, setCurrentTelCode] = useState("");
    const [response, setResponse] = useState({
        for: "",
        loading: false,
        completed: false,
        status: "success",
        message: "success message", 
    });

    const handleChange = (e) => {
        const selected = parseInt(e.target.value);
        setSelectedValue(selected);
    }

    const handleInfosFormSubmit = (e) => {
        e.preventDefault()
        setResponse({
            for: "info",
            loading: true,
            completed: false,
            status: "success",
            message: "",
        })
        
        const formData = {
            nom: e.target[0].value,
            prenom: e.target[1].value,
            adresse: e.target[2].value,
            zip: e.target[3].value,
            pays : e.target[4].value,
            ville: e.target[5].value,
            telephone: `${currentTelCode} ${e.target[7].value}`,
            email : currentUser.email
        };

        dispatch(
            updateUser(
                currentUser.id, 
                formData, 
                () => {
                    setRenderComponent(0);
                    setResponse({
                        for: "info",
                        loading: false,
                        completed: true,
                        status: "success",
                        message: "Le compte a bien été modifié!",
                    });
                },
                () => {
                    setResponse({
                        for: "info",
                        loading: false,
                        completed: true,
                        status: "error",
                        message: "Une erreur s'est produite!",
                    })
                }
            )
        )
    }

    const handleChangePassFormSubmit = (e) => {
        e.preventDefault()
        setResponse({
            for: "password",
            loading: true,
            completed: false,
            status: "success",
            message: "",
        })

        if(e.target[1].value !== e.target[2].value){
            alert("Veuillez confirmer votre mot de passe!");
            return;
        }

        const formData = {
            email: currentUser.email,
            oldPassword: e.target[0].value,
            newPassword: e.target[1].value
        };


        dispatch(
            changePassword(
                currentUser.id, 
                formData, 
                () => {
                    setRenderComponent(0);
                    setResponse({
                        for: "password",
                        loading: false,
                        completed: true,
                        status: "success",
                        message: "Le mot de passe a bien été modifié!",
                    });
                },
                () => {
                    setResponse({
                        for: "password",
                        loading: false,
                        completed: true,
                        status: "error",
                        message: "L'ancien mot de passe est incorrect!",
                    })
                }
            )
        )
    }

    useEffect(()=>{
        axios.get('/pays')
            .then((response)=>{
                setCountry(response.data);
            })
            .catch(error=>console.error(`Error: ${error}`));
    },[]);

    useEffect(() => {
        if(!ObjectUtils.isEmpty(currentUser)){
            if(!ArrayUtils.isEmpty(countries)){
                setSelectedValue(countries.filter(r => r.nom === currentUser.pays)[0].id);
            }
        }
    }, [currentUser, countries]);

    useEffect(() => {
        if(!ArrayUtils.isEmpty(countries)){
            const currentCountry = countries.filter(country => country.id === selectedValue);
            const temp = currentCountry.length !== 0 ? currentCountry[0].codePaysTelephone : "";
            setCurrentTelCode(temp);
        }
    }, [selectedValue, countries])

    const changeRenderView = (comp) => {
        setResponse({
            ...response,
            for: "",
            loading: false,
            completed: false,
        });
        setRenderComponent(comp);
    }

    const renderInfos = () => {
        return (
            <div className="info" > 
                <div className="form-white-background" >                        
                    <Box className="form-title-row"><h1>Mes informations</h1></Box>
                    <Collapse in={response.completed}>
                        <Alert
                            severity={response.status}
                            style={{
                                marginBottom: '15px'
                            }}
                            action={
                                <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setResponse({...response, completed: false})
                                }}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                        >
                            {response.message}
                        </Alert>
                    </Collapse>
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
                            <span>Email :</span>
                        </label>
                        {currentUser.email}
                    </div>

                    <div className="form-row text-center">
                        <button className="infoBtn" onClick={() => setRenderComponent(2)}>Editer</button>
                    </div>
                    
                </div>
            </div>
        );
    }

    const renderEditInfos = () => {
        return (
            <div className="edit"> 
                <div> 
                    <div className="form-white-background" style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>                        
                        <Box className="form-title-row" width="100%"><h1>Modifier mes informations</h1></Box>
                        {
                            response.loading 
                            ? <CircularProgress />
                            : <>
                                <p style={ {
                                    display: 'flex',
                                    alignItems: 'center',
                                    fontFamily: 'verdana', 
                                    fontSize:'20px',    
                                    padding:'20px',
                                    width: "100%"
                                }}>
                                    <LabelImportantIcon 
                                        style={{
                                            color: '#c794b2',
                                            marginRight: '15px'
                                        }}
                                    /> Informations générales:
                                </p>
                                <Collapse in={response.completed && response.status !== "success"} style={{width: "100%"}}>
                                    <Alert
                                        severity={response.status}
                                        style={{
                                            marginBottom: '15px'
                                        }}
                                        action={
                                            <IconButton
                                            aria-label="close"
                                            color="inherit"
                                            size="small"
                                            onClick={() => {
                                                setResponse({...response, completed: false})
                                            }}
                                            >
                                                <CloseIcon fontSize="inherit" />
                                            </IconButton>
                                        }
                                    >
                                        {response.message}
                                    </Alert>
                                </Collapse>
                                <form onSubmit={handleInfosFormSubmit}>
                                    <div className="form-row">
                                        <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
                                            <span>Nom</span>
                                        </label>
                                        <input 
                                            type="text" 
                                            name="nom" 
                                            id="defaultFormRegisterNameEx"   
                                            defaultValue={currentUser.nom}
                                            required
                                        />
                                    </div>

                                    <div className="form-row">
                                        <label htmlFor="defaultFormRegisterPrenomEx" className="grey-text">
                                            <span> Prénom</span>
                                        </label>
                                        <input 
                                            type="text" 
                                            name="prenom" 
                                            id="defaultFormRegisterPrenomEx"      
                                            defaultValue={currentUser.prenom}                          
                                            required
                                        />
                                    </div>
                                    
                                    <div className="form-row">
                                        <label htmlFor="defaultFormRegisterAdresseEx" className="grey-text">
                                            <span> Adresse</span>
                                        </label>
                                        <input 
                                            type="text" 
                                            name="adresse" 
                                            id="defaultFormRegisterAdresseEx"     
                                            defaultValue={currentUser.adresse}                           
                                            required
                                        />
                                    </div>

                                    <div className="form-row">
                                        <label htmlFor="defaultFormRegisterZipEx" className="grey-text">
                                            <span>Code postal </span>
                                        </label>
                                        <input 
                                            type="text" 
                                            name="zip" 
                                            id="defaultFormRegisterZipEx"       
                                            defaultValue={currentUser.zip}
                                            required
                                        />
                                    </div>

                                    <div className="form-row">
                                        <label htmlFor="defaultFormRegisterPaysEx" className="grey-text">
                                            <span> Pays de résidence</span>
                                        </label>
                                        <select 
                                            id="defaultFormRegisterPaysEx" 
                                            name="idPays"                              
                                            value = {selectedValue}
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
                                            <span> Ville de résidence</span>
                                        </label>
                                        <input 
                                            type="text" 
                                            name="ville"
                                            id="defaultFormRegisterVilleEx" 
                                            defaultValue={currentUser.ville}
                                            required
                                        />
                                    </div>

                                    <div className="form-row">
                                        <label htmlFor="defaultFormRegisterTelephoneEx" className="grey-text">
                                            <span>Téléphone </span>
                                        </label>
                                        <input 
                                            type="text" 
                                            style={{width: "70px"}} 
                                            value={currentTelCode}
                                            onChange={null}
                                            disabled 
                                            required 
                                        />
                                        <input 
                                            type="text" 
                                            name="telephone"
                                            id="defaultFormRegisterTelephoneEx" 
                                            style={{width: "180px"}}
                                            defaultValue={currentUser.telephone.split(' ')[1]}
                                            required
                                        />
                                    </div>

                                    <div className="form-row">
                                        <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
                                            <span>Email</span>
                                        </label>
                                        <p className="disabled-text-input">{currentUser.email}</p>
                                    </div>

                                    <div className="form-row text-center">
                                        <button 
                                            className="button editBtn" 
                                            type="submit"
                                        >
                                            Sauvegarder
                                        </button>
                                    </div>
                                </form>
                                <p style={ {
                                    display: 'flex',
                                    alignItems: 'center',
                                    fontFamily: 'verdana', 
                                    fontSize:'20px', 
                                    padding:'20px',
                                    width: "100%"
                                }}>
                                    <LabelImportantIcon 
                                        style={{
                                            color: '#c794b2',
                                            marginRight: '15px'
                                        }}
                                    /> Changer le mot de passe:
                                </p>
                                <Collapse in={response.completed && response.status !== "success"} style={{width: "100%"}}>
                                    <Alert
                                        severity={response.status}
                                        style={{
                                            marginBottom: '15px'
                                        }}
                                        action={
                                            <IconButton
                                            aria-label="close"
                                            color="inherit"
                                            size="small"
                                            onClick={() => {
                                                setResponse({...response, completed: false})
                                            }}
                                            >
                                                <CloseIcon fontSize="inherit" />
                                            </IconButton>
                                        }
                                    >
                                        {response.message}
                                    </Alert>
                                </Collapse>
                                <form onSubmit={handleChangePassFormSubmit}>
                                    <div className="form-row">
                                        <label htmlFor="defaultFormRegisterPasswordEx" className="grey-text">
                                            <span>Ancien Mot de passe</span>
                                        </label>
                                        <input 
                                            name="oldPassword"
                                            type="password" 
                                            id="defaultFormRegisterPasswordEx"                                
                                            required
                                        />
                                    </div>
                                    <div className="form-row">
                                        <label htmlFor="defaultFormRegisterPasswordEx" className="grey-text">
                                            <span>Nouveau Mot de passe</span>
                                        </label>
                                        <input 
                                            name="newPassword"
                                            type="password" 
                                            id="defaultFormRegisterPasswordEx"                                
                                            required
                                        />
                                    </div>
                                    <div className="form-row">
                                        <label htmlFor="defaultFormRegisterConfirmEx" className="grey-text">
                                            <span>Confirmer le mot de passe</span>
                                        </label>
                                        <input 
                                            type="password" 
                                            name="confirmPassword"
                                            id="defaultFormRegisterConfirmEx"                                 
                                            required
                                        />
                                    </div>
                                    <div className="form-row text-center">
                                        <button 
                                            className="button editBtn" 
                                            type="submit"
                                        >
                                            Sauvegarder
                                        </button>
                                    </div>
                                </form>
                            </>
                        }
                    </div>
                </div>
            </div> 
        );
    }

    const renderCommandes = () => {
        return (
            <div className="commande"> 
                <div className="form-white-background">                        
                    <Box className="form-title-row"><h1>Mes commandes</h1></Box>
                    <ListCommandes />
                </div>
            </div> 
        );
    }

    const renderContent = () => {
        switch(renderComponent){
            case 0:
                return renderInfos();
            case 1: 
                return renderCommandes();
            case 2:
                return renderEditInfos();
            default:
                return renderInfos();
        }
    };

    return (
        <div className="page page-container">
            <StyledHero title1='Products' >
                <span className="hero-overlay">
                    <h2>Mon profile</h2>
                </span>
            </StyledHero>
            <section >
                <div className="card">  
                    <div className="nav"> 
                        <div className="form-white-background">                        
                            <h1 style={{width: "100%", textAlign: "center"}}><p className="form-title-row">Mes données</p></h1>
                            {/* <ul className="sbmenu-list">
                                <li  onClick={ () => changeRenderView(0) } ><Link to="/account">Mes informations</Link></li>
                                <li  onClick={ () => changeRenderView(1) } ><Link to="/account">Modifier mes infos</Link></li>
                                <li  onClick={ () => changeRenderView(2) } ><Link to="/account">Mes commandes</Link></li>
                            </ul> */}
                            <List component="nav" aria-label="main mailbox folders">
                                <ListItem 
                                    button 
                                    onClick={ () => changeRenderView(0) }
                                    selected={renderComponent === 0}
                                >
                                    <ListItemIcon>
                                        <AccountCircleIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Mes informations" />
                                </ListItem>
                                <ListItem 
                                    button 
                                    onClick={ () => changeRenderView(1) }
                                    selected={renderComponent === 1}
                                >
                                    <ListItemIcon>
                                        <FormatListBulletedIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Mes commandes" />
                                </ListItem>
                                <ListItem 
                                    button 
                                    onClick={ () => changeRenderView(2) }
                                    selected={renderComponent === 2}
                                >
                                    <ListItemIcon>
                                        <EditIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Modifier" />
                                </ListItem>
                            </List>
                        </div>
                    </div> 

                    { renderContent() }                    
            
                </div>
            </section>
        </div>
    )
}

export default Account
