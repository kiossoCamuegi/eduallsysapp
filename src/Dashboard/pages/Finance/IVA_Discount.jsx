import React from 'react'
import styled from 'styled-components';
import DiscountForm from './Components/DiscountForm';

function IVA_Discount() {
 document.title= "Descontos";
  return (
     <Container> 
        <DiscountForm/>
     </Container>
  )
}



const Container = styled.div`
    width:100%; 
    border-radius:6px;   
    padding:20px 0px;
    min-height:520px;
    height:auto;
    background:var(--ed-white);  
    box-shadow:var(--ed-shadow-df);
    margin:10px 0;
    position:relative; 


     hr{
         background:red;
         border-color:var(--ed-silver);
         margin:20px 0px;
     }
`;

export default IVA_Discount