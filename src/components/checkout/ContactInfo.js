 import axios from 'axios';
import React , {useEffect, useState} from 'react'

function ContactInfo(props){
    const [countryList, setCountryList] = useState([]);

    const handleChange = (e) =>{
        props.updateState(e)
    }

    let country = countryList.map(item=>{
        return (
            <option value={item.id} key={item.id}>{item.nom}</option>
        )
    })

    useEffect(() => {
        axios.get('/pays')
            .then(res => {
                setCountryList(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    return (
        <div className="contact-form">
        <form className="contact-information-form">
            <h3 className="contact-form-header">Information de contact</h3>
            <div className="input-group-contact">
                <label className="label" htmlFor="email">Email ou numéro de téléphone</label>
                <input name="email" type="email" id="email" onChange={(e)=>handleChange({email: e.target.value})} value={props.inputInfo.email} required/>
                <div className="errormsg hidden">erreur</div>
            </div>
            <h3 className="contact-form-header">Adresse de livraison</h3>
            <div className="input-group-flex">
                <div className="myflex">
                    <label className="label" htmlFor="firstname">Prénom</label>
                    <input name="firstname" type="text" id="firstname" onChange={(e)=>handleChange({firstname: e.target.value})} value={props.inputInfo.firstname} required/>
                    <div className="errormsg hidden">erreur</div>
                </div>
                <div className="myflex">
                    <label className="label" htmlFor="lastname">Nom</label>
                    <input name="lastname" type="text" id="lastname" onChange={(e)=>handleChange({lastname: e.target.value})} value={props.inputInfo.lastname} required/>
                    <div className="errormsg hidden">erreur</div>
                </div>
            </div>
            <div className="input-group-contact">
                <label className="label" htmlFor="address">Adresse</label>
                <input name="address" type="text" onChange={(e)=>handleChange({adresse: e.target.value})} value={props.inputInfo.adresse} required/>
                <div className="errormsg hidden">erreur</div>
            </div>
            <div className="input-group-contact">
                <input name="suite" type="text" placeholder="Apartment, suite, etc. (optional)" onChange={(e)=>handleChange({suite: e.target.value})} value={props.inputInfo.suite}/>
            </div>
            <div className="input-group-contact">
                <input name="city" type="text" placeholder="City" onChange={(e)=>handleChange({ville: e.target.value})} value={props.inputInfo.ville} required/>
                <div className="errormsg hidden">erreur</div>
            </div>
            <div className="input-group-flex">
                <div className="width50 input-group-contact selectdiv">
                    <select name="country" type="text" id="country" placeholder="Country/Reigen" required value={props.inputInfo.pays.id}
                        onChange={(e)=>{
                            handleChange({pays: {id: e.target.value, nom: e.target.selectedOptions[0].text}})
                        }}
                    >
                        <option value={0}>Pays</option>
                        {country}
                    </select>
                    <div className="errormsg hidden">erreur</div>
                </div>
                <div className="width50 input-group-contact">
                    <input name="province" type="text" placeholder="Province" onChange={(e)=>handleChange({province: e.target.value})} value={props.inputInfo.province} required/>
                    <div className="errormsg hidden">erreur</div>
                </div>
                <div className="width50 input-group-contact">
                    <input name="postalcode" type="text" id="postalcode" placeholder="Postal code" onChange={(e)=>handleChange({zip: e.target.value})} value={props.inputInfo.zip} required/>
                    <div className="errormsg hidden">erreur</div>
                </div>
            </div>
        </form>
        </div>
    )
}


export default ContactInfo;