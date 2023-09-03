

import React, { useEffect } from 'react'
import UserNavbar from '../Components/UserNavbar'
import styled from 'styled-components';  
import SidebarLeft from './Components/SidebarLeft';
import { Link, useParams } from 'react-router-dom';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';
import { Avatar } from '@mui/material';
import { useState } from 'react';
import TeacherDashboardTabItem from './Components/Tabs/TeacherDashboardTabItem';
import TeacherStudentMarksTabItem from './Components/Tabs/TeacherStudentMarksTabItem';
import TeacherClassesTabItem from './Components/Tabs/TeacherClassesTabItem';
import TeacherTasksAnProjectsTabItem from './Components/Tabs/TeacherTasksAnProjectsTabItem';
import TeacherStudentContentTabItem from './Components/Tabs/TeacherStudentContentTabItem';
import TeacherAttendanceTabItem from './Components/Tabs/TeacherAttendanceTabItem';
import TeacherSettingsTabItem from './Components/Tabs/TeacherSettingsTabItem';
import TeacherSchedulerTabItem from './Components/Tabs/TeacherSchedulerTabItem'; 
import axios from 'axios';
import jwt_decode from 'jwt-decode';  
import Hoot from '../../General/components/Hoot';
import TeacherContinuousEvaluation from './Components/Tabs/TeacherContinuousEvaluation';
import { GetClasstitle_byclass, GetSubject } from '../../General/components/InstituteData';
import { Badge } from 'react-bootstrap';
import Slider from "react-slick";
import SliderComponent from './Components/SliderComponent';
import Loader from '../../General/components/Loader';
import NoData from '../../General/components/NoData'; 

function EmployeeDashboard(props) {
  const [ActiveTab, SetActiveTab] = useState(1);
  const Data = props.userdata.user_Information;
  const Institutes = props.userdata.user_institutes;
  const [UserData, setUserData] = useState({}); 
  const [TeacherData, setTeacherData] = useState({ClassList:[], SubjectsList:[], teacherCode:null, data:[]});
  const [Loaded, setLoaded] = useState(false);
  const [Founded, setFounded] = useState(false);
 const [CurrentInstitute, SetCurrentInstitute] = useState("");


  const DATA_URL = [
     Hoot()+'eduallsingleuserdata/get/',
     Hoot()+'token',
     Hoot()+'eduallgetteachersubjects/get/',
     Hoot()+'eduallgetallteachertiming/get/',
     Hoot()+"eduallupdatecurrentinstitutecode/post"
  ];

  const {INSTITUTECODE} =  useParams();  
  console.log(Data);


  const CheckCurrentInstitute = async()=>{
    const CODES = [];
     for (let i = 0; i < Institutes.length; i++) {
         CODES.push(Institutes[i].ed_user_institute_code.toLowerCase())
          if(Institutes[i].ed_user_institute_code.toLowerCase() === INSTITUTECODE.toLowerCase()){
             SetCurrentInstitute(Institutes[i].ed_institute_name);
          }
     }

     
     console.clear()
     console.log(CODES);

     if(CODES.includes(INSTITUTECODE.toLowerCase())){ 
        await axios.post(DATA_URL[4] ,{CODE:INSTITUTECODE}).then((e)=>{   
            loadData();   
         }).catch((error)=>{ 
            setLoaded(true);
            setFounded(false);    
         });  
     }else{ 
        setLoaded(true);
        setFounded(false);
     }
  } 
 
 

  async function loadData(){ 
    try {       
        setUserData({
            email:Data.ed_user_account_email,
            phone:Data.ed_userphone,
            picture:Hoot()+Data.ed_user_account_picture,
            code:Data.ed_user_account_id,
            name:Data.ed_user_account_name,
            firstname:Data.ed_user_account_name.split(' ')[0],
            firstlastname:Data.ed_user_account_name.split(' ')[0] + ' '+  Data.ed_user_account_name.split(' ')[Data.ed_user_account_name.split(' ').length -1],
            lettername:Data.ed_user_account_name.split(' ')[0].split('')[0].toUpperCase()+Data.ed_user_account_name.split(' ')[Data.ed_user_account_name.split(' ').length -1].split('')[0].toUpperCase()
        }); 
        document.title = "Dashboard professor(a) - "+Data.ed_user_account_name;
        const response2 = await axios.get(DATA_URL[2]+Data.ed_user_account_id); 
            const subjects = [];
            const classes = []; 
            response2.data.map((item, index)=>{
                subjects.push(item.ed_tch_subject_code); 
                classes.push(item.ed_tch_subject_class); 
            });  

        const response3 = await axios.get(DATA_URL[3]+Data.ed_user_account_id); 
        setTeacherData({ClassList:classes, SubjectsList:subjects, teacherCode:Data.ed_user_account_id, data:response2.data, timings:response3.data}); 
        setLoaded(true);
        setFounded(true);
    } catch (error) { 
        setLoaded(true);
        setFounded(false);
        console.log(error);
    }
 };
 
   


  useEffect(()=>{
    CheckCurrentInstitute();
  },[]);


  const ChangeActiveTab=(e)=>{
      SetActiveTab(e);
  }


  return (
    <div className="eduall-network">
        <UserNavbar data={props.userdata} />  
        <SidebarLeft/>
           {Loaded  ?
             <>
                {Founded ? 
                  <>
                   <ContainerBox>
                        <section>
                        <div className="container-header"> 
                            <div className="block-content">
                                <div className="ed-space">
                                    <div className="block"> 
                                        <div className="ed-flex info-block mb-2">
                                        <Link to="/profile"><Avatar src={UserData.picture} alt={UserData.lettername} sx={{width:85,height:85}} /></Link>
                                            <div className="block ml-2">
                                                <span className='ed-flex'>Nome  : <Link to="/"><div className=" ml-2 text-main-light">{UserData.firstlastname}</div></Link> </span>
                                                <span className="ed-flex mt-2">Função : <div className="ml-2 text-silver">Professor (a)</div></span> 
                                                <small><div className="text-danger mt-2">{CurrentInstitute}</div></small>
                                            </div>
                                        </div>
                                        <div className="sbj">
                                        {TeacherData.data.length >= 1  ? 
                                            <div className='ed-wrap mb-4'>
                                            < >
                                            {TeacherData.data.map((item, index)=>{
                                                return(
                                                <div  key={index} >
                                                    <div style={{background:'#24396a'}} className='badge mr-2 pd-1 mt-2'> 
                                                        Turma - <GetClasstitle_byclass ID={item.ed_tch_subject_class} />  
                                                        (<GetSubject ID={item.ed_tch_subject_code} /> )
                                                    </div> 
                                                </div>
                                                )
                                            })} 
                                            </> 
                                            </div>
                                            :
                                            <></>
                                            }
                                        </div> 
                                        <h2>Bem vindo de volta , Prof. {UserData.firstname}</h2>
                                        <small>comece por  verificar os seus trabalhos  e tarefas do dia.</small>
                                    </div>
                                    <div className="block text-right"> 
                                        <div onClick={()=>ChangeActiveTab(7)} className="ed-flex cursor-pointer">Configurações <div className="ml-2"><SettingsOutlinedIcon/></div> </div> 
                                        <ul className='ed-wrap'>
                                            <li onClick={()=>ChangeActiveTab(9)} className='mr-4 bg-white text-main-light'><CloudDownloadOutlinedIcon  />  Baixar relatorio</li> 
                                            <li onClick={()=>ChangeActiveTab(8)} className='bg-main-light' ><CalendarMonthOutlinedIcon/>10 de junho de 2022<div className="ml-2"><NavigateNextOutlinedIcon/></div> </li> 
                                        </ul>
                                    </div>
                                </div>
                                <ul className="header-tab ed-wrap">
                                    <li onClick={()=>ChangeActiveTab(1)} className={ActiveTab === 1 ? 'active text-main-light' : ''}>Dashboard</li>
                                    <li onClick={()=>ChangeActiveTab(2)} className={ActiveTab === 2 ? 'active text-main-light' : ''}>Lançar notas</li>
                                    <li onClick={()=>ChangeActiveTab(3)} className={ActiveTab === 3 ? 'active text-main-light' : ''}>Lista de controle</li>
                                    <li onClick={()=>ChangeActiveTab(4)} className={ActiveTab === 4 ? 'active text-main-light' : ''}>Material didatico</li>
                                    <li onClick={()=>ChangeActiveTab(5)} className={ActiveTab === 5 ? 'active text-main-light' : ''}>Turmas</li>
                                    <li onClick={()=>ChangeActiveTab(6)} className={ActiveTab === 6 ? 'active text-main-light' : ''}>Tarefas e projectos</li>
                                    <li onClick={()=>ChangeActiveTab(10)} className={ActiveTab === 10 ? 'active text-main-light' : ''}>Avaliação continua</li>
                                </ul>
                            </div> 
                        </div> 
                            <div className="container-content">
                                <div className={ActiveTab === 1 ? '' : 'd-none'} > 
                                    {ActiveTab === 1 ?   <TeacherDashboardTabItem Data={TeacherData}/> : <></> }
                                </div>
                                <div className={ActiveTab === 2 ? '' : 'd-none'} >
                                    {ActiveTab === 2 ?  <TeacherStudentMarksTabItem Data={TeacherData}/> : <></> }
                                </div>
                                <div className={ActiveTab === 3 ? '' : 'd-none'} > 
                                    {ActiveTab === 3 ?  <TeacherAttendanceTabItem Data={TeacherData}/> : <></> }
                                </div>
                                <div className={ActiveTab === 4 ? '' : 'd-none'} > 
                                    {ActiveTab === 4 ?   <TeacherStudentContentTabItem Data={TeacherData}/> : <></> }
                                </div>
                                <div className={ActiveTab === 5 ? '' : 'd-none'} > 
                                    {ActiveTab === 5 ?  <TeacherClassesTabItem Data={TeacherData}/> : <></> }
                                </div>
                                <div className={ActiveTab === 6 ? '' : 'd-none'} > 
                                    {ActiveTab === 6 ? <TeacherTasksAnProjectsTabItem Data={TeacherData}/> : <></> }
                                </div> 
                                <div className={ActiveTab === 7 ? '' : 'd-none'} > 
                                {ActiveTab === 7 ?    <TeacherSettingsTabItem Data={TeacherData} /> : <></> }
                                </div> 
                                <div className={ActiveTab === 8 ? '' : 'd-none'} > 
                                {ActiveTab === 8 ? <TeacherSchedulerTabItem Data={TeacherData} /> : <></> }
                                </div> 
                                <div className={ActiveTab === 10 ? '' : 'd-none'} > 
                                {ActiveTab === 10 ? <TeacherContinuousEvaluation Data={TeacherData} /> : <></> }  
                                </div> 
                            </div> 
                            <br />
                        </section>
                    </ContainerBox>
                  </> :
                  <>
                     <Content>
                        <NoData />
                    </Content>
                  </>
                }
             </>
           : <>
              <Loader />
           </>} 
    </div>
  )
}


const Content = styled.div`
   display:block;
   padding:20px; 
   width:100%;
   padding-top:90px;
   overflow-y:auto;
   min-height:99vh;
   max-height:99.5vh;
   background:var(--ed-background-color); 
   position:relative;

   
  &&::-webkit-scrollbar{
    width:6px !important;
    background-color:transparent !important;
  }
    
    &&::-webkit-scrollbar-thumb{
        background:rgb(219, 219, 219) !important; 
    }


   .ed-student-details{
           
     .code{
        margin:7px 0px;
        span{
           color:var(--ed-grey-text);
        }
     } 
 

     .ed-block{
        margin-left:20px;
      }
    }

   .box-content-tabs{
        padding:20px 0px;   
        padding-bottom:0px;  
        width:100%;  
        margin:0px;
        display:flex;
        align-items:center; 

         li{ 
            transition:all 1s ease-in-out;
            margin-right:20px;
            font-weight:500;
            cursor:pointer;
            color:var(--ed-dark); 
            padding:10px 20px; 
            border-radius:50px;
            cursor:pointer; 
            display:flex;
            align-items:center;
            border:1px solid  #eaeaee;
        }

     }


   .title, .name{
    font-size: 18px;
    font-weight: 600;
    margin: 0px;
   }

   .sc_tab{
       display:none;
    }

    .sc_tab.active{
        display:block !important;
    }

`;


const ContainerBox = styled.div`
  padding-left:80px;

  .sbj{
    min-height:60px;
  }

   .container-header{
      height:540px;
      width:100%;
      padding:20px;
      padding-top:100px;
      background:#000a2e; 
      color:var(--ed-white);
      

      .block small{
          max-width:200px;
      }

      .block.text-right{
          text-align:right;
          display:flex;
          align-items:flex-end;
          flex-direction:column;

          a{
             color:var(--ed-white);
          }

          ul{
            padding-top:40px;

            li{
              padding:10px 20px; 
              border-radius:50px;
              cursor:pointer; 
              display:flex;
              align-items:center;

                svg{
                    margin:0px;
                    margin-right:7px;
                }
            }
            
             li.blue-link{background:var(--ed-blue-light);}
             li.bg-white{
                svg{
                    fill:var(--ed-dark);
                }
             }
 
            li.mr-4{
               margin-right:20px; 
            }
          }
      }

        .header-tab{
            width:100%;
            padding:20px 0px;
            margin-top:20px;
            border-bottom:1px solid var(--ed-blue-dark);

              
             li.active{ 
                background:var(--ed-white);
             }

             li{
                  padding:10px 20px;
                  margin-right:15px;
                  border-radius:50px;
                  cursor:pointer;
             }
        }
    }
  
`;
 

export default EmployeeDashboard