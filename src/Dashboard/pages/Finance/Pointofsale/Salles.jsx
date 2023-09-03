import React, {useEffect, useState} from 'react'
import { Badge, Form } from 'react-bootstrap' 
import styled from 'styled-components' 
import { Link } from 'react-router-dom'; 
import  {Save , Delete, Send, BallotOutlined, SummarizeOutlined} from '@mui/icons-material';
import { Alert } from 'bootstrap'; 
import FileUpload from '../../../../General/components/FileUpload';
import { Avatar, Checkbox, FormControlLabel } from '@mui/material'; 
import {toast} from 'react-toastify';
import CRValue from '../../../../General/components/CRValue';
import ClearInputs from '../../../../General/components/ClearInputs';
import Hoot from '../../../../General/components/Hoot';
import axios from 'axios';
import { GetAcademiclevel_byclass, GetClassroom_byclass, GetClasstitle_byclass, GetCourse_byclass, GetPeriod_byclass, GetStudentClassroom, ServiceDataOptions, StudentsDataOptions } from '../../../../General/components/InstituteData';
import { SettingsVoice } from '@material-ui/icons';
import PointOfSaleNavbar from '../../../components/elements/Finance/PointOfSaleNavbar';
import { MultiSelect } from 'react-multi-select-component';


function Salles() {
    
 document.title = 'Efectuar pagamento';  
 
 const [form, setForm] = useState({});
 const [errors, setErrors] = useState({});
 const [studentCode, setStudentCode] = useState(null); 
 const [Docfile, setDocfile] = useState(false);
 const [PaymentType , setPaymentType] = useState(null);
 const [serviceCode, setServiceCode] = useState(null);
 const [servicePrice, setServiceprice] = useState(0);
 const [serviceCoin, setServiceCoin] = useState('');
 const [StudentClass , setStudentClass] = useState('#'); 
 const [StudentName , setStudentName] = useState('#');
 const [StudentPicture , setStudentPicture] = useState('#');
 const [InvoiceValue, SetInvoiceValue] = useState(0);
 const [serviceChange, SetserviceChange] = useState(0);
 const [ServiceAmount, SetServiceAmount] = useState(1);
 const [DeliveredValue, setDeliveredValue] = useState(0);
 const [Image, setImage] = useState([]);

const FORMURL = [
    Hoot()+"eduallcourseregisterapi/post/",
    Hoot()+"eduallsinglestudentapi/get/",
    Hoot()+"eduallsingleserviceapi/get/",
]; 

const showBoxFile = ()=>{ 
  if(Docfile === true){
    setDocfile(false)
  } else {
    setDocfile(true);
  }
} 

const INPUTS = { 
    service_payment_student_code:CRValue("#service_payment_student_code"), 
    service_payment_code:CRValue("#service_payment_code"), 
    service_payment_amount:CRValue("#service_payment_amount"), 
    service_payment_type:CRValue("#service_payment_type"),  
    service_payment_balance:CRValue("#service_payment_balance"),  
    service_payment_place:CRValue("#service_payment_place"),  
    service_payment_discount:CRValue("#service_payment_discount"),  
    service_payment_value_delivered:CRValue("#service_payment_value_delivered"),  
    service_payment_bank:CRValue("#service_payment_bank"),  
    service_payment_month:CRValue("#service_payment_month"),    
    service_payment_price:servicePrice,
    service_payment_change:serviceChange,
    service_payment_invoice: InvoiceValue, 
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
    const {service_payment_student_code,service_payment_amount, service_payment_balance, service_payment_bank,
    service_payment_month, service_payment_place, service_payment_type, service_payment_code, service_payment_value_delivered ,
    service_payment_bordereux_number, service_payment_discount} = form; 
    const NewErrors = {};

    if(INPUTS.service_payment_student_code ===  "" || INPUTS.service_payment_student_code ===  " "){
    if(!service_payment_student_code || service_payment_student_code === '') NewErrors.service_payment_student_code = 'Preencha o campo corretamente';  
    }else{if(!service_payment_student_code){setField("service_payment_student_code", INPUTS.service_payment_student_code);}}

    if(INPUTS.service_payment_amount ===  "" || INPUTS.service_payment_amount ===  " "){
    if(!service_payment_amount || service_payment_amount === '') NewErrors.service_payment_amount = 'Preencha o campo corretamente';  
    }else{if(!service_payment_amount){setField("service_payment_amount", INPUTS.service_payment_amount);}}

    if(INPUTS.service_payment_code ===  "" || INPUTS.service_payment_ ===  " "){
    if(!service_payment_code || service_payment_code === '') NewErrors.service_payment_code = 'Preencha o campo corretamente';  
    }else{if(!service_payment_code){setField("service_payment_code", INPUTS.service_payment_code);}}

    if(INPUTS.service_payment_type ===  "" || INPUTS.service_payment_type ===  " "){
    if(!service_payment_type || service_payment_type === '') NewErrors.service_payment_type = 'Preencha o campo corretamente';  
    }else{if(!service_payment_type){setField("service_payment_type", INPUTS.service_payment_type);}}

    if(INPUTS.service_payment_balance ===  "" || INPUTS.service_payment_balance ===  " "){
    if(!service_payment_balance || service_payment_balance === '') NewErrors.service_payment_balance = 'Preencha o campo corretamente';  
    }else{if(!service_payment_balance){setField("service_payment_balance", INPUTS.service_payment_balance);}}

    if(PaymentType != null || PaymentType != 0){  
        if(INPUTS.service_payment_place ===  "" || INPUTS.service_payment_place ===  " "){
        if(!service_payment_place || service_payment_place === '') NewErrors.service_payment_place = 'Preencha o campo corretamente';  
        }else{if(!service_payment_place){setField("service_payment_place", INPUTS.service_payment_place);}}
    
        if(INPUTS.service_payment_bank ===  "" || INPUTS.service_payment_bank ===  " "){
        if(!service_payment_bank || service_payment_bank === '') NewErrors.service_payment_bank = 'Preencha o campo corretamente';  
        }else{if(!service_payment_bank){setField("service_payment_bank", INPUTS.service_payment_bank);}}
    
        if(INPUTS.service_payment_bordereux_number ===  "" || INPUTS.service_payment_bordereux_number ===  " "){
        if(!service_payment_bordereux_number || service_payment_bordereux_number === '') NewErrors.service_payment_bordereux_number = 'Preencha o campo corretamente';  
        }else{if(!service_payment_bordereux_number){setField("service_payment_bordereux_number", INPUTS.service_payment_bordereux_number);}}
    }
            
    if(INPUTS.service_payment_month ===  "" || INPUTS.service_payment_month ===  " "){
    if(!service_payment_month || service_payment_month === '') NewErrors.service_payment_month = 'Preencha o campo corretamente';  
    }else{if(!service_payment_month){setField("service_payment_month", INPUTS.service_payment_month);}}

    if(INPUTS.service_payment_discount < 0 || INPUTS.service_payment_discount >= 100){
    if(!service_payment_discount || service_payment_discount < 0) NewErrors.service_payment_discount = 'Disconto invalido';  
    }else{if(!service_payment_discount){setField("service_payment_discount", INPUTS.service_payment_discount);}}
 
    return NewErrors;
}

 
   useEffect(()=>{
    setTimeout(() => {
        SetInvoiceValue((servicePrice* Math.floor(ServiceAmount)));  
        SetserviceChange((DeliveredValue  -  InvoiceValue) + " " + serviceCoin); 
        if(studentCode != null){
          const StudentData = async()=>{
             const response = await axios.get(FORMURL[1]+`${studentCode}`) 
             if (response.data.length >= 1) { 
                  setStudentName(response.data[0].ed_student_name);
                  setStudentClass(response.data[0].ed_student_class);
                  setStudentPicture(response.data[0].ed_student_picture); 
             }
          }  
         StudentData();
        }
        if(serviceCode != null){
            const ServiceData = async()=>{
               const response = await axios.get(FORMURL[2]+`${serviceCode}`) 
               if (response.data.length >= 1) { 
                    setServiceprice(response.data[0].ed_service_price);
                    setServiceCoin(response.data[0].ed_service_coin);
               }
            }  
           ServiceData();
          }
    }, 100);
   });


    const FormSubmit = (e)=>{ 
        console.table(INPUTS);
        e.preventDefault();  

        const formData = new FormData();  
        formData.append("service_payment_student_code",INPUTS.service_payment_student_code);
        formData.append("service_payment_amount",INPUTS.service_payment_amount);
        formData.append("service_payment_balance",INPUTS.service_payment_balance);
        formData.append("service_payment_bank",INPUTS.service_payment_bank);
        formData.append("service_payment_month",INPUTS.service_payment_place);
        formData.append("service_payment_type",INPUTS.service_payment_type);
        formData.append("service_payment_code",INPUTS.service_payment_code);
        formData.append("service_payment_value_delivered",INPUTS.service_payment_value_delivered);
        formData.append("service_payment_bordereux_number",INPUTS.service_payment_bordereux_number); 
        formData.append("service_payment_discount",INPUTS.service_payment_discount);
        formData.append("service_payment_invoice",INPUTS.service_payment_invoice);  
        
        /*
        const formErrors = validateForm();
        if(Object.keys(formErrors).length > 0){
                setErrors(formErrors);
                toast.error("Verifique todos os  campos");    
        }else{  
            axios.post(FORMURL[0] , {
                service_payment_:INPUTS.service_payment_
            })
            .then(()=>{ 
            toast.success("Serviço pago com sucesso !");

            setTimeout(() =>{
                ClearInputs();
                setForm({});
            }, 3000);})
            .catch((error)=>{console.log(error); }); 
        }   
        */
    };



const handleInput = (e)=>{   
  switch (e.target.id) {
   case "service_payment_student_code":
      setStudentCode(Math.floor(e.target.value))
      setField("service_payment_student_code", e.target.value)
      INPUTS.service_payment_student_code = e.target.value 
     break;  
     case "service_payment_code":
        setServiceCode(Math.floor(e.target.value));
        setField("service_payment_code", e.target.value)
        INPUTS.service_payment_code = e.target.value
    break;  
    case "service_payment_amount":
        SetServiceAmount(e.target.value);
        setField("service_payment_amount", e.target.value)
        INPUTS.service_payment_amount = e.target.value
    break;  
    case "service_payment_type":
        setPaymentType(Math.floor(e.target.value) != 0 ? 1 : null);
        setField("service_payment_type", e.target.value)
        INPUTS.service_payment_type = e.target.value
    break;  
    case "service_payment_balance":
        setField("service_payment_balance", e.target.value)
        INPUTS.service_payment_balance = e.target.value
    break;   
    case "service_payment_price":
        setField("service_payment_price", e.target.value)
        INPUTS.service_payment_code = e.target.value;
    break;  
    case "service_payment_invoice":
        setField("service_payment_invoice", e.target.value)
        INPUTS.service_payment_invoice = e.target.value
    break;  
    case "service_payment_month":
        setField("service_payment_month", e.target.value)
        INPUTS.service_payment_month = e.target.value
    break;  
    case "service_payment_bank":
        setField("service_payment_bank", e.target.value)
        INPUTS.service_payment_bank = e.target.value
    break;  
    case "service_payment_place":
        setField("service_payment_place", e.target.value)
        INPUTS.service_payment_place = e.target.value
    break;  
    case "service_payment_discount":
        setField("service_payment_discount", e.target.value)
        INPUTS.service_payment_discount = e.target.value
    break;  
    case "service_payment_value_delivered":
        setDeliveredValue(Math.floor(e.target.value));
        console.log(Math.floor(e.target.value))
        setField("service_payment_value_delivered", e.target.value)
        INPUTS.service_payment_value_delivered = e.target.value
    break;  
  }
} 
 
  return (
    <>
        <PointOfSaleNavbar/>
        <div className="pd-4">
        <Form onSubmit={FormSubmit}>
            <div className="box-register">
              <div className="ed-space mb-4">
                <div className="ed-flex">
                    <button className="btn bg-danger" type='reset' id='clearForm'>
                        <Delete/>  Limpar
                    
                    </button>
                    <button className="btn ml-2 bg-green-light" type='submit'>
                        <Save/>  Salvar
                    </button> 
                </div> 
                <div>
                    <Link className='btn bg-main' to='/paidservices'>
                        <SummarizeOutlined/> Relatorio de vendas
                    </Link>
                </div>
             </div>   
            <SallesBox>
               <div className="ed-block">
               <BoxContainer className='boxItem'>
                <div className="ed-space mb-4">
                    <div><h2 className="title" style={{marginBottom:'0px'}}>Efectuar venda de produtos</h2></div>
                </div> 
                   <div className="d-flex">
                    <div className="image">
                         <img loading="lazy" role="presentation" src="http://localhost:3000/static/media/picture.3c0a422b9d39f22e1be7.jpg" alt="" />
                        <div className="controls"></div>
                    </div>
                    <div className="ed-block">
                    <Form.Group> 
                        <div> 
                            <div className="block">
                                <Form.Label>Nome ou Código do cliente</Form.Label>
                                <Form.Control id='service_payment_student_code' onChange={handleInput} className={!!errors.service_payment_student_code && 'is-invalid'} value={form.service_payment_student_code} 
                                isInvalid={!!errors.service_payment_student_code}/> 
                                <Form.Control.Feedback type='invalid'>{errors.service_payment_student_code}</Form.Control.Feedback>
                            </div>
                        </div>
                    </Form.Group>  
                    <Form.Group> 
                        <div className="mt-4"> 
                            <div className="block" style={{width:'99%'}}>
                                <Form.Label>Produto</Form.Label>
                                <Form.Group className="mb-3"  > 
                                     <Form.Select>

                                     </Form.Select>
                                 </Form.Group> 
                                 <Badge className='bg-main'><small>Preço unitário : 1000 AOA</small> </Badge>
                                <Form.Control.Feedback type='invalid'>{errors.service_payment_code}</Form.Control.Feedback>
                            </div>
                        </div>
                    </Form.Group> 
                    </div>
                   </div>
                 <div className="ed-flex">
                     <div className="col-lg-6">
                     <Form.Group>
                        <div className="mt-4">
                            <div className="block">
                                <Form.Label>Quantidade</Form.Label>
                                <Form.Control  type="number" onChange={handleInput} className={!!errors.service_payment_amount && 'is-invalid'} value={ServiceAmount} 
                                isInvalid={!!errors.service_payment_amount} id="service_payment_amount" />
                                <Form.Control.Feedback type='invalid'>{errors.service_payment_amount}</Form.Control.Feedback>
                            </div>
                        </div>
                    </Form.Group> 
                     </div>
                     <div className="pdm"></div>
                     <div style={{width:'48%'}}>
                     <Form.Group>
                        <div className="mt-4">
                            <div className="block">
                                <Form.Label>Estoque</Form.Label>
                                <Form.Control disabled readOnly type="number"/>
                            </div>
                        </div>
                    </Form.Group> 
                     </div>
                 </div>
                </BoxContainer>
                <div className="pdm"></div>  
                <BoxContainer className='boxItem mt-4'>
                <div className="ed-space mb-4">
                    <div><h2 className="title" style={{marginBottom:'0px'}}>Metodo de pagamento</h2></div> 
                    </div>  
                    <Form.Group> 
                        <div className="mt-4">
                            <div className="block">
                                <Form.Label>Metodo de pagamento </Form.Label>
                                <Form.Select onChange={handleInput} className={!!errors.service_payment_type && 'is-invalid'} value={form.service_payment_type} 
                                isInvalid={!!errors.service_payment_type} id="service_payment_type">
                                        <option value="0" selected>Dinheiro a mão</option>
                                        <option value="1">Transferência</option>
                                        <option value="2">Depósito</option> 
                                </Form.Select> 
                                <Form.Control.Feedback type='invalid'>{errors.service_payment_type}</Form.Control.Feedback>
                            </div> 

                            <div className={PaymentType != null ? "block" : "d-none"} >
                                <div className="block mt-4">
                                    <Form.Label>Nº do Borderô</Form.Label>
                                    <Form.Control  type="number" onChange={handleInput} className={!!errors.service_payment_bordereux_number && 'is-invalid'} value={form.service_payment_bordereux_number} 
                                    isInvalid={!!errors.service_payment_bordereux_number} id="service_payment_bordereux_number" />
                                    <Form.Control.Feedback type='invalid'>{errors.service_payment_bordereux_number}</Form.Control.Feedback>
                                </div>
                                <div className="block mt-4">
                                    <Form.Label>Nome do banco </Form.Label>
                                    <Form.Control  type="text" onChange={handleInput} className={!!errors.service_payment_bank && 'is-invalid'} value={form.service_payment_bank} 
                                    isInvalid={!!errors.service_payment_bank} id="service_payment_bank" />
                                    <Form.Control.Feedback type='invalid'>{errors.service_payment_bank}</Form.Control.Feedback>
                                </div>
                                <div className="block mt-4">
                                <Form.Label>Local de pagamento</Form.Label>
                                <Form.Control  type="text" onChange={handleInput} className={!!errors.service_payment_place && 'is-invalid'} value={form.service_payment_place} 
                                isInvalid={!!errors.service_payment_place} id="service_payment_place" />
                                <Form.Control.Feedback type='invalid'>{errors.service_payment_place}</Form.Control.Feedback>
                            </div>
                            </div>  
                        </div>
                    </Form.Group>      
                </BoxContainer> 
               </div>
               <div className="pdm"></div>
               <div className="ed-block">
               <BoxContainer className='boxItem'>
                <div className="ed-space mb-4">
                    <div><h2 className="title" style={{marginBottom:'0px'}}>Detalhes da fatura</h2></div> 
                </div> 
                <div className="custom-box">
                <Form.Group> 
                        <div className="mt-4">
                            <div className="block">
                                <Form.Label>Desconto (%)</Form.Label>
                                <Form.Control   type="number" className={!!errors.service_payment_discount && 'is-invalid'} value={form.service_payment_discount} 
                                isInvalid={!!errors.service_payment_discount}  id="service_payment_discount" /> 
                                    <Form.Control.Feedback type='invalid'>{errors.service_payment_discount}</Form.Control.Feedback>
                            </div>
                            <div className="block mt-4">
                                <Form.Label>Valor entregue</Form.Label>
                                <Form.Control  type="number" className={!!errors.service_payment_value_delivered && 'is-invalid'} value={form.service_payment_value_delivered} 
                                isInvalid={!!errors.service_payment_value_delivered} id="service_payment_value_delivered" /> 
                                    <Form.Control.Feedback type='invalid'>{errors.service_payment_value_delivered}</Form.Control.Feedback>
                            </div>
                            <div className="block mt-4">
                                <Form.Label>Troco</Form.Label>
                                <Form.Control readOnly  type="text"  className={!!errors.service_payment_change && 'is-invalid'} value={serviceChange} 
                                isInvalid={!!errors.service_payment_change} id="service_payment_change"  /> 
                                    <Form.Control.Feedback type='invalid'>{errors.service_payment_change}</Form.Control.Feedback>
                            </div> 
                        </div>
                    </Form.Group>  
                    <Form.Group> 
                        <div className="ed-flex col-ip-3 col-12 mt-4">
                            <div className="block col">
                                <Form.Label>Total Fatura</Form.Label>
                                <Form.Control readOnly  type="text" className='text-right text-danger' value={InvoiceValue + " "+ serviceCoin} id="service_payment_invoice" name='' /> 
                            </div> 
                        </div>
                    </Form.Group>  
                </div>    
                </BoxContainer>
               </div>  
             </SallesBox>
            </div>
          </Form>
        </div>
     </> 
  )
}


const BoxContainer = styled.div` 
    width:100%; 
    height:auto;
    border-radius:6px;
    margin:10px 0;
    padding:20px;
    min-height:200px;
    background:var(--ed-white);  
    box-shadow:var(--ed-shadow-df); 
    
    .image{
        min-width:300px;
        min-height:200px;
        width:300px;
        height:230px;
        padding-right:20px;

        img{
            width:100%;
            height:100%;
            cursor:pointer;
        }
    }


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


const SallesBox = styled.section`
   display:flex;
   width:100%;

   .ed-block{
      width:49%;
   } 
   
   @media screen and (max-width:1290px){
      flex-wrap:wrap;

      .ed-block{
          width:100%;
       }
    }
`;
 

export default Salles