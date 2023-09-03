import React from 'react'
import AddBusRouteForm from '../components/forms/AddBusRouteForm'
import styled from 'styled-components';

function AddBusRoutes() {
    document.title = "Adicionar rotas"
  return (
    <div>
       <BoxContainer className='boxItem'>
           <AddBusRouteForm/>
       </BoxContainer>
      <br />
      <BoxContainer className='boxItem'>
      <div className="mapouter">
        <div className="gmap_canvas">
                 <iframe  src="https://maps.google.com/maps?q=luanda&t=&z=13&ie=UTF8&iwloc=&output=embed"  id="gmap_canvas" frameborder="0" scrolling="no" style={{height: 400}}></iframe>
            </div>
        </div>
       </BoxContainer>
   </div>
  )
}


 
const BoxContainer = styled.div` 
    width:100%; 
    border-radius:6px;
    margin-bottom:20px;  
    padding:20px;
    min-height:200px;
    background:var(--ed-white);  
    box-shadow:var(--ed-shadow-df); 


     iframe{
         width:100%;
     }


    .Camera{
        min-height:80vh; 
        border:2px dashed var(--purple-light);
    }


    .title{
        font-size:18px; 
        text-transform:uppercase;
        font-weight:600;
        margin-top:10px;
        margin-bottom:25px;
    }

    .col-ip-3{
        width:100%;

        .block{
            width:33.3%;
        }
    }

    .box{ 
        width:100%;
        display:flex;
        flex-direction:column;

        .fill{
            width:100%;
            display:flex;

            .block{
                width:50%;
            }
        }
    }
`;


export default AddBusRoutes