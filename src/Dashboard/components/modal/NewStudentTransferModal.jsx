import React, {useEffect, useState} from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Modal, Form, Button} from 'react-bootstrap'
import { InfoOutlined, Save } from '@mui/icons-material';
import DraggableModal from '../../../General/components/DraggableModal'; 
import axios from 'axios';
import Hoot from '../../../General/components/Hoot';
import ClearInputs from '../../../General/components/ClearInputs'; 
import { GetInstituteCode,  StudentsArray,  StudentsDataOptions} from '../../../General/components/InstituteData'; 
import { RichTextEditor } from '../../../General/components/RichTextEditor';
import CRValue from '../../../General/components/CRValue';
import {toast} from 'react-toastify';
import { Update } from '@material-ui/icons'; 
import RegisteredSchools from '../Grid/RegisteredSchools';
import SelectSearch from 'react-select-search';
import StudentDetailsMenu from '../elements/StudentDetailsMenu';

function NewStudentTransferModal(props){
    const [show, setShow] = useState(false);
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});
    const [studentCode, SetStudentCode] = useState(null);  

    const handleClose = () => setShow(false);
    const handleShow = () => {
       setShow(true); 
       GET_DATA();
    };
     
    const INPUTS = {  
         transference_reason:CRValue("#transference_reason"), 
         transference_student:studentCode,   
         transference_place:CRValue("#transference_place"),  
         transference_description: JSON.stringify(CRValue(".modal form textarea")), 
         transference_with_marks:CRValue("#transference_with_marks"),
     }; 

    const FORMURL = [
      Hoot()+"eduallstudenttransferenceregister/post",
      props.get ? props.get : '',
      props.url ? props.url : ''
    ];

    const GET_DATA = async()=>{
     if(props.update){
        try {
          const response = await axios.get(FORMURL[1]); 
          if(response.data !=null){
            if(response.data[0] != null){ 
              document.querySelector("#transference_reason").value  = response.data[0].ed_student_transference_reason; 
              SetStudentCode(response.data[0].ed_student_transference_code);  
              document.querySelector("#transference_place").value = response.data[0].ed_student_transference_to; 
              document.querySelector("#transference_with_marks").value = response.data[0].ed_student_transference_with_marks;
     
              INPUTS.transference_reason = response.data[0].ed_student_transference_reason; 
              INPUTS.transference_place = response.data[0].ed_student_transference_to ;
              INPUTS.transference_description = response.data[0].ed_student_transference_description;
              INPUTS.transference_with_marks = response.data[0].ed_student_transference_with_marks;
            }
          }
        } catch (error) {
          
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
      const {transference_student,  transference_reason , transference_place ,  transference_with_marks  } = form; 
      const NewErrors = {};
 
      if(INPUTS.transference_reason ===  "" || INPUTS.transference_reason ===  " "){
      if(!transference_reason || transference_reason === '') NewErrors.transference_reason = 'Motivo invalido';  
      }else{if(!transference_reason){setField("transference_reason", INPUTS.transference_reason);}} 
 
      if(INPUTS.transference_student ===  "" || INPUTS.transference_student ===  " "){
      if(!transference_student || transference_student === '') NewErrors.transference_student = 'Estudante invalido';  
      }else{if(!transference_student){setField("transference_student", INPUTS.transference_student);}} 
 
      if(INPUTS.transference_place ===  "" || INPUTS.transference_place ===  " "){
      if(!transference_place || transference_place === '') NewErrors.transference_place = 'Local de transferência invalido';  
      }else{if(!transference_place){setField("transference_place", INPUTS.transference_place);}} 
    
      if(INPUTS.transference_reason ===  "" || INPUTS.transference_reason ===  " "){
      if(!transference_reason || transference_reason === '') NewErrors.transference_reason = 'Motivo invalido';  
      }else{if(!transference_reason){setField("transference_reason", INPUTS.transference_reason);}} 
 
      if(INPUTS.transference_with_marks ===  "" || INPUTS.transference_with_marks ===  " "){
      if(!transference_with_marks || transference_with_marks === '') NewErrors.transference_with_marks = 'Selecione uma opção valida';  
      }else{if(!transference_with_marks){setField("transference_with_marks", INPUTS.transference_with_marks);}}  

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
            transference_student:studentCode , 
            transference_reason:INPUTS.transference_reason, 
            transference_place:INPUTS.transference_place, 
            transference_with_marks:INPUTS.transference_with_marks, 
            transference_description:INPUTS.transference_description
        };


        console.log(SUBMIT_INPUTS);

          if(!props.update){
            axios.post(FORMURL[0], SUBMIT_INPUTS).then(()=>{  
              
              console.log(SUBMIT_INPUTS);

              toast.success("Transferência executada  com sucesso !");
              setForm({});
             // ClearInputs();
              setTimeout(() => { 
            //    handleClose();
            }, 1500); 
            }).catch((error)=>{toast.error("Lamentamos mas não foi  possivel executar esta ação")}); 
          } else {
            axios.put(FORMURL[2] , SUBMIT_INPUTS)
            .then(()=>{  
              toast.success("Transferência atualizada com sucesso !");
              setForm({});
              ClearInputs();
              setTimeout(() => { 
                  handleClose();
              }, 1500);
            }).catch((error)=>{toast.error("Lamentamos mas não foi  possivel executar esta ação")}); 
          }
        }  
    };


    

    const GetStudentCode  = (e)=>{
      SetStudentCode(e) 
      setField("transference_student", e);
  }
 


    const handleInput = (e)=>{ 
       switch (e.target.id) { 
           case "transference_reason":
            INPUTS.transference_reason = e.target.value
            setField("transference_reason", e.target.value);
           break;
           case "transference_place":
            INPUTS.transference_place = e.target.value
            setField("transference_place", e.target.value);
           break;
           case "transference_with_marks":
            INPUTS.transference_with_marks = e.target.value
            setField("transference_with_marks", e.target.value);
           break; 
           default:
       }
    }
 


  return (
    <div>  
      <div onClick={handleShow}>
            {
              props.toggle_btn ? props.toggle_btn :   <button className='btn btn-main'><AddCircleOutlineIcon/>Efetuar Transferência</button>  
            }
       </div>
      <Modal className='animate__animated animate__zoomInDown'  centered  size='lg' dialogAs={DraggableModal}  show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><h5>{ props.title ? props.title : 'Efetuar ' } Transferência</h5></Modal.Title>
        </Modal.Header>
        <Form onSubmit={FormSubmit}> 
        <Modal.Body className='scrollLimit'>   
            <Form.Group className="mb-3"> 
              <div className="ed-space">
                  <div>
                    <Form.Label>Nome do estudante <span className='text-danger ml-2'>*</span></Form.Label>
                  </div>
                  <div className='ed-flex'> 
                      {studentCode !== null ? <StudentDetailsMenu student_id={studentCode}  toggle_btn={<div className='btn-pm-info'><InfoOutlined/></div>} /> : <></>}
                  </div>
                </div>
                <div className={`select-search-item  ${errors.feepayment_student_code ? 'error': ''}`}>
                  <SelectSearch  onChange={(e)=>GetStudentCode(e)}  value={studentCode} options={StudentsArray()[0]} search={true} 
                    placeholder="Selecione um aluno" />
                </div> 
              <Form.Control.Feedback type='invalid'>{errors.transference_student}</Form.Control.Feedback>
            </Form.Group>   
            <Form.Group className="mb-3">
              <Form.Label>Adicionar notas a declaração <span className='text-danger ml-2'>*</span></Form.Label>
              <Form.Select  onChange={handleInput} className={!!errors.transference_with_marks && 'is-invalid'} value={form.transference_with_marks} isInvalid={!!errors.transference_reason}
              type="text" id="transference_with_marks">
                  <option value="0">Não</option>
                  <option value="1">Sim</option>  
              </Form.Select> 
              <Form.Control.Feedback type='invalid'>{errors.transference_with_marks}</Form.Control.Feedback>
            </Form.Group>  
            <Form.Group className="mb-3">
              <Form.Label>Efeito da transferência<span className='text-danger ml-2'>*</span></Form.Label>
              <Form.Control  onChange={handleInput} className={!!errors.transference_reason && 'is-invalid'} value={form.transference_reason} isInvalid={!!errors.transference_reason}
              type="text" id="transference_reason" />
              <Form.Control.Feedback type='invalid'>{errors.transference_reason}</Form.Control.Feedback>
            </Form.Group>  
            <Form.Group className="mb-3">
              <Form.Label>Local de transferência<span className='text-danger ml-2'>*</span></Form.Label>
              <Form.Control  onChange={handleInput} className={!!errors.transference_place && 'is-invalid'} value={form.transference_place} isInvalid={!!errors.transference_place}
              type="text" id="transference_place" />
              <Form.Control.Feedback type='invalid'>{errors.transference_place}</Form.Control.Feedback>
                <RegisteredSchools /> 
            </Form.Group> 
            <Form.Group className="mb-3">
              <Form.Label >Descreva o motivo da trânsferencia</Form.Label> 
                   <RichTextEditor/> 
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

export default NewStudentTransferModal