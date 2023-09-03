import React, { useRef, useState } from 'react'
import { Form } from 'react-bootstrap' 
import styled from 'styled-components' 
import { Link, useLocation } from 'react-router-dom'; 
import  {Save , Delete, Send, BallotOutlined, SummarizeOutlined} from '@mui/icons-material';
import { Alert } from 'bootstrap';
import {ImagePreview} from '../components/elements/ImagePreview';
import BuildDataHistory from '../components/elements/BuildDataHistory';
import FileUpload from '../../General/components/FileUpload';
import CRValue from '../../General/components/CRValue';
import ClearInputs from '../../General/components/ClearInputs';
import Hoot from '../../General/components/Hoot';
import axios from 'axios';
import { RichTextEditor } from '../../General/components/RichTextEditor';
import {toast} from 'react-toastify';
import { GetInstituteCode, JobTitlesDataOptions, SubjectDataOptions, SubjectMultipleSelect } from '../../General/components/InstituteData';
import { MultiSelect } from 'react-multi-select-component';
import { Update } from '@material-ui/icons';
import NoFoundedImage from '../../Assets/images/404_main.svg';
import { useEffect } from 'react';

function NewEmployee() {

  const searchEmployeeId = useLocation().search;
  const EmployeeId = new URLSearchParams(searchEmployeeId).get('employee_id');

 
 
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
 const ChildRef = useRef();
 const ChildRef2 = useRef();

 const randomCode = ()=>{
    let res = "";
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 400; i++) {
        res += characters.charAt(Math.floor(Math.random() *  characters.length));
    }
    return res;
 }

const INPUTS = { 
    employee_code:randomCode(),
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
    institute_code:GetInstituteCode(), 
    employee_naturalness:CRValue("#employee_naturalness")
}



 
const GET_DATA = async()=>{
  if (EmployeeId !== null){
    const response = await axios.get(FORMURL[1]+`${EmployeeId}`); 
    if(response.data !=null){
      if(response.data[0] != null){
        
        /*
          document.querySelector("#title").value = response.data[0].ed_cicle_title;  
          INPUTS.code = response.data[0].ed_cicle_code;
        */
  
          SetEmployeeFounded(true);
      }
    } 
  }
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
    employee_email, employee_naturalness, employee_civil_state,  employee_identityCard, employee_charge , employee_nif, employee_status} = form; 
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

    if(INPUTS.employee_naturalness ===  "" || INPUTS.employee_naturalness ===  " "){
    if(!employee_naturalness || employee_naturalness === '') NewErrors.employee_naturalness = 'Preencha o campo corretamente';  
    }else{if(!employee_naturalness){setField("employee_naturalness", INPUTS.employee_naturalness);}}

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
      formData.append("employee_naturalness",INPUTS.employee_naturalness);
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



      const UploadFiles = ()=>{
        INPUTS.employee_files = Files.length >= 1 ? INPUTS.employee_files[0] :  [];  
        if (Files.length >= 1){
             for(let i = 0; i < INPUTS.employee_files.length; i++) {
                const file = INPUTS.employee_files[i];   
                const fileData = new FormData();
                let extension = "pdf" //file.type.split("/")[1] !== "" ? file.type.split("/")[1] : undefined;
                fileData.append("file_name", file);
                fileData.append("file_code",INPUTS.student_code);
                fileData.append("file_size",file.size);
                fileData.append("file_type",file.type);
                fileData.append("file_use", "employee_register");
                fileData.append("file_extension", extension);
                fileData.append("institute_code",INPUTS.employee_code); 
                  
                axios.post(FORMURL[1] , fileData)
                .then((e)=>{   
                  console.log(e.data) 
                   if(i === (INPUTS.employee_files.length -1)); 
                }).catch((error)=>{
                  toast.error(error);   
                }); 
             }   
        } 
      }
  
     
      axios.post(FORMURL[0] , formData).then((e)=>{  
        console.log(e.data);
        UploadFiles(); 
        toast.success("Funcionario cadastrado com sucesso !");  
        
       
       setTimeout(() =>{ 
          setForm({}); 
          ClearInputs();
          ChildRef.current.RemoveImage();  
          ChildRef2.current.ClearFiles();  
       }, 1000); 
      
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
      case "employee_naturalness":
        setField("employee_naturalness", e.target.value)
        INPUTS.employee_naturalness = e.target.value
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
      default:
  }
} 

  
 
      return (
        <>
        <Form onSubmit={FormSubmit}  method='post' encType='multipart/form-data'>
          <div className="box-register">
          <div className="ed-space mb-4">
              <div className="ed-flex">
                  <button className="btn bg-danger" type='reset' id='clearForm'>
                      <Delete/>  Limpar
                  </button>
                  <button className="btn ml-2 bg-green-light" type="submit">
                  {EmployeeId !== null ? <Update /> : <Save/>  }   { EmployeeId !== null ?  ' Atualizar' : 'Salvar' }
                  </button> 
              </div>
              <div className="ed-flex">
                  <Link className='btn bg-green-light' to='#'>
                      <BallotOutlined/>
                  </Link>
                  <Link to='/employees' className='btn ml-2 btn-main'>
                      <SummarizeOutlined/> Lista de funcionarios
                  </Link>
              </div>
          </div> 
          <BoxContainer className='boxItem'>
            <div className="ed-space mb-4">
                <div><h2 className="title" style={{marginBottom:'0px'}}>{EmployeeId !== null ? 'Atualizar ' : 'Registrar'} funcionario </h2></div>
                  <BuildDataHistory/>
            </div>
                <FlexBox>
                    <ImagePreview Picture={GetAvatarImage} ref={ChildRef} />
                  <div>
                  
                  </div>
                  <div className="box">
                  <Form.Group className="mt-2"  >
                      <div className="col-12">
                          <Form.Label>Nome completo <span className="text-danger ml-2">*</span> </Form.Label>
                          <Form.Control  onChange={handleInput} className={!!errors.employee_name && 'is-invalid'}  value={form.employee_name} isInvalid={!!errors.employee_name}  type="ntext"   
                            placeholder="" name='employee_name' id="employee_name"  /> 
                            <Form.Control.Feedback type='invalid'>{errors.employee_name}</Form.Control.Feedback>
                      </div>
                      <div className="mb-3 mt-4">
                          <div className="block">
                              <Form.Label>Nº do Bilhete de identifcação (BI) <span className="text-danger ml-2">*</span></Form.Label>
                              <Form.Control className={!!errors.employee_identityCard && 'is-invalid'}  onChange={handleInput} value={form.employee_identityCard} isInvalid={!!errors.employee_identityCard}   type="text"   
                              placeholder="" name='employee_identityCard' id="employee_identityCard"  /> 
                              <Form.Control.Feedback type='invalid'>{errors.employee_identityCard}</Form.Control.Feedback>
                          </div> 
                      </div>
                  </Form.Group> 
                  </div>
                </FlexBox> 
                <Form.Group> 
                    <div className="ed-flex col-ip-3 col-12 mt-4">
                          <div className="block">
                              <Form.Label>Nacionalidade <span className="text-danger ml-2">*</span></Form.Label>
                              <Form.Select  onChange={handleInput} className={!!errors.employee_nacionality && 'is-invalid'} value={form.employee_nacionality} isInvalid={!!errors.employee_nacionality}
                                  placeholder="" name='employee_nacionality' id="employee_nacionality"  >
                                    <option value="2" selected>Angolana</option>
                                    <option value="3">Brazileiro</option>
                              </Form.Select>
                              <Form.Control.Feedback type='invalid'>{errors.employee_nacionality}</Form.Control.Feedback>
                          </div>
                          <div className="block ml-2">
                              <Form.Label>Morada <span className="text-danger ml-2">*</span></Form.Label>
                              <Form.Control  onChange={handleInput} className={!!errors.employee_address && 'is-invalid'}  value={form.employee_address} isInvalid={!!errors.employee_address}
                                type="text"  placeholder="" name='employee_address' id="employee_address"  /> 
                                <Form.Control.Feedback type='invalid'>{errors.employee_address}</Form.Control.Feedback>
                          </div>
                          <div className="block ml-2">
                              <Form.Label>Genero <span className="text-danger ml-2">*</span></Form.Label>
                              <Form.Select  onChange={handleInput} className={!!errors.employee_gender && 'is-invalid'}  value={form.employee_gender} isInvalid={!!errors.employee_gender}
                                    placeholder="" name='employee_gender' id="employee_gender"  >
                                    <option value="male" selected>Masculino</option>
                                    <option value="female">Femenino</option>
                              </Form.Select> 
                              <Form.Control.Feedback type='invalid'>{errors.employee_gender}</Form.Control.Feedback>
                          </div>
                      </div>
                </Form.Group>
                <Form.Group>
                  <div className="ed-flex col-ip-3 col-12 mt-4">
                        <div className="block">
                            <Form.Label>Naturalidade <span className="text-danger ml-2">*</span></Form.Label>
                              <Form.Control  onChange={handleInput} className={!!errors.employee_naturalness && 'is-invalid'}  value={form.employee_naturalness} isInvalid={!!errors.employee_naturalness} 
                                select name='employee_naturalness' id="employee_naturalness" />
                              <Form.Control.Feedback type='invalid'>{errors.employee_naturalness}</Form.Control.Feedback>
                        </div>
                        <div className="block ml-2">
                              <Form.Label>Estado civil <span className="text-danger ml-2">*</span></Form.Label>
                              <Form.Select  onChange={handleInput} className={!!errors.employee_civil_state && 'is-invalid'}  value={form.employee_civil_state} isInvalid={!!errors.employee_civil_state} 
                                select name='employee_civil_state' id="employee_civil_state" >
                                    <option value="0">Solteiro / a</option>
                                    <option value="1">Noivo /  a</option>
                                    <option value="2">Casado / a</option>
                              </Form.Select> 
                              <Form.Control.Feedback type='invalid'>{errors.employee_civil_state}</Form.Control.Feedback>
                        </div>
                        <div className="block ml-2">
                              <Form.Label>Telefone Fixo <span className="text-danger ml-2">*</span></Form.Label>
                              <Form.Control  onChange={handleInput} className={!!errors.employee_landline && 'is-invalid'}  value={form.employee_landline} isInvalid={!!errors.employee_landline} 
                                select name='employee_landline' id="employee_landline" />  
                              <Form.Control.Feedback type='invalid'>{errors.employee_landline}</Form.Control.Feedback>
                          </div>      
                    </div>
                </Form.Group>
                <Form.Group> 
                    <div className="ed-flex col-ip-3 col-12 mt-4">
                          <div className="block">
                              <Form.Label>Religião <span className="text-danger ml-2">*</span></Form.Label>
                              <Form.Select  onChange={handleInput} className={!!errors.employee_religion && 'is-invalid'}  value={form.employee_religion} isInvalid={!!errors.employee_religion}
                                name='employee_religion' id="employee_religion" >
                                <option value="Ateísmo/Agnosticismo">Ateísmo/Agnosticismo</option>
                                <option value="Bahá'í">Bahá'í</option>
                                <option value="budismo">budismo</option>
                                <option value="cristianismo" selected>cristianismo</option>
                                <option value="confucionismo">confucionismo</option>
                                <option value="Drusos">Drusos</option>
                                <option value="Hinduísmo">Hinduísmo</option>
                                <option value="Gnosticismo">Gnosticismo</option>
                                <option value="Hinduísmo">Hinduísmo</option>
                                <option value="islamismo">islamismo</option>
                                <option value="Jainismo">Jainismo</option>
                                <option value="judaísmo">judaísmo</option>
                                <option value="Rastafarianismo">Rastafarianismo</option>
                                <option value="xintoísmo">xintoísmo</option>
                                <option value="Sikhismo">Sikhismo</option>
                                <option value="Zoroastrismo">Zoroastrismo</option>
                                <option value="Religiões Tradicionais Africanas">Religiões Tradicionais Africanas</option>
                                <option value="Religiões da diáspora africana">Religiões da diáspora africana</option>
                                <option value="Religiões indígenas americanas">Religiões indígenas americanas</option> 
                                <option value="outro">Outro</option> 
                              </Form.Select> 
                              <Form.Control.Feedback type='invalid'>{errors.employee_religion}</Form.Control.Feedback>
                          </div>
                          <div className="block ml-2">
                              <Form.Label>Data de aniversario <span className="text-danger ml-2">*</span></Form.Label>
                              <Form.Control className={!!errors.employee_birthday && 'is-invalid'}  onChange={handleInput}   value={form.employee_birthday} isInvalid={!!errors.employee_birthday}
                                type="date"  name='employee_birthday' id="employee_birthday"  /> 
                              <Form.Control.Feedback type='invalid'>{errors.employee_birthday}</Form.Control.Feedback>
                          </div>
                          <div className="block ml-2">
                              <Form.Label>Telefone <span className="text-danger ml-2">*</span></Form.Label>
                              <Form.Control  onChange={handleInput} className={!!errors.employee_phone && 'is-invalid'}  type="number" value={form.employee_phone} isInvalid={!!errors.employee_phone}
                                placeholder="" name='employee_phone' id="employee_phone"  /> 
                              <Form.Control.Feedback type='invalid'>{errors.employee_phone}</Form.Control.Feedback>
                          </div>
                      </div>
                        <div className="ed-flex col-12 mt-4 col-ip-2">
                          <div className="block">
                              <Form.Label>Email <span className="text-danger ml-2">*</span></Form.Label>
                              <Form.Control  onChange={handleInput} className={!!errors.employee_email && 'is-invalid'} value={form.employee_email} isInvalid={!!errors.employee_email}
                                type="email"  name='employee_email' id="employee_email"   placeholder="" />
                              <Form.Control.Feedback type='invalid'>{errors.employee_email}</Form.Control.Feedback>
                          </div>
                          <div className="block ml-2">
                              <Form.Label>Nif <span className="text-danger ml-2">*</span></Form.Label>
                              <Form.Control  onChange={handleInput} className={!!errors.employee_nif && 'is-invalid'} value={form.employee_nif} isInvalid={!!errors.employee_nif}
                                type="text"  name='employee_nif' id="employee_nif"   placeholder="" />
                              <Form.Control.Feedback type='invalid'>{errors.employee_nif}</Form.Control.Feedback>
                          </div>
                        </div>
                </Form.Group>
          </BoxContainer>
          <br />
          <BoxContainer className='boxItem'>
            <h2 className="title">Informações institucionais</h2>
                <Form.Group>  
                    <div className="ed-flex col-ip-2 col-12 mt-4">
                          <div className="block">
                              <Form.Label>Cargo <span className="text-danger ml-2">*</span></Form.Label>
                              <Form.Select  onChange={handleInput} className={!!errors.employee_charge && 'is-invalid custom-select'}  value={form.employee_charge} isInvalid={!!errors.employee_charge}  
                                  select name='employee_charge' id="employee_charge"  > 
                                    <JobTitlesDataOptions />
                              </Form.Select> 
                              <Form.Control.Feedback type='invalid'>{errors.employee_charge}</Form.Control.Feedback>
                          </div> 
                          <div className="block ml-2">
                              <Form.Label>Estado do funcionario na instituição <span className="text-danger ml-2">*</span></Form.Label>
                              <Form.Select  onChange={handleInput}  value={form.employee_status} className={!!errors.employee_status && 'is-invalid'}  isInvalid={!!errors.employee_status} 
                              select name='employee_status' id="employee_status"  >
                                  <option value="1" selected>Activo</option>
                                  <option value="0">Inactivo</option>
                              </Form.Select>  
                              <Form.Control.Feedback type='invalid'>{errors.employee_status}</Form.Control.Feedback>
                          </div>
                      </div>
                      <div className={ToggleJob === 0 ? "col-12 mt-4"  : "d-none"}>
                      <div className="block">
                            <Form.Label>Disciplinas</Form.Label>
                              <MultiSelect 
                                  options={SubjectMultipleSelect()[0]}
                                  value={Select}
                                  onChange={SelectedSubjects}
                                  labelledBy='select'
                              />
                              <Form.Control.Feedback type='invalid'>{errors.employee_subjects}</Form.Control.Feedback>
                          </div>
                      </div>
                </Form.Group>  
          </BoxContainer> 
          <br /> 
          </div> 
          <BoxContainer className='boxItem'>
              <h2 className="title">Carregar documentos</h2> 
              <FileUpload input_name="employee_files" Icon="0"  type_of_files="application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/pdf"
              extensions="pdf, docx" Files={GetFiles} ref={ChildRef2}  />
          </BoxContainer> 
          <div className="mt-2 d-none">
          <BoxContainer className='boxItem'>
              <div className="Camera">
    
              </div>
          </BoxContainer>
          </div>
        </Form>
        </>
      )
  



}

const NotFounded = styled.div`
     width:100%;
     height:85vh; 
     display:flex;
     align-items:center;
     justify-content:center;

        img{
          max-width:600px;
        }
`;


const BoxContainer = styled.div` 
    width:100%; 
    border-radius:6px;
    margin-bottom:20px;  
    padding:20px;
    min-height:200px;
    background:var(--ed-white);  
    box-shadow:var(--ed-shadow-df); 


    .Camera{
        min-height:80vh; 
        border:2px dashed var(--purple-light);
    }


    .title{
        font-size:18px;  
        font-weight:600;
        margin-top:10px;
        margin-bottom:25px;
    }

    .col-ip-3{
        width:100%;

        .block{
            width:33.3%;
        }
    }

    .col-ip-2{
       width:100%;

       .block{
          width:49.39%;
       }
    }

    .box{ 
        width:100%;
        display:flex;
        flex-direction:column;

        .fill{
            width:100%;
            display:flex;

            .block{
                width:50%;
            }
        }
    }
`;

const FlexBox = styled.div`
   margin:10px 0;
   display:flex;
   } 
`;

export default NewEmployee