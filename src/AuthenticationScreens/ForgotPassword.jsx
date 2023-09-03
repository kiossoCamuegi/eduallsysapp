import  React,  { useState, useEffect } from 'react';  
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form' 
import styled from "styled-components";  
import  logo from '../Assets/images/logo-small-white.png';  
import { Link} from 'react-router-dom'; 
import MainAuthScreen from './MainAuthScreen';
 

const ForgotPassword = ()=>{
    document.title = "Resetar senha";
   const [messageWarning, setMessagewarning] = useState(null);
   const [show, setShow] = useState(true);
   const [showScreen, setShowScreen] = useState(null);
   const [ed_email, setEd_email] = useState(null); 
   const [loading, setLoading] = useState(true); 
   const [switchuser, SetSwitchUser] = useState(false);
 
 

   function hideMessage() {
     setMessagewarning(null); 
     setShow(false);
   } 


       
  const handleInput = (e)=>{  
    switch (e.target.id) { 
       case "ed_user_account_email":
          setEd_email(e.target.value);
        break; 
    }
  }
  

return (
  <MainAuthScreen  content={
    <div className="form-area">
    <h1>Resetar</h1>
    <p>Digite o seu email e nos enviaremos um link de recuperação para o seu correio eletronico.</p>
    <div className="form-message">
        {messageWarning != null ? <Alert dismissible variant='danger' onClose={()=> hideMessage()}><h5 className='text-danger'> {messageWarning} </h5></Alert> : ''}
    </div> 
    <Form > 
    <Form.Group className="mb-3" >
        <Form.Label>Email</Form.Label>
        <Form.Control  onChange={handleInput} value={ed_email} id="ed_user_account_email"  type="text" className='mb-2' required placeholder="Digite o seu email" />
    </Form.Group> 
     <div className="flex-end">
        <button className='btn  mt-2 bg-black text-light' type="submit">Enviar</button> 
     </div>
     <br />
     <Link to='/signup' className='text-main-light'>Ainda não se cadastrou ?</Link>
     </Form> 
   </div>
   }/> 
); 
 
} 
 
 

export default ForgotPassword;