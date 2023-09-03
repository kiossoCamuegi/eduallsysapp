import axios from 'axios';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { Table } from 'react-bootstrap';
import Hoot from '../../../General/components/Hoot';
import { GetSchoolNotes, GetSubject } from '../../../General/components/InstituteData';
const TABLEURL = [
    Hoot()+"eduallgetstudentsbyclass/", 
    Hoot()+"eduallsingleclassapi/get/"
];


const PdQuarterNotesTable = forwardRef((props, ref)=> {
  const [students, SetStudents] = useState([]);
  const [CurrentSubjects , SetCurrentSubjects]= useState([]); 
  const Class = props.Filters.class ? props.Filters.class : 0;
  const Quarter = props.Filters.quarter ? props.Filters.quarter : 0; 
  const [load, setLoaded] = useState(false);
   
 

    const loadData = async ()=>{ 
     try {
      setLoaded(false);
      const [response ,response2 ]= await Promise.all([axios.get(TABLEURL[0]+Class), axios.get(TABLEURL[1]+`${Class}`)]); 
       SetStudents(response.data);
       setLoaded(true);
       if(Class !== 0) SetCurrentSubjects(response2.data.length >= 1 ? response2.data[0].ed_class_subjects.split(',')  : []); 
     } catch (error) {
        console.log(error);
     }
   };

 
   useImperativeHandle (ref, ()=>({
    RunGetNotes(){ 
       loadData(); 
       console.log("Running the function....")
    }
  }))
  
  useEffect(()=>{ 
    loadData(); 
  },[]);

  return (
    <div> {load  ?
      <Table striped responsive bordered>
      <thead>
         <tr className='text-center'>
            <th style={{verticalAlign :"middle"}} className='text-center' rowSpan="2">Nº</th>
            <th style={{minWidth:'300px',verticalAlign:"middle"}}  className='text-left' rowspan="2">Nome do aluno</th> 
            {CurrentSubjects.map((item, index)=>{
                 return <th  colspan="4"><GetSubject ID={item} /></th>  
             })}  
         </tr>
         <tr className='text-center'>
           {
               CurrentSubjects.map((item, index)=>{
                   return(
                       <>
                       <th>MAC</th>
                       <th>NPP</th>
                       <th>NPT</th>
                       <th>MT</th>  
                       </>
                   )
               })
           }
         </tr>  
       </thead>
         <tbody>
         { 
             students.map((item, index)=>{ 
                 return <tr>
                        <td className='text-center'>{index+1}</td>
                        <td className='text-left'>{item.ed_student_name} </td>  
                        {CurrentSubjects.map((sub, ind)=>{
                           return<> 
                               <td className='text-center'>{item.ed_student_id  !== null ? <GetSchoolNotes quarter={Quarter} student={item.ed_student_id ? item.ed_student_id : 0} class={Class} subject={sub} type={1} />: <span className='text-warning'>#</span>}</td>
                               <td className='text-center'>{item.ed_student_id  !== null ? <GetSchoolNotes quarter={Quarter} student={item.ed_student_id ? item.ed_student_id : 0} class={Class} subject={sub} type={2} />: <span className='text-warning'>#</span>}</td>
                               <td className='text-center'>{item.ed_student_id  !== null ? <GetSchoolNotes quarter={Quarter} student={item.ed_student_id ? item.ed_student_id : 0} class={Class} subject={sub} type={3} />: <span className='text-warning'>#</span>}</td>
                               <td className='text-center'>{item.ed_student_id  !== null ? <GetSchoolNotes quarter={Quarter} student={item.ed_student_id ? item.ed_student_id : 0} class={Class} subject={sub} type={4} />: <span className='text-warning'>#</span>}</td> 
                           </>
                       })} 
                     </tr>   
               })
           }
         </tbody>
       </Table>
    : <></>}
    </div>
  )
})

export default PdQuarterNotesTable