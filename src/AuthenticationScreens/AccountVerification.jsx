import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Alert } from 'react-bootstrap';
import Hoot from '../General/components/Hoot';
import { useHistory, useParams } from 'react-router-dom';



function AccountVerification() {
    const [FormMessage, setFormMessage] = useState(null);
    const [MessageType, setMessageType] = useState(1);
    const [show, setShow] = useState(true);
    const [showScreen, setShowScreen] = useState(null);
    const [ed_rg_email, seted_rg_email] = useState(null);
    const [ed_rg_password, seted_rg_password] = useState(null); 
    const [ed_rg_firstname, seted_rg_firstname] = useState(null); 
    const [ed_rg_lastname, seted_rg_lastname] = useState(null); 
    const [loading, setLoading] = useState(true);
    const navigate = useHistory(); 
    const [RegisterStatus, setRegisterStatus] = useState(null);  
 
    const {id, code} = useParams()

    useEffect(()=>{  
        Auth();
    },[]);
  
 
async function Auth() {
    setFormMessage(null);  
    setRegisterStatus(0);   
       try {  
         const RegisterData = {ed_verification_code:code, ed_verification_user:id}   
         await axios.post(Hoot()+'edualluseraccountverificationcode/post', RegisterData).then((e)=>{      
           console.log(e);  
           setRegisterStatus(2);   
           navigate.push('/') 
           setMessageType(2);
           setFormMessage("success");
        }).catch((error)=>{
         console.log(error);
           if(error.response){
              if(error.response.data){
                 if(error.response.data.msg){
                   setRegisterStatus(1);   
                   setFormMessage(error.response.data.msg); 
                 }else{
                   setRegisterStatus(1);   
                   setFormMessage("Erro ao estabelecer ligação com o servidor"); 
                 }
              }else{
               setRegisterStatus(1);   
               setFormMessage("Erro ao estabelecer ligação com o servidor"); 
              }
           }else{
             setRegisterStatus(1);   
             setFormMessage("Erro ao estabelecer ligação com o servidor"); 
           }
           setRegisterStatus(1);  
        });  
      }catch (error){  
       console.log(error);
       setRegisterStatus(1);   
       setFormMessage("Erro ao estabelecer ligação com o servidor"); 
     } 
}
 
     function hideMessage() {
        setFormMessage(null); 
        setShow(false);
      }
  
      
 
  
         document.title = "Eduallsys";
         return (  
                <section> 
                     <div className="form-message"> 
                        <Alert dismissible variant={MessageType === 1 ? "danger" : 'success'} onClose={()=> hideMessage()}>
                            <h5 className='text-danger'>{FormMessage}</h5> 
                        </Alert>  
                    </div> 
              </section>  
         );  
}
 

export default AccountVerification
