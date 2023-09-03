import React, {useEffect, useState} from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Modal, Form, Button} from 'react-bootstrap'
import { Save } from '@mui/icons-material';
import DraggableModal from '../../../General/components/DraggableModal'; 
import axios from 'axios';
import Hoot from '../../../General/components/Hoot';
import ClearInputs from '../../../General/components/ClearInputs'; 
import {GetInstituteCode} from '../../../General/components/InstituteData';  
import CRValue from '../../../General/components/CRValue';
import {toast} from 'react-toastify';
import { Update } from '@material-ui/icons';
import RefreshList from '../../../General/components/RefreshList';

function NewLibraryRackModal(props) {
    const [show, setShow] = useState(false);
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});  

    const handleClose = () => setShow(false);
    const handleShow = () => {
       setShow(true); 
       GET_DATA();
    };
     
    const INPUTS = {
         rack_name:CRValue("#rack_name"),  
         rack_status:CRValue("#rack_status"),  
         institute_code:GetInstituteCode()
    }; 

    const FORMURL = [
      Hoot()+"edualllibraryrackregister/post",
      props.get ? props.get : '',
      props.url ? props.url : ''
    ];

    const GET_DATA = async()=>{
     if(props.update){
      const response = await axios.get(FORMURL[1]); 
      if(response.data !=null){
        if(response.data[0] != null){
          document.querySelector("#rack_name").value = response.data[0].ed_library_rack_name;  
          document.querySelector("#rack_status").value = response.data[0].ed_library_rack_status;  

          INPUTS.rack_name = response.data[0].ed_library_rack_name; 
          INPUTS.rack_status = response.data[0].ed_library_rack_status; 
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
      const {rack_name, rack_status} = form; 
      const NewErrors = {};

      if(INPUTS.rack_name ===  "" || INPUTS.rack_name ===  " "){
      if(!rack_name || rack_name === '') NewErrors.rack_name = 'Prateleira invalida';  
      }else{if(!rack_name){setField("rack_name", INPUTS.rack_name);}} 

      if(INPUTS.rack_status ===  "" || INPUTS.rack_status ===  " "){
      if(!rack_status || rack_status === '') NewErrors.rack_status = 'Estado invalido';  
      }else{if(!rack_status){setField("rack_status", INPUTS.rack_status);}} 
  
      return NewErrors;
  }
  
   const SUBMIT_INPUTS = {rack_name:INPUTS.rack_name, rack_status:INPUTS.rack_status };

    const FormSubmit = (e)=>{  
      e.preventDefault();   
      const formErrors = validateForm();
      if(Object.keys(formErrors).length > 0){
           setErrors(formErrors);
           toast.error("Verifique todos os  campos");   
        }else{
          if(!props.update){
            axios.post(FORMURL[0], SUBMIT_INPUTS).then(()=>{  
              toast.success("Prateleira registrada com sucesso !");
              setForm({});
              ClearInputs();
              RefreshList(`.el-refresh-list`)
              setTimeout(() => { 
                handleClose();
            }, 1500); 
            }).catch((error)=>{toast.error("Lamentamos mas não foi  possivel executar esta ação")}); 
          } else {
            axios.put(FORMURL[2] , SUBMIT_INPUTS)
            .then(()=>{  
              toast.success("Prateleira atualizada com sucesso !");
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
          case "rack_name":
            INPUTS.rack_name = e.target.value
            setField("rack_name", e.target.value);
           break; 
            case "rack_status":
            INPUTS.rack_status = e.target.value
            setField("rack_status", e.target.value);
          break;
       }
    }
 


  return (
    <div>  
      <div onClick={handleShow}>
            {
              props.toggle_btn ? props.toggle_btn :   <button className='btn btn-main'><AddCircleOutlineIcon/> Registrar prateleira</button>  
            }
       </div>
      <Modal className='animate__animated animate__zoomInDown' centered  size='lg' dialogAs={DraggableModal}  show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><h5>{ props.title ? props.title : 'Registrar ' } Prateleira</h5></Modal.Title>
        </Modal.Header>
        <Form onSubmit={FormSubmit}> 
        <Modal.Body className='scrollLimit'>
            <Form.Group className="mb-3" >
              <Form.Label>Prateleira<span className='text-danger ml-2'>*</span></Form.Label>
              <Form.Control onChange={handleInput} className={!!errors.rack_name && 'is-invalid'} value={form.rack_name} isInvalid={!!errors.rack_name}
              type="text" id="rack_name" />
              <Form.Control.Feedback type='invalid'>{errors.rack_name}</Form.Control.Feedback>
            </Form.Group>   
            <Form.Group className="mb-3">
              <Form.Label>Estado<span className='text-danger ml-2'>*</span></Form.Label>
              <Form.Select  onChange={handleInput} className={!!errors.rack_status && 'is-invalid'} value={form.rack_status} isInvalid={!!errors.rack_status}
              id="rack_status">
                   <option value="0">Activo</option>
                   <option value="1">Inactivo</option>
              </Form.Select>
              <Form.Control.Feedback type='invalid'>{errors.rack_status}</Form.Control.Feedback>
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

export default NewLibraryRackModal