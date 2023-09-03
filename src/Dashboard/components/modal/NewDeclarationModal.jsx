import React, {useEffect, useState} from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Modal, Form, Button} from 'react-bootstrap'
import { Save } from '@mui/icons-material';
import DraggableModal from '../../../General/components/DraggableModal'; 
import axios from 'axios';
import Hoot from '../../../General/components/Hoot';
import ClearInputs from '../../../General/components/ClearInputs'; 
import {GetInstituteCode, StudentsArray, StudentsDataOptions, StudentsDataOptionsSelector} from '../../../General/components/InstituteData'; 
import { RichTextEditor } from '../../../General/components/RichTextEditor';
import CRValue from '../../../General/components/CRValue';
import {toast} from 'react-toastify';
import { Update } from '@material-ui/icons';
import { Checkbox, FormControlLabel } from '@mui/material';
import SelectSearch from 'react-select-search';
import RefreshList from '../../../General/components/RefreshList';


function NewDeclarationModal(props) {
    const [show, setShow] = useState(false);
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});  
    const [checked, setChecked] = useState(true);
    const [ShowClassField, SetShowClassField] = useState(0);
    const [studentCode, SetStudentCode] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = () => {
       setShow(true); 
       GET_DATA();
    };
     
    const INPUTS = {
         declaration_student:studentCode, 
         declaration_effect:CRValue("#declaration_effect"),  
         declaration_with_marks:checked
    }; 

    const FORMURL = [
      Hoot()+"edualldeclarationregister/post/",
      props.get ? props.get : '',
      props.url ? props.url : ''
    ];

    const GET_DATA = async()=>{
      const response = await axios.get(FORMURL[1]); 
     if(props.update){
      if(response.data !=null){
        if(response.data[0] != null){
          SetStudentCode(response.data[0].ed_declaration_student);  
          document.querySelector("#declaration_effect").value = response.data[0].ed_declaration_effect; 
   
          INPUTS.declaration_student = response.data[0].ed_declaration_student
          INPUTS.declaration_effect = response.data[0].ed_declaration_effect 
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
      const {declaration_student, declaration_class, declaration_effect, declaration_with_marks } = form; 
      const NewErrors = {};

      if(INPUTS.declaration_student ===  "" || INPUTS.declaration_student ===  " "){
      if(!declaration_student || declaration_student === '') NewErrors.declaration_student = 'Estudante invalido';  
      }else{if(!declaration_student){setField("declaration_student", INPUTS.declaration_student);}} 

      if(INPUTS.declaration_effect ===  "" || INPUTS.declaration_effect ===  " "){
      if(!declaration_effect || declaration_effect === '') NewErrors.declaration_effect = 'Efeito de declaração invalido';  
      }else{if(!declaration_effect){setField("declaration_effect", INPUTS.declaration_effect);}} 

      if(INPUTS.declaration_with_marks ===  "" || INPUTS.declaration_with_marks ===  " "){
      if(!declaration_with_marks || declaration_with_marks === '') NewErrors.declaration_with_marks = 'Selecione uma opção valida';  
      }else{if(!declaration_with_marks){setField("declaration_with_marks", INPUTS.declaration_with_marks);}} 

      if(ShowClassField === 1){
        if(INPUTS.declaration_class ===  "" || INPUTS.declaration_class ===  " "){
          if(!declaration_class || declaration_class === '') NewErrors.declaration_class = 'Selecione uma opção valida';  
          }else{if(!declaration_class){setField("declaration_class", INPUTS.declaration_class);}} 
      }

  
      return NewErrors;
  }
  


    const FormSubmit = (e)=>{  
      e.preventDefault();   
      const formErrors = validateForm();
      if(Object.keys(formErrors).length > 0){
           setErrors(formErrors);
           toast.error("Verifique todos os  campos");   
        }else{
          
          const SUBMIT_INPUTS = {
            declaration_student:INPUTS.declaration_student, 
            declaration_effect:INPUTS.declaration_effect,
            declaration_with_marks:INPUTS.declaration_with_marks,
            declaration_class:INPUTS.declaration_class
        };

          console.log(SUBMIT_INPUTS);

          if(!props.update){
            axios.post(FORMURL[0], SUBMIT_INPUTS).then(()=>{  
              toast.success("Declaração registrada com sucesso !");
              setForm({});
              RefreshList(`.el-refresh-list`)
              ClearInputs();
              setTimeout(() => { 
                handleClose();
            }, 1500); 
            }).catch((error)=>{toast.error("Lamentamos mas não foi  possivel executar esta ação")}); 
          } else {
            axios.put(FORMURL[2] , SUBMIT_INPUTS)
            .then(()=>{  
              toast.success("Declaração atualizada com sucesso !");
              setForm({});
              ClearInputs();
              RefreshList(`.el-refresh-list`)
              setTimeout(() => { 
                  handleClose();
              }, 1500);
            }).catch((error)=>{toast.error("Lamentamos mas não foi  possivel executar esta ação")}); 
          }
        }  
    };


    const GetStudentCode  = (e)=>{
        SetStudentCode(e)
        setField("declaration_student", e);
        console.log(e)
    }
      
    const handleInput = (e)=>{  
       switch (e.target.id) { 
          case "declaration_effect":
            INPUTS.declaration_effect = e.target.value
            setField("declaration_effect", e.target.value);
           break; 
           case "declaration_with_marks": 
            INPUTS.declaration_with_marks = e.target.value
            setField("declaration_with_marks", e.target.value);
            SetShowClassField(e.target.value*1 === 1 ? true : false);
           break;  
       }
    }
 

 
    
 


  return (
    <div>  
      <div onClick={handleShow}>
            {
              props.toggle_btn ? props.toggle_btn :   <button className='btn btn-main'><AddCircleOutlineIcon/> Emitir Declaração</button>  
            }
       </div>
      <Modal className='animate__animated animate__zoomInDown'  centered  size='lg' dialogAs={DraggableModal}  show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><h5>{ props.title ? props.title : 'Emitir ' } Declaração</h5></Modal.Title>
        </Modal.Header>
        <Form onSubmit={FormSubmit}> 
        <Modal.Body className='scrollLimit'>  
          {!props.update ?
            <Form.Group className="mb-3">
            <Form.Label>Nome do estudante <span className='text-danger ml-2'>*</span></Form.Label>
                <SelectSearch   onChange={(e)=>GetStudentCode(e)} options={StudentsArray()[0]} search={true}  placeholder="Selecione um aluno" />
            <Form.Control.Feedback type='invalid'>{errors.declaration_student}</Form.Control.Feedback>
          </Form.Group>  
          : 
          <></>}
            <Form.Group className="mb-3">
              <Form.Label>Efeito<span className='text-danger ml-2'>*</span></Form.Label>
              <Form.Control  onChange={handleInput} className={!!errors.declaration_effect && 'is-invalid'} type='text' 
              value={form.declaration_effect} isInvalid={!!errors.declaration_effect}
              id="declaration_effect"/> 
              <Form.Control.Feedback type='invalid'>{errors.declaration_effect}</Form.Control.Feedback>
            </Form.Group>  
            
            
            <Form.Group className="mb-3">
              <Form.Label>Declaração com notas<span className='text-danger ml-2'>*</span></Form.Label>
              <Form.Select  onChange={handleInput} className={!!errors.declaration_with_marks && 'is-invalid'} type='text' 
              value={form.declaration_with_marks} isInvalid={!!errors.declaration_with_marks}
              id="declaration_with_marks">
                   <option value="1">Sim</option>
                   <option value="0" selected >Não</option>
              </Form.Select>
              <Form.Control.Feedback type='invalid'>{errors.declaration_with_marks}</Form.Control.Feedback>
            </Form.Group>  
            
          {ShowClassField ?
                <Form.Group className="mb-3">
                  <Form.Label>Classe<span className='text-danger ml-2'>*</span></Form.Label>
                  <Form.Select  onChange={handleInput} className={!!errors.declaration_class && 'is-invalid'} type='text' 
                  value={form.declaration_class} isInvalid={!!errors.declaration_class}
                  id="declaration_class">
                      
                  </Form.Select>
                  <Form.Control.Feedback type='invalid'>{errors.declaration_class}</Form.Control.Feedback>
              </Form.Group> 
                  :
               <></> 
          } 
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

export default NewDeclarationModal