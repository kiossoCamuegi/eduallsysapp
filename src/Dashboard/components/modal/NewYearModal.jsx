import React, {useState} from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Modal, Form, Button} from 'react-bootstrap'
import { Save } from '@mui/icons-material';
import DraggableModal from '../../../General/components/DraggableModal';
import {toast} from 'react-toastify';
import CRValue from '../../../General/components/CRValue';
import ClearInputs from '../../../General/components/ClearInputs';
import Hoot from '../../../General/components/Hoot';
import axios from 'axios';
import { Update } from '@material-ui/icons';
import { GetInstituteCode } from '../../../General/components/InstituteData';
import RefreshList from '../../../General/components/RefreshList';

function NewYearModal(props){
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false); 

  const handleShow = () => {
    setShow(true);
    GET_DATA(); 
  }

  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
   

  
 const FORMURL = [
    Hoot()+"eduallacademicyeargisterapi/post/",
    props.get ? props.get : '',
    props.url ? props.url : ''
 ];

  const INPUTS = {
       title:CRValue("#year_title"),
       date_start:CRValue("#year_date_start"),
       date_finish:CRValue("#year_date_finish"), 
       institute_code:GetInstituteCode()
  }; 

  const GET_DATA = async()=>{
   if(props.update){
    const response = await axios.get(FORMURL[1]); 
     if(response.data.length >= 1){   
          document.querySelector("#year_title").value =  response.data[0].ed_academic_year_title; 
          document.querySelector("#year_date_start").value  = response.data[0].ed_academic_year_startDate;
          document.querySelector("#year_date_finish").value  = response.data[0].ed_academic_year_endDate;
  
          INPUTS.title =  response.data[0].ed_academic_year_title;
          INPUTS.date_start = response.data[0].ed_academic_year_startDate;
          INPUTS.date_finish = response.data[0].ed_academic_year_endDate; 
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
    const {year_title, year_date_start, year_date_finish} = form; 
    const NewErrors = {};

    if(INPUTS.title ===  "" || INPUTS.title ===  " "){
    if(!year_title || year_title === '') NewErrors.ed_academic_year_title = 'Valor invalido';  
    }else{if(!year_title){setField("year_title", INPUTS.title);}} 

    if(INPUTS.date_start ===  "" || INPUTS.date_start ===  " "){
    if(!year_date_start || year_date_start === '') NewErrors.year_date_start = 'Data  invalida';  
    }else{if(!year_date_start){setField("year_date_start", INPUTS.date_start);}}

    if(INPUTS.date_finish ===  "" || INPUTS.date_finish ===  " "){
    if(!year_date_finish || year_date_finish === '') NewErrors.year_date_finish = 'Data  invalida';  
    }else{if(!year_date_finish){setField("year_date_finish", INPUTS.date_finish);}}
 
  
    if(year_date_start !== undefined && year_date_finish !== undefined  && 
        year_date_start !== null && year_date_finish !== null) { 
          let year_1 = year_date_start.split('-')[0];
          let year_2 = year_date_finish.split('-')[0]; 
          if(year_2 - year_1 > 1){
            NewErrors.year_date_finish = 'O ano académico não pode ser muito extenso';
          }
    }
 
    
    if(!year_date_start === year_date_finish) NewErrors.year_date_start = 'As datas têm de ser diferentes'; 
    return NewErrors;
}


  const FormSubmit = (e)=>{  
     e.preventDefault();   
     const formErrors = validateForm();
    if(Object.keys(formErrors).length > 0){
          setErrors(formErrors);
          toast.error("Verifique todos os  campos");    
      }else{  
        const SUBMIT_INPUTS = {title:INPUTS.title, year_date_start:INPUTS.date_start,
          year_date_finish:INPUTS.date_finish, institute_code:INPUTS.institute_code} 
        
        if (!props.update) {
          axios.post(FORMURL[0] , SUBMIT_INPUTS)
          .then(()=>{  
            toast.success("Ano académico adicionada com sucesso !");
            setForm({});
            ClearInputs();
            RefreshList()
          }).catch((error)=>{toast.error("Lamentamos mas não foi  possivel executar esta ação")}); 
        } else {
           axios.put(FORMURL[2] , SUBMIT_INPUTS)
        .then(()=>{  
           toast.success("Ano académico atualizado com sucesso !");
           setForm({});
           ClearInputs(); 
           RefreshList()
         }).catch((error)=>{toast.error("Lamentamos mas não foi  possivel executar esta ação")}); 
        }
      }  
  };

    
  const handleInput = (e)=>{ 
     switch (e.target.id) { 
        case "year_title":
          setField("year_title", e.target.value) 
          INPUTS.title = e.target.value
         break;
         case "year_date_start":
          setField("year_date_start", e.target.value) 
          INPUTS.date_start = e.target.value
         break;
         case "year_date_finish":
          setField("year_date_finish", e.target.value) 
          INPUTS.date_finish = e.target.value;
         break;  
         default:
     }
  }
    return (
        <div>
          <div onClick={handleShow}>
            {
              props.toggle_btn ? props.toggle_btn : <button className='btn btn-main'><AddCircleOutlineIcon/> Registrar ano Académica </button>
            }
         </div>
          <Modal className='animate__animated animate__zoomInDown'  centered dialogAs={DraggableModal}  size='lg' show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title><h5>{ props.title ? props.title : 'Registrar ' } ano Académica</h5></Modal.Title>
            </Modal.Header>
            <Form onSubmit={FormSubmit}>
            <Modal.Body className='scrollLimit'>
                <Form.Group className="mb-3"  >
                  <Form.Label>Nome do ano académico<span className="text-danger ml-2">*</span> </Form.Label>
                  <Form.Control  onChange={handleInput} className={!!errors.ed_academic_year_title && 'is-invalid'} value={form.ed_academic_year_title} isInvalid={!!errors.ed_academic_year_title}
                  type="text" maxLength='4' id="year_title" autoFocus/>
                  <Form.Control.Feedback type='invalid'>{errors.ed_academic_year_title}</Form.Control.Feedback>
                </Form.Group> 
                <Form.Group className="mb-3"  >
                  <Form.Label>Data de inicialização<span className="text-danger ml-2">*</span> </Form.Label>
                  <Form.Control onChange={handleInput} className={!!errors.year_date_start && 'is-invalid'} value={form.year_date_start} isInvalid={!!errors.year_date_start}
                  type="date" id="year_date_start" autoFocus/>
                  <Form.Control.Feedback type='invalid'>{errors.year_date_start}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3"  >
                  <Form.Label>Data de finalização<span className="text-danger ml-2">*</span> </Form.Label>
                  <Form.Control onChange={handleInput} className={!!errors.year_date_finish && 'is-invalid'} value={form.year_date_finish} isInvalid={!!errors.year_date_finish}
                  type="date" id="year_date_finish" autoFocus/>
                  <Form.Control.Feedback type='invalid'>{errors.year_date_finish}</Form.Control.Feedback>
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

export default NewYearModal