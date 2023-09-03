import React from 'react'
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import {GoTasklist} from "react-icons/go";
import {BsClipboardCheck} from "react-icons/bs";
import {BiTimer} from "react-icons/bi";
import { GetAcademicYear_byclass, GetAcademiclevel_byclass, GetCicle_byclass, GetClass, GetClassroom_byclass, GetClasstitle_byclass, GetCourse_byclass, GetEmployeAttendanceValue, GetPeriod_byclass, GetStudentAttendanceValue } from '../../../General/components/InstituteData';
import { Table } from 'react-bootstrap';
import moment from "moment";
 

function PP_resume(props) {
    const StudentInfo = props.data.student;
    const InstituteInfo = props.data.institute;
    const  Data = [
        {icon:<BsClipboardCheck />, title:"Tarefas atribuidas", value:653 },
        {icon:<GoTasklist />, title:"Faltas aplicadas", value:<GetStudentAttendanceValue CLASS={StudentInfo.ed_student_class} Type={1} ID={StudentInfo.ed_student_id} />},
        {icon:<BiTimer/>, title:"Reclamações", value:4},
    ];
   
  return (
   <Container>
      <div className='ed-flex ed-space'>
          {Data.map((item, index)=>{
              return(
               <Box key={index}> 
                   <div className="icon bg-main-light">{item.icon}</div>
                   <div className="block">
                      <h1>{item.value}</h1>
                      <span>{item.title}</span>
                   </div>
                   <div className="view">
                      <Link to="#"></Link>
                   </div>
               </Box>
              );
          })}
      </div> 
      <BoxItem>
        <h1 className="title">Informações pessoais</h1>
        <div className="mt-4">
        <Table bordered > 
         <tbody>
            <tr> 
                <td>
                    <div className="ed-space">
                        <div>Nº do BI</div>
                        <div><span>{StudentInfo.ed_student_identityCard}</span> </div>
                    </div>
                </td>
                <td>
                    <div className="ed-space">
                        <div>Morada</div>
                        <div><span>{StudentInfo.ed_student_address}</span></div>
                    </div>
                </td>
            </tr> 
            <tr> 
                <td>
                    <div className="ed-space">
                        <div>Genero</div>
                        <div><span>{StudentInfo.ed_student_gender === "female" ? "Femenino" : "Masculino"}</span></div>
                    </div>
                </td>
                <td>
                    <div className="ed-space">
                        <div>Telefone</div>
                        <div><span>{StudentInfo.ed_student_phone}</span> </div>
                    </div>
                </td>
            </tr> 
            <tr> 
                <td>
                    <div className="ed-space">
                        <div>Nacionalidade</div>
                        <div><span>{StudentInfo.ed_student_nacionality}</span> </div>
                    </div>
                </td>
                <td>
                    <div className="ed-space">
                        <div>Data de nascimento</div>
                        <div><span>{moment(StudentInfo.ed_student_birthday).format("YYYY-MM-DD")}</span> </div>
                    </div>
                </td>
            </tr> 
            <tr> 
                <td>
                    <div className="ed-space">
                        <div>Morada</div>
                        <div><span>{StudentInfo.ed_student_address}</span></div>
                    </div>
                </td>
                <td>
                    <div className="ed-space">
                        <div>Religião</div>
                        <div><span>{StudentInfo.ed_student_religion}</span> </div>
                    </div>
                </td>
            </tr>  
         </tbody>
        </Table>
        </div>
      </BoxItem>
      <BoxItem>
        <h1 className="title">Informações institucionais</h1>
        <div className="mt-4">
        <Table bordered > 
         <tbody>
            <tr> 
                <td>
                    <div className="ed-space">
                        <div>Turma</div>
                        <div><span>{<GetClasstitle_byclass ID={StudentInfo.ed_student_class} /> }</span> </div>
                    </div>
                </td>
                <td>
                    <div className="ed-space">
                        <div>Ano letivo</div>
                        <div><span>{<GetAcademicYear_byclass  ID={StudentInfo.ed_student_class}/> }</span> </div>
                    </div>
                </td>
            </tr> 
            <tr> 
                <td>
                    <div className="ed-space">
                        <div>Sala</div>
                        <div><span>{<GetClassroom_byclass ID={StudentInfo.ed_student_class} /> }</span> </div>
                    </div>
                </td>
                <td>
                    <div className="ed-space">
                        <div>Periodo</div>
                        <div><span>{<GetPeriod_byclass ID={StudentInfo.ed_student_class} />}</span> </div>
                    </div>
                </td>
            </tr> 
            <tr> 
                <td>
                    <div className="ed-space">
                        <div>Curso</div>
                        <div><span>{<GetCourse_byclass ID={StudentInfo.ed_student_class} />  }</span> </div>
                    </div>
                </td>
                <td>
                    <div className="ed-space">
                        <div>Classe</div>
                        <div><span>{<GetAcademiclevel_byclass ID={StudentInfo.ed_student_class} />  }</span> </div>
                    </div>
                </td>
            </tr> 
            <tr> 
                <td>
                    <div className="ed-space">
                        <div>Ciclo</div>
                        <div><span>{<GetCicle_byclass ID={StudentInfo.ed_student_class} /> }</span> </div>
                    </div>
                </td>
                <td>
                    <div className="ed-space">
                        <div>Status</div>
                        <div><span>{Math.floor(StudentInfo.ed_student_status) === 1 ?  "Activo" : "Inactivo"}</span></div>
                    </div>
                </td>
            </tr>  
         </tbody>
        </Table>
        </div>
      </BoxItem>
   </Container>
  )
}

const Container = styled.div`
   display:block; 

   
    table{
         .ed-space{
              span{ 
                color:var(--ed-grey-text); 
             }
         }
    }
`;

const Box = styled.div` 
   width:32%;
   min-width:100px;
   min-height:50px;
   border-radius:6px; 
   min-height:100px;
   margin:10px 0px !important;
   background:var(--ed-white);  
   box-shadow:var(--ed-shadow-df);   
   padding:20px;
   display:flex;
   position:relative;


    h1{
        font-size:22px;
        margin:5px 0px;
        font-weight:600;
    }


    span{
        font-size:16px;
        color:var(--ed-grey-text); 
    }

  .icon{
      min-width:60px;
      width:60px;
      height:60px;
      border-radius:100%;
      display:flex;
      align-items:center;
      justify-content:center;
      margin-right:10px;

        svg{
            color:var(--ed-white);
            width:30px;
            height:30px;
        }
  }
      
`;
 
const BoxItem = styled.div`
    background:var(--ed-white); 
    border-radius:6px; 
    box-shadow:var(--ed-shadow-df);
    min-width:100px;
    margin:20px 0px; 
    padding:20px; 
`;

export default PP_resume;
