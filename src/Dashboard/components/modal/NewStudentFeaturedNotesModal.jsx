import React, {useEffect, useState} from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Modal, Form, Button, Badge} from 'react-bootstrap'
import { Save } from '@mui/icons-material';
import DraggableModal from '../../../General/components/DraggableModal'; 
import axios from 'axios';
import Hoot from '../../../General/components/Hoot';
import ClearInputs from '../../../General/components/ClearInputs'; 
import {CourseDataOptions, AcademicYearDataOptions, ClassroomsDataOptions, CicleDataOptions, GetInstituteCode, AcademiclevelDataOptions, SubjectMultipleSelect, GetSubject, GetClass, GetClasstitle_byclass} from '../../../General/components/InstituteData'; 
import { RichTextEditor } from '../../../General/components/RichTextEditor';
import CRValue from '../../../General/components/CRValue';
import {toast} from 'react-toastify';
import { Update } from '@material-ui/icons';
import { MultiSelect } from 'react-multi-select-component';
import RefreshList from '../../../General/components/RefreshList';
import Loader from '../../../General/components/Loader';
import { styled } from 'styled-components';

function NewStudentFeaturedNotesModal(props) {
    const [show, setShow] = useState(false);
    const [Action, setAction] = useState(null);
    const [form, setForm] = useState({});
    const [ID, setID] = useState(null);
    const [errors, setErrors] = useState({}); 
    const [Select, setSelected] = useState([]);
    const [SubjectError, setSubjectError] = useState(null);
    const [Subjects, SetSubjects] = useState('');
    const Periods = ["Manha", "Tarde"];

    const handleClose = () => {
      setShow(false);
      setAction(null);
    }
    const handleShow = () => {
       setShow(true); 
       GET_DATA();
    };
     
    const INPUTS = {
         student_featured_code:props.data.student ,  
         student_featured_subject:props.data.subject, 
         student_featured_class:props.data.class , 
         student_featured_score:CRValue("#student_featured_score"),  
    }; 

    const FORMURL = [
      Hoot()+"eduallstudentfeaturedscoreregister/post", 
      props.get ? props.get : '',
      props.url ? props.url : '',
    ];


    const GET_DATA = async()=>{ 
     try {
       const CheckData = await axios.get(FORMURL[1]); 
       if(CheckData.data.length >= 1){
         setAction(0);
         setID(CheckData.data[0].ed_student_featured_note_id); 
         setField("student_featured_score", CheckData.data[0].ed_student_featured_note_score);
       }else{
         setAction(1);
       }
     } catch (error) {
      
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
      const {student_featured_score, student_featured_subject, student_featured_class, student_featured_code } = form; 
      const NewErrors = {};

      if(INPUTS.student_featured_score ===  "" || INPUTS.student_featured_score ===  " "){
      if(!student_featured_score || student_featured_score === '') NewErrors.student_featured_score = 'Nota Inavalida';  
      }else{if(!student_featured_score){setField("student_featured_score", INPUTS.student_featured_score);}}  

      if(INPUTS.student_featured_score*1 > props.data.maxvalue){
       NewErrors.student_featured_score = 'Nota Inavalida';  
      }else{if(!student_featured_score){setField("student_featured_score", INPUTS.student_featured_score);}}  


    if(INPUTS.student_featured_subject ===  "" || INPUTS.student_featured_subject ===  " "){
    if(!student_featured_subject || student_featured_subject === '') NewErrors.student_featured_subject = 'Disciplina invalida';  
    }else{if(!student_featured_subject){setField("student_featured_subject", INPUTS.student_featured_subject);}}  

    if(INPUTS.student_featured_class ===  "" || INPUTS.student_featured_class ===  " "){
    if(!student_featured_class || student_featured_class === '') NewErrors.student_featured_class = 'Classe invalida';  
    }else{if(!student_featured_class){setField("student_featured_class", INPUTS.student_featured_class);}}  

    if(INPUTS.student_featured_code ===  "" || INPUTS.student_featured_code ===  " "){
    if(!student_featured_code || student_featured_code === '') NewErrors.student_featured_code = 'Estudante invalido';  
    }else{if(!student_featured_code){setField("student_featured_code", INPUTS.student_featured_code);}}  
            

    return NewErrors;
  }
  
 



    const FormSubmit = (e)=>{  
      e.preventDefault();     
     const formErrors = validateForm();
     if(Object.keys(formErrors).length > 0){
          setErrors(formErrors);
          toast.error("Verifique todos os  campos");   
       }else{
         if(Action === 1){ 
          
 
          try {
            axios.post(FORMURL[0], INPUTS).then((da)=>{  
              console.log(da)
              toast.success("Nota lançada com sucesso !");
              setForm({});
              ClearInputs();
              RefreshList(`.el-refresh-list`);
            }).catch((error)=>{toast.error("Lamentamos mas não foi  possivel executar esta ação")}); 
          } catch (error) {
            toast.error("Lamentamos mas não foi  possivel executar esta ação");
          }
           

         } else {

          if(ID !== null){ 
            console.log(INPUTS);
            console.log(FORMURL[2]+ID);

            
            axios.put(FORMURL[2]+ID, INPUTS).then((da)=>{  
              console.log(da)
              toast.success("Nota atualizada com sucesso !");
              setForm({});
              ClearInputs();
              RefreshList(`.el-refresh-list`);
            }).catch((error)=>{toast.error("Lamentamos mas não foi  possivel executar esta ação")});   
            
          }else{
            console.log("error");
            toast.error("Lamentamos mas não foi  possivel executar esta ação")
          }


         }
       }   
      
    };


 

      
    const handleInput = (e)=>{ 
       switch (e.target.id) {
          case "student_featured_score":
            INPUTS.student_featured_score = e.target.value
            setField("student_featured_score", e.target.value);
           break;  
          default:
       }
    }
 


  return (
    <div>  
      <div onClick={handleShow}>
            {
              props.toggle_btn ? props.toggle_btn :   <button className='btn btn-main'><AddCircleOutlineIcon/> Registrar nota</button>  
            }
       </div>
      <Modal  className='animate__animated animate__zoomInDown' centered  size='lg' dialogAs={DraggableModal}  show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          {Action !== null ? <Modal.Title><h5>{ Action === 0 ? "Atualizar" : 'Adicionar' }  nota do recurso</h5></Modal.Title>  : <></> }
        </Modal.Header>
        <Form onSubmit={FormSubmit}> 
        <Modal.Body className='scrollLimit'>
        {Action !== null ? <> 

            <Form.Group className="mb-3" >
              <Form.Label>Nota do recurso<span className='text-danger ml-2'>*</span></Form.Label>
              <Form.Control onChange={handleInput} className={!!errors.student_featured_score && 'is-invalid'} value={form.student_featured_score} isInvalid={!!errors.student_featured_score}
              type="number" required   min="0"  max={props.data.maxvalue} id="student_featured_score" />
              <Form.Control.Feedback type='invalid'>{errors.student_featured_score}</Form.Control.Feedback>
            </Form.Group>   

            <div className="ed-flex mt-2">
                <Badge className='bg-main-light'>Disciplina : <GetSubject ID={props.data.subject} /></Badge>
                <div className="ml-2"> 
                    <Badge className='bg-main-light'>Classe : <GetClasstitle_byclass ID={props.data.class } /></Badge>
                </div>
            </div>

            </> 
            :
            <>
                <LoaderContainer>
                <Loader absolute small /> 
            </LoaderContainer>
            </> 
           }
        </Modal.Body>
        <Modal.Footer>
          <div className="ed-space">
              <div>

              </div>
              <div className="ed-flex">
                 <Button className='bg-light text-dark' onClick={handleClose}> Cancelar </Button>
                 <Button className="btn btn-main ml-2" type="submit">{Action === 0 ? <Update/> : <Save/>}  {Action === 0 ? "Atualizar" : 'Salvar'}</Button>
              </div>
          </div>
        </Modal.Footer>
        </Form>
      </Modal>
    </div>
  )
}


const LoaderContainer = styled.div`
  width:100%;
  min-height:300px;
  padding:30px;
  display:flex;
  align-items:center;
  justify-content:center; 
`;


export default NewStudentFeaturedNotesModal

