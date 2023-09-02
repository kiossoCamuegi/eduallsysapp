import React from 'react'
import styled from 'styled-components';
import Image from "../../Assets/images/svg/notfounded.svg" 

function NotFounded(props) {
  return (
    <Container className='notfounded-container'>
        <img loading="lazy" role="presentation" src={Image} alt="page not founded" />
    </Container>
  )
}



const Container = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    height:100%;
    position:absolute;
    top:0px;
    left:0px;
    width:100%;


    img{
        max-height:350px;
        max-width:500px;
    }
`;




export default NotFounded