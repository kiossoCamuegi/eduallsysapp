import React, { useState } from 'react'
import { Form } from 'react-bootstrap' 
import styled from 'styled-components' 
import { Link } from 'react-router-dom'; 
import  {Save , Delete, Send, BallotOutlined, SummarizeOutlined} from '@mui/icons-material';
import { Alert } from 'bootstrap'; 
import BuildDataHistory from '../components/elements/BuildDataHistory'; 
import CRValue from '../../General/components/CRValue';
import ClearInputs from '../../General/components/ClearInputs';
import Hoot from '../../General/components/Hoot';
import axios from 'axios';
import { RichTextEditor } from '../../General/components/RichTextEditor';
import {toast} from 'react-toastify'; 
import {  GetInstituteCode  } from '../../General/components/InstituteData';
import {MultiSelect} from 'react-multi-select-component' 


function RegisterTitleAndHeaders() {
    document.title = "Registrar cabeçalhos e titulos";
    const props = {};

    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});    

 
    const INPUTS = {
        title_name:CRValue("#title_name"),  
        title_for:CRValue("#title_for"), 
        title_description: JSON.stringify(CRValue(".title-header-description textarea")),
        institute_code:GetInstituteCode()
   }; 

   const FORMURL = [
     Hoot()+"edualltitlesandheadersregister/post/",
     props.get ? props.get : '',
     props.url ? props.url : ''
   ];


   const GET_DATA = async()=>{
     const response = await axios.get(FORMURL[1]); 
     if(response.data !=null){
       if(response.data[0] != null){
         document.querySelector("#title_name").value = response.data[0].ed_title_name; 
         document.querySelector("#title_for").value  = response.data[0].ed_title_for;  
         
         if(document.querySelectorAll(".public-DraftStyleDefault-block").length >= 1){ 
         document.querySelector(".modal form textarea").value =  response.data[0].ed_title_description;} 
 
         INPUTS.title_name = response.data[0].ed_title_name
         INPUTS.title_for = response.data[0].ed_title_for
         INPUTS.title_description = response.data[0].ed_title_description
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
     const {title_name, title_for} = form; 
     const NewErrors = {};

     if(INPUTS.title_name ===  "" || INPUTS.title_name ===  " "){
     if(!title_name || title_name === '') NewErrors.title_name = 'Nome invalido';  
     }else{if(!title_name){setField("title_name", INPUTS.title_name);}} 
 
     if(INPUTS.title_for ===  "" || INPUTS.title_for ===  " "){
     if(!title_for || title_for === '') NewErrors.title_for = 'Selecione uma opção valida';  
     }else{if(!title_for){setField("title_for", INPUTS.title_for);}} 
 
     return NewErrors;
 }

   const FormSubmit = (e)=>{  
     e.preventDefault();   
     const formErrors = validateForm();
     if(Object.keys(formErrors).length > 0){
          setErrors(formErrors);
          toast.error("Verifique todos os  campos");   
       }else{
        const SUBMIT_INPUTS = {title_name:INPUTS.title_name, title_for:INPUTS.title_for , title_description:INPUTS.title_description};

        console.log(SUBMIT_INPUTS)
       
        if(!props.update){
           axios.post(FORMURL[0], SUBMIT_INPUTS).then((e)=>{
            console.log(e)  
             toast.success("Informação registrada com sucesso !"); 
           }).catch((error)=>{
            toast.error("Lamentamos mas não foi  possivel executar esta ação")
            console.log(error); 
          }); 
         } else {
           axios.put(FORMURL[2] , SUBMIT_INPUTS)
           .then(()=>{  
             toast.success("Informação atualizada com sucesso !");
             
    

           }).catch((error)=>{toast.error("Lamentamos mas não foi  possivel executar esta ação")}); 
         }

       }  
   };

     
   const handleInput = (e)=>{ 
      switch (e.target.id) {
       case "title_name":
          INPUTS.title_name = e.target.value
          setField("title_name", e.target.value);
         break;  
      }
   }

  return (
    <Form onSubmit={FormSubmit}  method='post' encType='multipart/form-data'>
       <div className="box-register">
       <div className="ed-space mb-4">
            <div className="ed-flex">
                <button className="btn bg-danger" type='reset' id='clearForm'>
                   <Delete/>  Limpar
                </button>
                <button className="btn ml-2 bg-green-light" type="submit">
                  <Save/>  Salvar
                </button> 
            </div>
            <div className="ed-flex"> 
                <Link to='/titles_and_headers' className='btn ml-2 btn-main'>
                   <SummarizeOutlined/> Titulos & cabeçalhos
                </Link>
            </div>
        </div> 
       <BoxContainer className='boxItem'>
          <div className="ed-space mb-4">
              <div><h2 className="title" style={{marginBottom:'0px'}}>Crie cabeçalhos e titulos customizados</h2></div>
             <BuildDataHistory/>
          </div> 
          <Form.Group> 
                <div className="col-12 mt-4 mb-3">
                    <div className="block">
                        <Form.Label>Nome do cabeçalho ou titulo <span className="text-danger ml-2">*</span></Form.Label>
                        <Form.Control   type="text" onChange={handleInput} className={!!errors.title_name && 'is-invalid'}  
                        isInvalid={!!errors.title_name}  id="title_name"/>
                        <Form.Control.Feedback type='invalid'>{errors.title_name}</Form.Control.Feedback>
                    </div> 
                </div>
          </Form.Group> 
          <Form.Group className="mb-3"  >
          <Form.Label>Utilizar este cabeçalho ou titulo para :<span className="text-danger ml-2">*</span> </Form.Label>   
            <Form.Control   type="text" onChange={handleInput} className={!!errors.title_for && 'is-invalid'}  
            isInvalid={!!errors.title_for}  id="title_for"/>
            <Form.Control.Feedback type='invalid'>{errors.title_for}</Form.Control.Feedback>
        </Form.Group> 
        <Form.Group>
            <Form.Label>Cabaçalho ou Titulo :<span className="text-danger ml-2">*</span> </Form.Label>  
           <div className="title-header-description">
              <RichTextEditor/>
           </div>
        </Form.Group>
       </BoxContainer> 
       </div>  
     </Form>
  )
}

const BoxContainer = styled.div` 
    width:100%; 
    border-radius:6px;
    margin-bottom:20px;  
    padding:20px;
    min-height:200px;
    background:var(--ed-white);  
    box-shadow:var(--ed-shadow-df); 

 


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

export default RegisterTitleAndHeaders