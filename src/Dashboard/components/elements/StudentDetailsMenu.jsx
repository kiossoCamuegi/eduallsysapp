
import React, {useEffect, useState} from 'react'
import {Form, Offcanvas} from 'react-bootstrap' 
import StyleBadge from './StyleBadge'; 
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import { Link, useHistory } from 'react-router-dom';
import Hoot from '../../../General/components/Hoot';
import axios from "axios";
import styled from 'styled-components';
import { Avatar, AvatarGroup } from '@mui/material'; 
import Loader from '../../../General/components/Loader';
import SwitchFromPages from '../../../General/components/SwitchFromPages';
import Table from 'react-bootstrap/esm/Table';
import { GetAcademiclevel_byclass, GetAcademicYear_byclass, GetClassroom_byclass, GetClasstitle_byclass, GetCourse_byclass, GetPeriod_byclass, GetserviceCoin, GetServiceTitle } from '../../../General/components/InstituteData';
import { PrintOutlined } from '@mui/icons-material';
import NotFounded from '../../../General/components/NotFounded';
import NumberToPrice from '../../../General/components/NumberToPrice';
import moment from 'moment';
import CalcAgeByBirthday from '../../../General/components/CalcAgeByBirthday';


function StudentDetailsMenu(props) { 
    let studentCode = props.student_id;
    const [show, setShow] = useState(false); 
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);  
    const [StudentPersonalInformation, setStudentPersonalInformation] = useState([]);
    const [FoundedStudent, SetFoundedStudent]  = useState(null);
    const [Payments, SetPayments] = useState([]); 
 
    const DATAURL =  [
      Hoot()+'eduallsinglestudentfeepayment/get/',
      Hoot()+"eduallsingleacademicyearapi/get/",
      Hoot()+'eduallsingleclassapi/get/',
      Hoot()+'eduallsinglestudentapi/get/' 
   ];

    const Months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", 
    "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    const PaymentMethods = ["Dinheiro a mão", "Transferência", "Depósito", "Tpa"];

    useEffect(()=>{ 
        CheckCurentStudent(); 
    },[studentCode]);


    async function CheckCurentStudent(){ 
        try {
          const response = await axios.get(DATAURL[3]+studentCode); 
          if (response.data.length >= 1){ 
                  setStudentPersonalInformation(response.data[0]); 
                  const response1 = await axios.get(DATAURL[2]+`${response.data[0].ed_student_class}`);    
                  if(response1.data.length >= 1){   
                    const response2 = await axios .get(DATAURL[0]+studentCode+","+response1.data[0].ed_class_year); 
                      if(response2.data.length >= 1){  
                          SetPayments(response2.data);  
                         SetFoundedStudent(true);
                      }else{ 
                        SetPayments([]);
                         SetFoundedStudent(true);
                      } 
                  }else{
                     SetFoundedStudent(false);
                  }
          }else{
              SetFoundedStudent(false);
          } 
        } catch (error) {
          SetFoundedStudent(false);
        }
    }

 
  if(studentCode !== null){
    if(FoundedStudent === null){
        return(
            <div>   
            <div onClick={handleShow}>
               {props.toggle_btn ? props.toggle_btn :   
               <li onClick={handleShow} className="ed-flex me-2 user-menu-avatar ">
                  click here
               </li> 
               }
             </div> 
           <Offcanvas placement='end' id="studentDetailsoffCanvas" show={show} onHide={handleClose}>
             <Offcanvas.Header closeButton>
               <Offcanvas.Title>Dados do estudante</Offcanvas.Title>
             </Offcanvas.Header>
             <Offcanvas.Body> 
                <Container>
                    <Loader absolute small />
                </Container>
             </Offcanvas.Body>
           </Offcanvas>
         </div> 
        )
    }else{
     if (FoundedStudent === true) {
         return (
             <div>   
              <div className='ed-flex' onClick={handleShow}>
                 {props.toggle_btn ? props.toggle_btn :   
                 <li onClick={handleShow} className="ed-flex me-2 user-menu-avatar ">
                    click here
                 </li> 
                 }
               </div> 
               <div className="studentDetailsoffCanvasContent">
                <Offcanvas placement='end' className="studentDetailsoffCanvas" show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                <Offcanvas.Title>Dados do estudante</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Content className='student-details-menu'>
                        <div className="picture-box"> 
                        <SwitchFromPages link={`studentinfo/${StudentPersonalInformation.ed_student_id}`}
                                menu='3'  menu_item='17'  toggle_btn={ 
                                    <Avatar src={StudentPersonalInformation.ed_student_picture != ""  ?  Hoot()+StudentPersonalInformation.ed_student_picture : ""}  
                                    sx={{width:150, height:150}} alt={StudentPersonalInformation.ed_student_name}  />
                                } /> 
                        </div>
                        <div className="ed-center">
                        <SwitchFromPages link={`studentinfo/${StudentPersonalInformation.ed_student_id}`}
                         menu='3'  menu_item='17'  toggle_btn={ 
                                 <h2 className="st-name mt-2">
                                  {StudentPersonalInformation.ed_student_name.split(' ')[0]+" "} 
                                  {StudentPersonalInformation.ed_student_name.split(' ')[StudentPersonalInformation.ed_student_name.split(' ').length - 1]}
                             </h2>
                           } />  
                        </div> 
                        <Table  className='mt-4'> 
                        <thead>
                          <th colSpan='2' className='table-primary text-center'  ><h1 className='text-white'>Informações pessoais</h1></th>
                        </thead>
                          <tbody> 
                            <tr> 
                              <td><strong>Genero</strong></td>
                              <td>{ StudentPersonalInformation.ed_student_gender === "female" ? 'Femenino' : 'Masculino'}</td>
                            </tr>
                            <tr> 
                              <td><strong>Data de nascimento</strong></td>
                              <td>{moment(StudentPersonalInformation.ed_student_birthday).format("YYYY-MM-DD HH:mm:ss")}</td>
                            </tr> 
                            <tr> 
                              <td><strong>Religião</strong></td>
                              <td>{ StudentPersonalInformation.ed_student_religion }</td>
                            </tr> 
                            <tr> 
                              <td><strong>Naturalidade</strong></td>
                              <td>Angolana</td>
                            </tr> 
                            <tr> 
                              <td><strong>Morada</strong></td>
                              <td>{ StudentPersonalInformation.ed_student_address}</td>
                            </tr> 
                            <tr> 
                              <td><strong>Telefone</strong></td>
                              <td>{ StudentPersonalInformation.ed_student_phone } { StudentPersonalInformation.ed_student_phone2 !== "" && StudentPersonalInformation.ed_student_phone2 !== null  ? ' / ' : ''} { StudentPersonalInformation.ed_student_phone2} </td>
                            </tr> 
                            <tr> 
                              <td><strong>Email</strong></td>
                              <td> {StudentPersonalInformation.ed_student_email } </td>
                            </tr> 
                            <tr> 
                              <td><strong>Idade</strong></td>
                              <td>{CalcAgeByBirthday(StudentPersonalInformation.ed_student_birthday)+ " anos de idade"} </td>
                            </tr>  
                          </tbody>
                        </Table> 
                        <Table  className='mt-4'> 
                        <thead>
                          <th colSpan='2' className='table-primary text-center'  ><h1 className='text-white'>Informações escolares</h1></th>
                        </thead>
                          <tbody>      
                              <tr>
                                <td><strong>Turma</strong></td>
                                <td><GetClasstitle_byclass ID={StudentPersonalInformation.ed_student_class} /></td>
                              </tr> 
                              <tr>
                                <td><strong>Ano academico</strong></td>
                                <td><GetAcademicYear_byclass ID={StudentPersonalInformation.ed_student_class}/> </td>
                              </tr> 
                              <tr>
                                <td><strong>Classe</strong></td>
                                <td><GetAcademiclevel_byclass ID={StudentPersonalInformation.ed_student_class} /></td>
                              </tr> 
                              <tr>
                                <td><strong>Sala</strong></td>
                                <td><GetClassroom_byclass ID={StudentPersonalInformation.ed_student_class} /> </td>
                              </tr>               
                              <tr>
                                <td><strong>Curso</strong></td>
                                <td><GetCourse_byclass ID={StudentPersonalInformation.ed_student_class} /></td>
                              </tr>                                  
                              <tr>
                                <td><strong>Periodo</strong></td>
                                <td><GetPeriod_byclass ID={StudentPersonalInformation.ed_student_class} /> </td>
                              </tr>  
                          </tbody>
                        </Table> 
                        <Table  className='mt-4'>
                          <thead>
                             <th colSpan='2' className='table-primary text-center'  ><h1 className='text-white'>Pagamentos de propina</h1></th>
                          </thead>
                          <tbody>
                            {
                            Payments.map((item, index)=>{
                              let month = Months[Math.floor(item.ed_fee_payment_month.split('.')[0])]+ " de "+ item.ed_fee_payment_month.split('.')[1];
                                  return (
                                    <tr key={index}> 
                                    <td>{month}</td>
                                      <td> 
                                         {<div className="ed-flex">
                                          {
                                            NumberToPrice(item.ed_fee_payment_price*1 -  ((item.ed_fee_payment_price * item.ed_fee_payment_discount) / 100)  + 
                                            (item.ed_fee_payment_iva*1 <= 0 ? 0 : ((item.ed_fee_payment_price  * item.ed_fee_payment_iva)  / 100)) + 
                                            (item.ed_fee_payment_fineType*1 === 1 ? 
                                                item.ed_fee_payment_fineValue*1  
                                                :  
                                             ((item.ed_fee_payment_price*1 * item.ed_fee_payment_fineValue*1) / 100)
                                              )*1)
                                              }  
                                              {" "+" "}
                                              <GetserviceCoin ID={item.ed_fee_payment_service} /> 
                                              <Link className='ml-2'  to={`/student_tuition_payment_print_invoice/${item.ed_fee_payment_id}`}>
                                                <button className="btn-circle  bg-primary  ml-2 text-light">
                                                    <PrintOutlined />
                                                </button>
                                                </Link>
                                             </div>
                                            }  
                                        </td> 
                                    </tr>  
                                  )
                              })
                            }
                          </tbody>
                         </Table> 
                    </Content> 
                 </Offcanvas.Body>
                </Offcanvas>
               </div>
           </div>
         );
        } else {
           return (
            <div>   
                <div onClick={handleShow}>
                {props.toggle_btn ? props.toggle_btn :   
                <li onClick={handleShow} className="ed-flex me-2 user-menu-avatar ">
                    click here
                </li> 
                }
                </div> 
             <Offcanvas placement='end' id="studentDetailsoffCanvas" show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                <Offcanvas.Title>Dados do estudante</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body> 
                     <NotFounded />
                </Offcanvas.Body>
              </Offcanvas>
            </div> 
        )
        }
    }
   } else {
    return (  
        <div>   
            <div onClick={handleShow}>
               {props.toggle_btn ? props.toggle_btn :   
               <li onClick={handleShow} className="ed-flex me-2 user-menu-avatar ">
                  click here
               </li> 
               }
             </div> 
           <Offcanvas placement='end' id="studentDetailsoffCanvas" show={show} onHide={handleClose}>
             <Offcanvas.Header closeButton>
               <Offcanvas.Title>Dados do estudante</Offcanvas.Title>
             </Offcanvas.Header>
             <Offcanvas.Body> 
                  <NotFounded />
             </Offcanvas.Body>
           </Offcanvas>
         </div> 
    )
   }
}


const Container = styled.div`
   height:100%;
   position:relative;
`;

const Content = styled.div`
   width:100%;

   .st-name{
      font-size:20px;
      margin:10px 0px;
      font-weight:600;
   }


   thead{ 
      border-radius:6px;

        th{
            border-top-right-radius:6px;
            border-top-left-radius:6px;
        }
   }

   thead th h1{
      font-size:16px;
      margin:0px;
   }

   tbody td{
       font-size:14px;
   }

  .picture-box{
       display:flex;
       align-items:center;
       justify-content:center; 
    }
`;

export default StudentDetailsMenu


 
 