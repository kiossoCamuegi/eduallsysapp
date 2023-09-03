import React, { useEffect, useState } from 'react'
import NotFounded from '../../General/components/NotFounded';
import Loader from '../../General/components/Loader';
import axios from 'axios';
import Hoot from '../../General/components/Hoot';
import { Link, useParams } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { styled } from 'styled-components';
import { Badge, Table } from 'react-bootstrap';
import { GetJobTitle } from '../../General/components/InstituteData'; 
import Navbar from '../components/elements/Navbar';
import EmployeeDasboardBox from '../components/Grid/EmployeeDasboardBox';
import SingleEmployeeAttendanceTable from '../components/Table/SingleEmployeeAttendanceTable';
import SingleEmployeeRequests from '../components/Table/SingleEmployeeRequests';
import SingleEmployeeClassAndSubjects from '../components/Table/SingleEmployeeClassAndSubjects';
import EmployeeTaskGrid from '../components/Grid/EmployeeTaskGrid';
import  {Email, Phone, LinkedIn, Facebook, Instagram, PrintSharp, AddOutlined} from '@mui/icons-material';
import EmployeeLatestWorksGrid from '../components/Grid/EmployeeLatestWorksGrid';



const CivilState = ["Solteiro (a)","Noivo (a)","Casado (a)"];

function EmployeeInformation({data}) {
    //document.title = "Informações do funcionario"+ " - " + "#"  ;
    const SEARCHURL = Hoot()+'eduallsinglemployee/get/'
    const [ToggleState, setToggleState] = useState(1);
    const [Loaded, setLoaded] = useState(false);
    const [Data, SetData] = useState([]);
    const [FoundedEmployee, SetFoundedEmployee]  = useState(false);
    const toggleTab = (index)=>{ 
        setToggleState(index); 
     }


    const {id} = useParams(); 

 

      async function CheckCurentEmployee(){ 
            const response = await axios.get(SEARCHURL+id); 
            if (response.data.length >= 1){ 
                 SetData(response.data[0]);
                 document.title = "Informações do funcionario"+ " - "+ response.data[0].ed_employee_name;
                 setLoaded(true); 
                 SetFoundedEmployee(true);
            }else{
                setLoaded(true);
                SetFoundedEmployee(false);
            }
    }


    useEffect(()=>{ 
        CheckCurentEmployee(); 
    },[]);


 if(!id){
    return(
        <div className="loader-content-box">
           <Loader />
        </div>
     )
 }else{
    if(Loaded) { 
        if (FoundedEmployee) { 
              return(
                   <Container>  
                        <div className="container-content">
                            <div className="main-container">
                                  <div className="cover-details-box">
                                      <Box>
                                          <div className="cover-box">
                                               {(Data.ed_user_account_detProfileCover !== null && Data.ed_user_account_detProfileCover !=="" && Data.ed_user_account_detProfileCover) ?
                                                    <img src={Hoot()+Data.ed_user_account_detProfileCover} alt={Data.ed_employee_name} />
                                                 :<></>
                                               } 
                                              <div className="cover-over">
                                                 <div className="social-links">
                                                    <ul>
                                                        <a href="#" target='_blank'><li><LinkedIn/></li></a>
                                                        <a href="#" target='_blank'><li><Facebook/></li></a>
                                                        <a href="#" target='_blank'><li><Instagram/></li></a>
                                                    </ul>
                                                 </div>
                                              </div>
                                          </div>
                                          <div className="emp-dets">
                                                   <div className="ed-flex">
                                                        <div className="avatar-box">
                                                             <Avatar sx={{width:150,height:150}} src={Hoot()+Data.ed_employee_picture} alt=''/> 
                                                        </div>
                                                        <div className="block-dets">
                                                            <h1 className='name'>{Data.ed_employee_name}</h1>
                                                            <span>{Data.ed_employee_email}</span>
                                                            <div className="mt-4">
                                                                <div className="badge bg-success"><GetJobTitle ID={Data.ed_employee_charge} /></div>
                                                            </div>
                                                        </div>
                                                   </div>
                                              </div>
                                          <div className="details-box"> 
                                            <Table bordered > 
                                            <tbody>
                                                <tr> 
                                                    <td>
                                                        <div className="ed-space">
                                                            <div>Nº do BI</div>
                                                            <div><span>{Data.ed_employee_identityCard}</span> </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="ed-space">
                                                            <div>Morada</div>
                                                            <div><span>{Data.ed_employee_address}</span> </div>
                                                        </div>
                                                    </td>
                                                </tr> 
                                                <tr> 
                                                    <td>
                                                        <div className="ed-space">
                                                            <div>Genero</div>
                                                            <div><span>{Data.ed_employee_gender === "female" ?  "Femenino" : "Masculino"}</span></div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="ed-space">
                                                            <div>Nif</div>
                                                            <div><span>{Data.ed_employee_nif}</span> </div>
                                                        </div>
                                                    </td>
                                                </tr> 
                                                <tr> 
                                                    <td>
                                                        <div className="ed-space">
                                                            <div>Nacionalidade</div>
                                                            <div><span>{Data.ed_employee_nacionality}</span> </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="ed-space">
                                                            <div>Telefone</div>
                                                            <div><span>{Data.ed_employee_phone   + " / " + Data.ed_employee_phone2}</span> </div>
                                                        </div>
                                                    </td>
                                                </tr> 
                                                <tr> 
                                                    <td>
                                                        <div className="ed-space">
                                                            <div>Data de nascimento</div>
                                                            <div><span>{Data.ed_employee_birthday}</span> </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="ed-space">
                                                            <div>Estado civil</div>
                                                            <div><span>{CivilState[Data.ed_employee_civil_state]}</span> </div>
                                                        </div>
                                                    </td>
                                                </tr> 
                                            </tbody>
                                            </Table>
                                          </div>
                                      </Box>
                                  </div>
                                 <div className="col">
                                     <EmployeeDasboardBox employeeid={id} />
                                 </div>
                                  {Data.ed_employee_charge*1 === 0 ?
                                   <div className="col">
                                        <div className="mb-3">
                                        <Box>
                                            <div className="box-details">
                                                <h1 className="title">Disciplinas & Turmas</h1>
                                                <SingleEmployeeClassAndSubjects employeeid={id} />
                                            </div>
                                         </Box>
                                        </div>
                                   </div>
                                  :<></>}
                                    <div className="col">
                                        <div className="mb-3 mt-4">
                                        <Box>
                                            <div className="box-details">
                                                <h1 className="title">Peridos de trabalho </h1>
                                                 
                                            </div>
                                         </Box>
                                        </div>
                                   </div>



                                <div className="ed-flex flex-start">
                                    <section>
                                       <div className="secondary-container">
                                            <Box className='boxItem'>
                                            <div className="box-details">
                                                <div className="ed-space">
                                                    <div><h1 className="title">Tarefas do dia</h1></div>
                                                    <div>
                                                        <button className="btn btn-circle text-main-light"><AddOutlined /></button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <EmployeeTaskGrid employeeid={id}  />
                                                </div>
                                            </Box>
                                        <div className="mt-4">
                                            <Box className='boxItem'>
                                                <div className="box-details">
                                                <h1 className="title">Trabalhos realizados</h1>  
                                                </div>
                                                <EmployeeLatestWorksGrid  employeeid={id} />
                                            </Box>
                                        </div>
                                    </div>
                                  </section>
                                  <div className="pd-3"></div>
                                  <section className='col' >
                                  <div className="mt-4">
                                    <div className="mt-4">
                                       <SingleEmployeeAttendanceTable employeeid={id} />
                                    </div>
                                </div>
                                <div className="table-box">
                                   <SingleEmployeeRequests employeeid={id} />
                                </div>
                                  </section>
                                </div> 
                            </div>
                            <br /> 
                        </div> 
                   </Container>
                )
        }else{
            return (
                <NotFounded />
            )
        }
      }else{
        return(
            <div className="loader-content-box">
               <Loader absolute small/>
            </div>
         )
      }
 }
}


const Container = styled.div`
     width:100%;  
     max-height:100vh;    

     .container-content{ 
        width:100%;

         .main-container{ 
             width:100%; 

             table .ed-space span{
                color:var(--ed-grey-text);
             }

             .cover-details-box{
                width:100%;
                overflow:hidden;

                .cover-box{
                    height:200px;
                    width:100%;
                    position:relative;
                    border-radius:6px;
                    background:var(--ed-purple);

                     img{
                        border-radius:6px;
                        background:var(--ed-purple);
                        width:100%;
                        height:100%;
                        object-fit:cover;
                     }

                     .cover-over{
                        height:200px;
                        width:100%;
                        position:absolute;
                        border-radius:6px;
                        top:0px;
                        left:0px;
                        background:var(--ed-trp-1);
                        display:flex; 
                        justify-content:flex-end;

                           ul{
                             padding:20px;
                             margin:0px;
                             display:flex;

                               a{
                                width:40px;
                                height:40px;
                                margin-left:10px;

                                li{
                                    width:40px;
                                    height:40px;
                                    display:flex;
                                    align-items:center;
                                    justify-content:center;
                                    margin:0px; 
                                    background:var(--ed-trp-3);
                                    list-style:none;
                                    border-radius:6px;

                                      svg{
                                        width:22px;
                                        height:22px;
                                        color:var(--ed-white);
                                      }
                                  }
                               }
                           }
                     }
                }

                .emp-dets{
                    padding:0px 20px;
                    margin-top:-95px;
                    z-index:100;
                    position:relative;

                    .avatar-box{
                         border:6px solid var(--ed-white);
                         border-radius:100%;
                         background:var(--ed-white);
                         box-shadow:var(--ed-shadow-df);
                    }

                    .block-dets{
                         padding-left:20px;
                         color:var(--ed-white);

                          .name{
                             font-size:20px;
                          }


                    }
                }

                .details-box{
                     padding:20px;
                     min-height:200px;

                       
                }


           }
        }

    

        .secondary-container{
            min-width:350px;
            width:350px;
            min-height:400px; 

              .boxItem{
                  min-height:300px;
              }
        }


     }
`;


const Box = styled.div` 
   min-width:100px;
   border-radius:6px; 
   min-height:100px;
   margin:15px 0px !important;
   background:var(--ed-white);  
   box-shadow:var(--ed-shadow-df);  

    .box-details{
        padding:20px;

        h1.title{
            font-size: 18px;
            font-weight: 600;
            margin: 0px;
          }
    }

    .btn.btn-circle{
        width:40px;
        height:40px;
        border-radius:100%;
        border:1px solid var(--ed-purple-light) !important;
        display:flex;
        align-items:center;
        justify-content:center;
    }
`;

export default EmployeeInformation
