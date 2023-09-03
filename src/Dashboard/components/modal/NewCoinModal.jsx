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


function NewCoinModal(props){
    const [show, setShow] = useState(false);
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});  

    const handleClose = () => setShow(false);
    const handleShow = () => {
       setShow(true); 
       GET_DATA();
    };
     
    const INPUTS = {
         coin_title:CRValue("#coin_title"), 
         coin_value_in_euro:CRValue("#coin_value_in_euro"), 
         coin_value_in_dollar:CRValue("#coin_value_in_dollar"), 
         coin_exchange_value:CRValue("#coin_exchange_value"), 
         coin_tax_value:CRValue("#coin_tax_value"), 
         coin_tax:CRValue("#coin_tax"), 
         coin_iva:CRValue("#coin_iva"),  
         institute_code:GetInstituteCode()
    }; 

    const FORMURL = [
      Hoot()+"eduallregistercoins/post/",
      props.get ? props.get : '',
      props.url ? props.url : ''
    ];

    const GET_DATA = async()=>{
      const response = await axios.get(FORMURL[1]); 
      if(response.data !=null){
        if(response.data[0] != null){
          document.querySelector("#coin_title").value = response.data[0].ed_coin_title; 
          document.querySelector("#coin_value_in_euro").value  = response.data[0].ed_coin_value_in_euro; 
          document.querySelector("#coin_value_in_dollar").value = response.data[0].ed_coin_value_in_dollar; 
          document.querySelector("#coin_exchange_value").value  = response.data[0].ed_coin_exchange_value; 
          document.querySelector("#coin_tax_value").value = response.data[0].ed_coin_tax_value; 
          document.querySelector("#coin_iva").value  = response.data[0].ed_coin_iva;  
          document.querySelector("#coin_tax").value  = response.data[0].ed_coin_tax;  
          
          if(document.querySelectorAll(".public-DraftStyleDefault-block").length >= 1){ 
          document.querySelector(".modal form textarea").value =  response.data[0].ed_coin_description;} 

          INPUTS.coin_title = response.data[0].ed_coin_title
          INPUTS.coin_value_in_euro = response.data[0].ed_coin_value_in_euro
          INPUTS.coin_value_in_dollar = response.data[0].ed_coin_value_in_dollar
          INPUTS.coin_exchange_value = response.data[0].ed_coin_exchange_value
          INPUTS.coin_tax_value = response.data[0].ed_coin_tax_value
          INPUTS.coin_iva = response.data[0].ed_coin_iva 
          INPUTS.coin_tax = response.data[0].ed_coin_tax 
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
      const {coin_title, coin_value_in_euro, coin_iva, coin_exchange_value, 
      coin_value_in_dollar, coin_tax, coin_tax_value} = form; 
      const NewErrors = {};

      if(INPUTS.coin_title ===  "" || INPUTS.coin_title ===  " "){
      if(!coin_title || coin_title === '') NewErrors.coin_title = 'Turma invalida';  
      }else{if(!coin_title){setField("coin_title", INPUTS.coin_title);}} 

      if(INPUTS.coin_value_in_euro ===  "" || INPUTS.coin_value_in_euro ===  " "){
      if(!coin_value_in_euro || coin_value_in_euro === '') NewErrors.coin_value_in_euro = 'Código invalido';  
      }else{if(!coin_value_in_euro){setField("coin_value_in_euro", INPUTS.coin_value_in_euro);}} 

      if(INPUTS.coin_iva ===  "" || INPUTS.coin_iva ===  " "){
      if(!coin_iva || coin_iva === '') NewErrors.coin_iva = 'IVA invalido';  
      }else{if(!coin_iva){setField("coin_iva", INPUTS.coin_iva);}} 
 
      if(INPUTS.coin_exchange_value ===  "" || INPUTS.coin_exchange_value ===  " "){
      if(!coin_exchange_value || coin_exchange_value === '') NewErrors.coin_exchange_value = 'Valor invalido';  
      }else{if(!coin_exchange_value){setField("coin_exchange_value", INPUTS.coin_exchange_value);}} 

      if(INPUTS.coin_value_in_dollar ===  "" || INPUTS.coin_value_in_dollar ===  " "){
      if(!coin_value_in_dollar || coin_value_in_dollar === '') NewErrors.coin_value_in_dollar = 'Valor invalido';  
      }else{if(!coin_value_in_dollar){setField("coin_value_in_dollar", INPUTS.coin_value_in_dollar);}} 

      if(INPUTS.coin_tax_value ===  "" || INPUTS.coin_tax_value ===  " "){
      if(!coin_tax_value || coin_tax_value === '') NewErrors.coin_tax_value = 'Valor invalido';  
      }else{if(!coin_tax_value){setField("coin_tax_value", INPUTS.coin_tax_value);}} 
  
      if(INPUTS.coin_tax ===  "" || INPUTS.coin_tax ===  " "){
      if(!coin_tax || coin_tax === '') NewErrors.coin_tax = 'Taxa invalida';  
      }else{if(!coin_tax){setField("coin_tax", INPUTS.coin_tax);}} 
    
      return NewErrors;
    }
  
    const FormSubmit = (e)=>{  
      e.preventDefault();   
      const formErrors = validateForm();
      if(Object.keys(formErrors).length > 0){
           setErrors(formErrors);
           toast.error("Verifique todos os  campos");   
        }else{
          const SUBMIT_INPUTS = {coin_title:INPUTS.coin_title, coin_value_in_euro:INPUTS.coin_value_in_euro, coin_value_in_dollar:INPUTS.coin_value_in_dollar , 
          coin_exchange_value:INPUTS.coin_exchange_value , coin_tax:INPUTS.coin_tax, coin_tax_value:INPUTS.coin_tax_value, coin_iva:INPUTS.coin_iva,
         institute_code:INPUTS.institute_code};
            
          if(!props.update){
            axios.post(FORMURL[0], SUBMIT_INPUTS).then(()=>{  
              toast.success("Moeda registrada com sucesso !");
              setForm({}); 
              ClearInputs();
              RefreshList(`.el-refresh-list`)
            }).catch((error)=>{toast.error("Lamentamos mas não foi  possivel executar esta ação")}); 
          } else {
            axios.put(FORMURL[2] , SUBMIT_INPUTS)
            .then(()=>{  
              toast.success("Moeda atualizada com sucesso !");
              setForm({});
              ClearInputs();
              RefreshList(`.el-refresh-list`)
              setTimeout(() => { 
                  handleClose();
              }, 1500);
            }).catch((error)=>{
               console.log(error); 
              toast.error("Lamentamos mas não foi  possivel executar esta ação");
            }); 
          }
        }  
    };

      
    const handleInput = (e)=>{  
       switch (e.target.id) {
        case "coin_value_in_dollar":
           INPUTS.coin_value_in_dollar = e.target.value
           setField("coin_value_in_dollar", e.target.value);
          break;
          case "coin_title":
            INPUTS.coin_title = e.target.value
            setField("coin_title", e.target.value);
           break; 
           case "coin_value_in_euro":
            INPUTS.coin_value_in_euro = e.target.value
            setField("coin_value_in_euro", e.target.value);
           break;
          case "coin_exchange_value":
            INPUTS.coin_exchange_value = e.target.value
            setField("coin_exchange_value", e.target.value);
          break;
          case "coin_iva":
            INPUTS.coin_iva = e.target.value
            setField("coin_iva", e.target.value);
          break;
          case "coin_tax_value":
            INPUTS.coin_tax_value = e.target.value
            setField("coin_tax_value", e.target.value);
          break; 
          case "coin_tax":
            INPUTS.coin_tax = e.target.value
            setField("coin_tax", e.target.value);
          break; 
          default:
       }
    }
 

  
    return (
        <div>  
          <div onClick={handleShow}>
                {
                  props.toggle_btn ? props.toggle_btn :   <button className='btn btn-main'><AddCircleOutlineIcon/>Definir moedas</button>  
                }
           </div>
          <Modal className='animate__animated animate__zoomInDown'  centered  size='lg' dialogAs={DraggableModal}  show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title><h5>{ props.title ? props.title : 'Definir ' } moeda</h5></Modal.Title>
            </Modal.Header>
            <Form onSubmit={FormSubmit}> 
            <Modal.Body className='scrollLimit'>
                <Form.Group className="mb-3" >
                  <Form.Label>Moeda<span className='text-danger ml-2'>*</span></Form.Label>
                  <Form.Control onChange={handleInput} className={!!errors.coin_title && 'is-invalid'} value={form.coin_title} isInvalid={!!errors.coin_title}
                  type="text" id="coin_title" />
                  <Form.Control.Feedback type='invalid'>{errors.coin_title}</Form.Control.Feedback>
                </Form.Group>  
                <Form.Group className="mb-3">
                  <Form.Label>Valor em Dolar<span className='text-danger ml-2'>*</span></Form.Label>
                  <Form.Control  onChange={handleInput} className={!!errors.coin_value_in_dollar && 'is-invalid'} value={form.coin_value_in_dollar} isInvalid={!!errors.coin_value_in_dollar}
                  type="text" id="coin_value_in_dollar" />
                  <Form.Control.Feedback type='invalid'>{errors.coin_value_in_dollar}</Form.Control.Feedback>
                </Form.Group>  
                <Form.Group className="mb-3">
                  <Form.Label>Valor em Euro<span className='text-danger ml-2'>*</span></Form.Label>
                  <Form.Control  onChange={handleInput} className={!!errors.coin_value_in_euro && 'is-invalid'} value={form.coin_value_in_euro} isInvalid={!!errors.coin_value_in_euro}
                  type="text" id="coin_value_in_euro" />
                  <Form.Control.Feedback type='invalid'>{errors.coin_value_in_euro}</Form.Control.Feedback>
                </Form.Group>  
                <Form.Group className="mb-3">
                  <Form.Label>Valor de Cambio<span className='text-danger ml-2'>*</span></Form.Label>
                  <Form.Control  onChange={handleInput} className={!!errors.coin_exchange_value && 'is-invalid'} value={form.coin_exchange_value} isInvalid={!!errors.coin_exchange_value}
                  type="text" id="coin_exchange_value" />
                  <Form.Control.Feedback type='invalid'>{errors.coin_exchange_value}</Form.Control.Feedback>
                </Form.Group>  
                <Form.Group className="mb-3">
                  <Form.Label>IVA<span className='text-danger ml-2'>*</span></Form.Label>
                  <Form.Control  onChange={handleInput} className={!!errors.coin_iva && 'is-invalid'} value={form.coin_iva} isInvalid={!!errors.coin_iva}
                  type="text" id="coin_iva" />
                  <Form.Control.Feedback type='invalid'>{errors.coin_iva}</Form.Control.Feedback> 
                </Form.Group>  
                <Form.Group className="mb-3">
                  <Form.Label>Imposto<span className='text-danger ml-2'>*</span></Form.Label>
                  <Form.Control  onChange={handleInput} className={!!errors.coin_tax && 'is-invalid'} value={form.coin_tax} isInvalid={!!errors.coin_tax}
                  type="text" id="coin_tax" />
                  <Form.Control.Feedback type='invalid'>{errors.coin_tax}</Form.Control.Feedback>
                </Form.Group>  
                <Form.Group className="mb-3">
                  <Form.Label>Valor do imposto<span className='text-danger ml-2'>*</span></Form.Label>
                  <Form.Control  onChange={handleInput} className={!!errors.coin_tax_value && 'is-invalid'} value={form.coin_tax_value} isInvalid={!!errors.coin_tax_value}
                  type="text" id="coin_tax_value" />
                  <Form.Control.Feedback type='invalid'>{errors.coin_tax_value}</Form.Control.Feedback>
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

export default NewCoinModal