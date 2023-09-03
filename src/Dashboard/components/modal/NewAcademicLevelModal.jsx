import React, {useEffect, useState} from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Modal, Form, Button} from 'react-bootstrap'
import { Save } from '@mui/icons-material';
import DraggableModal from '../../../General/components/DraggableModal'; 
import axios from 'axios';
import Hoot from '../../../General/components/Hoot';
import ClearInputs from '../../../General/components/ClearInputs';   
import CRValue from '../../../General/components/CRValue';
import {toast} from 'react-toastify';
import { Update } from '@material-ui/icons';
import { GetInstituteCode } from '../../../General/components/InstituteData';
import RefreshList from '../../../General/components/RefreshList';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';


function NewAcademicLevelModal(props) {
    const [show, setShow] = useState(false);
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});
    const [ForExam, setForExam]  = useState(0);
    const [ForFt, setForFt]  = useState(0); 

    const handleClose = () => setShow(false);
    const handleShow = () => {
      setShow(true); 
      GET_DATA();
    };
     
    const INPUTS = {
         academic_level_title:CRValue("#academic_level_title"),  
         academic_level_forExam:ForExam,
         academic_level_forFt:ForFt,
         academic_level_avaliationtype_endat:CRValue("#academic_level_avaliationtype_endat")
    }; 

    const FORMURL = [
      Hoot()+"eduallregisteracademiclevel/post",
      props.get ? props.get : '',
      props.url ? props.url : ''
    ];

    const GET_DATA = async()=>{
      if(props.update){
      const response = await axios.get(FORMURL[1]); 
      if(response.data !=null){
        if(response.data[0] != null){ 
          document.querySelector("#academic_level_title").value = response.data[0].ed_academic_level_title;  
          INPUTS.academic_level_title = response.data[0].ed_academic_level_title ;

          document.querySelector("#academic_level_avaliationtype_endat").value = response.data[0].ed_academic_level_avaliationtype_endat;
          INPUTS.academic_level_avaliationtype_endat = response.data[0].ed_academic_level_avaliationtype_endat;
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
      const {academic_level_title, academic_level_avaliationtype_endat} = form; 
      const NewErrors = {};

      if(INPUTS.academic_level_title ===  "" || INPUTS.academic_level_title ===  " "){
      if(!academic_level_title || academic_level_title === '') NewErrors.academic_level_title = 'Classe invalida';  
      }else{if(!academic_level_title){setField("academic_level_title", INPUTS.academic_level_title);}} 
 
      if(INPUTS.academic_level_avaliationtype_endat ===  "" || INPUTS.academic_level_avaliationtype_endat ===  " "){
      if(!academic_level_title || academic_level_title === '') NewErrors.academic_level_avaliationtype_endat = '';  
      }else{if(!academic_level_title){setField("academic_level_title", INPUTS.academic_level_avaliationtype_endat);}} 
      return NewErrors;
  }
  

    const FormSubmit = (e)=>{  
      e.preventDefault();   
      const formErrors = validateForm();
      if(Object.keys(formErrors).length > 0){
           setErrors(formErrors);
           toast.error("Verifique todos os  campos");   
        }else{
          if(!props.update){
            axios.post(FORMURL[0], INPUTS).then(()=>{  
              toast.success("Classe registrada com sucesso !");
              setForm({});
              ClearInputs(); 
              RefreshList(`.el-refresh-list`)
            }).catch((error)=>{toast.error("Lamentamos mas não foi  possivel executar esta ação")}); 
          } else {
            axios.put(FORMURL[2] , INPUTS)
            .then(()=>{  
              toast.success("Classe atualizada com sucesso !");
              setForm({});
              ClearInputs(); 
              RefreshList(`.el-refresh-list`)
            }).catch((error)=>{toast.error("Lamentamos mas não foi  possivel executar esta ação")}); 
          }
        }  
    };

      
    const handleInput = (e)=>{  
       switch (e.target.id) { 
          case "academic_level_title":
            INPUTS.academic_level_title = e.target.value
            setField("academic_level_title", e.target.value);
           break;  
           case "academic_level_avaliationtype_endat":
            INPUTS.academic_level_avaliationtype_endat = e.target.value
            setField("academic_level_avaliationtype_endat", e.target.value);
           break;  
        default:
       }
    }
 
      
    const handleInput1 = (e)=>{  
      setForFt(e.target.value);
        setField("academic_level_forFt", e.target.value); 
    }
      
  const handleInput2 = (e)=>{  
      setForExam(e.target.value);
      setField("academic_level_forExam", e.target.value); 
  }

  return (
    <div>  
      <div onClick={handleShow}>
            {
              props.toggle_btn ? props.toggle_btn :   <button className='btn btn-main'><AddCircleOutlineIcon/> Registrar Classe</button>  
            }
       </div>
      <Modal className='animate__animated animate__zoomInDown' centered  dialogAs={DraggableModal}  show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><h5>{ props.title ? props.title : 'Registrar ' } Classe</h5></Modal.Title>
        </Modal.Header>
        <Form onSubmit={FormSubmit}> 
        <Modal.Body className='scrollLimit'>
            <Form.Group className="mb-3" >
              <Form.Label>Nome da classe<span className='text-danger ml-2'>*</span></Form.Label>
              <Form.Control placeholder='Ex: 1ª classe' onChange={handleInput} className={!!errors.academic_level_title && 'is-invalid'} value={form.academic_level_title} isInvalid={!!errors.academic_level_title}
              type="text" id="academic_level_title" />
              <Form.Control.Feedback type='invalid'>{errors.academic_level_title}</Form.Control.Feedback>
            </Form.Group>  
            <Form.Group className='mb-3'>
            <FormControl id="academic_level_forExam">
                <div className="ed-flex">
                    <FormLabel className='text-main-light' id="academic_level_forExam">Definir como classe de exame :</FormLabel>
                      <RadioGroup  aria-labelledby="academic_level_forExam" defaultValue={ForExam}
                       name="radio-buttons-group" id="academic_level_forExam" onChange={handleInput2}  >
                      <div className="ml-2 ed-flex">
                          <FormControlLabel value="1" control={<Radio />} label="Sim" />
                          <FormControlLabel value="0" control={<Radio />} label="Não" /> 
                      </div>
                      </RadioGroup>
                      <Form.Control.Feedback type='invalid'>{errors.academic_level_forExam}</Form.Control.Feedback>
                  </div>
              </FormControl>  
              <FormControl id="academic_level_forFt">
                <div className="ed-flex">
                    <FormLabel className='text-main-light' id="academic_level_forFt">Definir como classe de recurso :</FormLabel>
                      <RadioGroup  aria-labelledby="academic_level_forFt" defaultValue={ForFt}
                       name="radio-buttons-group" id="academic_level_forFt" onChange={handleInput1}  >
                      <div className="ml-2 ed-flex">
                          <FormControlLabel value="1" control={<Radio />} label="Sim" />
                          <FormControlLabel value="0" control={<Radio />} label="Não" /> 
                      </div>
                      </RadioGroup>
                      <Form.Control.Feedback type='invalid'>{errors.academic_level_forFt}</Form.Control.Feedback>
                  </div>
              </FormControl>
             </Form.Group>  
             <Form.Group>
              <div className="ed-flex mt-2"> 
                <div className="text-main-light mr-2">Começar á avaliar dos</div>
                <div  style={{width:"60px"}}>
                   <Form.Control placeholder='0' readOnly type="number"  />
                </div>
                 <div className="text-main-light ml-2 mr-2">aos</div>
                <div style={{width:"60px"}}>
                  <Form.Control placeholder='10' onChange={handleInput} className={!!errors.academic_level_avaliationtype_endat && 'is-invalid'}
                  value={form.academic_level_avaliationtype_endat} isInvalid={!!errors.academic_level_avaliationtype_endat}
                   type="number" id="academic_level_avaliationtype_endat" />
                </div>  
                <div className="text-main-light ml-2">valores</div>                 
                </div>
              <Form.Control.Feedback type='invalid'>{errors.academic_level_avaliationtype_endat}</Form.Control.Feedback>
           </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <div className="ed-space">
              <div className="ed-flex"></div>
              <div className="ed-flex">
                  <Button className='bg-light text-dark' onClick={handleClose}> Cancelar </Button>
                  <Button className="btn btn-main ml-2" type="submit">{ props.title ? <Update/> : <Save/>}{ props.title ? props.title : 'Salvar'}</Button>
              </div>
          </div>
        </Modal.Footer>
        </Form>
      </Modal>
    </div>
  )
}

export default NewAcademicLevelModal