
import  React,  { useState, useEffect } from 'react';  
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form' 
import styled from "styled-components"; 
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Color from './Dashboard/components/elements/Color';
import logo from './Assets/images/logo-small-white.png'; 
import axios from 'axios'; 
import Hoot from './General/components/Hoot';
import jwt_decode from 'jwt-decode';
import { Link   } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import Loader from './General/components/Loader';
import { Avatar } from '@mui/material';
import AvatarImg from './Assets/images/avatars/avatar-6.jpg'; 
import CoverImg from './Assets/images/svg/cover.png'; 
import { CloseOutlined, Remove } from '@mui/icons-material';
import { Close } from '@material-ui/icons';
import Tooltip from './General/components/Tooltip';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import SaveButton from './Dashboard/components/elements/SaveButton';
import InternetToggle from './Dashboard/components/elements/InternetToggle';
import { FcGoogle } from "react-icons/fc";
import {IoClose,IoAddOutline } from "react-icons/io5";
import Slider from 'react-slick';
import RandomColor from './General/components/RandomColor';


const Login = ()=>{
   const [messageWarning, setMessagewarning] = useState(null);
   const [show, setShow] = useState(true);
   const [showScreen, setShowScreen] = useState(null);
   const [ed_email, setEd_email] = useState(null);
   const [ed_password, setEd_password] = useState(null); 
   const [loading, setLoading] = useState(true);
   const navigate = useHistory();
   const [switchuser, SetSwitchUser] = useState(false);
   const [RegisterStatus, setRegisterStatus] = useState(null); 
   const [LatestLoggedinUsers, SetLatestLoggedinUsers] = useState([1,2,3,4]);
 
   useEffect(()=>{  
      CheckLogin(); 
      GetLatestUser(); 
      setTimeout(() => {
          setLoading(false);
      }, 3000);
   },[]);

 
 
   const CheckLogin = async ()=>{ 
     try {
         const response = await axios.get(Hoot()+'token'); 
         const decoded = jwt_decode(response.data.accessToken); 
         setShowScreen(false);  
         if(decoded.cr_username !== null) navigate.push("/dashboard");
     } catch(e){
        setShowScreen(true);
        localStorage.removeItem("CurrentTab");
        localStorage.removeItem("CurrentPage");
     }
   }

   function hideMessage() {
     setMessagewarning(null); 
     setShow(false);
   }

   const Auth = async (e)=>{
      e.preventDefault(); 
      setRegisterStatus(0);  
      try {
          if(ed_email ===  null ||ed_password ===  null){
              setMessagewarning("Preencha corretamente os campos"); 
              setRegisterStatus(1);  
          }else{ 
             await axios.post(Hoot()+'login',{
                ed_user_account_email:ed_email,
                ed_user_account_password:ed_password
              }); 
              hideMessage();
              setRegisterStatus(2);  
              setTimeout(()=>{navigate.push('/dashboard');},100);
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
          setRegisterStatus(1);  
            setMessagewarning("Erro ao estabelecer ligação com o servidor");
        }
      } 
   }

   function GetLatestUser() {
    const LatestLoggedinUser = localStorage.getItem("eduallswitchuser"); 
    const checkValue =  LatestLoggedinUser === null ? null : LatestLoggedinUser;
    if(checkValue !== null){
        /// check if user exist in our database and in our latest browserusers
        SetSwitchUser(true);
        setEd_email(checkValue);
        return true;
    }else{
        SetSwitchUser(false);
    } 
   }


       
  const handleInput = (e)=>{  
    switch (e.target.id) { 
       case "ed_user_account_email":
          setEd_email(e.target.value);
        break;
        case "ed_user_account_password": 
            setEd_password(e.target.value);
        break;  
    }
  }


   function RemoveAccount() {  
      localStorage.removeItem("eduallswitchuser");
      SetSwitchUser(false);
   }

   if(showScreen === true){
     if (loading) {
         return(<Loader  bg />);
     } else {
        document.title = "Eduallsys";
        return (
          <div className="signin-area">
          <div className="ed-space float-top">
              <div>
                 <Link to='/'>
                      <img loading="lazy" role="presentation" src={logo} alt="eduallsys" />
                 </Link>
              </div>
             <div>
                <InternetToggle />
             </div>
          </div>
          <Container>  
           <section>
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
                  <div><FormControlLabel control={<Checkbox  />} label="Lembrar sempre" /> </div>
                  <div> <Link to='/forgot_password' className='text-main-light'>Esqueceu a sua palavra-passe ?</Link></div>
              </div>
               <SaveButton class='btn mt-2 bg-black text-light' title={'Entrar'} status={RegisterStatus} /> 
               <button disabled class='btn mt-2 bg-white text-dark btn-google'><><FcGoogle/> Entrar com conta google</></button> 
              <br />
              <div className="d-flex">
                 Não têm uma conta ? <Link to='#' className='text-main-light ml-2'>Cadastre-se</Link>
              </div>
              </Form> 
          </div>
          <div className="latest-accounts">
             <ul>
             <li>
                  <div className="icon bg-main">
                      <IoAddOutline/>
                  </div>
              </li>   
             {LatestLoggedinUsers.map((item, index)=>{
                return(
                  <li key={index}>
                  <div className="bg-white remove"><IoClose/></div>
                     <Avatar variant="rounded" className='df' sx={{width:50,height:50}} /> 
                  </li>
                )
              })} 
             </ul>
           </div>
         </section>
          <div className="d-none image-cover">
             <img loading="lazy" role="presentation" src={CoverImg} alt="" />
          </div>
      </Container>
      <div className="powered"> 
          <span>This software is powered by <a href="#" className='text-main-light'>Company.Inc</a></span> 
      </div> 
     </div>
        );
     }
   }
} 


const Container = styled.div` 
   position:absolute;
   width:100%;
   height:100vh;
   top:0px;
   left:0px;
   paddding:20px;
   display:flex;
   align-items:center;
   justify-content:center; 
   flex-direction:column;


   ul{
    display:flex;
    margin-top:20px;
    padding:0px;
    padding-left:5px;
    max-width:580px;
    min-height:110px; 
    overflow-y:auto; 

     li{
      display:flex;   
      min-width:65px;
      width:65px;
      height:65px;
      align-items:center;
      justify-content:center; 
      padding:10px;
      border-radius:6px; 
      background:var(--white);
      box-shadow:var(--ed-shadow-1); 
      position:relative;
      margin:0px;
      margin-top:10px;
      margin-right:15px; 
      cursor:pointer;
      transition:all 1s ease-in-out;

      .remove{
        position:absolute;
        top:-2px;
        right:5px;
        border-radius:100%;
        display:none;  
        align-items:center;
        justify-content:center; 
        width:20px;
        height:20px;
        cursor:pointer;
        border:1px solid var(--ed-red);
        z-index:100;

          svg{
            color:var(--ed-red)!important;
            fill:var(--ed-red)!important;
          }
     }

      &:hover{ 
          .remove{
            display:flex;
          }
      }


           .icon{
              width:50px;
              min-width:50px;
              height:50px;
              border-radius:6px;
              display:flex;  
              align-items:center;
              justify-content:center;  

              svg{
                  color:var(--white)!important;
                  fill:var(--white)!important;
                  width:30px;
                  height:30px;
              }
           }
      
     }
   }

 
 
   .form-message h5{
      font-size:17px;
      text-transform: lowercase !important;
      margin:0px !important;
    }


   .form-area{ 
       width:100%;
       max-width:580px;
       min-width:580px;
       display:flex;  
       flex-direction:column;
       padding:15px;
       background:var(--white);
       box-shadow:var(--ed-shadow-df);
       border-radius:6px; 
       z-index:1000;
       position:relative;

       .btn-google{
          box-shadow:unset !important;
          border:1px solid var(--ed-silver) !important;

           svg{
              margin-right:10px;
           }
       }


       @media screen and (max-width:1289px){
          max-width:590px; 
       }

       h1{
         font-size:30px;
         font-weight:bolder; 
       }

       p{
        font-size:13px;
        font-weight:500;
        letter-spacing:1px;
        color:var(--silver);
        margin:10px 0px;
       }

       input{
            padding:7px 10px;
            font-size:16px;
       }
    } 

    .image-cover{
      position:absolute;
      right:20px;
      bottom:20px;
      
      img{
        max-width:500px;
       }

      @media screen and (min-width:1280px){
            img{
                max-width:400px;
            }
      }
      
    }
`


const Menus = styled.div`
   position:fixed;
   bottom:40px;
   right:40px; 
   border-radius:60px;
   width:60px; 
   display:flex;
   padding:10px 8px;
   flex-direction:column;
   align-items:center;
   justify-content:center;
   

      .menu{
          width:100%;
          min-width:40px;
          height:40px;
          border-radius:100%;
          background:var(--ed-white);
          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:center;
          cursor:pointer;
          margin:5px 0px;

            svg{
              fill:var(--ed-dark);
            }
      }
`;


const ProfileBox = styled.div`
    padding:10px 15px;
    min-height:70px;
    margin:10px 0px; 
    margin-bottom:20px;
    border-radius:6px;
    border:1px solid var(--ed-white-smoke);
    display:flex;
    align-items:center;
    justify-content:space-between;
    position:relative;

   .ed-block{
     padding-left:15px;
     padding-top:5px;
     color:var(--ed-dark);

    h1{
      margin:0px;
      font-weight:500;
      font-size:16px;
    }

    span{
        font-size:13px;
        font-weight:normal;
    }
   } 
    

     button{
          padding:4px;
          width:30px;
          height:30px;
          border-radius:100%;
          display:flex;
          align-items:center;
          justify-content:center;
          cursor:pointer;
          background:transparent;
          border:1px solid var(--ed-red-light); 

          svg{
             fill:var(--ed-red-light);
          } 
      }


`;

    
export default Login;