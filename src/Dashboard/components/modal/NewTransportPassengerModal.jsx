import React, {useEffect, useState} from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Modal, Form, Button} from 'react-bootstrap'
import { Save } from '@mui/icons-material';
import DraggableModal from '../../../General/components/DraggableModal'; 
import axios from 'axios';
import Hoot from '../../../General/components/Hoot';
import ClearInputs from '../../../General/components/ClearInputs'; 
import {GetInstituteCode, GetTransportStopsDataOptions, ServiceDataOptions, StudentsDataOptions} from '../../../General/components/InstituteData'; 
import CRValue from '../../../General/components/CRValue';
import {toast} from 'react-toastify';
import { Update } from '@material-ui/icons'; 

function NewTransportPassengerModal(props) {
    const [show, setShow] = useState(false);
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});  
    const handleClose = () => setShow(false);
    const handleShow = () => {
       setShow(true); 
       GET_DATA();
    };
     
    const INPUTS = {
         passenger_service:CRValue("#passenger_service"),  
         passenger_code:CRValue("#passenger_code"),  
         passenger_stop:CRValue("#passenger_stop"),  
         institute_code:GetInstituteCode()
    }; 

    const FORMURL = [
      Hoot()+"edualltransportpassengerregister/post/",
      props.get ? props.get : '',
      props.url ? props.url : ''
    ];

    const GET_DATA = async()=>{
      const response = await axios.get(FORMURL[1]); 
      if(response.data !=null){
        if(response.data[0] != null){
          document.querySelector("#passenger_service").value = response.data[0].ed_transport_passenger_service; 
          document.querySelector("#passenger_code").value  = response.data[0].ed_transport_passenger_code;  
          document.querySelector("#passenger_stop").value = response.data[0].ed_transport_passenger_stop;  
 
          INPUTS.passenger_code = response.data[0].ed_transport_passenger_code; 
          INPUTS.passenger_stop = response.data[0].ed_transport_passenger_stop; 
          INPUTS.passenger_service = response.data[0].ed_transport_passenger_service; 
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
      const {passenger_service, passenger_code, passenger_stop} = form; 
      const NewErrors = {};

      if(INPUTS.passenger_service ===  "" || INPUTS.passenger_service ===  " "){
      if(!passenger_service || passenger_service === '') NewErrors.passenger_service = 'Passageiro invalida';  
      }else{if(!passenger_service){setField("passenger_service", INPUTS.passenger_service);}} 
 
      if(INPUTS.passenger_code ===  "" || INPUTS.passenger_code ===  " "){
      if(!passenger_code || passenger_code === '') NewErrors.passenger_code = 'Estudante invalido';  
      }else{if(!passenger_code){setField("passenger_code", INPUTS.passenger_code);}} 
 
      if(INPUTS.passenger_stop ===  "" || INPUTS.passenger_stop ===  " "){
      if(!passenger_stop || passenger_stop === '') NewErrors.passenger_stop = 'Data invalida';  
      }else{if(!passenger_stop){setField("passenger_stop", INPUTS.passenger_stop);}} 
  
      return NewErrors;
  }
  
   const SUBMIT_INPUTS = {passenger_service:INPUTS.passenger_service, 
   passenger_code:INPUTS.passenger_code ,  passenger_stop:INPUTS.passenger_stop,
  institute_code:INPUTS.institute_code};

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
              toast.success("Passageiro registrada com sucesso !");
              setForm({});
              ClearInputs();
              setTimeout(() => { 
                handleClose();
            }, 1500); 
            }).catch((error)=>{toast.error("Lamentamos mas não foi  possivel executar esta ação")}); 





          } else {
            axios.put(FORMURL[2] , SUBMIT_INPUTS)
            .then(()=>{  
              toast.success("Passageiro atualizada com sucesso !");
              setForm({});
              ClearInputs();
              setTimeout(() => { 
                  handleClose();
              }, 1500);
            }).catch((error)=>{toast.error("Lamentamos mas não foi  possivel executar esta ação")}); 
          }
        }  
    };

      
    const handleInput = (e)=>{ 
       switch (e.target.id) { 
          case "passenger_service":
            INPUTS.passenger_service = e.target.value
            setField("passenger_service", e.target.value);
           break;  
          case "passenger_code":
            INPUTS.passenger_code = e.target.value
            setField("passenger_code", e.target.value);
          break;   
          case "passenger_stop":
            INPUTS.passenger_stop = e.target.value
            setField("passenger_stop", e.target.value);
          break;  
       }
    }
 


  return (
    <div>  
      <div onClick={handleShow}>
            {
              props.toggle_btn ? props.toggle_btn :   <button className='btn btn-main'><AddCircleOutlineIcon/> Registrar  Passageiro</button>  
            }
       </div>
      <Modal className='animate__animated animate__zoomInDown'  centered  size='lg' dialogAs={DraggableModal}  show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><h5>{ props.title ? props.title : 'Registrar novo ' } Passageiro</h5></Modal.Title>
        </Modal.Header>
        <Form onSubmit={FormSubmit}> 
        <Modal.Body className='scrollLimit'>
            <Form.Group className="mb-3" >
              <Form.Label>Serviço<span className='text-danger ml-2'>*</span></Form.Label>
              <Form.Select  onChange={handleInput} className={!!errors.passenger_service && 'is-invalid'} value={form.passenger_service} isInvalid={!!errors.passenger_service}
               id="passenger_service">
                    <ServiceDataOptions />
              </Form.Select>
              <Form.Control.Feedback type='invalid'>{errors.passenger_service}</Form.Control.Feedback>
            </Form.Group>    
            <Form.Group className="mb-3">
              <Form.Label>Paragem <span className='text-danger ml-2'>*</span></Form.Label>
              <Form.Select  onChange={handleInput} className={!!errors.passenger_stop && 'is-invalid'} value={form.passenger_stop} isInvalid={!!errors.passenger_stop}
              id="passenger_stop">
                  <GetTransportStopsDataOptions/>
              </Form.Select>
              <Form.Control.Feedback type='invalid'>{errors.passenger_stop}</Form.Control.Feedback>
            </Form.Group>  
            <Form.Group className="mb-3">
              <Form.Label>Nome do estudante<span className='text-danger ml-2'>*</span></Form.Label>
              <Form.Select  onChange={handleInput} className={!!errors.passenger_code && 'is-invalid'} value={form.passenger_code} isInvalid={!!errors.passenger_code}
              id="passenger_code">
                     <StudentsDataOptions/>
              </Form.Select>
              <Form.Control.Feedback type='invalid'>{errors.passenger_code}</Form.Control.Feedback>
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

export default NewTransportPassengerModal