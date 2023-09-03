import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { AddCircleOutline, Close, Save, Update } from '@mui/icons-material';
import { Badge, Button, Form } from 'react-bootstrap';
import { ClassDataOptions, ClassDataOptionsSelector, ServiceDataOptions, StudentsCodeDataOptionsSelector } from '../../../General/components/InstituteData';
import { MultiSelect } from 'react-multi-select-component';
import CRValue from '../../../General/components/CRValue';
import RandomCodeGenerator from '../../../General/components/RandomCodeGenerator';
import Hoot from '../../../General/components/Hoot';
import axios from 'axios';
import { Avatar, Checkbox, FormControlLabel } from '@mui/material';
import styled from 'styled-components';
import StudentDetailsMenu from '../elements/StudentDetailsMenu';
import ClearInputs from '../../../General/components/ClearInputs';
import { toast } from 'react-toastify';
import RefreshList from '../../../General/components/RefreshList';


function NewFinePriceModal(props) {
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('paper');
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({}); 
  const [servicePrice, setServiceprice] = useState(null);
  const [serviceMethod, setserviceMethod] = useState(null);
  const [serviceCoin, setServiceCoin] = useState('');   
  const [CurrentService, setCurrentService] = useState();
  const [serviceCode, setServiceCode] = useState(null); 

  const [FineIncdaysafterprevmonth, setFineIncdaysafterprevmonth] = useState(true);
  const [Finescholarshipholders, setFinescholarshipholders] = useState(true);
  const ServiceMethods = ["Diario", "Semanal", "Mensal", "Anual", "Outro"];

    const INPUTS = {  
      fine_servicecode:serviceCode,
      fine_daysafterprevmonth:CRValue("#fine_daysafterprevmonth"),
      fine_Incdaysafterprevmonth:FineIncdaysafterprevmonth  === true ? 1 : 0,
      fine_forparentswthMrCh:CRValue("#fine_forparentswthMrCh") ,
      fine_scholarshipholders:Finescholarshipholders === true ? 1 : 0, 
      fine_value:CRValue("#fine_value"), 
       fine_valuetype:CRValue("#fine_valuetype"), 
       fine_code:RandomCodeGenerator (100), 
    }

    const FORMURL = [
      Hoot()+"eduallfineregister/post/", 
      Hoot()+"eduallgetsinglestudentbycode/get/",  
      Hoot()+"eduallsingleserviceapi/get/",   
      Hoot()+"eduallgetsinglefinebyservice/get/",
      Hoot()+"eduallregisterfinerestriction/post/",
      props.get ? props.get : '',
      props.url ? props.url : '', 
   ];



const handleClickOpen = (scrollType) => () => {
  setOpen(true);
  setScroll(scrollType); 
  GET_DATA(); 
};

const handleClose = () => {
  setOpen(false);
};

 


const GET_DATA = async()=>{
  if(props.update){
   const response = await axios.get(FORMURL[5]);   
   if(response.data !== null){
     if(response.data.length >= 1){  
        

         console.log(response.data[0]);  
         INPUTS.fine_servicecode = response.data[0].ed_fine_service;
         
         document.querySelector("#fine_forparentswthMrCh").value =  response.data[0].ed_fine_parentsChildrens;
         INPUTS.fine_forparentswthMrCh = response.data[0].ed_fine_parentsChildrens; 
           
         document.querySelector("#fine_value").value  = response.data[0].ed_fine_value;
         INPUTS.fine_value = response.data[0].ed_fine_value; 
         
         document.querySelector("#fine_valuetype").value =  response.data[0].ed_fine_value_type;
         INPUTS.fine_valuetype = response.data[0].ed_fine_value_type;  

         setTimeout(() => {
          setFinescholarshipholders(response.data[0].ed_fine_for_scholarshipholders === 1 ? true : false); 
          setFineIncdaysafterprevmonth(response.data[0].ed_fine_increment_value === 1 ? true : false);
          setField("fine_daysafterprevmonth", response.data[0].ed_fine_daysafterprevmonth);
          setServiceCode(Math.floor(response.data[0].ed_fine_service));
          ServiceData(response.data[0].ed_fine_service);   
          setCurrentService(response.data[0].ed_fine_service); 
         }, 1000);
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

const ServiceData = async(e)=>{  
     const response = await axios.get(FORMURL[2]+`${e}`); 
     if (response.data.length >= 1) { 
          setServiceprice(response.data[0].ed_service_price);
          setServiceCoin(response.data[0].ed_service_coin); 
          setserviceMethod(response.data[0].ed_service_type*1);
     } 
}  


const validateForm = async()=>{
  const {fine_servicecode, fine_daysafterprevmonth, fine_Incdaysafterprevmonth, fine_forparentswthMrCh ,
   fine_value,  fine_valuetype} = form; 
  const NewErrors = {};

    if(INPUTS.fine_servicecode ===  "" || INPUTS.fine_servicecode ===  " "){
    if(!fine_servicecode || fine_servicecode === '') NewErrors.fine_servicecode = 'Serviço selecionado invalido';  
    }else{if(!fine_servicecode){setField("fine_servicecode", INPUTS.fine_servicecode);}}

   if(serviceMethod === 2){
      if(INPUTS.fine_daysafterprevmonth ===  "" || INPUTS.fine_daysafterprevmonth ===  " "){
      if(!fine_daysafterprevmonth || fine_daysafterprevmonth === '') NewErrors.fine_daysafterprevmonth = '';  
      }else{if(!fine_daysafterprevmonth){setField("fine_daysafterprevmonth", INPUTS.fine_daysafterprevmonth);}}
    } 

    const response = await axios.get(FORMURL[1]+serviceCode); 
    if(response.data.length >= 1){
        NewErrors.fine_servicecode = 'Uma multa já foi aplicada a este serviço';
    } 

    if(INPUTS.fine_Incdaysafterprevmonth ===  "" || INPUTS.fine_Incdaysafterprevmonth ===  " "){
    if(!fine_Incdaysafterprevmonth || fine_Incdaysafterprevmonth === '') NewErrors.fine_Incdaysafterprevmonth = 'Curso  invalido';  
    }else{if(!fine_Incdaysafterprevmonth){setField("fine_Incdaysafterprevmonth", INPUTS.fine_Incdaysafterprevmonth);}}

    if(INPUTS.fine_forparentswthMrCh ===  "" || INPUTS.fine_forparentswthMrCh ===  " "){
    if(!fine_forparentswthMrCh || fine_forparentswthMrCh === '') NewErrors.fine_forparentswthMrCh = 'Curso  invalido';  
    }else{if(!fine_forparentswthMrCh){setField("fine_forparentswthMrCh", INPUTS.fine_forparentswthMrCh);}}

    
    if(INPUTS.fine_value ===  "" || INPUTS.fine_value ===  " "){
    if(!fine_value || fine_value === '') NewErrors.fine_value = 'Curso  invalido';  
    }else{if(!fine_value){setField("fine_value", INPUTS.fine_value);}}
 
    if(INPUTS.fine_valuetype ===  "" || INPUTS.fine_valuetype ===  " "){
    if(!fine_valuetype || fine_valuetype === '') NewErrors.fine_valuetype = 'Curso  invalido';  
    }else{if(!fine_valuetype){setField("fine_value", INPUTS.fine_valuetype);}}

  return NewErrors;
}


const FormSubmit = async(e)=>{ 
   e.preventDefault();   
   const formErrors = validateForm();
  if(Object.keys(formErrors).length > 0){
        setErrors(formErrors);
        toast.error("Verifique todos os  campos");    
    }else{  
       if(!props.update) {


        const response = await axios.get(FORMURL[1]+serviceCode); 
        if(response.data.length >= 1){
             toast.error('Uma multa já foi aplicada a este serviço')
        }else{ 
          axios.post(FORMURL[0] , INPUTS)
          .then((e)=>{   
            toast.success("Multa aplicada com sucesso !");
             setForm({});
             ClearInputs();
          })
          .catch((error)=>{
             toast.error("Lamentamos mas não foi possivel efectuar esta ação");
          }); 
        } 
       } else { 
        const response = await axios.get(FORMURL[5]);
        if(response.data.length >= 1){
          axios.put(FORMURL[6] , INPUTS)
          .then((e)=>{  
              toast.success("Multa atualizada com sucesso !");
              console.log(e.data);
              
              setForm({});
              ClearInputs();
              setTimeout(() => {
                handleClose();
                RefreshList();
              }, 1000);
          })
          .catch((error)=>{
            toast.error("Lamentamos mas não foi possivel efectuar esta ação");
        }); 

        }else{ 
          toast.error('A multa não foi encomtrada nos registros')  
        }  
      } 
    }  
};


const SetFineDays = (e)=>{ 
    setField("fine_incdaysafterprevmonth", e.target.checked); 
    setFineIncdaysafterprevmonth(e.target.checked);
}



const SetFineScholarshipHolders = (e)=>{ 
  setField("fine_scholarshipholders", e.target.checked); 
  setFinescholarshipholders(e.target.checked);
}


const handleInput = (e)=>{   
  switch (e.target.id) {    
      case "fine_servicecode":
         setServiceCode(Math.floor(e.target.value));
         setField("fine_servicecode", e.target.value);
         INPUTS.fine_servicecode = e.target.value 
         ServiceData(e.target.value);  
     break;      
     case "fine_forparentswthMrCh":
         setField("fine_forparentswthMrCh", e.target.value);
         INPUTS.fine_forparentswthMrCh = e.target.value;
     break;   
     case "fine_daysafterprevmonth":
         setField("fine_daysafterprevmonth", e.target.value);
         INPUTS.fine_daysafterprevmonth = e.target.value;
     break;   
     case "fine_value":
         setField("fine_value", e.target.value);
         INPUTS.fine_value = e.target.value
     break;   
     case "fine_valuetype":
         setField("fine_valuetype", e.target.value);
         INPUTS.fine_valuetype = e.target.value; 
      break;     
  }
}


  return (
    <div>  
      <div onClick={handleClickOpen('body')}>
        {props.toggle_btn ? props.toggle_btn :   
          <button className='btn btn-main'><AddCircleOutline /> Aplicar multa</button>}
       </div>
      <Dialog   open={open} onClose={handleClose}  scroll={scroll}  aria-labelledby="scroll-dialog-title" 
      aria-describedby="scroll-dialog-description">
      <div className="dialog-header">
       <div className="ed-space">
           <div>
             <h5>{props.update ?  'Atualizar Multa' : 'Aplicar Multas'}</h5>
           </div>
           <div className='closeDialog' onClick={handleClose}>
              <Close/>
           </div>
         </div>
       </div>
        <Form  onSubmit={FormSubmit}>
        <DialogContent dividers={scroll === 'paper'}> 
                {
                  props.update ? 
                  <Form.Group className="mb-3"  >
                    <Form.Label>Serviço<span className="text-danger ml-2">*</span></Form.Label>
                    <Form.Select onChange={handleInput} className={!!errors.fine_servicecode && 'is-invalid'} value={form.fine_servicecode} 
                          isInvalid={!!errors.fine_servicecode} id="feepayment_servicecode">
                          <ServiceDataOptions code={CurrentService} />
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>{errors.feepayment_servicecode}</Form.Control.Feedback>
                    <div className="ed-wrap mt-2">
                      <div>{servicePrice === null ?  <div></div> : <div className='mt-2'><Badge className='bg-main-light'>
                      <small>Valor do serviço  : {servicePrice  + " "+ serviceCoin} </small></Badge></div>}</div>

                      <div>{serviceMethod === null ?  <div></div> : <div className='mt-2'><Badge className='ml-2 bg-main-light'>
                      <small>Metodo de cobrança  : {ServiceMethods[serviceMethod]} </small></Badge></div>}</div>
                    </div>
                   </Form.Group>   
                  : 
                  <Form.Group className="mb-3"  >
                    <Form.Label>Serviço<span className="text-danger ml-2">*</span></Form.Label>
                    <Form.Select onChange={handleInput} className={!!errors.fine_servicecode && 'is-invalid'} value={form.fine_servicecode} 
                          isInvalid={!!errors.fine_servicecode} id="fine_servicecode">
                      <ServiceDataOptions />
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>{errors.fine_servicecode}</Form.Control.Feedback>
                    <div className="ed-wrap mt-2">
                      <div>{servicePrice === null ?  <div></div> : <div className='mt-2'><Badge className='bg-main-light'>
                      <small>Valor do serviço  : {servicePrice  + " "+ serviceCoin} </small></Badge></div>}</div>

                      <div>{serviceMethod === null ?  <div></div> : <div className='mt-2'><Badge className='ml-2 bg-main-light'>
                      <small>Metodo de cobrança  : {ServiceMethods[serviceMethod]} </small></Badge></div>}</div>
                    </div>
                  </Form.Group>  
                } 
                <Subtitle><h3 className='mt-2 text-red mb-2'>Circustancias a serem aplicadas á multa :</h3></Subtitle> 
                {
                  serviceMethod === 2 ?
                    <div className="ed-flex mt-2">
                        <strong>Aplicar multa </strong> 
                        <div style={{maxWidth:'100px'}}>
                          <div className="ml-2 mr-2">
                            <Form.Control minLength={1} maxLength={30} onChange={handleInput} className={!!errors.fine_daysafterprevmonth && 'is-invalid'}
                            value={form.fine_daysafterprevmonth === null || form.fine_daysafterprevmonth === ''  ? 0 : form.fine_daysafterprevmonth}
                            type='number' isInvalid={!!errors.fine_daysafterprevmonth} 
                            id="fine_daysafterprevmonth"  /> 
                          </div>
                        </div>
                        <strong> dias apos o mês que entecede</strong>
                    </div>
                  : <></>
                } 
                <div className="ed-flex mt-2">
                   <FormControlLabel control={<Checkbox defaultChecked />} onChange={SetFineDays} 
                    label={`Incrementar o valor da multa a cada mês que passa`} /> 
                </div> 
               <div className="ed-block">
               <div className="mt-2 ed-flex col">
                   <strong>
                      <FormControlLabel onChange={SetFineScholarshipHolders}  control={<Checkbox defaultChecked />} 
                      label="Aplicar multa para todos os alunos  Bolseiros da instituição"  /> 
                   </strong>
                </div> 
                <div className="mt-2 ed-flex col">
                  Anular multas para encarregados com mais de  
                    <div style={{maxWidth:'100px'}}>
                       <div className="ml-2 mr-2">
                          <Form.Control min={1} max={31} minLength={1} maxLength={31} onChange={handleInput} className={!!errors.fine_forparentswthMrCh && 'is-invalid'}
                          value={form.fine_forparentswthMrCh === null || form.fine_forparentswthMrCh === ''  ? 0 : form.fine_forparentswthMrCh} type='number'
                           isInvalid={!!errors.fine_forparentswthMrCh}  id="fine_forparentswthMrCh"  /> 
                      </div>
                    </div>
                    educandos
                </div>
               </div>  
                <Form.Group className="mb-3 mt-2"  >
                    <Form.Label>Tipo de  multa<span className="text-danger ml-2">*</span></Form.Label>
                    <Form.Select onChange={handleInput} className={!!errors.fine_valuetype && 'is-invalid'} value={form.fine_valuetype} 
                          isInvalid={!!errors.fine_valuetype} id="fine_valuetype">
                           <option value='0'>Percentagem</option>
                           <option value='1'>Valor Fixo</option> 
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>{errors.fine_valuetype}</Form.Control.Feedback>
                   </Form.Group>    
                      <Form.Group className="mb-3"  >
                      <Form.Label>Valor  <span className="text-danger ml-2">*</span></Form.Label>
                      <Form.Control onChange={handleInput} className={!!errors.fine_value && 'is-invalid'} value={form.fine_value} 
                       type='number' isInvalid={!!errors.fine_value} id="fine_value"/>
                      <Form.Control.Feedback type='invalid'>{errors.fine_value}</Form.Control.Feedback>
                   </Form.Group>  
              </DialogContent> 
              <div className="dialog-footer">
              <div className="ed-space">
               <Button className='bg-light text-dark' onClick={handleClose}> Cancelar </Button> 
               <Button className="btn btn-main ml-2" type="submit">{ props.title ? <Update/> : <Save/>  }   { props.title ? props.title : 'Salvar' } </Button> 
             </div> 
          </div>
        </Form>
      </Dialog>
    </div>
  );
}
 


const Subtitle = styled.div`
     h3{font-size:16px !important;}
`;


export default NewFinePriceModal