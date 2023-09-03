import React, {useEffect, useState} from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Modal, Form, Button} from 'react-bootstrap'
import { Save, SentimentSatisfiedAltSharp } from '@mui/icons-material';
import DraggableModal from '../../../General/components/DraggableModal'; 
import axios from 'axios';
import Hoot from '../../../General/components/Hoot';
import ClearInputs from '../../../General/components/ClearInputs'; 
import {GetInstituteCode, TransportDriversDataOptions} from '../../../General/components/InstituteData'; 
import { RichTextEditor } from '../../../General/components/RichTextEditor';
import CRValue from '../../../General/components/CRValue';
import {toast} from 'react-toastify';
import { Update } from '@material-ui/icons';
import FileUpload from '../../../General/components/FileUpload';
import styled from 'styled-components';



function NewVehicleModal(props) {
    const [show, setShow] = useState(false);
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({}); 
    const [Picture, setPicture] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => {
       setShow(true); 
       GET_DATA();
    };



    const GetFiles = (e)=>{
       setPicture(e[0]); 
    }
     
    const INPUTS = {
         vehicle_model:CRValue("#vehicle_model"), 
         vehicle_plate:CRValue("#vehicle_plate"), 
         vehicle_driver:CRValue("#vehicle_driver"), 
         vehicle_typology:CRValue("#vehicle_typology"), 
         vehicle_capacity:CRValue("#vehicle_capacity"), 
         vehicle_monthly_costs:CRValue("#vehicle_monthly_costs"),
         vehicle_owner:CRValue("#vehicle_owner"),
         vehicle_liters:CRValue("#vehicle_liters"), 
         vehicle_value:CRValue("#vehicle_value"), 
         vehicle_picture:Picture, 
         vehicle_acquisition_date:CRValue("#vehicle_acquisition_date"), 
         vehicle_description: JSON.stringify(CRValue(".modal form textarea")),
         institute_code:GetInstituteCode()
    }; 

    const FORMURL = [
      Hoot()+"edualltransportvehicleregister/post/",
      props.get ? props.get : '',
      props.url ? props.url : ''
    ];

    const GET_DATA = async()=>{
     if(props.update){
       const response = await axios.get(FORMURL[1]); 
       if(response.data !=null){
         if(response.data[0] != null){
           document.querySelector("#vehicle_model").value = response.data[0].ed_transport_vehicle_model; 
           document.querySelector("#vehicle_monthly_costs").value = response.data[0].ed_transport_vehicle_montlyCosts; 
           document.querySelector("#vehicle_plate").value  = response.data[0].ed_transport_vehicle_plate; 
           document.querySelector("#vehicle_driver").value = response.data[0].ed_transport_vehicle_driver; 
           document.querySelector("#vehicle_typology").value  = response.data[0].ed_transport_vehicle_typology; 
           document.querySelector("#vehicle_capacity").value = response.data[0].ed_transport_vehicle_capacity;  
           document.querySelector("#vehicle_value").value = response.data[0].ed_transport_vehicle_value;  
           document.querySelector("#vehicle_owner").value = response.data[0].ed_transport_vehicle_owner;  
           document.querySelector("#vehicle_liters").value = response.data[0].ed_transport_vehicle_liters;  
           document.querySelector("#vehicle_acquisition_date").value = response.data[0].ed_transport_vehicle_acquisition_date;  
           
           if(document.querySelectorAll(".public-DraftStyleDefault-block").length >= 1){ 
           document.querySelector(".modal form textarea").value =  response.data[0].ed_transport_vehicle_description;} 
 
           INPUTS.vehicle_model = response.data[0].ed_transport_vehicle_model
           INPUTS.vehicle_plate = response.data[0].ed_transport_vehicle_plate
           INPUTS.vehicle_driver = response.data[0].ed_transport_vehicle_driver
           INPUTS.vehicle_typology = response.data[0].ed_transport_vehicle_typology;
           INPUTS.vehicle_capacity = response.data[0].ed_transport_vehicle_capacity; 
           INPUTS.vehicle_value = response.data[0].ed_transport_vehicle_value;
           INPUTS.vehicle_acquisition_date = response.data[0].ed_transport_vehicle_acquisition_date
           INPUTS.vehicle_description = response.data[0].ed_transport_vehicle_description;
           INPUTS.vehicle_owner = response.data[0].ed_transport_vehicle_owner;
           INPUTS.vehicle_liters = response.data[0].ed_transport_vehicle_liters;
           INPUTS.vehicle_monthly_costs = response.data[0].ed_transport_vehicle_montlyCosts
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
      const {vehicle_model, vehicle_plate,  vehicle_value, vehicle_typology, vehicle_driver, 
      vehicle_monthly_costs, vehicle_capacity, vehicle_acquisition_date} = form; 
      const NewErrors = {};

      if(INPUTS.vehicle_model ===  "" || INPUTS.vehicle_model ===  " "){
      if(!vehicle_model || vehicle_model === '') NewErrors.vehicle_model = 'Viatura invalida';  
      }else{if(!vehicle_model){setField("vehicle_model", INPUTS.vehicle_model);}} 

      if(INPUTS.vehicle_monthly_costs ===  "" || INPUTS.vehicle_monthly_costs ===  " "){
      if(!vehicle_monthly_costs || vehicle_monthly_costs === '') NewErrors.vehicle_monthly_costs = 'Custo mensal invalido';  
      }else{if(!vehicle_monthly_costs){setField("vehicle_monthly_costs", INPUTS.vehicle_monthly_costs);}} 

      if(INPUTS.vehicle_plate ===  "" || INPUTS.vehicle_plate ===  " "){
      if(!vehicle_plate || vehicle_plate === '') NewErrors.vehicle_plate = 'Código invalido';  
      }else{if(!vehicle_plate){setField("vehicle_plate", INPUTS.vehicle_plate);}} 

      if(INPUTS.vehicle_value ===  "" || INPUTS.vehicle_value ===  " "){
      if(!vehicle_value || vehicle_value === '') NewErrors.vehicle_value = 'Ciclo académico invalido';  
      }else{if(!vehicle_value){setField("vehicle_value", INPUTS.vehicle_value);}} 
 
      if(INPUTS.vehicle_typology ===  "" || INPUTS.vehicle_typology ===  " "){
      if(!vehicle_typology || vehicle_typology === '') NewErrors.vehicle_typology = 'Periodo invalido';  
      }else{if(!vehicle_typology){setField("vehicle_typology", INPUTS.vehicle_typology);}} 

      if(INPUTS.vehicle_driver ===  "" || INPUTS.vehicle_driver ===  " "){
      if(!vehicle_driver || vehicle_driver === '') NewErrors.vehicle_driver = 'Curso invalido';  
      }else{if(!vehicle_driver){setField("vehicle_driver", INPUTS.vehicle_driver);}} 

      if(INPUTS.vehicle_capacity ===  "" || INPUTS.vehicle_capacity ===  " "){
      if(!vehicle_capacity || vehicle_capacity === '') NewErrors.vehicle_capacity = 'Ano académico invalido';  
      }else{if(!vehicle_capacity){setField("vehicle_capacity", INPUTS.vehicle_capacity);}} 

      if(INPUTS.vehicle_acquisition_date ===  "" || INPUTS.vehicle_acquisition_date ===  " "){
      if(!vehicle_acquisition_date || vehicle_acquisition_date === '') NewErrors.vehicle_acquisition_date = 'Data invalida';  
      }else{if(!vehicle_capacity){setField("vehicle_acquisition_date", INPUTS.vehicle_acquisition_date);}} 
  
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
          formData.append("vehicle_model", INPUTS.vehicle_model);
          formData.append("vehicle_plate", INPUTS.vehicle_plate);
          formData.append("vehicle_driver", INPUTS.vehicle_driver);
          formData.append("vehicle_typology", INPUTS.vehicle_typology);
          formData.append("vehicle_capacity", INPUTS.vehicle_capacity);
          formData.append("vehicle_monthly_costs", INPUTS.vehicle_monthly_costs);
          formData.append("vehicle_value", INPUTS.vehicle_value);
          formData.append("vehicle_acquisition_date", INPUTS.vehicle_acquisition_date);
          formData.append("vehicle_owner", INPUTS.vehicle_owner);
          formData.append("vehicle_liters", INPUTS.vehicle_liters); 
          formData.append("vehicle_description", INPUTS.vehicle_description);
          formData.append("vehicle_picture", INPUTS.vehicle_picture);
          formData.append("institute_code", INPUTS.institute_code); 

          
          console.log(INPUTS);

          if(!props.update){
            axios.post(FORMURL[0], formData).then((e)=>{  
              console.log(e.data)
              toast.success("Viatura registrada com sucesso !");
              setForm({});
              ///ClearInputs();
              setTimeout(() => { 
               // handleClose();
            }, 1500); 
            }).catch((error)=>{
              console.log(error); 
              toast.error("Lamentamos mas não foi  possivel executar esta ação")
          }); 
          } else {
            axios.put(FORMURL[2] , formData)
            .then(()=>{  
              toast.success("Viatura atualizada com sucesso !");
              setForm({});
              ClearInputs();
              setTimeout(() => { 
                  handleClose();
              }, 1500);
            }).catch((error)=>{toast.error("Lamentamos mas não foi  possivel executar esta ação")}); 
          }
        }  
    };

      
    const handleInput = (e)=>{ 
       switch (e.target.id) {
        case "vehicle_driver":
           INPUTS.vehicle_driver = e.target.value
           setField("vehicle_driver", e.target.value);
          break;
          case "vehicle_model":
            INPUTS.vehicle_model = e.target.value
            setField("vehicle_model", e.target.value);
           break; 
           case "vehicle_plate":
            INPUTS.vehicle_plate = e.target.value
            setField("vehicle_plate", e.target.value);
           break;
          case "vehicle_typology":
            INPUTS.vehicle_typology = e.target.value
            setField("vehicle_typology", e.target.value);
          break; 
          case "vehicle_capacity":
            INPUTS.vehicle_capacity = e.target.value
            setField("vehicle_capacity", e.target.value);
          break;
          case "vehicle_value":
            INPUTS.vehicle_value = e.target.value
            setField("vehicle_value", e.target.value);
          break; 
          case "vehicle_acquisition_date":
            INPUTS.vehicle_acquisition_date = e.target.value
            setField("vehicle_acquisition_date", e.target.value);
          break; 
          case "vehicle_monthly_costs":
            INPUTS.vehicle_monthly_costs = e.target.value
            setField("vehicle_monthly_costs", e.target.value);
          break; 
          case "vehicle_owner":
            INPUTS.vehicle_owner = e.target.value
            setField("vehicle_owner", e.target.value);
          break; 
          case "vehicle_liters":
            INPUTS.vehicle_liters = e.target.value
            setField("vehicle_liters", e.target.value);
          break; 
       }
    }
 


  return (
    <div>  
      <div onClick={handleShow}>
            {
              props.toggle_btn ? props.toggle_btn :   <button className='btn btn-main'><AddCircleOutlineIcon/> Registrar Viatura</button>  
            }
       </div>
      <Modal className='animate__animated animate__zoomInDown'  centered  size='lg' dialogAs={DraggableModal}  show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><h5>{ props.title ? props.title : 'Registrar ' } Viatura</h5></Modal.Title>
        </Modal.Header>
        <Form onSubmit={FormSubmit}> 
        <Modal.Body className='scrollLimit'>
            <Form.Group className="mb-3" >
              <Form.Label>Modelo<span className='text-danger ml-2'>*</span></Form.Label>
              <Form.Control onChange={handleInput} className={!!errors.vehicle_model && 'is-invalid'} value={form.vehicle_model} isInvalid={!!errors.vehicle_model}
              type="text" id="vehicle_model" />
              <Form.Control.Feedback type='invalid'>{errors.vehicle_model}</Form.Control.Feedback>
            </Form.Group>  
            <Form.Group className="mb-3">
              <Form.Label>Matrícula da viatura (Placa) <span className='text-danger ml-2'>*</span></Form.Label>
              <Form.Control  onChange={handleInput} className={!!errors.vehicle_plate && 'is-invalid'} value={form.vehicle_plate} isInvalid={!!errors.vehicle_plate}
              type="text" id="vehicle_plate" />
              <Form.Control.Feedback type='invalid'>{errors.vehicle_plate}</Form.Control.Feedback>
            </Form.Group>  
            <Form.Group className="mb-3">
              <Form.Label> Motorista<span className='text-danger ml-2'>*</span></Form.Label>
              <Form.Select  onChange={handleInput} className={!!errors.vehicle_driver && 'is-invalid'} value={form.vehicle_driver} isInvalid={!!errors.vehicle_driver}
              id="vehicle_driver">
                   <TransportDriversDataOptions/>
              </Form.Select>
              <Form.Control.Feedback type='invalid'>{errors.vehicle_driver}</Form.Control.Feedback>
            </Form.Group>  
            <Form.Group className="mb-3">
              <Form.Label>Tipologia da viatura <span className='text-danger ml-2'>*</span></Form.Label>
              <Form.Select  onChange={handleInput} className={!!errors.vehicle_typology && 'is-invalid'} value={form.vehicle_typology} isInvalid={!!errors.vehicle_typology}
              id="vehicle_typology">
                      <option value="purchase">Compra</option>
                      <option value="rent">Aluguel</option>
              </Form.Select>
              <Form.Control.Feedback type='invalid'>{errors.vehicle_typology}</Form.Control.Feedback>
            </Form.Group>  
            <Form.Group className="mb-3">
              <Form.Label>Capacidade<span className='text-danger ml-2'>*</span></Form.Label>
              <Form.Control  onChange={handleInput} className={!!errors.vehicle_capacity && 'is-invalid'} value={form.vehicle_capacity} isInvalid={!!errors.vehicle_capacity}
              id="vehicle_capacity"/> 
              <Form.Control.Feedback type='invalid'>{errors.vehicle_capacity}</Form.Control.Feedback>
            </Form.Group>   
            <Form.Group className="mb-3">
              <Form.Label>Valor da viatura<span className='text-danger ml-2'>*</span></Form.Label>
              <Form.Control  onChange={handleInput} className={!!errors.vehicle_value && 'is-invalid'} value={form.vehicle_value} isInvalid={!!errors.vehicle_value}
               id="vehicle_value"/> 
              <Form.Control.Feedback type='invalid'>{errors.vehicle_value}</Form.Control.Feedback>
            </Form.Group>  
            <Form.Group className="mb-3">
              <Form.Label>Data de aquisição<span className='text-danger ml-2'>*</span></Form.Label>
              <Form.Control type='date' onChange={handleInput} className={!!errors.vehicle_acquisition_date && 'is-invalid'} value={form.vehicle_acquisition_date} isInvalid={!!errors.vehicle_acquisition_date}
               id="vehicle_acquisition_date"/>  
              <Form.Control.Feedback type='invalid'>{errors.vehicle_acquisition_date}</Form.Control.Feedback>
            </Form.Group>  
            <Form.Group className="mb-3">
              <Form.Label>Custos mensais<span className='text-danger ml-2'>*</span></Form.Label>
              <Form.Control type='text' onChange={handleInput} className={!!errors.vehicle_monthly_costs && 'is-invalid'} value={form.vehicle_monthly_costs} isInvalid={!!errors.vehicle_monthly_costs}
               id="vehicle_monthly_costs"/>  
              <Form.Control.Feedback type='invalid'>{errors.vehicle_monthly_costs}</Form.Control.Feedback>
            </Form.Group>  
            <Form.Group className="mb-3">
              <Form.Label>Litros (depósito de combustível)<span className='text-danger ml-2'>*</span></Form.Label>
              <Form.Control type='text' onChange={handleInput} className={!!errors.vehicle_liters && 'is-invalid'} value={form.vehicle_liters} isInvalid={!!errors.vehicle_liters}
               id="vehicle_liters"/>  
              <Form.Control.Feedback type='invalid'>{errors.vehicle_liters}</Form.Control.Feedback>
            </Form.Group>  
            <Form.Group className="mb-3">
              <Form.Label>Proprietario da viatura<span className='text-danger ml-2'>*</span></Form.Label>
              <Form.Control type='text' onChange={handleInput} className={!!errors.vehicle_owner && 'is-invalid'} value={form.vehicle_owner} isInvalid={!!errors.vehicle_owner}
               id="vehicle_owner"/>  
              <Form.Control.Feedback type='invalid'>{errors.vehicle_owner}</Form.Control.Feedback>
            </Form.Group>  
            <Form.Group className="mb-3">
              <Form.Label >Descrição </Form.Label>
              <div className="class-description-input">
                   <RichTextEditor/>
              </div>
            </Form.Group>   
            <BoxContainer className='boxItem' >
           <h2 className="title">Carregar imagem da viatura</h2> 
           <FileUpload FileArray={GetFiles} input_name="vehicle_picture"  Icon="1" single type_of_files="image/jpeg,image/webp,image/x-png,image/gif,image/"  extensions="png,jpeg,jpg"  />
       </BoxContainer> 
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

export default NewVehicleModal