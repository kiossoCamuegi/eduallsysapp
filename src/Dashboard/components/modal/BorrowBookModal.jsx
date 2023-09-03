import React, {useEffect, useState} from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Modal, Form, Button} from 'react-bootstrap'
import { Save } from '@mui/icons-material';
import DraggableModal from '../../../General/components/DraggableModal'; 
import axios from 'axios';
import Hoot from '../../../General/components/Hoot';
import ClearInputs from '../../../General/components/ClearInputs'; 
import {BooksDataOptionsSelector, GetClassroom_byclass, GetClasstitle_byclass, GetCourse_byclass, GetInstituteCode, GetPeriod_byclass, StudentsDataOptions} from '../../../General/components/InstituteData';  
import CRValue from '../../../General/components/CRValue';
import {toast} from 'react-toastify';
import { Update } from '@material-ui/icons';
import styled from 'styled-components';
import { Avatar  } from '@mui/material';
import { Link } from 'react-router-dom';
import { MultiSelect } from 'react-multi-select-component';

function BorrowBookModal(props) {
    const [show, setShow] = useState(false);
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});  
    const [monthError, setMonthError] = useState(null);
    const [Select, setSelected] = useState([]);
    const [Books , SetBooks] = useState(null);

    const [studentCode, setStudentCode] = useState(null); 
    const [StudentClass , setStudentClass] = useState('#'); 
    const [StudentName , setStudentName] = useState('#');
    const [StudentPicture , setStudentPicture] = useState('#');

    const handleClose = () => setShow(false);
    const handleShow = () => {
       setShow(true); 
       GET_DATA();
    };
     
    const INPUTS = {
         borrow_book_devolution_date:CRValue("#borrow_book_devolution_date"),  
         borrow_book_student:CRValue("#borrow_book_student"),   
         borrow_book_data:Books,   
         institute_code:GetInstituteCode()
    }; 

    const FORMURL = [
      Hoot()+"edualllibraryborrowbookregister/post",
      props.get ? props.get : '',
      props.url ? props.url : '',
      Hoot()+"eduallsinglestudentapi/get/"
    ];

    const GET_DATA = async()=>{
      const response = await axios.get(FORMURL[1]); 
      if(response.data !=null){
        if(response.data[0] != null){
          document.querySelector("#borrow_book_devolution_date").value = response.data[0].ed_borrow_book_devolution_date;  
          document.querySelector("#borrow_book_student").value = response.data[0].ed_borrow_book_student;  

          INPUTS.borrow_book_devolution_date = response.data[0].ed_borrow_book_devolution_date 
          INPUTS.borrow_book_student = response.data[0].ed_borrow_book_student 
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
   

  function selectedBooks(e){
    setSelected(e) 
    setField("borrow_books", "month");
  var books = "";
  for (let i = 0; i < e.length; i++) {
        books += ","+e[i].value;
  } 
  SetBooks(books);
}



    const validateForm = ()=>{
      const {borrow_book_devolution_date,   borrow_book_student } = form; 
      const NewErrors = {};

      if(INPUTS.borrow_book_devolution_date ===  "" || INPUTS.borrow_book_devolution_date ===  " "){
      if(!borrow_book_devolution_date || borrow_book_devolution_date === '') NewErrors.borrow_book_devolution_date = 'Data de devolução invalida';  
      }else{if(!borrow_book_devolution_date){setField("borrow_book_devolution_date", INPUTS.borrow_book_devolution_date);}} 
 
      if(INPUTS.borrow_book_student ===  "" || INPUTS.borrow_book_student ===  " "){
      if(!borrow_book_student || borrow_book_student === '') NewErrors.borrow_book_student = 'Estudante invalido ou inactivo';  
      }else{if(!borrow_book_student){setField("borrow_book_student", INPUTS.borrow_book_student);}} 
 
    
      return NewErrors;
    }
  
    const FormSubmit = (e)=>{  
      e.preventDefault();   
      const formErrors = validateForm();
      if(Object.keys(formErrors).length > 0){
           setErrors(formErrors);
           toast.error("Verifique todos os  campos");   
        }else{
          const SUBMIT_INPUTS = {borrow_book_devolution_date:INPUTS.borrow_book_devolution_date, 
          borrow_book_student:INPUTS.borrow_book_student , borrow_book_data:INPUTS.borrow_book_data,
          institute_code:INPUTS.institute_code};


          console.log(SUBMIT_INPUTS);

          
          if(!props.update){
            axios.post(FORMURL[0], SUBMIT_INPUTS).then(()=>{  
              toast.success("Emprestimo de livro registrado com sucesso !");
              setForm({}); 
              //ClearInputs();
              setTimeout(() => { 
             //  handleClose();
            }, 1500);  
            }).catch((error)=>{toast.error("Lamentamos mas não foi  possivel executar esta ação")}); 
          } else {
            axios.put(FORMURL[2] , SUBMIT_INPUTS)
            .then(()=>{  
              toast.success("Emprestimo de livro atualizado com sucesso !");
              setForm({});
              ClearInputs();
              setTimeout(() => { 
                  handleClose();
              }, 1500);
            }).catch((error)=>{
               console.log(error); 
              toast.error("Lamentamos mas não foi  possivel executar esta ação")
            }); 
          }


          
        }  
    };

      
    const handleInput = (e)=>{  
       switch (e.target.id) {
        case "borrow_book_student":
           INPUTS.borrow_book_student = e.target.value
           setField("borrow_book_student", e.target.value);
           setStudentCode(Math.floor(e.target.value))
          break;
          case "borrow_book_devolution_date":
            INPUTS.borrow_book_devolution_date = e.target.value
            setField("borrow_book_devolution_date", e.target.value);
           break;  
       }
    }

     
   useEffect(()=>{
    setTimeout(() => { 
        if(studentCode != null){
          const StudentData = async()=>{
             const response = await axios.get(FORMURL[3]+`${studentCode}`) 
             if (response.data.length >= 1) { 
                  setStudentName(response.data[0].ed_student_name);
                  setStudentClass(response.data[0].ed_student_class);
                  setStudentPicture(response.data[0].ed_student_picture); 
             }
          }  
         StudentData();
        } 
    }, 100);
   });

 

  
    return (
        <div>  
          <div onClick={handleShow}>
                {
                  props.toggle_btn ? props.toggle_btn :   <button className='btn btn-main'><AddCircleOutlineIcon/>Cadastrar emprestimo de livro</button>  
                }
           </div>
          <Modal className='animate__animated animate__zoomInDown'  centered  size='lg' dialogAs={DraggableModal}  show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title><h5>{ props.title ? props.title : 'Cadastrar ' } emprestimo de livro</h5></Modal.Title>
            </Modal.Header>
            <Form onSubmit={FormSubmit}> 
            <Modal.Body className='scrollLimit'>
                <div className="col mt-2 mb-2">
                <Box className="boxItem"> 
               <div className="ed-flex">
                   <Link to=''><Avatar  alt={StudentName}   src={StudentPicture != "#"  ?  Hoot()+ StudentPicture  : ""}  sx={{ width: 106, height: 106 }}/></Link>
                   <div className="d-block ml-2 description">
                       <div className="ed-wrap">
                       <h3 >Turma : <Link to='' className='text-main label-student-name'> <GetClasstitle_byclass ID={StudentClass} /></Link></h3>
                       <h3 className='ml-2 '>Sala  : <Link to='' className='text-main label-student-name'>  {<GetClassroom_byclass ID={StudentClass} />} </Link></h3>
                       <h3 className='ml-2 '>Periodo : <Link to='' className='text-main label-student-name'>  <GetPeriod_byclass ID={StudentClass} />  </Link></h3>
                       </div>
                        <h5>Curso : <Link to='' className='text-main label-student-class'> <GetCourse_byclass ID={StudentClass} /> </Link></h5>
                   </div>
               </div> 
             </Box>
                </div>
                <Form.Group className="mb-3" >
                  <Form.Label>Nome do estudante<span className='text-danger ml-2'>*</span></Form.Label>
                  <Form.Select onChange={handleInput} className={!!errors.borrow_book_student && 'is-invalid'} value={form.borrow_book_student} isInvalid={!!errors.borrow_book_student}
                  type="text" id="borrow_book_student">
                        <StudentsDataOptions/>
                  </Form.Select>
                  <Form.Control.Feedback type='invalid'>{errors.borrow_book_student}</Form.Control.Feedback>
                </Form.Group>  
                <Form.Group className="mb-3">
                <Form.Label>Livros<span className='text-danger ml-2'>*</span></Form.Label>
                 <MultiSelect 
                        options={BooksDataOptionsSelector() }
                        value={Select}
                        className={monthError !== null ? 'border-red' : ''}
                        onChange={selectedBooks}
                        labelledBy='select'
                    />
                        <small className="text-danger">{monthError !== null ? "O mês de Já foi pago" : ''}</small>
                    <Form.Control.Feedback type='invalid'> {monthError !== null ? "O mês de  Já foi pago" : ''} </Form.Control.Feedback> 
                  <Form.Control.Feedback type='invalid'>{errors.borrow_book_student}</Form.Control.Feedback>
                </Form.Group>     
                <div className="block">
                    <Form.Label>Data de devolução <span className='text-danger ml-2'>*</span></Form.Label>
                    <Form.Control type='date'  onChange={handleInput} className={!!errors.borrow_book_devolution_date && 'is-invalid'}
                     value={form.borrow_book_devolution_date} isInvalid={!!errors.borrow_book_devolution_date}
                    name='borrow_book_devolution_date' id="borrow_book_devolution_date"  />
                    <Form.Control.Feedback type='invalid'>{errors.borrow_book_devolution_date}</Form.Control.Feedback>
                </div>
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


const Box = styled.div`
    width:auto; 
    border-radius:6px;   
    padding:20px; 
    min-height:100px;
    background:#f0f3f7;
    color:var(--ed-dark);   
    border:1px solid var(--ed-silver-light);
    margin:10px 0;
    min-width:430px;

 

    .description{
        h3{
            font-size:16px;
            margin-bottom:15px;
            margin-top:10px;
        }

        h5{
            font-size:16px;
        }
    }

    h2{
        margin:10px 0;
        font-size:18px;
        font-weight:600;
    }
`;



export default BorrowBookModal