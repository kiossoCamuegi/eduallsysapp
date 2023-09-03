import React, {useState} from 'react'
import  {Email, Phone, LinkedIn, Facebook, PrintSharp} from '@mui/icons-material';
import ImageUser from '../../Assets/images/avatars/avatar-4.jpg'; 
import Formation from '../components/StudentTabs/Formation';
 import Marks from '../components/StudentTabs/Marks';
import Activities from '../components/StudentTabs/Activities';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import PersonalInformation from '../components/StudentTabs/PersonalInformation';
import StudentParents from '../components/StudentTabs/StudentParents'; 
import { useEffect } from 'react';
import axios from 'axios';
import Hoot from '../../General/components/Hoot';
import { GetAcademiclevel_byclass, GetAcademicYear_byclass, GetCicle_byclass, GetClassroom_byclass, GetClasstitle_byclass, GetCourse_byclass, GetPeriod_byclass, GetStudentClassroom } from '../../General/components/InstituteData';
import Loader from '../../General/components/Loader';
import NotFounded from '../../General/components/NotFounded';
import StudentFeePayments from '../components/StudentTabs/StudentFeePayments';
import StudentServicePayments from '../components/StudentTabs/StudentServicePayments';
import { Avatar } from '@mui/material';
import StudentAttendance from '../components/StudentTabs/StudentAttendance';

const Image =   require("../../Assets/images/covers/student_covers/cv.jpg");

function StudentInfo() { 
    const SEARCHURL = Hoot()+'eduallsinglestudentapi/get/'
    const [ToggleState, setToggleState] = useState(1);
    const [Loaded, setLoaded] = useState(false);
    const [StudentPersonalInformation, setStudentPersonalInformation] = useState([]);
    const [FoundedStudent, SetFoundedStudent]  = useState(false);
    const toggleTab = (index)=>{ 
        setToggleState(index); 
     }


    const {id} = useParams();  
      async function CheckCurentStudent(){ 
          try {
            const response = await axios.get(SEARCHURL+id); 
            if (response.data.length >= 1){ 
                 setStudentPersonalInformation(response.data[0]);
                 document.title = "Informações do estudante"+ " - "+response.data[0].ed_student_name;
                 setLoaded(true); 
                 SetFoundedStudent(true);
            }else{
                setLoaded(true);
                SetFoundedStudent(false);
            }
          } catch (error) {
             setLoaded(true);
             SetFoundedStudent(false);
          }
    }


    useEffect(()=>{ 
        CheckCurentStudent(); 
    },[]);


  if(Loaded) { 
    if (FoundedStudent) {
          let ST  = StudentPersonalInformation; 
            return(
                <div className="student-info">
               <div className="header-info">
                 <div className="ed-space">
                 <div className="ed-flex">
                     <h5>
                         <Link to="/StudentsGrid" className='prevpage'>Lista de estudantes</Link> 
                           {'>'} 
                         <Link className='ml-2' to="#">{ST.ed_student_name}</Link>
                    </h5>
                 </div>
                 <div>
                     <Link to={`/StudentGeneralInformationPrint/${ST.ed_student_id}`}>
                     <button className="btn bg-black text-light">
                           <PrintSharp/> Relátorio geral do aluno
                     </button>
                     </Link>
                 </div>
                 </div>
              </div>
              <div className="info-box ">
              <div className="cover">
                <div className="cover-over">
                   <div className="ed-space">
                    <div>
                       
                    </div>
                    <div className="contact-links">
                      <ol>
                         <li><a className='bg-main' href={`mailto:${ST.ed_student_email}`}><Email/></a></li> 
                         <li><a className='bg-main' href={`tel:${ST.ed_student_phone !== "" && ST.ed_student_phone !== null ? ST.ed_student_phone : ST.ed_student_phone2}`}><Phone/></a></li> 
                      </ol>
                    </div>
                   </div>
                </div>
                <img loading="lazy" role="presentation" src={Image} alt={ST.ed_student_name} />
               </div>
               <div className="ed-studentinfo-dets">
               <div className="data-block">
               <div className="ed-flex"> 
                    <div className="avatar-box">
                       <Avatar sx={{width:150,height:150}} src={Hoot()+ST.ed_student_picture} alt=''/> 
                    </div>
                    <div className="block">
                        <Link to="#"><h5>{ST.ed_student_name}</h5></Link>
                        <Link to="#" className='text-dark'>Nº de matrícula :<span className="text-main-light ml-2">{ST.ed_student_id}</span></Link>
                  </div>
               </div>
               </div>
               <div className="wrap">
               <ul>
                    <li>Sala : <GetClassroom_byclass ID={ST.ed_student_class}  />  </li>
                    <li>Turma : <GetClasstitle_byclass ID={ST.ed_student_class}  /> </li>
                    <li>Classe: <GetAcademiclevel_byclass ID={ST.ed_student_class} /> </li>
                    <li>Periodo: <GetPeriod_byclass ID={ST.ed_student_class} /> </li>
                    <li>Curso : <GetCourse_byclass  ID={ST.ed_student_class} /> </li>
                    <li>Ano lectivo : <GetAcademicYear_byclass  ID={ST.ed_student_class} /> </li>
                    <li>Nº  de matricula : {ST.ed_student_id}</li>
                    <li>Ciclo : <GetCicle_byclass ID={ST.ed_student_class} /> </li>
                    <li>Status : {ST.ed_student_status*1 === 1 ? ' Activo ' : ' Inactivo '} </li>
                </ul>
               </div>
               </div>
              </div>
              <ul className="student-info-options">
                  <li className={ToggleState === 1 ? 'active': ''} onClick={()=> toggleTab(1)} >Informações pessoais</li>
                  <li className={ToggleState === 2 ? 'active': ''} onClick={()=> toggleTab(2)} >Pagamentos</li>
                  <li className={ToggleState === 3 ? 'active': ''} onClick={()=> toggleTab(3)} >Notas</li>
                  <li className={ToggleState === 4 ? 'active': ''} onClick={()=> toggleTab(4)} >Presença escolar</li>
                  <li className={ToggleState === 5 ? 'active': ''} onClick={()=> toggleTab(5)} >Encarregados</li>
                  <li className={ToggleState === 6 ? 'active': ''} onClick={()=> toggleTab(6)} >Histórico</li>
              </ul>
              <div className="student-info-menu  student-info-options-menu">
                  <menu className={ToggleState === 1 ? 'info-box active': ''}>
                     {ToggleState  === 1 ?
                        <Container>
                             <PersonalInformation data={StudentPersonalInformation} />
                        </Container>
                           :
                        <></>               
                     }
                  </menu>
                  <menu className={ToggleState === 2 ? 'active': ''}> 
                   {ToggleState  === 2 ?
                        <>
                           <Container className='info-box' >
                          <div className="pd">
                          <h1>Propinas</h1>
                          <div className="mt-4">
                             <StudentFeePayments  data={StudentPersonalInformation}/>
                          </div>
                          </div>
                      </Container>
                      <div className="mt-4">
                      <Container className='info-box'>
                         <div className="pd">
                         <h1>Serviços e Produtos</h1>
                          <div className="mt-4">
                             <StudentServicePayments  data={StudentPersonalInformation}/>
                          </div>
                         </div>
                      </Container>
                      </div>  
                        </>
                           :
                        <></>               
                     } 
                  </menu>
                  <menu className={ToggleState === 3 ? 'info-box active': ''}>
                  {ToggleState  === 3 ? 
                      <Container>
                         <Marks  data={StudentPersonalInformation}/>
                     </Container>
                           :
                        <></>               
                     } 
                  </menu>
                  <menu className={ToggleState === 4 ? 'info-box active': ''}>
                  {ToggleState  === 4 ? 
                      <>
                          <StudentAttendance  data={StudentPersonalInformation}/>
                      </>
                           :
                        <></>               
                     } 
                  </menu>
                  <menu className={ToggleState === 5 ? 'info-box active': ''}>
                  {ToggleState  === 5 ? 
                     <Container>
                         <StudentParents  data={StudentPersonalInformation}/>
                      </Container>
                           :
                        <></>               
                     } 
                  </menu>
                  <menu className={ToggleState === 6 ? 'info-box active': ''}>
                  {ToggleState  === 6 ? 
                      <Container>
                          <Activities  data={StudentPersonalInformation}/>
                       </Container>
                           :
                        <></>               
                     } 
                  </menu>
              </div>  
              <br />
          </div>
            ) 
    }else{
        return (
            <NotFounded />
        )
    }
  }else{
    return(
        <div className="loader-content-box">
           <Loader />
        </div>
     )
  }
}

const Container = styled.div`
 padding:20px;

  .pd{
      padding:20px;
   }

   h2{
    font-size:20px;
     margin:15px 0;
   }

   h1{
        margin: 0; 
        font-weight: 600;
        font-size: 18px;
        line-height: 1.6; 
   }
`;

export default StudentInfo