import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components';
import ParentPortalSidebar from './Components/ParentPortalSidebar';
import UserNavbar from '../Components/UserNavbar';
import { Avatar } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import ReduceTextLength from '../../General/components/ReduceTextLength';
import PP_resume from './Pages/PP_resume';
import PP_attedance from './Pages/PP_attedance';
import PP_behavier from './Pages/PP_behavier';
import PP_calendar from './Pages/PP_calendar';
import PP_marks from './Pages/PP_marks';
import axios from 'axios';
import Hoot from '../../General/components/Hoot';
import moment from 'moment';
import NoData from '../../General/components/NoData';
import PP_classmates from './Pages/PP_classmates';
import Loader from '../../General/components/Loader';

function ParentPortal({userdata}) {
  document.title = "Portal do encarregado";
   const {CHILDID} = useParams();
   const [ActiveTab, setActiveTab] = useState(0);
   const [CurrentStudent, setCurrentStudent] = useState({});
   const [ActiveStudent, SetActiveStudent] = useState(null);
   const [Founded, setFounded] = useState(null);
   const [Loaded, setLoaded] = useState(false);
   const [StundentAttendance, setStundentAttendance] = useState([]);
   const [StundentExamsCalendar, setStundentExamsCalendar] = useState([]);
   const [StudentInstitute, setStudentInstitute] = useState({});

  const DATAURL = [
      Hoot()+"eduallgetallstudentattendance/get/",
      Hoot()+"eduallgetsingleinstitutebycode/get/",
      Hoot()+"eduallstudentexamcalendargetbyclass/get/",
      Hoot()+"eduallgetallstudentattendance/get/",
      Hoot()+"eduallupdatecurrentinstitutecode/post"
  ];

 const LoadData = async(e)=>{  
    await axios.post(DATAURL[4] ,{CODE:e.ed_student_institute_code}).then((a)=>{   
        const GetData = async()=>{
        
          try {
            setStundentAttendance([]);
            const [response1, response2, response3] = await Promise.all([
                  axios.get(DATAURL[0]+e.ed_student_id+","+e.ed_student_class),
                  axios.get(DATAURL[1]+e.ed_student_institute_code),
                  axios.get(DATAURL[2]+e.ed_student_class),
            ]); 
            setStundentAttendance(response1.data);
            setStudentInstitute(response2.data.length >= 1 ? response2.data[0] : {});

            console.clear();
            console.log(DATAURL[1]+e.ed_student_institute_code);

            const rows = [];
            response3.data.map((item, index)=>{  
              rows.push({
                   title:item.ed_subject_title,
                   start: moment(item.ed_student_exam_date).format("YYYY-MM-DD HH:mm:ss"),  
                   end:moment(item.ed_student_exam_date).format("YYYY-MM-DD HH:mm:ss"),  
                })
            }); 
            setStundentExamsCalendar(rows);
            setCurrentStudent(e);
            setFounded(true);
            setLoaded(true);
          }catch(error){
             console.log(error);
             setFounded(false);
             setLoaded(false);
          }
        }
       GetData();
       }).catch((error)=>{ 
         console.log(error);
         setFounded(false);
         setLoaded(false);    
     });  
 }



const GetData = (ID)=>{
  SetActiveStudent(null);
  setCurrentStudent(null);
  setStundentAttendance([]); 
  const students = {codes:[], data:[]};
    if(userdata.user_childs && userdata.user_childs.length >= 1){ 
      userdata.user_childs.map((item, index)=>{
        students.codes.push(item.ed_student_id*1);
        students.data.push(item)
      });
      if(students.codes.includes(ID*1)){
         for (let i = 0; i < students.data.length; i++){ 
            if(students.data[i].ed_student_id*1 === ID*1){ 
              LoadData(students.data[i]); 
            }else{ 
              setFounded(false);
            }
         }
      }else{ 
        LoadData(userdata.user_childs[0]);  
      }
    }else{
        setFounded(false);
    } 
    SetActiveStudent(ID);
}

 useEffect(()=>{
  GetData(CHILDID);
 },[]); 


const Run = (e)=>{
  setActiveTab(e);
}


if(Founded){ 
 if(Loaded){
  return (
    <div>
      <UserNavbar data={userdata} /> 
      <Container>
        <ParentPortalSidebar ChangeStudent={GetData} ChangeTabPage={Run} ActiveStudent={ActiveStudent} ActiveTab={ActiveTab} data={userdata}/>
        <Content> 
          {ActiveTab <= 4 ?
            <Box>
            <div className="box-content">
                <div className="ed-flex ed-student-details">
                  <Avatar src={Hoot()+CurrentStudent.ed_student_picture}  sx={{width:130,height:130}}  />
                  <div className="ed-block">
                        <h1 className="name">{CurrentStudent.ed_student_name}</h1>
                        <div className="code"><span>Nº de matricula : {CurrentStudent.ed_student_id}</span></div>
                        <Link to={`/institute_blog/${StudentInstitute.ed_institute_code}`} className="text-main-light">
                            <div className="ed-institute ed-flex">
                                <Avatar variant="rounded"  src={Hoot()+StudentInstitute.ed_institute_logo} sx={{width:30,height:30}}  />
                                <div className="ml-2"><ReduceTextLength text={`${StudentInstitute.ed_institute_name}`} length="55" /></div>
                            </div>
                        </Link> 
                  </div>
                </div>
                <ul className="box-content-tabs">
                  <li className={`${ActiveTab === 0 ? "bg-main-light text-light" : ""}`}  onClick={()=>setActiveTab(0)}>Resumo</li> 
                  <li className={`${ActiveTab === 1 ? "bg-main-light text-light" : ""}`}  onClick={()=>setActiveTab(1)}>Notas</li> 
                  <li className={`${ActiveTab === 2 ? "bg-main-light text-light" : ""}`}   onClick={()=>setActiveTab(2)}>Presença escolar</li> 
                  <li className={`${ActiveTab === 3 ? "bg-main-light text-light" : ""}`}   onClick={()=>setActiveTab(3)}>Comportamento</li> 
                  <li className={`${ActiveTab === 4 ? "bg-main-light text-light" : ""}`}   onClick={()=>setActiveTab(4)}>Calendário de aulas</li> 
                </ul>
            </div>
          </Box> : <></>}
          {(ActiveStudent !== null  && CurrentStudent !== null)  ? 
          <div className="content-tabs mt-4">
              <section className={`${ActiveTab === 0 ? "sec_tab active" : "sc_tab"}`}> 
                <PP_resume data={{student:CurrentStudent, institute:StudentInstitute}} />
              </section>
              <section className={`${ActiveTab === 1 ? "sec_tab active" : "sc_tab"}`}> 
                <PP_marks data={{student:CurrentStudent, institute:StudentInstitute}} />
              </section>
              <section className={`${ActiveTab === 2 ? "sec_tab active" : "sc_tab"}`}> 
                <PP_attedance data={{Data:StundentAttendance}} />
              </section>
              <section className={`${ActiveTab === 3 ? "sec_tab active" : "sc_tab"}`}> 
                <PP_behavier data={[]} />
            </section>
            <section className={`${ActiveTab === 4 ? "sec_tab active" : "sc_tab"}`}> 
              <PP_calendar data={[]} />
            </section> 
            <section className={`${ActiveTab === 4 ? "sec_tab active" : "sc_tab"}`}> 
              <PP_classmates data={[]} />
            </section> 
          </div> 
          : <></>} 
        </Content> 
      </Container>  
    </div>
  );
 }else{
  return (
    <div>
    <UserNavbar data={userdata} /> 
       <Content>
          <NoData />
       </Content> 
    </div>
  );
 }
}else{ 
  return (
    <div>
    <UserNavbar data={userdata} /> 
       <Content>
          <Loader />
       </Content> 
    </div>
  );
}

 
}

const Container = styled.div`
   display:flex; 
`;

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

const Box = styled.div`
    background:var(--ed-white); 
    border-radius:6px; 
    box-shadow:var(--ed-shadow-df);
    min-width:100px;

    .box-content{
          padding:20px;
    }
`;


export default ParentPortal
