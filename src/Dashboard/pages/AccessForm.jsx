import styled from 'styled-components'
import React from 'react'
import AccessImage from '../../Assets/images/3D/8.webp' 
import Form from 'react-bootstrap/Form'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import Color from '../components/elements/Color'; 
import { Link } from 'react-router-dom';

function AccessForm() {
  return (
    <Container>
        <div className="box">
          <div className="header"> 
               <AdminPanelSettingsOutlinedIcon/>   
               <h2>Confirmar Acesso</h2>
               <p>
                 Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                 Laborum accusantium quidem, molestias et recusandae sed.
                </p>
          </div>
            <Form id=''> 
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Nome de usúario</Form.Label>
                    <Form.Control autoComplete="off" type="text" className='mb-2' required placeholder="Digite o seu nome de usúario" />
                </Form.Group> 
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>palavra-passe</Form.Label>
                    <Form.Control autoComplete="off" type="password" required placeholder="Digite a sua senha" />
                </Form.Group>  
                <button className='btn col-lg-12 mt-2 bg-black text-light' type="submit">Confirmar</button>
                <br /><br />
             </Form> 
        </div> 
    </Container>
  )
}

const Container = styled.div`
    position:relative;
    width:100%;
    height:100vh; 
    display:flex;
    align-items:center;
    justify-content:center;
    text-align:center; 
    padding:20px;
    background: var(--ed-dark);

    .box{
      width:500px;
      min-width:500px;
      border-radius:6px;  
      margin-bottom:21px !important;
      background:var(--ed-white);  
      box-shadow:var(--ed-shadow-df); 
      position: relative; 
      min-height:550px;
      overflow:hidden; 
      


      .header{
        width:100%;    
        display:flex;
        align-items:center;
        flex-direction:column;
        text-align:center;
        padding:20px; 
        justify-content:center; 

        svg{
          width:95px;
          height:95px; 
          fill:var(--ed-purple);
        }
        
        h2{
           font-size:22px;
           color:var(--ed-dark);
           font-weight:600;
           margin:15px 0;
        }

        p{
          font-size:13.5px;
          max-width:400px;
          color:var(--secondary);
        }
      }

      form{ 
        text-align:left;
        padding:10px 20px;
      }
    }
`;

export default AccessForm