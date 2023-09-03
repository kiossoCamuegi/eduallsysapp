import { Avatar } from '@mui/material'
import React from 'react'
import { Form } from 'react-bootstrap'
import styled from 'styled-components'

function PasswordBox() {
  return (
     <Container className='bg-main'>
         <div className="block">
            <h1>Digite a sua senha</h1>
             <div className="ed-flex">
                 <Avatar alt='kiosso' />
                 <Form>
                    <Form.Control type="password" placeholder='Digite a sua senha' />
                 </Form>
             </div>
         </div>
     </Container>
  )
}

const Container = styled.div`
   width:100%;
   height:100%;
   position:fixed;
   padding:20px;
   z-index:1000; 
   transition:all 1s ease-in-out;
   display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column; 

   .block{  
      width:100%; 
      display:flex;
      flex-direction:column;
      align-items:center; 
      text-align:left;

      h1{
        font-size:35px;
        text-transform:uppercase;
        color:var(--ed-white);
        margin-bottom:40px; 
      }

      form{
        width:100%;
        min-width:550px;
        max-width:600px;
      }

      input{
        height:60px;
        width:100%;
        font-size:18px;
        margin-left:20px;
      }


   }
`;

export default PasswordBox