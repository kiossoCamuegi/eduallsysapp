import React, {useEffect, useState} from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Modal, Form, Button} from 'react-bootstrap'
import { Save } from '@mui/icons-material';
import DraggableModal from '../../../General/components/DraggableModal'; 
import axios from 'axios';
import Hoot from '../../../General/components/Hoot';
import ClearInputs from '../../../General/components/ClearInputs'; 
import {CourseDataOptions, AcademicYearDataOptions, ClassroomsDataOptions, CicleDataOptions, GetInstituteCode, AcademiclevelDataOptions} from '../../../General/components/InstituteData'; 
import { RichTextEditor } from '../../../General/components/RichTextEditor';
import CRValue from '../../../General/components/CRValue';
import {toast} from 'react-toastify';
import { Update } from '@material-ui/icons';


import React from 'react'

function ParentDescriptionModal() {
    const [show, setShow] = useState(false);
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({}); 
    const Periods = ["AM", "PM"];

    const handleClose = () => setShow(false);
    const handleShow = () => {
       setShow(true); 
       GET_DATA();
    };
     
    const INPUTS = {
         class_title:CRValue("#class_title"), 
         class_code:CRValue("#class_code"), 
         class_course:CRValue("#class_course"), 
         class_period:CRValue("#class_period"), 
         class_year:CRValue("#class_year"), 
         class_room:CRValue("#class_room"), 
         class_cicle:CRValue("#class_cicle"), 
         class_academic_level:CRValue("#class_academic_level"), 
         class_description: JSON.stringify(CRValue(".modal form textarea")),
         institute_code:GetInstituteCode()
    }; 

    const FORMURL = [
      Hoot()+"eduallclassregisterapi/post/",
      props.get ? props.get : '',
      props.url ? props.url : ''
    ];

    const GET_DATA = async()=>{
      const response = await axios.get(FORMURL[1]); 
      if(response.data !=null){
        if(response.data[0] != null){
          document.querySelector("#class_title").value = response.data[0].ed_class_title; 
          document.querySelector("#class_code").value  = response.data[0].ed_class_code; 
          document.querySelector("#class_course").value = response.data[0].ed_class_course; 
          document.querySelector("#class_period").value  = Periods[Math.floor(response.data[0].ed_class_period)]; 
          document.querySelector("#class_year").value = response.data[0].ed_class_year; 
          document.querySelector("#class_room").value  = response.data[0].ed_class_room; 
          document.querySelector("#class_cicle").value = response.data[0].ed_class_cicle;  
          document.querySelector("#class_academic_level").value = response.data[0].ed_class_academic_level;  
          
          if(document.querySelectorAll(".public-DraftStyleDefault-block").length >= 1){ 
          document.querySelector(".modal form textarea").value =  response.data[0].ed_class_description;} 
 
        }
      }
  }

 
  return (
    <div>  
      <div onClick={handleShow}>
            {
              props.toggle_btn ? props.toggle_btn :   <button className='btn btn-main'><AddCircleOutlineIcon/> Registrar turma</button>  
            }
       </div>
      <Modal className='animate__animated animate__zoomInDown'  centered  size='lg' dialogAs={DraggableModal}  show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><h5>{ props.title ? props.title : 'Registrar ' } Turma</h5></Modal.Title>
        </Modal.Header>
        <Form onSubmit={FormSubmit}> 
        <Modal.Body className='scrollLimit'>
            
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

export default ParentDescriptionModal