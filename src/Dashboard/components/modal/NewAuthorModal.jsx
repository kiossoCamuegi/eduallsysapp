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

function NewAuthorModal(props) {
    const [show, setShow] = useState(false);
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});  

    const handleClose = () => setShow(false);
    const handleShow = () => {
       setShow(true); 
       GET_DATA();
    };
     
    const INPUTS = {
         author_name:CRValue("#author_name"),  
         author_status:CRValue("#author_status"),  
         institute_code:GetInstituteCode()
    }; 

    const FORMURL = [
      Hoot()+"edualllibraryauthorregister/post",
      props.get ? props.get : '',
      props.url ? props.url : ''
    ];

    const GET_DATA = async()=>{
     if(props.update){
      const response = await axios.get(FORMURL[1]); 
      if(response.data !=null){
        if(response.data[0] != null){
          document.querySelector("#author_name").value = response.data[0].ed_library_author_name;  
          document.querySelector("#author_status").value = response.data[0].ed_library_author_status;  

          INPUTS.author_name = response.data[0].ed_library_author_name; 
          INPUTS.author_status = response.data[0].ed_library_author_status; 
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
      const {author_name, author_status} = form; 
      const NewErrors = {};

      if(INPUTS.author_name ===  "" || INPUTS.author_name ===  " "){
      if(!author_name || author_name === '') NewErrors.author_name = 'Autor invalida';  
      }else{if(!author_name){setField("author_name", INPUTS.author_name);}} 

      if(INPUTS.author_status ===  "" || INPUTS.author_status ===  " "){
      if(!author_status || author_status === '') NewErrors.author_status = 'Estado invalido';  
      }else{if(!author_status){setField("author_status", INPUTS.author_status);}} 
  
      return NewErrors;
  }
  
   const SUBMIT_INPUTS = {author_name:INPUTS.author_name, author_status:INPUTS.author_status };

    const FormSubmit = (e)=>{  
      e.preventDefault();   
      const formErrors = validateForm();
      if(Object.keys(formErrors).length > 0){
           setErrors(formErrors);
           toast.error("Verifique todos os  campos");   
        }else{
          if(!props.update){
            axios.post(FORMURL[0], SUBMIT_INPUTS).then(()=>{  
              toast.success("Autor registrado com sucesso !");
              setForm({});
              ClearInputs();
              setTimeout(() => { 
                handleClose();
            }, 1500); 
            }).catch((error)=>{toast.error("Lamentamos mas não foi  possivel executar esta ação")}); 
          } else {
            axios.put(FORMURL[2] , SUBMIT_INPUTS)
            .then(()=>{  
              toast.success("Autor atualizado com sucesso !");
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
          case "author_name":
            INPUTS.author_name = e.target.value
            setField("author_name", e.target.value);
           break; 
            case "author_status":
            INPUTS.author_status = e.target.value
            setField("author_status", e.target.value);
          break;
       }
    }
 


  return (
    <div>  
      <div onClick={handleShow}>
            {
              props.toggle_btn ? props.toggle_btn :   <button className='btn btn-main'><AddCircleOutlineIcon/> Registrar Autor</button>  
            }
       </div>
      <Modal className='animate__animated animate__zoomInDown'  centered  size='lg' dialogAs={DraggableModal}  show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><h5>{ props.title ? props.title : 'Registrar ' } Autor</h5></Modal.Title>
        </Modal.Header>
        <Form onSubmit={FormSubmit}> 
        <Modal.Body className='scrollLimit'>
            <Form.Group className="mb-3" >
              <Form.Label>Nome do autor<span className='text-danger ml-2'>*</span></Form.Label>
              <Form.Control onChange={handleInput} className={!!errors.author_name && 'is-invalid'} value={form.author_name} isInvalid={!!errors.author_name}
              type="text" id="author_name" />
              <Form.Control.Feedback type='invalid'>{errors.author_name}</Form.Control.Feedback>
            </Form.Group>   
            <Form.Group className="mb-3">
              <Form.Label>Estado<span className='text-danger ml-2'>*</span></Form.Label>
              <Form.Select  onChange={handleInput} className={!!errors.author_status && 'is-invalid'} value={form.author_status} isInvalid={!!errors.author_status}
              id="author_status">
                   <option value="0">Activo</option>
                   <option value="1">Inactivo</option>
              </Form.Select>
              <Form.Control.Feedback type='invalid'>{errors.author_status}</Form.Control.Feedback>
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

export default NewAuthorModal