import { Edit } from '@mui/icons-material';
import React, { useEffect, useImperativeHandle, useState } from 'react'
import { Table } from 'react-bootstrap'
import axios from "axios";
import Hoot from '../../../General/components/Hoot'; 
import { GetSchoolNotes, GetStudentName } from '../../../General/components/InstituteData';
import { forwardRef } from 'react';
import FloorNumber from '../../../General/components/FloorNumber';
const TABLEURL = [
  Hoot()+"eduallgetstudentsbyclass/", 
]; 
  


const QuarterlyNotesTable = forwardRef((props, ref)=>{ 
  const [students, SetStudents] = useState([]); 
  const Class =   props.Filters.class ? props.Filters.class : 0;
  const Subject = props.Filters.subject ? props.Filters.subject : 0;
  const Quarter = props.Filters.quarter ? props.Filters.quarter : 0;

  async function loadData(){
     try {
       const response = await axios.get(TABLEURL[0]+Class); 
       console.log(response.data);
       SetStudents(response.data); 
     } catch (error) {
        console.log(error);
     }
  }
 
  
 useImperativeHandle(ref, ()=>({
    RunGetNotes(){ 
       loadData(); 
       console.log("Running the function....")
    }
  }))

  useEffect(()=>{ 
    loadData(); 
  },[]);

 
 const Quarters = ["Iº Trimestre", "IIº Trimestre", "IIIº Trimestre"];
  return (
    <div>
         <Table striped responsive bordered  >
       <thead>
          <tr className='text-center'>
             <th rowSpan="2"  style={{verticalAlign :"middle"}} >Nº</th>
             <th rowspan="2"  style={{verticalAlign :"middle"}}>Nome do aluno</th> 
             <th  colspan="5">{Quarters[Math.floor(props.Filters.quarter)-1]}</th> 
          </tr>
          <tr className='text-center'>
            <th>MAC1</th>
            <th>NPP1</th>
            <th>NPT1</th>
            <th>MT1</th>
            <th>Aproveito</th> 
          </tr>
        </thead>
          <tbody>
          { 
              students.map((item, index)=>{ 
                  return   <tr>
                         <td className='text-center'>{index+1}</td>
                         <td className='text-left'>{item.ed_student_name} </td> 
                         <td><div className="text-center">{item.ed_student_id  !== null ? <GetSchoolNotes quarter={Quarter}  class={Class} student={item.ed_student_id ? item.ed_student_id : 0} subject={Subject} type={1} />: <span className='text-warning'>#</span>}</div></td>
                         <td><div className="text-center">{item.ed_student_id  !== null ? <GetSchoolNotes quarter={Quarter}  class={Class} student={item.ed_student_id ? item.ed_student_id : 0} subject={Subject} type={2} />: <span className='text-warning'>#</span>}</div></td>
                         <td><div className="text-center">{item.ed_student_id  !== null ? <GetSchoolNotes quarter={Quarter}  class={Class} student={item.ed_student_id ? item.ed_student_id : 0} subject={Subject} type={3} />: <span className='text-warning'>#</span>}</div></td>
                         <td><div className="text-center">{item.ed_student_id  !== null ? <GetSchoolNotes quarter={Quarter}  class={Class} student={item.ed_student_id ? item.ed_student_id : 0} subject={Subject} type={4} />: <span className='text-warning'>#</span>}</div></td>
                         <td><div className="text-center">{item.ed_student_id  !== null ? <GetSchoolNotes quarter={Quarter}  class={Class} student={item.ed_student_id ? item.ed_student_id : 0} subject={Subject} type={5} />: <span className='text-warning'>#</span>}</div></td>   
                     </tr>   
                })
            }
          </tbody>
        </Table>
    </div>
  )
});

export default QuarterlyNotesTable