import React, {useEffect, useState} from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {   QuestionMarkRounded  } from '@mui/icons-material';
import {Modal, Form, Button} from 'react-bootstrap'
import { Save } from '@mui/icons-material'; 
import styled from 'styled-components'
import CurrentUserErrorsAndFeedbacks from '../components/Table/CurrentUserErrorsAndFeedbacks'; 
import Hoot from '../../General/components/Hoot';
import ClearInputs from '../../General/components/ClearInputs'; 
 import CRValue from '../../General/components/CRValue';
import {toast} from 'react-toastify';
import { Update } from '@material-ui/icons';
import axios from 'axios';

function RegisterErrrorAndFeedback() {
      const [form, setForm] = useState({});
      const [errors, setErrors] = useState({}); 
      const [FeedBackVisitStatus, setFeedBackVisitStatus] = useState(0);
      const [FeedBackSystemClassification, setFeedBackSystemClassification] = useState(0);
 

    const props = {};
     
    const INPUTS = {
         feedback_type:CRValue("#feedback_type"),  
         feedback_error_area:CRValue("#feedback_error_area"),  
         feedback_email:CRValue("#feedback_email"),  
         feedback_description:CRValue("#feedback_description"),  
         feedback_visit_status:FeedBackVisitStatus,
         feedback_system_classification:FeedBackSystemClassification
    }; 

    const FORMURL = [
      Hoot()+"eduallfeedbackregister/post",
      props.get ? props.get : '',
      props.url ? props.url : ''
    ];

    const GET_DATA = async()=>{
      const response = await axios.get(FORMURL[1]); 
      if(response.data !=null){
        if(response.data[0] != null){
          document.querySelector("#feedback_type").value = response.data[0].ed_feedback_type; 
          
          INPUTS.feedback_type = response.data[0].ed_feedback_type;
          INPUTS.feedback_error_area = response.data[0].ed_feedback_area; 

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
      const {feedback_type, feedback_description, feedback_error_area, feedback_email} = form; 
      const NewErrors = {};

      if(INPUTS.feedback_type ===  "" || INPUTS.feedback_type ===  " "){
      if(!feedback_type || feedback_type === '') NewErrors.feedback_type = 'Turma invalida';  
      }else{if(!feedback_type){setField("feedback_type", INPUTS.feedback_type);}} 

      if(INPUTS.feedback_email ===  "" || INPUTS.feedback_email ===  " "){
      if(!feedback_email || feedback_email === '') NewErrors.feedback_email = 'Email Invalido';  
      }else{if(!feedback_email){setField("feedback_email", INPUTS.feedback_email);}} 
      
      if(INPUTS.feedback_description ===  "" || INPUTS.feedback_description ===  " "){
      if(!feedback_description || feedback_description === '') NewErrors.feedback_description = 'Descrição Invalida';  
      }else{if(!feedback_description){setField("feedback_description", INPUTS.feedback_description);}} 
      
     if(Math.floor(INPUTS.feedback_type) === 0 ) {
      if(INPUTS.feedback_error_area ===  "" || INPUTS.feedback_error_area ===  " "){
      if(!feedback_error_area || feedback_error_area === '') NewErrors.feedback_error_area = 'Aréa Invalida';  
      }else{if(!feedback_error_area){setField("feedback_error_area", INPUTS.feedback_error_area);}} 
     }
 
      return NewErrors;
  }
  
    const SUBMIT_INPUTS = {feedback_type:INPUTS.feedback_type, feedback_error_area:INPUTS.feedback_error_area, 
    feedback_description:INPUTS.feedback_description, feedback_email:INPUTS.feedback_email,
    feedback_visit_status:INPUTS.feedback_visit_status, feedback_system_classification:INPUTS.feedback_system_classification};

    const FormSubmit = (e)=>{  
      e.preventDefault();   
      const formErrors = validateForm();
      if(Object.keys(formErrors).length > 0){
           setErrors(formErrors);
           toast.error("Verifique todos os  campos");   
        }else{ 
 
            if(!props.update){
            axios.post(FORMURL[0], SUBMIT_INPUTS).then(()=>{  
              toast.success("Informação envida com sucesso !");
              setForm({});
              ClearInputs(); 
            }).catch((error)=>{toast.error("Lamentamos mas não foi  possivel executar esta ação")}); 
          } else {
            axios.put(FORMURL[2] , SUBMIT_INPUTS)
            .then(()=>{  
              toast.success("Informação atualizada com sucesso !");
              setForm({});
              ClearInputs(); 
            }).catch((error)=>{toast.error("Lamentamos mas não foi  possivel executar esta ação")}); 
          }  

        }  
    };


    function HandleClassification(e) {
        setFeedBackSystemClassification(e)
    }

    function HandleVisitStatus(e){
        setFeedBackVisitStatus(e);
    }
      
    const handleInput = (e)=>{ 
       switch (e.target.id) {
        case "feedback_type":
           INPUTS.feedback_type = e.target.value
           setField("feedback_type", e.target.value);
          break; 
          case "feedback_type":
           INPUTS.feedback_error_area = e.target.value
           setField("feedback_error_area", e.target.value);
          break;  
          case "feedback_description":
           INPUTS.feedback_description = e.target.value
           setField("feedback_description", e.target.value);
          break; 
          case "feedback_email":
           INPUTS.feedback_email = e.target.value
           setField("feedback_email", e.target.value);
          break; 
       }
    }
 
    
  return (
    <Content>
     <Container className='mb-4'>
        <div className="header bg-info">
             <h1>  A sua opnião ajuda-nos á crescer mais rapido !! </h1>
         </div>
        <section>
            <h1>Relatar erros e enviar o seu feedback é muito importante para nós.</h1>
            <p className='mb-3'>Muito obrigado , nós lemos todos os feedback e erros reportados, levamos isso muito a sério.</p>
              <Form onSubmit={FormSubmit}>
                <span>Como se sentiu entrando na nossa plataforma hoje ?</span>
                  <ul className="today-website-visit">
                    <li className={FeedBackVisitStatus === 1 ? 'selected' : ''} onClick={()=>HandleVisitStatus(1)}>😣</li>
                    <li className={FeedBackVisitStatus === 2 ? 'selected' : ''} onClick={()=>HandleVisitStatus(2)}>😑</li>
                    <li className={FeedBackVisitStatus === 3 ? 'selected' : ''} onClick={()=>HandleVisitStatus(3)}>😪</li>
                    <li className={FeedBackVisitStatus === 4 ? 'selected' : ''} onClick={()=>HandleVisitStatus(4)}>😎</li>
                    <li className={FeedBackVisitStatus === 5 ? 'selected' : ''} onClick={()=>HandleVisitStatus(5)}>😍</li>
                 </ul> 
                  <Form.Group className='mt-3'>
                     <Form.Label>Que tipo de informação gostarias de enviar ?</Form.Label>
                      <Form.Select  onChange={handleInput} className={!!errors.feedback_type && 'is-invalid'} value={form.feedback_type} isInvalid={!!errors.feedback_type} id="feedback_type">
                         <option value="0">Erro</option>
                         <option value="1">Feedback</option>
                      </Form.Select>
                       <Form.Control.Feedback type='invalid'>{errors.feedback_type}</Form.Control.Feedback>
                   </Form.Group>
                     <Form.Group className='mt-3'>
                     <Form.Label>Qual parte do sistema não funciona como esperado ?</Form.Label>
                      <Form.Select onChange={handleInput} className={!!errors.feedback_type   && 'is-invalid'} value={form.feedback_type} isInvalid={!!errors.feedback_error_area} id="feedback_error_area">
                         <option selected value="0">Dashboard</option>
                      </Form.Select>
                      <Form.Control.Feedback type='invalid'>{errors.feedback_error_area}</Form.Control.Feedback>
                   </Form.Group>
                   <Form.Group className='mt-3'>
                       <Form.Label> Gostaria de partilhar algo conosco ? </Form.Label>
                       <Form.Control as="textarea" rows={5}  onChange={handleInput} className={!!errors.feedback_description && 'is-invalid'} value={form.feedback_description} isInvalid={!!errors.feedback_description} id="feedback_description" />
                       <Form.Control.Feedback type='invalid'>{errors.feedback_description}</Form.Control.Feedback>
                   </Form.Group>
                    <Form.Group className='mt-3'>
                       <Form.Label> Gostaria de ser contactado por email ? </Form.Label>
                       <Form.Control placeholder=''  onChange={handleInput} className={!!errors.feedback_email && 'is-invalid'} value={form.feedback_email} isInvalid={!!errors.feedback_email} id="feedback_email" />
                       <Form.Control.Feedback type='invalid'>{errors.feedback_email}</Form.Control.Feedback>
                   </Form.Group>
                   <p className="mt-3">Em uma escala de 1 -  10 como classificaria a nossa plataforma ?</p>
                   <ul className='ed-wrap classification'>
                       <li className={FeedBackSystemClassification === 1 ? 'selected' : ''}  onClick={()=>HandleClassification(1)}>1</li>
                       <li className={FeedBackSystemClassification === 2 ? 'selected' : ''}  onClick={()=>HandleClassification(2)}>2</li>
                       <li className={FeedBackSystemClassification === 3 ? 'selected' : ''}  onClick={()=>HandleClassification(3)}>3</li>
                       <li className={FeedBackSystemClassification === 4 ? 'selected' : ''}  onClick={()=>HandleClassification(4)}>4</li>
                       <li className={FeedBackSystemClassification === 5 ? 'selected' : ''}  onClick={()=>HandleClassification(5)}>5</li>
                       <li className={FeedBackSystemClassification === 6 ? 'selected' : ''}  onClick={()=>HandleClassification(6)}>6</li>
                       <li className={FeedBackSystemClassification === 7 ? 'selected' : ''}  onClick={()=>HandleClassification(6)}>7</li>
                       <li className={FeedBackSystemClassification === 8 ? 'selected' : ''}  onClick={()=>HandleClassification(8)}>8</li>
                       <li className={FeedBackSystemClassification === 9 ? 'selected' : ''}  onClick={()=>HandleClassification(9)}>9</li>
                       <li className={FeedBackSystemClassification === 10 ? 'selected' : ''} onClick={()=>HandleClassification(10)}>10</li>
                   </ul> 
                 <div className="ed-space">
                <div></div>
                <div>
                    <button type='submit' className="btn bg-main">{ props.title ? <Update/> : <Save/>  }   { props.title ? props.title : 'Enviar' }</button>
                </div>
            </div> 
         </Form>
        </section>
    </Container>
    <div className="pd-2"></div>
      <div style={{width:'100%'}}>
         <div className="table">
              <CurrentUserErrorsAndFeedbacks/>
         </div>
      </div>
    </Content>
  )
}



const Content = styled.div`
     width:100%;
     height:100%;
     display:flex;

    @media screen and (max-width:1280px){
        flex-direction:column;
    }

     .table{
        width:100%;  
     }

`;


const Container = styled.div`
        min-height:83vh;
        min-width:700px;
        max-width:750px;
        border-radius:6px;   
        overflow:hidden;
        background:var(--ed-white);  
        box-shadow:var(--ed-shadow-df); 
        position: relative; 
        margin-bottom:10px;

        @media screen and (max-width:1280px){
            max-width:100%;
            min-width:100%;
            min-height:910px;
            margin-bottom:10px; 

            p, span ,label{
                font-size:15px;
            }
        }

    .header{
        width:100%;
        height:70px;
        padding:20px;

        h1{
            font-size:20px;
            color:var(--ed-white);
        }
    }

    section{
         padding:20px;

        h1{
            font-size:20px;
            max-width:500px;
            line-height:30px;
            margin-bottom:10px;
        }

         ul{
            padding:0px;
            margin:10px 0px;
            list-style:none;
            display:flex;
            
            
            li{
                margin-right:15px;
                margin-top:10px;
                font-size:20px;
                cursor:pointer;
                  width:40px;
                  height:40px;
                  display:flex;
                  align-items:center;
                  justify-content:center;
                  border-radius:100%;
            }
         }

         .today-website-visit{
             .selected{
                  border:1px solid var(--ed-green);
                  color:var(--ed-green);
                  width:40px;
                  height:40px;
                  display:flex;
                  align-items:center;
                  justify-content:center;
                  border-radius:100%;
             }
         }

         ul.classification{
              li{
                width:35px;
                height:35px;
                min-width:35px;
                min-height:35px;
                border:1px solid var(--ed-white-smoke);
                display:flex;
                align-items:center;
                justify-content:center;
                border-radius:100%;
                cursor:pointer;
                font-size:14px;
              }

              li.selected{
                  border-color:var(--ed-green);
                  color:var(--ed-green);
              }
         }
    }
`;


export default RegisterErrrorAndFeedback