import React, {useState} from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Modal, Form, Button} from 'react-bootstrap'
import { Save } from '@mui/icons-material'; 
import {toast} from 'react-toastify'; 
import axios from 'axios';
import { Update } from '@material-ui/icons';
import CRValue from '../General/components/CRValue';
import Hoot from '../General/components/Hoot';
import DraggableModal from '../General/components/DraggableModal';
import { useHistory ,Link} from 'react-router-dom';
import SaveButton from '../Dashboard/components/elements/SaveButton';
import { FcGoogle} from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import jwt_decode from 'jwt-decode';
import { styled } from 'styled-components';


function LoginModal(props) {
    const [show, setShow] = useState(false);
    const [messageWarning, setMessagewarning] = useState(null); 
    const [showScreen, setShowScreen] = useState(null);
    const [ed_email, setEd_email] = useState(null);
    const [ed_password, setEd_password] = useState(null); 
    const [loading, setLoading] = useState(true);
    const navigate = useHistory();
    const [switchuser, SetSwitchUser] = useState(false);
    const [RegisterStatus, setRegisterStatus] = useState(null); 
    const [LatestLoggedinUsers, SetLatestLoggedinUsers] = useState([""]);
  
    const handleClose = () => setShow(false);
    const handleShow = () => {
       setShow(true); 
    };
  
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});
   
    
    const FORMURL = [
      Hoot()+"eduallcicleregister/post/",
      props.get ? props.get : '',
      props.url ? props.url : ''
    ];
  
  
    const INPUTS = {
         title:CRValue("#title"),
         code:CRValue("#code"), 
    }; 
  
  
   
    const setField = (field, value)  =>{
      setForm({
          ...form,
          [field]:value
      })
  
      if(!!errors[field]){
           setErrors({
              ...errors,
              [field]:null
           });  
      }
  }
   


  const images = [
     "https://conteudo.imguol.com.br/c/esporte/41/2021/07/27/marta-disputa-as-olimpiadas-de-toquio-pela-selecao-brasileira-1627417009042_v2_450x600.jpg",
     "https://pbs.twimg.com/profile_images/558434025954488320/E4r4Rlc__400x400.jpeg",
     "https://br.web.img3.acsta.net/pictures/19/11/12/22/54/0812791.jpg",
     "https://www.agendor.com.br/blog/wp-content/uploads/2014/12/steve-jobs-sucesso.jpg",
  ]

 


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


   
  
  
    const FormSubmit = (e)=>{ 
     
    };
  
      
    const handleInput = (e)=>{ 
       switch (e.target.id) { 
          case "title":
            setField("title", e.target.value) 
            INPUTS.title = e.target.value
           break;
           case "code":
            setField("code", e.target.value) 
            INPUTS.code = e.target.value
           break;  
       }
    }
  
  
    return (
      <div>
           <div>
           <div onClick={handleShow}>
              {
                props.toggle_btn ? props.toggle_btn :   <button className='btn btn-main'><AddCircleOutlineIcon/>Entrar</button>  
              }
         </div>
     <Modal size='md' dialogAs={DraggableModal}  centered  className='animate__animated animate__zoomInDown'  show={show} onHide={handleClose}>
       <Modal.Header closeButton>
       <Modal.Title><h5>Entar com outra conta</h5></Modal.Title>
       </Modal.Header>
       <Form onSubmit={FormSubmit}>
       <Modal.Body className='scrollLimit'>
            <Container>
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
                   <SaveButton class='col btn mt-2 bg-black text-light' title={'Entrar'} status={RegisterStatus} /> 
                  <div className="d-noneX">
                  <div className="or mt-2">
                      <div className="ln"></div>
                      ou
                      <div className="ln"></div>
                   </div>
                  <div className="ed-space">
                      <div>
                      <button   class='btn mt-2 bg-white text-dark btn-social'><><FcGoogle/> Entrar com google</></button> 
                      </div>
                      <div>
                        <button  class='btn mt-2 bg-white text-dark btn-social btn-facebook'><><FaFacebook/> Entrar com facebook</></button> 
                      </div>
                  </div>
                  <br />
                  <div className="d-flex">
                      <small>
                          Não têm uma conta ?<Link to='/signup' className='text-main-light ml-2'>Cadastre-se</Link>
                      </small>
                  </div>
                  </div>
            </Container>
       </Modal.Body> 
       </Form>
     </Modal>
   </div>
      </div>
    )
}


 
const Container = styled.div`  
   .or{   
      display:flex;
      align-items:center;
      justify-content:space-between; 
      color:grey; 

        .ln{
            width:45%;
            height:1px;
            background:var(--ed-silver);
        }
   }

   .btn.col{
      width:100% !important; 
   }

    .btn-social{
        min-width:229px !important;
        max-width:229px !important;
        box-shadow:unset !important;
        font-size:14.5px !important;
        border:1px solid var(--ed-silver) !important;

          svg{
            margin-right:10px;
          }
    }

    .btn-facebook{
         svg{
             fill:var(--ed-blue-light);
         }
    }

 
 
 
 
       .form-message h5{
            font-size:17px;
            text-transform: lowercase !important;
            margin:0px !important;
        } 
   
     

       input{
            padding:7px 10px;
            font-size:16px;
       } 

 
`

export default LoginModal
