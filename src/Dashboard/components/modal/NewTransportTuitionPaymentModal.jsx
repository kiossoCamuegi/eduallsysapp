import React, {useEffect, useState} from 'react'
import styled from 'styled-components' 
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Modal, Form, Button, Badge} from 'react-bootstrap'
import { Save } from '@mui/icons-material';
import DraggableModal from '../../../General/components/DraggableModal'; 
import axios from 'axios';
import Hoot from '../../../General/components/Hoot';
import { Avatar, Checkbox, FormControlLabel, getStepButtonUtilityClass } from '@mui/material'; 
import FileUpload from '../../../General/components/FileUpload';
import ClearInputs from '../../../General/components/ClearInputs'; 
 import { RichTextEditor } from '../../../General/components/RichTextEditor';
import CRValue from '../../../General/components/CRValue';
import {toast} from 'react-toastify';
import { Update } from '@material-ui/icons';
import { AcademicYearDataOptions, ServiceDataOptions, StudentsDataOptions ,GetInstituteCode, StudentsArray} from '../../../General/components/InstituteData';
import { MultiSelect } from 'react-multi-select-component';
import SelectSearch from 'react-select-search';


function NewTransportTuitionPaymentModal(props){
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [files, setFiles] = useState([]);
  const [Select, setSelected] = useState([]);

  const [studentCode, setStudentCode] = useState(null);  
  const [Docfile, setDocfile] = useState(false);
  const [PaymentType , setPaymentType] = useState(null);
  const [serviceCode, setServiceCode] = useState(null);
  const [servicePrice, setServiceprice] = useState(null);
  const [serviceCoin, setServiceCoin] = useState(''); 
  const [Months , SetMonths] = useState('');
  const [InvoiceValue, SetInvoiceValue] = useState(0); 
  const [monthError, setMonthError] = useState(null);
  const [Balance, SetBalance] = useState(''); 


  const handleClose = () => setShow(false); 
  const handleShow = () => {
     setShow(true); 
     GET_DATA();
  };

  const MonthOptions = [
    {label:"Janeiro", value:0, selected:true},
    {label:"Fevereiro", value:1},
    {label:"Março", value:2},
    {label:"Abril", value:3},
    {label:"Maio", value:4},
    {label:"Junho", value:5},
    {label:"Julho", value:6},
    {label:"Agosto", value:7},
    {label:"Setembro", value:8},
    {label:"Outubro", value:9},
    {label:"Novembro", value:10},
    {label:"Dezembro", value:11},
];

   
  const INPUTS = {
      transporttuition_place:CRValue("#transporttuition_place"), 
      transporttuition_discount:CRValue("#transporttuition_discount"), 
      transporttuition_bank:CRValue("#transporttuition_bank"), 
      transporttuition_price:(servicePrice+" "+serviceCoin ), 
      transporttuition_invoice:CRValue("#transporttuition_invoice"),  
      transporttuition_servicecode:CRValue("#transporttuition_servicecode"),    
      transporttuition_academic_year:CRValue("#transporttuition_academic_year"), 
      transporttuition_student_code :props.student_code ? props.student_code : studentCode,  
      transporttuition_place:CRValue("#transporttuition_place"), 
      transporttuition_bordereux_number:CRValue("#transporttuition_bordereux_number"),
      transporttuition_payment_type:CRValue("#transporttuition_payment_type"),
      transporttuition_months:Months, 
      transporttuition_balance:(Balance+ " "+ serviceCoin),
      institute_code:GetInstituteCode()
  }; 

  const FORMURL = [
    Hoot()+"eduallregistertransportuitionpayment/post/",
    Hoot()+"edualltransportuitionpaymentcheckpaidmonth/",
    Hoot()+"eduallsingleserviceapi/get/",
    props.get ? props.get : '',
    props.url ? props.url : '',
]; 

const showBoxFile = ()=>{ 
  if(Docfile === true){
    setDocfile(false)
  } else {
    setDocfile(true);
  }
} 


  const GET_DATA = async()=>{
   if(props.update){
    const response = await axios.get(FORMURL[1]); 
    if(response.data !=null){
      if(response.data[0] != null){
           
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
    const {transporttuition_academic_year, transporttuition_student_code, transporttuition_servicecode, 
    transporttuition_months, transporttuition_payment_type, transporttuition_balance, transporttuition_place, transporttuition_bank, 
    transporttuition_bordereux_number} = form; 
    const NewErrors = {};

    if(INPUTS.transporttuition_academic_year ===  "" || INPUTS.transporttuition_academic_year ===  " "){
    if(!transporttuition_academic_year || transporttuition_academic_year === '') NewErrors.transporttuition_academic_year = 'Ano acdemico invalido';  
    }else{if(!transporttuition_academic_year){setField("transporttuition_academic_year", INPUTS.transporttuition_academic_year);}} 

    if(INPUTS.transporttuition_student_code ===  "" || INPUTS.transporttuition_student_code ===  " "){
    if(!transporttuition_student_code || transporttuition_student_code === '') NewErrors.transporttuition_student_code = 'Estudante invalido';  
    }else{if(!transporttuition_student_code){setField("transporttuition_student_code", INPUTS.transporttuition_student_code);}} 

    if(INPUTS.transporttuition_servicecode ===  "" || INPUTS.transporttuition_servicecode ===  " "){
    if(!transporttuition_servicecode || transporttuition_servicecode === '') NewErrors.transporttuition_servicecode = 'Serviço  invalido';  
    }else{if(!transporttuition_servicecode){setField("transporttuition_servicecode", INPUTS.transporttuition_servicecode);}} 

    
    if(servicePrice === null){ NewErrors.transporttuition_servicecode = 'Selecione um serviço valido';} 


    if(INPUTS.transporttuition_months== "" || INPUTS.transporttuition_months== " "){
    if(!transporttuition_months|| transporttuition_months=== '') {
      NewErrors.transporttuition_months= 'Mês invalido' 
      setMonthError("Mês invalido")};  
    }else{if(!transporttuition_months){setField("transporttuition_months", INPUTS.transporttuition_months);}} 

    if(INPUTS.transporttuition_payment_type ===  "" || INPUTS.transporttuition_payment_type ===  " "){
    if(!transporttuition_payment_type || transporttuition_payment_type === '') NewErrors.transporttuition_payment_type = 'Tipo de pagamento invalido';  
    }else{if(!transporttuition_payment_type){setField("transporttuition_payment_type", INPUTS.transporttuition_payment_type);}}
    
    
    if(Math.floor(INPUTS.transporttuition_payment_type) !== 0){
       if(INPUTS.transporttuition_bank ===  "" || INPUTS.transporttuition_bank== " "){
        if(!transporttuition_bank|| transporttuition_bank=== '') NewErrors.transporttuition_bank= 'Banco invalido';  
        }else{if(!transporttuition_bank){setField("transporttuition_bank", INPUTS.transporttuition_bank );}}  
    
        if(INPUTS.transporttuition_place ===  "" || INPUTS.transporttuition_place ===  " "){
        if(!transporttuition_place|| transporttuition_place === '') NewErrors.transporttuition_place = 'Local de pagamento invalido';  
        }else{if(!transporttuition_place){setField("transporttuition_place", INPUTS.transporttuition_place);}}  

        if(INPUTS.transporttuition_bordereux_number ===  "" || INPUTS.transporttuition_bordereux_number ===  " "){
        if(!transporttuition_bordereux_number || transporttuition_bordereux_number === '') NewErrors.transporttuition_bordereux_number = 'Borderô invalido';  
        }else{if(!transporttuition_bordereux_number){setField("transporttuition_bordereux_number", INPUTS.transporttuition_bordereux_number );}}  
    }


    if(INPUTS.transporttuition_balance ===  "" || INPUTS.transporttuition_balance ===  " "){
    if(!transporttuition_balance || transporttuition_balance === '') NewErrors.transporttuition_balance = 'Valor total invalido';  
    }else{if(!transporttuition_balance){setField("transporttuition_balance", INPUTS.transporttuition_balance);}} 


    const CheckPaidMonth = async()=>{
      let TotalMonths = INPUTS.transporttuition_months.split(",");
      for (let i = 0; i < TotalMonths.length; i++) {
          if(TotalMonths[i] !== ""){
               if(Math.floor(TotalMonths[i]) >= 0){
                const response = await axios.get(FORMURL[1]+`${Math.floor(TotalMonths[i])}`+ "," +`${Math.floor(INPUTS.transporttuition_student_code)}`+","+`${Math.floor(INPUTS.transporttuition_servicecode)}`+","+`${Math.floor(INPUTS.institute_code)}`); 
                response.data.length <= 0 ?  setMonthError(null):  setMonthError(TotalMonths[i]); 
              }
          }
       }
     }
    if(CheckPaidMonth()){
      if(monthError !== null){
         NewErrors.transporttuition_months = monthError;
      }  
    }    
    return NewErrors;
}



 
useEffect(()=>{
  setTimeout(() => { 
      if(serviceCode != null){
        CalculateTotal();
          const ServiceData = async()=>{
             const response = await axios.get(FORMURL[2]+`${serviceCode}`);  
             if (response.data.length >= 1) { 
                  setServiceprice(response.data[0].ed_service_price);
                  setServiceCoin(response.data[0].ed_service_coin); 
             }
          }  
         ServiceData();
        }
  }, 500);
 });



  const FormSubmit = (e)=>{  
    e.preventDefault();    

    console.log(INPUTS)
 
  const formErrors = validateForm(); 
        if(Object.keys(formErrors).length > 0){
          setErrors(formErrors); 
          toast.error("Verifique todos os  campos");   
          console.log(formErrors);
       }else{ 


        console.log("Vamos registrar")
 
       const SUBMIT_INPUTS = {
           transporttuition_place:INPUTS.transporttuition_place ,   
           transporttuition_bank:INPUTS.transporttuition_bank , 
           transporttuition_price:INPUTS.transporttuition_price ,  
           transporttuition_servicecode:INPUTS.transporttuition_servicecode,    
           transporttuition_academic_year:INPUTS.transporttuition_academic_year , 
           transporttuition_student_code:INPUTS.transporttuition_student_code ,   
           transporttuition_bordereux_number:INPUTS.transporttuition_bordereux_number ,
           transporttuition_months:INPUTS.transporttuition_months, 
           transporttuition_payment_type:INPUTS. transporttuition_payment_type,
           transporttuition_balance:INPUTS.transporttuition_balance, 
       };

         if(!props.update){ 
           const registerData = async()=>{
           let TotalMonths = INPUTS.transporttuition_months.split(",");

           console.log(TotalMonths)
          for (let i = 0; i < TotalMonths.length; i++) {
                if(TotalMonths[i] !==""){
                   if((TotalMonths[i]*1) >= 0){ 

                    console.log("Good to gooo !")

                       const response = await axios.get(FORMURL[1]+`${Math.floor(TotalMonths[i])}`+ "," +`${Math.floor(INPUTS.transporttuition_student_code)}`+","+`${Math.floor(INPUTS.transporttuition_servicecode)}`+","+`${Math.floor(INPUTS.transporttuition_academic_year)}`);             
                   
                       console.log(response.data)
                    
                       if(response.data.length <= 0){
                       SUBMIT_INPUTS.transporttuition_months = TotalMonths[i]*1;
                       axios.post(FORMURL[0], SUBMIT_INPUTS).then(()=>{  
                         if(i === (TotalMonths.length-1)){
                            toast.success("Pagamento do transporte registrado com sucesso !");
                            setForm({});
                         }  
                         setErrors({});
                       }).catch((error)=>{
                           toast.error("Lamentamos mas não foi  possivel executar esta ação "); 
                       });  
                     }else{
                      toast.error(`O mês de ${MonthOptions[TotalMonths[i]*1].label} já foi pago`); 
                     }   
                     } else{
                      toast.error("nenhum mês foi selecionado");
                     }
                   }       
                } 
             }
             registerData();  
         } else {
           axios.put(FORMURL[2] , SUBMIT_INPUTS)
           .then(()=>{  
             toast.success("Propina atualizada com sucesso !");
             setForm({});
             ClearInputs();
             setTimeout(() => { 
                 handleClose();
             }, 1500);
           }).catch((error)=>{toast.error("Lamentamos mas não foi  possivel executar esta ação")}); 
         }

       }         
  };


  function selectedMonths(e){
       setSelected(e)
       CalculateTotal(); 
       setField("transporttuition_months", "month");
     var months = "";
     for (let i = 0; i < e.length; i++) {
           months += ","+e[i].value;
     } 
     SetMonths(months);
  }


  const CalculateTotal = ()=>{
        /**calculate the total */ 
          const AMOUNT = Select.length === 0 ? 1 : Select.length;
          const PRICE =  servicePrice === null ? 1 : servicePrice;
          const DISCOUNT = 0;
          const TOTAL = AMOUNT * PRICE;
          const DCV = (DISCOUNT <= 0 ? 0 : ((TOTAL  * DISCOUNT) / 100));

          SetInvoiceValue((TOTAL - DCV) + " "+ serviceCoin);   
          SetBalance((PRICE - DCV));
        /**end */ 
  }
    

  
    
 const GetStudentCode  = (e)=>{
    setStudentCode(e);
    setField("transporttuition_student_code", e); 
}


  const handleInput = (e)=>{   
     switch (e.target.id) {  
        case "transporttuition_academic_year":
         INPUTS.transporttuition_academic_year = e.target.value
         setField("transporttuition_academic_year", e.target.value);
        break; 
         case "transporttuition_servicecode":
            setServiceCode(Math.floor(e.target.value));
            setField("transporttuition_servicecode", e.target.value);
            INPUTS.transporttuition_servicecode = e.target.value
        break;   
        case "transporttuition_payment_type":
            setPaymentType(Math.floor(e.target.value) != 0 ? 1 : null);
            setField("transporttuition_payment_type", e.target.value);
            INPUTS.transporttuition_payment_type = e.target.value
        break;   
        case "transporttuition_balance":
            setField("transporttuition_balance", e.target.value);
            INPUTS.transporttuition_balance = e.target.value
      break;    
      case "transporttuition_invoice":
          setField("transporttuition_invoice", e.target.value);
          INPUTS.transporttuition_invoice = e.target.value
      break;   
      case "transporttuition_bank":
          setField("transporttuition_bank", e.target.value);
          INPUTS.transporttuition_bank = e.target.value
      break;  
      case "transporttuition_place":
          setField("transporttuition_place", e.target.value);
          INPUTS.transporttuition_place = e.target.value
      break;    
      case "transporttuition_bordereux_number":
        setField("transporttuition_bordereux_number", e.target.value);
        INPUTS.transporttuition_bordereux_number = e.target.value; 
       break;   
     }
  }



return (
  <div>
    <div onClick={handleShow}>
       {props.toggle_btn ? props.toggle_btn :  <button className='btn btn-main'><AddCircleOutlineIcon/>Efectuar pagamento do transporte</button>}
  </div>
<Modal size='lg'  className='animate__animated animate__zoomInDown' centered   dialogAs={DraggableModal}  show={show} onHide={handleClose}>
  <Modal.Header closeButton>
    <Modal.Title><h5>{ props.title ? props.title : 'Efectuar ' } pagamento do transporte</h5></Modal.Title>
  </Modal.Header>
  <Form onSubmit={FormSubmit}>
  <Modal.Body className='scrollLimit'>
      <Form.Group className="mb-3"  >
        <Form.Label>Ano lectivo<span className="text-danger ml-2">*</span> </Form.Label>
        <Form.Select  onChange={handleInput} className={!!errors.transporttuition_academic_year && 'is-invalid'} value={form.transporttuition_academic_year} 
            isInvalid={!!errors.transporttuition_academic_year} id="transporttuition_academic_year">
           <AcademicYearDataOptions/>
        </Form.Select>
        <Form.Control.Feedback type='invalid'>{errors.transporttuition_academic_year}</Form.Control.Feedback>
      </Form.Group>  
      <Form.Group className="mb-3"  >
        <Form.Label>Serviço<span className="text-danger ml-2">*</span></Form.Label>
        <Form.Select onChange={handleInput} className={!!errors.transporttuition_servicecode && 'is-invalid'} value={form.transporttuition_servicecode} 
              isInvalid={!!errors.transporttuition_servicecode} id="transporttuition_servicecode">
           <ServiceDataOptions/>
        </Form.Select>
        <Form.Control.Feedback type='invalid'>{errors.transporttuition_servicecode}</Form.Control.Feedback>
        <div>{servicePrice === null ?  <div></div> : <div className='mt-2'><Badge className='bg-main'><small>Valor do serviço  : {servicePrice  + " "+ serviceCoin} </small></Badge></div>}</div>
      </Form.Group> 
      {
        props.student_code ? <></> : 
        <Form.Group className="mb-3">
        <Form.Label>Nome do passageiro <span className='text-danger ml-2'>*</span></Form.Label>
              <SelectSearch   onChange={(e)=>GetStudentCode(e)} options={StudentsArray()[0]} search={true}  id="" placeholder="Selecione um aluno" />
        <Form.Control.Feedback type='invalid'>{errors.enrollment_confirmation_student_code}</Form.Control.Feedback>
       </Form.Group>   
      }
      <Form.Group className="mb-3"  >
        <Form.Label>Mês a pagar<span className="text-danger ml-2">*</span> </Form.Label>  
          <MultiSelect 
              options={MonthOptions}
              value={Select}
              className={monthError !== null ? 'border-red' : ''}
              onChange={selectedMonths}
              labelledBy='select'
          />
          <small className="text-danger">{monthError !== null ? "O mês de "+ MonthOptions[monthError].label + " Já foi pago" : ''}</small>
          <Form.Control.Feedback type='invalid'> {monthError !== null ? "O mês de "+ MonthOptions[monthError].label + " Já foi pago" : ''} </Form.Control.Feedback>
      </Form.Group> 
      <Form.Group> 
          <div className="mt-4">
                <div className="block">
                    <Form.Label>Metodo de pagamento </Form.Label>
                    <Form.Select onChange={handleInput} className={!!errors.transporttuition_payment_type && 'is-invalid'} value={form.transporttuition_payment_type} 
                    isInvalid={!!errors.transporttuition_payment_type} id="transporttuition_payment_type">
                          <option value="0" selected>Dinheiro a mão</option>
                          <option value="1">Transferência</option>
                          <option value="2">Depósito</option> 
                    </Form.Select> 
                    <Form.Control.Feedback type='invalid'>{errors.transporttuition_payment_type}</Form.Control.Feedback>
                </div>  
                <div className={PaymentType != null ? "block" : "d-none"} >
                    <div className="block mt-4">
                      <Form.Label>Nº do Borderô</Form.Label>
                      <Form.Control  type="number" onChange={handleInput} className={!!errors.transporttuition_bordereux_number && 'is-invalid'} value={form.transporttuition_bordereux_number} 
                      isInvalid={!!errors.transporttuition_bordereux_number} id="transporttuition_bordereux_number" />
                      <Form.Control.Feedback type='invalid'>{errors.transporttuition_bordereux_number}</Form.Control.Feedback>
                    </div>
                    <div className="block mt-4">
                      <Form.Label>Nome do banco </Form.Label>
                      <Form.Control  type="text" onChange={handleInput} className={!!errors.transporttuition_bank && 'is-invalid'} value={form.transporttuition_bank} 
                      isInvalid={!!errors.transporttuition_bank} id="transporttuition_bank" />
                      <Form.Control.Feedback type='invalid'>{errors.transporttuition_bank}</Form.Control.Feedback>
                    </div>
                    <div className="block mt-4">
                    <Form.Label>Local de pagamento</Form.Label>
                    <Form.Control  type="text" onChange={handleInput} className={!!errors.transporttuition_place && 'is-invalid'} value={form.transporttuition_place} 
                    isInvalid={!!errors.transporttuition_place} id="transporttuition_place" />
                    <Form.Control.Feedback type='invalid'>{errors.transporttuition_place}</Form.Control.Feedback>
                </div>
                </div>
            </div>
           </Form.Group>   
           <div className="mt-2">
          <FormControlLabel  onChange={()=>showBoxFile()}  control={<Checkbox  />} label="Anexar recibos de pagamento" />  
       </div>
     <BoxContainer className={Docfile ===  true ? 'boxItem' : 'boxItem d-none'} >
         <h2 className="title">Carregar Recibo de pagamento</h2> 
         <FileUpload input_name="student_files" Icon="0" type_of_files="image/x-png,image/gif,image/jpeg,Docs/pdf"  extensions="png,jpeg,jpg,pdf"  />
     </BoxContainer> 
    <br />    
  </Modal.Body>
  <Modal.Footer>
    <div className="ed-space">
       <div className="ed-flex">
           <h5>Total :</h5>
           <Form.Control readOnly disabled value={InvoiceValue} id="transporttuition_fine" className='text-danger ml-2' style={{maxWidth:"140px"}} />
           <Form.Control id="transporttuition_fine" onChange={handleInput} className='text-blue ml-2' placeholder='Multa' style={{maxWidth:"120px"}} />
           <h5 className="ml-2 mt-1">%</h5>
       </div>
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
  width:auto;
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


export default NewTransportTuitionPaymentModal