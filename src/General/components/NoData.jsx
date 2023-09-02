import React from 'react'
import styled from 'styled-components';
import Image from "../../Assets/images/svg/NoData.svg" 

function NoData(props) {
  return (
    <Container className='notfounded-container'>
        <img loading="lazy" role="presentation" src={Image} alt="no data founded" />
       <div className="block-text mt-4">
           <h3>Nenhuma informação foi encomtrada</h3>
           <p className='mt-2'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste, tempore 
            recusandae harum impedit itaque rerum adipisci quis eaque reprehenderit delectus!</p>
           <button className="btn mt-4 bg-main-light">Tentar novamente</button>
       </div>
    </Container>
  )
}


const Container = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
    height:100%;
    position:absolute;
    top:0px;
    left:0px;
    width:100%; 

    .block-text{
         max-width:600px;
         margin:20px 0px;
         display:flex;
        align-items:center;
        justify-content:center;
        flex-direction:column;
        text-align:center;

         h3{
            font-size: 18px;
            font-weight: 600;
            margin: 0px;
        }

        small,p{
            font-size:15px;
            color:var(--ed-grey-text);
        }
        
    }

    img{
        max-height:300px;
        max-width:400px;
    }
`;

export default NoData;