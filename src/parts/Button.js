import styled from 'styled-components'

export const Button = styled.button`
    outline:none;
    background:${props => props.nocolor? 'none' : `var(--orange)`};
    border: 1px solid ${props => props.nocolor ? `var(--mainBlack)` : `var(--orange)`};
    padding:.7em 1.7em;
    color:${props => props.nocolor? 'var(--mainBlack)' : `white`};
    text-transform: uppercase;
    cursor: pointer;
    font-family: "Poppins";
    font-size:.9em;
    letter-spacing:1.3px;
    margin-top:1.5em;
    transition: var(--mainTransition);
    &:hover{
        background: ${props => props.nocolor ? `var(--orange)` : `var(--mainBlack)`};
        border: 1px solid ${props => props.nocolor ? `var(--orange)` : `var(--mainBlack)`};
        color: white;
    }
`
export const DefaultButton = styled.button`
    outline:none;
    background:${props => props.nocolor? 'none' : `var(--orange)`};
    border: 1px solid ${props => props.nocolor ? `var(--mainBlack)` : `var(--orange)`};
    padding:.7em 1.7em;
    color:${props => props.nocolor? 'var(--mainBlack)' : `white`};
    text-transform: uppercase;
    cursor: pointer;
    font-family: "Poppins";
    font-size:.9em;
    letter-spacing:1.3px;
    margin-top:1.5em;
    transition: var(--mainTransition);
`
export const BlackButton = styled.button`
    outline:none;
    background: black;
    border: 1px solid black;
    padding:.7em 1.7em;
    color: white;
    width:100%;
    text-transform: uppercase;
    cursor: pointer;
    font-family: "Poppins";
    font-size:.9em;
    letter-spacing:1.3px;
    margin-top:2em;
    transition: var(--mainTransition);
    &:hover{
        background: var(--orange);
        border: 1px solid var(--orange);
        color: white;
    }
`
export const BlackBlackButton = styled.button`
    outline:none;
    background: black;
    border: 1px solid black;
    padding:.7em 1.7em;
    color: white;
    width:100%;
    text-transform: uppercase;
    cursor: pointer;
    font-family: "Poppins";
    font-size:.9em;
    letter-spacing:1.3px;
    transition: var(--mainTransition);
    margin: 1em 0;
`

export const BlackBlackButton2 = styled.button`
outline:none;
    background: black;
    border: 1px solid black;
    padding: 0.7em 1.7em;
    color: white;
    width:100%;
    text-transform: uppercase;
    cursor: pointer;
    font-family: "Poppins";
    font-size:.9em;
    letter-spacing:1.3px;
    transition: var(--mainTransition);
    margin-left : 0.1em;
    margin-top : -1.5em;
`
export const OutlineButton = styled.button`
    outline:none;
    background: none;
    border: 1px solid var(--orange);
    padding:.7em 1.7em;
    color: black;
    text-transform: uppercase;
    cursor: pointer;
    font-family: "Poppins";
    font-size:.9em;
    letter-spacing:1.3px;
    margin-top:2em;
    transition: var(--mainTransition);
    &:hover{
        background: var(--orange);
        border: 1px solid var(--orange);
        color: white;
    }
`
export const OutlineButtonBlack = styled.button`
    outline:none;
    background: none;
    border: 1px solid black;
    padding:.7em 1.7em;
    color: black;
    text-transform: uppercase;
    cursor: pointer;
    font-family: "Poppins";
    font-size:.9em;
    letter-spacing:1.3px;
    &:hover{
        background: var(--orange);
        border: 1px solid var(--orange);
        color: white;
    }
`
export const BlueButton = styled.button`
    outline:none;
    background: var(--blue);
    border: 1px solid var(--blue);
    border-radius:3px;
    padding:.7em 1.7em;
    color: white;
    text-transform: uppercase;
    cursor: pointer;
    font-family: "Poppins";
    font-size:.9em;
    letter-spacing:1.3px;
    transition: var(--mainTransition);
    &:hover{
        background: var(--darkBlue);
        border: 1px solid var(--darkBlue);
        color: white;
    }
`