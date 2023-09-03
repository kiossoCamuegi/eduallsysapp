import React, { useEffect, useRef, useState } from 'react'
import { Form } from 'react-bootstrap' 
import styled from 'styled-components' 
import { Link, useParams } from 'react-router-dom'; 
import  {Save , Delete, Send, BallotOutlined, SummarizeOutlined} from '@mui/icons-material';
import { Alert } from 'bootstrap';   
import CRValue from '../../General/components/CRValue';
import ClearInputs from '../../General/components/ClearInputs';
import Hoot from '../../General/components/Hoot';
import axios from 'axios'; 
import {toast} from 'react-toastify';
import CalcAge from '../../General/components/CalcAge';
import { ImagePreview } from '../components/elements/ImagePreview';  
import {MultiSelect} from 'react-multi-select-component';
import { Avatar } from '@mui/material';
import { ArrowRight } from '@material-ui/icons';
import RandomColor from '../../General/components/RandomColor';
import {StudentsCodeDataOptionsSelector,   GetClasstitle_byclass,  GetAcademiclevel_byclass} from '../../General/components/InstituteData';
import CalcAgeByBirthday from '../../General/components/CalcAgeByBirthday';
import SwitchFromPages from '../../General/components/SwitchFromPages';
import CountryOptions from '../../General/components/CountryOptions';
import RandomCodeGenerator from '../../General/components/RandomCodeGenerator';


function UpdateParent() {
    document.title = "Atualizar dados do encarregado - "; 
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({}); 
    const [Image, setImage] = useState([]);
    const [Select, setSelected] = useState([]);
    const [studentError, setstudentError] = useState(null);
    const [Students , SetStudents] = useState([]);
    const [MapStudents,  SetMapStudents] = useState([]);


 
    const [Files, setFiles] = useState([]);  
    const [CurrentStudentCode, SetCurrentStudentCode] = useState(null);
    const [CurrentStudentId, SetCurrentStudentId] = useState(null);
    const [Loaded , SetLoaded] = useState(false);
    const [PassedPicture , setPassedPicture]  = useState(null);
    const [CurrentFiles, SetCurrentFiles] = useState([]); 
    const [CurrentClass, setCurrentClass] = useState(null);
    const [CurrentStudentStatus, setCurrentStudentStatus] = useState(false);
    const [Founded, SetFounded] =  useState(null);
    const [Class, setClass] = useState(null);
    const [CurrentStudentClass, SetCurrentStudentClass] = useState(null);
    const ChildRef = useRef();
    const ChildRef2 = useRef();
    
    const INPUTS = {  
       parent_name:CRValue("#parent_name"),
       parent_nacionality:CRValue("#parent_nacionality"),
       parent_code:RandomCodeGenerator(),
       parent_email:CRValue("#parent_email"),
       parent_phone:CRValue("#parent_phone"),
       parent_emergency_phone:CRValue("#parent_emergency_phone"),
       parent_job:CRValue("#parent_job"), 
       parent_degree_of_kinship:CRValue("#parent_degree_of_kinship"), 
       parent_gender:CRValue("#parent_gender"),  
       parent_address:CRValue("#parent_address"), 
       parent_phone2:CRValue("#parent_phone2"),
       parent_students:Students,
       parent_picture:Image
    }

 



    const FORMURL = [
        Hoot()+"eduallparenteupdate/update/", 
        Hoot()+"eduallgetsinglestudentbycode/get/",  
        Hoot()+"eduallsingleparent/get/",   
     ];

     const {id} = useParams(); 


    const GET_DATA = async()=>{
        if(id !== null && id*1 >= 0){
          const response = await axios.get(FORMURL[2]+id); 
          if(response.data.length >= 1){ 
              SetFounded(true);
              console.log(response.data[0])
              document.title = 'Atualizar dados do encarregado - '+response.data[0].ed_parent_name; 
              /*
               SetCurrentStudentCode(response.data[0].ed_student_code);
               SetCurrentStudentId(response.data[0].ed_student_id);
               SetCurrentStudentClass(response.data[0].ed_student_class); 
               setCurrentStudentStatus(response.data[0].ed_student_status); 
  
               */ 
  
               /* student Data */
   
             
               setPassedPicture(Hoot()+response.data[0].ed_parent_picture); 
  
              document.querySelector("#parent_name").value = response.data[0].ed_parent_name;  
              INPUTS.parent_name = response.data[0].ed_parent_name;  
  
              document.querySelector("#parent_gender").value = response.data[0].ed_parent_gender;  
              INPUTS.parent_email = response.data[0].ed_parent_gender;  
  
              document.querySelector("#parent_address").value = response.data[0].ed_parent_address;  
              INPUTS.parent_address = response.data[0].ed_parent_address;  
  
              document.querySelector("#parent_phone").value = response.data[0].ed_parent_phone;  
              INPUTS.parent_phone = response.data[0].ed_parent_phone;  
  
              document.querySelector("#parent_phone2").value = response.data[0].ed_parent_phone2;  
              INPUTS.parent_phone2 = response.data[0].ed_parent_phone2;  
  
              document.querySelector("#parent_nacionality").value = response.data[0].ed_parent_nacionality;  
              INPUTS.parent_nacionality = response.data[0].ed_parent_nacionality;   
              
              document.querySelector("#parent_email").value = response.data[0].ed_parent_email;  
              INPUTS.parent_email = response.data[0].ed_parent_email;   
              
              document.querySelector("#parent_degree_of_kinship").value = response.data[0].ed_parent_degree_of_kinship;  
              INPUTS.parent_degree_of_kinship = response.data[0].ed_parent_degree_of_kinship;  
 
              document.querySelector("#parent_emergency_phone").value = response.data[0].ed_parent_emergency_phone;  
              INPUTS.parent_emergency_phone = response.data[0].parent_emergency_phone; 

   
            }else{
              SetFounded(false);
            }
        }
     }  
  


     useEffect(()=>{
           GET_DATA(); 
           SetLoaded(true);
     },[]);
   
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
   
   const GetAvatarImage = (e)=>{
        setImage(e);  
   } 


   
   async function selectedStudents(e){
    setSelected(e) 
    setField("parent_students", "students");
    
    var Students = [];
    let NewStudentInfo = [];  

     for (let i = 0; i < e.length; i++) {
        Students.push(e[i].value+"|");

        const response = await axios.get(FORMURL[1]+`${e[i].value}`);   
        if (response.data.length >= 1){
            NewStudentInfo.push(response.data[0]); 
        }
     }  
                
    SetMapStudents(NewStudentInfo);   
    SetStudents(Students); 
  }
   
 
   
   const validateForm = ()=>{
       const {parent_name, parent_gender , parent_degree_of_kinship , parent_address ,parent_job, parent_phone, parent_phone2 , parent_email} = form; 
       const NewErrors = {};   
       
       if(INPUTS.parent_name ===  "" || INPUTS.parent_name ===  " "){
       if(!parent_name || parent_name === '') NewErrors.parent_name = 'Preencha o campo corretamente';  
       }else{if(!parent_name){setField("parent_name", INPUTS.parent_name);}}
   
       if(INPUTS.parent_gender ===  "" || INPUTS.parent_gender ===  " "){
       if(!parent_gender || parent_gender === '') NewErrors.parent_gender = 'Genero inavalido';
       }else{if(!parent_gender){setField("parent_gender", INPUTS.parent_gender);}}
      
       if(INPUTS.parent_address ===  "" || INPUTS.parent_address ===  " "){
       if(!parent_address || parent_address === '') NewErrors.parent_address = 'Endereço invalido';
       }else{if(!parent_address){setField("parent_address", INPUTS.parent_address);}}
    
       if(INPUTS.parent_degree_of_kinship ===  "" || INPUTS.parent_degree_of_kinship ===  " "){
       if(!parent_degree_of_kinship || parent_degree_of_kinship === '') NewErrors.parent_degree_of_kinship = 'Grau parentesco';  
       }else{if(!parent_degree_of_kinship){setField("parent_degree_of_kinship", INPUTS.parent_degree_of_kinship);}}
   
       if(INPUTS.parent_email ===  "" || INPUTS.parent_email ===  " "){
       if(!parent_email || parent_email === '') NewErrors.parent_email = 'Email invalido';   
       }else{if(!parent_email){setField("parent_email", INPUTS.parent_email);}}

       if(INPUTS.parent_job ===  "" || INPUTS.parent_job ===  " "){
       if(!parent_job || parent_job === '') NewErrors.parent_job = 'Profissão invalida';   
       }else{if(!parent_job){setField("parent_job", INPUTS.parent_job);}}

       if(INPUTS.parent_phone ===  "" || INPUTS.parent_phone ===  " "){
       if(!parent_phone || parent_phone === '') NewErrors.parent_phone = 'Número de telefone invalido';   
       }else{if(!parent_phone){setField("parent_phone", INPUTS.parent_phone);}}
       
       if(INPUTS.parent_phone2 ===  "" || INPUTS.parent_phone2 ===  " "){
       if(!parent_phone2 || parent_phone2 === '') NewErrors.parent_phone2 = 'Número de telefone invalido';   
       }else{if(!parent_phone2){setField("parent_phone2", INPUTS.parent_phone2);}}
       
       if(INPUTS.parent_phone ===  "" || INPUTS.parent_phone ===  " "){
       if(!parent_phone || parent_phone === '') NewErrors.parent_phone = 'Número de telefone invalido';   
       }else{if(!parent_phone){setField("parent_phone", INPUTS.parent_phone);}} 

       if(Students.length === 0){
        NewErrors.parent_students = 'Selecione os educandos';
        setstudentError('Selecione os educandos');
        }else{if(Students.length >= 1){
          setField("parent_students", INPUTS.parent_students);
          setstudentError(null);
        }} 

       return NewErrors;
   }
   
   
   const FormSubmit = (e)=>{  
    e.preventDefault();  
   
    const formErrors = validateForm();
      if(Object.keys(formErrors).length > 0){
           setErrors(formErrors);
           toast.error("Verifique todos os  campos");    
      }else{  


        let students_str = "";
        for (let i = 0; i < Students.length; i++) {
             if(Students.length === 1){
               students_str  +=  Students[i];
             }else{
                 students_str += Students[i]
             }
        }
        INPUTS.parent_students = students_str;
        console.table(INPUTS);

        const formData = new FormData(); 
        formData.append("parent_name",INPUTS.parent_name);
        formData.append("parent_students",students_str);
        formData.append("parent_gender",INPUTS.parent_gender);
        formData.append("parent_degree_of_kinship",INPUTS.parent_degree_of_kinship); 
        formData.append("parent_address",INPUTS.parent_address); 
        formData.append("parent_job",INPUTS.parent_job); 
        formData.append("parent_phone",INPUTS.parent_phone);
        formData.append("parent_phone2",INPUTS.parent_phone2);
        formData.append("parent_email",INPUTS.parent_email); 
        formData.append("parent_code",INPUTS.parent_code); 
        formData.append("parent_picture",INPUTS.parent_picture); 
 
        const registerData = async()=>{  
                axios.post(FORMURL[0], formData).then(()=>{  
                    toast.success("Encarregado cadastrado com sucesso"); 
                    setErrors({});
                    ClearInputs();
                  }).catch((error)=>{
                      toast.error("Lamentamos mas não foi  possivel executar esta ação = "); 
                  }); 
              }  
           registerData();
      }    
   };
   
   
   
   const handleInput = (e)=>{  
     switch (e.target.id) { 
        case "parent_gender":
           setField("parent_gender", e.target.value)
           INPUTS.parent_gender = e.target.value
         break;  
         case "parent_name":
            setField("parent_name", e.target.value)
            INPUTS.parent_name = e.target.value
          break;  
          case "parent_address":
            setField("parent_address", e.target.value)
            INPUTS.parent_address = e.target.value
          break; 
          case "parent_phone":
            setField("parent_phone", e.target.value)
            INPUTS.parent_phone = e.target.value
          break;   
          case "parent_phone2":
            setField("parent_phone2", e.target.value)
            INPUTS.parent_phone2 = e.target.value
          break;   
          case "parent_gender":
            setField("parent_gender", e.target.value)
            INPUTS.parent_gender = e.target.value
          break;  
          case "parent_degree_of_kinship":
            setField("parent_degree_of_kinship", e.target.value)
            INPUTS.parent_degree_of_kinship = e.target.value
          break;  
          case "parent_email":
            setField("parent_email", e.target.value)
            INPUTS.parent_email = e.target.value
          break;  
          case "parent_nacionality":
            setField("parent_nacionality", e.target.value)
            INPUTS.parent_nacionality = e.target.value
          break;  
          case "parent_job":
            setField("parent_job", e.target.value)
            INPUTS.parent_job = e.target.value
          break;  
     }
   }    

  return (
    <Form  onSubmit={FormSubmit}>
    <div className="box-register">
    <div className="ed-space mb-4">
         <div className="ed-flex">
             <button className="btn bg-danger"  type='reset' id='clearForm'>
                <Delete/>  Limpar
             </button>
             <button type='submit' className="btn ml-2 bg-green-light" id="">
               <Save/>  Salvar
             </button>
             <button className="btn ml-2 d-none bg-secondary" id="">
                <Send/> Salvar e enviar dados
             </button>
         </div>
         <div className="ed-flex"> 
             <SwitchFromPages  link='ParentsGrid' menu="3" menu_item="141"
              toggle_btn={<button className='btn bg-green-light'> 
                  <BallotOutlined/>
              </button>}
             />  
             <SwitchFromPages  link='parents' menu="3" menu_item="141"
              toggle_btn={<button className='btn bg-main ml-2'> 
                  <SummarizeOutlined/> Lista dos encarregados
              </button>}
             />   
         </div>
     </div> 
    <BoxContainer>
       <div className="ed-space mb-4">
           <div><h2 className="title" style={{marginBottom:'0px'}}>Informações do encarregado</h2></div> 
       </div>
          <FlexBox>
              <ImagePreview Cover={PassedPicture}  ref={ChildRef} Picture={GetAvatarImage} />
             <div></div>
            <div className="box">
            <Form.Group className="mb-3"  >
                 <div className="ed-flex fill mt-2">
                     <div className="block">
                         <Form.Label>Grau parentesco</Form.Label>
                         <Form.Select  className={!!errors.parent_degree_of_kinship && 'is-invalid'}  onChange={handleInput} value={form.parent_degree_of_kinship} isInvalid={!!errors.parent_degree_of_kinship}    
                         placeholder="" name='parent_degree_of_kinship' id="parent_degree_of_kinship">
                              <option value="0">Mãe</option>
                              <option value="1">Pai</option>
                              <option value="2">Irmão</option>
                              <option value="3">Tio</option>
                              <option value="4">Tia</option>
                         </Form.Select>
                         <Form.Control.Feedback type='invalid'>{errors.parent_degree_of_kinship}</Form.Control.Feedback>
                     </div>
                     <div className="block ml-2">
                         <Form.Label>Genero</Form.Label>
                         <Form.Select  className={!!errors.parent_gender && 'is-invalid'}  onChange={handleInput} value={form.parent_gender} isInvalid={!!errors.parent_gender}    
                            placeholder="" name='parent_gender' id="parent_gender">
                             <option selected value="Male">Masculino</option>
                             <option value="Female">Femenino</option>
                         </Form.Select>
                         <Form.Control.Feedback type='invalid'>{errors.parent_gender}</Form.Control.Feedback>
                     </div>
                 </div>
                 <div className="ed-flex fill mt-4">
                    <div className="block">
                        <Form.Label>Nome completo</Form.Label>
                        <Form.Control   className={!!errors.parent_name && 'is-invalid'}  onChange={handleInput} value={form.parent_name} isInvalid={!!errors.parent_name}   type="text"   
                         placeholder="" name='parent_name' id="parent_name"  /> 
                      <Form.Control.Feedback type='invalid'>{errors.parent_name}</Form.Control.Feedback>
                    </div>
                    <div className="block ml-2">
                        <Form.Label>Selecione os educandos </Form.Label>
                          <MultiSelect
                            options={StudentsCodeDataOptionsSelector()}
                            value={Select}
                            className={studentError !== null ? 'border-red' : ''}
                            onChange={selectedStudents}
                            labelledBy='select'
                        />
                       <Form.Control.Feedback type='invalid'>{errors.studentError}</Form.Control.Feedback>
                    </div>
                 </div>
            </Form.Group> 
            </div>
          </FlexBox> 
          <Form.Group>  
               <div className="ed-flex col-ip-3 col-12 mt-4">
                     <div className="block">
                         <Form.Label>E-mail</Form.Label>
                         <Form.Control className={!!errors.parent_email && 'is-invalid'}  onChange={handleInput} value={form.parent_email} isInvalid={!!errors.parent_email}   type="email"   
                         placeholder="" name='parent_email' id="parent_email" />    
                        <Form.Control.Feedback type='invalid'>{errors.parent_email}</Form.Control.Feedback>
                     </div>
                     <div className="block ml-2">
                         <Form.Label>Telefone (1)</Form.Label>
                         <Form.Control  className={!!errors.parent_phone && 'is-invalid'}  onChange={handleInput} value={form.parent_phone} isInvalid={!!errors.parent_phone}   type="number"   
                         placeholder="" name='parent_phone' id="parent_phone" />    
                        <Form.Control.Feedback type='invalid'>{errors.parent_phone}</Form.Control.Feedback> 
                     </div>
                     <div className="block ml-2">
                         <Form.Label>Telefone (2)</Form.Label>
                         <Form.Control  className={!!errors.parent_phone2 && 'is-invalid'}  onChange={handleInput} value={form.parent_phone2} isInvalid={!!errors.parent_phone2}   type="number"   
                         placeholder="" name='parent_phone2' id="parent_phone2" />    
                        <Form.Control.Feedback type='invalid'>{errors.parent_phone2}</Form.Control.Feedback>
                     </div>
                 </div>
          </Form.Group>  
          <Form.Group> 
                 <div className="ed-flex col-ip-3 col-12 mt-4">
                     <div className="block">
                         <Form.Label>Endereço</Form.Label>
                         <Form.Control  className={!!errors.parent_address && 'is-invalid'}  onChange={handleInput} value={form.parent_address} isInvalid={!!errors.parent_address}   type="text"   
                            placeholder="" name='parent_address' id="parent_address"  /> 
                           <Form.Control.Feedback type='invalid'>{errors.parent_address}</Form.Control.Feedback>
                     </div>
                     <div className="block ml-2">
                         <Form.Label>Nacionality</Form.Label>
                         <Form.Select  className={!!errors.parent_nacionality && 'is-invalid'}  onChange={handleInput} value={form.parent_nacionality} isInvalid={!!errors.parent_nacionality} 
                         name='parent_nacionality' id="parent_nacionality" >
                               <CountryOptions />
                        </Form.Select> 
                        <Form.Control.Feedback type='invalid'>{errors.parent_nacionality}</Form.Control.Feedback>
                     </div>
                     <div className="block ml-2">
                         <Form.Label>Contacto em caso de  emergencia</Form.Label>
                         <Form.Control   className={!!errors.parent_emergency_phone && 'is-invalid'}  onChange={handleInput} value={form.parent_emergency_phone} isInvalid={!!errors.parent_emergency_phone}   type="text"   
                         placeholder="" name='parent_emergency_phone' id="parent_emergency_phone"  /> 
                        <Form.Control.Feedback type='invalid'>{errors.parent_emergency_phone}</Form.Control.Feedback>
                     </div>
                 </div> 
          </Form.Group>
          <Form.Group>
          <div className="block mt-4">
            <Form.Label>Grau parentesco</Form.Label>
            <Form.Select  className={!!errors.parent_job && 'is-invalid'}  onChange={handleInput} value={form.parent_job} isInvalid={!!errors.parent_job}    
             name='parent_job' id="parent_job">
                    <option value="0">Mãe</option>
                    <option value="1">Pai</option>
                    <option value="2">Irmão</option>
                    <option value="3">Tio</option>
                    <option value="4">Tia</option>
               </Form.Select>
              <Form.Control.Feedback type='invalid'>{errors.parent_job}</Form.Control.Feedback>
            </div>
          </Form.Group>
    </BoxContainer>
      <br /> 
      <SelectedStudents>
          {
              MapStudents.map((item, index)=>{  
                 let age =  CalcAgeByBirthday(item.ed_student_birthday);
                  return(
                    <article key={index}>
                        <Link to='#'><div className="view" style={{background:RandomColor()}} ><ArrowRight/></div></Link>
                    <div>
                       <Avatar alt={item.ed_student_name} sx={{width:50, height:50}}  src={item.ed_student_picture != ""  ?  Hoot()+item.ed_student_picture : ""}  />
                    </div>
                    <div className="ed-block">
                         <h5>Nome : <span className="text-main-light">{item.ed_student_name}</span></h5>
                         <div className="ed-flex">
                              <h4>Idade :<span className="text-main-light">{age}</span></h4>
                              <h4>Turma :<span className="text-main-light"> <GetClasstitle_byclass ID={item.ed_student_class} /></span></h4>
                              <h4>Classe :<span className="text-main-light"> <GetAcademiclevel_byclass ID={item.ed_student_class} /> </span></h4>
                         </div>
                     </div>               
                   </article>
                 )
              })
          }
      </SelectedStudents>
    </div> 
    <br />
   </Form>
  )
}

const SelectedStudents = styled.section`
       display:flex;
       flex-wrap:wrap;
       width:100%;
       justify-content:space-between;

       article{
            display:flex; 
            height:80px;
            width:49%;
            border-radius:6px;
            margin-bottom:20px; 
            padding:15px;
            padding-left:20px; 
            background:var(--ed-white);  
            box-shadow:var(--ed-shadow-df); 
            position:relative;

  

              .view{
                  position:absolute;
                  top:28px;
                  width:25px;
                  height:25px;
                  border:2px solid var(--ed-white);
                  left:-10px;
                  border-radius:100%;
                  display:flex;
                  align-items:center;
                  justify-content:center; 

                    svg{
                         fill:var(--ed-white);
                    }
              }

             .ed-block{
                 padding-left:15px;
                   
                   h5{
                      font-size:17px;
                        span{
                            margin-left:5px;
                        }
                   }

                   h4{
                      font-size:15px;
                      margin-right:10px;

                        span{
                            margin-left:5px;
                        }
                   }
             }

       }


`

const BoxContainer = styled.div` 
    width:100%; 
    border-radius:6px;
    margin-bottom:20px;  
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

const FlexBox = styled.div`
   margin:10px 0;
   display:flex;
   } 
`;

export default UpdateParent
