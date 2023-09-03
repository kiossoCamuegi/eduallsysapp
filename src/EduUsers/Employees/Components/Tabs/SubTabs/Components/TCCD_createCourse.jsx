import { Save, Update } from '@mui/icons-material'
import axios from 'axios';
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import styled from 'styled-components'
import Hoot from '../../../../../../General/components/Hoot';
import ClearInputs from '../../../../../../General/components/ClearInputs';
import { toast } from 'react-toastify';
import CRValue from '../../../../../../General/components/CRValue';

function TCCD_createCourse(props) {
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({}); 
    const [studentCode, setStudentCode] = useState(null);  
  
      
      const INPUTS = { 
          quarterly_note_npp:CRValue("#quarterly_note_npp")*1, 
      }; 
  
      const FORMURL = [
        Hoot()+"eduallquarterlynotesregister/post",
        Hoot()+"eduallattendancecheckpaidmonth/", 
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
   
   
      const GetStudentCode  = (e)=>{    
         setStudentCode(e);   
      }
  
      const handleInput = (e)=>{    
         switch (e.target.id) {  
            case "quarterly_note_npp":
                setField("quarterly_note_npp", e.target.value);
                INPUTS.quarterly_note_npp = e.target.value
            break;      
         } 
      }

  return (
    <Container> 
        <div className="col">
           <div className="section-col">
               <BoxContainer>

               </BoxContainer>
           </div>
        </div>
    </Container>
  )
}


const Container = styled.div`
  display:flex; 
  margin:20px 0px;

  form{
      min-width:400px; 
  }
`;

 
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
        font-weight:600;
        margin-top:10px;
        margin-bottom:25px;
    } 
`;


export default TCCD_createCourse
