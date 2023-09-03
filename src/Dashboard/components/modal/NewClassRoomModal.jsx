import React, {useState} from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Modal, Form, Button} from 'react-bootstrap'
import { Save } from '@mui/icons-material';
import DraggableModal from '../../../General/components/DraggableModal';
import { RichTextEditor } from '../../../General/components/RichTextEditor';
import {toast} from 'react-toastify';
import CRValue from '../../../General/components/CRValue';
import ClearInputs from '../../../General/components/ClearInputs';
import Hoot from '../../../General/components/Hoot';
import axios from 'axios';
import { Update } from '@material-ui/icons';
import { GetInstituteCode } from '../../../General/components/InstituteData';
import AuditoryRegister from '../../../General/components/AuditoryRegister';
import RefreshList from '../../../General/components/RefreshList';



function NewClassRoomModal(props){
    const [show, setShow] = useState(false); 
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});

  
    const handleClose = () => {
        setShow(false)
     };
    const handleShow = ()=> {
        setShow(true); 
        GET_DATA(); 
    };  

     
    const INPUTS = {
         title:CRValue("#classroom_title"), 
         institute_code:GetInstituteCode(),
         description: document.querySelectorAll(".modal form textarea").length >=1 ?  JSON.stringify(document.querySelector(".modal form textarea").value)  : null
    }; 

    const FORMURL = [
      Hoot()+"eduallclassroomregisterapi/post/",
      props.get ? props.get : '',
      props.url ? props.url : ''
    ];


    async function GET_DATA(){
     if(props.update){
      const response = await axios.get(FORMURL[1]); 
      if(response.data !== null){
        document.querySelector("#classroom_title").value = response.data[0].ed_classroom_title;  
        if(document.querySelectorAll(".public-DraftStyleDefault-block").length >= 1) {
            document.querySelectorAll(".public-DraftStyleDefault-block")[0].innerHTML = JSON.parse(response.data[0].ed_classroom_description);
            document.querySelector(".modal form textarea").value =  response.data[0].ed_classroom_description;
        } 
         INPUTS.title = response.data[0].ed_classroom_title 
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
      const {classroom_title} = form; 
      const NewErrors = {};

      if(INPUTS.title ===  "" || INPUTS.title ===  " "){
      if(!classroom_title || classroom_title === '') NewErrors.classroom_title = 'Sala de aula invalida';  
      }else{if(!classroom_title){setField("classroom_title", INPUTS.title);}} 
  
      return NewErrors;
  }
  
 
   const SUBMIT_INPUTS = {title:INPUTS.title, description:INPUTS.description, institute_code:INPUTS.institute_code}; 

    const FormSubmit = (e)=>{ 
      console.log(INPUTS);
       e.preventDefault();   
       const formErrors = validateForm();
      if(Object.keys(formErrors).length > 0){
            setErrors(formErrors);
            toast.error("Verifique todos os  campos");    
        }else{  
           if (!props.update) {
            axios.post(FORMURL[0], SUBMIT_INPUTS)
            .then(()=>{  
              toast.success("Sala adicionada com sucesso !");
              setForm({});
              ClearInputs();
              RefreshList(`.el-refresh-list`)
              AuditoryRegister(
                0,
                "Registrar sala",
                "Minha escola - Registrar salas",
                "Adicionou uma sala  com o titulo 12",
                "Minha escola  - Registrar salas"
              );
            }).catch((error)=>{toast.error("Lamentamos mas não foi  possivel executar esta ação")}); 
           } else {
            axios.put(FORMURL[2], SUBMIT_INPUTS)
            .then(()=>{  
              toast.success("Sala atualizada com sucesso !");
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
          case "classroom_title":
            setField("classroom_title", e.target.value) 
            INPUTS.title = e.target.value
           break; 
           case "":
            INPUTS.description = JSON.stringify(e.target.value)
           break;  
           default:
       }
    }
 

  return (
   <div>
       <div onClick={handleShow}>
            {
              props.toggle_btn ? props.toggle_btn :   <button className='btn btn-main' onClick={handleShow}><AddCircleOutlineIcon/> Registrar sala</button>  
            }
       </div>
    <Modal size='lg'  className='animate__animated animate__zoomInDown'    
       centered  dialogAs={DraggableModal}  show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title><h5> { props.title ? props.title : 'Registrar ' } sala</h5></Modal.Title>
    </Modal.Header>
    <Form onSubmit={FormSubmit}>
    <Modal.Body className='scrollLimit'>
        <Form.Group className="mb-3"  >
          <Form.Label>Nº da sala<span className="text-danger ml-2">*</span> </Form.Label>
          <Form.Control  onChange={handleInput} className={!!errors.classroom_title && 'is-invalid'} value={form.classroom_title} isInvalid={!!errors.classroom_title}
           type="number" id="classroom_title" autoFocus/>
          <Form.Control.Feedback type='invalid'>{errors.classroom_title}</Form.Control.Feedback>
        </Form.Group> 
        <Form.Group className="mb-3"  >
          <Form.Label>Descrição</Form.Label>
           <RichTextEditor   />
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

export default NewClassRoomModal