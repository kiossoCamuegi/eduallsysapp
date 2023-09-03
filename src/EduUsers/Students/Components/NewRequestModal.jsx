import React, {useState} from 'react'
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
import { RichTextEditor } from './RichTextEditor';
import { GetStudentData } from '../../../General/components/StudentData';

function NewRequestModal(props) {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});  

  const handleClose = () => setShow(false);
  const handleShow = () => {
     setShow(true); 
     GET_DATA();
  };
   
  const INPUTS = {
       request_type:CRValue("#request_type"),  
       request_description: JSON.stringify(CRValue(".modal form textarea")), 
       request_made_by:1,
       institute_code:GetStudentData()[0].student_institute_code,
       request_user_code:GetStudentData()[0].student_code
  }; 

  const FORMURL = [
    Hoot()+"eduallregisterrequest/post/",
    props.get ? props.get : '',
    props.url ? props.url : ''
  ];

  const GET_DATA = async()=>{
    const response = await axios.get(FORMURL[1]); 
    if(response.data !=null){
      if(response.data[0] != null){
        document.querySelector("#request_type").value = response.data[0].ed_request_type;  
        INPUTS.request_type = response.data[0].ed_request_type 
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
    const {request_type} = form; 
    const NewErrors = {};

    if(INPUTS.request_type ===  "" || INPUTS.request_type ===  " "){
    if(!request_type || request_type === '') NewErrors.request_type = 'Tipo de solicitação invalida invalida';  
    }else{if(!request_type){setField("request_type", INPUTS.request_type);}}  

    return NewErrors;
}



  const FormSubmit = (e)=>{  
    e.preventDefault();   
    const formErrors = validateForm();
    if(Object.keys(formErrors).length > 0){
         setErrors(formErrors);
         toast.error("Verifique todos os  campos");   
      }else{
        const SUBMIT_INPUTS = {request_type:INPUTS.request_type, request_made_by:INPUTS.request_made_by,
        institute_code:INPUTS.institute_code , request_user_code:INPUTS.request_user_code,  request_description:INPUTS.request_description};
         console.log(SUBMIT_INPUTS);
       
        if(!props.update){
          axios.post(FORMURL[0], SUBMIT_INPUTS).then(()=>{  
            toast.success("Solicitação  registrada com sucesso !");
            setForm({});
            ClearInputs();
            setTimeout(() => { 
              handleClose();
          }, 1500); 
          }).catch((error)=>{
            toast.error("Lamentamos mas não foi  possivel executar esta ação")
            console.log(error); 
          }); 
        } else {
          axios.put(FORMURL[2] , SUBMIT_INPUTS)
          .then(()=>{  
            toast.success("Solicitação  atualizada com sucesso !");
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
        case "request_type":
          INPUTS.request_type = e.target.value
          setField("request_type", e.target.value);
         break;  
     }
  }


    return (
        <div>
     <div onClick={handleShow}>
            {
              props.toggle_btn ? props.toggle_btn :   <button className='btn btn-main'><AddCircleOutlineIcon/> Fazer solicitação</button>  
            }
       </div>
      <Modal className='animate__animated animate__zoomInDown'  centered  size='lg' dialogAs={DraggableModal}  show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><h5>{ props.title ? props.title : 'Fazer ' } solicitação</h5></Modal.Title>
        </Modal.Header>
        <Form onSubmit={FormSubmit}> 
         <Modal.Body className='scrollLimit'> 
             <Form.Group className="mb-3"  >
               <Form.Label>Tipo de solicitação<span className="text-danger ml-2">*</span> </Form.Label>
               <Form.Select onChange={handleInput} className={!!errors.request_type && 'is-invalid'} value={form.request_type} isInvalid={!!errors.request_type}
                 id="request_type">
                   <option value="1" selected>Boletim de notas</option>
                   <option value="2">Transferencia escolar</option>
               </Form.Select>
               <Form.Control.Feedback type='invalid'>{errors.request_type}</Form.Control.Feedback>
             </Form.Group>   
             <Form.Group>
               <Form.Label>Descrição do pedido<span className="text-danger ml-2">*</span> </Form.Label>
              <div className="request-description">
                  <RichTextEditor/>
              </div>
             </Form.Group> 
         </Modal.Body>
         <Modal.Footer>
           <div className="ed-space">
              <Button className='bg-light text-dark' onClick={handleClose}> Cancelar </Button>
              <Button className="btn btn-main" type="submit"><Save/> Enviar & Salvar </Button>
           </div>
         </Modal.Footer>
         </Form>
       </Modal> 
     </div>
      ) 
}

export default NewRequestModal