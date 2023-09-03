import React, {useEffect, useState} from 'react'
import styled from 'styled-components' 
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Modal, Form, Button, Badge} from 'react-bootstrap'
import { InfoOutlined, Save } from '@mui/icons-material';
import DraggableModal from '../../../../../../General/components/DraggableModal';
import axios from 'axios';
import Hoot from  '../../../../../../General/components/Hoot'; 
import ClearInputs from '../../../../../../General/components/ClearInputs'; 
import CRValue from  '../../../../../../General/components/CRValue';
import { RichTextEditor } from '../../../../../../General/components/RichTextEditor'; 
import FileUpload from '../../../../../../General/components/FileUpload';
import {toast} from 'react-toastify';
import { Update } from '@material-ui/icons';
import SelectSearch from 'react-select-search';
import { ClassDataOptions, GetClasstitle_byclass, GetSubject, GetTime, StudentsArray } from '../../../../../../General/components/InstituteData';
import StudentDetailsMenu from '../../../../../../Dashboard/components/elements/StudentDetailsMenu';
import { MultiSelect } from 'react-multi-select-component';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import SmallLoader from '../../../../../../General/components/SmallLoader';
import RefreshList from '../../../../../../General/components/RefreshList';

function AttendanceModal(props) {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({}); 
  const [studentCode, setStudentCode] = useState([]);  
  const [StudentsData, setStudentsData] = useState([]);
  const [StudentList, setStudentList] = useState([]);
  const [NotSelectedStatus, setNotSelectedStatus] = useState(null);
  const [LoadingStudents, setLoadingStudents] = useState(false);
  const [CurrentStatus, setCurrentStatus] = useState(null);
  const [DT, SetDT] = useState([]);
  const [TM, SetTM] = useState([]);

    const handleClose = () => setShow(false);

    const handleShow = () => { 
       setShow(true); 
       GET_DATA(); 
       console.log(props);
    };
 
 
     
    const INPUTS = { 
        student_attendance_classSubject:CRValue("#student_attendance_classSubject").split("|")[2],  
        student_attendance_subject:CRValue("#student_attendance_classSubject").split("|")[1], 
        student_attendance_class:CRValue("#student_attendance_classSubject").split("|")[0], 
        student_attendance_time:CRValue("#student_attendance_time"), 
        student_attendance_status:CRValue("#student_attendance_status"), 
        student_attendance_Date:CRValue("#student_attendance_Date"),
        student_attendance_studentCode:studentCode,  
        student_attendance_status_notselected:NotSelectedStatus,
    }; 

    const FORMURL = [
      Hoot()+"eduallstudentattendanceregister/post", 
      props.get ? props.get : '',
      props.url ? props.url : '',
      Hoot()+"eduallgetstudentsbyclass/"
  ]; 
  
 

    const GET_DATA = async()=>{
     if(props.update){
      try {
        console.log(FORMURL[1]);
        const response = await axios.get(FORMURL[1]);  
        console.log(response.data); 
        if(response.data.length >= 1){
           setCurrentStatus(response.data[0].ed_student_attd_status);
           setField("student_attendance_time", response.data[0].ed_student_attd_timing);
           setField("student_attendance_status", response.data[0].ed_student_attd_status);
           setField("student_attendance_Date",  response.data[0].ed_student_attd_date);

        } 
      } catch (error) {
        
      }
    } 
  }


  const GetStudentsByClass= async(e)=>{ 
    setStudentsData([]);
    setStudentCode([]);
    setStudentList([]);
    setLoadingStudents(true);
   try {
     const response = await axios.get(FORMURL[4]+e); 
     const students = []; 
     const ListOfStudents = [];
     if(response.data !== null){
         response.data.map((item, index)=>{
           students.push({label:item.ed_student_name, value:item.ed_student_id});
           ListOfStudents.push(item.ed_student_id);
         }) 
       }  
     setTimeout(() => {
       setStudentsData(students); 
       setStudentList(ListOfStudents);
       setLoadingStudents(false);
     }, 500);
     console.log("************************")
     console.log(students);
     console.log("*************************");
   } catch (error) {
    setLoadingStudents(false);
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
      const { student_attendance_classSubject, student_attendance_status, student_attendance_status_notselected, student_attendance_time, student_attendance_Date } = form; 
      const NewErrors = {};
 
               
      if(INPUTS.student_attendance_time ===  "" || INPUTS.student_attendance_time === " "){
      if(!student_attendance_time || student_attendance_time === '') NewErrors.student_attendance_time = 'Selecione um horário';  
      }else{if(!student_attendance_time){setField("student_attendance_time", INPUTS.student_attendance_time);}} 

      
      if(INPUTS.student_attendance_status ===  "" || INPUTS.student_attendance_status === " "){
      if(!student_attendance_status || student_attendance_status === '') NewErrors.student_attendance_status = 'Selecione o estado de presença dos alunos';  
      }else{if(!student_attendance_status){setField("student_attendance_status", INPUTS.student_attendance_status);}} 
         
         
      if(INPUTS.student_attendance_Date ===  "" || INPUTS.student_attendance_Date === " "){
      if(!student_attendance_Date || student_attendance_Date === '') NewErrors.student_attendance_Date = 'Selecione uma data valida';  
      }else{if(!student_attendance_Date){setField("student_attendance_Date", INPUTS.student_attendance_Date);}} 

   //student_attendance_status_notselected

    if(!props.update){
      if(((studentCode.length !== StudentsData.length) && studentCode.length > 0 && StudentsData.length > 0)){
        if(INPUTS.student_attendance_status_notselected ===  "" || INPUTS.student_attendance_status_notselected === " "){
        if(!student_attendance_status_notselected || student_attendance_status_notselected === '') NewErrors.student_attendance_status_notselected = 'Selecione o estado de presença dos alunos';  
        }else{if(!student_attendance_status_notselected){setField("student_attendance_status_notselected", INPUTS.student_attendance_status_notselected);}}
     }
            
     if(INPUTS.student_attendance_classSubject ===  "" || INPUTS.student_attendance_classSubject === " "){
      if(!student_attendance_classSubject || student_attendance_classSubject === '') NewErrors.student_attendance_classSubject = 'Selecione a turma';  
      }else{if(!student_attendance_classSubject){setField("student_attendance_classSubject", INPUTS.student_attendance_classSubject);}} 
  
      if(studentCode.length <= 0) NewErrors.student_attendance_code = 'Selecione os estudantes';    
   
    }


        
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
                student_attendance_class:INPUTS.student_attendance_class,
                student_attendance_time:INPUTS.student_attendance_time,
                student_attendance_status:INPUTS.student_attendance_status,
                student_attendance_subject:INPUTS.student_attendance_subject,
                student_attendance_subClass:INPUTS.student_attendance_classSubject,
                student_attendance_code:studentCode,
                student_attendance_date:INPUTS.student_attendance_Date
            };
  
           if(!props.update){ 
            console.log(SUBMIT_INPUTS);
            
      

           
          /*** Para todos os que não foram selecionados **/
          const NotSelectedStudents = [];
          const Studentscode = [];

          for(let i = 0; i < INPUTS.student_attendance_studentCode.length; i++) { 
              Studentscode.push(INPUTS.student_attendance_studentCode[i].value*1); 
          }

          for(let i = 0; i < StudentList.length; i++) {
            if(!Studentscode.includes(StudentList[i])){
                NotSelectedStudents.push(StudentList[i]);
            }
         } 
 
         
           /*** para todos os que foram selecionados */
           Studentscode.map((student, index)=>{
            SUBMIT_INPUTS.student_attendance_code = student; 
            axios.post(FORMURL[0], SUBMIT_INPUTS).then((e)=>{  
              if(index ===  (Studentscode.length-1)) toast.success("Presença registrada com sucesso !")
              console.log(e.data);
            }).catch((error)=>{toast.error("Erro ao marcar presença ao estudante Nº :"+student)});  
          });


          /** para todos  os que não foram selecionados */
         NotSelectedStudents.map((student, index)=>{
            SUBMIT_INPUTS.student_attendance_code = student; 
            SUBMIT_INPUTS.student_attendance_status =  INPUTS.student_attendance_status_notselected;
            axios.post(FORMURL[0], SUBMIT_INPUTS).then((e)=>{  
              if(index ===  (NotSelectedStudents.length-1)) toast.success("Presença registrada com sucesso !")
              console.log(e.data);
            }).catch((error)=>{toast.error("Erro ao marcar presença ao estudante Nº :"+student)});  
          });

             
          setStudentsData([]);
          setStudentCode([]);
          setStudentList([]);
          setForm({});
          ClearInputs();
          RefreshList(`.el-refresh-list`);


           } else {

            console.table(INPUTS);

             axios.put(FORMURL[2] , SUBMIT_INPUTS)
             .then(()=>{  
               toast.success("Presença atualizada com sucesso !");
               setStudentsData([]);
               setStudentCode([]);
               setStudentList([]);
               setForm({});
               ClearInputs();
               RefreshList(`.el-refresh-list`);
             }).catch((error)=>{toast.error("Lamentamos mas não foi  possivel executar esta ação")}); 
         
          
          
            } 
         }         
    };
 
    
 
    const GetStudentCode  = (e)=>{    
      setStudentCode(e);   
      var row = "";
      for (let i = 0; i < e.length; i++) {
            row += ","+e[i].value;
      } 
      //SetMonths(row); 
    }
 
    const handleInput = (e)=>{    
       if(e.target.className.split(" ")[0].toLowerCase() === "PrivateSwitchBase-input".toLowerCase()){
        setField("student_attendance_status_notselected", e.target.value);
        setNotSelectedStatus(e.target.value);
       }

       switch (e.target.id) {  
          case "student_attendance_classSubject":  
            GetClassAndSubject(e);
          break;     
          case "student_attendance_time":
              setField("student_attendance_time", e.target.value);
              INPUTS.student_attendance_time = e.target.value
          break;   
          case "student_attendance_status":
            setField("student_attendance_status", e.target.value);
            INPUTS.student_attendance_status = e.target.value
          break;   
          case "student_attendance_Date":
            setField("student_attendance_Date", e.target.value);
            INPUTS.student_attendance_Date = e.target.value
          break;   
          default:
       }   
    }






    const GetClassAndSubject = (e)=>{
      setField("student_attendance_class", e.target.value.split("|")[0]);
      INPUTS.student_attendance_class = e.target.value.split("|")[0]; 
      
      setField("student_attendance_subject", e.target.value.split("|")[1]);
      INPUTS.student_attendance_subject = e.target.value.split("|")[1]; 

      setField("student_attendance_classSubject", e.target.value);
      INPUTS.student_attendance_classSubject = e.target.value;

      GetStudentsByClass(e.target.value.split("|")[0]*1); 

      INPUTS.student_attendance_tch_subClass = e.target.value.split("|")[2];  
      setField("student_attendance_tch_subClass", e.target.value.split("|")[2]);
    }

     
   useEffect(()=>{    
    SetDT(typeof props.data === 'object' ? props.data : []); 
    SetTM(typeof props.timings === 'object' ? props.timings : []);
    setTimeout(() => {
      GetStudentsByClass(CRValue("#student_attendance_classSub").split("|")[0]*1); 
    }, 500);  
 },[]);
 


  return (
    <div>
      <div onClick={handleShow}>
         {props.toggle_btn ? props.toggle_btn :  <button className="btn bg-main"><AddCircleOutlineIcon/> Marcar presença</button>}
      </div>
      <Modal  size="lg" className='animate__animated animate__zoomInDown' centered   dialogAs={DraggableModal}  show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><h5>{ props.title ? props.title : 'Controle de' } presença</h5></Modal.Title>
        </Modal.Header>
        <Form onSubmit={FormSubmit}>
        <Modal.Body className='scrollLimit'> 
          {props.update ? <></> :
             <div>
             <Form.Group className="mb-3">
               <Form.Label>Turma - disciplina <span className='text-danger ml-2'>*</span></Form.Label> 
               <div className="ed-flex"> 
               <Form.Select text="number" onChange={handleInput} className={!!errors.student_attendance_classSubject && 'is-invalid'} value={form.student_attendance_classSubject} 
               isInvalid={!!errors.student_attendance_classSubject} id="student_attendance_classSubject">
                   {props.data.map((item, index)=>{
                       return(<option value={item.ed_tch_subject_class + "|"+ item.ed_tch_subject_code+"|"+item.ed_tch_subject_id}> 
                             <GetClasstitle_byclass ID={item.ed_tch_subject_class} /> 
                             ( <GetSubject ID={item.ed_tch_subject_code} /> )
                         </option>)
                   })} 
               </Form.Select>
                 {LoadingStudents ? <div className='ed-flex'><div className="pd-2"></div> 
                   <SmallLoader   /> 
                 </div> : <></>}
                </div> 
               <Form.Control.Feedback type='invalid'>{errors.student_attendance_classSubject}</Form.Control.Feedback>
             </Form.Group>  
         </div>  
          }
          {
            props.update ? <></> :  
                  <>
                     {StudentsData.length >= 1 ?
                      <>
                      <Form.Group className="mb-3"> 
                        <div>
                          <Form.Label>Nome do estudante <span className='text-danger ml-2'>*</span></Form.Label>
                        </div>   
                      <MultiSelect 
                            options={StudentsData}
                            value={studentCode}
                            className={errors.feepayment_months ? 'border-red' : ''}
                            onChange={GetStudentCode}
                            labelledBy='select'
                        />  
                      <small className="text-danger">{errors.student_attendance_code}</small>
                    </Form.Group>   
                      </>  : 
                      <></> 
                     }
                  </> 
             }   
            <div>
                <Form.Group className="mb-3">
                  <Form.Label>{props.update ? "Marcar o aluno selecionado como" : "Marcar os alunos selecionados como" } <span className='text-danger ml-2'>*</span></Form.Label>
                  <Form.Select text="number" onChange={handleInput} className={!!errors.student_attendance_status && 'is-invalid'} value={form.student_attendance_status} 
                  isInvalid={!!errors.student_attendance_status} id="student_attendance_status">
                        <option value="0">Presente</option>
                        <option value="1">Ausente</option>
                        <option value="2">Atrasado</option>
                  </Form.Select>
                  <Form.Control.Feedback type='invalid'>{errors.student_attendance_status}</Form.Control.Feedback>
                </Form.Group>  
            </div>   
            {((studentCode.length !== StudentsData.length) && studentCode.length > 0 && StudentsData.length > 0)  ?
            <>
              <FormControl id="student_attendance_status_notselected">
                <div className="ed-block mb-3">
                    <FormLabel className='text-main-light' id="student_attendance_status_notselected">Marcar os alunos não selecionados como :</FormLabel>
                      <RadioGroup  aria-labelledby="student_attendance_status_notselected1" defaultValue="0"
                       name="radio-buttons-group" id="student_attendance_status_notselected1" onChange={handleInput}  >
                      <div className="mt-2 ed-flex">
                          <FormControlLabel value="0" control={<Radio />} label="Presente" />
                          <FormControlLabel value="1" control={<Radio />} label="Ausente" />
                          <FormControlLabel value="2" control={<Radio />} label="Atrasado" />
                      </div>
                      </RadioGroup>
                      <Form.Control.Feedback type='invalid'>{errors.student_attendance_status_notselected}</Form.Control.Feedback>
                  </div>
              </FormControl>
            </>
          : <></>} 
            <div>
                <Form.Group className="mb-3">
                  <Form.Label>Horário <span className='text-danger ml-2'>*</span></Form.Label>
                   <Form.Select   onChange={handleInput} className={!!errors.student_attendance_time && 'is-invalid'} value={form.student_attendance_time} 
                    isInvalid={!!errors.student_attendance_time} id="student_attendance_time">
                       {props.timings.map((item, index)=>{
                          return(
                          <option value={item.ed_tch_timing_code}> 
                                <GetTime ID={item.ed_tch_timing_code}/> 
                            </option>)
                          })
                        }
                  </Form.Select>
                  <Form.Control.Feedback type='invalid'>{errors.student_attendance_time}</Form.Control.Feedback>
                </Form.Group>  
            </div>   
            <div>
                <Form.Group className="mb-3">
                  <Form.Label>Data <span className='text-danger ml-2'>*</span></Form.Label>
                   <Form.Control type='date' onChange={handleInput} className={!!errors.student_attendance_Date && 'is-invalid'} value={form.student_attendance_Date} 
                    isInvalid={!!errors.student_attendance_Date} id="student_attendance_Date"/> 
                  <Form.Control.Feedback type='invalid'>{errors.student_attendance_Date}</Form.Control.Feedback>
                </Form.Group>  
            </div>   
        </Modal.Body>
        <Modal.Footer>
          <div className="ed-space"> 
            <div></div>
            <div className="ed-flex">
                <Button className='bg-light text-dark' onClick={handleClose}> Cancelar </Button>
                <Button className="btn btn-main ml-2" type="submit">{ props.title ? <Update/> : <Save/>  }   { props.title ? props.title : 'Salvar' } </Button>
            </div>
          </div>
        </Modal.Footer>
        </Form>
      </Modal>
    </div>
  )
}

export default AttendanceModal
