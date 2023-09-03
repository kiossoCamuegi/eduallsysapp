import { Avatar } from '@mui/material';
import React, { useState } from 'react'
import { Button, Form, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { ClassDataOptions, GetemployeesOptionsType, SubjectDataOptions, TeachersDataOptions, TimingsDataOptions } from '../../../../General/components/InstituteData';
import { Save, Update } from '@mui/icons-material';
import TeacherClassDetails from './components/TeacherClassDetails';
import Hoot from '../../../../General/components/Hoot';
import RefreshList from '../../../../General/components/RefreshList';
import ClearInputs from '../../../../General/components/ClearInputs';
import CRValue from '../../../../General/components/CRValue';
import { toast } from 'react-toastify';
import axios from 'axios';
import CheckInput from '../../../../General/components/CheckInput';
import ReduceTextLength from '../../../../General/components/ReduceTextLength';

const Images = [
  require("../../../../Assets/images/avatars/avatar-6.jpg"), 
]

function AsignSubjectsCanvas(props) { 
    const [show, setShow] = useState(false); 
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);  
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});
    const [Data, SetData] = useState([]);
    const [EmployeeClasses, SetEmployeeClasses] = useState(0);
    const [FoundedEmployee, SetFoundedEmployee]  = useState(false);  

    const FORMURL = [
         Hoot()+"eduallregisterteachersubject/post/",
         Hoot()+"eduallgetsingleteachersubjects/get/",
         props.get ? props.get : '',
         props.url ? props.url : '',
         Hoot()+'eduallsinglemployee/get/',
         Hoot()+'eduallgetteachersubjects/get/',
         Hoot()+"eduallteachertimingregister/post"
    ]
  
    const INPUTS = {
      teacher_subject_teacher_code:CRValue("#teacher_subject_teacher_code"), 
      teacher_subject_class:CRValue("#teacher_subject_class"), 
      teacher_subject_code:CRValue("#teacher_subject_code"),  
      teacher_subject_teacher_timing_1:CRValue("#teacher_subject_teacher_timing_1"), 
      teacher_subject_teacher_weekday_1:CRValue("#teacher_subject_teacher_weekday_1"),  
      teacher_subject_teacher_timing_2:CRValue("#teacher_subject_teacher_timing_2"), 
      teacher_subject_teacher_weekday_2:CRValue("#teacher_subject_teacher_weekday_2"),  
      teacher_subject_teacher_timing_3:CRValue("#teacher_subject_teacher_timing_3"), 
      teacher_subject_teacher_weekday_3:CRValue("#teacher_subject_teacher_weekday_3"),  
      teacher_subject_teacher_timing_4:CRValue("#teacher_subject_teacher_timing_4"), 
      teacher_subject_teacher_weekday_4:CRValue("#teacher_subject_teacher_weekday_4"), 
    }; 
  
    
    const GET_DATA = async()=>{
       if(props.update){
        const response = await axios.get(FORMURL[1]); 
        if(response.data !=null){
          if(response.data[0] != null){


            document.querySelector("#title").value = response.data[0].ed_cicle_title;  
            INPUTS.code = response.data[0].ed_cicle_code;



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
   
  let FormValidateErrors = [];

     function validateForm(){ 
      let NewErrors = {}; 
      const GetErrors = async()=>{
        const {teacher_subject_teacher_code, teacher_subject_class, teacher_subject_code, 
          teacher_subject_teacher_timing_1, teacher_subject_teacher_weekday_1} = form;   

    
          if(INPUTS.teacher_subject_teacher_code ===  "" || INPUTS.teacher_subject_teacher_code ===  " "){
          if(!teacher_subject_teacher_code || teacher_subject_teacher_code === '') NewErrors.teacher_subject_teacher_code = 'Selecione um professor';  
          }else{if(!teacher_subject_teacher_code){setField("teacher_subject_teacher_code", INPUTS.teacher_subject_teacher_code);}} 
    
          if(INPUTS.teacher_subject_class ===  "" || INPUTS.teacher_subject_class ===  " "){
          if(!teacher_subject_class || teacher_subject_class === '') NewErrors.teacher_subject_class = 'Selecione uma turma';  
          }else{if(!teacher_subject_class){setField("teacher_subject_class", INPUTS.teacher_subject_class);}} 
    
          if(INPUTS.teacher_subject_code ===  "" || INPUTS.teacher_subject_code ===  " "){
          if(!teacher_subject_code || teacher_subject_code === '') NewErrors.teacher_subject_code = 'Selecione uma disciplina';  
          }else{if(!teacher_subject_code){setField("teacher_subject_code", INPUTS.teacher_subject_code);}} 
    
          if(INPUTS.teacher_subject_teacher_timing_1 ===  "" || INPUTS.teacher_subject_teacher_timing_1 ===  " "){
          if(!teacher_subject_teacher_timing_1 || teacher_subject_teacher_timing_1 === '') NewErrors.teacher_subject_teacher_timing_1 = 'Selecione um horário valido';  
          }else{if(!teacher_subject_teacher_timing_1){setField("teacher_subject_teacher_timing_1", INPUTS.teacher_subject_teacher_timing_1);}} 
    
          if(INPUTS.teacher_subject_teacher_weekday_1 ===  "" || INPUTS.teacher_subject_teacher_weekday_1 ===  " "){
          if(!teacher_subject_teacher_weekday_1 || teacher_subject_teacher_weekday_1 === '') NewErrors.teacher_subject_teacher_weekday_1 = 'Selecione um dia da semana';  
          }else{if(!teacher_subject_teacher_weekday_1){setField("teacher_subject_teacher_weekday_1", INPUTS.teacher_subject_teacher_weekday_1);}} 
            
         
        if(INPUTS.teacher_subject_teacher_code*1 >= 0 && INPUTS.teacher_subject_code*1 >= 0 && INPUTS.teacher_subject_class*1 >= 0){
          const response = await axios.get(FORMURL[1]+`${INPUTS.teacher_subject_teacher_code*1}`+","+`${INPUTS.teacher_subject_code*1}`+","
          +`${INPUTS.teacher_subject_class*1}`);  
          if(response.data.length >= 1){    
            if(!teacher_subject_code){setField("teacher_subject_code", INPUTS.teacher_subject_code);}
             NewErrors.teacher_subject_code = 'Esta Disciplina já foi atribuida';  
         };
        } else{
          if(INPUTS.teacher_subject_code ===  "" || INPUTS.teacher_subject_code ===  " "){
            if(!teacher_subject_code || teacher_subject_code === '') NewErrors.teacher_subject_code = 'Selecione uma disciplina';  
            }else{if(!teacher_subject_code){setField("teacher_subject_code", INPUTS.teacher_subject_code);}} 
                
          if(INPUTS.teacher_subject_teacher_code ===  "" || INPUTS.teacher_subject_teacher_code ===  " "){
            if(!teacher_subject_teacher_code || teacher_subject_teacher_code === '') NewErrors.teacher_subject_teacher_code = 'Selecione um professor';  
            }else{if(!teacher_subject_teacher_code){setField("teacher_subject_teacher_code", INPUTS.teacher_subject_teacher_code);}} 
      
            if(INPUTS.teacher_subject_class ===  "" || INPUTS.teacher_subject_class ===  " "){
            if(!teacher_subject_class || teacher_subject_class === '') NewErrors.teacher_subject_class = 'Selecione uma turma';  
            }else{if(!teacher_subject_class){setField("teacher_subject_class", INPUTS.teacher_subject_class);}}   
        } 
      }
      GetErrors();  

      setTimeout(() => { 
        console.log(NewErrors)
        FormValidateErrors = [];  
        FormValidateErrors.push(NewErrors); 
        return NewErrors;
      }, 100); 
  }
  
  
    const FormSubmit = (e)=>{  
       e.preventDefault(); 
       validateForm();  
       setTimeout(() => {  
        let formErrors =  FormValidateErrors[0];
        if(Object.keys(formErrors).length > 0){
              setErrors(formErrors);  
              toast.error("Verifique todos os  campos");    
          }else{  

            const SUBMIT_INPUTS = {
              teacher_subject_teacher_code:INPUTS.teacher_subject_teacher_code, 
              teacher_subject_class:INPUTS.teacher_subject_class,
              teacher_subject_code:INPUTS.teacher_subject_code, 
            };
    
    
            const SUBMIT_INPUTS_TIMING = [
               {
                teacher_subject_teacher_timing:CheckInput(INPUTS.teacher_subject_teacher_timing_1), 
                teacher_subject_teacher_weekday:CheckInput(INPUTS.teacher_subject_teacher_weekday_1), 
              }, 
              {
                teacher_subject_teacher_timing:CheckInput(INPUTS.teacher_subject_teacher_timing_2), 
                teacher_subject_teacher_weekday:CheckInput(INPUTS.teacher_subject_teacher_weekday_2), 
              }, 
              {
                teacher_subject_teacher_timing:CheckInput(INPUTS.teacher_subject_teacher_timing_3), 
                teacher_subject_teacher_weekday:CheckInput(INPUTS.teacher_subject_teacher_weekday_3), 
              }, 
              {
                teacher_subject_teacher_timing:CheckInput(INPUTS.teacher_subject_teacher_timing_4), 
                teacher_subject_teacher_weekday:CheckInput(INPUTS.teacher_subject_teacher_weekday_4), 
              }, 
            ];


            console.clear();
            console.log(SUBMIT_INPUTS, SUBMIT_INPUTS_TIMING);
    
        
       
            if(!props.update){
              try {
                axios.post(FORMURL[0], SUBMIT_INPUTS).then(()=>{   
                   for(let i = 0; i < SUBMIT_INPUTS_TIMING.length; i++){


                    axios.post(FORMURL[0], 
                      ).then(()=>{

                    }).catch((error)=>{toast.error("Lamentamos mas não foi  possivel executar esta ação")}); 
                       
                   } 
                }).catch((error)=>{toast.error("Lamentamos mas não foi  possivel executar esta ação")}); 
              } catch (error) {
                
              }
            } else {
               try {
                axios.put(FORMURL[2] , SUBMIT_INPUTS)
                .then(()=>{  
                  toast.success("Atribuição atualizada com sucesso !"); 
                  setForm({});
                  ClearInputs();
                  RefreshList(`.el-refresh-list`)
      
                }).catch((error)=>{toast.error("Lamentamos mas não foi  possivel executar esta ação")}); 
               } catch (error) {
                
               }
            }  



          }  
       }, 150); 
    };



    const GetEmployeeData = async(e)=>{
      const classes = [];
       try {
        const [response1, response2 ] = await Promise.all([
          axios.get(FORMURL[4]+e),
          axios.get(FORMURL[5]+e),
        ]) 
      if (response1.data.length >= 1){ 
           SetData(response1.data[0]);
           document.title = "Informações do funcionario"+ " - "+ response1.data[0].ed_employee_name; 
           SetFoundedEmployee(true);

           response2.data.map((item, index)=>{
             if(!classes.includes(item.ed_tch_subject_class*1)) classes.push(item.ed_tch_subject_class); 
           })
           SetEmployeeClasses(classes.length);
      }else{ 
          SetFoundedEmployee(false);
      }
       } catch (error) {
        SetFoundedEmployee(false);
       }
    }
  
      
    const handleInput = (e)=>{ 
       switch (e.target.id) { 
          case "teacher_subject_teacher_code":
            setField("teacher_subject_teacher_code", e.target.value) 
            INPUTS.teacher_subject_teacher_code = e.target.value
            GetEmployeeData(e.target.value);
           break; 
           case "teacher_subject_class":
            setField("teacher_subject_class", e.target.value) 
            INPUTS.teacher_subject_class = e.target.value
           break; 
           case "teacher_subject_code":
            setField("teacher_subject_code", e.target.value) 
            INPUTS.teacher_subject_code = e.target.value
           break; 
           case "teacher_subject_teacher_timing_1":
            setField("teacher_subject_teacher_timing_1", e.target.value) 
            INPUTS.teacher_subject_teacher_timing_1 = e.target.value
           break; 
           case "teacher_subject_teacher_weekday_1":
            setField("teacher_subject_teacher_weekday_1", e.target.value) 
            INPUTS.teacher_subject_teacher_weekday_1 = e.target.value
           break; 
           case "teacher_subject_teacher_timing_2":
            setField("teacher_subject_teacher_timing_2", e.target.value) 
            INPUTS.teacher_subject_teacher_timing_2 = e.target.value
           break; 
           case "teacher_subject_teacher_weekday_2":
            setField("teacher_subject_teacher_weekday_2", e.target.value) 
            INPUTS.teacher_subject_teacher_weekday_2 = e.target.value
           break; 
           case "teacher_subject_teacher_timing_3":
            setField("teacher_subject_teacher_timing_3", e.target.value) 
            INPUTS.teacher_subject_teacher_timing_3 = e.target.value
           break; 
           case "teacher_subject_teacher_weekday_3":
            setField("teacher_subject_teacher_weekday_3", e.target.value) 
            INPUTS.teacher_subject_teacher_weekday_3 = e.target.value
           break; 
           case "teacher_subject_teacher_timing_4":
            setField("teacher_subject_teacher_timing_4", e.target.value) 
            INPUTS.teacher_subject_teacher_timing_4 = e.target.value
           break; 
           case "teacher_subject_teacher_weekday_4":
            setField("teacher_subject_teacher_weekday_4", e.target.value) 
            INPUTS.teacher_subject_teacher_weekday_4 = e.target.value
           break;  
           default:
       }
    }
  
  

    return (
      <div>
        <div onClick={handleShow}>{props.toggle_btn ? props.toggle_btn : <></> }</div>
        <Offcanvas placement='end' id="offcanvasRight" show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Atribuir disciplinas</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
             <hr />
             <Form  onSubmit={FormSubmit}> 
              <Form.Group className='mt-2'>
                <Form.Label>Selecionar professor<span className='text-danger ml-2'>*</span></Form.Label>
                <Form.Select onChange={handleInput} className={!!errors.teacher_subject_teacher_code && 'is-invalid'} value={form.teacher_subject_teacher_code}
                       isInvalid={!!errors.teacher_subject_teacher_code}    id="teacher_subject_teacher_code">
                      <GetemployeesOptionsType ID={0}/>
                </Form.Select>
              </Form.Group>

              {FoundedEmployee === true ?   
               <>
                <ProfileBox className='bg-blue'>
                    <div className="ed-space">
                      <div className="ed-flex">
                      <div className='avatarimage'>
                          <Link to={`/employeeinfo/${Data.ed_employee_id}`} >
                              <Avatar className='df' src={Hoot()+Data.ed_employee_picture}  sx={{width:70,height:70}} alt={Data.ed_employee_name} />
                          </Link>
                        </div>
                        <div className="ed-block">
                            <h1>Pr <ReduceTextLength text={Data.ed_employee_name}  length={15} /></h1>
                            <span>leciona em - {EmployeeClasses} {EmployeeClasses === 1 ? " Turma" : " Turmas"}  </span>
                        </div> 
                      </div>
                         <TeacherClassDetails toggle_btn={
                         <div className='btn bg-light'><RemoveRedEyeOutlinedIcon /></div> 
                      } /> 
                    </div>
                 </ProfileBox>
                 <Box>
                 <div className="ed-space">
                  <Form.Group className='col-lg-6 mt-4'>
                      <Form.Label>Turmas<span className='text-danger ml-2'>*</span></Form.Label>
                      <Form.Select onChange={handleInput} className={!!errors.teacher_subject_class && 'is-invalid'} value={form.teacher_subject_class}
                       isInvalid={!!errors.teacher_subject_class}    id="teacher_subject_class">
                          <ClassDataOptions/>
                      </Form.Select>
                      <Form.Control.Feedback type='invalid'>{errors.teacher_subject_class}</Form.Control.Feedback>
                    </Form.Group> 
                    <Form.Group className='col-lg-6 mt-4'>
                      <Form.Label>Disciplinas<span className='text-danger ml-2'>*</span></Form.Label>
                      <Form.Select  onChange={handleInput} className={!!errors.teacher_subject_code && 'is-invalid'} value={form.teacher_subject_}
                       isInvalid={!!errors.teacher_subject_code}    id="teacher_subject_code"> 
                          <SubjectDataOptions/>
                      </Form.Select> 
                     <Form.Control.Feedback type='invalid'>{errors.teacher_subject_code}</Form.Control.Feedback>
                    </Form.Group>
                  </div>
                  <Title>Selecionar Horarios</Title> 
                  <div className="ed-space">
                  <Form.Group className='col-lg-6 mt-4'>
                      <Form.Label>Horário<span className='text-danger ml-2'>*</span></Form.Label>
                      <Form.Select onChange={handleInput} className={!!errors.teacher_subject_teacher_timing_1 && 'is-invalid'} value={form.teacher_subject_teacher_timing_1}
                       isInvalid={!!errors.teacher_subject_teacher_timing_1}    id="teacher_subject_teacher_timing_1">
                          <TimingsDataOptions />
                      </Form.Select>
                      <Form.Control.Feedback type='invalid'>{errors.teacher_subject_teacher_timing_1}</Form.Control.Feedback>
                    </Form.Group> 
                    <Form.Group className='col-lg-6 mt-4'>
                      <Form.Label>Dia da semana<span className='text-danger ml-2'>*</span></Form.Label>
                      <Form.Select onChange={handleInput} className={!!errors.teacher_subject_teacher_weekday_1 && 'is-invalid'} value={form.teacher_subject_teacher_weekday_1}
                       isInvalid={!!errors.teacher_subject_teacher_weekday_1}    id="teacher_subject_teacher_weekday_1">
                          <option value="#" selected>Selecionar</option>
                           <option value="0">Domingo</option>
                           <option value="1">Segunda-feira</option>
                           <option value="2">Terça-feira</option>
                           <option value="3">Quarta-feira</option>
                           <option value="4">Quinta-feira</option>
                           <option value="5">Sexta-feira</option>
                           <option value="6">Sábado</option>
                      </Form.Select>
                      <Form.Control.Feedback type='invalid'>{errors.teacher_subject_teacher_weekday_1}</Form.Control.Feedback>
                    </Form.Group>
                  </div>          
                  <div className="ed-space">
                  <Form.Group className='col-lg-6 mt-4'>
                      <Form.Label>Horário</Form.Label>
                      <Form.Select onChange={handleInput} className={!!errors.teacher_subject_teacher_timing_2 && 'is-invalid'} value={form.teacher_subject_teacher_timing_2}
                       isInvalid={!!errors.teacher_subject_teacher_timing_2}    id="teacher_subject_teacher_timing_2">
                          <TimingsDataOptions />
                      </Form.Select>
                      <Form.Control.Feedback type='invalid'>{errors.teacher_subject_teacher_timing_2}</Form.Control.Feedback>
                    </Form.Group> 
                    <Form.Group className='col-lg-6 mt-4'>
                      <Form.Label>Dia da semana</Form.Label>
                      <Form.Select onChange={handleInput} className={!!errors.teacher_subject_teacher_weekday_2 && 'is-invalid'} value={form.teacher_subject_teacher_weekday_2}
                       isInvalid={!!errors.teacher_subject_teacher_weekday_2}    id="teacher_subject_teacher_weekday_2">
                            <option value="#" selected>Selecionar</option>
                           <option value="0">Domingo</option>
                           <option value="1">Segunda-feira</option>
                           <option value="2">Terça-feira</option>
                           <option value="3">Quarta-feira</option>
                           <option value="4">Quinta-feira</option>
                           <option value="5">Sexta-feira</option>
                           <option value="6">Sábado</option>
                      </Form.Select>
                      <Form.Control.Feedback type='invalid'>{errors.teacher_subject_teacher_weekday_2}</Form.Control.Feedback>
                    </Form.Group>
                  </div>            
                  <div className="ed-space">
                  <Form.Group className='col-lg-6 mt-4'>
                      <Form.Label>Horário</Form.Label>
                      <Form.Select onChange={handleInput} className={!!errors.teacher_subject_teacher_timing_3 && 'is-invalid'} value={form.teacher_subject_teacher_timing_3}
                       isInvalid={!!errors.teacher_subject_teacher_timing_3}    id="teacher_subject_teacher_timing_3">
                          <TimingsDataOptions />
                      </Form.Select>
                      <Form.Control.Feedback type='invalid'>{errors.teacher_subject_teacher_timing_3}</Form.Control.Feedback>
                    </Form.Group> 
                    <Form.Group className='col-lg-6 mt-4'>
                      <Form.Label>Dia da semana</Form.Label>
                      <Form.Select onChange={handleInput} className={!!errors.teacher_subject_teacher_weekday_3 && 'is-invalid'} value={form.teacher_subject_teacher_weekday_3}
                       isInvalid={!!errors.teacher_subject_teacher_weekday_3}    id="teacher_subject_teacher_weekday_3">
                           <option value="#" selected>Selecionar</option>
                           <option value="0">Domingo</option>
                           <option value="1">Segunda-feira</option>
                           <option value="2">Terça-feira</option>
                           <option value="3">Quarta-feira</option>
                           <option value="4">Quinta-feira</option>
                           <option value="5">Sexta-feira</option>
                           <option value="6">Sábado</option>
                      </Form.Select>
                      <Form.Control.Feedback type='invalid'>{errors.teacher_subject_teacher_weekday_3}</Form.Control.Feedback>
                    </Form.Group>
                  </div>              
                  <div className="ed-space">
                  <Form.Group className='col-lg-6 mt-4'>
                      <Form.Label>Horário</Form.Label>
                      <Form.Select onChange={handleInput} className={!!errors.teacher_subject_teacher_timing_4 && 'is-invalid'} value={form.teacher_subject_teacher_timing_4}
                       isInvalid={!!errors.teacher_subject_teacher_timing_4}    id="teacher_subject_teacher_timing_4">
                          <TimingsDataOptions />
                      </Form.Select>
                      <Form.Control.Feedback type='invalid'>{errors.teacher_subject_teacher_timing_4}</Form.Control.Feedback>
                    </Form.Group> 
                    <Form.Group className='col-lg-6 mt-4'>
                      <Form.Label>Dia da semana</Form.Label>
                      <Form.Select onChange={handleInput} className={!!errors.teacher_subject_teacher_weekday_4 && 'is-invalid'} value={form.teacher_subject_teacher_weekday_4}
                       isInvalid={!!errors.teacher_subject_teacher_weekday_4}    id="teacher_subject_teacher_weekday_4">
                            <option value="#" selected>Selecionar</option>
                           <option value="0">Domingo</option>
                           <option value="1">Segunda-feira</option>
                           <option value="2">Terça-feira</option>
                           <option value="3">Quarta-feira</option>
                           <option value="4">Quinta-feira</option>
                           <option value="5">Sexta-feira</option>
                           <option value="6">Sábado</option>
                      </Form.Select>
                      <Form.Control.Feedback type='invalid'>{errors.teacher_subject_teacher_weekday_4}</Form.Control.Feedback>
                    </Form.Group>
                  </div>  
                  <div className="ed-space">
                    <div className="ed-flex"></div>
                    <div className="ed-flex mt-4">
                      <Button className='btn-light text-dark' onClick={handleClose}> Cancelar </Button>
                      <Button className="btn btn-main ml-2" type="submit">{ props.title ? <Update/> : <Save/>  }   { props.title ? props.title : 'Salvar' } </Button>
                    </div>
                  </div>
                 </Box> 
               </>:
              
              <></>
              } 
             </Form>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    );
}

export default AsignSubjectsCanvas

const Title = styled.div`
    font-size:16px;
    margin-top:20px;
    font-weight:bolder;
`;


const Box = styled.div`
     .ed-space .col-lg-6{
         width:48% !important;
     }

 .btn.btn-light{
      border:1px solid rgb(230, 228, 228) !important; 
      background:#f8f9fa !important;
  }
  
`;

const ProfileBox = styled.div`
    padding:10px;
    min-height:100px;
    margin:20px 0px; 
    border-radius:6px;
    border:1px solid var(--ed-white-smoke);
    display:flex;
    align-items:center;
    position:relative;

 

    .avatarimage{
      background:var(--ed-white);
      border:3px solid var(--ed-white);
      box-shadow:var(--ed-shadow-df);
      border-radius:100%;
    }

   .ed-block{
     padding-left:15px;
     padding-top:5px;
     color:var(--ed-white);

    h1{
      margin:0px;
      font-size:18px;
    }

    span{
        font-size:13px;
        font-weight:500;
    }
   }
 

       .btn{
            padding:4px;
            width:40px;
            height:40px;
            border-radius:100%;
            display:flex;
            align-items:center;
            justify-content:center;
            cursor:pointer;
            background:var(--ed-dark);
            border:2px solid var(--ed-silver);
            box-shadow:var(--ed-shadow-df);

            svg{
               fill:var(--ed-dark);
               margin:0px;
               width:20px;
            }
       } 

`;