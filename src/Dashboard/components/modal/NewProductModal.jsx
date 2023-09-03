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
import { Checkbox, FormControlLabel } from '@mui/material'; 
import { CoinsDataOptions, GetInstituteCode, ProvidersDataOptions } from '../../../General/components/InstituteData';
import FileUpload from '../../../General/components/FileUpload'; 
import styled from 'styled-components' 




function NewProductModal(props){
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});
    const [Docfile, setDocfile] = useState(false);
    const [Image, setImage] = useState([]);

    const Data = [];
    const handleShow = () => {
      setShow(true);
      GET_DATA();
    }


    const showBoxFile = ()=>{ 
        if(Docfile === true){
          setDocfile(false)
        } else {
          setDocfile(true);
        }
      }
     
    const INPUTS = {
        product_title:CRValue("#product_title"), 
        product_purchase_price:CRValue("#product_purchase_price"), 
        product_sales_price:CRValue("#product_sales_price"), 
        product_type_of_coin:CRValue("#product_type_of_coin"),
        product_provider:CRValue("#product_provider"),
        product_stock_amount:CRValue("#product_stock_amount"), 
        product_image:Image,
        institute_code:GetInstituteCode(),
        description: document.querySelectorAll(".modal form textarea").length >=1 ?  JSON.stringify(document.querySelector(".modal form textarea").value)  : null
    }; 

    const FORMURL = [
      Hoot()+"eduallproductsregister/post/",
      props.get ? props.get : '',
      props.url ? props.url : ''
    ];


    const GetProductImage = (e)=>{
      setImage(e[0]); 
      console.log(e[0]);
   }

    const GET_DATA = async()=>{
      const response = await axios.get(FORMURL[1]); 
      if(response.data !=null){
           if(response.data[0] != null){
            setTimeout(() => {
                //document.querySelector("#year_title").value = response.data[0].year_title;  
        
                //INPUTS.title = Data[0].year_title; 
               
           }, 200);
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
      const {product_title, product_purchase_price, product_sales_price, product_type_of_coin, product_provider, product_stock_amount} = form; 
      const NewErrors = {};

      if(INPUTS.product_title ===  "" || INPUTS.product_title ===  " "){
      if(!product_title || product_title === '') NewErrors.product_title = 'Nome do produto invalido';  
      }else{if(!product_title){setField("product_title", INPUTS.title);}} 

      if(INPUTS.product_purchase_price ===  "" || INPUTS.product_purchase_price ===  " "){
      if(!product_purchase_price || product_purchase_price === '') NewErrors.product_purchase_price = 'Valor de compra invalido';  
      }else{if(!product_purchase_price){setField("product_purchase_price", INPUTS.product_purchase_price);}} 
   
      if(INPUTS.product_sales_price ===  "" || INPUTS.product_sales_price ===  " "){
      if(!product_sales_price || product_sales_price === '') NewErrors.product_sales_price = 'Valor de venda invalido';  
      }else{if(!product_sales_price){setField("product_sales_price", INPUTS.product_sales_price);}} 
    
      if(INPUTS.product_type_of_coin ===  "" || INPUTS.product_type_of_coin ===  " "){
      if(!product_type_of_coin || product_type_of_coin === '') NewErrors.product_type_of_coin = 'Moeda ivalida';  
      }else{if(!product_type_of_coin){setField("product_type_of_coin", INPUTS.product_type_of_coin);}} 
        
      if(INPUTS.product_provider ===  "" || INPUTS.product_provider ===  " "){
      if(!product_provider || product_provider === '') NewErrors.product_provider = 'Fornecedor invalido';  
      }else{if(!product_provider){setField("product_provider", INPUTS.product_provider);}} 
           
      if(INPUTS.product_stock_amount ===  "" || INPUTS.product_stock_amount ===  " "){
      if(!product_stock_amount || product_stock_amount === '') NewErrors.product_stock_amount = 'A Quantidade de produtos no stock é invalida';  
      }else{if(!product_stock_amount){setField("product_stock_amount", INPUTS.product_stock_amount);}} 
  
      if(product_stock_amount*1 <= 0 || INPUTS.product_stock_amount*1 <= 0 ) NewErrors.product_stock_amount = 'A Quantidade de produtos no stock é invalida';  

      return NewErrors;
  }
  

    const FormSubmit = (e)=>{  
       e.preventDefault();   
       const formErrors = validateForm();
      if(Object.keys(formErrors).length > 0){
            setErrors(formErrors);
            toast.error("Verifique todos os  campos");    
        }else{  
                
          const formData = new FormData(); 
          formData.append("product_title",INPUTS.product_title);
          formData.append("product_purchase_price",INPUTS.product_purchase_price);
          formData.append("product_sales_price",INPUTS.product_sales_price);
          formData.append("product_image",INPUTS.product_image); 
          formData.append("product_type_of_coin",INPUTS.product_type_of_coin);
          formData.append("product_provider",INPUTS.product_provider);
          formData.append("product_stock_amount",INPUTS.product_stock_amount);
          formData.append("product_description",INPUTS.description);
          formData.append("institute_code",INPUTS.institute_code);



          console.log(formData)
        
        if (!props.update) {
            axios.post(FORMURL[0], formData)
            .then((e)=>{  
              toast.success("Produto  adicionado com sucesso !");
              setForm({});
             // ClearInputs();
             console.log(e);
            }).catch((error)=>{


              toast.error("Lamentamos mas não foi  possivel executar esta ação");
              console.log(error); 
            }); 
           } else {
            axios.put(FORMURL[2], formData)
            .then(()=>{  
              toast.success("Produto  atualizado com sucesso !");
              setForm({});
              ClearInputs();
              setTimeout(() => {
                handleClose();
                Data = [];
              }, 1500);
            }).catch((error)=>{
              toast.error("Lamentamos mas não foi  possivel executar esta ação")
              console.log(error); 
            }); 
           }  
        }  
    };

      
    const handleInput = (e)=>{ 
       switch (e.target.id) { 
          case "product_title":
            setField("product_title", e.target.value) 
            INPUTS.product_title = e.target.value
           break;
           case "product_purchase_price":
            setField("product_purchase_price", e.target.value) 
            INPUTS.product_purchase_price = e.target.value
           break;
           case "product_sales_price":
            setField("product_sales_price", e.target.value) 
            INPUTS.product_sales_price = e.target.value
           break;
           case "product_type_of_coin":
            setField("product_type_of_coin", e.target.value) 
            INPUTS.product_type_of_coin = e.target.value
           break;
           case "product_provider":
            setField("product_provider", e.target.value) 
            INPUTS.product_provider = e.target.value
           break;
           case "product_stock_amount":
            setField("product_stock_amount", e.target.value) 
            INPUTS.product_stock_amount = e.target.value
           break; 
       }
    }
 

  return (
   <div>
       <div onClick={handleShow}>
            {
              props.toggle_btn ? props.toggle_btn :   <button className='btn btn-main' onClick={handleShow}><AddCircleOutlineIcon/> Registrar novo produto</button>  
            }
       </div>
    <Modal  size='lg'  centered  dialogAs={DraggableModal}  show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title><h5> { props.title ? props.title : 'Registrar ' } Produto</h5></Modal.Title>
    </Modal.Header>
    <Form onSubmit={FormSubmit} method='post' encType='multipart/form-data'>
    <Modal.Body className='scrollLimit'>
        <Form.Group className="mb-3"  >
          <Form.Label>Nome do produto<span className="text-danger ml-2">*</span> </Form.Label>
          <Form.Control  onChange={handleInput} className={!!errors.product_title && 'is-invalid'} value={form.product_title} isInvalid={!!errors.product_title}
           type="text" id="product_title" autoFocus/>
          <Form.Control.Feedback type='invalid'>{errors.product_title}</Form.Control.Feedback>
        </Form.Group>
       <div className="ed-flex">
       <div className="block " style={{width:'48%'}}>
       <Form.Group className="mb-3"  >
          <Form.Label>Valor de compra<span className="text-danger ml-2">*</span> </Form.Label>
          <Form.Control  onChange={handleInput} className={!!errors.product_purchase_price && 'is-invalid'} value={form.product_purchase_price} 
          isInvalid={!!errors.product_purchase_price} type="text" id="product_purchase_price" autoFocus/>
          <Form.Control.Feedback type='invalid'>{errors.product_purchase_price}</Form.Control.Feedback>
        </Form.Group>
       </div>
       <div className="pdm"></div>
        <div className="block col-lg-6">
        <Form.Group className="mb-3"  >
          <Form.Label>Valor de venda<span className="text-danger ml-2">*</span> </Form.Label>
          <Form.Control  onChange={handleInput} className={!!errors.product_sales_price && 'is-invalid'} value={form.product_sales_price} 
          isInvalid={!!errors.product_sales_price}  type="number" id="product_sales_price" autoFocus/>
          <Form.Control.Feedback type='invalid'>{errors.product_sales_price}</Form.Control.Feedback>
        </Form.Group>
        </div>
       </div>
        <Form.Group className="mb-3"  >
          <Form.Label>Tipo de moeda<span className="text-danger ml-2">*</span> </Form.Label>
          <Form.Select  onChange={handleInput} className={!!errors.product_type_of_coin && 'is-invalid'} value={form.product_type_of_coin} 
          isInvalid={!!errors.product_type_of_coin}  id="product_type_of_coin" autoFocus>
                 <CoinsDataOptions/>
           </Form.Select>
          <Form.Control.Feedback type='invalid'>{errors.product_type_of_coin}</Form.Control.Feedback>
        </Form.Group> 

        <Form.Group className="mb-3"  >
          <Form.Label>Nome do fornecedor<span className="text-danger ml-2">*</span> </Form.Label>
          <Form.Select  onChange={handleInput} className={!!errors.product_provider && 'is-invalid'} value={form.product_provider} 
          isInvalid={!!errors.product_provider}  id="product_provider" autoFocus>
                <ProvidersDataOptions/>
           </Form.Select>
          <Form.Control.Feedback type='invalid'>{errors.product_provider}</Form.Control.Feedback>
        </Form.Group> 
        <Form.Group className="mb-3"  >
          <Form.Label>Quantidade no stock<span className="text-danger ml-2">*</span> </Form.Label>
          <Form.Control  onChange={handleInput} className={!!errors.product_stock_amount && 'is-invalid'} value={form.product_stock_amount} 
          isInvalid={!!errors.product_stock_amount} type="number" id="product_stock_amount" autoFocus/>
          <Form.Control.Feedback type='invalid'>{errors.product_stock_amount}</Form.Control.Feedback>
        </Form.Group>  
        <Form.Group className="mb-3"  >
          <Form.Label>Descrição<span className="text-danger ml-2">*</span> </Form.Label>
           <RichTextEditor   />
        </Form.Group>  
        <div >
            <FormControlLabel  onChange={()=>showBoxFile()}  control={<Checkbox  />} label="Adicionar imagens ao produto" />  
         </div>
      <BoxContainer className={Docfile ===  true ? 'boxItem' : 'boxItem d-none'} >
            <h2 className="title">Carregar imagens do produto</h2> 
             <FileUpload input_name="product_pictures" single FileArray={GetProductImage} Icon="1" type_of_files="image/x-png,image/gif,image/jpeg"  extensions="png,jpeg,jpg"  />
       </BoxContainer> 
         <br /> 
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

export default NewProductModal