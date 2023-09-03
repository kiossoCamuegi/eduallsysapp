import { Check, Close, Delete, Edit, InfoOutlined } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Badge, Form } from 'react-bootstrap';
import styled from 'styled-components'
import DatePickerBox from '../../../../General/components/DatePickerBox';
import Hoot from '../../../../General/components/Hoot';
import { ClassDataOptions, GetClasstitle_byclass, GetStudentNameAndPicture, GetSubject, GetTime, SubjectDataOptions } from '../../../../General/components/InstituteData';
import TableGrid from '../../../../General/components/TableGrid';
import AttendanceModal from './SubTabs/Modal/AttendanceModal';
import CRValue from '../../../../General/components/CRValue';
import axios from 'axios';
import DeleteModal from '../../../../Dashboard/components/elements/DeleteModal';
import { Refresh } from '@material-ui/icons';


const StatusType = [
   <div className="ml-2"><Badge bg={'success'}><Check/> Presente</Badge></div>,
   <div className="ml-2"><Badge bg={'danger'}> <Close/> Ausente</Badge></div>,
   <div className="ml-2"><Badge bg={'warning'}><InfoOutlined/> Atrasado</Badge></div>
];

const columns = [ 
  { 
    field: 'student',
    headerName: 'Nome do aluno',
    resizable: true, 
    width:300,
    cellRenderer:(props)=>{
        return  <GetStudentNameAndPicture size={40} ID={props.data.student} />
    } 
  },
  {
    field: 'status',
    width:180,
    headerName: 'Status',
    resizable: true,
     cellRenderer:(props)=>{ 
      return <div className='ed-flex'> {StatusType[props.data.status]} </div>
    }
  }, 
  {
   field: 'timing',
   width:180,
   headerName: 'Horário',
   resizable: true,
    cellRenderer:(props)=>{
     return  <GetTime  ID={props.data.timing}  />
   }
   }, 
   {
    field: 'date',
    width:180,
    headerName: 'Data',
   }, 
   {
    field: 'action',
    headerName: 'Marcar',
    resizable: true,
     cellRenderer:(props)=>{
      return  <div className="ed-flex">
       <AttendanceModal data={props.data.Data.data} timings={props.data.Data.timings}  title='Atualizar ' update='true' get={Hoot()+`eduallgetsinglestudentattendance/get/${props.data.id}`}  
       url={Hoot()+`eduallstudentattendanceupdate/update/${props.data.id}`} 
        toggle_btn={
         <button className="btn-circle btn-edit-timing bg-success text-light">
            <Edit/>
          </button> 
        }
      />
     <DeleteModal title='esta informação' url={Hoot()+`eduallstudentattendancedelete/delete/${props.data.id}`} 
        message='Marcação de presença deletado com sucesso' toggle_btn={
         <button className="btn-circle btn-delete-timing bg-danger ml-2 text-light">
         <Delete/>
     </button>
        }/> 
  </div> ; 
    }

  },   
]; 

function TeacherAttendanceTabItem(props) {
   const [data, setData] = useState([]); 
   const [AttendanceGender, setAttendanceGender] = useState(null);
   const [AttendanceClass, setAttendanceClass] = useState(null);
   const [AttendanceSubject, setAttendanceSubject] = useState(null);
   const [DT,SetDT] = useState([]);
   const [load, setLoaded] = useState(false);


   console.log(props);

    
  const TABLEURL = [
      Hoot()+'eduallgetstudentsbyclass/',
      Hoot()+'eduallgetstudentattendancebyteacherclassandsub/get/',
      Hoot()+'',  
  ];
   
   async function loadData(C, CS, G){ 
      let students = {data:[], dataFilter:[]};    
      setLoaded(false); 
      try {
          if(CS !== null && CS !== undefined && C !== null && G !== null && C !== undefined && G !== undefined){
            const response  = await axios.get(TABLEURL[1]+CS);  
     
            response.data.map((item,index)=>{
                 console.log(item);
                 students.data.push(item);
            });  
            students.data.map((item)=>{
                students.dataFilter.push({ 
                    id:item.ed_student_attd_id,
                    student:item.ed_student_attd_student_code,  
                    timing:item.ed_student_attd_timing,
                    date:item.ed_student_attd_date,
                    status:item.ed_student_attd_status,
                    action:true,
                    Data:{data:props.Data.data,timings:props.Data.timings}
                 });
            });
          }  
      } catch (error) {
         console.log(error);
      }
       setData(students.dataFilter);
       setLoaded(true); 
   }
 
 
   useEffect(()=>{
      SetDT(props.Data.data);
      setTimeout(() => {
         loadData(
            CRValue("#student_attendance_classSub").split("|")[0], 
            CRValue("#student_attendance_classSub").split("|")[1], 
            CRValue("#student_attendance_gender")  
         ); 
      }, 500);
     document.querySelector("#student_attendance_date").valueAsDate = new Date();
   },[]);
   
   const handleInput = (e)=>{   
      e.preventDefault();
      switch (e.target.id) {  
         case "student_attendance_classSub": 
              loadData(
                  e.target.value.split("|")[0], 
                  e.target.value.split("|")[1], 
                 CRValue("#student_attendance_gender")   
              ); 
         break; 
         case "student_attendance_gender": 
         loadData(
            CRValue("#student_attendance_classSub").split("|")[0], 
            CRValue("#student_attendance_classSub").split("|")[1], 
            CRValue("#student_attendance_gender")  
         ); 
       break;   
       default:      
      } 
   }

 
   return (
      <Container>
         <div className="top-container">
             <Box>
                <div className="ed-space">
                   <div><h1>Marcar presença</h1></div>
                   <div>
                       <AttendanceModal data={props.Data.data} timings={props.Data.timings} />
                   </div>
                </div>
                <AttendanceBox>
                   <FilterBox>
                        <Form>
                         <div>
                            <DatePickerBox/>
                         </div>
                            <Form.Group>
                               <Form.Label>Turma</Form.Label>
                               <Form.Select id='student_attendance_classSub' onChange={handleInput}>
                               {DT.map((item, index)=>{
                                  return(<option value={item.ed_tch_subject_class + "|"+ item.ed_tch_subject_id}> 
                                      Turma - <GetClasstitle_byclass ID={item.ed_tch_subject_class} /> 
                                       ( <GetSubject ID={item.ed_tch_subject_code} /> )
                                   </option>)
                              })} 
                               </Form.Select>
                            </Form.Group>  
                            <Form.Group className='mt-4'>
                               <Form.Label>Data</Form.Label>
                               <Form.Control type='date' id='student_attendance_date' onChange={handleInput}/>
                            </Form.Group>
                            <Form.Group className='mt-4'>
                               <Form.Label>Horário</Form.Label>
                               <Form.Select id='student_attendance_timing' onChange={handleInput}>
                               {props.Data.timings.map((item, index)=>{
                                  return(
                                  <option value={item.ed_tch_timing_code}> 
                                        <GetTime ID={item.ed_tch_timing_code}/> 
                                   </option>)
                                  })
                                 }
                               </Form.Select>
                            </Form.Group>
                        </Form>
                   </FilterBox>
                  <div className='col'>
                   <div className='d-none'>
                     <button className="btn table-btn-small el-refresh-list bg-main-light  ml-2"
                        onClick={()=>loadData(
                        CRValue("#student_attendance_classSub").split("|")[0], 
                        CRValue("#student_attendance_classSub").split("|")[1], 
                        CRValue("#student_attendance_gender")  
                     )}><Refresh/></button> 
                     </div>
                     <div className="table-box-area">
                        {load ? 
                           <TableGrid 
                              TableHead={columns}
                              TableBody={data} 
                              TableHeight={600}
                              TableTitle="" />
                         :
                          <>
                             <div className="d-none"><h1>*</h1></div>
                             <TableGrid 
                              TableHead={columns}
                              TableBody={[]} 
                              TableHeight={600}
                              TableTitle=""/>
                          </>
                        }
                      </div> 
                  </div>
                </AttendanceBox>
             </Box>
         </div>
         <br />
      </Container>
   );
   
   
}

export default TeacherAttendanceTabItem


const Container = styled.section`
     display:block;
     width:100%;
     padding:0px 20px;

     .top-container{
         margin-top:-90px;
         z-index:100;
     }  
`;

const AttendanceBox = styled.div`
  display:flex;
  width:100%;
`;

const FilterBox = styled.section`
   width:330px;
   min-width:330px;
   padding-right:40px;
`;

const Box = styled.div`
   width:100%;
   border-radius:6px; 
   min-height:90px; 
   background:var(--ed-white);  
   box-shadow:var(--ed-shadow-df); 
   padding:20px;
   position: relative; 

    .ed-space{
        h1{
          font-size:22px;
          font-weight:600;
          margin:0px;
        }
    }

   .custom-table{
       box-shadow:none !important;
   }
`
