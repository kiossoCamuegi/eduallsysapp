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
import { GetInstituteCode, VehiclesDataOptions } from '../../../General/components/InstituteData';
import ChangeSidebarPage from '../../../General/components/ChangeSidebarPage';

function AddBusRouteForm(props) { 
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});  
 
    const INPUTS = {
         route_vehicle:CRValue("#route_vehicle"),  
         route_name:CRValue("#route_name"),  
         route_description: JSON.stringify(CRValue("form textarea")),
         route_map: "###### Map not embeded  ########",
         institute_code:GetInstituteCode()
    }; 

    const FORMURL = [
      Hoot()+"edualltransportrouteregister/post/",
      props.get ? props.get : '',
      props.url ? props.url : ''
    ];

    const GET_DATA = async()=>{
      const response = await axios.get(FORMURL[1]); 
      if(response.data !=null){
        if(response.data[0] != null){
          document.querySelector("#route_vehicle").value = response.data[0].ed_transport_route_vehicle;  
          document.querySelector("#route_name").value = response.data[0].ed_transport_route_name;  
          
          if(document.querySelectorAll(".public-DraftStyleDefault-block").length >= 1){ 
          document.querySelector("form textarea").value =  response.data[0].ed_transport_route_description;} 

          INPUTS.route_vehicle = response.data[0].ed_transport_route_vehicle 
          INPUTS.route_name = response.data[0].ed_transport_route_name 
          INPUTS.route_description = response.data[0].ed_transport_route_description
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
      const {route_vehicle,  route_name } = form; 
      const NewErrors = {};

      if(INPUTS.route_vehicle ===  "" || INPUTS.route_vehicle ===  " "){
      if(!route_vehicle || route_vehicle === '') NewErrors.route_vehicle = 'Veiculo invalido';  
      }else{if(!route_vehicle){setField("route_vehicle", INPUTS.route_vehicle);}}  

      if(INPUTS.route_name ===  "" || INPUTS.route_name ===  " "){
      if(!route_name || route_name === '') NewErrors.route_name = 'Rota invalida';  
      }else{if(!route_name){setField("route_name", INPUTS.route_name);}} 
  
      return NewErrors;
  }
  
    const FormSubmit = (e)=>{  
      e.preventDefault();   
      const formErrors = validateForm();
      if(Object.keys(formErrors).length > 0){
           setErrors(formErrors);
           toast.error("Verifique todos os  campos");   
        }else{
           
         const SUBMIT_INPUTS = {route_vehicle:INPUTS.route_vehicle, route_map:INPUTS.route_map, route_name:INPUTS.route_name ,
         route_description:INPUTS.route_description, institute_code:INPUTS.institute_code};

         console.log(SUBMIT_INPUTS);
    
          if(!props.update){
            axios.post(FORMURL[0], SUBMIT_INPUTS).then(()=>{  
              toast.success("Rota registrada com sucesso !");
              setForm({});
              ClearInputs(); 
            }).catch((error)=>{toast.error("Lamentamos mas não foi  possivel executar esta ação")}); 
          } else {
            axios.put(FORMURL[2] , SUBMIT_INPUTS)
            .then(()=>{  
              toast.success("Rota atualizada com sucesso !");
              setForm({});
              ClearInputs(); 
            }).catch((error)=>{toast.error("Lamentamos mas não foi  possivel executar esta ação")}); 
          }
        }  
    };

      
    const handleInput = (e)=>{ 
       switch (e.target.id) {
        case "route_name":
           INPUTS.route_name = e.target.value
           setField("route_name", e.target.value);
          break;
          case "route_vehicle":
            INPUTS.route_vehicle = e.target.value
            setField("route_vehicle", e.target.value);
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
                      <Link className='btn bg-main' to='/paidservices'>
                         <SummarizeOutlined /> lista das rotas
                      </Link>
                  </div>
              </div>
           </div>      
          </div>
          <h2 className="title">Informações sobre a rota</h2>
             <Form.Group>  
                  <div className="ed-flex  col-12 mt-4 mb-4">
                        <div className="block col-lg-6">
                            <Form.Label>Nome <span className="text-danger">*</span> </Form.Label>
                            <Form.Control onChange={handleInput} className={!!errors.route_name && 'is-invalid custom-select'}  value={form.route_name} isInvalid={!!errors.route_name}  
                               select name='route_name' id="route_name"/>
                            <Form.Control.Feedback type='invalid'>{errors.route_name}</Form.Control.Feedback>
                        </div>
                        <div className="pd-1"></div>
                        <div className="block col">
                            <Form.Label>Viatura</Form.Label>
                            <Form.Select  onChange={handleInput} className={!!errors.route_vehicle && 'is-invalid'}  value={form.route_vehicle} isInvalid={!!errors.route_vehicle} 
                             select name='route_vehicle' id="route_vehicle" >
                                <VehiclesDataOptions/>
                            </Form.Select> 
                            <Form.Control.Feedback type='invalid'>{errors.route_vehicle}</Form.Control.Feedback>
                        </div> 
                    </div>
             </Form.Group>
             <div className='mt-4'>
               <Form.Label>Descrição da rota</Form.Label>
                <RichTextEditor/>
             </div>
     </Form> 
 </div>
  )
}

export default AddBusRouteForm