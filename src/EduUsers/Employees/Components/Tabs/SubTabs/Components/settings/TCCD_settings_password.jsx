import axios from 'axios';
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import Hoot from '../../../../../../../General/components/Hoot';
import CRValue from '../../../../../../../General/components/CRValue';
import { toast } from 'react-toastify';
import { Update } from '@material-ui/icons';
import { styled } from 'styled-components';

function TCCD_settings_password() {
    
 
  const FORMURL = [
    Hoot()+"eduallemployeeregister/post/",  
    Hoot()+"eduallsinglemployee/get/"
 ]; 
 
document.title = 'Registrar novo funcionario'; 


const [ToggleJob, setToggleJob] = useState(0);
 const [form, setForm] = useState({});
 const [errors, setErrors] = useState({});
 const [Files, setFiles] = useState([]);
 const [Select, setSelected] = useState([]);
 const [Image, setImage] = useState([]);
 const [Subjects, setSubjects] = useState("");
 const [EmployeeFounded, SetEmployeeFounded] = useState(false); 

 
const INPUTS = {  
    employee_name:CRValue("#employee_name"), 
    employee_address:CRValue("#employee_address"), 
    employee_nacionality:CRValue("#employee_nacionality"), 
    employee_gender:CRValue("#employee_gender"),
    employee_religion:CRValue("#employee_religion"),
    employee_birthday:CRValue("#employee_birthday"), 
    employee_phone:CRValue("#employee_phone"),
    employee_landline:CRValue("#employee_landline"), 
    employee_email:CRValue("#employee_email"), 
    employee_charge:CRValue("#employee_charge"),
    employee_nif:CRValue("#employee_nif"),
    employee_hasAccount:CRValue("#employee_hasAccount"),
    employee_civil_state:CRValue("#employee_civil_state"),  
    employee_subjects:Subjects,
    employee_identityCard:CRValue("#employee_identityCard"),
    employee_picture:Image,  
    employee_files:Files,
    employee_status:CRValue("#employee_status"), 
}



 
const GET_DATA = async()=>{ 
     
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
 

const GetAvatarImage = (e)=>{
  setImage(e);  
}

const GetFiles = (e)=>{
  setFiles(e);
}
 


const SelectedSubjects = (e)=>{
  setSelected(e);
  var data = "";
  for(let i = 0; i < e.length; i++){
       data += ","+e[i].value;
  } 
  setSubjects(data);
}

const validateForm = ()=>{
    const {employee_name , employee_address, employee_nacionality, 
    employee_gender, employee_religion, employee_birthday, employee_phone , employee_landline, 
    employee_email,  employee_civil_state,  employee_identityCard, employee_charge , employee_nif, employee_status} = form; 
    const NewErrors = {};
    
    if(INPUTS.employee_name ===  "" || INPUTS.employee_name ===  " "){
    if(!employee_name || employee_name === '') NewErrors.employee_name = 'Preencha o campo corretamente';  
    }else{if(!employee_name){setField("employee_name", INPUTS.employee_name);}}

    if(INPUTS.employee_gender ===  "" || INPUTS.employee_gender ===  " "){
    if(!employee_gender || employee_gender === '') NewErrors.employee_gender = 'Genero inavalido';
    }else{if(!employee_gender){setField("employee_gender", INPUTS.employee_gender);}}
 
    if(INPUTS.employee_nif ===  "" || INPUTS.employee_nif ===  " "){
    if(!employee_nif || employee_nif === '') NewErrors.employee_nif = 'Número de identificação fiscal invalido inavalido';
    }else{if(!employee_nif){setField("employee_nif", INPUTS.employee_nif);}}

    if(INPUTS.employee_charge ===  "" || INPUTS.employee_charge ===  " "){
    if(!employee_charge || employee_charge === '') NewErrors.employee_charge = 'Profissão invalida';  
    }else{if(!employee_charge){setField("employee_charge", INPUTS.employee_charge);}}

    if(INPUTS.employee_email ===  "" || INPUTS.employee_email ===  " "){
    if(!employee_email || employee_email === '') NewErrors.employee_email = 'Email invalido';   
    }else{if(!employee_email){setField("employee_email", INPUTS.employee_email);}}

    if(INPUTS.employee_address ===  "" || INPUTS.employee_name ===  " "){
    if(!employee_address || employee_address === '') NewErrors.employee_address = 'Endereço invalido';
    }else{if(!employee_address){setField("employee_address", INPUTS.employee_address);}}

    if(INPUTS.employee_nacionality ===  "" || INPUTS.employee_nacionality ===  " "){
    if(!employee_nacionality || employee_nacionality === '') NewErrors.employee_nacionality = 'Nacionalidade invalida';
    }else{if(!employee_nacionality){setField("employee_nacionality", INPUTS.employee_nacionality);}}

    if(INPUTS.employee_religion ===  "" || INPUTS.employee_religion ===  " "){
    if(!employee_religion || employee_religion === '') NewErrors.employee_religion = 'Religião invalida';
    }else{if(!employee_religion){setField("employee_religion", INPUTS.employee_religion);}}

    if(INPUTS.employee_birthday ===  "" || INPUTS.employee_birthday ===  " "){
    if(!employee_birthday || employee_birthday === '') NewErrors.employee_birthday = 'Preencha o campo corretamente';  
    }else{if(!employee_birthday){setField("employee_birthday", INPUTS.employee_birthday);}}

    if(INPUTS.employee_phone ===  "" || INPUTS.employee_phone ===  " "){
    if(!employee_phone || employee_phone === '') NewErrors.employee_phone =  'Numero de telefone invalido';
    }else{if(!employee_phone){setField("employee_phone", INPUTS.employee_phone);}}

    if(INPUTS.employee_landline ===  "" || INPUTS.employee_landline ===  " "){
    if(!employee_landline || employee_landline === '') NewErrors.employee_landline =  'Numero de telefone invalido';  
    }else{if(!employee_landline){setField("employee_landline", INPUTS.employee_landline);}}

    if(INPUTS.employee_email ===  "" || INPUTS.employee_email ===  " "){
    if(!employee_email || employee_email === '') NewErrors.employee_email = 'Email invalido';  
    }else{if(!employee_email){setField("employee_email", INPUTS.employee_email);}}

    if(INPUTS.employee_civil_state ===  "" || INPUTS.employee_civil_state ===  " "){
    if(!employee_civil_state || employee_civil_state === '') NewErrors.employee_civil_state = 'Preencha o campo corretamente';  
    }else{if(!employee_civil_state){setField("employee_civil_state", INPUTS.employee_civil_state);}}

    if(INPUTS.employee_identityCard ===  "" || INPUTS.employee_identityCard ===  " "){
    if(!employee_identityCard || employee_identityCard === '') NewErrors.employee_identityCard = 'Bilhete de identficação invalido';
    }else{if(!employee_identityCard){setField("employee_identityCard", INPUTS.employee_identityCard);}}
 
    if(INPUTS.employee_status ===  "" || INPUTS.employee_status ===  " "){
    if(!employee_status || employee_status === '') NewErrors.employee_status =  'Selecione um estado valido';
    }else{if(!employee_status){setField("employee_status", INPUTS.employee_status);}}
      
    return NewErrors;
}


const FormSubmit = (e)=>{  
 e.preventDefault();  
 const formErrors = validateForm();
   if(Object.keys(formErrors).length > 0){
        setErrors(formErrors);
        toast.error("Verifique todos os  campos");    
   }else{  
      const formData = new FormData(); 
      formData.append("employee_name",INPUTS.employee_name);
      formData.append("employee_address",INPUTS.employee_address);
      formData.append("employee_nacionality",INPUTS.employee_nacionality);
      formData.append("employee_gender",INPUTS.employee_gender);
      formData.append("employee_religion",INPUTS.employee_religion);
      formData.append("employee_birthday",INPUTS.employee_birthday);
      formData.append("employee_phone",INPUTS.employee_phone);
      formData.append("employee_landline",INPUTS.employee_landline); 
      formData.append("employee_email",INPUTS.employee_email);
      formData.append("employee_civil_state",INPUTS.employee_civil_state);
      formData.append("employee_code",INPUTS.employee_code);
      formData.append("employee_identityCard",INPUTS.employee_identityCard);
      formData.append("employee_picture",INPUTS.employee_picture);
      formData.append("employee_status",INPUTS.employee_status);
      formData.append("employee_charge",INPUTS.employee_charge);
      formData.append("employee_subjects",INPUTS.employee_subjects);
      formData.append("employee_nif",INPUTS.employee_nif);
      formData.append("institute_code",INPUTS.institute_code);



    


      console.log(INPUTS);
      console.log("*************************")

     
      axios.post(FORMURL[0] , formData).then((e)=>{  
        console.log(e.data); 
        toast.success("Funcionario cadastrado com sucesso !");  
       
       /*
       setTimeout(() =>{ 
          setForm({}); 
          ClearInputs();
          ChildRef.current.RemoveImage();  
          ChildRef2.current.ClearFiles();  
       }, 1000);
      */
      
      }).catch((error)=>{
        console.log(error); 
        toast.error("Lamentamos mas não foi possivel cadastrar o funcionário !");  
      });
    
      
    

   }   
};



const handleInput = (e)=>{  
  switch (e.target.id) {
   case "employee_civil_state":
      setField("employee_civil_state", e.target.value)
      INPUTS.employee_civil_state = e.target.value
     break;
     case "employee_gender":
        setField("employee_gender", e.target.value)
        INPUTS.employee_gender = e.target.value
      break;
      case "employee_religion":
        setField("employee_religion", e.target.value)
        INPUTS.employee_religion = e.target.value
      break;
      case "employee_birthday": 
        setField("employee_birthday", e.target.value); 
        INPUTS.employee_birthday = e.target.value 
      break; 
      case "employee_nacionality":
        setField("employee_nacionality", e.target.value)
        INPUTS.employee_nacionality = e.target.value
      break; 
      case "employee_address":
        setField("employee_address", e.target.value);
        INPUTS.employee_address = e.target.value 
      break; 
      case "employee_gender":
        setField("employee_gender", e.target.value);
        INPUTS.employee_gender = e.target.value 
      break; 
      case "employee_religion":
        setField("employee_religion", e.target.value);
        INPUTS.employee_religion = e.target.value 
      break; 
      case "employee_nif":
        setField("employee_nif", e.target.value);
        INPUTS.employee_nif = e.target.value 
      break; 
      case "employee_phone":
        setField("employee_phone", e.target.value);
        INPUTS.employee_phone = e.target.value; 
      break; 
      case "employee_landline":
        setField("employee_landline", e.target.value);
        INPUTS.employee_landline = e.target.value; 
      break; 
      case "employee_email":
        setField("employee_email", e.target.value);
        INPUTS.employee_email = e.target.value;
      break; 
      case "employee_name":
        setField("employee_name", e.target.value);
        INPUTS.employee_name = e.target.value; 
      break; 
      case "employee_identityCard":
        setField("employee_identityCard", e.target.value);
        INPUTS.employee_identityyCard = e.target.value 
      break; 
      case "employee_charge":
        setToggleJob(Math.floor(e.target.value));
        setField("employee_charge", e.target.value);
        INPUTS.employee_charge = e.target.value  
      break;  
  }
} 
  return (
    <div>
      <Container>
      <Form className='col'  onSubmit={FormSubmit}  method='post' encType='multipart/form-data'>
            <div className="title"><h2>Password</h2></div>
            <div className="description"><p>Por favor digite  a password atual para poder fazer uma modificação.</p></div>
             <Form.Group className="mt-4"  >
                <div className="col-lg-12">
                    <div className="ed-space">
                        <div>
                           <Form.Label> <strong>Password atual</strong> </Form.Label>
                        </div>
                        <div className='col-lg-8'>
                           <Form.Control  onChange={handleInput} className={!!errors.employee_name && 'is-invalid'}  value={form.employee_name} isInvalid={!!errors.employee_name}  type="ntext"   
                           placeholder="" name='employee_name' id="employee_name"  />  
                         <Form.Control.Feedback type='invalid'>{errors.employee_name}</Form.Control.Feedback>
                        </div>
                    </div> 
                </div> 
            </Form.Group>
            <hr />
            <Form.Group className="mt-4"  >
                <div className="col-lg-12">
                    <div className="ed-space">
                        <div>
                           <Form.Label> <strong>Nova password</strong> </Form.Label>
                        </div>
                        <div className='col-lg-8'>
                           <Form.Control  onChange={handleInput} className={!!errors.employee_name && 'is-invalid'}  value={form.employee_name} isInvalid={!!errors.employee_name}  type="ntext"   
                           placeholder="" name='employee_name' id="employee_name"  />  
                          <Form.Control.Feedback type='invalid'>{errors.employee_name}</Form.Control.Feedback>
                        </div>
                    </div> 
                </div> 
            </Form.Group>
            <hr />
            <Form.Group className="mt-4"  >
                <div className="col-lg-12">
                    <div className="ed-space">
                        <div>
                           <Form.Label> <strong>Repetir password</strong> </Form.Label>
                        </div>
                        <div className='col-lg-8'>
                           <Form.Control  onChange={handleInput} className={!!errors.employee_name && 'is-invalid'}  value={form.employee_name} isInvalid={!!errors.employee_name}  type="ntext"   
                           placeholder="" name='employee_name' id="employee_name"  />  
                          <Form.Control.Feedback type='invalid'>{errors.employee_name}</Form.Control.Feedback>
                        </div>
                    </div> 
                </div> 
            </Form.Group>
            <div className="ed-space mt-4">
                 <div></div>
                 <div>
                    <Button className="btn btn-main" type="submit"><Update/>  Atualizar</Button>
                 </div>
            </div>
        </Form>
     </Container>
      <br />
    </div>
  )
}

const Container = styled.div`
    margin:30px 0px;
    background:var(--ed-white);  
    box-shadow:var(--ed-shadow-df); 
    border-radius:6px; 
    padding:20px;  
    
    .title h2{
      font-size:20px;  
      font-weight:bold;
      margin-top:10px;
      margin-bottom:10px;
    }

    .description p{
        font-size:14px;
    }

    hr{
       border-color: var(--ed-silver) !important;
       background: var(--grey) !important;
    }
 
     form{
       width:100%; 
     }

`;

export default TCCD_settings_password
