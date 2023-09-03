import React, {useState} from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Modal, Form, Button} from 'react-bootstrap'
import { Save, Update } from '@mui/icons-material';
import DraggableModal from '../../../General/components/DraggableModal';
import { RichTextEditor } from '../../../General/components/RichTextEditor';
import {toast} from 'react-toastify';
import CRValue from '../../../General/components/CRValue';
import ClearInputs from '../../../General/components/ClearInputs';
import Hoot from '../../../General/components/Hoot';
import axios from 'axios';
import { CoinsDataOptions, GetInstituteCode, ProvidersDataOptions } from '../../../General/components/InstituteData';
import { ImagePreview } from '../elements/ImagePreview';


function NewDriverModal(props) {
    const [show, setShow] = useState(false); 
    const handleClose = () => setShow(false);
    const handleShow = () => {
      setShow(true)
      if(props.update){
         GET_DATA();
      }
    }; 
  
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});
    const [Image, setImage] = useState([]);
    
   
    const INPUTS = {
         driver_address:CRValue("#driver_address"),  
         driver_name:CRValue("#driver_name"),
         driver_neighborhood:CRValue("#driver_neighborhood"), 
         driver_status:CRValue("#driver_status"), 
         driver_city:CRValue("#driver_city"),
         driver_email:CRValue("#driver_email"),  
         driver_nif:CRValue("#driver_nif"),  
         driver_phone:CRValue("#driver_phone"), 
         driver_identification_number:CRValue("#driver_identification_number"),  
         driver_picture:Image,  
         institute_code :GetInstituteCode()
    }; 

    const GetAvatarImage = (e)=>{
      setImage(e);  
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
  
    const FORMURL = [
      Hoot()+'edualltransportdriverregister/post/',
      props.get ? props.get : '',
      props.url ? props.url : ''
    ];
  
    const GET_DATA = async()=>{
      const response = await axios.get(FORMURL[1]); 
      if(response.data.length >= 1){  
        setTimeout(() => {
          document.querySelector("#driver_name").value = response.data[0].ed_driver_name;;
          document.querySelector("#driver_neighborhood").value  = response.data[0].ed_driver_neighborhood; 
          document.querySelector("#driver_status").value = response.data[0].ed_driver_status; 
          document.querySelector("#driver_identification_number").value  = response.data[0].ed_driver_identification_number;
          document.querySelector("#driver_address").value  = response.data[0].ed_driver_address;
  
          INPUTS.driver_name = response.data[0].ed_driver_name;
          INPUTS.driver_neighborhood = response.data[0].ed_driver_neighborhood;
          INPUTS.driver_status = response.data[0].ed_driver_status; 
          INPUTS.driver_identification_number = response.data[0].ed_driver_identification_number;
          INPUTS.driver_address = response.data[0].ed_driver_address;
  
        }, 200); 
      }
    }
  
  
    const validateForm = ()=>{
      const {driver_name, driver_neighborhood, driver_status, driver_city, driver_email, 
      driver_nif, driver_phone, driver_identification_number, driver_address} = form; 
      const NewErrors = {};
  
      if(INPUTS.driver_name ===  "" || INPUTS.driver_name ===  " "){
      if(!driver_name || driver_name === '') NewErrors.driver_name = 'Motorista invalido';  
      }else{if(!driver_name){setField("driver_name", INPUTS.driver_name);}} 
        
      if(INPUTS.driver_phone ===  "" || INPUTS.driver_phone ===  " "){
      if(!driver_phone || driver_phone === '') NewErrors.driver_phone = 'Numéro de telefone invalido';  
      }else{if(!driver_phone){setField("driver_phone", INPUTS.driver_phone);}} 

      if(INPUTS.driver_nif ===  "" || INPUTS.driver_nif ===  " "){
      if(!driver_nif || driver_nif === '') NewErrors.driver_nif = 'Nif invalido';  
      }else{if(!driver_nif){setField("driver_nif", INPUTS.driver_nif);}} 
          
      if(INPUTS.driver_city ===  "" || INPUTS.driver_city ===  " "){
      if(!driver_name || driver_city === '') NewErrors.driver_city = 'Cidade invalida';  
      }else{if(!driver_city){setField("driver_city", INPUTS.driver_city);}} 
          
      if(INPUTS.driver_email ===  "" || INPUTS.driver_email ===  " "){
      if(!driver_email || driver_email === '') NewErrors.driver_email = 'Email invalido';  
      }else{if(!driver_email){setField("driver_email", INPUTS.driver_email);}} 
      
      if(INPUTS.driver_address ===  "" || INPUTS.driver_address ===  " "){
      if(!driver_address || driver_address === '') NewErrors.driver_address = 'Moeda invalido';  
      }else{if(!driver_address){setField("driver_address", INPUTS.driver_address);}} 
   
      if(INPUTS.driver_status ===  "" || INPUTS.driver_status ===  " "){
      if(!driver_status || driver_status === '') NewErrors.driver_status = 'Tipo de Motorista invalido';  
      }else{if(!driver_status){setField("driver_status", INPUTS.driver_status);}} 
   
      if(INPUTS.driver_identification_number ===  "" || INPUTS.driver_identification_number ===  " "){
      if(!driver_identification_number || driver_identification_number === '') NewErrors.driver_identification_number = 'Valor do Motorista invalido';  
      }else{if(!driver_identification_number){setField("driver_identification_number", INPUTS.driver_identification_number);}} 
     
      if(INPUTS.driver_neighborhood ===  "" || INPUTS.driver_neighborhood ===  " "){
      if(!driver_neighborhood || driver_neighborhood === '') NewErrors.driver_neighborhood = 'Fornecedor invalido';  
      }else{if(!driver_neighborhood){setField("driver_neighborhood", INPUTS.driver_neighborhood);}} 
  
      return NewErrors;
  }
  

    const FormSubmit = (e)=>{ 
      console.log(INPUTS);
       e.preventDefault();   
       const formErrors = validateForm();
      if(Object.keys(formErrors).length > 0){
            setErrors(formErrors);
            toast.error("Verifique todos os  campos");    
        }else{  
         
                const formData =  new FormData(); 
                 formData.append("driver_name", INPUTS.driver_name)
                 formData.append("driver_neighborhood",INPUTS.driver_neighborhood)
                 formData.append("driver_status",INPUTS.driver_status) 
                 formData.append("driver_city",INPUTS.driver_city)
                 formData.append("driver_email",INPUTS.driver_email) 
                 formData.append("driver_nif",INPUTS.driver_nif) 
                 formData.append("driver_phone",INPUTS.driver_phone) 
                 formData.append("driver_picture",INPUTS.driver_picture) 
                 formData.append("driver_identification_number",INPUTS.driver_identification_number)
                 formData.append("driver_address",INPUTS.driver_address)
                 formData.append("institute_code",INPUTS.institute_code) 


             if(!props.update){
                axios.post(FORMURL[0], formData)
              .then((e)=>{
                console.log(e)  
                toast.success("Motorista adicionado com sucesso !");
                setForm({});
                /*
                ClearInputs();
                setTimeout(() => { 
                  handleClose();
              }, 1500);
              */
              }).catch((error)=>{
                 console.log(error); 
                toast.error("Lamentamos mas não foi  possivel executar esta ação")}); 
             } else {
              axios.put(FORMURL[2] , formData)
              .then(()=>{  
                toast.success("Motorista atualizado com sucesso !");
                setForm({});
                ClearInputs();
                setTimeout(() => { 
                  handleClose();
              }, 1500);
              }).catch((error)=>{toast.error("Lamentamos mas não foi  possivel executar esta ação")}); 
            }
        }  
    };
  
      
    const handleInput = (e)=>{ 
       switch (e.target.id) { 
          case "driver_name":
            setField("driver_name", e.target.value) 
            INPUTS.driver_name = e.target.value
           break;  
           case "driver_email":
            setField("driver_email", e.target.value) 
            INPUTS.driver_email = e.target.value
           break;  
           case "driver_phone":
            setField("driver_phone", e.target.value) 
            INPUTS.driver_phone = e.target.value
           break;  
           case "driver_city":
            setField("driver_city", e.target.value) 
            INPUTS.driver_city = e.target.value
           break;  
           case "driver_nif":
            setField("driver_nif", e.target.value) 
            INPUTS.driver_nif = e.target.value
           break;   
           case "driver_status":
            setField("driver_status", e.target.value) 
            INPUTS.driver_status = e.target.value
           break;  
           case "driver_neighborhood":
            setField("driver_neighborhood", e.target.value) 
            INPUTS.driver_neighborhood = e.target.value
           break;  
           case "driver_identification_number":
            setField("driver_identification_number", e.target.value) 
            INPUTS.driver_identification_number = e.target.value
           break;  
           case "driver_address":
            setField("driver_address", e.target.value) 
            INPUTS.driver_address = e.target.value
           break;  
       }
    }
  
  
    return (
      <div>
           <div>
     <div onClick={handleShow}>
              {
                props.toggle_btn ? props.toggle_btn : <button className='btn btn-main ml-2'><AddCircleOutlineIcon/> Registrar Motorista</button> 
              }
        </div>
     <Modal size='lg' dialogAs={DraggableModal}  centered  className='animate__animated animate__zoomInDown'  show={show} onHide={handleClose}>
       <Modal.Header closeButton>
         <Modal.Title><h5>{ props.title ? props.title : 'Registrar ' } Motorista</h5></Modal.Title>
       </Modal.Header>
       <Form onSubmit={FormSubmit}>
       <Modal.Body className='scrollLimit'> 
          <div className="ed-flex mb-3">
          <ImagePreview  Picture={GetAvatarImage}  /> 
          <div className="block col">
          <Form.Group className="mb-3 mt-2"  >
             <Form.Label>Nome<span className="text-danger ml-2">*</span> </Form.Label>
             <Form.Control type="text" onChange={handleInput} className={!!errors.driver_name && 'is-invalid'} value={form.driver_name} 
            isInvalid={!!errors.driver_name} id="driver_name"  />
            <Form.Control.Feedback type='invalid'>{errors.driver_name}</Form.Control.Feedback>
           </Form.Group>
           <Form.Group className="mb-3"  >
             <Form.Label>Nº do bilhete de identificação<span className="text-danger ml-2">*</span> </Form.Label>
             <Form.Control type="text" onChange={handleInput} className={!!errors.driver_identification_number && 'is-invalid'} value={form.driver_identification_number} 
             isInvalid={!!errors.driver_identification_number} id="driver_identification_number" />
             <Form.Control.Feedback type='invalid'>{errors.driver_identification_number}</Form.Control.Feedback>
           </Form.Group>  
          </div>
          </div>
          <Form.Group className="mb-3"  >
             <Form.Label>Nif<span className="text-danger ml-2">*</span> </Form.Label>
             <Form.Control onChange={handleInput} className={!!errors.driver_nif && 'is-invalid'} value={form.driver_nif} 
             isInvalid={!!errors.driver_nif} id="driver_nif" />
             <Form.Control.Feedback type='invalid'>{errors.driver_nif}</Form.Control.Feedback>
           </Form.Group>
           <Form.Group className="mb-3">
             <Form.Label>Status <span className="text-danger ml-2">*</span> </Form.Label>
             <Form.Select onChange={handleInput} className={!!errors.driver_status && 'is-invalid'} value={form.driver_status} 
            isInvalid={!!errors.driver_status} id="driver_status" >
                 <option value="0" selected>Activo</option>
                 <option value="1" selected>Inactivo</option>
             </Form.Select> 
             <Form.Control.Feedback type='invalid'>{errors.driver_status}</Form.Control.Feedback>
           </Form.Group>
           <Form.Group className="mb-3"  >
             <Form.Label>Endereço <span className="text-danger ml-2">*</span> </Form.Label>
             <Form.Control onChange={handleInput} className={!!errors.driver_address && 'is-invalid'} value={form.driver_address} 
             isInvalid={!!errors.driver_address} id="driver_address" />
             <Form.Control.Feedback type='invalid'>{errors.driver_address}</Form.Control.Feedback>
           </Form.Group>
            <Form.Group className="mb-3"  >
             <Form.Label>Bairro <span className="text-danger ml-2">*</span> </Form.Label>
             <Form.Control type="text" onChange={handleInput} className={!!errors.driver_neighborhood && 'is-invalid'} value={form.driver_neighborhood} 
            isInvalid={!!errors.driver_neighborhood} id="driver_neighborhood"  />
            <Form.Control.Feedback type='invalid'>{errors.driver_neighborhood}</Form.Control.Feedback>
           </Form.Group>
           <Form.Group className="mb-3"  >
             <Form.Label>Cidade <span className="text-danger ml-2">*</span> </Form.Label>
             <Form.Control type="text" onChange={handleInput} className={!!errors.driver_city && 'is-invalid'} value={form.driver_city} 
            isInvalid={!!errors.driver_city} id="driver_city"  />
            <Form.Control.Feedback type='invalid'>{errors.driver_city}</Form.Control.Feedback>
           </Form.Group>
           <Form.Group className="mb-3"  >
             <Form.Label>E-mail <span className="text-danger ml-2">*</span> </Form.Label>
             <Form.Control type="text" onChange={handleInput} className={!!errors.driver_email && 'is-invalid'} value={form.driver_email} 
            isInvalid={!!errors.driver_email} id="driver_email"  />
            <Form.Control.Feedback type='invalid'>{errors.driver_email}</Form.Control.Feedback>
           </Form.Group>
           <Form.Group className="mb-3"  >
             <Form.Label>Telefone<span className="text-danger ml-2">*</span> </Form.Label>
             <Form.Control type="text" onChange={handleInput} className={!!errors.driver_phone && 'is-invalid'} value={form.driver_phone} 
            isInvalid={!!errors.driver_phone} id="driver_phone"  />
            <Form.Control.Feedback type='invalid'>{errors.driver_phone}</Form.Control.Feedback>
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
      </div>
    )
}

export default NewDriverModal