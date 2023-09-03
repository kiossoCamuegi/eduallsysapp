import React, {useEffect, useState} from 'react'
import styled from 'styled-components' 
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Modal, Form, Button, Badge} from 'react-bootstrap'
import { InfoOutlined, Save } from '@mui/icons-material';
import DraggableModal from '../../../../../../General/components/DraggableModal';
import axios from 'axios';
import Hoot from  '../../../../../../General/components/Hoot'; 
import ClearInputs from '../../../../../../General/components/ClearInputs'; 
import CRValue from  '../../../../../../General/components/CRValue';
 
import { RichTextEditor } from '../../../../../../General/components/RichTextEditor'; 
import FileUpload from '../../../../../../General/components/FileUpload';

import {toast} from 'react-toastify';
import { Update } from '@material-ui/icons';
import SelectSearch from 'react-select-search';
import { ClassDataOptions, GetClasstitle_byclass, GetSubject, GetTime, StudentsArray } from '../../../../../../General/components/InstituteData';
import StudentDetailsMenu from '../../../../../../Dashboard/components/elements/StudentDetailsMenu';


function CreateLessonSectionModal(props){
    const [show, setShow] = useState(false);
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({}); 
    const [studentCode, setStudentCode] = useState(null);  
    const [StudentsData, setStudentsData] = useState([]);
    const [DT, SetDT] = useState([]);
    const [TM, SetTM] = useState([]);
  
      const handleClose = () => setShow(false); 
      const handleShow = () => { 
         setShow(true);  
         GET_DATA();
      };
   
   
       
      const INPUTS = { 
          student_attendance_classSubject:CRValue("#student_attendance_classSubject").split("|")[2],  
          student_attendance_subject:CRValue("#student_attendance_classSubject").split("|")[1], 
          student_attendance_class:CRValue("#student_attendance_classSubject").split("|")[0], 
          student_attendance_time:CRValue("#student_attendance_time"), 
          student_attendance_status:CRValue("#student_attendance_status"), 
          student_attendance_Date:CRValue("#student_attendance_Date"),
          student_attendance_studentCode:studentCode,  
      }; 
  
      const FORMURL = [
        Hoot()+"eduallstudentattendanceregister/post",
        Hoot()+"eduallattendancecheckpaidmonth/", 
        props.get ? props.get : '',
        props.url ? props.url : '',
        Hoot()+"eduallgetstudentsbyclass/"
    ]; 
    
   
  
      const GET_DATA = async()=>{
       if(props.update){
        const response = await axios.get(FORMURL[1]); 
        if(response.data !=null){
          if(response.data[0] != null){
              // document.querySelector("#quarterly_note_class").value = response.data[0].ed_quarterly_note_class; 
              // INPUTS.class_description = response.data[0].class_description
          }
        }
       }
    }
  
  
    const GetStudentsByClass= async(e)=>{
      setStudentsData([]);
      const response = await axios.get(FORMURL[4]+e); 
      const students = []; 
      if(response.data !== null){
          response.data.map((item, index)=>{
            students.push({name:item.ed_student_name, value:item.ed_student_id});
          }) 
        } 
      setStudentsData(students);
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
        const { student_attendance_classSubject, student_attendance_status, student_attendance_time, student_attendance_Date } = form; 
        const NewErrors = {};
         
        if(INPUTS.student_attendance_classSubject ===  "" || INPUTS.student_attendance_classSubject === " "){
        if(!student_attendance_classSubject || student_attendance_classSubject === '') NewErrors.student_attendance_classSubject = 'Selecione a turma';  
        }else{if(!student_attendance_classSubject){setField("student_attendance_classSubject", INPUTS.student_attendance_classSubject);}} 
                 
        if(INPUTS.student_attendance_time ===  "" || INPUTS.student_attendance_time === " "){
        if(!student_attendance_time || student_attendance_time === '') NewErrors.student_attendance_time = 'Selecione um horário';  
        }else{if(!student_attendance_time){setField("student_attendance_time", INPUTS.student_attendance_time);}} 
  
        if(studentCode === null) NewErrors.student_attendance_code = 'Selecione um estudante';    
     
        if(INPUTS.student_attendance_status ===  "" || INPUTS.student_attendance_status === " "){
        if(!student_attendance_status || student_attendance_status === '') NewErrors.student_attendance_status = 'Selecione o estado de presença do aluno';  
        }else{if(!student_attendance_status){setField("student_attendance_status", INPUTS.student_attendance_status);}} 
           
           
        if(INPUTS.student_attendance_Date ===  "" || INPUTS.student_attendance_Date === " "){
          if(!student_attendance_Date || student_attendance_Date === '') NewErrors.student_attendance_Date = 'Selecione uma data valida';  
          }else{if(!student_attendance_Date){setField("student_attendance_Date", INPUTS.student_attendance_Date);}} 
          
        return NewErrors;
    }
   
  
      const FormSubmit = (e)=>{  
        e.preventDefault();     
        const formErrors = validateForm(); 
            if(Object.keys(formErrors).length > 0){
              setErrors(formErrors); 
              toast.error("Verifique todos os  campos");   
              console.log(formErrors);
           }else{  
  
             const SUBMIT_INPUTS = { 
                  student_attendance_class:INPUTS.student_attendance_class,
                  student_attendance_time:INPUTS.student_attendance_time,
                  student_attendance_status:INPUTS.student_attendance_status,
                  student_attendance_subject:INPUTS.student_attendance_subject,
                  student_attendance_subClass:INPUTS.student_attendance_classSubject,
                  student_attendance_code:studentCode,
                  student_attendance_date:INPUTS.student_attendance_Date
              };
    
             if(!props.update){ 
              console.log(SUBMIT_INPUTS);
              axios.post(FORMURL[0], SUBMIT_INPUTS).then((e)=>{  
                  toast.success("Presença atualizada com sucesso !");
                  
  
                  console.log(e.data);
  
                  /*
                    setForm({});
                    ClearInputs(); 
                 */
  
            }).catch((error)=>{toast.error("Lamentamos mas não foi  possivel executar esta ação")});   
             } else {
               axios.put(FORMURL[2] , SUBMIT_INPUTS)
               .then(()=>{  
                 toast.success("Nota atualizada com sucesso !");
                 setForm({});
                 ClearInputs(); 
               }).catch((error)=>{toast.error("Lamentamos mas não foi  possivel executar esta ação")}); 
             } 
   
            
           }         
      };
   
   
      const GetStudentCode  = (e)=>{    
         setStudentCode(e);   
      }
  
      const handleInput = (e)=>{    
         switch (e.target.id) {  
            case "student_attendance_classSubject":  
                setField("student_attendance_class", e.target.value.split("|")[0]);
                INPUTS.student_attendance_class = e.target.value.split("|")[0]; 
                
                setField("student_attendance_subject", e.target.value.split("|")[1]);
                INPUTS.student_attendance_subject = e.target.value.split("|")[1]; 
  
                setField("student_attendance_classSubject", e.target.value);
                INPUTS.student_attendance_classSubject = e.target.value;
  
                GetStudentsByClass(e.target.value.split("|")[0]*1); 
  
                INPUTS.student_attendance_tch_subClass = e.target.value.split("|")[2];  
                setField("student_attendance_tch_subClass", e.target.value.split("|")[2]);
            break;    
              case "student_attendance_time":
                setField("student_attendance_time", e.target.value);
                INPUTS.student_attendance_time = e.target.value
            break;   
            case "student_attendance_status":
              setField("student_attendance_status", e.target.value);
              INPUTS.student_attendance_status = e.target.value
            break;   
            case "student_attendance_Date":
              setField("student_attendance_Date", e.target.value);
              INPUTS.student_attendance_Date = e.target.value
            break;   
         }   
      }
  
  
       
     useEffect(()=>{ 
      SetDT(typeof props.data === 'object' ? props.data : []);  
   },[]);
   
  
  
    return (
      <div>
        <div onClick={handleShow}>
           {props.toggle_btn ? props.toggle_btn :  <button className="btn bg-main"><AddCircleOutlineIcon/> Criar secção  / capitulo</button>}
        </div>
        <Modal size='lg'  className='animate__animated animate__zoomInDown' centered   dialogAs={DraggableModal}  show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title><h5>{ props.title ? props.title : 'Criar ' } secção</h5></Modal.Title>
          </Modal.Header>
          <Form onSubmit={FormSubmit}>
          <Modal.Body className='scrollLimit'> 
               <div>
                  <Form.Group className="mb-3">
                    <Form.Label>Turma - disciplina <span className='text-danger ml-2'>*</span></Form.Label>
                    <Form.Select text="number" onChange={handleInput} className={!!errors.student_attendance_classSubject && 'is-invalid'} value={form.student_attendance_classSubject} 
                    isInvalid={!!errors.student_attendance_classSubject} id="student_attendance_classSubject">
                        {DT.map((item, index)=>{
                            return(<option value={item.ed_tch_subject_class + "|"+ item.ed_tch_subject_code+"|"+item.ed_tch_subject_id}> 
                                  <GetClasstitle_byclass ID={item.ed_tch_subject_class} /> 
                                  ( <GetSubject ID={item.ed_tch_subject_code} /> )
                              </option>)
                        })} 
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>{errors.student_attendance_classSubject}</Form.Control.Feedback>
                  </Form.Group>  
              </div>  
          
              <div>
                  <Form.Group className="mb-3">
                    <Form.Label>Secção / Capitulo <span className='text-danger ml-2'>*</span></Form.Label>
                    <Form.Control text="number" onChange={handleInput} className={!!errors.student_attendance_status && 'is-invalid'} value={form.student_attendance_status} 
                    isInvalid={!!errors.student_attendance_status} id="student_attendance_status"/>
                    <Form.Control.Feedback type='invalid'>{errors.student_attendance_status}</Form.Control.Feedback>
                  </Form.Group>  
              </div>     
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

export default CreateLessonSectionModal
