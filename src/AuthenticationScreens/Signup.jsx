
import  React,  { useState, useEffect } from 'react';  
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form' 
import styled from "styled-components"; 
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Color from '../Dashboard/components/elements/Color';
import axios from 'axios'; 
import Hoot from '../General/components/Hoot';
import jwt_decode from 'jwt-decode';
import { Link   } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import Loader from '../General/components/Loader';
import { Avatar } from '@mui/material';
import AvatarImg from '../Assets/images/avatars/avatar-6.jpg'; 
import CoverImg from '../Assets/images/svg/cover.png'; 
import { CloseOutlined, Remove } from '@mui/icons-material';
import { Close } from '@material-ui/icons';
import Tooltip from '../General/components/Tooltip';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import SaveButton from '../Dashboard/components/elements/SaveButton';
import { FcGoogle} from "react-icons/fc";
import { FaFacebook, FaLinkedinIn, FaGithub } from "react-icons/fa";
import {IoClose,IoAddOutline } from "react-icons/io5";
import Slider from 'react-slick';
import RandomColor from '../General/components/RandomColor';
import MainAuthScreen from './MainAuthScreen';
import ReactFlagsSelect from "react-flags-select";
import { passwordStrength } from 'check-password-strength'

function Signup() {
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
    const [switchuser, SetSwitchUser] = useState(false);
    const [RegisterStatus, setRegisterStatus] = useState(null); 
    const [LatestLoggedinUsers, SetLatestLoggedinUsers] = useState([""]);
    const [selectedCountry, setSelectedCountry] = useState("AO");
    const [PasswordStrength, SetPasswordStrength] = useState(0);

 
  
    useEffect(()=>{  
       CheckLogin(); 
       GetLatestUser(); 
       setTimeout(() => {
           setLoading(false);
       }, 3000);
    },[]);
 
  
  
    const CheckLogin = async ()=>{ 
       
    }
 
    function hideMessage() {
      setFormMessage(null); 
      setShow(false);
    }

    


 
    const Auth = async (e)=>{
       e.preventDefault(); 
       setFormMessage(null);  
       setRegisterStatus(0);  
       try { 
      if(ed_rg_email ===  null || ed_rg_password ===  null || ed_rg_firstname ===  null  || ed_rg_lastname ===  null  || selectedCountry ===  null){ 
        setFormMessage("Preencha corretamente os campos"); 
        setRegisterStatus(1);  
      }else{ 
        console.clear();
          try { 
            const RegisterData = {
              ed_user_name:ed_rg_firstname.trim()+" "+ed_rg_lastname, 
              ed_user_password:ed_rg_password,
              ed_user_email:ed_rg_email,
              ed_user_country:selectedCountry
            }  
            console.log(RegisterData);   
            await axios.post(Hoot()+'eduallusersaccountsignup/post', RegisterData).then((e)=>{      
              console.log(e);  
              hideMessage();
              setRegisterStatus(2);  
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
       } catch (error) {
         if(error.response){
           if (error.response.data) {
             setRegisterStatus(1);  
             setFormMessage(error.response.data.msg);
             console.log(error);   
           }else{
             setRegisterStatus(1);  
             setFormMessage('Erro conectando-se ao servidor');
             console.log(error); 
           }
         }else{
           setRegisterStatus(1);  
             setFormMessage("Erro ao estabelecer ligação com o servidor");
         }
       } 
    }
 
    function GetLatestUser() {
     const LatestLoggedinUser = localStorage.getItem("eduallswitchuser"); 
     const checkValue =  LatestLoggedinUser === null ? null : LatestLoggedinUser;
     if(checkValue !== null){
         /// check if user exist in our database and in our latest browserusers
         SetSwitchUser(true);
         seted_rg_email(checkValue);
         return true;
     }else{
         SetSwitchUser(false);
     } 
    }
 
 
     //df password - A@2asdF2020!!*
   const handleInput = (e)=>{  
     switch (e.target.id) { 
        case "ed_rg_useremail":
           seted_rg_email(e.target.value);
         break;
         case "ed_rg_userpassword": 
             seted_rg_password(e.target.value);
             console.log(passwordStrength(e.target.value).value.toLowerCase())
           if(e.target.value.split("").length >= 1){
            if(passwordStrength(e.target.value).value.toLowerCase() === "weak"){ SetPasswordStrength(1);
            }else if (passwordStrength(e.target.value).value.toLowerCase() === "medium"){SetPasswordStrength(2);
            }else if(passwordStrength(e.target.value).value.toLowerCase() === "strong"){ SetPasswordStrength(3);
            }else{SetPasswordStrength(1);}
           }else{SetPasswordStrength(0);}
         break;  
         case "ed_rg_userfirstname":
            seted_rg_firstname(e.target.value.trim());
          break;  
          case "ed_rg_userlastname":
            seted_rg_lastname(e.target.value.trim());
          break; 
         default:
     }
   }
 
  
  
         document.title = "Eduallsys";
         return ( 
             <MainAuthScreen  content={
                <section>
                <div className="form-area">
                    <h1 style={{textTransform:"unset !important;"}}>Inscreva-se</h1> 
                     <div className="form-message"> 
                         {
                         FormMessage !== null ? <Alert dismissible variant={MessageType === 1 ? "danger" : 'success'} onClose={()=> hideMessage()}>
                             {MessageType === 1 ? <h5 className='text-danger'> {FormMessage} </h5> : 
                             <h5><div className='ed-block'>Conta criada com sucesso !</div> 
                             <div className="mt-2"><small>Verifique o seu email para concluir o cadastro.</small></div></h5>} 
                           </Alert> : ''
                        } 
                    </div>
                 <Form  onSubmit={Auth} autocomplete="off" > 
                   <>
                   <div className="ed-space">
                    <div className='col'>
                    <Form.Group className="mb-3" >
                       <Form.Label>Primeiro nome</Form.Label>
                      <Form.Control  autocomplete="off" onChange={handleInput}  id="ed_rg_userfirstname"  type="text" className='mb-2' required placeholder="Ex: Mario" />
                    </Form.Group>
                    </div> 
                    <div className="pd-1"></div>
                    <div  className='col'> 
                    <Form.Group className="mb-3" >
                       <Form.Label>Ultimo nome</Form.Label>
                      <Form.Control autocomplete="off" onChange={handleInput}  id="ed_rg_userlastname"  type="text" className='mb-2' required  placeholder="Ex: Paulo"  />
                    </Form.Group>
                    </div>
                   </div>
                   <div className="ed-space">
                   <div className="col">
                   <Form.Group className="mb-3" >
                       <Form.Label>Email</Form.Label>
                      <Form.Control autocomplete="off" onChange={handleInput}  id="ed_rg_useremail"  type="email" required className='mb-2' placeholder="Ex: Mariopaulo@mail.com" />
                    </Form.Group>
                   </div>
                   </div>
                      <Form.Group className="mb-3">
                      <div className="ed-space">
                         <Form.Label>Palavra-passe</Form.Label>
                         <div className="ed-flex">
                             <div className={PasswordStrength >= 1 ?  "dot bg-green" : "dot"}></div>
                             <div className={PasswordStrength >= 2 ?  "dot bg-green" : "dot"}></div>
                             <div className={PasswordStrength >= 3 ?  "dot bg-green" : "dot"}></div>
                         </div>
                      </div>
                      <Form.Control autocomplete="off" onChange={handleInput}  id="ed_rg_userpassword"   type="password" required placeholder="Ex: A@2asdF2020!!*" />
                   </Form.Group> 
                   </>  
                   <Form.Group classmb-3>
                      <Form.Label>País</Form.Label>
                      <ReactFlagsSelect selected={selectedCountry} onSelect={(code) => setSelectedCountry(code)}/>
                   </Form.Group>
                    <SaveButton class='btn mt-4 bg-black text-light' title={'Registrar'} status={RegisterStatus} /> 
                   </Form> 
                   <div className="d-noneX">
                   <div className="or mt-2">
                       <div className="ln"></div>
                       ou
                       <div className="ln"></div>
                    </div>
                   <div className="ed-space"> 
                      <div><button  class='btn mt-2 bg-white text-dark btn-social'><><FcGoogle/> Entrar com google</></button> </div>
                      <div><button  class='btn mt-2 bg-white text-dark btn-social btn-facebook'><><FaFacebook/> Entrar com facebook</></button></div>                        
                    </div> 
                   <br />
                   <div className="d-flex">
                       <small>
                           jã têm uma conta ?<Link to='/' className='text-main-light ml-2'>login</Link>
                       </small>
                   </div>
                   </div> 
               </div> 
              </section> 
             }  /> 
         );  
}

export default Signup
