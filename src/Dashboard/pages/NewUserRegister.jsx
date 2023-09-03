import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {Badge, Form, Table } from 'react-bootstrap'
import { Delete, Save, Search } from '@mui/icons-material';
import FileUpload from '../../General/components/FileUpload';
import { Avatar, Checkbox, FormControlLabel } from '@mui/material'; 
import { Link } from 'react-router-dom'; 
import {EmployeesDataOptions, GetInstituteCode, } from '../../General/components/InstituteData'; 
import BadgeAvatars from '../components/elements/BadgeAvatars';
import { ImagePreview } from '../components/elements/ImagePreview';
import CRValue from '../../General/components/CRValue';
import ClearInputs from '../../General/components/ClearInputs';
import Hoot from '../../General/components/Hoot';
import axios from 'axios';
import {toast} from 'react-toastify'; 
import ActiveUsersBox from '../components/elements/ActiveUsersBox';
import { SendEmailMessage } from '../../General/components/SenEmailMessage';
import UsersAccountTable from '../components/Table/UsersAccountTable';
import CRValueStatus from '../../General/components/CRValueStatus';
import Alert from 'react-bootstrap/Alert';

function NewUserRegister() {
    document.title = "Registrar novo usúario";  
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});
    const [Image, setImage] = useState([]);
    const [Data, SetData] = useState({});
    const SEARCHURL = Hoot()+'eduallsinglemployee/get/'
    const [ToggleState, setToggleState] = useState(1);
    const [Loaded, setLoaded] = useState(false); 
    const [FoundedEmployee, SetFoundedEmployee]  = useState(false);
    const [FormMessage, setFormMessage] = useState(null);
    const [MessageType, setMessageType] = useState(1);
    const [show, setShow] = useState(true);
    const [RegisterStatus, SetRegisterStatus] = useState(false);

    function generateString(length) {
         const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = ' ';
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return  `${result}` ;
    }

    const CivilState = ["Solteiro (a)","Noivo (a)","Casado (a)"];

    const OptionsMenu = [
      {menu_code:'mys',menu_name:'Módulo Minha escola'},
      {menu_code:'sec',menu_name:'Módulo Secretária'},
      {menu_code:'adm',menu_name:'Módulo Administração'},
      {menu_code:'fnc',menu_name:'Módulo Finanças'},
      {menu_code:'arpd',menu_name:'Módulo Área Pedagógica'}, 
      {menu_code:'tran',menu_name:'Módulo Transporte'},
      {menu_code:'lib',menu_name:'Módulo Biblioteca'},
      {menu_code:'sis',menu_name:'Módulo Sistema'},
      {menu_code:'conf',menu_name:'Módulo Configurações'},
      {menu_code:'prt',menu_name:'Portal de usúario)'}, 
    ]
  
    const INPUTS = { 
        user_account_name:CRValue("#user_account_name"), 
        user_account_charge:CRValue("#user_account_charge"),  
        user_account_access:CRValue("#user_account_access"),  
        user_account_phone:CRValue("#user_account_phone"), 
        user_account_code:generateString(2000), 
        user_account_employee:CRValue("#user_account_employee"), 
        user_account_picture:Image,  
        access_myschool:CRValueStatus("#mys_checked"),
        access_secretary:CRValueStatus("#sec_checked"),
        access_admnistration:CRValueStatus("#adm_checked"),
        access_finance:CRValueStatus("#fnc_checked"),
        access_pedagogy:CRValueStatus("#arpd_checked"),
        access_transportation:CRValueStatus("#tran_checked"),
        access_library:CRValueStatus("#lib_checked"),
        access_system:CRValueStatus("#sis_checked"),
        access_configuration:CRValueStatus("#conf_checked"),
        access_portal:CRValueStatus("#prt_checked"),
    }

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

const validateForm = ()=>{
    const {user_account_name,  user_account_employee} = form; 
    const NewErrors = {}; 
    
    if(INPUTS.user_account_name ===  "" || INPUTS.user_account_name ===  " "){
    if(!user_account_name || user_account_name === '') NewErrors.user_account_name = 'Preencha o campo corretamente';  
    }else{if(!user_account_name){setField("user_account_name", INPUTS.user_account_name);}}
 
    if(INPUTS.user_account_employee ===  "" || INPUTS.user_account_employee ===  " "){
    if(!user_account_employee || user_account_employee === '') NewErrors.user_account_employee = 'Funcionario selecionado é invalido invalido';
    }else{if(!user_account_employee){setField("user_account_employee", INPUTS.user_account_employee);}}

    return NewErrors;
}

const FORMURL = [
    Hoot()+"eduallinstituteuseraccountregister/post", 
    Hoot()+"edualluseraccountupdate/update/",  
    Hoot()+"eduallcheckexistentuseraccountemployee/",
    Hoot()+"eduallusersaccountaccessregister/post/"
 ];


 

 
function hideMessage() {
  setFormMessage(null); 
  setShow(false);
}


const FormSubmit = (e)=>{  
  SetRegisterStatus(false);
  setFormMessage(null); 
    e.preventDefault();   
    const formErrors = validateForm();
      if(Object.keys(formErrors).length > 0){
           setErrors(formErrors);
           toast.error("Verifique todos os  campos");    
      }else{  
 
       const formData = {
        user_account_name:INPUTS.user_account_name,
        user_account_employee:INPUTS.user_account_employee,
        access_myschool: INPUTS.access_myschool,
        access_secretary: INPUTS.access_secretary,
        access_admnistration: INPUTS.access_admnistration,
        access_finance: INPUTS.access_finance,
        access_pedagogy: INPUTS.access_pedagogy,
        access_transportation: INPUTS.access_transportation,
        access_library: INPUTS.access_library,
        access_system: INPUTS.access_system,
        access_configuration: INPUTS.access_configuration
       }  

       setFormMessage(null);  
         const DataAction = async()=>{     
                axios.post(FORMURL[0],formData).then((e)=>{   
                  setMessageType(2);
                  setFormMessage("success");
                  SetRegisterStatus(true);
                  SetData({});
                  ClearInputs();
                  setForm({});
                  setErrors({}); 
                }).catch((error)=>{   
                  setMessageType(3);
                  if(error.response){
                    if(error.response.data){
                       if(error.response.data.msg){  
                         setFormMessage(error.response.data.msg); 
                       }else{ 
                         setFormMessage("Erro ao estabelecer ligação com o servidor"); 
                       }
                    }else{   
                     setFormMessage("Erro ao estabelecer ligação com o servidor"); 
                    }
                 }else{   
                   setFormMessage("Erro ao estabelecer ligação com o servidor"); 
                 }
               });   
            }   
          DataAction();  
      }    
};


async function CheckCurentEmployee(id){ 
  setFormMessage(null);  
  const response = await axios.get(SEARCHURL+id); 
  if (response.data.length >= 1){ 
    console.clear();
     console.log(response.data[0])
       SetData(response.data[0]);   
       setLoaded(true); 
       SetFoundedEmployee(true);
  }else{
      setLoaded(true);
      SetFoundedEmployee(false);
  }
}
   
   
   
   const handleInput = (e)=>{   
     switch (e.target.id) { 
         case "user_account_charge":
           setField("user_account_charge", e.target.value) 
           INPUTS.user_account_charge = e.target.value 
         break;    
         case "user_account_employee":
          setField("user_account_employee", e.target.value) 
          INPUTS.user_account_employee = e.target.value;
          CheckCurentEmployee(e.target.value);
        break;    
         case "user_account_name":
           setField("user_account_name", e.target.value) 
           INPUTS.user_account_name = e.target.value 
         break;  
          case "mys_checked":
           setField("access_myschool", e.target.checked === false ? 0 : 1);
           INPUTS.access_myschool =  e.target.checked === false ? 0 : 1;
         break;  
         case "sec_checked":
          setField("access_secretary",  e.target.checked === false ? 0 : 1);
          INPUTS.access_secretary =  e.target.checked === false ? 0 : 1;
        break;  
        case "adm_checked": 
          setField("access_admnistration", e.target.checked === false ? 0 : 1) 
          INPUTS.access_admnistration = e.target.checked === false ? 0 : 1;
        break;  
        case "fnc_checked":
          setField("access_finance", e.target.checked === false ? 0 : 1) 
          INPUTS.access_finance = e.target.checked === false ? 0 : 1; 
        break;  
        case "arpd_checked":
          setField("access_pedagogy",e.target.checked === false ? 0 : 1) 
          INPUTS.access_pedagogy = e.target.checked === false ? 0 : 1; 
        break; 
        case "tran_checked":
          setField("access_transportation", e.target.checked === false ? 0 : 1) 
          INPUTS.access_myschool = e.target.checked === false ? 0 : 1; 
        break;  
        case "lib_checked":
         setField("access_library", e.target.checked === false ? 0 : 1) 
         INPUTS.access_library = e.target.checked === false ? 0 : 1;
       break;  
       case "sis_checked":
         setField("access_system", e.target.checked === false ? 0 : 1) 
         INPUTS.access_system = e.target.checked === false ? 0 : 1; 
       break;  
       case "conf_checked":
         setField("access_configuration", e.target.checked === false ? 0 : 1) 
         INPUTS.access_configuration = e.target.checked === false ? 0 : 1;
       break;  
       case "prt_checked":
         setField("access_portal", e.target.checked === false ? 0 : 1) 
         INPUTS.access_portal = e.target.checked === false ? 0 : 1;
       break;
       default:
     }  

   } 
  

  
    return (
      <div >
        <div> 
        </div> 
           <Form onSubmit={FormSubmit} method='post' encType='multipart/form-data'>
          <ContainerBox>
               <Box className="boxx">
                  <div className="box-components"> 
                            <div className="title">
                                <h2>Criar conta de usúario para instituição</h2>
                            </div>
                            <div className="form-message mb-3 mt-2"> 
                                {
                                FormMessage !== null ? <Alert dismissible variant={(MessageType === 1  ||  MessageType === 3) ? "danger" : 'success'} onClose={()=> hideMessage()}>
                                   <>
                                      {MessageType === 3 ? 
                                      <>
                                       <h5 className='text-danger'>{FormMessage}</h5>
                                      </>  : 
                                        <>
                                        {                           
                                          MessageType === 1 ? 
                                            <h5 className='text-danger'> 
                                              <div className='ed-block'>Conta não encomtrada !</div> 
                                              <div className="mt-2"><small>{FormMessage}</small></div>  
                                          </h5> : 
                                          <h5>
                                             {RegisterStatus ? 
                                                 <>
                                                   <div className='ed-block'>Conta criada com sucesso !</div> 
                                                  <div className="mt-2"><small>Aguarde até o funcionario aceitar fazer parte da sua instituição .</small></div>
                                                 </>
                                                : 
                                                <>
                                                  <div className='ed-block'>Conta encomtrada !</div> 
                                                  <div className="mt-2"><small>Atribua um nome de usuario para o funcionario e aguarde a resposta.</small></div>
                                                </>
                                             }
                                          </h5> 
                                          } 
                                        </> 
                                      }
                                   </> 
                                  </Alert> : ''
                                } 
                            </div>
                            <FlexBox>
                             <Avatar   src={Hoot()+Data.ed_employee_picture} sx={{width:160,height:160}} className='df' />
                            <div className='pd-1' ></div>
                            <div className="box col">
                            <Form.Group className="mb-3"> 
                                    <div className="block">
                                        <Form.Label>Selecionar funcionario</Form.Label>
                                        <Form.Select className={!!errors.user_account_employee && 'is-invalid'}  onChange={handleInput} value={form.user_account_employee} isInvalid={!!errors.user_account_employee}   type="employee"   
                                        placeholder="" name='user_account_employee' id="user_account_employee" >
                                            <EmployeesDataOptions />
                                        </Form.Select>
                                    <Form.Control.Feedback type='invalid'>{errors.user_account_employee}</Form.Control.Feedback>
                                    </div> 
                                    <div className="mt-4">
                                        <Form.Label>Nome de usuario  <span className="text-danger">*</span> </Form.Label>
                                        <Form.Control  onChange={handleInput} className={!!errors.user_account_name && 'is-invalid'}  value={form.user_account_name} isInvalid={!!errors.user_account_name}  type="text"   
                                        placeholder="Ex: mariopaulo14 " name='user_account_name' id="user_account_name"  /> 
                                        <Form.Control.Feedback type='invalid'>{errors.user_account_name}</Form.Control.Feedback>
                                    </div>
                            </Form.Group> 
                            </div>
                            </FlexBox>  
                            <Table  bordered > 
                                <tbody>
                                    <tr> 
                                        <td>
                                            <div className="ed-space">
                                                <div>Nº do BI</div>
                                                <div><span>{Data.ed_employee_identityCard}</span> </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="ed-space">
                                                <div>Morada</div>
                                                <div><span>{Data.ed_employee_address}</span> </div>
                                            </div>
                                        </td>
                                    </tr> 
                                    <tr> 
                                        <td>
                                            <div className="ed-space">
                                                <div>Genero</div>
                                                <div><span>{Data.ed_employee_gender === "female" ?  "Femenino" : "Masculino"}</span></div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="ed-space">
                                                <div>Nif</div>
                                                <div><span>{Data.ed_employee_nif}</span> </div>
                                            </div>
                                        </td>
                                    </tr> 
                                    <tr> 
                                        <td>
                                            <div className="ed-space">
                                                <div>Nacionalidade</div>
                                                <div><span>{Data.ed_employee_nacionality}</span> </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="ed-space">
                                                <div>Telefone</div>
                                                <div><span>{Data.ed_employee_phone   + " / " + Data.ed_employee_phone2}</span> </div>
                                            </div>
                                        </td>
                                    </tr> 
                                    <tr> 
                                        <td>
                                            <div className="ed-space">
                                                <div>Data de nascimento</div>
                                                <div><span>{Data.ed_employee_birthday}</span> </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="ed-space">
                                                <div>Estado civil</div>
                                                  <div><span>{CivilState[Data.ed_employee_civil_state]}</span> </div>
                                            </div>
                                        </td>
                                    </tr>  
                                </tbody>
                              </Table> 
                            <div className="ed-space mt-4">
                                <div></div>
                                <div className="ed-flex">
                                    <button  className='btn bg-danger text-light' type='reset' id='clearForm'>
                                        <Delete />  Limpar
                                    </button>
                                    <button className="btn ml-2 bg-main" type="submit">
                                        <Save />Salvar
                                    </button> 
                                </div>
                            </div>
                  </div>
               </Box>
               <div className="pd-1"></div> 
               <BoxAccess  className="boxx">
                    <div className="ed-block">
                       <div className="title">
                            <h2>Restringir acesso</h2>
                       </div>  
                       <Container> 
                           {OptionsMenu.map((item, index)=>{
                             return(
                              <article key={index}> 
                                  <div className="small-box"> 
                                       <FormControlLabel control={<Checkbox id={`${item.menu_code}_checked`}  onChange={handleInput}  />} label={item.menu_name} />
                                    </div> 
                              </article> 
                             )
                           })}
                       </Container>
                     </div>
               </BoxAccess>
          </ContainerBox> 
          </Form>
        <div className="mt-2">
            <UsersAccountTable/>
        </div>
      </div>
    )
}


const ContainerBox = styled.div`
     display:flex;
     flex-start:start;
     width:100%;
     margin-top:20px;

     table .ed-space span{
      color:var(--ed-grey-text);
   }

  .form-message h5{
      font-size:17px;
      text-transform:unset !important;
      margin:0px !important;
  } 

     @media screen and (max-width:1290px){ 
        flex-direction:column;

        .boxx{
            width:100%;
            min-width:100%;
        }
  }  

`;
 

const FlexBox = styled.div`
   margin:10px 0;
   display:flex; 
   width:100%;
`;

const Box = styled.div`
    width:100%; 
    border-radius:6px;   
    padding:20px;
    min-height:500px;
    height:auto;
    background:var(--ed-white);  
    box-shadow:var(--ed-shadow-df);
    margin-bottom:20px;

    @media screen and (max-width:1290px){ 
        width:auto;
        min-width:50%;
    }  

    .box-components{
        display:flex;
        width:100%; 
        flex-direction:column;
    }

    .title h2{
        font-size:18px;  
        font-weight:600; 
        margin-bottom:20px;
    }

`;


const BoxAccess = styled.div` 
    border-radius:6px;   
    padding:20px;
    min-height:500px;
    height:auto;
    background:var(--ed-white);  
    box-shadow:var(--ed-shadow-df);
    margin-bottom:20px;

    form{ 
        width:100%;
    }

    @media screen and (max-width:1290px){ 
        width:auto;
        min-width:50%;
    }  

    .box-components{
        display:flex;
        width:100%;
        justify-content:space-between;
    }

    .title h2{
        font-size:18px;  
        font-weight:600; 
        margin-bottom:20px;
    }

`;

const Container = styled.div`
   max-height:500px;
   max-width:400px;
   min-width:400px;
   overflow-y:auto;
   padding-right:10px;

   
   @media screen and (max-width:1290px){ 
       width:100%;
       max-width:100%;
   }  
 

   &::-webkit-scrollbar{
    width:6px;
    background-color:transparent;
  }

 &:hover{ 
  &::-webkit-scrollbar-thumb{
    background:rgb(219, 219, 219); 
   }
 }


  article{
    width:100%;

    label{
        width:100%;
    }

    .small-box{  
        margin:10px 0px;
        min-height:50px;
        padding:5px 10px;
        border-radius:6px;
        width:100%;  
        display:flex;
        align-items:center;
        cursor:pointer;
        border:1px solid var(--ed-silver-light); 
    }


   ol{
      display:block;

        span{
            font-size:15px;
        }
    }

  }



`;
 
 
export default NewUserRegister