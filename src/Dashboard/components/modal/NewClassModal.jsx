import React, {useEffect, useState} from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Modal, Form, Button} from 'react-bootstrap'
import { Save } from '@mui/icons-material';
import DraggableModal from '../../../General/components/DraggableModal'; 
import axios from 'axios';
import Hoot from '../../../General/components/Hoot';
import ClearInputs from '../../../General/components/ClearInputs'; 
import {CourseDataOptions, AcademicYearDataOptions, ClassroomsDataOptions, CicleDataOptions, GetInstituteCode, AcademiclevelDataOptions, SubjectMultipleSelect} from '../../../General/components/InstituteData'; 
import { RichTextEditor } from '../../../General/components/RichTextEditor';
import CRValue from '../../../General/components/CRValue';
import {toast} from 'react-toastify';
import { Update } from '@material-ui/icons';
import { MultiSelect } from 'react-multi-select-component';
import RefreshList from '../../../General/components/RefreshList';


function NewClassModal(props){
    const [show, setShow] = useState(false);
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({}); 
    const [Select, setSelected] = useState([]);
    const [SubjectError, setSubjectError] = useState(null);
    const [Subjects, SetSubjects] = useState('');
    const Periods = ["Manha", "Tarde"];

    const handleClose = () => setShow(false);
    const handleShow = () => {
       setShow(true); 
       GET_DATA();
    };
     
    const INPUTS = {
         class_title:CRValue("#class_title"),  
         class_course:CRValue("#class_course"), 
         class_period:CRValue("#class_period"), 
         class_year:CRValue("#class_year"), 
         class_room:CRValue("#class_room"), 
         class_cicle:CRValue("#class_cicle"), 
         class_academic_level:CRValue("#class_academic_level"), 
         class_description: JSON.stringify(CRValue(".modal form textarea")),
         class_subjects:Subjects,
         institute_code:GetInstituteCode()
    }; 

    const FORMURL = [
      Hoot()+"eduallclassregisterapi/post/",
      props.get ? props.get : '',
      props.url ? props.url : ''
    ];

    const GET_DATA = async()=>{
     if(props.update){
      const response = await axios.get(FORMURL[1]); 
      if(response.data !=null){
        if(response.data[0] != null){
          document.querySelector("#class_title").value = response.data[0].ed_class_title; 
           document.querySelector("#class_course").value = response.data[0].ed_class_course; 
          document.querySelector("#class_period").value  = Periods[Math.floor(response.data[0].ed_class_period)]; 
          document.querySelector("#class_year").value = response.data[0].ed_class_year; 
          document.querySelector("#class_room").value  = response.data[0].ed_class_room; 
          document.querySelector("#class_cicle").value = response.data[0].ed_class_cicle;  
          document.querySelector("#class_academic_level").value = response.data[0].ed_class_academic_level;  
          
          if(document.querySelectorAll(".public-DraftStyleDefault-block").length >= 1){ 
          document.querySelector(".modal form textarea").value =  response.data[0].ed_class_description;} 

          INPUTS.class_title = response.data[0].ed_class_title
           INPUTS.class_course = response.data[0].ed_class_course
          INPUTS.class_period = response.data[0].ed_class_period
          INPUTS.class_year = response.data[0].ed_class_year
          INPUTS.class_room = response.data[0].ed_class_room
          INPUTS.class_cicle = response.data[0].ed_class_cicle
          INPUTS.class_academic_level = response.data[0].ed_class_academic_level
          INPUTS.class_description = response.data[0].class_description
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
      const {class_title, class_cicle, class_subjects, class_room, class_period, class_course, class_year, class_academic_level} = form; 
      const NewErrors = {};

      if(INPUTS.class_title ===  "" || INPUTS.class_title ===  " "){
      if(!class_title || class_title === '') NewErrors.class_title = 'Turma invalida';  
      }else{if(!class_title){setField("class_title", INPUTS.class_title);}} 

      if(INPUTS.class_cicle ===  "" || INPUTS.class_cicle ===  " "){
      if(!class_cicle || class_cicle === '') NewErrors.class_cicle = 'Ciclo académico invalido';  
      }else{if(!class_cicle){setField("class_cicle", INPUTS.class_cicle);}} 

      if(INPUTS.class_room ===  "" || INPUTS.class_room ===  " "){
      if(!class_room || class_room === '') NewErrors.class_room = 'Sala invalida';  
      }else{if(!class_room){setField("class_room", INPUTS.class_room);}} 
 
      if(INPUTS.class_period ===  "" || INPUTS.class_period ===  " "){
      if(!class_period || class_period === '') NewErrors.class_period = 'Periodo invalido';  
      }else{if(!class_period){setField("class_period", INPUTS.class_period);}} 
 

       if(INPUTS.class_subjects ===  "" || INPUTS.class_subjects ===  " "){
      if(!class_subjects || class_subjects === '') NewErrors.class_subjects = 'Disciplinas invalida';  
      }else{if(!class_subjects){setField("class_subjects", INPUTS.class_subjects);}} 


      if(INPUTS.class_year ===  "" || INPUTS.class_year ===  " "){
      if(!class_year || class_year === '') NewErrors.class_year = 'Ano académico invalido';  
      }else{if(!class_year){setField("class_year", INPUTS.class_year);}} 

      if(INPUTS.class_academic_level ===  "" || INPUTS.class_academic_level ===  " "){
      if(!class_academic_level || class_academic_level === '') NewErrors.class_academic_level = 'Classe invalida';  
      }else{if(!class_year){setField("class_academic_level", INPUTS.class_academic_level);}} 
  
      return NewErrors;
  }
  
   const SUBMIT_INPUTS = {class_title:INPUTS.class_title,  class_subjects:INPUTS.class_subjects, class_course:INPUTS.class_course , class_period:INPUTS.class_period ,
   class_year:INPUTS.class_year, class_room:INPUTS.class_room , class_cicle:INPUTS.class_cicle , class_academic_level:INPUTS.class_academic_level , class_description:INPUTS.class_description};

    const FormSubmit = (e)=>{  
      e.preventDefault();   
      const formErrors = validateForm();
      if(Object.keys(formErrors).length > 0){
           setErrors(formErrors);
           toast.error("Verifique todos os  campos");   
        }else{
          if(!props.update){
            console.log(SUBMIT_INPUTS);
            
            axios.post(FORMURL[0], SUBMIT_INPUTS).then(()=>{  
              toast.success("Turma registrada com sucesso !");
              setForm({});
              ClearInputs();
              RefreshList(`.el-refresh-list`)
            }).catch((error)=>{toast.error("Lamentamos mas não foi  possivel executar esta ação")}); 
          } else {
            axios.put(FORMURL[2] , SUBMIT_INPUTS)
            .then(()=>{  
              toast.success("Turma atualizada com sucesso !");
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



    function selectedSubjects(e){
         setSelected(e) 
         setField("feepayment_months", "month");
       var months = "";
       for (let i = 0; i < e.length; i++) {
             months += ","+e[i].value;
       } 
       SetSubjects(months);
    }


      
    const handleInput = (e)=>{ 
       switch (e.target.id) {
        case "class_course":
           INPUTS.class_course = e.target.value
           setField("class_course", e.target.value);
          break;
          case "class_title":
            INPUTS.class_title = e.target.value
            setField("class_title", e.target.value);
           break;  
          case "class_period":
            INPUTS.class_period = e.target.value
            setField("class_period", e.target.value);
          break;
          case "class_room":
            INPUTS.class_room = e.target.value
            setField("class_room", e.target.value);
          break;
          case "class_year":
            INPUTS.class_year = e.target.value
            setField("class_year", e.target.value);
          break;
          case "class_cicle":
            INPUTS.class_cicle = e.target.value
            setField("class_cicle", e.target.value);
          break; 
          case "class_academic_level":
            INPUTS.class_academic_level = e.target.value
            setField("class_academic_level", e.target.value);
          break; 
          default:
       }
    }
 


  return (
    <div>  
      <div onClick={handleShow}>
            {
              props.toggle_btn ? props.toggle_btn :   <button className='btn btn-main'><AddCircleOutlineIcon/> Registrar turma</button>  
            }
       </div>
      <Modal  className='animate__animated animate__zoomInDown' centered  size='lg' dialogAs={DraggableModal}  show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><h5>{ props.title ? props.title : 'Registrar ' } Turma</h5></Modal.Title>
        </Modal.Header>
        <Form onSubmit={FormSubmit}> 
        <Modal.Body className='scrollLimit'>
            <Form.Group className="mb-3" >
              <Form.Label>Nome da turma<span className='text-danger ml-2'>*</span></Form.Label>
              <Form.Control onChange={handleInput} className={!!errors.class_title && 'is-invalid'} value={form.class_title} isInvalid={!!errors.class_title}
              type="text" id="class_title" />
              <Form.Control.Feedback type='invalid'>{errors.class_title}</Form.Control.Feedback>
            </Form.Group>  
            <Form.Group className="mb-3">
              <Form.Label>Curso</Form.Label>
              <Form.Select  onChange={handleInput} className={!!errors.class_course && 'is-invalid'} value={form.class_course} isInvalid={!!errors.class_course}
              id="class_course">
                   <CourseDataOptions/>
              </Form.Select>
              <Form.Control.Feedback type='invalid'>{errors.class_course}</Form.Control.Feedback>
            </Form.Group>  
            <Form.Group className="mb-3">
              <Form.Label>Periodo lectivo<span className='text-danger ml-2'>*</span></Form.Label>
              <Form.Select  onChange={handleInput} className={!!errors.class_period && 'is-invalid'} value={form.class_period} isInvalid={!!errors.class_period}
              id="class_period">
                 <option value="0" selected>Manhã</option>
                 <option value="1">Tarde</option>
              </Form.Select>
              <Form.Control.Feedback type='invalid'>{errors.class_period}</Form.Control.Feedback>
            </Form.Group>  
            <Form.Group className="mb-3">
              <Form.Label>Ano lectivo<span className='text-danger ml-2'>*</span></Form.Label>
              <Form.Select  onChange={handleInput} className={!!errors.class_year && 'is-invalid'} value={form.class_year} isInvalid={!!errors.class_year}
              id="class_year">
                   <AcademicYearDataOptions/>
              </Form.Select>
              <Form.Control.Feedback type='invalid'>{errors.class_year}</Form.Control.Feedback>
            </Form.Group>  
            <Form.Group className="mb-3">
              <Form.Label>Sala de aula<span className='text-danger ml-2'>*</span></Form.Label>
              <Form.Select  onChange={handleInput} className={!!errors.class_room && 'is-invalid'} value={form.class_room} isInvalid={!!errors.class_room}
               id="class_room">
                  <ClassroomsDataOptions/>
              </Form.Select>
              <Form.Control.Feedback type='invalid'>{errors.class_room}</Form.Control.Feedback>
            </Form.Group>  
            <Form.Group className="mb-3">
              <Form.Label>Ciclo<span className='text-danger ml-2'>*</span></Form.Label>
              <Form.Select  onChange={handleInput} className={!!errors.class_cicle && 'is-invalid'} value={form.class_cicle} isInvalid={!!errors.class_cicle}
               id="class_cicle">
                  <CicleDataOptions/>
              </Form.Select>
              <Form.Control.Feedback type='invalid'>{errors.class_cicle}</Form.Control.Feedback>
            </Form.Group>  
            <Form.Group className="mb-3">
              <Form.Label>Classe<span className='text-danger ml-2'>*</span></Form.Label>
              <Form.Select  onChange={handleInput} className={!!errors.class_academic_level && 'is-invalid'} value={form.class_academic_level} isInvalid={!!errors.class_academic_level}
               id="class_academic_level">
                  <AcademiclevelDataOptions/>
              </Form.Select>
              <Form.Control.Feedback type='invalid'>{errors.class_academic_level}</Form.Control.Feedback>
            </Form.Group>  
            <Form.Group className="mb-3"  >
            <Form.Label>Selecione as disciplinas<span className="text-danger ml-2">*</span> </Form.Label>  
              <MultiSelect 
                  options={SubjectMultipleSelect()[0]}
                  value={Select}
                  className={SubjectError !== null ? 'border-red' : ''}
                  onChange={selectedSubjects}
                  labelledBy='select'
              /> 
              <Form.Control.Feedback type='invalid'>  </Form.Control.Feedback>
          </Form.Group> 
            <Form.Group className="mb-3">
              <Form.Label >Descrição </Form.Label>
              <div className="class-description-input">
                   <RichTextEditor/>
              </div>
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

export default NewClassModal