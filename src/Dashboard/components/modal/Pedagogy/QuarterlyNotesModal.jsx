import React, {useEffect, useState} from 'react'
import styled from 'styled-components' 
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Modal, Form, Button, Badge} from 'react-bootstrap'
import { InfoOutlined, Save } from '@mui/icons-material';
import DraggableModal from '../../../../General/components/DraggableModal'; 
import axios from 'axios';
import Hoot from '../../../../General/components/Hoot'; 
import ClearInputs from '../../../../General/components/ClearInputs';  
import CRValue from '../../../../General/components/CRValue';
import {toast} from 'react-toastify';
import { Update } from '@material-ui/icons';
import { SubjectDataOptions, StudentsArrayByClass, ClassDataOptions, GetClasstitle_byclass, GetSubject} from '../../../../General/components/InstituteData';
import SelectSearch from 'react-select-search';
import StudentDetailsMenu from '../../elements/StudentDetailsMenu';
import ReduceTextLength from '../../../../General/components/ReduceTextLength';
import FloorNumber from '../../../../General/components/FloorNumber';
import RefreshList from '../../../../General/components/RefreshList';
import SmallLoader from '../../../../General/components/SmallLoader';
import Loader from '../../../../General/components/Loader';


const DATA_URL = [
    Hoot()+'eduallsingleclassapi/get/',
    Hoot()+'eduallsingleacademiclevelsapi/get/',
];


function QuarterlyNotesModal(props) {
    const [show, setShow] = useState(false);
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});  
    const [studentCode, setStudentCode] = useState(null);    
    const [CurrentClass, SetCurrentClass] = useState(null);
    const [CurrentSubject, SetCurrentSubject] = useState(null);
    const [CurrentQuarter, SetCurrentQuarter] = useState(null);
    const [Total, SetTotal] = useState(0);
    const [StudentsData, setStudentsData] = useState([]);
    const [MaxValue, setMaxValue] = useState(0); 
    const [data, setData] = useState([]); 
    const [Founded , setFounded]  = useState(false);
    const [LoadingStudents, setLoadingStudents] = useState(false);

    const handleClose = () => setShow(false); 
    const handleShow = () => {
       setShow(true); 
      setTimeout(() => {
         GET_DATA();
      }, 1000);
    };
 
     
    const INPUTS = { 
        quarterly_note_subject:props.update ? CurrentSubject : (CRValue("#quarterly_note_class").split("|").length >= 2 ? CRValue("#quarterly_note_class").split("|")[1] : CRValue("#quarterly_note_subject")),    
        quarterly_note_class:props.update ? CurrentClass : (CRValue("#quarterly_note_class").split("|").length >= 2 ? CRValue("#quarterly_note_class").split("|")[0] : CRValue("#quarterly_note_class")) , 
        quarterly_note_student_code:studentCode,   
        quarterly_note_mac:CRValue("#quarterly_note_mac")*1, 
        quarterly_note_npp:CRValue("#quarterly_note_npp")*1,
        quarterly_note_npt:CRValue("#quarterly_note_npt")*1, 
        quarterly_note_quarter:props.update ? CurrentQuarter : (CRValue("#quarterly_note_quarter1")*1),   
    }; 




    const FORMURL = [
      Hoot()+"eduallquarterlynotesregister/post",
      Hoot()+"eduallsinglequarterlynotebyqrtsubstdqrttypeclass/get/", 
      props.get ? props.get : '',
      props.url ? props.url : '',
      Hoot()+"eduallgetstudentsbyclass/"
  ]; 
  
 

    const GET_DATA = async()=>{
     if(props.update){ 
      try {
        const response = await axios.get(FORMURL[2]); 
        setMaxValue(props.maxvalue);
        if(response.data.length >= 1){
            setFounded(true); 
              console.log(response.data);  
              
            SetCurrentClass(response.data[0].ed_quarter_note_class );
            INPUTS.quarterly_note_class = response.data[0].ed_quarter_note_class 
            setField("quarterly_note_class", response.data[0].ed_quarter_note_class );

            setStudentCode(response.data[0].ed_quarter_note_studentcode);

            setField("quarterly_note_subject", response.data[0].ed_quarter_note_subject);
            INPUTS.quarterly_note_subject = response.data[0].ed_quarter_note_subject;
            SetCurrentSubject(response.data[0].ed_quarter_note_subject);

            setField("quarterly_note_quarter", response.data[0].ed_quarter_note_quarter);
            INPUTS.quarterly_note_quarter = response.data[0].ed_quarter_note_quarter;
            SetCurrentQuarter(response.data[0].ed_quarter_note_quarter);

            setField("quarterly_note_mac", response.data[0].ed_quarter_note_mac);
            INPUTS.quarterly_note_mac = response.data[0].ed_quarter_note_mac;

            setField("quarterly_note_npp", response.data[0].ed_quarter_note_npp);
            INPUTS.quarterly_note_npp = response.data[0].ed_quarter_note_npp;

            setField("quarterly_note_npt", response.data[0].ed_quarter_note_npt);
            INPUTS.quarterly_note_npt = response.data[0].ed_quarter_note_npt;  
            
            SetTotal(FloorNumber(((
              response.data[0].ed_quarter_note_mac*1 + 
              response.data[0].ed_quarter_note_npp*1 +
              response.data[0].ed_quarter_note_npt*1 ) / 3))  
            );
       
        }
      } catch(error){
        
      }
     }
  }


  useEffect(()=>{
     setTimeout(() => {
      let vl = CRValue("#quarterly_note_class").split("|").length >= 2 ? CRValue("#quarterly_note_class").split("|")[0] : CRValue("#quarterly_note_class");
      if(vl*1 > 0){
        GetStudentsByClass(vl);
      }
     }, 500);
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

  
  
   
  let FormValidateErrors = [];
    const validateForm = ()=>{ 
      let NewErrors = {}; 
      const GetError = async()=>{ 
        const {quarterly_note_class, quarterly_note_student_code, quarterly_note_subject, quarterly_note_quarter, quarterly_note_mac, quarterly_note_npp} = form; 
        
        if(INPUTS.quarterly_note_class ===  "" || INPUTS.quarterly_note_class ===  " "){
        if(!quarterly_note_class || quarterly_note_class === '') NewErrors.quarterly_note_class = 'Classe invalida';  
        }else{if(!quarterly_note_class){setField("quarterly_note_class", INPUTS.quarterly_note_class);}} 
  
        if(INPUTS.quarterly_note_student_code ===  "" || INPUTS.quarterly_note_student_code ===  " "){
        if(!quarterly_note_student_code || quarterly_note_student_code === '') NewErrors.quarterly_note_student_code = 'Estudante invalido';  
        }else{if(!quarterly_note_student_code){setField("quarterly_note_student_code", INPUTS.quarterly_note_student_code);}} 
  
        if(INPUTS.quarterly_note_quarter ===  "" || INPUTS.quarterly_note_quarter ===  " "){
        if(!quarterly_note_quarter || quarterly_note_quarter === '') NewErrors.quarterly_note_quarter = 'Trimestre  invalido';  
        }else{if(!quarterly_note_quarter){setField("quarterly_note_quarter", INPUTS.quarterly_note_quarter);}} 
  
        if(INPUTS.quarterly_note_subject ===  "" || INPUTS.quarterly_note_subject ===  " "){
        if(!quarterly_note_subject || quarterly_note_subject === '') NewErrors.quarterly_note_subject = 'Disciplina  invalida';  
        }else{if(!quarterly_note_subject){setField("quarterly_note_subject", INPUTS.quarterly_note_subject);}} 
  
        if(INPUTS.quarterly_note_mac ===  "" || INPUTS.quarterly_note_mac ===  " "){
        if(!quarterly_note_mac || quarterly_note_mac === '') NewErrors.quarterly_note_mac = 'MAC invalido';  
        }else{if(!quarterly_note_mac){setField("quarterly_note_mac", INPUTS.quarterly_note_mac);}}
         
        if(INPUTS.quarterly_note_npp ===  "" || INPUTS.quarterly_note_npp ===  " "){
        if(!quarterly_note_npp || quarterly_note_npp === '') NewErrors.quarterly_note_npp = 'NPP   invalido';  
        }else{if(!quarterly_note_npp){setField("quarterly_note_npp", INPUTS.quarterly_note_npp);}} 
  
      if(props.data){
        try {
        if(!props.update){
          const response = await axios.get(FORMURL[1]+`${INPUTS.quarterly_note_subject}`+ 
          ","+`${INPUTS.quarterly_note_student_code}`+","+`${INPUTS.quarterly_note_quarter}`+","+`${INPUTS.quarterly_note_class}`); 
          if(response.data.length >= 1) {  
              NewErrors.quarterly_note_student_code = 'A nota deste estudante já foi lançada';
          };  
        } 
        } catch (error) {
          NewErrors.quarterly_note_student_code = 'Lamentamos , algo não deu certo';
        }
      }
  
        
      }
      GetError();  
      setTimeout(() => { 
         FormValidateErrors = [];
         FormValidateErrors.push(NewErrors);
         return NewErrors;
      }, 100); 
  }
 

    const FormSubmit = (e)=>{  
      e.preventDefault();     
      console.log(INPUTS);
      validateForm(); 
       setTimeout(() => {
         const formErrors = FormValidateErrors[0]; 
           if(Object.keys(formErrors).length > 0){
             setErrors(formErrors); 
             toast.error("Verifique todos os  campos");   
             console.log(formErrors);
          }else{ 
   
          const SUBMIT_INPUTS = { 
              quarterly_note_subject:INPUTS.quarterly_note_subject,    
              quarterly_note_class:INPUTS.quarterly_note_class , 
              quarterly_note_student_code:INPUTS.quarterly_note_student_code ,  
              quarterly_note_mac:INPUTS.quarterly_note_mac,
              quarterly_note_npp:INPUTS.quarterly_note_npp, 
              quarterly_note_npt:INPUTS.quarterly_note_npt,  
              quarterly_note_quarter:INPUTS.quarterly_note_quarter, 
          };
   
            if(!props.update){ 
             console.log(SUBMIT_INPUTS); 
 
             axios.post(FORMURL[0], SUBMIT_INPUTS).then(()=>{  
                 toast.success("Nota adicionada com sucesso !");
                 setForm({});
                 ClearInputs(); 
                 setErrors({})
                 RefreshList(`.el-refresh-list`);
                 SetTotal(0);
           }).catch((error)=>{toast.error("Lamentamos mas não foi  possivel executar esta ação")});  
            } else {
              axios.put(FORMURL[3] , SUBMIT_INPUTS)
              .then((dt)=>{
                  
                console.log(dt);

                toast.success("Nota atualizada com sucesso !");
                setForm({});
                setErrors({})
                ClearInputs(); 
                RefreshList(`.el-refresh-list`);
                setTimeout(() => {
                   handleClose();
                }, 1000);



              }).catch((error)=>{toast.error("Lamentamos mas não foi  possivel executar esta ação")}); 
            } 
          } 
       }, 200);        
    };
 
 
    
      
   const GetStudentCode  = (e)=>{
      setStudentCode(e);
      setField("quarterly_note_student_code", e); 
  }

  
  const GetStudentsByClass = async(e)=>{ 
    setStudentsData([]);
    setMaxValue(0); 
    setLoadingStudents(true);
    const response = await axios.get(FORMURL[4]+e);
    const response1 = await axios.get(DATA_URL[0]+`${e}`);  
    const info = await axios.get(DATA_URL[1]+`${response1.data[0].ed_class_academic_level}`);  

    const students = []; 
    if(response.data !== null){   
       if(info.data.length >= 1){ 
        setMaxValue(info.data[0].ed_academic_level_avaliationtype_endat*1);
       }else{
        setMaxValue(0);
       }  
        response.data.map((item, index)=>{
          students.push({name:item.ed_student_name, value:item.ed_student_id});
        }) 
      }   
    setTimeout(() => {
      setStudentsData(students); 
      setLoadingStudents(false);
    }, 100);
  }













    const handleInput = (e)=>{    
       switch (e.target.id) {  
          case "quarterly_note_class":   
          if(e.target.value.split("|").length >= 2){ 
           SetCurrentClass(e.target.value.split("|")[0]);
           GetStudentsByClass(e.target.value.split("|")[0]);  
            INPUTS.quarterly_note_class = e.target.value.split("|")[0]
            setField("quarterly_note_class", e.target.value.split("|")[0]); 
            setField("quarterly_note_subject", e.target.value.split("|")[1]);
            INPUTS.quarterly_note_subject = e.target.value.split("|")[1] 
           }else{  
             SetCurrentClass(e.target.value);
             GetStudentsByClass(e.target.value);  
             INPUTS.quarterly_note_class = e.target.value
             setField("quarterly_note_class", e.target.value);
           }  
          break; 
           case "quarterly_note_subject": 
              setField("quarterly_note_subject", e.target.value);
              INPUTS.quarterly_note_subject = e.target.value
          break;   
            case "quarterly_note_quarter1": 
              setField("quarterly_note_quarter", e.target.value);
              INPUTS.quarterly_note_quarter = e.target.value 
          break;   
          case "quarterly_note_mac": 
              setField("quarterly_note_mac", e.target.value);
              INPUTS.quarterly_note_mac = e.target.value
          break;   
          case "quarterly_note_npp":
              setField("quarterly_note_npp", e.target.value);
              INPUTS.quarterly_note_npp = e.target.value
        break;     
        case "quarterly_note_npt":  
           setField("quarterly_note_npt", e.target.value);
            INPUTS.quarterly_note_npt = e.target.value; 
        break;   
        default:
          console.log("none of them"); 
       }
      SetTotal(((INPUTS.quarterly_note_npp*1)  + (INPUTS.quarterly_note_mac*1)  + (INPUTS.quarterly_note_npt*1)) / 3);
     }
 


  return (
    
    <div>
      <div onClick={handleShow}>
         {props.toggle_btn ? props.toggle_btn :  <button className='btn btn-main'><AddCircleOutlineIcon/>Lançar nota</button>}
    </div>
  <Modal size='lg'  className='animate__animated animate__zoomInDown' centered   dialogAs={DraggableModal}  show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title><h5>{ props.title ? props.title : 'Efectuar ' } Lançamento de notas</h5></Modal.Title>
    </Modal.Header>
    <Form onSubmit={FormSubmit}>
    <Modal.Body className='scrollLimit'>
       
          <>
             {!props.update ? 
               <>
                {props.data ? 
                <> 
                <Form.Group className="mb-3"  >
                  <Form.Label>Turma - disciplina<span className="text-danger ml-2">*</span></Form.Label>
                <div className="ed-flex">
                <Form.Select onChange={handleInput} className={!!errors.quarterly_note_class && 'is-invalid'} value={form.quarterly_note_class} 
                  isInvalid={!!errors.quarterly_note_class} id="quarterly_note_class">
                      {props.data.map((item, index)=>{
                          return(<option value={item.ed_tch_subject_class+ "|"+ item.ed_tch_subject_code}> 
                              Turma - <GetClasstitle_byclass ID={item.ed_tch_subject_class} /> 
                                ( <GetSubject ID={item.ed_tch_subject_code} /> )
                            </option>)
                      })} 
                  </Form.Select>
                  {LoadingStudents ? <div className='ed-flex'><div className="pd-2"></div> 
                    <SmallLoader /> 
                </div> : <></>}
                </div>
                  <Form.Control.Feedback type='invalid'>{errors.quarterly_note_class}</Form.Control.Feedback>
                </Form.Group> 
                </>  :
                <>  
              </> 
              }    

          {props.update ? <></> :  
              <>
                {props.data  ?  
                <>
                {StudentsData.length >= 1 ?
                <>
                <Form.Group className="mb-3"> 
                  <div>
                    <Form.Label>Nome do estudante <span className='text-danger ml-2'>*</span></Form.Label>
                  </div>  
                <div className={`select-search-item  ${errors.quarterly_note_student_code ? 'error': ''}`}>
                  <SelectSearch  onChange={(e)=>GetStudentCode(e)}  value={studentCode} options={StudentsData} search={true} 
                    placeholder="Selecione um aluno" />
                </div>
                <small className="text-danger">{errors.quarterly_note_student_code}</small>
              </Form.Group>   
                </>  : 
                <>
                
                </> 
                }
                </> 
                :  
                <></>} 
            </> 
        }   

         <Form.Group className="mb-3"  >
          <Form.Label>Trimestre<span className="text-danger ml-2">*</span></Form.Label>
          <Form.Select onChange={handleInput} className={!!errors.quarterly_note_quarter && 'is-invalid'} value={form.quarterly_note_quarter} 
           isInvalid={!!errors.quarterly_note_quarter} id="quarterly_note_quarter1">
                <option value="1" selected>Iº Trimestre</option>
                <option value="2">IIº Trimestre</option>
                <option value="3">IIIº Trimestre</option>
          </Form.Select>
          <Form.Control.Feedback type='invalid'>{errors.quarterly_note_quarter}</Form.Control.Feedback>
         </Form.Group> 

         {MaxValue !== 0 && !LoadingStudents ?
           <div className="ed-flex">
              <div  className='col-lg-3'>
                  <Form.Group className="mb-3">
                  <Form.Label>MAC</Form.Label>
                  <Form.Control type="number"  min="0"  max={MaxValue} onChange={handleInput} className={!!errors.quarterly_note_mac && 'is-invalid'} value={form.quarterly_note_mac} 
                   placeholder={`Nota de 0 - ${MaxValue}`} isInvalid={!!errors.quarterly_note_mac} id="quarterly_note_mac"/> 
                  <Form.Control.Feedback type='invalid'>{errors.quarterly_note_mac}</Form.Control.Feedback>
                </Form.Group>  
              </div> 
              <div className='col-lg-3 ml-2 mr-2'>
                <Form.Group className="mb-3"  >
                  <Form.Label>NPP</Form.Label>
                  <Form.Control type="number" min="0"  max={MaxValue}  onChange={handleInput} className={!!errors.quarterly_note_npp && 'is-invalid'} value={form.quarterly_note_npp} 
                   placeholder={`Nota de 0 - ${MaxValue}`} isInvalid={!!errors.quarterly_note_npp} id="quarterly_note_npp"/> 
                  <Form.Control.Feedback type='invalid'>{errors.quarterly_note_npp}</Form.Control.Feedback>
                </Form.Group>  
              </div>
              <div  className='col-lg-3'>
                  <Form.Group className="mb-3"  >
                    <Form.Label>NPT</Form.Label>
                    <Form.Control type="number"  min="0"  max={MaxValue}  onChange={handleInput} className={!!errors.quarterly_note_npt && 'is-invalid'} value={form.quarterly_note_npt} 
                     placeholder={`Nota de 0 - ${MaxValue}`}   isInvalid={!!errors.quarterly_note_npt} id="quarterly_note_npt"/>  
                    <Form.Control.Feedback type='invalid'>{errors.quarterly_note_npt}</Form.Control.Feedback>
                  </Form.Group>  
              </div>
            </div>
         : <></>}
               </> :
               <>
               {Founded === true ?
                <>
                <div className="ed-flex">
                    <div  className='col-lg-3'>
                        <Form.Group className="mb-3">
                        <Form.Label>MAC</Form.Label>
                        <Form.Control type="number"  min="0"  max={MaxValue} onChange={handleInput} className={!!errors.quarterly_note_mac && 'is-invalid'} 
                        value={form.quarterly_note_mac} 
                        placeholder={`Nota de 0 - ${MaxValue}`} isInvalid={!!errors.quarterly_note_mac} id="quarterly_note_mac"/> 
                        <Form.Control.Feedback type='invalid'>{errors.quarterly_note_mac}</Form.Control.Feedback>
                      </Form.Group>  
                    </div> 
                    <div className='col-lg-3 ml-2 mr-2'>
                      <Form.Group className="mb-3"  >
                        <Form.Label>NPP</Form.Label>
                        <Form.Control type="number" min="0"  max={MaxValue}  onChange={handleInput} className={!!errors.quarterly_note_npp && 'is-invalid'} 
                        value={form.quarterly_note_npp} 
                        placeholder={`Nota de 0 - ${MaxValue}`} isInvalid={!!errors.quarterly_note_npp} id="quarterly_note_npp"/> 
                        <Form.Control.Feedback type='invalid'>{errors.quarterly_note_npp}</Form.Control.Feedback>
                      </Form.Group>  
                    </div>
                    <div  className='col-lg-3'>
                        <Form.Group className="mb-3"  >
                          <Form.Label>NPT</Form.Label>
                          <Form.Control type="number"  min="0"  max={MaxValue}  onChange={handleInput} className={!!errors.quarterly_note_npt && 'is-invalid'}
                          value={form.quarterly_note_npt} 
                          placeholder={`Nota de 0 - ${MaxValue}`}   isInvalid={!!errors.quarterly_note_npt} id="quarterly_note_npt"/>  
                          <Form.Control.Feedback type='invalid'>{errors.quarterly_note_npt}</Form.Control.Feedback>
                        </Form.Group>  
                    </div>
                  </div> 
                </>
                : <> 
                <LoaderContainer>
                    <Loader absolute small /> 
                </LoaderContainer>
                </>
                }
               </>

             }
          </>

           
          


    </Modal.Body>
    <Modal.Footer>
      <div className="ed-space">
         <div className="ed-flex">
             <h5 className='ed-flex'>Media final :  
                 <span className='text-danger ml-2'>
                    <ReduceTextLength text={Total.toString() +""} length={5} /> 
                 </span>
                 <div className="ml-2">~</div>
                 <span className="text-green ml-2">
                       {FloorNumber(Total)}
                 </span>
              </h5> 
         </div>
         <div className="ed-flex">
            <Button className='bg-light text-dark' onClick={handleClose}> Cancelar </Button>
            <Button className="btn btn-main ml-2" disabled={props.data ? false : true} type="submit">{ props.title ? <Update/> : <Save/>  }   { props.title ? props.title : 'Salvar' } </Button>
         </div>
      </div>
    </Modal.Footer>
    </Form>
  </Modal>
    </div>
  )
}
 

const LoaderContainer = styled.div`
  width:100%;
  min-height:300px;
  padding:30px;
  display:flex;
  align-items:center;
  justify-content:center; 
`;



export default QuarterlyNotesModal