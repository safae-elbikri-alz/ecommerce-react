import styled from 'styled-components'
import heroBg from '../images/hero-2.jpg'

export const StyledHero = styled.div`
height: 35vh;
  background-image: url(${props=> props.image ? props.image : heroBg});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`