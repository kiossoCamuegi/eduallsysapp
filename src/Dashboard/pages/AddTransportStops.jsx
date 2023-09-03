import React from 'react'
import styled from 'styled-components';
import AddStopForm from '../components/forms/AddStopForm';


function AddTransportStops() {
    return (
        <div>
           <BoxContainer className='boxItem'>
               <AddStopForm/>
           </BoxContainer>
          <br />
          <BoxContainer className='boxItem'>
                
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

export default AddTransportStops