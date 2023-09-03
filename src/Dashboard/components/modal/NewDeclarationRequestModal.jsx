import React, {useEffect, useState} from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Modal, Form, Button} from 'react-bootstrap'
import { InfoOutlined, Save } from '@mui/icons-material';
import DraggableModal from '../../../General/components/DraggableModal'; 
import axios from 'axios';
import Hoot from '../../../General/components/Hoot';
import ClearInputs from '../../../General/components/ClearInputs'; 
import {StudentsArray} from '../../../General/components/InstituteData'; 
import { RichTextEditor } from '../../../General/components/RichTextEditor';
import CRValue from '../../../General/components/CRValue';
import {toast} from 'react-toastify';
import { Update } from '@material-ui/icons';
import { Checkbox, FormControlLabel } from '@mui/material';
import SelectSearch from 'react-select-search';
import StudentDetailsMenu from '../elements/StudentDetailsMenu';
import RefreshList from '../../../General/components/RefreshList';


function NewDeclarationRequestModal(props) {
    const [show, setShow] = useState(false);
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});  
    const [studentCode, SetStudentCode] = useState(null);
    const [declaration_request_with_marks, Setdeclaration_request_with_marks] = useState(true);

    const handleClose = () => setShow(false);
    const handleShow = () => {
       setShow(true); 
       GET_DATA();
    };
     
    const INPUTS = {
         declaration_request_student_code: studentCode,
         declaration_request_by:CRValue("#declaration_request_by"), 
         declaration_request_with_marks:declaration_request_with_marks,  
         declaration_request_description: JSON.stringify(CRValue(".class-description-input textarea"))
    }; 

    const FORMURL = [
      Hoot()+"edualldeclarationrequestregister/post",
      props.get ? props.get : '',
      props.url ? props.url : ''
    ];

    async function  GET_DATA(){
      if(props.update){
        const response = await axios.get(FORMURL[1]); 
        if(response.data !=null){
          if(response.data[0] != null){
            document.querySelector("#declaration_request_by").value = response.data[0].ed_declaration_request_by; 
            Setdeclaration_request_with_marks(Math.floor(response.data[0].ed_declaration_request_with_marks) === 0 ? false : true);  
            SetStudentCode(response.data[0].ed_declaration_request_student_code);
            
            if(document.querySelectorAll(".public-DraftStyleDefault-block").length >= 1){ 
            document.querySelector(".modal form textarea").value =  response.data[0].ed_declaration_request_description;} 
  
            INPUTS.declaration_request_by = response.data[0].ed_declaration_request_by;
            INPUTS.declaration_request_with_marks = Math.floor(response.data[0].ed_declaration_request_with_marks) === 0 ? false : true;
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
   

  const toggleCheckBox = (e)=>{
     INPUTS.declaration_request_with_marks = e.target.checked;  
     Setdeclaration_request_with_marks(INPUTS.declaration_request_with_marks);
     console.log(INPUTS.declaration_request_with_marks);
  }


    const validateForm = ()=>{
      const {declaration_request_by, declaration_request_student_code} = form; 
      const NewErrors = {};

      if(INPUTS.declaration_request_by ===  "" || INPUTS.declaration_request_by ===  " "){
      if(!declaration_request_by || declaration_request_by === '') NewErrors.declaration_request_by = 'Preencha corretamento o campo';  
      }else{if(!declaration_request_by){setField("declaration_request_by", INPUTS.declaration_request_by);}} 

      if(INPUTS.declaration_request_student_code ===  "" || INPUTS.declaration_request_student_code ===  " "){
      if(!declaration_request_student_code || declaration_request_student_code === '') NewErrors.declaration_request_student_code = 'Estudante invalido';  
      }else{if(!declaration_request_student_code){setField("declaration_request_student_code", INPUTS.declaration_request_student_code);}}  

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
            declaration_request_by:INPUTS.declaration_request_by, 
            declaration_request_with_marks:declaration_request_with_marks, 
            declaration_request_description:INPUTS.declaration_request_description,
            declaration_request_student_code:INPUTS.declaration_request_student_code
          };

          console.log(SUBMIT_INPUTS);

          if(!props.update){
            axios.post(FORMURL[0], SUBMIT_INPUTS).then(()=>{  
              toast.success("Solicitação de declaração  registrada com sucesso !"); 
              setTimeout(() => { 
                setForm({});
                ClearInputs();
                RefreshList(`.el-refresh-list`)
            }, 1500); 
            }).catch((error)=>{toast.error("Lamentamos mas não foi  possivel executar esta ação")}); 
          } else {
            axios.put(FORMURL[2] , SUBMIT_INPUTS)
            .then(()=>{  
              toast.success("Solicitação de declaração  atualizada com sucesso !"); 
              setTimeout(() => { 
                setForm({});
                ClearInputs();
                RefreshList(`.el-refresh-list`)
              }, 1500);
            }).catch((error)=>{toast.error("Lamentamos mas não foi  possivel executar esta ação")}); 
          }
        }  
    };

      
    const handleInput = (e)=>{ 
       switch (e.target.id) { 
          case "declaration_request_by":
            INPUTS.declaration_request_by = e.target.value
            setField("declaration_request_by", e.target.value);
           break;  
           default:
       }
    }
 
          
  const GetStudentCode  = (e)=>{
    SetStudentCode(e)
    setField("declaration_request_student_code", e);  
  }


  return (
    <div>  
      <div onClick={handleShow}>
            {
              props.toggle_btn ? props.toggle_btn :   <button className='btn btn-main'><AddCircleOutlineIcon/> Registrar Solicitação de declaração </button>  
            }
       </div>
      <Modal className='animate__animated animate__zoomInDown'  centered  size='lg' dialogAs={DraggableModal}  show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><h5>{ props.title ? props.title : 'Registrar ' } Solicitação de declaração </h5></Modal.Title>
        </Modal.Header>
        <Form onSubmit={FormSubmit}> 
        <Modal.Body className='scrollLimit'>   
          <Form.Group className="mb-3">
          <div className="ed-space">
            <div>
              <Form.Label>Nome do estudante <span className='text-danger ml-2'>*</span></Form.Label>
            </div>
            <div className='ed-flex'> 
                {studentCode !== null ? <StudentDetailsMenu student_id={studentCode}  toggle_btn={<div className='btn-pm-info'><InfoOutlined /></div>} /> : <></>}
            </div>
          </div>
          <div className={`select-search-item  ${errors.declaration_request_student_code ? 'error': ''}`}>
            <SelectSearch  onChange={(e)=>GetStudentCode(e)}  value={studentCode} options={StudentsArray()[0]} search={true} 
              placeholder="Selecione um aluno" />
          </div>
          <small className="text-danger">{errors.declaration_request_student_code}</small>
        </Form.Group>    
            <Form.Group className="mb-3">
              <Form.Label>Solicitado por<span className='text-danger ml-2'><small>(Encarregado, professor , O aluno ...)</small> *</span></Form.Label>
              <Form.Select  onChange={handleInput} className={!!errors.declaration_request_by && 'is-invalid'} value={form.declaration_request_by} 
              isInvalid={!!errors.declaration_request_by}  type="text" id="declaration_request_by">
                  <option value="0" selected>Encarregado</option>
                  <option value="1">Estudante</option>
                  <option value="2">Professor</option>
              </Form.Select>
              <Form.Control.Feedback type='invalid'>{errors.declaration_request_by}</Form.Control.Feedback>
            </Form.Group>  
             <div className="mb-3">
                 <FormControlLabel control={
                  <Checkbox id='declaration_with_marks' checked={declaration_request_with_marks}  onChange={toggleCheckBox}  />}
                 label="Adicionar notas a declaração" />  
             </div>
            <Form.Group className="mb-3">
              <Form.Label >Descrição </Form.Label>
              <div className="class-description-input">
                   <RichTextEditor/>
              </div>
            </Form.Group>  
        </Modal.Body>
        <Modal.Footer>
          <div className="ed-space">
            <div></div>
            <div className="ed-flex">
               <Button className='bg-light text-dark' onClick={handleClose}> Cancelar </Button>
               <Button className="btn btn-main ml-2" type="submit">{ props.title ? <Update/> : <Save/>  }   { props.title ? props.title : 'Salvar' } </Button>
            </div>
          </div>
        </Modal.Footer>
        </Form>
      </Modal>
    </div>
  )
} 

export default NewDeclarationRequestModal