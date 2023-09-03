import React, {useEffect, useState} from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Modal, Form, Button} from 'react-bootstrap'
import { Save } from '@mui/icons-material';
import DraggableModal from '../../../General/components/DraggableModal'; 
import axios from 'axios';
import Hoot from '../../../General/components/Hoot';
import ClearInputs from '../../../General/components/ClearInputs'; 
import {GetInstituteCode, VehiclesDataOptions} from '../../../General/components/InstituteData'; 
import { RichTextEditor } from '../../../General/components/RichTextEditor';
import CRValue from '../../../General/components/CRValue';
import {toast} from 'react-toastify';
import { Update } from '@material-ui/icons';


function NewMaintenenceModal(props) {
    const [show, setShow] = useState(false);
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});  

    const handleClose = () => setShow(false);
    const handleShow = () => {
       setShow(true); 
       GET_DATA();
    };
     
    const INPUTS = {
         maintenence_vehicle:CRValue("#maintenence_vehicle"),  
         maintenence_description: JSON.stringify(CRValue(".modal form textarea")),
         institute_code:GetInstituteCode()
    }; 

    const FORMURL = [
      Hoot()+"edualltransportmaintenanceeregister/post/",
      props.get ? props.get : '',
      props.url ? props.url : ''
    ];

    const GET_DATA = async()=>{
      const response = await axios.get(FORMURL[1]); 
      if(response.data !=null){
        if(response.data[0] != null){
          document.querySelector("#maintenence_vehicle").value = response.data[0].ed_maintenence_vehicle;  
          
          if(document.querySelectorAll(".public-DraftStyleDefault-block").length >= 1){ 
          document.querySelector(".modal form textarea").value =  response.data[0].ed_maintenence_description;} 

          INPUTS.maintenence_vehicle = response.data[0].ed_maintenence_vehicle 
          INPUTS.maintenence_description = response.data[0].maintenence_description
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
      const {maintenence_vehicle } = form; 
      const NewErrors = {};

      if(INPUTS.maintenence_vehicle ===  "" || INPUTS.maintenence_vehicle ===  " "){
      if(!maintenence_vehicle || maintenence_vehicle === '') NewErrors.maintenence_vehicle = 'Veiculo invalido';  
      }else{if(!maintenence_vehicle){setField("maintenence_vehicle", INPUTS.maintenence_vehicle);}} 
  
      return NewErrors;
  }
  
   const SUBMIT_INPUTS = {maintenence_vehicle:INPUTS.maintenence_vehicle, maintenence_description:INPUTS.maintenence_description, institute_code:INPUTS.institute_code};
    const FormSubmit = (e)=>{  
      e.preventDefault();   
      const formErrors = validateForm();
      if(Object.keys(formErrors).length > 0){
           setErrors(formErrors);
           toast.error("Verifique todos os  campos");   
        }else{
          if(!props.update){
            axios.post(FORMURL[0], SUBMIT_INPUTS).then(()=>{  
              toast.success("Manutenção registrada com sucesso !");
              setForm({});
              ClearInputs();
              setTimeout(() => { 
                handleClose();
            }, 1500); 
            }).catch((error)=>{toast.error("Lamentamos mas não foi  possivel executar esta ação")}); 
          } else {
            axios.put(FORMURL[2] , SUBMIT_INPUTS)
            .then(()=>{  
              toast.success("Manutenção atualizada com sucesso !");
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
        case "maintenence_vehicle":
           INPUTS.maintenence_vehicle = e.target.value
           setField("maintenence_vehicle", e.target.value);
          break; 
       }
    }
  return (
    <div>  
      <div onClick={handleShow}>
            {
              props.toggle_btn ? props.toggle_btn : <button className='btn btn-main'><AddCircleOutlineIcon/>Efectuar registro de manutenção</button>  
            }
       </div>
      <Modal className='animate__animated animate__zoomInDown'  centered  size='lg' dialogAs={DraggableModal}  show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><h5>{ props.title ? props.title : 'Efectuar Registro de ' } manutenção</h5></Modal.Title>
        </Modal.Header>
        <Form onSubmit={FormSubmit}> 
        <Modal.Body className='scrollLimit'> 
            <Form.Group className="mb-3">
              <Form.Label>Viatura<span className='text-danger ml-2'>*</span></Form.Label>
              <Form.Select  onChange={handleInput} className={!!errors.maintenence_vehicle && 'is-invalid'} value={form.maintenence_vehicle} isInvalid={!!errors.maintenence_vehicle}
              id="maintenence_vehicle">
                   <VehiclesDataOptions/>
              </Form.Select>
              <Form.Control.Feedback type='invalid'>{errors.maintenence_vehicle}</Form.Control.Feedback>
            </Form.Group>     
            <Form.Group className="mb-3">
              <Form.Label >Descrição </Form.Label>
              <div className="maintenence-description-input">
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

export default NewMaintenenceModal