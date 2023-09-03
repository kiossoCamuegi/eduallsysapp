
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
import { AdminPanelSettings, CloseOutlined, Remove } from '@mui/icons-material';
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
import LoginModal from './LoginModal';
import GoogleOneTap from './GoogleOneTap';
import { Swiper, SwiperSlide } from 'swiper/react'; 

const Login = ()=>{
   const [messageWarning, setMessagewarning] = useState(null);
   const [show, setShow] = useState(true);
   const [showScreen, setShowScreen] = useState(null);
   const [ed_email, setEd_email] = useState(null);
   const [ed_password, setEd_password] = useState(null); 
   const [loading, setLoading] = useState(true);
   const [Checked, setChecked] = useState(false);
   const navigate = useHistory();
   const [switchuser, SetSwitchUser] = useState(false);
   const [RegisterStatus, setRegisterStatus] = useState(null); 
   const [LatestLoggedinUsers, SetLatestLoggedinUsers] = useState([]);
   let list = localStorage.getItem("eduall_local_credencials")   !== null ?
    JSON.parse(localStorage.getItem("eduall_local_credencials")) : [];
   
 
   useEffect(()=>{  
      CheckLogin();
      showStoredCredencials(list); 
      setTimeout(() => {
        setLoading(false);
    }, 2000);  
   },[]);
 
   const CheckLogin = async ()=>{ 
     try {
         const response = await axios.get(Hoot()+'token'); 
         const decoded = jwt_decode(response.data.accessToken);  
        setShowScreen(false);  
        if(decoded.cr_usertype !== null) {
            if(decoded.cr_usertype === 1){
              navigate.push("/newsfeed");
            }else{ 
              navigate.push('/dashboard')
            } 
        }
     } catch(e){
      console.clear();
      console.log(e);
        setShowScreen(true); 
        localStorage.removeItem("CurrentTab");
        localStorage.removeItem("CurrentPage");
     }
   }

   function hideMessage() {
     setMessagewarning(null); 
     setShow(false);
   }


  const Signin = async (e_mail, password)=>{ 
    let Nemail = (e_mail === null) ? ed_email :  e_mail;
    let Npassword = (password === null) ? ed_password :  password;

    setRegisterStatus(0);  
   try {
    if(Nemail ===  null || Npassword ===  null){
        setMessagewarning("Preencha corretamente os campos"); 
        setRegisterStatus(1);  
    }else{ 
       await axios.post(Hoot()+'login',{ed_user_account_email:Nemail,ed_user_account_password:Npassword}).then((e)=>{   
           if(Checked){AddNewCredencial(Nemail , Npassword);}
           hideMessage(); 
           setRegisterStatus(2);  
          setTimeout(() => {
             CheckLogin(); 
          }, 100);
        }).catch((error)=>{
           setRegisterStatus(1);  
           console.log(error); 
           if (error.response.data) {
            setRegisterStatus(1);  
            setMessagewarning(error.response.data.msg); 
          }else{
            setRegisterStatus(1);  
            setMessagewarning('Erro conectando-se ao servidor'); 
          }  
        });   
    }
  } catch (error) {
    if(error.response){
      if (error.response.data) {
        setRegisterStatus(1);  
        setMessagewarning(error.response.data.msg);
        console.log(error); 
      }else{
        setRegisterStatus(1);  
        setMessagewarning('Erro conectando-se ao servidor');
        console.log(error); 
      }
    }else{
      console.log(error)
      setRegisterStatus(1);  
      setMessagewarning("Erro ao estabelecer ligação com o servidor");
    }
  }  
  }


   const Auth = async (e)=>{
    e.preventDefault();  
      Signin(null, null);
   }


   function AuthStored(email, password) {
       setEd_email(email);
       setEd_password(password);
       Signin(email, password);
   }


  const  GoogleAuth = async() =>{
      window.open(Hoot()+"eduallgoogleuserauthentication/signin", "_self"); 
 }


 const  FacebookAuth = async() =>{
  window.open(Hoot()+"eduallgoogleuserauthentication/signin", "_self"); 
}


  const handleInput = (e)=>{  
    switch (e.target.id) { 
       case "ed_user_account_email":
          setEd_email(e.target.value);
        break;
        case "ed_user_account_password": 
            setEd_password(e.target.value);
        break;  
        default:
    }
  }


  
  /*  account storage */

  const AddNewCredencial = (email, password)=>{   
      let StoredCredencials = [];
      if(typeof list !== "object"){list = [];}
      if(list.length === 0){ 
           StoredCredencials.push({ed_password:password, ed_email:email.toLowerCase(),ed_image:""}); 
      }else{ 
         if(list.length > 0){
              for(let i = 0; i < list.length; i++){  
                  StoredCredencials.push(list[i]); 
              } 
          }
         if(CheckExistentUser(email.toLowerCase())){
            console.log("****** adding ******");
            console.log(JSON.parse(localStorage.getItem("eduall_local_credencials")));
            console.log("*********************");
            StoredCredencials.push({ed_password:password, ed_email:email.toLowerCase(), ed_image:""}); 
         }else{
           console.log("already added");
         }
      }   
  
      localStorage.setItem("eduall_local_credencials", JSON.stringify(StoredCredencials)); 
      list = JSON.parse(localStorage.getItem("eduall_local_credencials"));
      console.log(StoredCredencials);
      showStoredCredencials(list);
      return true;
  } 
  
  const RemoveStoredCredencial = (email)=>{ 
    if(typeof list !== "object"){list = [];}
      let x = null; 
          for (let i=0; i < list.length; i++) {
              if (list[i].ed_email.toLowerCase() === email.toLowerCase()) {
              x = i;
              }
          }
      
      if(x !== null){ 
          console.log(list)  
          list.splice(x , 1);
          let newData = list;
          localStorage.setItem("eduall_local_credencials", JSON.stringify(newData)); 
          list = JSON.parse(localStorage.getItem("eduall_local_credencials"));
          console.log("****************************************************") 
          console.log(list)   
          showStoredCredencials(list);
      }  
  }  
  
  const CheckExistentUser = (e)=>{ 
    if(typeof list !== "object"){list = [];}
      if(list !== null && list.length >= 1){
          const found = list.some(el => el.ed_email.toLowerCase() === e);
          if (!found)  return true;
      }
      return false;
  }



  const showStoredCredencials = async(list)=>{  
    try {
      let NewList = (typeof list === "object") ? list  : []; 
      if(typeof NewList === "object" &&
        NewList !== null && NewList !== undefined){  
        for (let i=0; i < NewList.length; i++) {  
           let img = ""
          const response = await axios.get(Hoot()+'eduallgetuserimagebyuser/get/'+`${NewList[i].ed_email.toLowerCase()}`); 
            if(response.data[0] !== null){
              if(typeof response.data[0] === "object"){
                img =  Hoot()+response.data[0].ed_user_account_picture;
             }
            }else{
              RemoveStoredCredencial(NewList[i].ed_email.toLowerCase());
            }  
          NewList[i].ed_image = img;
        }  
      } 
      console.log(NewList)
      SetLatestLoggedinUsers(NewList);  
    } catch (error) {
       console.log(error);
    }

}

  /*end **/


function RemindChecked(e){
    setChecked(e.target.checked);
}



   if(showScreen === true){
     if (loading) {
         return(<Loader  bg />);
     } else {
        document.title = "Eduallsys";
        return ( 
            <MainAuthScreen  content={
               <section>
                <GoogleOneTap />
               <div className="form-area">
                   <h1>Entrar</h1> 
                    <div className="form-message">
                       {messageWarning != null ? <Alert dismissible variant='danger' onClose={()=> hideMessage()}><h5 className='text-danger'> {messageWarning} </h5></Alert> : ''}
                   </div> 
                <Form onSubmit={Auth}> 
                  <>
                   <Form.Group className="mb-3" >
                      <Form.Label>Email ou nome usúario</Form.Label>
                     <Form.Control  onChange={handleInput} value={ed_email} id="ed_user_account_email"  type="text" className='mb-2' required placeholder="Digite o seu email ou nome de usúario" />
                   </Form.Group>
                     <Form.Group className="mb-3">
                     <Form.Label>palavra-passe</Form.Label>
                     <Form.Control onChange={handleInput}  id="ed_user_account_password"  value={ed_password}  type="password" required placeholder="Digite a sua senha" />
                  </Form.Group> 
                  </> 
                  <div className="ed-space">
                      <div>
                      <div >
                            <FormControlLabel onChange={(e)=>RemindChecked(e) }  control={<Checkbox  />} label="Lembrar sempre" />  
                        </div>
                      </div>
                      <div> <small><Link to='/forgot_password' className='text-main-light'>Esqueceu a sua palavra-passe ?</Link></small> </div>
                  </div>
                   <SaveButton class='btn mt-2 bg-black text-light' title={'Entrar'} status={RegisterStatus} />  
                   </Form> 
                  <div> 
                  <div className="or mt-2">
                      <div className="ln"></div>
                      ou
                      <div className="ln"></div>
                   </div>
                  <div className="ed-space">  
                      <div><button  className='btn mt-2 bg-white text-dark btn-social' onClick={GoogleAuth} ><><FcGoogle/> Entrar com google</></button> </div>
                      <div><button  className='btn mt-2 bg-white text-dark btn-social btn-facebook' onClick={FacebookAuth} ><><FaFacebook/> Entrar com facebook</></button></div>                        
                  </div>
                  <br />
                  <div className="d-flex">
                      <small>
                          Não têm uma conta ?<Link to='/signup' className='text-main-light ml-2'>Cadastre-se</Link>
                      </small>
                  </div>
                  </div> 
              </div>
              {LatestLoggedinUsers.length >= 1 ? 
               <div className="latest-accounts">
               <ul>
               <LoginModal toggle_btn={
                  <li>
                    <div className="icon bg-main">
                        <IoAddOutline/>
                    </div>
                 </li>  
                } />  
               <Swiper  Autoplay={true}  spaceBetween={70}  slidesPerView={6} onSlideChange={() => console.log('slide change')}  onSwiper={(swiper) => console.log(swiper)} >
               {LatestLoggedinUsers.map((item, index)=>{
                    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
                    if(emailRegexp.test(item.ed_email)){
                      return(
                        <SwiperSlide key={index} >
                        <li key={index}> 
                            <div className="bg-white remove" onClick={()=>RemoveStoredCredencial(item.ed_email)}><IoClose/></div>
                            <div onClick={()=>AuthStored(item.ed_email, item.ed_password)}>
                              <Avatar variant="rounded" src={item.ed_image} className='df' 
                              alt={(item.ed_email.split("")[0]).toUpperCase()} 
                              sx={{width:50,height:50}} /> 
                            </div>
                        </li>
                        </SwiperSlide>
                      )
                    }else{
                      return(
                        <SwiperSlide key={index} >
                        <li key={index}>
                          <div className="admin"><AdminPanelSettings/></div>
                            <div className="bg-white remove" onClick={()=>RemoveStoredCredencial(item.ed_email)}><IoClose/></div>
                            <div onClick={()=>AuthStored(item.ed_email, item.ed_password)}>
                              <Avatar variant="rounded" src={item.ed_image} className='df' 
                              alt={(item.ed_email.split("")[0]).toUpperCase()} 
                              sx={{width:50,height:50}} /> 
                            </div>
                        </li>
                        </SwiperSlide>
                      )
                    } 
                  })}  
                 </Swiper>   
                </ul>
              </div>
              : <></>}  
             </section> 
            }  /> 
        );
     }
   }
} 

    
export default Login;