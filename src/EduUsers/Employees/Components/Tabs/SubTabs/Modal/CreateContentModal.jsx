import React, { useEffect, useRef } from 'react'
import FullDialogPopup from '../../../../../../General/components/FullDialogPopup'
import { AiOutlineMenu, AiOutlinePlusCircle } from "react-icons/ai";
import styled from '@emotion/styled';
import { useState } from 'react';
import { Form, Button} from 'react-bootstrap'
import { RichTextEditor } from '../../../../../Students/Components/RichTextEditor';
import { Save } from '@material-ui/icons';
import { GetClasstitle_byclass, GetSubject } from '../../../../../../General/components/InstituteData';
import FileUpload from '../../../../../../General/components/FileUpload';
import { Checkbox, FormControlLabel } from '@mui/material';
import CRValue from '../../../../../../General/components/CRValue';
import { toast } from 'react-toastify';
import Hoot from '../../../../../../General/components/Hoot';



const FORMURL = [
  Hoot()+"edualllessoncontentregister/post/", 
  Hoot()+"eduallfilesregister/post/",  
  Hoot()+"eduallparentnopicregister/post"
];



function ModalaData(props){
    const [activeTab, setActiveTab] = useState(0);
    const ChildRef = useRef();
    const ChildRef2 = useRef();
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});
    const [Files, setFiles] = useState([]); 
    const [Docfile, setDocfile] = useState(false);
   
   
    const showBoxFile = ()=>{ 
      if(Docfile === true){
        setDocfile(false)
      } else {
        setDocfile(true);
      }
    } 

    const GetFiles = (e)=>{
      setFiles(e);
  }


   
const INPUTS = { 
  student_name:CRValue("#student_name"), 
  student_address:CRValue("#student_address"), 
  student_nacionality:CRValue("#student_nacionality"), 
  student_gender:CRValue("#student_gender"),
  student_religion:CRValue("#student_religion"),
  student_birthday:CRValue("#student_birthday"), 
  student_phone:CRValue("#student_phone"), 
  student_lastschool:CRValue("#student_lastschool"),
  student_naturalness:CRValue("#student_naturalness"),
  student_lastclass:CRValue("#student_lastclass"),

  student_email:CRValue("#student_email"), 
  student_hasAccount:CRValue("#student_hasAccount"),
  student_scholarshipHolder:CRValue("#student_scholarshipHolder"),
  student_class:CRValue("#student_class"),  
  student_identityCard:CRValue("#student_identityCard"), 
  student_files:Files ,
  student_health_problems:CRValue("#student_health_problems"), 
  student_health_problems_description:CRValue("#student_health_problems_descriptio"), 
  student_status:CRValue("#student_status"), 

  guardion_name:CRValue("#guardion_name"), 
  guardion_email:CRValue("#guardion_email"),
  guardion_phone:CRValue("#guardion_phone"),
  guardion_emergency_phone:CRValue("#guardion_emergency_phone"),
  guardion_job:CRValue("#guardion_job"),  
  guardion_address:CRValue("#guardion_address"), 
  guardion_phone2:CRValue("#guardion_emergency_phone"),
  guardion_gender:CRValue("#guardion_gender"),
  guardion_degree_of_kinship:CRValue("#guardion_degree_of_kinship"),

  father_name:CRValue("#father_name"), 
  father_email:CRValue("#father_email"),
  father_phone:CRValue("#father_phone"),
  father_emergency_phone:CRValue("#father_emergency_phone"),
  father_job:CRValue("#father_job"),   
  father_address:CRValue("#father_address"), 
  father_phone2:CRValue("#father_emergency_phone"),

  mother_name:CRValue("#mother_name"), 
  mother_email:CRValue("#mother_email"),
  mother_phone:CRValue("#mother_phone"),
  mother_emergency_phone:CRValue("#mother_emergency_phone"),
  mother_job:CRValue("#mother_job"),   
  mother_address:CRValue("#mother_address"), 
  mother_phone2:CRValue("#mother_emergency_phone"), 

}

    const validateForm = ()=>{
      const {student_name, student_address, student_nacionality,  student_gender, student_religion, student_birthday, student_phone ,  
      student_email,  student_class,  student_identityCard, student_health_problems , student_scholarshipHolder,  student_status, 
      father_name, father_address , father_job, father_phone, father_phone2 , father_email, student_lastschool, student_lastclass , student_naturalness ,
      mother_name, mother_address , mother_job, mother_phone, mother_phone2 , mother_email,
      guardion_name,  guardion_degree_of_kinship , guardion_address , guardion_job, guardion_phone, guardion_phone2 , guardion_email
     } = form; 
      
     const NewErrors = {};
 
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
  
  
  useEffect(()=>{
    
  },[]);
  
  
  const FormSubmit = (e)=>{  
   e.preventDefault();   
   const formErrors = validateForm();
     if(Object.keys(formErrors).length > 0){
          setErrors(formErrors);
          console.log(formErrors)
          toast.error("Verifique todos os  campos");    
     }else{  
  

      /*
      console.log(INPUTS);
  
      const formData = new FormData();  
      formData.append("student_name",INPUTS.student_name); 
      formData.append("student_scholarshipHolder",INPUTS.student_scholarshipHolder); 
      formData.append("student_address",INPUTS.student_address);
      formData.append("student_nacionality",INPUTS.student_nacionality);
      formData.append("student_gender",INPUTS.student_gender);
      formData.append("student_religion",INPUTS.student_religion);
      formData.append("student_birthday",INPUTS.student_birthday);
      formData.append("student_phone",INPUTS.student_phone); 
      formData.append("student_naturalness", INPUTS.student_naturalness);
      formData.append("student_lastclass", INPUTS.student_lastclass);
      formData.append("student_lastschool", INPUTS.student_lastschool);
      formData.append("student_email",INPUTS.student_email);
      formData.append("student_hasAccount",INPUTS.student_hasAccount);
      formData.append("student_class",Math.floor(INPUTS.student_class));
      formData.append("student_code",INPUTS.student_code);
      formData.append("student_identityCard",INPUTS.student_identityCard);
      formData.append("student_picture",INPUTS.student_picture); 
      formData.append("student_health_problems",INPUTS.student_health_problems);
      formData.append("student_health_problems_description",INPUTS.student_health_problems_description);
      formData.append("student_status",INPUTS.student_status); 
  
      const fatherData = {
          parent_name:INPUTS.father_name,
          parent_students:INPUTS.student_code,
          parent_gender:0,
          parent_degree_of_kinship:1,
          parent_address:INPUTS.father_address, 
          parent_job:INPUTS.father_job,
          parent_phone:INPUTS.father_phone,
          parent_phone2:INPUTS.father_emergency_phone,
          parent_email:INPUTS.father_email,
          parent_guardion:INPUTS.student_guardion*1 === 1 ? 1 : 0
      }
   
     const motherData =  {
          parent_name:INPUTS.mother_name,
          parent_students:INPUTS.student_code,
          parent_gender:1,
          parent_degree_of_kinship:0,
          parent_address:INPUTS.mother_address,
          parent_job:INPUTS.mother_job, 
          parent_phone:INPUTS.mother_phone,
          parent_phone2:INPUTS.mother_emergency_phone,
          parent_email:INPUTS.mother_email,
          parent_guardion:INPUTS.student_guardion*1 === 0 ? 1 : 0
    }
  
    const guardionData = {
          parent_name:INPUTS.guardion_name,
          paremt_students:INPUTS.student_code,
          parent_gender:INPUTS.guardion_gender,
          parent_degree_of_kinship:INPUTS.guardion_degree_of_kinship, 
          parent_address:INPUTS.guardion_address,
          parent_job:INPUTS.guardion_job, 
          parent_phone:INPUTS.guardion_phone,
          parent_phone2:INPUTS.guardion_emergency_phone,
          parent_email:INPUTS.guardion_email ,
          parent_guardion:INPUTS.student_guardion*1 === 2 ? 1 : 0
    }
  
        const RegisterParents = ()=>{ 
          if(INPUTS.father_name != "" || INPUTS.father_name != " "){
              if(INPUTS.father_name.length >= 4) 
                  axios.post(FORMURL[2] , fatherData)
                  .then((e)=>{   
                      toast.success("Encarregado cadastrado com sucesso !"); 
                      console.log(e.data)
                  }).catch((error)=>{
                      console.log(error); 
                      toast.error("lamentamos mas não foi possivel cadastrar o encarregado !");   
                  }); 
              } 
              if(INPUTS.mother_name != "" || INPUTS.mother_name != " "){
                if(INPUTS.mother_name.length >= 4) 
                  axios.post(FORMURL[2] , motherData)
                  .then((e)=>{    
                      console.log(e.data)
                      toast.success("Encarregado cadastrado com sucesso !"); 
                  }).catch((error)=>{
                      console.log(error); 
                      toast.error("lamentamos mas não foi possivel cadastrar o encarregado !");  
                  }); 
              } 
              if(INPUTS.guardion_name != "" || INPUTS.guardion_name != " "){
                if(INPUTS.guardion_name.length >= 4) 
                  axios.post(FORMURL[2] , guardionData)
                  .then((e)=>{    
                      console.log(e.data)
                      toast.success("Encarregado cadastrado com sucesso !"); 
                  }).catch((error)=>{
                      console.log(error); 
                      toast.error("lamentamos mas não foi possivel cadastrar o encarregado !");    
                  }); 
              } 
              
            toast.success("Estudante cadastrado com sucesso !"); 
              setTimeout(() =>{ 
                  setForm({});
                  ClearInputs(); 
                  ChildRef.current.RemoveImage();  
                  ChildRef2.current.ClearFiles();  
                  setStudentGuardion(null);
               }, 3000);
        }
   
    
      axios.post(FORMURL[0] , formData).then((e)=>{      
          
          console.log(e.data)
  
       INPUTS.student_files = Files.length >= 1 ? INPUTS.student_files[0] :  [];  
        if (Files.length >= 1){
            for(let i = 0; i < INPUTS.student_files.length; i++) {
               const file = INPUTS.student_files[i];   
               const fileData = new FormData();
               let extension = "pdf" //file.type.split("/")[1] !== "" ? file.type.split("/")[1] : undefined;
               fileData.append("file_name", file);
               fileData.append("file_code",INPUTS.student_code);
               fileData.append("file_size",file.size);
               fileData.append("file_type",file.type);
               fileData.append("file_use", "student_register");
               fileData.append("file_extension", extension);
               fileData.append("institute_code",INPUTS.student_code); 
               
       
     
        
               axios.post(FORMURL[1] , fileData)
               .then((e)=>{   
                 //console.log(e.data) 
                  if(i === (INPUTS.student_files.length -1)); 
               }).catch((error)=>{
                 toast.error(error);   
               }); 
  
  
            }   
        }  
       RegisterParents();  
      }).catch((error)=>{
          toast.error("Lamentamos mas não possivel cadastrar  o estudante !");   
          console.table(error); 
      }); 
      
      */
    }  
  };

  
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
 
  
  const handleInput = (e)=>{  
    switch (e.target.id) {
     case "student_class":
        setField("student_class", e.target.value)
        INPUTS.student_class = e.target.value 
       break; 
        case "student_lastschool":
          setField("student_lastschool", e.target.value)
          INPUTS.student_lastschool = e.target.value;
         break;
         case "student_lastclass":
          setField("student_lastclass", e.target.value)
          INPUTS.student_lastclass = e.target.value;
         break;     
     }
  } 







    return (
         <Content>
             <Form className='mb-4'> 
               <Form.Select id="quarterly_note_subClass"  style={{minWidth:'300px'}}>
                  {props.data.map((item, index)=>{
                      return(<option key={index} value={item.ed_tch_subject_class + "|"+ item.ed_tch_subject_code}> 
                          Turma - <GetClasstitle_byclass ID={item.ed_tch_subject_class} /> 
                            ( <GetSubject ID={item.ed_tch_subject_code} /> )
                        </option>)
                  })} 
              </Form.Select>
              <Form.Group className='mt-2'>
                <Form.Label>Titulo da aula</Form.Label>
                <Form.Control placeholder='' id='' />
            </Form.Group> 
            <Form.Group className='mt-2'>
                <Form.Label>Seccção / Capitulo</Form.Label>
                <Form.Select id=''>

                </Form.Select>
            </Form.Group>  
            </Form>
            <ul>
                <li onClick={()=>setActiveTab(0)} className={activeTab === 0 ? 'active' : ''} >Adicionar texto</li>
                <li onClick={()=>setActiveTab(1)} className={activeTab === 1 ? 'active' : ''} >Video</li>
                <li onClick={()=>setActiveTab(2)} className={activeTab === 2 ? 'active' : ''} >Avaliação ( Quiz )</li>
                <li onClick={()=>setActiveTab(3)} className={activeTab === 3 ? 'active' : ''} > </li>
                <li onClick={()=>setActiveTab(4)} className={activeTab === 4 ? 'active' : ''} >Email</li>
                <li onClick={()=>setActiveTab(5)} className={activeTab === 5 ? 'active' : ''} >Notificações</li> 
            </ul> 
            <div className='ed-block'>
                  <section className={`tab-item ${activeTab === 0 ? 'active' : ''}`}>
                      <Form onSubmit={FormSubmit}>
                        <div className="scroll-box"> 
                            <Form.Group className='mt-4'>
                                <Form.Label>Descrição</Form.Label>
                                <RichTextEditor  /> 
                            </Form.Group>
                            <br/>  
                            <div>
                              <FormControlLabel  onChange={()=>showBoxFile()}  control={<Checkbox  />}
                               label="Anexar ficheiros"/>  
                          </div> 
                          {Docfile ?
                           <>
                              <FileUpload input_name="student_files" Icon="0"  type_of_files="application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/pdf"
                              extensions="pdf, docx" Files={GetFiles} ref={ChildRef2}  /> 
                           </>  
                           : 
                          <></>}
                        <div> 
                        </div>
                        </div>
                           <div className="ed-space mt-4">
                                <div className="ed-flex"></div>
                                <div className="ed-flex">
                                   <Button className='bg-danger'> Limpar </Button>
                                   <Button className="btn btn-main ml-2" type="submit"><Save/> Criar</Button>
                                </div>
                            </div>
                      </Form>
                  </section>
                  <section className={`tab-item ${activeTab === 1 ? 'active' : ''}`}></section>
                  <section className={`tab-item ${activeTab === 2 ? 'active' : ''}`}></section>
                  <section className={`tab-item ${activeTab === 3 ? 'active' : ''}`}></section>
                  <section className={`tab-item ${activeTab === 4 ? 'active' : ''}`}></section>
                  <section className={`tab-item ${activeTab === 5 ? 'active' : ''}`}></section>
            </div>
         </Content>
     )
}


export default function CreateContentModal(props){
  return (
    <div> 
      <FullDialogPopup title='Adicionar conteudo'  content={<ModalaData data={props.data} />}
        btn_toggle={<div className="add-button">
            <AiOutlinePlusCircle/> Adicionar conteudo
        </div>} />
    </div>
  )
}


const Content = styled.div` 

  .custom-editor{
      min-height:500px;
  }

    ul{
        list-style:none;
        display:flex;
        padding:0px;
        margin:0px;
        margin-bottom:30px;

        li{
           margin-right:20px;
           cursor:pointer;
           position:relative;
        }

        li.active{ 
          font-weight:600;

          &:after{
            position:absolute;
            top:30px;
            left:0px;
            border-radius:30px; 
            min-width:calc(100% + 5px);
            height:4px;
            content:'';
            background:var(--ed-purple-light);
        }
      }

    } 

`;
