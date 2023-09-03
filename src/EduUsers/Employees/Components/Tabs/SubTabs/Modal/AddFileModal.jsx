import React, {useEffect, useState} from 'react'
import styled from 'styled-components' 
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Modal, Form, Button, Badge} from 'react-bootstrap'
import { Save } from '@mui/icons-material';
import DraggableModal from '../../../../../../General/components/DraggableModal';
import axios from 'axios';
import Hoot from  '../../../../../../General/components/Hoot'; 
import ClearInputs from '../../../../../../General/components/ClearInputs'; 
import CRValue from  '../../../../../../General/components/CRValue';
 
import { RichTextEditor } from '../../../../../../General/components/RichTextEditor'; 
import FileUpload from '../../../../../../General/components/FileUpload';

import {toast} from 'react-toastify';
import { Update } from '@material-ui/icons';
import SelectSearch from 'react-select-search';

function AddFileModal(props) {
    const [show, setShow] = useState(false);
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});   
    const [Total, SetTotal] = useState(0);
    const [Image, setImage] = useState([]);
    const [Docfile, setDocfile] = useState(false);

    const handleClose = () => setShow(false); 
    const handleShow = () => {
       setShow(true); 
       GET_DATA();
    };


    const GetProductImage = (e)=>{
        setImage(e[0]); 
        console.log(e[0]);
     }
  
 
     
    const INPUTS = { 
        quarterly_note_npp:CRValue("#quarterly_note_npp")*1, 
    }; 

    const FORMURL = [
      Hoot()+"eduallquarterlynotesregister/post",
      Hoot()+"eduallfeepaymentcheckpaidmonth/", 
      props.get ? props.get : '',
      props.url ? props.url : '',
  ]; 
  
 

    const GET_DATA = async()=>{
     if(props.update){
      const response = await axios.get(FORMURL[1]); 
      if(response.data !=null){
        if(response.data[0] != null){
            // document.querySelector("#quarterly_note_class").value = response.data[0].ed_quarterly_note_class; 
            // INPUTS.class_description = response.data[0].class_description
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
      const { quarterly_note_npp} = form; 
      const NewErrors = {};
      
       
      if(INPUTS.quarterly_note_npp ===  "" || INPUTS.quarterly_note_npp ===  " "){
      if(!quarterly_note_npp || quarterly_note_npp === '') NewErrors.quarterly_note_npp = 'NPP   invalido';  
      }else{if(!quarterly_note_npp){setField("quarterly_note_npp", INPUTS.quarterly_note_npp);}} 
 
       
      return NewErrors;
  }
 

    const FormSubmit = (e)=>{  
      e.preventDefault();     
      const formErrors = validateForm(); 
          if(Object.keys(formErrors).length > 0){
            setErrors(formErrors); 
            toast.error("Verifique todos os  campos");   
            console.log(formErrors);
         }else{ 
  
         const SUBMIT_INPUTS = { 
             quarterly_note_npp:INPUTS.quarterly_note_npp, 
         };
  
           if(!props.update){ 
            console.log(SUBMIT_INPUTS);
            axios.post(FORMURL[0], SUBMIT_INPUTS).then(()=>{  
                toast.success("Nota adicionada com sucesso !");
                setForm({});
                ClearInputs(); 
          }).catch((error)=>{toast.error("Lamentamos mas não foi  possivel executar esta ação")});  
         console.log(SUBMIT_INPUTS)
           } else {
             axios.put(FORMURL[2] , SUBMIT_INPUTS)
             .then(()=>{  
               toast.success("Nota atualizada com sucesso !");
               setForm({});
               ClearInputs(); 
             }).catch((error)=>{toast.error("Lamentamos mas não foi  possivel executar esta ação")}); 
           } 
         }         
    };
 
 


    const handleInput = (e)=>{    
       switch (e.target.id) {  
          case "quarterly_note_npp":
              setField("quarterly_note_npp", e.target.value);
              INPUTS.quarterly_note_npp = e.target.value
          break;  
          default:    
       }
      SetTotal(Math.ceil(((INPUTS.quarterly_note_npp*1)  + (INPUTS.quarterly_note_mac*1)  + (INPUTS.quarterly_note_npt*1)) / 3));
    }

  return (
    <div>
      <div onClick={handleShow}>
       {props.toggle_btn ? props.toggle_btn :  <button className="btn text-white bg-main"><AddCircleOutlineIcon/> Adicionar novo </button>}
    </div>
  <Modal size='lg'  className='animate__animated animate__zoomInDown' centered   dialogAs={DraggableModal}  show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title><h5>{ props.title ? props.title : 'Adicionar' }  ficheiros</h5></Modal.Title>
    </Modal.Header>
    <Form onSubmit={FormSubmit}>
    <Modal.Body className='scrollLimit'> 
         <div>
             <Form.Group className="mb-3"  >
              <Form.Label>Titulo do ficheiro</Form.Label>
              <Form.Control text="number" onChange={handleInput} className={!!errors.quarterly_note_npp && 'is-invalid'} value={form.quarterly_note_npp} 
               isInvalid={!!errors.quarterly_note_npp} id="quarterly_note_npp">
                  
              </Form.Control>
              <Form.Control.Feedback type='invalid'>{errors.quarterly_note_npp}</Form.Control.Feedback>
            </Form.Group>  
        </div>  
        <div>
             <Form.Group className="mb-3">
              <Form.Label>Partilhar este  ficheiro com</Form.Label>
              <Form.Select text="number" onChange={handleInput} className={!!errors.quarterly_note_npp && 'is-invalid'} value={form.quarterly_note_npp} 
               isInvalid={!!errors.quarterly_note_npp} id="quarterly_note_npp">
                  
              </Form.Select>
              <Form.Control.Feedback type='invalid'>{errors.quarterly_note_npp}</Form.Control.Feedback>
            </Form.Group>  
        </div>  
        <Form.Group className="mb-3"  >
          <Form.Label>Descrição<span className="text-danger ml-2">*</span> </Form.Label>
           <RichTextEditor   />
        </Form.Group>  
        <BoxContainer className={Docfile ===  true ? 'boxItem' : 'boxItem d-none'} >
            <h2 className="title">Carregar ficheiro</h2> 
             <FileUpload input_name="product_pictures" single FileArray={GetProductImage} Icon="1"
              type_of_files="image/x-png,image/gif,image/jpeg"  extensions="png,jpeg,jpg"  />
       </BoxContainer> 
      <br /> 
    </Modal.Body>
    <Modal.Footer>
      <div className="ed-space"> 
         <div></div>
         <div className="ed-flex">
            <Button className='bg-light text-dark' onClick={handleClose}> Cancelar </Button>
            <Button className="btn btn-main ml-2" type="submit">{ props.title ? <Update/> : <Save/>  }   { props.title ? props.title : 'Salvar' } </Button>
         </div>
      </div>
    </Modal.Footer>
    </Form>
  </Modal>
    </div>
  )
}


const BoxContainer = styled.div` 
    width:100%; 
    border-radius:6px;
    margin:10px 0;
    padding:20px;
    min-height:200px;
    background:var(--ed-white);  
    box-shadow:var(--ed-shadow-df); 


    .Camera{
        min-height:80vh; 
        border:2px dashed var(--purple-light);
    }


    .title{
        font-size:18px; 
        text-transform:uppercase;
        font-weight:600;
        margin-top:10px;
        margin-bottom:25px;
    }

    .col-ip-3{
        width:100%;

        .block{
            width:33.3%;
        }
    }

    .box{ 
        width:100%;
        display:flex;
        flex-direction:column;

        .fill{
            width:100%;
            display:flex;

            .block{
                width:50%;
            }
        }
    }
`;

export default AddFileModal
