
import React, {useEffect, useState} from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Modal, Form, Button} from 'react-bootstrap'
import { Save } from '@mui/icons-material';
import DraggableModal from '../../../General/components/DraggableModal'; 
import axios from 'axios';
import Hoot from '../../../General/components/Hoot';
import ClearInputs from '../../../General/components/ClearInputs'; 
import {GetInstituteCode} from '../../../General/components/InstituteData'; 
import CRValue from '../../../General/components/CRValue';
import {toast} from 'react-toastify';
import { Update } from '@material-ui/icons';

function NewPublisherModal(props) {
    const [show, setShow] = useState(false);
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});  

    const handleClose = () => setShow(false);
    const handleShow = () => {
       setShow(true); 
       GET_DATA();
    };
     
    const INPUTS = {
         publisher_name:CRValue("#publisher_name"),  
         publisher_status:CRValue("#publisher_status"),  
         institute_code:GetInstituteCode()
    }; 

    const FORMURL = [
      Hoot()+"edualllibrarypublisherregister/post",
      props.get ? props.get : '',
      props.url ? props.url : ''
    ];

    const GET_DATA = async()=>{
    if(props.update){
      const response = await axios.get(FORMURL[1]); 
      if(response.data !=null){
        if(response.data[0] != null){
          document.querySelector("#publisher_name").value = response.data[0].ed_library_publisher_name;  
          document.querySelector("#publisher_status").value = response.data[0].ed_library_publisher_status;  

          INPUTS.publisher_name = response.data[0].ed_library_publisher_name; 
          INPUTS.publisher_status = response.data[0].ed_library_publisher_status; 
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
      const {publisher_name, publisher_status} = form; 
      const NewErrors = {};

      if(INPUTS.publisher_name ===  "" || INPUTS.publisher_name ===  " "){
      if(!publisher_name || publisher_name === '') NewErrors.publisher_name = 'Editora invalida';  
      }else{if(!publisher_name){setField("publisher_name", INPUTS.publisher_name);}} 

      if(INPUTS.publisher_status ===  "" || INPUTS.publisher_status ===  " "){
      if(!publisher_status || publisher_status === '') NewErrors.publisher_status = 'Estado invalido';  
      }else{if(!publisher_status){setField("publisher_status", INPUTS.publisher_status);}} 
  
      return NewErrors;
  }
  
   const SUBMIT_INPUTS = {publisher_name:INPUTS.publisher_name, publisher_status:INPUTS.publisher_status };

    const FormSubmit = (e)=>{  
      e.preventDefault();   
      const formErrors = validateForm();
      if(Object.keys(formErrors).length > 0){
           setErrors(formErrors);
           toast.error("Verifique todos os  campos");   
        }else{
          if(!props.update){
            axios.post(FORMURL[0], SUBMIT_INPUTS).then(()=>{  
              toast.success("Editora registrado com sucesso !");
              setForm({});
              ClearInputs();
              setTimeout(() => { 
                handleClose();
            }, 1500); 
            }).catch((error)=>{toast.error("Lamentamos mas não foi  possivel executar esta ação")}); 
          } else {
            axios.put(FORMURL[2] , SUBMIT_INPUTS)
            .then(()=>{  
              toast.success("Editora atualizado com sucesso !");
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
          case "publisher_name":
            INPUTS.publisher_name = e.target.value
            setField("publisher_name", e.target.value);
           break; 
            case "publisher_status":
            INPUTS.publisher_status = e.target.value
            setField("publisher_status", e.target.value);
          break;
       }
    }
 


  return (
    <div>  
      <div onClick={handleShow}>
            {
              props.toggle_btn ? props.toggle_btn :   <button className='btn btn-main'><AddCircleOutlineIcon/> Registrar Editora</button>  
            }
       </div>
      <Modal className='animate__animated animate__zoomInDown'  centered  size='lg' dialogAs={DraggableModal}  show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><h5>{ props.title ? props.title : 'Registrar ' } Editora</h5></Modal.Title>
        </Modal.Header>
        <Form onSubmit={FormSubmit}> 
        <Modal.Body className='scrollLimit'>
            <Form.Group className="mb-3" >
              <Form.Label>Nome da editora<span className='text-danger ml-2'>*</span></Form.Label>
              <Form.Control onChange={handleInput} className={!!errors.publisher_name && 'is-invalid'} value={form.publisher_name} isInvalid={!!errors.publisher_name}
              type="text" id="publisher_name" />
              <Form.Control.Feedback type='invalid'>{errors.publisher_name}</Form.Control.Feedback>
            </Form.Group>   
            <Form.Group className="mb-3">
              <Form.Label>Estado<span className='text-danger ml-2'>*</span></Form.Label>
              <Form.Select  onChange={handleInput} className={!!errors.publisher_status && 'is-invalid'} value={form.publisher_status} isInvalid={!!errors.publisher_status}
              id="publisher_status">
                   <option value="0">Activo</option>
                   <option value="1">Inactivo</option>
              </Form.Select>
              <Form.Control.Feedback type='invalid'>{errors.publisher_status}</Form.Control.Feedback>
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

export default NewPublisherModal