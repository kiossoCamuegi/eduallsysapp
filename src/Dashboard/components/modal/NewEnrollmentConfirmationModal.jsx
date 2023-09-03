import React, {useEffect, useState} from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Modal, Form, Button, Badge} from 'react-bootstrap'
import { InfoOutlined, Save } from '@mui/icons-material';
import DraggableModal from '../../../General/components/DraggableModal'; 
import axios from 'axios';
import Hoot from '../../../General/components/Hoot';
import ClearInputs from '../../../General/components/ClearInputs'; 
import {ClassDataOptions, GetAcademicYear_byclass, GetClassroom_byclass, GetCourse_byclass, GetPeriod_byclass, GetServicePrice, ServiceDataOptions, StudentsArray} from '../../../General/components/InstituteData';  
import CRValue from '../../../General/components/CRValue';
import {toast} from 'react-toastify';
import { Update } from '@material-ui/icons';
import SelectSearch from 'react-select-search'; 
import RefreshList from '../../../General/components/RefreshList';
import StudentDetailsMenu from '../elements/StudentDetailsMenu';


function NewEnrollmentConfirmationModal(props) {
    const [show, setShow] = useState(false);
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});  
    const [studentCode, SetStudentCode] = useState(null);
    const [Class, setClass] = useState(null); 
    const [serviceCode, setServiceCode] = useState(null); 

    const handleClose = () => setShow(false);

    const handleShow = () => { 
     setShow(true); 
       setTimeout(() => { 
        setClass(CRValue("#enrollment_class")); 
        setServiceCode(CRValue("#enrollment_service_code"));
     }, 1000);
     GET_DATA(); 
    };

    const INPUTS = {
         enrollment_student_code:props.studentCode ? props.studentCode : studentCode,   
         enrollment_class:CRValue("#enrollment_class"), 
         enrollment_service_code:CRValue("#enrollment_service_code") 
    }; 
 

    const FORMURL = [  
      Hoot()+"eduallstudentenrollmentconfirmationupdate/update/", 
      Hoot()+"eduallstudentenrollmentregister/post",  
      Hoot()+"eduallsinglestudentapi/get/",
      Hoot()+"eduallregisterstudentoldclass/post/"
    ];
 

    const GET_DATA = async()=>{
     /* if(props.update){
        const response = await axios.get(FORMURL[1]); 
        if(response.data !=null){
          if(response.data[0] != null){ 
            document.querySelector("#enrollment_class").value  = response.data[0].ed_enrollment_class; 
            document.querySelector("#enrollment_service_code").value = response.data[0].ed_enrollment_service_code;    
  
            INPUTS.enrollment_student_code = response.data[0].ed_enrollment_student_code  
            INPUTS.enrollment_class = response.data[0].ed_enrollment_class
            INPUTS.enrollment_service_code = response.data[0].ed_enrollment_service_code 
          }
        }
      }*/
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
   

    const validateForm = async()=>{
      const {enrollment_service_code, enrollment_class, enrollment_student_code} = form; 
      const NewErrors = {};

      if(INPUTS.enrollment_service_code ===  "" || INPUTS.enrollment_service_code ===  " "){
      if(!enrollment_service_code || enrollment_service_code === '') NewErrors.enrollment_service_code = 'Serviço invalido';  
      }else{if(!enrollment_service_code){setField("enrollment_service_code", INPUTS.enrollment_service_code);}} 

      if(INPUTS.enrollment_student_code ===  "" || INPUTS.enrollment_student_code ===  " " || INPUTS.enrollment_student_code ===  null){
        if(!enrollment_student_code || enrollment_student_code === '' || enrollment_student_code === null) NewErrors.enrollment_student_code = 'Selecione um estudante';  
        }else{if(!enrollment_student_code){setField("enrollment_student_code", INPUTS.enrollment_student_code);}} 


        if (props.confirmation) {
          if(INPUTS.enrollment_class ===  "" || INPUTS.enrollment_class ===  " "){
            if(!enrollment_class || enrollment_class === '') NewErrors.enrollment_class = 'Turma invalida';  
             }else{if(!enrollment_class){setField("enrollment_class", INPUTS.enrollment_class);}}     
        }
 

      NewErrors.enrollment_class = 'Turma invalida';  
      return NewErrors;
  }

  
  

    const FormSubmit = async(e)=>{  
      e.preventDefault();   
      const formErrors = validateForm(); 
      if(Object.keys(formErrors).length > 0){
           setErrors(formErrors);
           toast.error("Verifique todos os  campos");   
        }else{ 
          const SUBMIT_INPUTS =  {
            enrollment_class:INPUTS.enrollment_class,
            enrollment_service_code:INPUTS.enrollment_service_code,
            enrollment_student_code:INPUTS.enrollment_student_code
          };  

          let error = false;
          let StudentOldClass  =  null;
          if(props.confirmation){  
             if(studentCode !== null){ 
                let response = await  axios.get(FORMURL[2]+INPUTS.enrollment_student_code); 
                 if(response.data.length >= 1){
                      let ST = response.data[0]; 
                      if(ST.ed_student_class*1 !== INPUTS.enrollment_class*1){
                          StudentOldClass = ST.ed_student_class*1;
                      } 
                 } 
             } 
         } 
            

         const EnrollmentMainActions =  ()=>{
          axios.post(FORMURL[link], SUBMIT_INPUTS).then((e)=>{    
            if(props.studentCode){
                if(props.confirmation){toast.success("Confirmação da matrícula atualizada com sucesso !");}
                else{toast.success("Matrícula efetuada com sucesso !");}             
            } else {
                if(props.confirmation){toast.success("Confirmação da matrícula efectuada com sucesso !");}
                else{toast.success("Matrícula efetuada com sucesso !");}
            }  
            console.log(e.data);
            RefreshList();
            setForm({});
            ClearInputs();  
          }).catch((error)=>{
            toast.error("Lamentamos mas não foi  possivel efectuar esta ação");
           console.log(error); 
         });
         }

         let link =  props.confirmation ? 0 : 1; 
         if(error === false){    
               if(StudentOldClass !== null){ 
                axios.post(FORMURL[3], {old_class_student:StudentOldClass, old_class_code:INPUTS.enrollment_student_code}).then((e)=>{
                  axios.post(FORMURL[4], {old_class_student:StudentOldClass, old_class_code:INPUTS.enrollment_student_code}).then((e)=>{
                    EnrollmentMainActions();
                  }).catch((error)=>{
                    toast.error("Lamentamos mas não foi  possivel efectuar esta ação"); 
                 }); 
                }).catch((error)=>{
                  toast.error("Lamentamos mas não foi  possivel efectuar esta ação"); 
               });
               }else{ 
                EnrollmentMainActions();
           }  

        } 
    }




   }


 
      
  const GetStudentCode  = (e)=>{
      SetStudentCode(e)
      INPUTS.enrollment_student_code  = e;
      setField("enrollment_student_code", e); 
  }

    const handleInput = (e)=>{ 
       switch (e.target.id) { 
          case "enrollment_class":
            INPUTS.enrollment_class = e.target.value
            setField("enrollment_class", e.target.value);
            setClass(e.target.value); 
          break; 
          case "enrollment_service_code":
            INPUTS.enrollment_service_code = e.target.value
            setField("enrollment_service_code", e.target.value); 
            setServiceCode(e.target.value);
          break;  
          default:
       }
    }
 


  return (
    <div>  
      <div onClick={handleShow}>
            {
              props.toggle_btn ? props.toggle_btn :  
              <button className='btn btn-main'><AddCircleOutlineIcon/>{props.confirmation ? ' Confirmar Matrícula' : ' Efectuar Matrícula' }</button>  
            }
       </div>
      <Modal className='animate__animated animate__zoomInDown'  centered  size='lg' dialogAs={DraggableModal}  show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><h5>{ props.title ? props.title  : ' Efectuar ' }{props.confirmation ? 'Confirmação da matrícula' : ' matrícula'}</h5></Modal.Title>
        </Modal.Header>
        <Form onSubmit={FormSubmit}> 
        <Modal.Body className='scrollLimit'>
              {
                  props.studentCode ? <></> : 
                  <Form.Group className="mb-3">    
                  <div className="ed-space">
                      <div>
                        <Form.Label>Nome do estudante <span className='text-danger ml-2'>*</span></Form.Label>
                      </div>
                      <div className='ed-flex'> 
                          {studentCode !== null ? <StudentDetailsMenu student_id={studentCode}  toggle_btn={<div className='btn-pm-info'><InfoOutlined /></div>} /> : <></>}
                      </div>
                    </div>
                     <SelectSearch   onChange={(e)=>GetStudentCode(e)} options={StudentsArray()[0]}  value={studentCode} search={true} 
                      id="" placeholder="Selecione um aluno" />
                   <Form.Control.Feedback type='invalid'>{errors.enrollment_student_code}</Form.Control.Feedback>
                </Form.Group>   
              } 
             <>  
                <Form.Group className="mb-3">
                  <Form.Label>Turma<span className='text-danger ml-2'>*</span></Form.Label>
                  <Form.Select  onChange={handleInput} className={!!errors.enrollment_class && 'is-invalid'} value={form.enrollment_class} isInvalid={!!errors.enrollment_class}
                  id="enrollment_class">
                      <ClassDataOptions/>
                  </Form.Select>
                  <Form.Control.Feedback type='invalid'>{errors.enrollment_class}</Form.Control.Feedback>
                </Form.Group>   
                { 
                  Class !== null && Class >= 0 ?
                      <>
                      {
                      <div className="mb-3 ed-wrap">
                          <div className="badge bg-main-light mr-2">
                              Ano lectivo : <GetAcademicYear_byclass ID={Class}/>
                          </div>
                          <div className="badge bg-main-light mr-2">
                              Sala : <GetClassroom_byclass ID={Class}/>
                          </div>
                          <div className="badge bg-main-light mr-2">
                              Curso : <GetCourse_byclass ID={Class}/>
                          </div>
                          <div className="badge bg-main-light">
                              Periodo : <GetPeriod_byclass ID={Class}/>
                          </div> 
                        </div>
                      }
                    </>
                    : 
                    <></>  
                  }   
             </> 

            <Form.Group className="mb-3">
              <Form.Label>Selecionar Pagamento do Serviço<span className='text-danger ml-2'>*</span></Form.Label>
              <Form.Select  onChange={handleInput} className={!!errors.enrollment_service_code && 'is-invalid'} value={form.enrollment_service_code} isInvalid={!!errors.enrollment_service_code}
               id="enrollment_service_code">
                  <ServiceDataOptions/>
              </Form.Select>
              <Form.Control.Feedback type='invalid'>{errors.enrollment_service_code}</Form.Control.Feedback>
              <div>{serviceCode === null ?  <div></div> : <div className='mt-2'><Badge className='bg-main-light'><small>
              <div className="ed-flex">Valor do serviço  : <div className="ml-1"> <GetServicePrice ID={serviceCode} /></div></div></small></Badge></div>}</div>
            </Form.Group> 

        </Modal.Body>
        <Modal.Footer>
          <div className="ed-space">
            <div></div>
            <div className="ed-flex">
            <Button className='bg-light text-dark' onClick={handleClose}> Cancelar </Button>
             <Button className="btn btn-main ml-2" type="submit">{ props.update ? <Update/> : <Save/>  }   { props.update ? 'Atualizar' : 'Salvar' } </Button>
            </div>
          </div>
        </Modal.Footer>
        </Form>
      </Modal>
    </div>
  )
}

export default NewEnrollmentConfirmationModal