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
 
function NewCicleModal(props) {
  const [show, setShow] = useState(false);
 
  const handleClose = () => setShow(false);
  const handleShow = () => {
     setShow(true); 
     GET_DATA();
  };

  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
 
  
  const FORMURL = [
    Hoot()+"eduallcicleregister/post/",
    props.get ? props.get : '',
    props.url ? props.url : ''
  ];


  const INPUTS = {
       title:CRValue("#title"),
       code:CRValue("#code"),
       institute_code: GetInstituteCode()
  }; 


  
  const GET_DATA = async()=>{
     if(props.update){
      const response = await axios.get(FORMURL[1]); 
      if(response.data !=null){
        if(response.data[0] != null){
          document.querySelector("#title").value = response.data[0].ed_cicle_title; 
          document.querySelector("#code").value  = response.data[0].ed_cicle_code; 
    
          INPUTS.title = response.data[0].ed_cicle_title;
          INPUTS.code = response.data[0].ed_cicle_code;
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
    const {title, code} = form; 
    const NewErrors = {};

    if(!title || title === '') NewErrors.title = 'ciclo  invalido';  

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
        const SUBMIT_INPUTS = {cicle_title:INPUTS.title, cicle_code:INPUTS.code, institute_code:INPUTS.institute_code}; 

        if(!props.update){
          axios.post(FORMURL[0], SUBMIT_INPUTS).then(()=>{  
            toast.success("Ciclo registrado com sucesso !");
            setForm({});
            ClearInputs();
            RefreshList(`.el-refresh-list`)
          }).catch((error)=>{toast.error("Lamentamos mas não foi  possivel executar esta ação")}); 
        } else {
          axios.put(FORMURL[2] , SUBMIT_INPUTS)
          .then(()=>{  
            toast.success("Ciclo atualizado com sucesso !");
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
        case "title":
          setField("title", e.target.value) 
          INPUTS.title = e.target.value
         break;
         case "code":
          setField("code", e.target.value) 
          INPUTS.code = e.target.value
         break;  
     }
  }


  return (
    <div>
         <div>
         <div onClick={handleShow}>
            {
              props.toggle_btn ? props.toggle_btn :   <button className='btn btn-main'><AddCircleOutlineIcon/> Registrar ciclo</button>  
            }
       </div>
   <Modal size='lg' dialogAs={DraggableModal}  centered  className='animate__animated animate__zoomInDown'  show={show} onHide={handleClose}>
     <Modal.Header closeButton>
     <Modal.Title><h5>{ props.title ? props.title : 'Registrar ' } Ciclo</h5></Modal.Title>
     </Modal.Header>
     <Form onSubmit={FormSubmit}>
     <Modal.Body className='scrollLimit'>
         <Form.Group className="mb-3"  >
           <Form.Label>Ciclo<span className="text-danger ml-2">*</span> </Form.Label>
           <Form.Control type="text"  onChange={handleInput} className={!!errors.title && 'is-invalid'} value={form.title} 
            isInvalid={!!errors.title} id="title"  />
            <Form.Control.Feedback type='invalid'>{errors.title}</Form.Control.Feedback> 
         </Form.Group>  
         <Form.Group className="mb-3"  >
           <Form.Label>Abreviação  </Form.Label>
           <Form.Control type="text"  onChange={handleInput} className={!!errors.code && 'is-invalid'} value={form.code} 
          isInvalid={!!errors.code} id="code"  />
          <Form.Control.Feedback type='invalid'>{errors.code}</Form.Control.Feedback>
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

export default NewCicleModal