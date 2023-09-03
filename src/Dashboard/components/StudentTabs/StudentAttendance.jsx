import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Badge } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Hoot from '../../../General/components/Hoot';
import TableGrid from '../../../General/components/TableGrid';
import { GetSubject, GetTime } from '../../../General/components/InstituteData';
import { Check, Close, InfoOutlined, Refresh } from '@mui/icons-material';


const StatusType = [
  <div className="ml-2"><Badge bg={'success'}><Check/> Presente</Badge></div>,
  <div className="ml-2"><Badge bg={'danger'}> <Close/> Ausente</Badge></div>,
  <div className="ml-2"><Badge bg={'warning'}><InfoOutlined/> Atrasado</Badge></div>
];

const columns = [ 
  { 
    field: 'index',
    headerName: 'Nº',
    resizable: true, 
    width:90, 
  },
  {
    field: 'status',
    width:180,
    headerName: 'Status',
    resizable: true,
     cellRenderer:(props)=>{ 
      return <div className='ed-flex'>{StatusType[props.data.status]}</div>
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
     field: 'subject',
     width:180,
     headerName: 'Disciplina',
     resizable: true,
      cellRenderer:(props)=>{
       return  <GetSubject  ID={props.data.subject}  />
     }
     }, 
   {
    field: 'date',
    width:180,
    headerName: 'Data',
   },    
]; 

function StudentAttendance(props) {
  const [data, setData] = useState([]); 
  const [Loaded, setLoaded] = useState(false);
     
  async function loadData(){ 
    setLoaded(false);   
       try {
         const response = await axios.get(Hoot()+"eduallgetallstudentattendance/get/"+props.data.ed_student_id +","+props.data.ed_student_class);
         let students = [];    
          response.data.map((item, index)=>{
             students.push({ 
                 index:index+1,
                 id:item.ed_student_attd_id,
                 student:item.ed_student_attd_student_code,  
                 timing:item.ed_student_attd_timing,
                 date:item.ed_student_attd_date,
                 status:item.ed_student_attd_status,
                 subject:item.ed_student_attd_subject,
                 action:true, 
               });
         });
        setData(students);
       } catch (error) {
        
       } 
    setLoaded(true); 
 }

  useEffect(()=>{
   loadData();
  }, []);

  return (
    <div>
      {Loaded  ?
      <> 
       <div className="d-none"> * </div>
       <TableGrid TableHead={columns} TableBody={data}  TableHeight={500} 
       TableTitle="Presença escolar do aluno na turma"  
       /> 
      </> 
        :
        <TableGrid TableHead={columns} TableBody={[]}  TableHeight={500} 
        TableTitle="Presença escolar do aluno na turma" /> 
      }
    </div>
  )
}

export default StudentAttendance