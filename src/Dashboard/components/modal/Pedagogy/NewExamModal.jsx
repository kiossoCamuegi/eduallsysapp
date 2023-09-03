import React, {useEffect, useState} from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Modal, Form, Button} from 'react-bootstrap'
import { Save } from '@mui/icons-material';
import DraggableModal from '../../../../General/components/DraggableModal'; 
import axios from 'axios';
import Hoot from '../../../../General/components/Hoot';
import ClearInputs from '../../../../General/components/ClearInputs'; 
import {CourseDataOptions, AcademicYearDataOptions, ClassroomsDataOptions, CicleDataOptions, GetInstituteCode, AcademiclevelDataOptions, SubjectMultipleSelect, ClassDataOptions, SubjectDataOptions, TimingsDataOptions} from '../../../../General/components/InstituteData'; 
import { RichTextEditor } from '../../../../General/components/RichTextEditor';
import CRValue from '../../../../General/components/CRValue';
import {toast} from 'react-toastify';
import { Update } from '@material-ui/icons';
import { MultiSelect } from 'react-multi-select-component';
import RefreshList from '../../../../General/components/RefreshList'; 


function NewExamModal(props) {
    const [show, setShow] = useState(false);
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({}); 
    const [Select, setSelected] = useState([]);
    const [Founded, SetFounded] = useState(false); 
    const [CurrentClass, setCurrentClass] = useState(null);
    const [CurrentSubject, setCurrentSubject] = useState(null);
    const [CurrentDate, setCurrentDate] = useState(null);
    const [CurrentTime, setCurrentTime] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = () => {
       setShow(true); 
       GET_DATA();
    };
     
    const INPUTS = {
         exam_calendar_class:CRValue("#exam_calendar_class"),  
         exam_calendar_time:CRValue("#exam_calendar_time"),  
         exam_calendar_date:CRValue("#exam_calendar_date"), 
         exam_calendar_subject:CRValue("#exam_calendar_subject")
    }; 

    const FORMURL = [
      Hoot()+"eduallstudentexamcalendarregister/post",
      props.get ? props.get : '',
      props.url ? props.url : ''
    ];

    const GET_DATA = async()=>{
     if(props.update){
       try {
        SetFounded(false);
        const response = await axios.get(FORMURL[1]); 
        if(response.data.length >= 1){   
  
            INPUTS.exam_calendar_class = response.data[0].ed_student_exam_class;
            INPUTS.exam_calendar_time = response.data[0].ed_student_exam_time; 
            INPUTS.exam_calendar_date = response.data[0].ed_student_exam_date;
            INPUTS.exam_calendar_subject = response.data[0].ed_student_exam_subject; 

            
            setCurrentSubject(response.data[0].ed_student_exam_subject);
            setCurrentClass(response.data[0].ed_student_exam_class);
            setCurrentTime(response.data[0].ed_student_exam_time);
            setCurrentDate(response.data[0].ed_student_exam_date);
  
            SetFounded(true); 
          } 
       } catch (error) {
          console.clear();
          console.log(error);
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
      const {exam_calendar_class, exam_calendar_subject,  exam_calendar_date, exam_calendar_time} = form; 
      const NewErrors = {};

      if(INPUTS.exam_calendar_class ===  "" || INPUTS.exam_calendar_class ===  " "){
      if(!exam_calendar_class || exam_calendar_class === '') NewErrors.exam_calendar_class = 'Turma invalida';  
      }else{if(!exam_calendar_class){setField("exam_calendar_class", INPUTS.exam_calendar_class);}} 

      if(INPUTS.exam_calendar_subject ===  "" || INPUTS.exam_calendar_subject ===  " "){
      if(!exam_calendar_subject || exam_calendar_subject === '') NewErrors.exam_calendar_subject = 'Disciplina invalida';  
      }else{if(!exam_calendar_subject){setField("exam_calendar_subject", INPUTS.exam_calendar_subject);}} 

      if(INPUTS.exam_calendar_date ===  "" || INPUTS.exam_calendar_date ===  " "){
      if(!exam_calendar_date || exam_calendar_date === '') NewErrors.exam_calendar_date = 'Data invalida';  
      }else{if(!exam_calendar_date){setField("exam_calendar_date", INPUTS.exam_calendar_date);}} 
 
      if(INPUTS.exam_calendar_time ===  "" || INPUTS.exam_calendar_time ===  " "){
      if(!exam_calendar_time || exam_calendar_time === '') NewErrors.exam_calendar_time = 'Horário invalido';  
      }else{if(!exam_calendar_time){setField("exam_calendar_time", INPUTS.exam_calendar_time);}} 
 

      return NewErrors;
  }
  

    const FormSubmit = (e)=>{  
      e.preventDefault();   
      const formErrors = validateForm();
      if(Object.keys(formErrors).length > 0){
           setErrors(formErrors);
           toast.error("Verifique todos os  campos");   
        }else{
        const SUBMIT_INPUTS = {exam_calendar_class:INPUTS.exam_calendar_class,  exam_calendar_time:INPUTS.exam_calendar_time , 
        exam_calendar_date:INPUTS.exam_calendar_date , exam_calendar_subject:INPUTS.exam_calendar_subject};
                
          if(!props.update){
            console.log(SUBMIT_INPUTS); 
            axios.post(FORMURL[0], SUBMIT_INPUTS).then(()=>{  
              toast.success("Evento registrado com sucesso !");
              setForm({});
              ClearInputs();
              RefreshList(`.el-refresh-list`)
            }).catch((error)=>{toast.error("Lamentamos mas não foi  possivel executar esta ação")}); 
          } else {
            axios.put(FORMURL[2] , SUBMIT_INPUTS)
            .then(()=>{  
              toast.success("Evento atualizado com sucesso !");
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


 

      
    const handleInput = (e)=>{ 
       switch (e.target.id) {
        case "exam_calendar_time":
           INPUTS.exam_calendar_time = e.target.value
           setField("exam_calendar_time", e.target.value);
          break;
          case "exam_calendar_class":
            INPUTS.exam_calendar_class = e.target.value
            setField("exam_calendar_class", e.target.value);
           break;   
          case "exam_calendar_date":
            INPUTS.exam_calendar_date = e.target.value
            setField("exam_calendar_date", e.target.value);
          break; 
          case "exam_calendar_subject":
            INPUTS.exam_calendar_subject = e.target.value
            setField("exam_calendar_subject", e.target.value);
          break;  
          default:
       }
    }
 


  return (
    <div>  
      <div onClick={handleShow}>
            {
              props.toggle_btn ? props.toggle_btn :   <button className='btn btn-main'><AddCircleOutlineIcon/> Adicionar prova ao calendário </button>  
            }
       </div>
      <Modal  className='animate__animated animate__zoomInDown' centered  size='lg' dialogAs={DraggableModal}  show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><h5>{ props.title ? props.title : 'Adicionar prova ao calendário' }  </h5></Modal.Title>
        </Modal.Header>
        <Form onSubmit={FormSubmit}> 
        <Modal.Body className='scrollLimit'>
            {(props.update) ? 
             <>
                {Founded === true  ?
                <>
                 <Form.Group className="mb-3">
                <Form.Label>Disciplina<span className='text-danger ml-2'>*</span></Form.Label>
                <Form.Select  onChange={handleInput} className={!!errors.exam_calendar_subject && 'is-invalid'} value={CurrentSubject} isInvalid={!!errors.exam_calendar_subject}
                id="exam_calendar_subject">
                    <SubjectDataOptions code={CurrentSubject} />
                </Form.Select>
                <Form.Control.Feedback type='invalid'>{errors.exam_calendar_subject}</Form.Control.Feedback>
                </Form.Group>   
                <Form.Group className="mb-3"> 
                <Form.Label>Turma<span className='text-danger ml-2'>*</span></Form.Label>
                   <Form.Select  onChange={handleInput} className={!!errors.exam_calendar_class && 'is-invalid'} value={CurrentClass} isInvalid={!!errors.exam_calendar_class}
                    id="exam_calendar_class">
                    <ClassDataOptions code={CurrentClass} /> 
                </Form.Select>
                <Form.Control.Feedback type='invalid'>{errors.exam_calendar_class}</Form.Control.Feedback>
                </Form.Group>   
               <Form.Group className="mb-3">
                <Form.Label>Data<span className='text-danger ml-2'>*</span></Form.Label>
                    <Form.Control type="date" onChange={handleInput} className={!!errors.exam_calendar_date && 'is-invalid'} value={CurrentDate} isInvalid={!!errors.exam_calendar_date}
                     id="exam_calendar_date"/> 
                    <Form.Control.Feedback type='invalid'>{errors.exam_calendar_date}</Form.Control.Feedback>
                </Form.Group>   
                <Form.Group>
                <Form.Label>Horário</Form.Label>
                    <Form.Select  onChange={handleInput} className={!!errors.exam_calendar_time && 'is-invalid'} value={CurrentTime} isInvalid={!!errors.exam_calendar_time}
                    id="exam_calendar_time">
                    <TimingsDataOptions />
                </Form.Select>
                <Form.Control.Feedback type='invalid'>{errors.exam_calendar_time}</Form.Control.Feedback>
                </Form.Group> 
                </>
                : 
                <h1>Loading....</h1>
                }   
             </>
            :  
            <>
            <Form.Group className="mb-3">
              <Form.Label>Disciplina<span className='text-danger ml-2'>*</span></Form.Label>
              <Form.Select  onChange={handleInput} className={!!errors.exam_calendar_subject && 'is-invalid'} value={form.exam_calendar_subject} isInvalid={!!errors.exam_calendar_subject}
               id="exam_calendar_subject">
                  <SubjectDataOptions code={form.exam_calendar_subject} />
              </Form.Select>
              <Form.Control.Feedback type='invalid'>{errors.exam_calendar_subject}</Form.Control.Feedback>
            </Form.Group>  
            <Form.Group className="mb-3"> 
              <Form.Label>Turma<span className='text-danger ml-2'>*</span></Form.Label>
              <Form.Select  onChange={handleInput} className={!!errors.exam_calendar_class && 'is-invalid'} value={form.exam_calendar_class} isInvalid={!!errors.exam_calendar_class}
               id="exam_calendar_class">
                  <ClassDataOptions code={form.exam_calendar_class} /> 
              </Form.Select>
              <Form.Control.Feedback type='invalid'>{errors.exam_calendar_class}</Form.Control.Feedback>
            </Form.Group>   
          <Form.Group className="mb-3">
              <Form.Label>Data<span className='text-danger ml-2'>*</span></Form.Label>
              <Form.Control type="date" onChange={handleInput} className={!!errors.exam_calendar_date && 'is-invalid'} value={form.exam_calendar_date} isInvalid={!!errors.exam_calendar_date}
               id="exam_calendar_date"/> 
              <Form.Control.Feedback type='invalid'>{errors.exam_calendar_date}</Form.Control.Feedback>
            </Form.Group>   
            <Form.Group>
              <Form.Label>Horário</Form.Label>
              <Form.Select  onChange={handleInput} className={!!errors.exam_calendar_time && 'is-invalid'} value={form.exam_calendar_time} isInvalid={!!errors.exam_calendar_time}
              id="exam_calendar_time">
                   <TimingsDataOptions />
              </Form.Select>
              <Form.Control.Feedback type='invalid'>{errors.exam_calendar_time}</Form.Control.Feedback>
            </Form.Group>    
            </> }
        </Modal.Body>
        <Modal.Footer>
          <div className="ed-space">
            <div></div>
             <div className="ed-flex">
               <Button className='bg-light text-dark' onClick={handleClose}> Cancelar </Button>
               <Button className="btn btn-main ml-2" type="submit">{props.title ? <Update/> : <Save/>}{props.title ? props.title : 'Salvar' }</Button>
             </div>
          </div>
        </Modal.Footer>
        </Form>
      </Modal>
    </div>
  ) 
}

export default NewExamModal
