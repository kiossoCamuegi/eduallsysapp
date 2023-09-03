import { Close, Delete, Save, Update, Upload } from '@mui/icons-material';
import axios from 'axios';
import React ,{useEffect, useState} from 'react'
import { Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import styled from 'styled-components'
import CRValue from '../../General/components/CRValue';
import Hoot from '../../General/components/Hoot';
import RandomCodeGenerator from '../../General/components/RandomCodeGenerator';
import { ImagePreview } from '../components/elements/ImagePreview';
import ReactFlagsSelect from "react-flags-select"; 

function About_Institute() { 
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({}); 
  const [Image, setImage] = useState([]);
  const [Logo, setLogo] = useState('');
  const [selectedCountry, setSelectedCountry] = useState("");

  const [imgPreview, setImgPreview] = useState(null);
  const [ImageError, setImageError] = useState(false);

const INPUTS = {
    institute_name:CRValue("#institute_name"),
    institute_principal:CRValue("#institute_principal"), 
    institute_linkedin:CRValue("#institute_linkedin"), 
    institute_facebook:CRValue("#institute_facebook"),  
    institute_instagram:CRValue("#institute_instagram"),
    institute_youtube:CRValue("#institute_youtube"),
    institute_country:selectedCountry,
    institute_address:CRValue("#institute_address"),
    institute_nif:CRValue("#institute_nif"), 
    institute_phone1:CRValue("#institute_phone1"),
    institute_phone2:CRValue("#institute_phone2"),
    institute_website:CRValue("#institute_website"),
    institute_email:CRValue("#institute_email"),
    institute_iva:CRValue("#institute_iva"),
    
    institute_bank1_name:CRValue("#institute_bank1_name"),    
    institute_bank1_account_number:CRValue("#institute_bank1_account_number"),    
    institute_bank1_recipient:CRValue("#institute_bank1_recipient"),     
    institute_bank2_name:CRValue("#institute_bank2_name"),    
    institute_bank2_account_number:CRValue("#institute_bank2_account_number"),    
    institute_bank2_recipient:CRValue("#institute_bank2_recipient"),     
    institute_language:CRValue("#institute_language"), 
    institute_type:CRValue("#institute_type"), 
    institute_logo:Image,   
}; 

const FORMURL = [
  Hoot()+"eduallupdateinstitute/update/",  
  Hoot()+"eduallgetcurentuserinstitute/get/"
];

const GET_DATA = async()=>{
 const response = await axios.get(FORMURL[1]); 
 if(response.data !=null){
   if(response.data[0] != null){ 
    setLogo(Hoot()+response.data[0].ed_institute_logo)
    console.log(response.data[0])

    document.title = response.data[0].ed_institute_name;

     document.querySelector("#institute_name").value = response.data[0].ed_institute_name;  
     INPUTS.institute_name = response.data[0].ed_institute_name 

     document.querySelector("#institute_principal").value = response.data[0].ed_institute_principal;  
     INPUTS.institute_principal = response.data[0].ed_institute_principal 

     document.querySelector("#institute_nif").value = response.data[0].ed_institute_nif;  
     INPUTS.institute_nif = response.data[0].ed_institute_nif 

     document.querySelector("#institute_address").value = response.data[0].ed_institute_address;  
     INPUTS.institute_address = response.data[0].ed_institute_address 

     document.querySelector("#institute_email").value = response.data[0].ed_institute_email;  
     INPUTS.institute_email = response.data[0].ed_institute_email 

     document.querySelector("#institute_phone1").value = response.data[0].ed_institute_phone1;  
     INPUTS.institute_phone1 = response.data[0].ed_institute_phone1 

     document.querySelector("#institute_phone2").value = response.data[0].ed_institute_phone2;  
     INPUTS.institute_phone2 = response.data[0].ed_institute_phone2 

     document.querySelector("#institute_type").value = response.data[0].ed_institute_type;  
     INPUTS.institute_type = response.data[0].ed_institute_type 
     
     document.querySelector("#institute_website").value = response.data[0].ed_institute_website;  
     INPUTS.institute_website = response.data[0].ed_institute_website 
     

     document.querySelector("#institute_bank1_name").value = response.data[0].ed_institute_bank1;  
     INPUTS.institute_bank1_name = response.data[0].ed_institute_bank1; 
          
     document.querySelector("#institute_bank1_account_number").value = response.data[0].ed_institute_bank1_account_number;  
     INPUTS.institute_bank1_account_number = response.data[0].ed_institute_bank1_account_number; 
          
     document.querySelector("#institute_bank1_recipient").value = response.data[0].ed_institute_bank1_recipient;  
     INPUTS.institute_bank1_recipient = response.data[0].ed_institute_bank1_recipient;


     document.querySelector("#institute_iva").value = response.data[0].ed_institute_iva_value;  
     INPUTS.institute_iva = response.data[0].ed_institute_iva_value;           

     document.querySelector("#institute_bank2_name").value = response.data[0].ed_institute_bank2;  
     INPUTS.institute_bank2_name = response.data[0].ed_institute_bank2; 
          
     document.querySelector("#institute_bank2_account_number").value = response.data[0].ed_institute_bank2_account_number;  
     INPUTS.institute_bank2_account_number = response.data[0].ed_institute_bank2_account_number; 
          
     document.querySelector("#institute_bank2_recipient").value = response.data[0].ed_institute_bank2_recipient;  
     INPUTS.institute_bank2_recipient = response.data[0].ed_institute_bank2_recipient; 
 

     INPUTS.institute_country = response.data[0].ed_institute_country 
     setSelectedCountry(response.data[0].ed_institute_country); 
   }
 }
}

useEffect(()=>{
   GET_DATA();
   console.log(Logo)
},[]);

 

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
    const {institute_name, institute_principal, institute_linkedin, institute_facebook,  institute_instagram, 
    institute_iva, institute_country, institute_address, institute_nif, institute_phone1, 
    institute_phone2,  institute_email, institute_bank1,   institute_bank2, institute_bank3, institute_bank4, 
    institute_language,  institute_type,   } = form;
    const NewErrors = {};

    if(INPUTS.institute_name ===  "" || INPUTS.institute_name ===  " "){
    if(!institute_name || institute_name === '') NewErrors.institute_name = 'Nome invalido';  
    }else{if(!institute_name){setField("institute_name", INPUTS.institute_name);}} 

    if(INPUTS.institute_principal ===  "" || INPUTS.institute_principal ===  " "){
    if(!institute_principal || institute_principal === '') NewErrors.institute_principal = 'Nome invalido';  
    }else{if(!institute_principal){setField("institute_principal", INPUTS.institute_principal);}} 

    if(INPUTS.institute_country ===  "" || INPUTS.institute_country ===  " "){
    if(!institute_country || institute_country === '') NewErrors.institute_country = 'País invalido';  
    }else{if(!institute_country){setField("institute_country", INPUTS.institute_country);}} 

    if(INPUTS.institute_nif ===  "" || INPUTS.institute_nif ===  " "){
    if(!institute_nif || institute_nif === '') NewErrors.institute_nif = 'Nif invalido';  
    }else{if(!institute_nif){setField("institute_nif", INPUTS.institute_nif);}} 

    if(INPUTS.institute_address ===  "" || INPUTS.institute_address ===  " "){
    if(!institute_address || institute_address === '') NewErrors.institute_address = 'Endereço invalido';  
    }else{if(!institute_address){setField("institute_address", INPUTS.institute_address);}} 
    
    if(INPUTS.institute_iva ===  "" || INPUTS.institute_iva ===  " "){
      if(!institute_iva || institute_iva === '') NewErrors.institute_iva = 'Iva invalido';  
      }else{if(!institute_iva){setField("institute_iva", INPUTS.institute_iva);}} 

    if(INPUTS.institute_phone1 ===  "" || INPUTS.institute_phone1 ===  " "){
    if(!institute_phone1 || institute_phone1 === '') NewErrors.institute_phone1 = 'Número de telefone invalido';  
    }else{if(!institute_phone1){setField("institute_phone1", INPUTS.institute_phone1);}} 
    
    if(INPUTS.institute_phone2 ===  "" || INPUTS.institute_phone2 ===  " "){
    if(!institute_phone2 || institute_phone2 === '') NewErrors.institute_phone2 = 'Número de telefone invalido';  
    }else{if(!institute_phone2){setField("institute_phone2", INPUTS.institute_phone2);}} 

    if(INPUTS.institute_email ===  "" || INPUTS.institute_email ===  " "){
    if(!institute_email || institute_email === '') NewErrors.institute_email = 'Email invalido';  
    }else{if(!institute_email){setField("institute_email", INPUTS.institute_email);}} 

    if(INPUTS.institute_type ===  "" || INPUTS.institute_type ===  " "){
    if(!institute_type || institute_type === '') NewErrors.institute_type = 'Tipo de instituição invalida';  
    }else{if(!institute_type){setField("institute_type", INPUTS.institute_type);}} 

    if(INPUTS.institute_language ===  "" || INPUTS.institute_language ===  " "){
    if(!institute_language || institute_language === '') NewErrors.institute_language = 'Idioma invalido';  
    }else{if(!institute_language){setField("institute_language", INPUTS.institute_language);}} 

 
 
 return NewErrors;
}


    

const FormSubmit = (e)=>{  
 e.preventDefault();   
 const formErrors = validateForm();
 console.log(formErrors);
 if(Object.keys(formErrors).length > 0){
      setErrors(formErrors);
      toast.error("Verifique todos os  campos");   
   }else{ 
    const SUBMIT_INPUTS = new FormData(); 
    SUBMIT_INPUTS.append("institute_name", INPUTS.institute_name );
    SUBMIT_INPUTS.append("institute_principal", INPUTS.institute_principal);
    SUBMIT_INPUTS.append("institute_linkedin", INPUTS.institute_linkedin); 
    SUBMIT_INPUTS.append("institute_facebook", INPUTS.institute_facebook); 
    SUBMIT_INPUTS.append("institute_instagram", INPUTS.institute_instagram); 
    SUBMIT_INPUTS.append("institute_youtube", INPUTS.institute_youtube);
    SUBMIT_INPUTS.append("institute_country", INPUTS.institute_country); 
    SUBMIT_INPUTS.append("institute_address", INPUTS.institute_address); 
    SUBMIT_INPUTS.append("institute_nif", INPUTS.institute_nif); 
    SUBMIT_INPUTS.append("institute_phone1", INPUTS.institute_phone1); 
    SUBMIT_INPUTS.append("institute_phone2", INPUTS.institute_phone2);
    SUBMIT_INPUTS.append("institute_email", INPUTS.institute_email);  
    SUBMIT_INPUTS.append("institute_website", INPUTS.institute_website);  

    SUBMIT_INPUTS.append("institute_bank1_name", INPUTS.institute_bank1_name);   
    SUBMIT_INPUTS.append("institute_bank1_account_number", INPUTS.institute_bank1_account_number);    
    SUBMIT_INPUTS.append("institute_bank1_recipient", INPUTS.institute_bank1_recipient);
    
    SUBMIT_INPUTS.append("institute_bank2_name", INPUTS.institute_bank2_name);   
    SUBMIT_INPUTS.append("institute_bank2_account_number", INPUTS.institute_bank2_account_number);    
    SUBMIT_INPUTS.append("institute_bank2_recipient", INPUTS.institute_bank2_recipient);

    SUBMIT_INPUTS.append("institute_language", INPUTS.institute_language);
    SUBMIT_INPUTS.append("institute_type", INPUTS.institute_type); 
    SUBMIT_INPUTS.append("institute_iva", INPUTS.institute_iva); 
    SUBMIT_INPUTS.append("institute_logo", INPUTS.institute_logo);
      console.log(INPUTS);
     
       axios.put(FORMURL[0] , SUBMIT_INPUTS)
       .then((e)=>{  
         toast.success("Instituição atualizada com sucesso !");
         console.log(e.data)
         setForm({}); 
       }).catch((error)=>{toast.error("Lamentamos mas não foi  possivel executar esta ação")}); 
     }
  }   



 
 
const handleInput = (e)=>{ 
  switch (e.target.id) {
    case "institute_logo": 
    e.preventDefault();
    const selected = e.target.files[0];
    const allowed_extensions = ["image/png", "image/jpeg", "image/jpg"];
    const StudentPicture = new FormData();

    if(selected && allowed_extensions.includes(selected.type)){
        setImageError(false); 
        let reader = new FileReader();
        reader.onloadend = () =>{
        setImgPreview(reader.result);  
        }; 
        reader.readAsDataURL(selected);
        StudentPicture.append('file', e.target.files[0]);
        setImage(e.target.files[0]);  
    }else{
        setImageError(true); 
        setImage([]); 
    } 
     break;
     case "institute_name":
      INPUTS.institute_name = e.target.value
      setField("institute_name", e.target.value);
     break;
     case "institute_principal":
        INPUTS.institute_principal = e.target.value
        setField("institute_principal", e.target.value);
       break;
       case "institute_linkedin":
        INPUTS.institute_linkedin = e.target.value
        setField("institute_linkedin", e.target.value);
       break;
       case "institute_facebook":
        INPUTS.institute_facebook = e.target.value
        setField("institute_facebook", e.target.value);
       break;
       case "institute_instagram":
        INPUTS.institute_instagram = e.target.value
        setField("institute_instagram", e.target.value);
       break;
       case "institute_youtube":
        INPUTS.institute_youtube = e.target.value
        setField("institute_youtube", e.target.value);
       break; 
       case "institute_address":
        INPUTS.institute_address = e.target.value
        setField("institute_address", e.target.value);
       break;
       case "institute_nif":
        INPUTS.institute_nif = e.target.value
        setField("institute_nif", e.target.value);
       break;
       case "institute_phone1":
        INPUTS.institute_phone1 = e.target.value
        setField("institute_phone1", e.target.value);
       break;
       case "institute_phone2":
        INPUTS.institute_phone2 = e.target.value
        setField("institute_phone2", e.target.value);
       break; 
       case "institute_email":
        INPUTS.institute_email = e.target.value
        setField("institute_email", e.target.value);
       break;
       case "institute_bank1":
        INPUTS.institute_bank1 = e.target.value
        setField("institute_bank1", e.target.value);
       break;
       case "institute_bank2":
        INPUTS.institute_bank2 = e.target.value
        setField("institute_bank2", e.target.value);
       break;
       case "institute_bank3":
        INPUTS.institute_bank3 = e.target.value
        setField("institute_bank3", e.target.value);
       break;
       case "institute_bank4":
        INPUTS.institute_bank4 = e.target.value
        setField("institute_bank4", e.target.value);
       break;
       case "institute_website":
        INPUTS.institute_website = e.target.value
        setField("institute_website", e.target.value);
       break; 
       case "institute_language":
        INPUTS.institute_language = e.target.value
        setField("institute_language", e.target.value);
       break;
       case "institute_type":
        INPUTS.institute_type = e.target.value
        setField("institute_type", e.target.value);
       break; 
       case "institute_bank1_name":
        INPUTS.institute_bank1_name = e.target.value
        setField("institute_bank1_name", e.target.value);
       break;
       case "institute_bank1_account_number":
        INPUTS.institute_bank1_account_number = e.target.value
        setField("institute_bank1_account_number", e.target.value);
       break;
       case "institute_bank1_recipient":
        INPUTS.institute_bank1_recipient = e.target.value
        setField("institute_bank1_recipient", e.target.value);
       break; 
       case "institute_bank2_name":
        INPUTS.institute_bank2_name = e.target.value
        setField("institute_bank2_name", e.target.value);
       break;
       case "institute_iva":
        INPUTS.institute_iva = e.target.value
        setField("institute_iva", e.target.value);
       break;
       case "institute_bank2_account_number":
        INPUTS.institute_bank2_account_number = e.target.value
        setField("institute_bank2_account_number", e.target.value);
       break;
       case "institute_bank2_recipient":
        INPUTS.institute_bank2_recipient = e.target.value
        setField("institute_bank2_recipient", e.target.value);
       break;  
  }
}


const ChangeMode = (e)=>{
    e.preventDefault();
    !editMode ? setEditMode(true) : setEditMode(false); 
}

const SelectCountry = (e)=>{
    setSelectedCountry(e);
    INPUTS.institute_country = e
    setField("institute_country", e);
}

const RemoveImage = ()=>{
  setImgPreview(null)
  setImage([]); 
  setImageError(false); 
}



  return (
    <Form onSubmit={FormSubmit} ><br />
      <div>
       <Container>
        <div className="ed-space">
            <div className="ed-flex"></div>
            <div className="ed-flex"> 
                <button className="btn bg-main">
                     <Update/> Atualizar dados
                </button> 
            </div>
        </div>
          <section className='mb-3'> 
               <ImageLogo>
                     <div className="ed-center">
                      <div>
                           <img loading="lazy" role="presentation"  src={imgPreview ? imgPreview : Logo}  alt="" /> 
                           <div className="ed-flex">
                              <label htmlFor="institute_logo">
                                  <div className='btn bg-main-light'><Upload/></div> 
                              </label>
                              {imgPreview && (
                                  <div className='removeAvatarImage' onClick={RemoveImage}>
                                      <Close />
                                  </div>
                               )}
                           </div>
                          <Form.Control id='institute_logo' onChange={handleInput} type='file' hidden />
                        </div>
                        <div> {ImageError === true ?  <p className='errorMsg text-danger mt-2'> Ficheiro não suportado </p>  : ' '}</div>
                     </div>
                </ImageLogo>  
            <div className="title">
                <h2>Sobre a  minha institituição</h2>
                <hr />
            </div>
           <div className="ed-flex mb-3"> 
                <div className="block">
                <Form.Group className="mb-3" > 
                   <Form.Label>Nome da instituição<span className="text-danger">*</span> </Form.Label>
                    <Form.Control type="text"  onChange={handleInput} className={!!errors.institute_name && 'is-invalid'} value={form.institute_name} 
                    isInvalid={!!errors.institute_name} id="institute_name"  />
                    <Form.Control.Feedback type='invalid'>{errors.institute_name}</Form.Control.Feedback>
                </Form.Group>  
                <Form.Group className="mb-3"  > 
                    <Form.Label>Tipo de instituição<span className="text-danger">*</span> </Form.Label>
                    <Form.Select type="text" onChange={handleInput} className={!!errors.institute_type && 'is-invalid'} value={form.institute_type} 
                    isInvalid={!!errors.institute_type} id="institute_type" >
                        <option value="0">Colégio</option>
                        <option value="1">Escola Publica</option>
                        <option value="2">Faculdade</option>
                        <option value="4">Academía</option>
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>{errors.institute_type}</Form.Control.Feedback>
                </Form.Group> 
                </div> 
           </div>  
           <Form.Group className="mb-3" > 
                <Form.Label>Número de identificação fiscal<span className="text-danger ml-2">*</span></Form.Label>
                <Form.Control type="text"  onChange={handleInput} className={!!errors.institute_nif && 'is-invalid'} value={form.institute_nif} 
                isInvalid={!!errors.institute_nif} id="institute_nif"  />
                <Form.Control.Feedback type='invalid'>{errors.institute_nif}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3"  > 
                <Form.Label>Nome do Director<span className="text-danger ml-2">*</span></Form.Label>
                <Form.Control type="text"   onChange={handleInput} className={!!errors.institute_principal && 'is-invalid'} value={form.institute_principal} 
                isInvalid={!!errors.institute_principal} id="institute_principal"  />
                <Form.Control.Feedback type='invalid'>{errors.institute_principal}</Form.Control.Feedback>
            </Form.Group> 
            <Form.Group className="mb-3"  > 
                <Form.Label>IVA<span className="text-danger ml-2">*</span></Form.Label>
                <Form.Control type="number"   onChange={handleInput} className={!!errors.institute_iva && 'is-invalid'} value={form.institute_iva} 
                isInvalid={!!errors.institute_iva} id="institute_iva"  />
                <Form.Control.Feedback type='invalid'>{errors.institute_iva}</Form.Control.Feedback>
            </Form.Group> 
          </section>
            <section>
            <div className="title">
                <h2>Informações de contacto</h2>
                <hr />
            </div>
            <div className="ed-block">
              <div className="ed-flex">
                <Form.Group className="mb-3" > 
                   <Form.Label>País<span className="text-danger">*</span> </Form.Label>
                      <ReactFlagsSelect selected={selectedCountry} onSelect={(code) => SelectCountry(code)}/>
                    <Form.Control.Feedback type='invalid'>{errors.institute_country}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3"  > 
                    <Form.Label>Endereço<span className="text-danger ml-2">*</span> </Form.Label>
                    <Form.Control type="text"   onChange={handleInput} className={!!errors.institute_address && 'is-invalid'} value={form.institute_address} 
                    isInvalid={!!errors.institute_address} id="institute_address"  />
                    <Form.Control.Feedback type='invalid'>{errors.institute_address}</Form.Control.Feedback>
                </Form.Group> 
                </div> 
                <div className="ed-flex"> 
                <Form.Group className="mb-3"  > 
                    <Form.Label>Telefone 1<span className="text-danger ml-2">*</span> </Form.Label>
                    <Form.Control type="tel"   onChange={handleInput} className={!!errors.institute_phone1 && 'is-invalid'} value={form.institute_phone1} 
                    isInvalid={!!errors.institute_phone1 } id="institute_phone1"  />
                    <Form.Control.Feedback type='invalid'>{errors.institute_phone1}</Form.Control.Feedback>
                </Form.Group> 
                <Form.Group className="mb-3" > 
                   <Form.Label>Telefone 2<span className="text-danger">*</span> </Form.Label>
                    <Form.Control type="text"   onChange={handleInput} className={!!errors.institute_phone2 && 'is-invalid'} value={form.institute_phone2} 
                    isInvalid={!!errors.institute_phone2} id="institute_phone2"  />
                    <Form.Control.Feedback type='invalid'>{errors.institute_phone2}</Form.Control.Feedback>
                </Form.Group>
                </div>
                <div className="ed-flex">
                <Form.Group className="mb-3" > 
                   <Form.Label>Email<span className="text-danger">*</span> </Form.Label>
                    <Form.Control type="email"   onChange={handleInput} className={!!errors.institute_email && 'is-invalid'} value={form.institute_email} 
                    isInvalid={!!errors.institute_email} id="institute_email"  />
                    <Form.Control.Feedback type='invalid'>{errors.institute_email}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3"  > 
                    <Form.Label>Website<span className="text-danger ml-2">*</span> </Form.Label>
                    <Form.Control type="text"   onChange={handleInput} className={!!errors.institute_website && 'is-invalid'} value={form.institute_website} 
                    isInvalid={!!errors.institute_website} id="institute_website"  />
                    <Form.Control.Feedback type='invalid'>{errors.institute_website}</Form.Control.Feedback>
                </Form.Group> 
                </div>
                <div className="mt-2">
                <Form.Group className="mb-3" > 
                   <Form.Label>Idioma<span className="text-danger">*</span> </Form.Label>
                   <Form.Select type="text" onChange={handleInput} className={!!errors.institute_language && 'is-invalid'} 
                   value={form.institute_language}  isInvalid={!!errors.institute_language} id="institute_language">
                        <option value="1">Portugues</option>
                    </Form.Select>  
                    <Form.Control.Feedback type='invalid'>{errors.institute_language}</Form.Control.Feedback>
                </Form.Group>
                </div>
              </div>  
            </section> 
            <section>
            <div className="title">
                <h2>Cordenadas Bancarias</h2>
                <hr />
            </div>
            <div className="ed-block"> 
                <div className="ed-flex">
                  <Form.Group className="mb-3" > 
                    <Form.Label>Nome do banco (1º) </Form.Label>
                      <Form.Control type="text"   onChange={handleInput} className={!!errors.institute_bank1_name && 'is-invalid'} value={form.institute_bank1_name} 
                      isInvalid={!!errors.institute_bank1_name} id="institute_bank1_name"  />
                      <Form.Control.Feedback type='invalid'>{errors.institute_bank1_name}</Form.Control.Feedback>
                  </Form.Group>
                  <div className="pd-1"></div>
                  <Form.Group className="mb-3"  > 
                      <Form.Label>Nº de Conta / IBAN   </Form.Label>
                      <Form.Control type="text"   onChange={handleInput} className={!!errors.institute_bank1_account_number && 'is-invalid'} value={form.institute_bank1_account_number} 
                      isInvalid={!!errors.institute_bank1_account_number} id="institute_bank1_account_number"  />
                      <Form.Control.Feedback type='invalid'>{errors.institute_bank1_account_number}</Form.Control.Feedback>
                  </Form.Group> 
                  <div className="pd-1"></div>
                  <Form.Group className="mb-3"  > 
                      <Form.Label>Beneficiario  </Form.Label>
                      <Form.Control type="text"   onChange={handleInput} className={!!errors.institute_bank1_recipient && 'is-invalid'} value={form.institute_bank1_recipient} 
                      isInvalid={!!errors.institute_bank1_recipient} id="institute_bank1_recipient"  />
                      <Form.Control.Feedback type='invalid'>{errors.institute_bank1_recipient}</Form.Control.Feedback>
                  </Form.Group> 
                </div>
              </div>   
              <div className="ed-block"> 
                <div className="ed-flex">
                  <Form.Group className="mb-3" > 
                    <Form.Label>Nome do banco (2º)</Form.Label>
                      <Form.Control type="text"   onChange={handleInput} className={!!errors.institute_bank2_name && 'is-invalid'} value={form.institute_bank2_name} 
                      isInvalid={!!errors.institute_bank2_name} id="institute_bank2_name"  />
                      <Form.Control.Feedback type='invalid'>{errors.institute_bank2_name}</Form.Control.Feedback>
                  </Form.Group>
                  <div className="pd-1"></div>
                  <Form.Group className="mb-3"  > 
                      <Form.Label>Nº de Conta / IBAN   </Form.Label>
                      <Form.Control type="text"   onChange={handleInput} className={!!errors.institute_bank2_account_number && 'is-invalid'} value={form.institute_bank2_account_number} 
                      isInvalid={!!errors.institute_bank2_account_number} id="institute_bank2_account_number"  />
                      <Form.Control.Feedback type='invalid'>{errors.institute_bank2_account_number}</Form.Control.Feedback>
                  </Form.Group> 
                  <div className="pd-1"></div>
                  <Form.Group className="mb-3"  > 
                      <Form.Label>Beneficiario  </Form.Label>
                      <Form.Control type="text"   onChange={handleInput} className={!!errors.institute_bank2_recipient && 'is-invalid'} value={form.institute_bank2_recipient} 
                      isInvalid={!!errors.institute_bank2_recipient} id="institute_bank2_recipient"  />
                      <Form.Control.Feedback type='invalid'>{errors.institute_bank2_recipient}</Form.Control.Feedback>
                  </Form.Group> 
                </div>
              </div>   
            </section> 
       </Container>
      </div>
      <br />
    </Form>
  )
}


const Container = styled.div`
    width:100%; 
    border-radius:6px;
    margin-bottom:20px;  
    padding:20px;
    min-height:200px;
    background:var(--ed-white);  
    box-shadow:var(--ed-shadow-df); 

    .title{
        margin:20px 0px;

         h2{
            font-size:18px;
            font-weight:550; 
         }

         hr{
              border-color:silver;
         }
    }

    
    .block{
        width:100%; 
    }

   .logo-image{
        width:200px;
        min-width:200px;
        height:160px;
        border:1px solid var(--ed-white-smoke);
        border-radius:6px;
    }

    section .ed-block .ed-flex{
        width:100%;
        justify-content:space-around;
        
         .mb-3{
             width:48.5%;

             input, select{
                width:100%;
             }
        }
    }

`;

const ImageLogo = styled.div`
  padding:10px; 
  width:100%;

   div{
      display:flex;
      align-items:center;

      .removeAvatarImage{  
        width:30px;
        height:30px;
        background:var(--ed-red);
        border-radius:100%;
        cursor:pointer;
        display:flex;
        align-items:center;
        justify-content:center; 
        box-shadow:var(--ed-shadow-df);
        margin-left:10px;
    
        svg{
            width:15px;
            margin:0;
            height:15px;
            fill:var(--ed-white);
        }
    } 


      .btn{
          width:30px;
          height:30px;
          border-radius:100%;
          display:flex;
          align-items:center;
          justify-content:center; 
          margin-left:20px;

            svg{
                width:15px;
                height:15px;
                fill:var(--ed-white);
                margin:0px !important;
            }
      }

      img{
        max-width:350px;
        max-height:250px;
        min-width:100px;
        min-height:100px;; 
      }
   }
`;

export default About_Institute