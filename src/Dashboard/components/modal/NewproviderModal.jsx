import React, {useEffect, useState} from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Modal, Form, Button} from 'react-bootstrap'
import { Save } from '@mui/icons-material';
import DraggableModal from '../../../General/components/DraggableModal'; 
import axios from 'axios';
import Hoot from '../../../General/components/Hoot';
import ClearInputs from '../../../General/components/ClearInputs'; 
import {CourseDataOptions, AcademicYearDataOptions, ClassroomsDataOptions, CicleDataOptions, GetInstituteCode, AcademiclevelDataOptions} from '../../../General/components/InstituteData'; 
import { RichTextEditor } from '../../../General/components/RichTextEditor';
import CRValue from '../../../General/components/CRValue';
import {toast} from 'react-toastify';
import { Update } from '@material-ui/icons';
import CountryOptions from '../../../General/components/CountryOptions';

function NewproviderModal(props) {
    const [show, setShow] = useState(false);
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});
    const Data = [];
    const Periods = ["AM", "PM"];

    const handleClose = () => setShow(false);
    const handleShow = () => {
       setShow(true); 
       GET_DATA();
    };
     
    const INPUTS = {
         provider_name:CRValue("#provider_name"), 
         provider_nif:CRValue("#provider_nif"), 
         provider_phone:CRValue("#provider_phone"), 
         provider_website:CRValue("#provider_website"), 
         provider_address:CRValue("#provider_address"), 
         provider_city:CRValue("#provider_city"), 
         provider_country:CRValue("#provider_country"), 
         provider_email:CRValue("#provider_email"), 
         provider_description: JSON.stringify(CRValue("form .provider-description-input textarea")),
         institute_code:GetInstituteCode()
    }; 

    const FORMURL = [
      Hoot()+"eduallregisterprovider/post/",
      props.get ? props.get : '',
      props.url ? props.url : ''
    ];

    const GET_DATA = async()=>{
     if(props.update){
      const response = await axios.get(FORMURL[1]); 
      if(response.data !=null){
        if(response.data[0] != null){
          document.querySelector("#provider_name").value = response.data[0].ed_provider_title; 
          document.querySelector("#provider_nif").value  = response.data[0].ed_provider_nif; 
          document.querySelector("#provider_phone").value = response.data[0].ed_provider_phone; 
          document.querySelector("#provider_website").value  = response.data[0].ed_provider_website; 
          document.querySelector("#provider_address").value = response.data[0].ed_provider_address; 
          document.querySelector("#provider_city").value  = response.data[0].ed_provider_city; 
          document.querySelector("#provider_country").value = response.data[0].ed_provider_country;  
          document.querySelector("#provider_email").value = response.data[0].ed_provider_email;  
          
          if(document.querySelectorAll(".public-DraftStyleDefault-block").length >= 1){ 
          document.querySelector(".modal form textarea").value =  response.data[0].ed_provider_description;} 

          INPUTS.provider_name = response.data[0].ed_provider_title
          INPUTS.provider_nif = response.data[0].ed_provider_nif
          INPUTS.provider_phone = response.data[0].ed_provider_phone
          INPUTS.provider_website = response.data[0].ed_provider_website
          INPUTS.provider_address = response.data[0].ed_provider_address
          INPUTS.provider_city = response.data[0].ed_provider_city
          INPUTS.provider_country = response.data[0].ed_provider_country
          INPUTS.provider_email = response.data[0].ed_provider_email
          INPUTS.provider_description = response.data[0].provider_description
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
   

    const validateForm = ()=>{
      const {provider_name, provider_nif, provider_country, provider_city, provider_website, provider_phone, provider_address, provider_email} = form; 
      const NewErrors = {};

      if(INPUTS.provider_name ===  "" || INPUTS.provider_name ===  " "){
      if(!provider_name || provider_name === '') NewErrors.provider_name = 'Fornecedor  invalido';  
      }else{if(!provider_name){setField("provider_name", INPUTS.provider_name);}} 

      if(INPUTS.provider_nif ===  "" || INPUTS.provider_nif ===  " "){
      if(!provider_nif || provider_nif === '') NewErrors.provider_nif = 'Nif invalido';  
      }else{if(!provider_nif){setField("provider_nif", INPUTS.provider_nif);}} 

      if(INPUTS.provider_country ===  "" || INPUTS.provider_country ===  " "){
      if(!provider_country || provider_country === '') NewErrors.provider_country = 'País invalido';  
      }else{if(!provider_country){setField("provider_country", INPUTS.provider_country);}} 

      if(INPUTS.provider_city ===  "" || INPUTS.provider_city ===  " "){
      if(!provider_city || provider_city === '') NewErrors.provider_city = 'Cidade invalida';  
      }else{if(!provider_city){setField("provider_city", INPUTS.provider_city);}} 
  
      if(INPUTS.provider_phone ===  "" || INPUTS.provider_phone ===  " "){
      if(!provider_phone || provider_phone === '') NewErrors.provider_phone = 'Telefone invalido';  
      }else{if(!provider_phone){setField("provider_phone", INPUTS.provider_phone);}} 

      if(INPUTS.provider_address ===  "" || INPUTS.provider_address ===  " "){
      if(!provider_address || provider_address === '') NewErrors.provider_address = 'Endereço invalido';  
      }else{if(!provider_address){setField("provider_address", INPUTS.provider_address);}} 

      if(INPUTS.provider_email ===  "" || INPUTS.provider_email ===  " "){
      if(!provider_email || provider_email === '') NewErrors.provider_email = 'Email invalida';  
      }else{if(!provider_address){setField("provider_email", INPUTS.provider_email);}} 
  
      return NewErrors;
  }
  
   const SUBMIT_INPUTS = {provider_name:INPUTS.provider_name, provider_nif:INPUTS.provider_nif, provider_phone:INPUTS.provider_phone , provider_website:INPUTS.provider_website ,
   provider_address:INPUTS.provider_address, provider_city:INPUTS.provider_city , provider_country:INPUTS.provider_country , provider_email:INPUTS.provider_email , 
   provider_description:INPUTS.provider_description, institute_code:INPUTS.institute_code};

    const FormSubmit = (e)=>{  
      console.log(INPUTS);
      e.preventDefault();   
      const formErrors = validateForm();
      if(Object.keys(formErrors).length > 0){
           setErrors(formErrors);
           toast.error("Verifique todos os  campos");   
        }else{
          if(!props.update){
            axios.post(FORMURL[0], SUBMIT_INPUTS).then(()=>{  
              toast.success("Fornecedor  registrada com sucesso !");
              setForm({});
              ClearInputs(); 
            }).catch((error)=>{toast.error("Lamentamos mas não foi  possivel executar esta ação")}); 
          } else {
            axios.put(FORMURL[2] , SUBMIT_INPUTS)
            .then(()=>{  
              toast.success("Fornecedor  atualizada com sucesso !");
              setForm({});
              ClearInputs(); 
            }).catch((error)=>{
                 console.log(error);  
                toast.error("Lamentamos mas não foi  possivel executar esta ação")}); 
          }
        }  
    };

      
    const handleInput = (e)=>{ 
       switch (e.target.id) {
        case "provider_phone":
           INPUTS.provider_phone = e.target.value
           setField("provider_phone", e.target.value);
          break;
          case "provider_name":
            INPUTS.provider_name = e.target.value
            setField("provider_name", e.target.value);
           break; 
           case "provider_nif":
            INPUTS.provider_nif = e.target.value
            setField("provider_nif", e.target.value);
           break;
          case "provider_website":
            INPUTS.provider_website = e.target.value
            setField("provider_website", e.target.value);
          break;
          case "provider_city":
            INPUTS.provider_city = e.target.value
            setField("provider_city", e.target.value);
          break;
          case "provider_address":
            INPUTS.provider_address = e.target.value
            setField("provider_address", e.target.value);
          break;
          case "provider_country":
            INPUTS.provider_country = e.target.value
            setField("provider_country", e.target.value);
          break; 
          case "provider_email":
            INPUTS.provider_email = e.target.value
            setField("provider_email", e.target.value);
          break; 
       }
    }
 
  return (
    <div>  
      <div onClick={handleShow}>
            {
              props.toggle_btn ? props.toggle_btn :   <button className='btn btn-main'><AddCircleOutlineIcon/> Registrar fornecedor</button>  
            }
       </div>
      <Modal className='animate__animated animate__zoomInDown'  centered  size='lg' dialogAs={DraggableModal}  show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><h5>{ props.title ? props.title : 'Registrar ' } Fornecedor </h5></Modal.Title>
        </Modal.Header>
        <Form onSubmit={FormSubmit}> 
        <Modal.Body className='scrollLimit'>
            <Form.Group className="mb-3" >
              <Form.Label>Nome<span className='text-danger ml-2'>*</span></Form.Label>
              <Form.Control onChange={handleInput} className={!!errors.provider_name && 'is-invalid'} value={form.provider_name} isInvalid={!!errors.provider_name}
              type="text" id="provider_name" />
              <Form.Control.Feedback type='invalid'>{errors.provider_name}</Form.Control.Feedback>
            </Form.Group>  
            <Form.Group className="mb-3">
              <Form.Label>Nif<span className='text-danger ml-2'>*</span></Form.Label>
              <Form.Control  onChange={handleInput} className={!!errors.provider_nif && 'is-invalid'} value={form.provider_nif} isInvalid={!!errors.provider_nif}
              type="text" id="provider_nif" />
              <Form.Control.Feedback type='invalid'>{errors.provider_nif}</Form.Control.Feedback>
            </Form.Group>  
            <Form.Group className="mb-3">
              <Form.Label>Telefone<span className='text-danger ml-2'>*</span></Form.Label>
              <Form.Control type="number"  onChange={handleInput} className={!!errors.provider_phone && 'is-invalid'} value={form.provider_phone} isInvalid={!!errors.provider_phone}
              id="provider_phone"/>
              <Form.Control.Feedback type='invalid'>{errors.provider_phone}</Form.Control.Feedback>
            </Form.Group>  
            <Form.Group className="mb-3">
              <Form.Label>Website<span className='text-danger ml-2'></span></Form.Label>
              <Form.Control type="url"  onChange={handleInput} className={!!errors.provider_website && 'is-invalid'} value={form.provider_website} isInvalid={!!errors.provider_website}
              id="provider_website"/> 
              <Form.Control.Feedback type='invalid'>{errors.provider_website}</Form.Control.Feedback>
            </Form.Group>  
            <Form.Group className="mb-3">
              <Form.Label>Endereço<span className='text-danger ml-2'>*</span></Form.Label>
              <Form.Control type="text" onChange={handleInput} className={!!errors.provider_address && 'is-invalid'} value={form.provider_address} isInvalid={!!errors.provider_address}
              id="provider_address"/> 
              <Form.Control.Feedback type='invalid'>{errors.provider_address}</Form.Control.Feedback>
            </Form.Group>  
            <Form.Group className="mb-3">
              <Form.Label>Cidade<span className='text-danger ml-2'>*</span></Form.Label>
              <Form.Control  onChange={handleInput} className={!!errors.provider_city && 'is-invalid'} value={form.provider_city} isInvalid={!!errors.provider_city}
               id="provider_city"/> 
              <Form.Control.Feedback type='invalid'>{errors.provider_city}</Form.Control.Feedback>
            </Form.Group>  
            <Form.Group className="mb-3">
              <Form.Label>País<span className='text-danger ml-2'>*</span></Form.Label>
              <Form.Select  onChange={handleInput} className={!!errors.provider_country && 'is-invalid'} value={form.provider_country} isInvalid={!!errors.provider_country}
               id="provider_country">
                   <CountryOptions/>
              </Form.Select>
              <Form.Control.Feedback type='invalid'>{errors.provider_country}</Form.Control.Feedback>
            </Form.Group>  
            <Form.Group className="mb-3">
              <Form.Label>Email <span className='text-danger ml-2'>*</span></Form.Label>
              <Form.Control type="email"  onChange={handleInput} className={!!errors.provider_email && 'is-invalid'} value={form.provider_email} isInvalid={!!errors.provider_email}
               id="provider_email"/> 
              <Form.Control.Feedback type='invalid'>{errors.provider_email}</Form.Control.Feedback>
            </Form.Group>  
            <Form.Group className="mb-3">
              <Form.Label >Descrição dos serviços fornecidos</Form.Label>
              <div className="provider-description-input">
                   <RichTextEditor/>
              </div>
            </Form.Group>  
        </Modal.Body>
        <Modal.Footer>
          <div className="ed-space">
             <Button className='bg-light text-dark' onClick={handleClose}> Cancelar </Button>
             <Button className="btn btn-main" type="submit">{ props.title ? <Update/> : <Save/>  }   { props.title ? props.title : 'Salvar' } </Button>
          </div>
        </Modal.Footer>
        </Form>
      </Modal>
    </div>
  )
}

export default NewproviderModal