import React, {useEffect, useState} from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Modal, Form, Button} from 'react-bootstrap'
import { Save } from '@mui/icons-material';
import DraggableModal from '../../../../General/components/DraggableModal'; 
import axios from 'axios';
import Hoot from '../../../../General/components/Hoot';
import ClearInputs from '../../../../General/components/ClearInputs';  
import CRValue from '../../../../General/components/CRValue';
import {toast} from 'react-toastify';
import { Update } from '@material-ui/icons';


function NewTypeOfBookModal(props) {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});  

  const handleClose = () => setShow(false);
  const handleShow = () => {
     setShow(true); 
     GET_DATA();
  };
   
  const INPUTS = {
       typeofbook_title:CRValue("#typeofbook_title")   
  }; 

  const FORMURL = [
    Hoot()+"edualllibrarytypeofbookregister/post/",
    props.get ? props.get : '',
    props.url ? props.url : ''
  ];

  const GET_DATA = async()=>{
   if(props.update){
    const response = await axios.get(FORMURL[1]); 
    if(response.data !=null){
      if(response.data[0] != null){
        document.querySelector("#typeofbook_title").value = response.data[0].ed_library_typeofbook_title;  
        INPUTS.typeofbook_title = response.data[0].ed_library_typeofbook_title; 
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
    const {typeofbook_title } = form; 
    const NewErrors = {};

    if(INPUTS.typeofbook_title ===  "" || INPUTS.typeofbook_title ===  " "){
    if(!typeofbook_title || typeofbook_title === '') NewErrors.typeofbook_title = 'Tipo de livro  invalida';  
    }else{if(!typeofbook_title){setField("typeofbook_title", INPUTS.typeofbook_title);}}  

    return NewErrors;
}

 const SUBMIT_INPUTS = {typeofbook_title:INPUTS.typeofbook_title};

  const FormSubmit = (e)=>{  
    e.preventDefault();   
    const formErrors = validateForm();
    if(Object.keys(formErrors).length > 0){
         setErrors(formErrors);
         toast.error("Verifique todos os  campos");   
      }else{
        if(!props.update){
          axios.post(FORMURL[0], SUBMIT_INPUTS).then(()=>{  
            toast.success("Tipo de livro  registrado com sucesso !");
            setForm({});
            ClearInputs();
            setTimeout(() => { 
              handleClose();
          }, 1500); 
          }).catch((error)=>{toast.error("Lamentamos mas não foi  possivel executar esta ação")}); 
        } else {
          axios.put(FORMURL[2] , SUBMIT_INPUTS)
          .then(()=>{  
            toast.success("Tipo de livro  atualizada com sucesso !");
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
        case "typeofbook_title":
          INPUTS.typeofbook_title = e.target.value
          setField("typeofbook_title", e.target.value);
         break;  
     }
  }


  return (
   <div>
    <div onClick={handleShow}>
            {
              props.toggle_btn ? props.toggle_btn :   <button className='btn btn-main'><AddCircleOutlineIcon/> Registrar tipo de livro</button>  
            }
       </div>
    <Modal  centered  className='animate__animated animate__zoomInDown'  dialogAs={DraggableModal}  show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title><h5>Registrar tipo de livro</h5></Modal.Title>
    </Modal.Header>
    <Form onSubmit={FormSubmit}>
    <Modal.Body className='scrollLimit'>
        <Form.Group className="mb-3"  > 
          <Form.Label>Titulo<span className='text-danger ml-2'>*</span></Form.Label>
              <Form.Control onChange={handleInput} className={!!errors.typeofbook_title && 'is-invalid'} value={form.typeofbook_title} isInvalid={!!errors.typeofbook_title}
              type="text" id="typeofbook_title" />
              <Form.Control.Feedback type='invalid'>{errors.typeofbook_title}</Form.Control.Feedback>
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

export default NewTypeOfBookModal