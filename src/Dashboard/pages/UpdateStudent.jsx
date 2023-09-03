import React, { useEffect, useRef, useState } from 'react'
import { Form } from 'react-bootstrap' 
import styled from 'styled-components' 
import { Link, useParams } from 'react-router-dom'; 
import  {Save , Delete, Send, BallotOutlined, SummarizeOutlined, Clear, Update, AccessTimeOutlined, DeleteOutline} from '@mui/icons-material';
import { Alert } from 'bootstrap'; 
import BuildDataHistory from '../components/elements/BuildDataHistory';
import FileUpload from '../../General/components/FileUpload';
import CRValue from '../../General/components/CRValue';
import ClearInputs from '../../General/components/ClearInputs';
import Hoot from '../../General/components/Hoot';
import axios from 'axios';
import { RichTextEditor } from '../../General/components/RichTextEditor';
import {toast} from 'react-toastify';
import CalcAge from '../../General/components/CalcAge';
import { AcademicYearDataOptions, ClassDataOptions, GetAcademiclevel_byclass, GetAcademicYear, GetAcademicYear_byclass, GetClassroom_byclass, GetCourse_byclass, GetPeriod_byclass } from '../../General/components/InstituteData';
import {Camera, Close} from '@mui/icons-material'; 
import { Avatar } from '@mui/material';
import { ImagePreview } from '../components/elements/ImagePreview';
import SwitchFromPages from '../../General/components/SwitchFromPages';
import ReligionOptions from '../../General/components/ReligionOptions';
import ReduceTextLength from '../../General/components/ReduceTextLength';
import {  HiOutlineDocumentText } from "react-icons/hi";
import NumberToBytes from '../../General/components/NumberToBytes';
import DeleteModal from '../components/elements/DeleteModal';
import Loader from '../../General/components/Loader';
import NotFounded from '../../General/components/NotFounded';

const FORMURL = [
    Hoot()+"eduallstudentupdate/update/",  
    Hoot()+"eduallsinglestudentapi/get/",
    Hoot()+'eduallsingleuserfiles/get/',
    Hoot()+"eduallfilesregister/post/",
    Hoot()+"eduallregisterstudentoldclass/post/"
 ];


function UpdateStudent() { 
    const [ToggleHealth, setToggleHealth] = useState(0);
     const [form, setForm] = useState({});
     const [errors, setErrors] = useState({});
     const [Files, setFiles] = useState([]); 
     const [Image, setImage] = useState([]);
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
        student_name:CRValue("#student_name"), 
        student_address:CRValue("#student_address"), 
        student_nacionality:CRValue("#student_nacionality"), 
        student_gender:CRValue("#student_gender"),
        student_religion:CRValue("#student_religion"),
        student_birthday:CRValue("#student_birthday"), 
        student_phone:CRValue("#student_phone"), 
        student_email:CRValue("#student_email"), 
        student_hasAccount:CRValue("#student_hasAccount"),
        student_scholarshipHolder:CRValue("#student_scholarshipHolder"),
        student_class:CRValue("#student_class"), 
        student_code:0, 
        student_identityCard:CRValue("#student_identityCard"), 
        student_lastschool:CRValue("#student_lastschool"),
        student_naturalness:CRValue("#student_naturalness"),
        student_lastclass:CRValue("#student_lastclass"),
        student_picture:Image, 
        student_files:Files,
        student_health_problems:CRValue("#student_health_problems"), 
        student_health_problems_description:CRValue("#student_health_problems_descriptio"), 
        student_status:CRValue("#student_status"),  
    }


    const {id} = useParams(); 

    const GET_DATA = async()=>{
        const response = await axios.get(FORMURL[1]+id); 
        if(response.data !== null){
          if(response.data[0] !== null){   
             SetCurrentStudentCode(response.data[0].ed_student_code);
             SetCurrentStudentId(response.data[0].ed_student_id);
             SetCurrentStudentClass(response.data[0].ed_student_class);
             setPassedPicture(Hoot()+response.data[0].ed_student_picture); 
             setCurrentStudentStatus(response.data[0].ed_student_status); 

            const responseFiles = await axios.get(FORMURL[2]+response.data[0].ed_student_code); 
            if(responseFiles.data.length >= 1)  SetCurrentFiles(responseFiles.data);
            SetFounded(true);  



             /* student Data */
 
            document.title = 'Atualizar dados do estudante - '+response.data[0].ed_student_name; 

            document.querySelector("#student_name").value = response.data[0].ed_student_name;  
            INPUTS.student_name = response.data[0].ed_student_name; 

            document.querySelector("#student_scholarshipHolder").value = response.data[0].ed_student_scholarshipHolder;  
            INPUTS.student_scholarshipHolder = response.data[0].ed_student_scholarshipHolder;  

            document.querySelector("#student_address").value = response.data[0].ed_student_address;  
            INPUTS.student_address = response.data[0].ed_student_address;

            document.querySelector("#student_lastschool").value = response.data[0].ed_student_lastschool;  
            INPUTS.student_lastschool = response.data[0].ed_student_lastschool;

            document.querySelector("#student_lastclass").value = response.data[0].ed_student_lastclass;  
            INPUTS.student_lastclass = response.data[0].ed_student_lastclass;

            document.querySelector("#student_naturalness").value = response.data[0].ed_student_naturalness;  
            INPUTS.student_naturalness = response.data[0].ed_student_naturalness;


            document.querySelector("#student_religion").value = response.data[0].ed_student_religion;  
            INPUTS.student_religion = response.data[0].ed_student_religion;

            document.querySelector("#student_birthday").value = response.data[0].ed_student_birthday;  
            INPUTS.student_birthday = response.data[0].ed_student_birthday;

            document.querySelector("#student_phone").value = response.data[0].ed_student_phone;  
            INPUTS.student_phone = response.data[0].ed_student_phone;
 
            document.querySelector("#student_email").value = response.data[0].ed_student_email;  
            INPUTS.student_email = response.data[0].ed_student_email;

            document.querySelector("#student_class").value = response.data[0].ed_student_class;  
            INPUTS.student_class = response.data[0].ed_student_class;
            setCurrentClass(response.data[0].ed_student_class);

            document.querySelector("#student_identityCard").value = response.data[0].ed_student_identityCard;  
            INPUTS.student_identityCard = response.data[0].ed_student_identityCard;

            document.querySelector("#student_health_problems").value = response.data[0].ed_student_health_problems;  
            INPUTS.student_health_problems = response.data[0].ed_student_health_problems;
            setToggleHealth(response.data[0].ed_student_health_problems);
 
          }else{
            SetFounded(false);
          }
        }else{
            SetFounded(false);
        }
    }
  

    useEffect(()=>{
         GET_DATA(); 
         SetLoaded(true);  
         setTimeout(() => {
            setClass(CRValue("#student_class"));
         }, 1000);
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
    
    const GetFiles = (e)=>{
        setFiles(e);
    }
      
     
    
    const validateForm = ()=>{
        const {student_name, student_scholarshipHolder, student_address, student_nacionality,  student_gender, student_religion, 
        student_birthday, student_phone ,   student_lastschool, student_lastclass , student_naturalness,
        student_email,  student_class,  student_identityCard, student_health_problems ,  student_status} = form; 
       const NewErrors = {}; 
        
        
        if(INPUTS.student_name ===  "" || INPUTS.student_name ===  " "){
        if(!student_name || student_name === '') NewErrors.student_name = 'Preencha o campo corretamente';  
        }else{if(!student_name){setField("student_name", INPUTS.student_name);}}
    
        /*
        
       if(INPUTS.student_naturalness  ===  "" || INPUTS.student_naturalness  ===  " "){
        if(!student_naturalness  || student_naturalness  === '') NewErrors.student_naturalness  = 'Naturalidade invalida';
        }else{if(!student_naturalness){setField("student_naturalness", INPUTS.student_naturalness);}}
    
    */
        if(INPUTS.student_gender ===  "" || INPUTS.student_gender ===  " "){
        if(!student_gender || student_gender === '') NewErrors.student_gender = 'Genero inavalido';
        }else{if(!student_gender){setField("student_gender", INPUTS.student_gender);}}
  
        /*
        if(INPUTS.student_email ===  "" || INPUTS.student_email ===  " "){
        if(!student_email || student_email === '') NewErrors.student_email = 'Email invalido';   
        }else{if(!student_email){setField("student_email", INPUTS.student_email);}}

       */   

       if(INPUTS.student_scholarshipHolder ===  "" || INPUTS.student_scholarshipHolder ===  " "){
        if(!student_scholarshipHolder || student_scholarshipHolder === '') NewErrors.student_scholarshipHolder = 'Selecione uma opção valida';  
        }else{if(!student_scholarshipHolder){setField("student_scholarshipHolder", INPUTS.student_scholarshipHolder);}}
    
    
        if(INPUTS.student_address ===  "" || INPUTS.student_name ===  " "){
        if(!student_address || student_address === '') NewErrors.student_address = 'Endereço invalido';
        }else{if(!student_address){setField("student_address", INPUTS.student_address);}}
    
        if(INPUTS.student_nacionality ===  "" || INPUTS.student_nacionality ===  " "){
        if(!student_nacionality || student_nacionality === '') NewErrors.student_nacionality = 'Nacionalidade invalida';
        }else{if(!student_nacionality){setField("student_nacionality", INPUTS.student_nacionality);}}
    
        if(INPUTS.student_religion ===  "" || INPUTS.student_religion ===  " "){
        if(!student_religion || student_religion === '') NewErrors.student_religion = 'Religião invalida';
        }else{if(!student_religion){setField("student_religion", INPUTS.student_religion);}}
    
        if(INPUTS.student_birthday ===  "" || INPUTS.student_birthday ===  " "){
        if(!student_birthday || student_birthday === '') NewErrors.student_birthday = 'Preencha o campo corretamente';  
        }else{if(!student_birthday){setField("student_birthday", INPUTS.student_birthday);}}
    
        if(INPUTS.student_phone ===  "" || INPUTS.student_phone ===  " "){
        if(!student_phone || student_phone === '') NewErrors.student_phone =  'Numero de telefone invalido';
        }else{if(!student_phone){setField("student_phone", INPUTS.student_phone);}}
    
        if(INPUTS.student_email ===  "" || INPUTS.student_email ===  " "){
        if(!student_email || student_email === '') NewErrors.student_email = 'Email invalido';  
        }else{if(!student_email){setField("student_email", INPUTS.student_email);}}
    
        if(INPUTS.student_class ===  "" || INPUTS.student_class ===  " "){
        if(!student_class || student_class === '') NewErrors.student_class = 'Preencha o campo corretamente';  
        }else{if(!student_class){setField("student_class", INPUTS.student_class);}}
    
        if(INPUTS.student_identityCard ===  "" || INPUTS.student_identityCard ===  " "){
        if(!student_identityCard || student_identityCard === '') NewErrors.student_identityCard = 'Bilhete de identficação invalido';
        }else{if(!student_identityCard){setField("student_identityCard", INPUTS.student_identityCard);}}
    
        if(INPUTS.student_health_problems ===  "" || INPUTS.student_health_problems ===  " "){
        if(!student_health_problems || student_health_problems === '') NewErrors.student_health_problems = 'Selecione uma opção valida';
        }else{if(!student_health_problems){setField("student_health_problems", INPUTS.student_health_problems);}}
    
        if(INPUTS.student_status ===  "" || INPUTS.student_status ===  " "){
        if(!student_status || student_status === '') NewErrors.student_status =  'Selecione um estado valido';
        }else{if(!student_status){setField("student_status", INPUTS.student_status);}}
            
     
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
        formData.append("student_name",INPUTS.student_name); 
        formData.append("student_address",INPUTS.student_address);
        formData.append("student_nacionality",INPUTS.student_nacionality);
        formData.append("student_scholarshipHolder",INPUTS.student_scholarshipHolder); 
        formData.append("student_gender",INPUTS.student_gender);
        formData.append("student_religion",INPUTS.student_religion);
        formData.append("student_birthday",INPUTS.student_birthday);
        formData.append("student_phone",INPUTS.student_phone); 
        formData.append("student_email",INPUTS.student_email);
        formData.append("student_hasAccount",INPUTS.student_hasAccount);
        formData.append("student_naturalness", INPUTS.student_naturalness);
        formData.append("student_lastclass", INPUTS.student_lastclass);
        formData.append("student_lastschool", INPUTS.student_lastschool);
        formData.append("student_class", Math.floor(INPUTS.student_class)); 
        formData.append("student_identityCard",INPUTS.student_identityCard);
        formData.append("student_picture",INPUTS.student_picture); 
        formData.append("student_health_problems",INPUTS.student_health_problems);
        formData.append("student_health_problems_description",INPUTS.student_health_problems_description);
        formData.append("student_status",INPUTS.student_status);   
    
        axios.put(FORMURL[0]+id , formData).then((e)=>{ 
         INPUTS.student_files = Files.length >= 1 ? INPUTS.student_files[0] :  [];  

         
         if(CurrentStudentClass !== null){
            if(CurrentStudentClass*1 !== INPUTS.student_class*1){
                axios.post(FORMURL[4] ,{
                  old_class_code:CurrentStudentClass,
                  old_class_student:CurrentStudentId
                })
                .then((e)=>{    
                  console.log("Old class saved successfuly !");
                }).catch((error)=>{
                  console.log("Something went wrong here !");
                }); 
   
            }
         }


         console.log(e.data);
 
          if(Files.length >= 1){
            for(let i = 0; i < INPUTS.student_files.length; i++) {
                 const file = INPUTS.student_files[i]; 
                 console.log(INPUTS.student_files[i])
                 const fileData = new FormData();
                 let extension = file.type.split("/")[1] !== "" ? file.type.split("/")[1] : undefined;
                 fileData.append("file_name",file);
                 fileData.append("file_code",CurrentStudentCode);
                 fileData.append("file_size",file.size);
                 fileData.append("file_type",file.type);
                 fileData.append("file_use", "student_register");
                 fileData.append("file_extension", extension);
                 fileData.append("institute_code",CurrentStudentCode);   
                 axios.post(FORMURL[3] , fileData)
                 .then(()=>{   
                    console.log("success");
                    if(i === (INPUTS.student_files.length -1))  
                      toast.success("Informações atualizadas com sucesso !");   
                       setTimeout(() =>{ 
                            setForm({});
                            ClearInputs();
                            ChildRef.current.RemoveImage();  
                            ChildRef2.current.ClearFiles();  
                        }, 3000);
                 }).catch((error)=>{
                   toast.error(`lamentamos mas não foi possivel carregar o  ${i+1}ª  ficheiro anexado !`);  
                 }); 
            }
          }   

          toast.success("Informações atualizadas com sucesso ! "); 
          setTimeout(() =>{ 
            setForm({});
            ClearInputs();
            ChildRef.current.RemoveImage();  
           ChildRef2.current.ClearFiles();  
         }, 3000); 

        }).catch((error)=>{
            toast.error("Lamentamos mas não foi possivel atualizar os dados !");  
            console.log(error); 
        });   
      }  
    };
    
    
    
    const handleInput = (e)=>{  
      switch (e.target.id) {
       case "student_class":
          setField("student_class", e.target.value)
          INPUTS.student_class = e.target.value
           setClass(e.target.value); 
         break;
         case "student_lastschool":
            setField("student_lastschool", e.target.value)
            INPUTS.student_lastschool = e.target.value;
           break;
           case "student_lastclass":
            setField("student_lastclass", e.target.value)
            INPUTS.student_lastclass = e.target.value;
           break;
           case "student_naturalness":
            setField("student_naturalness", e.target.value)
            INPUTS.student_naturalness = e.target.value;
          break; 
         case "student_gender":
            setField("student_gender", e.target.value)
            INPUTS.student_gender = e.target.value
          break;
          case "student_religion":
            setField("student_religion", e.target.value)
            INPUTS.student_religion = e.target.value
          break;
          case "student_birthday":
            setField("student_birthday", e.target.value)
            INPUTS.student_birthday = e.target.value
          break; 
          case "student_nacionality":
            setField("student_nacionality", e.target.value)
            INPUTS.student_nacionality = e.target.value
          break; 
          case "student_address":
            setField("student_address", e.target.value)
            INPUTS.student_address = e.target.value 
          break;  
          case "student_scholarshipHolder":
            setField("student_scholarshipHolder", e.target.value) 
            INPUTS.student_scholarshipHolder = e.target.value
          break;   
          case "student_phone":
            setField("student_phone", e.target.value) 
            INPUTS.student_phone = e.target.value
          break;  
          case "student_email":
            setField("student_email", e.target.value) 
            INPUTS.student_email = e.target.value
          break; 
          case "student_name":
            setField("student_name", e.target.value)
            INPUTS.student_name = e.target.value 
          break; 
          case "student_identityCard":
            setField("student_identityCard", e.target.value) 
            INPUTS.student_identityCard = e.target.value
          break; 
          case "student_status":
            setField("student_status", e.target.value) 
            INPUTS.student_status = e.target.value
          break; 
          case "student_health_problems":
            setField("student_health_problems", e.target.value)
            INPUTS.student_health_problems = e.target.value
            setToggleHealth(Math.floor(e.target.value));
          break; 
          case "guardion_gender":
                setField("guardion_gender", e.target.value)
                INPUTS.guardion_gender = e.target.value
            break;  
            case "guardion_name":
                setField("guardion_name", e.target.value)
                INPUTS.guardion_name = e.target.value
            break;  
            case "guardion_address":
                setField("guardion_address", e.target.value)
                INPUTS.guardion_address = e.target.value
            break; 
            case "guardion_phone":
                setField("guardion_phone", e.target.value)
                INPUTS.guardion_phone = e.target.value
            break;   
            case "guardion_phone2":
                setField("guardion_phone2", e.target.value)
                INPUTS.guardion_phone2 = e.target.value
            break;    
            case "guardion_degree_of_kinship":
                setField("guardion_degree_of_kinship", e.target.value)
                INPUTS.guardion_degree_of_kinship = e.target.value
            break;  
            case "guardion_email":
                setField("guardion_email", e.target.value)
                INPUTS.guardion_email = e.target.value
            break; 
            case "guardion_job":
                setField("guardion_job", e.target.value)
                INPUTS.guardion_job = e.target.value
            break;  
            case "father_gender":
                setField("father_gender", e.target.value)
                INPUTS.father_gender = e.target.value
            break;  
            case "father_name":
                setField("father_name", e.target.value)
                INPUTS.father_name = e.target.value
            break;  
            case "father_address":
                setField("father_address", e.target.value)
                INPUTS.father_address = e.target.value
            break; 
            case "father_phone":
                setField("father_phone", e.target.value)
                INPUTS.father_phone = e.target.value
            break;   
            case "father_phone2":
                setField("father_phone2", e.target.value)
                INPUTS.father_phone2 = e.target.value
            break;    
            case "father_degree_of_kinship":
                setField("father_degree_of_kinship", e.target.value)
                INPUTS.father_degree_of_kinship = e.target.value
            break;  
            case "father_email":
                setField("father_email", e.target.value)
                INPUTS.father_email = e.target.value
            break;  
            case "father_job":
                setField("father_job", e.target.value)
                INPUTS.father_job = e.target.value
            break;  
            case "mother_gender":
                setField("mother_gender", e.target.value)
                INPUTS.mother_gender = e.target.value
            break;  
            case "mother_name":
                setField("mother_name", e.target.value)
                INPUTS.mother_name = e.target.value
            break;  
            case "mother_address":
                setField("mother_address", e.target.value)
                INPUTS.mother_address = e.target.value
            break; 
            case "mother_phone":
                setField("mother_phone", e.target.value)
                INPUTS.mother_phone = e.target.value
            break;   
            case "mother_phone2":
                setField("mother_phone2", e.target.value)
                INPUTS.mother_phone2 = e.target.value
            break;   
            case "mother_degree_of_kinship":
                setField("mother_degree_of_kinship", e.target.value)
                INPUTS.mother_degree_of_kinship = e.target.value
            break;  
            case "mother_email":
                setField("mother_email", e.target.value)
                INPUTS.mother_email = e.target.value
            break;  
            case "mother_job":
                setField("mother_job", e.target.value)
                INPUTS.mother_job = e.target.value
            break;  
            default:
      }
    } 
    
    
   if(Loaded){
    if(Founded  === true){
        return(<>
            <Form onSubmit={FormSubmit} method='post' encType='multipart/form-data'>
            <div className="box-register">
            <div className="ed-space mb-4">
                 <div className="ed-flex"> 
                     <SwitchFromPages  link='StudentsGrid' menu="3" menu_item="17"
                         toggle_btn={<button className='btn bg-green-light'> 
                             <BallotOutlined/>
                         </button>}
                      />  
                      <SwitchFromPages  link='Students' menu="3" menu_item="17"
                         toggle_btn={<button className='btn ml-2 btn-main'>
                         <SummarizeOutlined/> Lista de estudantes
                         </button>}
                      />  
                 </div>
                 <div className="ed-flex">
                     <button className="btn bg-danger" type='reset' id='clearForm'>
                        <Delete/>  Limpar
                     </button>
                     <button className="btn ml-2 bg-main" type="submit">
                       <Update/>  Atualizar
                     </button>
                     <button className="btn ml-2 bg-secondary d-none" id="">
                        <Send/> Salvar e enviar dados
                     </button>
                 </div>
             </div> 
            <BoxContainer className='boxItem'>
               <div className="ed-space mb-4">
                   <div><h2 className="title" style={{marginBottom:'0px'}}>Atualizar dados de  estudante</h2></div>
                    <BuildDataHistory/>
               </div>
                  <FlexBox>
                     <ImagePreview Cover={PassedPicture}  ref={ChildRef}  Picture={GetAvatarImage} />
                     <div></div>
                    <div className="box">
                    <Form.Group className="mb-3"  >
                         <div className=" col-12  mt-2"> 
                                 <Form.Label>Nº do Bilhete de identifcação (BI)</Form.Label>
                                 <Form.Control className={!!errors.student_identityCard && 'is-invalid'}  onChange={handleInput} value={form.student_identityCard} isInvalid={!!errors.student_identityCard}   type="text"   
                                 placeholder="" name='student_identityCard' id="student_identityCard"  /> 
                                <Form.Control.Feedback type='invalid'>{errors.student_identityCard}</Form.Control.Feedback>
                         </div>  
                         <div className="col-12 mt-4">
                             <Form.Label>Nome completo</Form.Label>
                             <Form.Control  onChange={handleInput} className={!!errors.student_name && 'is-invalid'}  value={form.student_name} isInvalid={!!errors.student_name}  type="ntext"   
                              placeholder="" name='student_name' id="student_name"  /> 
                              <Form.Control.Feedback type='invalid'>{errors.student_name}</Form.Control.Feedback>
                         </div>
                    </Form.Group> 
                    </div>
                  </FlexBox> 
                  <Form.Group> 
                       <div className="ed-flex col-ip-3 col-12 mt-4">
                             <div className="block">
                                 <Form.Label>Nacionalidade</Form.Label>
                                 <Form.Select  onChange={handleInput} className={!!errors.student_nacionality && 'is-invalid'} value={form.student_nacionality} isInvalid={!!errors.student_nacionality}
                                     placeholder="" name='student_nacionality' id="student_nacionality"  >
                                       <option value="2" selected>Angolana</option>
                                       <option value="3">Brazileiro</option>
                                 </Form.Select>
                                 <Form.Control.Feedback type='invalid'>{errors.student_nacionality}</Form.Control.Feedback>
                             </div>
                             <div className="block ml-2">
                                 <Form.Label>Morada</Form.Label>
                                 <Form.Control  onChange={handleInput} className={!!errors.student_address && 'is-invalid'}  value={form.student_address} isInvalid={!!errors.student_address}
                                  type="text"  placeholder="" name='student_address' id="student_address"  /> 
                                  <Form.Control.Feedback type='invalid'>{errors.student_address}</Form.Control.Feedback>
                             </div>
                             <div className="block ml-2">
                                 <Form.Label>Genero</Form.Label>
                                 <Form.Select  onChange={handleInput} className={!!errors.student_gender && 'is-invalid'}  value={form.student_gender} isInvalid={!!errors.student_gender}
                                       placeholder="" name='student_gender' id="student_gender"  >
                                       <option value="male" selected>Masculino</option>
                                       <option value="female">Femenino</option>
                                 </Form.Select> 
                                 <Form.Control.Feedback type='invalid'>{errors.student_gender}</Form.Control.Feedback>
                             </div>
                         </div>
                  </Form.Group>
                  <Form.Group> 
                       <div className="ed-flex col-ip-3 col-12 mt-4">
                             <div className="block">
                                 <Form.Label>Religião</Form.Label>
                                 <Form.Select  onChange={handleInput} className={!!errors.student_religion && 'is-invalid'}  value={form.student_religion} isInvalid={!!errors.student_religion}
                                   name='student_religion' id="student_religion" >
                                    <ReligionOptions/>
                                 </Form.Select> 
                                 <Form.Control.Feedback type='invalid'>{errors.student_religion}</Form.Control.Feedback>
                             </div>
                             <div className="block ml-2">
                                 <Form.Label>Data de aniversario</Form.Label>
                                 <Form.Control className={!!errors.student_birthday && 'is-invalid'}  onChange={handleInput}   value={form.student_birthday} isInvalid={!!errors.student_birthday}
                                  type="date"  name='student_birthday' id="student_birthday"  /> 
                                 <Form.Control.Feedback type='invalid'>{errors.student_birthday}</Form.Control.Feedback>
                             </div>
                             <div className="block ml-2">
                                 <Form.Label>Telefone</Form.Label>
                                 <Form.Control  onChange={handleInput} className={!!errors.student_phone && 'is-invalid'}  type="number" value={form.student_phone} isInvalid={!!errors.student_phone}
                                  placeholder="" name='student_phone' id="student_phone"  /> 
                                 <Form.Control.Feedback type='invalid'>{errors.student_phone}</Form.Control.Feedback>
                             </div>
                         </div>
                         <div className="block mt-3">
                                 <Form.Label>Email</Form.Label>
                                 <Form.Control  onChange={handleInput} className={!!errors.student_email && 'is-invalid'} value={form.student_email} isInvalid={!!errors.student_email}
                                  type="email"  name='student_email' id="student_email"   placeholder="" />
                                 <Form.Control.Feedback type='invalid'>{errors.student_email}</Form.Control.Feedback>
                             </div>
                  </Form.Group>
                  <Form.Group className='block mt-4'>
                <Form.Label>Naturalidade</Form.Label>
                  <Form.Control  onChange={handleInput} className={!!errors.student_naturalness && 'is-invalid'}  value={form.student_naturalness} isInvalid={!!errors.student_naturalness}
                    type="text"  placeholder="" name='student_naturalness' id="student_naturalness"  /> 
                  <Form.Control.Feedback type='invalid'>{errors.student_naturalness}</Form.Control.Feedback>
               </Form.Group>
            </BoxContainer>
            <br />
            <BoxContainer className='boxItem'>
            <h2 className="title">Informações escolares</h2> 
            <Form.Group className='block mt-4'>
                <Form.Label>Nome da ultima escola que frequentou</Form.Label>
                  <Form.Control  onChange={handleInput} className={!!errors.student_lastschool && 'is-invalid'}  value={form.student_lastschool} isInvalid={!!errors.student_lastschool}
                     type="text"  placeholder="" name='student_lastschool' id="student_lastschool"  /> 
                  <Form.Control.Feedback type='invalid'>{errors.student_lastschool}</Form.Control.Feedback>
             </Form.Group>
             <Form.Group className='block mt-4'>
                <Form.Label>Ultima classe que frequentou </Form.Label>
                  <Form.Control  onChange={handleInput} className={!!errors.student_lastclass && 'is-invalid'}  value={form.student_lastclass} isInvalid={!!errors.student_lastclass}
                    type="text"  placeholder="" name='student_lastclass' id="student_lastclass"  /> 
                  <Form.Control.Feedback type='invalid'>{errors.student_lastclass}</Form.Control.Feedback>
             </Form.Group>  
             <Form.Group>  
                  <div className="ed-flex fill col-12 mt-4"> 
                        <div className="block col-lg-6">
                            <Form.Label>Turma</Form.Label>
                            <Form.Select  onChange={handleInput} className={!!errors.student_class && 'is-invalid'}  value={form.student_class} isInvalid={!!errors.student_class} 
                             select name='student_class' id="student_class" >
                                 <ClassDataOptions/>
                            </Form.Select> 
                            <Form.Control.Feedback type='invalid'>{errors.student_class}</Form.Control.Feedback>
                        </div>
                        <div className="block col ml-2">
                            <Form.Label>Estado do aluno na instituição</Form.Label>
                            <Form.Select  onChange={handleInput}  value={form.student_status} className={!!errors.student_status && 'is-invalid'}  isInvalid={!!errors.student_status} 
                            select name='student_status' id="student_status"  >
                                <option value="1" selected>Activo</option>
                                <option value="0">Inactivo</option>
                            </Form.Select>  
                            <Form.Control.Feedback type='invalid'>{errors.student_status}</Form.Control.Feedback>
                        </div>
                    </div>  
                        { 
                           Class !== null && Class >= 0 ? 
                           <>
                            {
                            <div className="mt-4 ed-wrap">
                                <div className="badge bg-main-light mr-2">
                                    Ano lectivo : <GetAcademicYear_byclass ID={Class}/>
                                </div>
                                <div className="badge bg-main-light mr-2">
                                   Sala : <GetClassroom_byclass ID={Class}/>
                                </div>
                                <div className="badge bg-main-light mr-2">
                                   Curso : <GetCourse_byclass ID={Class}/>
                                </div>
                                <div className="badge bg-main-light mr-2">
                                    Periodo : <GetPeriod_byclass ID={Class}/>
                                </div> 
                                <div className="badge bg-main-light">
                                    Classe : <GetAcademiclevel_byclass ID={Class}/>
                                </div> 
                             </div>
                            }
                          </>
                          : 
                          <></>  
                        } 
             </Form.Group>  
             <Form.Group>
                <div className="col-12 mt-4">
                    <Form.Label>Bolseiro</Form.Label>
                    <Form.Select  onChange={handleInput}  className={!!errors.student_scholarshipHolder && 'is-invalid'} 
                    value={form.student_scholarshipHolder} isInvalid={!!errors.student_scholarshipHolder}  select name='student_scholarshipHolder' id="student_scholarshipHolder"  >
                        <option value="0" selected>Não</option>
                        <option value="1">Sim</option>
                    </Form.Select> 
                    <Form.Control.Feedback type='invalid'>{errors.student_scholarshipHolder}</Form.Control.Feedback>
                </div>
             </Form.Group>
       </BoxContainer>
            <br />
            <BoxContainer className='boxItem'>
               <h2 className="title">Informações de saude</h2>
                  <Form.Group>  
                       <div className="ed-block  mt-4">
                             <div className="block">
                                 <Form.Label>Problemas de saude / Deficiencia</Form.Label>
                                 <Form.Select  onChange={handleInput}  className={!!errors.student_health_problems && 'is-invalid'} 
                                 value={form.student_health_problems} isInvalid={!!errors.student_health_problems}  select name='student_health_problems' id="student_health_problems"  >
                                     <option value="0" selected={setToggleHealth === 0 ? true : false} >Não</option>
                                     <option value="1" selected={setToggleHealth === 1 ? true : false}>Sim</option>
                                 </Form.Select> 
                                 <Form.Control.Feedback type='invalid'>{errors.student_health_problems}</Form.Control.Feedback>
                             </div>
                             <div  className={ToggleHealth === 0 ? "optional-box d-none" : "optional-box"} >
                             <div className="block mt-4">
                                 <Form.Label>Descrição  (<small className='text-danger'>Insira informações como receita , ou descreva de  que se trata o problema do aluno</small>) </Form.Label>
                                 <RichTextEditor/>
                             </div>
                             </div>
                         </div>
                  </Form.Group>  
            </BoxContainer>
            <br /> 
            </div> 
            {
               CurrentFiles.length >= 1 ? 
              <div>
                    <BoxContainer className='boxItem'>
               <h2 className="title">Ficheiros anexados</h2> 
                <ul className='student-file-cp'>
                  {
                    CurrentFiles.map((item, index)=>{ 
                      return ( 
                       <li className='student-file-el' id={`student-file-el-${index}`} key={index}>
                         <div className="ed-space"> 
                           <div className="ed-flex">
                           <div className="icon">
                              <HiOutlineDocumentText />
                          </div>
                          <div className="block">
                          <div className="title text-main-light"><ReduceTextLength text={item.ed_file_name} length={ window.width >= 1300 ? 80 : 50} /></div>
                            <div className="ed-flex">
                                <div className="date text-dark"><AccessTimeOutlined /><span>{item.ed_file_register_date}</span></div>
                                | <div className="size text-dark">{NumberToBytes(item.ed_file_size)}</div>
                            </div>
                          </div>  
                           </div>  
                           <div className="delete">
                           <DeleteModal remove_element={`#student-file-el-${index}`} title='este ficheiro' url={Hoot()+`eduallfiledelete/delete/${item.ed_file_id}`} 
                              message='Ficheiro deletada com sucesso' toggle_btn={ 
                               <div  className="btn-circle bg-danger ml-2 text-light">
                                   <DeleteOutline />
                               </div>} /> 
                           </div>
                          </div>
                         </li> 
                     )
                   })
                 }
                </ul>
              </BoxContainer>
              <br />
              </div>
              :
              <></>
            } 
            <BoxContainer className='boxItem'>
                 <h2 className="title">Carregar documentos e Renomear</h2> 
                  <FileUpload input_name="student_files" Icon="0"  type_of_files="application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/pdf"
                   extensions="pdf, docx" Files={GetFiles}  ref={ChildRef2}    />
            </BoxContainer> 
            <div className="mt-2 d-none">
            <BoxContainer className='boxItem'>
                <div className="Camera">
      
                </div>
            </BoxContainer>
            </div>
            <br />
            </Form>
          </>)
    }else if(Founded === false){
       return (<NotFounded/>)
    }
   }else{
      return(
         <div className="loader-content-box">
            <Loader/>
         </div>
      )
   }

}

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
`;

export default UpdateStudent