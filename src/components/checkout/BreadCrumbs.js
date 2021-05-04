import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'
import {useContext} from 'react'
import { fullPage } from '../../redux/app/appActions'
import { useDispatch } from 'react-redux';


export default function BreadCrumbs({step,changeStep}) {

    const dispatch = useDispatch();

    useEffect(() => {
        switch(step){
            case 1:
                document.querySelector('.step1').classList.add('activeBreadcrumbs');
                document.querySelector('.step2').classList.remove('activeBreadcrumbs');
                document.querySelector('.step3').classList.remove('activeBreadcrumbs');
                break;
            case 2:
                document.querySelector('.step1').classList.add('activeBreadcrumbs');
                document.querySelector('.step2').classList.add('activeBreadcrumbs');
                document.querySelector('.step3').classList.remove('activeBreadcrumbs');
                break;
            case 3:
                document.querySelector('.step1').classList.add('activeBreadcrumbs');
                document.querySelector('.step2').classList.add('activeBreadcrumbs');
                document.querySelector('.step3').classList.add('activeBreadcrumbs');
                break;
            default:
                break
        }
    }, [step]);

    return (
        <div>
            <ul className="breadcrumbs-ul">
                <li className="activeBreadcrumbs" onClick={()=>dispatch(fullPage(false))}><Link to='/cart'>Cart</Link></li>
                <li className="step1 activeBreadcrumbs" onClick={()=> changeStep(1)}>Information</li>
                <li className="step2" onClick={()=> changeStep(2)}>Shipping</li>
                <li className="step3" onClick={()=> changeStep(3)}>Payment</li>
            </ul>
        </div>
    )
}
