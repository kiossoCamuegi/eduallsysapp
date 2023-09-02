import React from 'react'
import { Link } from 'react-router-dom'
import Image from "../../Assets/images/svg/build.svg" 
import { styled } from 'styled-components';

function ConstructionPage() {
  return (
    <Container>
         <img loading="lazy" role="presentation" src={Image} alt="" />
         <h2>Pagina em fase de construção</h2>
         <Link to='/dashboard'>
            <button className="btn bg-main-light mt-3">Voltar para o dashboard</button>
         </Link>
    </Container>
  )
}

const Container = styled.div`
    padding:20px;
    width:100%;
    min-height:90vh;
    text-align:center;
    justify-content:center;
    flex-direction:column;
    display:flex;
    align-items:center;
    

      img{
          max-width:500px;
          margin:20px 0px;
      }


      h2{font-size:18px;}
`;

export default ConstructionPage
