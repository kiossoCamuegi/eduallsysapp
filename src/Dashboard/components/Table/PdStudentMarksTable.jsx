import axios from 'axios';
import React, { useEffect, useImperativeHandle, useState } from 'react'
import { forwardRef } from 'react';
import { Table } from 'react-bootstrap'
import Hoot from '../../../General/components/Hoot';
import { GetSchoolNotes, GetSubject } from '../../../General/components/InstituteData'
const TABLEURL = [ 
    Hoot()+"eduallsingleclassapi/get/"
];

const  PdStudentMarksTable = forwardRef((props, ref)=>{
  const Class = props.ClassId ? props.ClassId : 0;
  const StudentCode = props.StudentCode ? props.StudentCode : null;  
  const [CurrentSubjects , SetCurrentSubjects]= useState([]); 
  const [load, setLoaded] = useState(false);
  
  async function loadData(){ 
      const response2 = await axios.get(TABLEURL[0]+`${Class}`);
      if(Class !== 0) SetCurrentSubjects(response2.data.length >= 1 ? response2.data[0].ed_class_subjects.split(',')  : []); 
   };

    useEffect(()=>{ 
        loadData(); 
    },[]);  

    useImperativeHandle(ref, ()=>({
    RunGetNotes(){
      console.log("printing the class code : "+Class);
      loadData();
    }
  }))
    
    
  return (
    <div>
        <Table striped={props.nostriped  ? false : true } responsive bordered>
       <thead>
          <tr className='text-left'>
              <th rowSpan="2">Nº</th>
             <th  style={{minWidth:'300px'}} className='text-left' rowSpan="2" >Disciplinas</th>   
             <th colSpan="3" className='text-center' >Notas Trimestrais</th> 
          </tr>  
          <tr className='text-center'>
             <th>Iº</th>
             <th>IIº</th>
             <th>IIIº</th>
          </tr>
        </thead>
          <tbody>
               
               {
               CurrentSubjects.map((item, index)=>{
                  return  <tr>
                       <td>{index+1}</td>
                       <td><GetSubject ID={item} /></td>
                       <td className='text-center'>{StudentCode  !== null ? <GetSchoolNotes quarter={1} class={Class} student={StudentCode ? StudentCode : 0} subject={item} type={4} />: <span className='text-warning'>#</span>}</td>
                       <td className='text-center'>{StudentCode  !== null ? <GetSchoolNotes quarter={2} class={Class} student={StudentCode ? StudentCode : 0} subject={item} type={4} />: <span className='text-warning'>#</span>}</td>
                       <td className='text-center'>{StudentCode  !== null ? <GetSchoolNotes quarter={3} class={Class} student={StudentCode ? StudentCode : 0} subject={item} type={4} />: <span className='text-warning'>#</span>}</td>
                  </tr>  
               })
             } 
             <tr>
                <td  colSpan="2" className='text-center'><strong>COMPORTAMRNTO</strong> </td>
                <td colSpan="3" className='text-center'></td>
             </tr>
          </tbody> 
        </Table>
        <br />
    </div>
  )
})

export default PdStudentMarksTable