import React, {useState, useEffect} from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Modal, Form, Button} from 'react-bootstrap'
import { Save } from '@mui/icons-material';
import DraggableModal from '../../../General/components/DraggableModal';
import {toast} from 'react-toastify';
import CRValue from '../../../General/components/CRValue';
import ClearInputs from '../../../General/components/ClearInputs';
import Hoot from '../../../General/components/Hoot';
import axios from 'axios';
import CourseDataOptions, { GetInstituteCode } from '../../../General/components/InstituteData'; 
import { SettingsApplicationsRounded, Update } from '@material-ui/icons';
import RefreshList from '../../../General/components/RefreshList';

 
 

function NewCourseModal(props) { 
 
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});  
  const Data = [];

  const handleClose = () => setShow(false);
  const handleShow = ()=> {
      setShow(true); 
      GET_DATA(); 
  };  

 
  const FORMURL = [
    Hoot()+"eduallcourseregisterapi/post/",
    props.url ? props.url : ''
  ]

  const INPUTS = {
       course_title:CRValue("#course_title"),
       course_category:CRValue("#course_category"),
       course_code:CRValue("#course_code"), 
       institute_code:GetInstituteCode()
  };   
 

  const GET_DATA = async()=>{
    if(props.update){
      const response = await axios.get(props.get); 
      if(response.data !== null){ 

        console.log(response.data[0]);

        document.querySelector("#course_title").value = response.data[0].ed_course_title;
        document.querySelector("#course_category").value = response.data[0].ed_course_category; 

        INPUTS.course_title =  response.data[0].ed_course_title
        INPUTS.course_category =  response.data[0].ed_course_category  
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
    const {course_title, course_code, course_category} = form; 
    const NewErrors = {};
    console.clear();
 
      if(INPUTS.course_title ===  "" || INPUTS.course_title ===  " "){
      if(!course_title || course_title === '') NewErrors.course_title = 'Curso  invalido';  
      }else{if(!course_title){setField("course_title", INPUTS.course_title);}}

      if(INPUTS.course_category ===  "" || INPUTS.course_category ===  " "){
      if(!course_category || course_category === '') NewErrors.course_category = 'Categoria  invalida'; 
      }else{if(!course_category){setField("course_category", INPUTS.course_category);}}  
 
    return NewErrors;
}


  const FormSubmit = (e)=>{  
     e.preventDefault();   
     const formErrors = validateForm();
    if(Object.keys(formErrors).length > 0){
          setErrors(formErrors);
          console.log(formErrors);
          toast.error("Verifique todos os  campos");    
      }else{  
         if(!props.update) {
          axios.post(FORMURL[0] , {
            course_title:INPUTS.course_title ,  
            course_code:INPUTS.course_code ,  
            course_category:INPUTS.course_category ,  
            institute_code:INPUTS.institute_code
          },{

            "Content-Type": "application/json", 
            "Access-Control-Allow-Origin" : FORMURL[0], 
            "Access-Control-Allow-Methods" : "POST, GET, OPTIONS"
          })
          .then(()=>{  
             toast.success("Curso adicionado com sucesso !");
             setForm({});
             ClearInputs();
             RefreshList(`.el-refresh-list`)
          })
          .catch((error)=>{
            toast.error("Lamentamos mas não foi  possivel executar esta ação")
          }); 
         } else {
          axios.put(FORMURL[1] , {
            course_title:INPUTS.course_title ,  
            course_code:INPUTS.course_code ,  
            course_category:INPUTS.course_category ,   
          })
          .then(()=>{  
              toast.success("Curso atualizado com sucesso !");
              setForm({});
              ClearInputs();
              RefreshList(`.el-refresh-list`)
              setTimeout(() => {
                handleClose();
              }, 1000);
          })
          .catch((error)=>{
            toast.error("Lamentamos mas não foi  possivel executar esta ação")
          }); 
        }
      }  
  };

    
  const handleInput = (e)=>{ 
     switch (e.target.id) { 
        case "course_title":
          setField("course_title", e.target.value) 
          INPUTS.course_title = e.target.value
         break; 
         case "course_code":
          setField("course_code", e.target.value) 
          INPUTS.course_code = e.target.value
         break; 
         case "course_category":
          setField("course_category", e.target.value) 
          INPUTS.course_category = e.target.value
         break;  
       }
  }



  return (
    <div>
          <div onClick={handleShow}>
            {
              props.toggle_btn ? props.toggle_btn :  <button className='btn btn-main'><AddCircleOutlineIcon/> Registrar curso </button> 
            }
          </div>
          <Modal size='lg' centered  className='animate__animated animate__zoomInDown'  dialogAs={DraggableModal}  show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title><h5> { props.title ? props.title+' Curso' : 'Registrar curso' }  </h5></Modal.Title>
            </Modal.Header>
            <Form onSubmit={FormSubmit}>
            <Modal.Body className='scrollLimit'> 
            <Form.Group className="mb-3">
              <Form.Label>Nome do curso<span className="text-danger ml-2">*</span> </Form.Label>
              <Form.Control  type="text"  onChange={handleInput} className={!!errors.course_title && 'is-invalid'} value={form.course_title} 
              isInvalid={!!errors.course_title} id="course_title" />
              <Form.Control.Feedback type='invalid'>{errors.course_title}</Form.Control.Feedback>
          </Form.Group> 
          <Form.Group className="mb-3" >
              <Form.Label>Categoria do curso<span className="text-danger ml-2">*</span> </Form.Label>
              <Form.Select onChange={handleInput} className={!!errors.course_category && 'is-invalid'} value={form.course_category} 
              isInvalid={!!errors.course_category} id="course_category" >
                  <option value="1">Designer</option>
                  <option value="2">Arte</option>
                  <option value="3">Engenharia</option>
                  <option value="4">Saude</option>
                  <option value="5">Ciencias</option>
              </Form.Select>
              <Form.Control.Feedback type='invalid'>{errors.course_category}</Form.Control.Feedback>
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

export default NewCourseModal