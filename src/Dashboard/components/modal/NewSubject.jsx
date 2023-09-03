import React, {useEffect, useState} from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Modal, Form, Button} from 'react-bootstrap'
import { Save } from '@mui/icons-material';
import { Update } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import DraggableModal from '../../../General/components/DraggableModal';
import {toast} from 'react-toastify';
import CRValue from '../../../General/components/CRValue';
import ClearInputs from '../../../General/components/ClearInputs';
import Hoot from '../../../General/components/Hoot';
import axios from 'axios';
import { GetInstituteCode } from '../../../General/components/InstituteData';
import RefreshList from '../../../General/components/RefreshList';


 
function NewSubject(props) {
    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => {
       setShow(true); 
       GET_DATA();
    }; 

    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});
     
    const INPUTS = {
         subject_title:CRValue("#subject_title"), 
         subject_type:CRValue("#subject_type"), 
         subject_category:CRValue("#subject_category"), 
         institute_code:GetInstituteCode()
    }; 
 

      
  const FORMURL = [
    Hoot()+"eduallsubjectregisterapi/post/",
    props.get ? props.get : '',
    props.url ? props.url : ''
  ];
      
  const GET_DATA = async()=>{
   if(props.update){
    const response = await axios.get(FORMURL[1]); 
    if(response.data !=null){
      if(response.data[0] != null){
        document.querySelector("#subject_title").value = response.data[0].ed_subject_title; 
        document.querySelector("#subject_type").value  = response.data[0].ed_subject_type; 
        document.querySelector("#subject_category").value  = response.data[0].ed_subject_category; 
  
        INPUTS.subject_title = response.data[0].ed_subject_title;
        INPUTS.subject_type = response.data[0].ed_subject_type;
        INPUTS.subject_category = response.data[0].ed_subject_category;
      }
    }
   }
}

    const setField = (field, value)  =>{
       setForm({...form, [field]:value});
  
      if(!!errors[field]){
          setErrors({...errors, [field]:null});  
      }
  }


    const validateForm = ()=>{
      const {subject_title,  subject_category, subject_type} = form; 
      const NewErrors = {};

      if(INPUTS.subject_title ===  "" || INPUTS.subject_title ===  " "){
      if(!subject_title || subject_title === '') NewErrors.subject_title = 'Disciplina invalido';  
      }else{if(!subject_title){setField("subject_title", INPUTS.subject_title );}} 
 
      if(INPUTS.subject_category ===  "" || INPUTS.subject_category ===  " "){
      if(!subject_category || subject_category === '') NewErrors.subject_category = 'Categoria  invalida'; 
      }else{if(!subject_category){setField("subject_category", INPUTS.subject_category);}} 

      if(INPUTS.subject_type ===  "" || INPUTS.subject_type ===  " "){
      if(!subject_type || subject_type === '') NewErrors.subject_type = 'Tipo de disciplina invalida'; 
      }else{if(!subject_type){setField("subject_type", INPUTS.subject_type);}} 
 
      return NewErrors;
  }
  
  const SUBMIT_INPUTS = {subject_title:INPUTS.subject_title,  subject_category:INPUTS.subject_category, 
  subject_type:INPUTS.subject_type , institute_code:INPUTS.institute_code};
  
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
              toast.success("Disciplina registrada com sucesso !");
              setForm({});
              ClearInputs();
              RefreshList(`.el-refresh-list`)
            }).catch((error)=>{toast.error("Lamentamos mas não foi  possivel executar esta ação")}); 
          } else {
            axios.put(FORMURL[2] , SUBMIT_INPUTS)
            .then(()=>{  
              toast.success("Disciplina atualizada com sucesso !");
              setForm({});
              ClearInputs();
              RefreshList(`.el-refresh-list`)
              setTimeout(() => { 
                  handleClose();
              }, 1000);
            }).catch((error)=>{toast.error("Lamentamos mas não foi  possivel executar esta ação")}); 
          } 
        }  
    };
  
      
    const handleInput = (e)=>{  
       switch (e.target.id) { 
          case "subject_title":
            setField("subject_title", e.target.value) 
            INPUTS.subject_title = e.target.value
           break; 
           case "subject_type":
            setField("subject_type", e.target.value) 
            INPUTS.subject_type = e.target.value;
           break;  
           case "subject_category":
            setField("subject_category", e.target.value) 
            INPUTS.subject_category = e.target.value;
           break;  
       }
    }


  return (
    <div>
       <div onClick={handleShow}>
            {
               props.toggle_btn ? props.toggle_btn : <button className='btn btn-main'><AddCircleOutlineIcon/> Registrar nova disciplina </button>
            }
         </div>
      <Modal className='animate__animated animate__zoomInDown'  centered  dialogAs={DraggableModal}  show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><h5>{ props.title ? props.title : 'Registrar ' }  disciplina</h5></Modal.Title>
        </Modal.Header>
        <Form onSubmit={FormSubmit}>
        <Modal.Body className='scrollLimit'>
            <Form.Group className="mb-3"  >
              <Form.Label>Nome da disciplina <span className='text-danger ml-2'>*</span></Form.Label>
              <Form.Control   onChange={handleInput} className={!!errors.subject_title && 'is-invalid'} value={form.subject_title} isInvalid={!!errors.subject_title}
              type="text" id="subject_title" autoFocus/>
              <Form.Control.Feedback type='invalid'>{errors.subject_title}</Form.Control.Feedback>
            </Form.Group>  
            <Form.Group className="mb-3 mt-3"  >
              <Form.Label>Tipo de disciplina<span className='text-danger ml-2'>*</span></Form.Label>
              <Form.Select onChange={handleInput} className={!!errors.subject_type && 'is-invalid'} value={form.subject_type} 
              isInvalid={!!errors.subject_type} 
               id="subject_type">
                 <option value="1">Teorica</option>
                  <option value="2">Pratica</option>
                  <option value="3">Teorica-Pratica</option> 
               </Form.Select>
              <Form.Control.Feedback type='invalid'>{errors.subject_type}</Form.Control.Feedback>
            </Form.Group>  
            <Form.Group className="mb-3"  >
              <Form.Label>Categoria  da   Disciplina </Form.Label>
              <Form.Select onChange={handleInput} id='subject_category' className={!!errors.subject_category && 'is-invalid'}
               value={form.subject_category} 
              isInvalid={!!errors.subject_category} > 
                  <option value="1">Designer</option>
                  <option value="2">Arte</option>
                  <option value="3">Engenharia</option>
                  <option value="4">Saude</option>
                  <option value="5">Ciencias</option>
                  <option value="6">Linguas</option>
              </Form.Select>
              <Form.Control.Feedback type='invalid'>{errors.subject_category}</Form.Control.Feedback>
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

export default NewSubject