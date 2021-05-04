import React from 'react'
import {Link} from 'react-router-dom'
import {Button} from './Button'

function Hero({title1, title2}) {
    return (
        <div className="hero">
            <div className='banner'>
                <h1>{title1}</h1>
                <h2>{title2}</h2>
                <Link to="/shop"><Button style={{background:'LavenderBlush', color:'MediumTurquoise',textalign: 'center'}}>Acheter maintenant</Button></Link> 
            </div>
        </div>
    )
}

export default Hero;
