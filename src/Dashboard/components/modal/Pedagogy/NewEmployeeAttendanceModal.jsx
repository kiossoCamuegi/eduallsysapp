import React, {useState} from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Modal, Form, Button} from 'react-bootstrap'
import { Save } from '@mui/icons-material';
import DraggableModal from '../../../../General/components/DraggableModal';
import {toast} from 'react-toastify';
import CRValue from '../../../../General/components/CRValue';
import ClearInputs from '../../../../General/components/ClearInputs';
import Hoot from '../../../../General/components/Hoot';
import axios from 'axios';
import { Update } from '@material-ui/icons';
import { EmployeeArray, GetInstituteCode, TimingsDataOptions } from '../../../../General/components/InstituteData';
import RefreshList from '../../../../General/components/RefreshList';
import SelectSearch from 'react-select-search';


function NewEmployeeAttendanceModal(props) {
    const [show, setShow] = useState(false); 
    const [EmployeeCode, setEmployeeCode] = useState(null);
    const handleClose = () => setShow(false);
    const handleShow = () => {
       setShow(true); 
       GET_DATA();
    };
  
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});
   
    
    const FORMURL = [
      Hoot()+"eduallregisteremployeeattendence/post/",
      props.get ? props.get : '',
      props.url ? props.url : ''
    ];
  
  
    const INPUTS = { 
         employee_attendance_code:EmployeeCode,
         employee_attendance_status:CRValue("#employee_attendance_status"),
         employee_attendance_timing:CRValue("#employee_attendance_timing"),
         employee_attendance_date:CRValue("#employee_attendance_date")
    }; 
  
  
    
    const GET_DATA = async()=>{
       if(props.update){
        const response = await axios.get(FORMURL[1]); 
        if(response.data !=null){
          if(response.data[0] != null){
            document.querySelector("#title").value = response.data[0].ed_cicle_title; 
            INPUTS.title = response.data[0].ed_cicle_title; 


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
      const {employee_attendance_code,employee_attendance_status,employee_attendance_timing,employee_attendance_date} = form; 
      const NewErrors = {};
  
      if(INPUTS.employee_attendance_code === "" || INPUTS.employee_attendance_code === " "){
      if(!employee_attendance_code || employee_attendance_code === '') NewErrors.employee_attendance_code = 'Selecione um funcionario';  
      }else{if(!employee_attendance_code){setField("employee_attendance_code", INPUTS.employee_attendance_code);}} 

      if(INPUTS.employee_attendance_status === "" || INPUTS.employee_attendance_status === " "){
      if(!employee_attendance_status || employee_attendance_status === '') NewErrors.employee_attendance_status = 'Selecione o estado da presença';  
      }else{if(!employee_attendance_status){setField("employee_attendance_status", INPUTS.employee_attendance_status);}} 

      if(INPUTS.employee_attendance_timing === "" || INPUTS.employee_attendance_timing === " "){
      if(!employee_attendance_timing || employee_attendance_timing === '') NewErrors.employee_attendance_timing = 'Horário selecionado invalido';  
      }else{if(!employee_attendance_timing){setField("employee_attendance_timing", INPUTS.employee_attendance_timing);}} 

      if(INPUTS.employee_attendance_date === "" || INPUTS.employee_attendance_date === " "){
      if(!employee_attendance_date || employee_attendance_date === '') NewErrors.employee_attendance_date = 'Data invalida';  
      }else{if(!employee_attendance_date){setField("employee_attendance_date", INPUTS.employee_attendance_date);}} 
  
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
          if(!props.update){
            axios.post(FORMURL[0], INPUTS).then((e)=>{ 
              toast.success("Presença registrada com sucesso !");
              setForm({});
              ClearInputs();
              RefreshList(`.el-refresh-list`)
            }).catch((error)=>{toast.error("Lamentamos mas não foi  possivel executar esta ação")}); 
          } else {
            axios.put(FORMURL[2] , INPUTS)
            .then(()=>{  
              toast.success("Presença atualizada com sucesso !");
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

    const GetEmployeeCode = (e)=>{
      setEmployeeCode(e);
      setField("employee_attendance_code", e) 
      INPUTS.employee_attendance_code = e;
    }
  
    
    const handleInput = (e)=>{ 
       switch (e.target.id) { 
          case "employee_attendance_timing":
            setField("employee_attendance_timing", e.target.value) 
            INPUTS.employee_attendance_timing = e.target.value
           break;  
           case "employee_attendance_date":
            setField("employee_attendance_date", e.target.value) 
            INPUTS.employee_attendance_date = e.target.value
           break;  
           case "employee_attendance_status":
            setField("employee_attendance_status", e.target.value) 
            INPUTS.employee_attendance_status = e.target.value
           break;  
           default:
       }
    }
  
    return (
      <div>
           <div>
           <div onClick={handleShow}>
              {
                props.toggle_btn ? props.toggle_btn :   <button className='btn btn-main'><AddCircleOutlineIcon/> Marcar presença aos funcionarios</button>  
              }
         </div>
     <Modal size='lg' dialogAs={DraggableModal}  centered  className='animate__animated animate__zoomInDown'  show={show} onHide={handleClose}>
       <Modal.Header closeButton>
       <Modal.Title><h5>{ props.title ? props.title : 'Registro de ' } presença</h5></Modal.Title>
       </Modal.Header>
       <Form onSubmit={FormSubmit}>
       <Modal.Body className='scrollLimit'>
         <Form.Group className="mb-3"  >
              <Form.Label>Nome do funcionario <span className='text-danger ml-2'>*</span></Form.Label> 
              <div className={`select-search-item  ${errors.employee_attendance_code ? 'error': ''}`}>
                <SelectSearch  search={true}  onChange={(e)=>GetEmployeeCode(e)}  value={EmployeeCode}  options={EmployeeArray()[0]}  placeholder="Selecione um funcionario" />
              </div>
              <small className="text-danger">{errors.employee_attendance_code}</small>
            </Form.Group>   
           <Form.Group className="mb-3"  >
             <Form.Label>Estado<span className="text-danger ml-2">*</span> </Form.Label>
             <Form.Select type="text"  onChange={handleInput} className={!!errors.employee_attendance_status && 'is-invalid'} value={form.employee_attendance_status} 
              isInvalid={!!errors.employee_attendance_status} id="employee_attendance_status" >
                   <option value="0">Presente</option>
                   <option value="1">Ausente</option>
                   <option value="2">Atrasado</option>
              </Form.Select>
              <Form.Control.Feedback type='invalid'>{errors.employee_attendance_status}</Form.Control.Feedback> 
           </Form.Group>   
           <Form.Group className="mb-3">
             <Form.Label>Horario<span className="text-danger ml-2">*</span> </Form.Label>
             <Form.Select type="text"  onChange={handleInput} className={!!errors.employee_attendance_timing && 'is-invalid'} value={form.employee_attendance_timing} 
              isInvalid={!!errors.employee_attendance_timing} id="employee_attendance_timing" >
                 <TimingsDataOptions />
              </Form.Select>
              <Form.Control.Feedback type='invalid'>{errors.employee_attendance_timing}</Form.Control.Feedback> 
           </Form.Group>   
           <Form.Group className="mb-3"  >
             <Form.Label>Data<span className="text-danger ml-2">*</span> </Form.Label>
             <Form.Control type="date"  onChange={handleInput} className={!!errors.employee_attendance_date && 'is-invalid'} 
              value={form.employee_attendance_date} 
              isInvalid={!!errors.employee_attendance_date} id="employee_attendance_date" /> 
              <Form.Control.Feedback type='invalid'>{errors.employee_attendance_date}</Form.Control.Feedback> 
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
      </div>
    )
}

export default NewEmployeeAttendanceModal
