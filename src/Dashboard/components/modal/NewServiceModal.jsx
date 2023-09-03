import React, {useState} from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Modal, Form, Button} from 'react-bootstrap'
import { Save, Update } from '@mui/icons-material';
import DraggableModal from '../../../General/components/DraggableModal';
import { RichTextEditor } from '../../../General/components/RichTextEditor';
import {toast} from 'react-toastify';
import CRValue from '../../../General/components/CRValue';
import ClearInputs from '../../../General/components/ClearInputs';
import Hoot from '../../../General/components/Hoot';
import axios from 'axios';
import { CoinsDataOptions, GetInstituteCode, ProvidersDataOptions } from '../../../General/components/InstituteData';
import RefreshList from '../../../General/components/RefreshList';



function NewServiceModal(props) {
  const [show, setShow] = useState(false); 
  const handleClose = () => setShow(false);
  const handleShow = () => {
  setShow(true) 
      GET_DATA(); 
  }; 

  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
   
  const INPUTS = {
       service_title:CRValue("#service_title"), 
       service_iva:CRValue("#service_iva"), 
       service_provider:CRValue("#service_provider"), 
       service_type:CRValue("#service_type"), 
       service_price:CRValue("#service_price"), 
       service_coin:CRValue("#service_coin"), 
       service_description: JSON.stringify(CRValue(".service-description-input textarea")),
       institute_code :GetInstituteCode()
  }; 

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

  const FORMURL = [
    Hoot()+'eduallserviceregisterapi/post/',
    props.get ? props.get : '',
    props.url ? props.url : ''
  ];

  const GET_DATA = async()=>{
   if(props.update){
    const response = await axios.get(FORMURL[1]); 
    if(response.data.length >= 1){  
      setTimeout(() => {
        document.querySelector("#service_title").value = response.data[0].ed_service_title;;
        document.querySelector("#service_provider").value  = response.data[0].ed_service_provider; 
        document.querySelector("#service_type").value = response.data[0].ed_service_type; 
        document.querySelector("#service_price").value  = response.data[0].ed_service_price;
        document.querySelector("#service_coin").value  = response.data[0].ed_service_coin;
        document.querySelector("#service_iva").value  = response.data[0].ed_service_iva;

        INPUTS.service_title = response.data[0].ed_service_title;
        INPUTS.service_provider = response.data[0].ed_service_provider;
        INPUTS.service_type = response.data[0].ed_service_type; 
        INPUTS.service_price = response.data[0].ed_service_price;
        INPUTS.service_coin = response.data[0].ed_service_coin;
        INPUTS.service_iva = response.data[0].ed_service_iva;

      }, 200); 
    }
   }
  }


  const validateForm = ()=>{
    const {service_title,service_iva, service_provider, service_type, service_price, service_coin} = form; 
    const NewErrors = {};

    if(INPUTS.service_title ===  "" || INPUTS.service_title ===  " "){
    if(!service_title || service_title === '') NewErrors.service_title = 'serviço invalido';  
    }else{if(!service_title){setField("service_title", INPUTS.service_title);}} 
    
    if(INPUTS.service_coin ===  "" || INPUTS.service_coin ===  " "){
    if(!service_coin || service_coin === '') NewErrors.service_coin = 'Moeda invalido';  
    }else{if(!service_coin){setField("service_coin", INPUTS.service_coin);}} 
 
    if(INPUTS.service_type ===  "" || INPUTS.service_type ===  " "){
    if(!service_type || service_type === '') NewErrors.service_type = 'Tipo de serviço invalido';  
    }else{if(!service_type){setField("service_type", INPUTS.service_type);}} 

     
    if(INPUTS.service_iva ===  "" || INPUTS.service_iva ===  " "){
     if(!service_iva || service_iva === '') NewErrors.service_iva = 'O valor selecionado é invalido';  
     if(INPUTS.service_iva*1 !== 0 || INPUTS.service_iva*1 !== 1) NewErrors.service_iva = 'O valor selecionado é invalido'; 
    }else{if(!service_iva){setField("service_iva", INPUTS.service_iva);}} 
 
 
    if(INPUTS.service_price ===  "" || INPUTS.service_price ===  " "){
    if(!service_price || service_price === '') NewErrors.service_price = 'Valor do serviço invalido';  
    }else{if(!service_price){setField("service_price", INPUTS.service_price);}} 
   
    if(INPUTS.service_provider ===  "" || INPUTS.service_provider ===  " "){
    if(!service_provider || service_provider === '') NewErrors.service_provider = 'Fornecedor invalido';  
    }else{if(!service_provider){setField("service_provider", INPUTS.service_provider);}} 

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
        const SubmitInputs = {service_iva:INPUTS.service_iva,  service_title:INPUTS.service_title , service_type:INPUTS.service_type, 
          service_price:INPUTS.service_price, service_provider:INPUTS.service_provider , service_coin:INPUTS.service_coin,
          service_description:INPUTS.service_description, institute_code:INPUTS.institute_code }
         
           if(!props.update){
              axios.post(FORMURL[0], SubmitInputs)
            .then(()=>{  
              toast.success("Serviço adicionado com sucesso !");
              setForm({});
              ClearInputs(); 
              RefreshList(`.el-refresh-list`)
            }).catch((error)=>{
               console.log(error); 
              toast.error("Lamentamos mas não foi  possivel executar esta ação")}); 
           } else {
            axios.put(FORMURL[2] , SubmitInputs)
            .then(()=>{  
              toast.success("Serviço atualizado com sucesso !");
              setForm({});
              ClearInputs(); 
              RefreshList(`.el-refresh-list`)
              setTimeout(() => {
                  handleClose();
              }, 1000);
            }).catch((error)=>{toast.error("Lamentamos mas não foi  possivel executar esta ação")}); 
          }
      }  
  };

    
  const handleInput = (e)=>{ 
     switch (e.target.id) { 
        case "service_title":
          setField("service_title", e.target.value) 
          INPUTS.service_title = e.target.value
         break;  
         case "service_type":
          setField("service_type", e.target.value) 
          INPUTS.service_type = e.target.value
         break;  
         case "service_provider":
          setField("service_provider", e.target.value) 
          INPUTS.service_provider = e.target.value
         break;  
         case "service_price":
          setField("service_price", e.target.value) 
          INPUTS.service_price = e.target.value
         break;  
         case "service_coin":
          setField("service_coin", e.target.value) 
          INPUTS.service_coin = e.target.value
         break;  
         case "service_iva":
          setField("service_iva", e.target.value) 
          INPUTS.service_iva = e.target.value
         break;  
     }
  }


  return (
    <div>
         <div>
   <div onClick={handleShow}>
            {
              props.toggle_btn ? props.toggle_btn : <button className='btn btn-main ml-2'><AddCircleOutlineIcon/> Registrar serviço</button> 
            }
      </div>
   <Modal size='lg' dialogAs={DraggableModal}  centered  className='animate__animated animate__zoomInDown'  show={show} onHide={handleClose}>
     <Modal.Header closeButton>
       <Modal.Title><h5>{ props.title ? props.title : 'Registrar ' } serviço</h5></Modal.Title>
     </Modal.Header>
     <Form onSubmit={FormSubmit}>
     <Modal.Body className='scrollLimit'> 
         <Form.Group className="mb-3"  >
           <Form.Label>Nome do serviço<span className="text-danger ml-2">*</span> </Form.Label>
           <Form.Control type="text" onChange={handleInput} className={!!errors.service_title && 'is-invalid'} value={form.service_title} 
          isInvalid={!!errors.service_title} id="service_title"  />
          <Form.Control.Feedback type='invalid'>{errors.service_title}</Form.Control.Feedback>
         </Form.Group>
         <Form.Group className="mb-3"  >
           <Form.Label>Preço<span className="text-danger ml-2">*</span> </Form.Label>
           <Form.Control type="number" onChange={handleInput} className={!!errors.service_price && 'is-invalid'} value={form.service_price} 
           isInvalid={!!errors.service_price} id="service_price" />
           <Form.Control.Feedback type='invalid'>{errors.service_price}</Form.Control.Feedback>
         </Form.Group>  
         <Form.Group className="mb-3"  >
           <Form.Label>Metodo de cobrança <span className="text-danger ml-2">*</span> </Form.Label>
           <Form.Select onChange={handleInput} className={!!errors.service_type && 'is-invalid'} value={form.service_type} 
          isInvalid={!!errors.service_type} id="service_type" >
               <option value="0" selected>Diario</option>
               <option value="1">Semanal</option>
               <option value="2">Mensal</option>
               <option value="3">Anual</option>
               <option value="4">Outro</option>
           </Form.Select>
           <Form.Control.Feedback type='invalid'>{errors.service_type}</Form.Control.Feedback>
         </Form.Group>
         <Form.Group className="mb-3"  >
           <Form.Label>Moeda<span className="text-danger ml-2">*</span> </Form.Label>
           <Form.Select onChange={handleInput} className={!!errors.service_coin && 'is-invalid'} value={form.service_coin} 
           isInvalid={!!errors.service_coin} id="service_coin" >
                 <option value="Kz">Kwanza</option>
                 <option value="$">Dollar (USD)</option>
                 <option value="€">Euro</option>
           </Form.Select>
           <Form.Control.Feedback type='invalid'>{errors.service_coin}</Form.Control.Feedback>
         </Form.Group>
         <Form.Group className="mb-3"  >
           <Form.Label>Fornecedor<span className="text-danger ml-2">*</span> </Form.Label>
           <Form.Select onChange={handleInput} className={!!errors.service_provider && 'is-invalid'} value={form.service_provider} 
               isInvalid={!!errors.service_provider} id="service_provider" >
               <ProvidersDataOptions/>
           </Form.Select>
           <Form.Control.Feedback type='invalid'>{errors.service_provider}</Form.Control.Feedback>
         </Form.Group> 
         <Form.Group className='mb-3'>
          <Form.Label>Aplicar Iva<span className="text-danger ml-2">*</span></Form.Label>
          <Form.Select onChange={handleInput} className={!!errors.service_iva && 'is-invalid'} value={form.service_iva} 
              isInvalid={!!errors.service_iva} id="service_iva">
                <option value='0'>Não</option>
                <option value='1'>Sim</option> 
          </Form.Select>
          <Form.Control.Feedback type='invalid'>{errors.service_iva}</Form.Control.Feedback>
        </Form.Group>
         <div className="ed-flex">
             <div className="service-description-input">
                <Form.Label>Descrição</Form.Label>
               <RichTextEditor/>
             </div>
         </div> 
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

export default NewServiceModal