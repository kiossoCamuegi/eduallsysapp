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
import RefreshList from '../../../General/components/RefreshList';


function NewTime(props) {
    const [show, setShow] = useState(false);
     
  const handleClose = () => setShow(false);
  const handleShow = () => {
     setShow(true); 
     GET_DATA();
  };


    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});
     
    const INPUTS = {
         timing_hour_start:CRValue("#timing_hour_start"),
         timing_minute_start:CRValue("#timing_minute_start"),
         timing_hour_end:CRValue("#timing_hour_end"),
         timing_minute_end:CRValue("#timing_minute_end"),
         institute_minute_start: Math.floor((1922)*2)
    }; 


     
  const GET_DATA = async()=>{
    const response = await axios.get(FORMURL[1]); 
    if(response.data !=null){
      if(response.data[0] != null){
        document.querySelector("#timing_hour_start").value = response.data[0].ed_timing_hour_start; 
        document.querySelector("#timing_minute_start").value  = response.data[0].ed_timing_minute_start; 
        document.querySelector("#timing_hour_end").value = response.data[0].ed_timing_hour_end; 
        document.querySelector("#timing_minute_end").value  = response.data[0].ed_timing_minute_end; 
  
        INPUTS.timing_hour_start = response.data[0].ed_timing_hour_start;
        INPUTS.timing_hour_end = response.data[0].ed_timing_hour_end;
        INPUTS.timing_minute_start = response.data[0].ed_timing_minute_start;
        INPUTS.timing_minute_end = response.data[0].ed_timing_minute_end;
      }
    }
  }


  const FORMURL = [
    Hoot()+'eduallregistertiming/post/',
    props.get ? props.get : '',
    props.url ? props.url : ''
  ];




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
      const {timing_hour_start, timing_minute_start, timing_minute_end, timing_hour_end} = form; 
      const NewErrors = {};

      if(!timing_hour_start || timing_hour_start === '') NewErrors.timing_hour_start = 'Hora invalida'; 
      if(!timing_minute_start  || timing_minute_start === '') NewErrors.timing_minute_start = 'Minuto invalido'; 
      if(!timing_hour_end || timing_hour_end === '') NewErrors.timing_hour_end = 'Hora invalida'; 
      if(!timing_minute_end  || timing_minute_end === '') NewErrors.timing_minute_end = 'Minuto invalido'; 

      return NewErrors;
  }
  
 
    const FormSubmit = (e)=>{ 
      console.log(INPUTS);
       e.preventDefault();   
       const formErrors = validateForm();
      if(Object.keys(formErrors).length > 0){
            setErrors(formErrors);
            toast.error("Verifique todos os  campos");    
        }else{  

          const SUBMIT_INPUTS = {
            timing_hour_start:INPUTS.timing_hour_start , 
            timing_minute_start:INPUTS.timing_minute_start,
            timing_hour_end:INPUTS.timing_hour_end , 
            timing_minute_end:INPUTS.timing_minute_end
          };

          if(!props.update){
            axios.post(FORMURL[0], SUBMIT_INPUTS).then(()=>{  
              toast.success("Horario registrado com sucesso !");
              setForm({});
              ClearInputs();
              RefreshList(`.el-refresh-list`)
            }).catch((error)=>{toast.error("Lamentamos mas não foi  possivel executar esta ação")}); 
          } else {
            axios.put(FORMURL[2] , SUBMIT_INPUTS)
            .then(()=>{  
              toast.success("Horario atualizado com sucesso !");
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
          case "timing_hour_start":
            setField("timing_hour_start", e.target.value) 
            INPUTS.timing_hour_start = e.target.value
           break;
           case "timing_minute_start":
            setField("timing_minute_start", e.target.value) 
            INPUTS.timing_minute_start = e.target.value
           break; 
           case "timing_hour_end":
            setField("timing_hour_end", e.target.value) 
            INPUTS.timing_hour_end = e.target.value
           break;
           case "timing_minute_end":
            setField("timing_minute_end", e.target.value) 
            INPUTS.timing_minute_end = e.target.value
           break; 
       }
    }
 

  return (
    <div>
        <div onClick={handleShow}>
            {
              props.toggle_btn ? props.toggle_btn :   <button className='btn btn-main'><AddCircleOutlineIcon/> Registrar novo horario</button>  
            }
       </div>
      <Modal className='animate__animated animate__zoomInDown'   centered dialogAs={DraggableModal}  show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        <Modal.Title><h5>{ props.title ? props.title : 'Registrar ' } horario</h5></Modal.Title>
        </Modal.Header>
        <Form  onSubmit={FormSubmit}>  
        <Modal.Body className='scrollLimit'>
            <Form.Group className="mb-3">
            <Form.Label>Horario inicial <span className="text-danger ml-2">*</span> </Form.Label>               
               <div className="ed-flex">
                 <div className="block"> 
                   <Form.Control type="number" placeholder='Hora'  onChange={handleInput} className={!!errors.timing_hour_start && 'is-invalid'} value={form.timing_hour_start} 
                   isInvalid={!!errors.timing_hour_start} id="timing_hour_start"  />
                  <Form.Control.Feedback type='invalid'>{errors.timing_hour_start}</Form.Control.Feedback>  
                 </div>
                 <div className="block ml-2"> 
                    <Form.Control type="number" placeholder='Minutos' maxLength='2' onChange={handleInput} className={!!errors.timing_minute_start && 'is-invalid'} value={form.timing_minute_start} 
                    isInvalid={!!errors.timing_minute_start} id="timing_minute_start"  />
                    <Form.Control.Feedback type='invalid'>{errors.timing_minute_start}</Form.Control.Feedback>
                 </div>
               </div>
            </Form.Group>  
            <Form.Group className="mb-3"> 
            <Form.Label>Horario final<span className="text-danger ml-2">*</span> </Form.Label>
               <div className="ed-flex">
                 <div className="block"> 
                   <Form.Control type="number" placeholder='Hora' onChange={handleInput} className={!!errors.timing_hour_end && 'is-invalid'} value={form.timing_hour_end} 
                   isInvalid={!!errors.timing_hour_end} id="timing_hour_end"  />
                  <Form.Control.Feedback type='invalid'>{errors.timing_hour_end}</Form.Control.Feedback>  
                 </div>
                 <div className="block ml-2"> 
                    <Form.Control type="number" placeholder='Minutos' maxLength='2' onChange={handleInput} className={!!errors.timing_minute_end && 'is-invalid'} value={form.timing_minute_end} 
                    isInvalid={!!errors.timing_minute_end} id="timing_minute_end"  />
                    <Form.Control.Feedback type='invalid'>{errors.timing_minute_end}</Form.Control.Feedback>
                 </div>
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

export default NewTime