import React, { useState } from 'react'
import { Form } from 'react-bootstrap' 
import styled from 'styled-components' 
import { Link } from 'react-router-dom'; 
import  {Save , Delete, Send, BallotOutlined, SummarizeOutlined} from '@mui/icons-material'; 
import CRValue from '../../../General/components/CRValue';
import ClearInputs from '../../../General/components/ClearInputs';
import Hoot from '../../../General/components/Hoot';
import axios from 'axios';
import { RichTextEditor } from '../../../General/components/RichTextEditor';
import {toast} from 'react-toastify'; 
import { GetInstituteCode, GetTransportRoutesDataOptions } from '../../../General/components/InstituteData';
import ChangeSidebarPage from '../../../General/components/ChangeSidebarPage';


function AddStopForm(props) { 
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});  
     
    const INPUTS = {
         stop_route:CRValue("#stop_route"),  
         stop_estimate_of_arrival:CRValue("#stop_estimate_of_arrival"), 
         stop_map:"#### NO MAP EMBEDED ######", 
         stop_name:CRValue("#stop_name"),  
         institute_code:GetInstituteCode()
    }; 

    const FORMURL = [
      Hoot()+"edualltransportstopsregister/post/",
      props.get ? props.get : '',
      props.url ? props.url : ''
    ];

    const GET_DATA = async()=>{
      const response = await axios.get(FORMURL[1]); 
      if(response.data !=null){
        if(response.data[0] != null){
          document.querySelector("#stop_route").value = response.data[0].ed_transport_stop_route; 
          document.querySelector("#stop_estimate_of_arrival").value = response.data[0].ed_transport_stop_estimate_of_arrival; 
          document.querySelector("#stop_map").value  =  response.data[0].ed_transport_stop_map; 
          document.querySelector("#stop_name").value = response.data[0].ed_transport_stop_name; 

          INPUTS.stop_route = response.data[0].ed_transport_stop_route
          INPUTS.stop_estimate_of_arrival = response.data[0].ed_transport_stop_estimate_of_arrival
          INPUTS.stop_map = response.data[0].ed_transport_stop_map
          INPUTS.stop_name = response.data[0].ed_transport_stop_name
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
      const {stop_route, stop_map, stop_estimate_of_arrival, stop_name} = form; 
      const NewErrors = {};

      if(INPUTS.stop_route ===  "" || INPUTS.stop_route ===  " "){
      if(!stop_route || stop_route === '') NewErrors.stop_route = 'Paragem invalida';  
      }else{if(!stop_route){setField("stop_route", INPUTS.stop_route);}} 
 
      if(INPUTS.stop_map ===  "" || INPUTS.stop_map ===  " "){
      if(!stop_map || stop_map === '') NewErrors.stop_map = 'Periodo invalido';  
      }else{if(!stop_map){setField("stop_map", INPUTS.stop_map);}} 

      if(INPUTS.stop_estimate_of_arrival ===  "" || INPUTS.stop_estimate_of_arrival ===  " "){
      if(!stop_estimate_of_arrival || stop_estimate_of_arrival === '') NewErrors.stop_estimate_of_arrival = 'Estimativa de cheagada invalida';  
      }else{if(!stop_estimate_of_arrival){setField("stop_estimate_of_arrival", INPUTS.stop_estimate_of_arrival);}} 

      if(INPUTS.stop_name ===  "" || INPUTS.stop_name ===  " "){
      if(!stop_name || stop_name === '') NewErrors.stop_name = 'Paragem';  
      }else{if(!stop_name){setField("stop_name", INPUTS.stop_name);}} 
 
      return NewErrors;
  }
  
   const SUBMIT_INPUTS = {stop_route:INPUTS.stop_route,  stop_estimate_of_arrival:INPUTS.stop_estimate_of_arrival , stop_map:INPUTS.stop_map ,
   stop_name:INPUTS.stop_name, institute_code:INPUTS.institute_code};

    const FormSubmit = (e)=>{  
      e.preventDefault();   
      const formErrors = validateForm();
      if(Object.keys(formErrors).length > 0){
           setErrors(formErrors);
           toast.error("Verifique todos os  campos");   
        }else{
          if(!props.update){
            axios.post(FORMURL[0], SUBMIT_INPUTS).then(()=>{  
              toast.success("Paragem registrada com sucesso !");
              setForm({}); 
              ClearInputs();
            }).catch((error)=>{toast.error("Lamentamos mas não foi  possivel executar esta ação")}); 
          } else {
            axios.put(FORMURL[2] , SUBMIT_INPUTS)
            .then(()=>{  
              toast.success("Paragem atualizada com sucesso !");
              setForm({});
              ClearInputs(); 
            }).catch((error)=>{toast.error("Lamentamos mas não foi  possivel executar esta ação")}); 
          }
        }  
    };

      
    const handleInput = (e)=>{ 
       switch (e.target.id) {
        case "stop_estimate_of_arrival":
           INPUTS.stop_estimate_of_arrival = e.target.value
           setField("stop_estimate_of_arrival", e.target.value);
          break;
          case "stop_route":
            INPUTS.stop_route = e.target.value
            setField("stop_route", e.target.value);
           break;  
          case "stop_map":
            INPUTS.stop_map = e.target.value
            setField("stop_map", e.target.value);
          break; 
          case "stop_name":
            INPUTS.stop_name = e.target.value
            setField("stop_name", e.target.value);
          break; 
       }
    }
 
  return (
    <div> 
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
                  <div onClick={ChangeSidebarPage(86)}>
                      <Link className='btn bg-main' to='/stopslist'>
                         <SummarizeOutlined /> lista das paragens
                      </Link>
                  </div>
              </div>
           </div>      
          </div>
          <h2 className="title">Informações sobre a  paragem</h2>
             <Form.Group>  
                  <div className="ed-flex col-ip-3 col-12 mt-4 mb-4">
                        <div className="block">
                            <Form.Label>Nome <span className="text-danger">*</span> </Form.Label>
                            <Form.Control onChange={handleInput} className={!!errors.stop_name && 'is-invalid custom-select'}  value={form.stop_name} isInvalid={!!errors.stop_name}  
                               select name='stop_name' id="stop_name"/>
                            <Form.Control.Feedback type='invalid'>{errors.stop_name}</Form.Control.Feedback>
                        </div>
                        <div className="block ml-2">
                            <Form.Label>Rota</Form.Label>
                            <Form.Select  onChange={handleInput} className={!!errors.stop_route && 'is-invalid'}  value={form.stop_route} isInvalid={!!errors.stop_route} 
                             select name='stop_route' id="stop_route" >
                                <GetTransportRoutesDataOptions/>
                            </Form.Select> 
                            <Form.Control.Feedback type='invalid'>{errors.stop_route}</Form.Control.Feedback>
                        </div>
                        <div className="block ml-2">
                            <Form.Label>Estimativa de chegada na paragem (Tempo) </Form.Label>
                            <Form.Control onChange={handleInput}  value={form.stop_estimate_of_arrival} className={!!errors.stop_estimate_of_arrival && 'is-invalid'}  isInvalid={!!errors.stop_estimate_of_arrival} 
                            select name='stop_estimate_of_arrival' id="stop_estimate_of_arrival" />
                            <Form.Control.Feedback type='invalid'>{errors.stop_estimate_of_arrival}</Form.Control.Feedback>
                        </div>
                    </div>
             </Form.Group> 
         </Form> 
      </div>
  )
}

export default AddStopForm