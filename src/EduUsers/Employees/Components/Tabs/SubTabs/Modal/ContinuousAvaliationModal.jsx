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
import {toast} from 'react-toastify';
import { Update } from '@material-ui/icons';
import SelectSearch from 'react-select-search';
import { ClassDataOptions, GetClasstitle_byclass, GetSubject, GetTime, StudentsArray } from '../../../../../../General/components/InstituteData';
import StudentDetailsMenu from '../../../../../../Dashboard/components/elements/StudentDetailsMenu';


function ContinuousAvaliationModal(props) {
    const [show, setShow] = useState(false);
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({}); 
    const [studentCode, setStudentCode] = useState(null);  
    const [StudentsData, setStudentsData] = useState([]);
  
      const handleClose = () => setShow(false); 
      const handleShow = () => { 
         setShow(true);  
         GET_DATA();
      };
   
   
      const INPUTS = { 
          cn_avaliation_classSubject:CRValue("#cn_avaliation_classSubject").split("|")[2],  
          cn_avaliation_score:CRValue("#cn_avaliation_score"),  
          cn_avaliation_date:CRValue("#cn_avaliation_Date"),
          cn_avaliation_studentCode:studentCode,  
          cn_avaliation_description: document.querySelectorAll(".modal form textarea").length >=1 ?  
          JSON.stringify(document.querySelector(".modal form textarea").value)  : null
      }; 
  
      const FORMURL = [
        Hoot()+"eduallregisterctnavlpoint/post",
        Hoot()+"eduallattendancecheckpaidmonth/", 
        props.get ? props.get : '',
        props.url ? props.url : '',
        Hoot()+"eduallgetstudentsbyclass/"
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
  
  
    const GetStudentsByClass= async(e)=>{
      setStudentsData([]);
      const response = await axios.get(FORMURL[4]+e); 
      const students = []; 
      if(response.data !== null){
          response.data.map((item, index)=>{
            students.push({name:item.ed_student_name, value:item.ed_student_id});
          }) 
        } 
      setStudentsData(students);
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
        const { cn_avaliation_classSubject,   cn_avaliation_score, cn_avaliation_Date } = form; 
        const NewErrors = {};
         
        if(INPUTS.cn_avaliation_classSubject ===  "" || INPUTS.cn_avaliation_classSubject === " "){
        if(!cn_avaliation_classSubject || cn_avaliation_classSubject === '') NewErrors.cn_avaliation_classSubject = 'Selecione a turma';  
        }else{if(!cn_avaliation_classSubject){setField("cn_avaliation_classSubject", INPUTS.cn_avaliation_classSubject);}} 
                 
        if(INPUTS.cn_avaliation_score ===  "" || INPUTS.cn_avaliation_score === " "){
        if(!cn_avaliation_score || cn_avaliation_score === '') NewErrors.cn_avaliation_score = 'adicione pontos';  
        }else{if(!cn_avaliation_score){setField("cn_avaliation_score", INPUTS.cn_avaliation_score);}} 
  
        if(studentCode === null) NewErrors.cn_avaliation_code = 'Selecione um estudante'; 
           
        if(INPUTS.cn_avaliation_Date ===  "" || INPUTS.cn_avaliation_Date === " "){
          if(!cn_avaliation_Date || cn_avaliation_Date === '') NewErrors.cn_avaliation_Date = 'Selecione uma data valida';  
          }else{if(!cn_avaliation_Date){setField("cn_avaliation_Date", INPUTS.cn_avaliation_Date);}} 
          
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
                cn_avaliation_score:INPUTS.cn_avaliation_score, 
                cn_avaliation_subClass:INPUTS.cn_avaliation_classSubject,
                cn_avaliation_studentCode:INPUTS.cn_avaliation_studentCode,
                cn_avaliation_description:INPUTS.cn_avaliation_description,
                cn_avaliation_date:INPUTS.cn_avaliation_date,
              };


              console.clear()
              console.log(SUBMIT_INPUTS);
    
             if(!props.update){ 
              console.log(SUBMIT_INPUTS);
              axios.post(FORMURL[0], SUBMIT_INPUTS).then((e)=>{  
                  toast.success("Pontuação atribuida com sucesso !");
                  
  
                  console.log(e.data);
  
                  /*
                    setForm({});
                    ClearInputs(); 
                 */
  
            }).catch((error)=>{toast.error("Lamentamos mas não foi  possivel executar esta ação")});   
             } else {
               axios.put(FORMURL[2] , SUBMIT_INPUTS)
               .then(()=>{  
                 toast.success("Pontuação atualizada com sucesso !");
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
            case "cn_avaliation_classSubject":   
                GetStudentsByClass(e.target.value.split("|")[0]*1);  
                INPUTS.cn_avaliation_classSubject = e.target.value.split("|")[2];  
                setField("cn_avaliation_classSubject", e.target.value.split("|")[2]);
            break;    
              case "cn_avaliation_score":
                setField("cn_avaliation_score", e.target.value);
                INPUTS.cn_avaliation_score = e.target.value
            break;    
            case "cn_avaliation_Date":
              setField("cn_avaliation_Date", e.target.value);
              INPUTS.cn_avaliation_Date = e.target.value
            break;   
         }  
      }
  
    return (
      <div>
        <div onClick={handleShow}>
           {props.toggle_btn ? props.toggle_btn :  <button className="btn bg-main"><AddCircleOutlineIcon/> Atributos e pontos</button>}
        </div>
        <Modal size='md'  className='animate__animated animate__zoomInDown' centered   dialogAs={DraggableModal}  show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title><h5>{ props.title ? props.title : 'Atributos ' } de pontos</h5></Modal.Title>
          </Modal.Header>
          <Form onSubmit={FormSubmit}>
          <Modal.Body className='scrollLimit'> 
               <div>
                  <Form.Group className="mb-3">
                    <Form.Label>Turma - disciplina <span className='text-danger ml-2'>*</span></Form.Label>
                    <Form.Select text="number" onChange={handleInput} className={!!errors.cn_avaliation_classSubject && 'is-invalid'} value={form.cn_avaliation_classSubject} 
                    isInvalid={!!errors.cn_avaliation_classSubject} id="cn_avaliation_classSubject">
                        {props.data.map((item, index)=>{
                            return(<option value={item.ed_tch_subject_class + "|"+ item.ed_tch_subject_code+"|"+item.ed_tch_subject_id}> 
                                  <GetClasstitle_byclass ID={item.ed_tch_subject_class} /> 
                                  ( <GetSubject ID={item.ed_tch_subject_code} /> )
                              </option>)
                        })} 
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>{errors.cn_avaliation_classSubject}</Form.Control.Feedback>
                  </Form.Group>  
              </div>
            {
              props.update ? <></> :  
                    <>
                       {StudentsData.length >= 1 ?
                        <>
                        <Form.Group className="mb-3">
                        <div className="ed-space">
                          <div>
                            <Form.Label>Nome do estudante <span className='text-danger ml-2'>*</span></Form.Label>
                          </div>
                          <div className='ed-flex'> 
                              {studentCode !== null ? <StudentDetailsMenu student_id={studentCode}  toggle_btn={<div className='btn-pm-info'><InfoOutlined/></div>} /> : <></>}
                          </div>
                        </div>
                        <div className={`select-search-item  ${errors.cn_avaliation_code ? 'error': ''}`}>
                          <SelectSearch  onChange={(e)=>GetStudentCode(e)}  value={studentCode} options={StudentsData} search={true} 
                            placeholder="Selecione um aluno" />
                        </div>
                        <small className="text-danger">{errors.cn_avaliation_code}</small>
                      </Form.Group>   
                        </>  : 
                        <></> 
                       }
                    </> 
              }  
              <div>
                  <Form.Group className="mb-3">
                    <Form.Label>Pontos <span className='text-danger ml-2'>*</span></Form.Label>
                    <Form.Control text="number" onChange={handleInput} className={!!errors.cn_avaliation_score && 'is-invalid'} value={form.cn_avaliation_score ? form.cn_avaliation_score : 0} 
                    isInvalid={!!errors.cn_avaliation_score} id="cn_avaliation_score"/> 
                    <Form.Control.Feedback type='invalid'>{errors.cn_avaliation_score}</Form.Control.Feedback>
                  </Form.Group>  
              </div>    
              <div>
                  <Form.Group className="mb-3">
                    <Form.Label>Data <span className='text-danger ml-2'>*</span></Form.Label>
                    <Form.Control type="date" onChange={handleInput} className={!!errors.cn_avaliation_Date && 'is-invalid'} value={form.cn_avaliation_Date} 
                    isInvalid={!!errors.cn_avaliation_Date} id="cn_avaliation_Date"/> 
                    <Form.Control.Feedback type='invalid'>{errors.cn_avaliation_Date}</Form.Control.Feedback>
                  </Form.Group>  
              </div>      
              <div>
                 <Form.Group className="mb-3">
                    <Form.Label>Descrição</Form.Label>
                    <RichTextEditor   />
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

export default ContinuousAvaliationModal
