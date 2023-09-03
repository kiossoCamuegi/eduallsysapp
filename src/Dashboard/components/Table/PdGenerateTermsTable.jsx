import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { forwardRef } from 'react';
import { useImperativeHandle } from 'react';
import { Table } from 'react-bootstrap';
import Hoot from '../../../General/components/Hoot';
import { GetSchoolNoteExam, GetSchoolNoteExamResult, GetSchoolNoteMFD, GetSchoolNotes, GetSubject } from '../../../General/components/InstituteData'; 
const TABLEURL = [
    Hoot()+"eduallstudentsapi/get/",
    Hoot()+"eduallsingleclassapi/get/"
];


const PdGenerateTermsTable = forwardRef((props, ref)=>{
    const [CurrentSubjects , SetCurrentSubjects]= useState([]);  
    const Class =  props.ClassId ? props.ClassId : 0; 
    const StudentCode =  props.StudentCode ? props.StudentCode : 0;  


  useImperativeHandle(ref, ()=>({
    RunGetNotes(){
      console.log("printing the class code : "+Class);
      loadData();
    }
  }))


    async function loadData(){ 
    try {
        const response = await axios.get(TABLEURL[1]+`${Class}`);
        if(Class !== 0){
          let subjects = response.data.length >= 1 ? response.data[0].ed_class_subjects.split(',') : [];
          let CleanSubjects = []
          for(let i = 0; i < subjects.length; i++){
               if (Math.floor(subjects[i]) >= 1){
                    CleanSubjects.push(subjects[i]);
               }
          }
         SetCurrentSubjects(CleanSubjects); 
        }; 
    } catch (error) {
      console.log(error);
    }
      console.log("function 1 is running right now");
   };
 
  
  useEffect(()=>{ 
    loadData();  
  },[]);


 
 
  return (
    <div>    
     <Table striped responsive bordered  >
       <thead>
          <tr className='text-center'> 
             <th rowspan="2"  style={{verticalAlign :"middle"}}>DISCIPLINAS</th>  
             <th  colspan="4">Iº Trimestre   </th> 
             <th  colspan="4">IIº Trimestre</th>  
             <th  colspan="4">IIIº Trimestre</th>    

             <th rowspan="2">MFD</th>
             <th rowspan="2">NE / MEC</th>
             <th rowspan="2">MF</th> 

             <th colspan="3">Observações</th>

          </tr>
          <tr className='text-center'>
            <th>MAC1</th>
            <th>NPP1</th>
            <th>NPT1</th>
            <th>MT1</th> 

            <th>MAC2</th>
            <th>NPP2</th>
            <th>NPT2</th>
            <th>MT2</th> 

            <th>MAC3</th>
            <th>NPP3</th>
            <th>NPT3</th>
            <th>MT3</th> 

  
             <th colSpan='3'>Rec / E. Esp</th> 
            </tr>
            </thead>
            <tbody>
                  {
                CurrentSubjects.map((item, index)=>{
                     return    <tr key={index}> 
                         <td className='text-left'><GetSubject ID={item} /></td> 
                         <td className="text-center">{StudentCode  !== null ? <GetSchoolNotes quarter={1} class={Class} student={StudentCode ? StudentCode : 0} subject={item} type={1} />: <span className='text-warning'>#</span>} </td>
                         <td className="text-center">{StudentCode  !== null ? <GetSchoolNotes quarter={1} class={Class} student={StudentCode ? StudentCode : 0} subject={item} type={2} />: <span className='text-warning'>#</span>} </td>
                         <td className="text-center">{StudentCode  !== null ? <GetSchoolNotes quarter={1} class={Class} student={StudentCode ? StudentCode : 0} subject={item} type={3} />: <span className='text-warning'>#</span>} </td>
                         <td className="text-center">{StudentCode  !== null ? <GetSchoolNotes quarter={1} class={Class} student={StudentCode ? StudentCode : 0} subject={item} type={4} />: <span className='text-warning'>#</span>} </td>
                        
                         <td className="text-center">{StudentCode  !== null ? <GetSchoolNotes quarter={2} class={Class} student={StudentCode ? StudentCode : 0} subject={item} type={1} />: <span className='text-warning'>#</span>} </td>
                         <td className="text-center">{StudentCode  !== null ? <GetSchoolNotes quarter={2} class={Class} student={StudentCode ? StudentCode : 0} subject={item} type={2} />: <span className='text-warning'>#</span>} </td>
                         <td className="text-center">{StudentCode  !== null ? <GetSchoolNotes quarter={2} class={Class} student={StudentCode ? StudentCode : 0} subject={item} type={3} />: <span className='text-warning'>#</span>} </td>
                         <td className="text-center">{StudentCode  !== null ? <GetSchoolNotes quarter={2} class={Class} student={StudentCode ? StudentCode : 0} subject={item} type={4} />: <span className='text-warning'>#</span>} </td>
                         
                         <td className="text-center">{StudentCode  !== null ? <GetSchoolNotes quarter={3} class={Class} student={StudentCode ? StudentCode : 0} subject={item} type={1} />: <span className='text-warning'>#</span>} </td>
                         <td className="text-center">{StudentCode  !== null ? <GetSchoolNotes quarter={3} class={Class} student={StudentCode ? StudentCode : 0} subject={item} type={2} />: <span className='text-warning'>#</span>} </td>
                         <td className="text-center">{StudentCode  !== null ? <GetSchoolNotes quarter={3} class={Class} student={StudentCode ? StudentCode : 0} subject={item} type={3} />: <span className='text-warning'>#</span>} </td>
                         <td className="text-center">{StudentCode  !== null ? <GetSchoolNotes quarter={3} class={Class} student={StudentCode ? StudentCode : 0} subject={item} type={4} />: <span className='text-warning'>#</span>} </td>
                     
                         <td className="text-center"> {StudentCode  !== null ? <GetSchoolNoteMFD class={Class} student={StudentCode ? StudentCode : 0} subject={item}   />: <span className='text-warning'>#</span>}</td>
                         <td className="text-center"> {StudentCode  !== null ? <GetSchoolNoteExam  class={Class} subject={item} student={StudentCode} />: <span className='text-warning'>#</span>}</td>
                         <td className="text-center"> {StudentCode  !== null ? <GetSchoolNoteExamResult class={Class} student={StudentCode} subject={item} />: <span className='text-warning'>#</span>}</td>

                         <td>*****</td>
                         <td>*****</td>
                         <td>*****</td>
                     </tr>   
                })
            } 
          </tbody>  
          <tfoot>  
            <tr>
               <td colspan='1'><strong>Observação sobre progressão qualitativa do aluno na aula</strong></td>
               <td colspan='4'></td>
               <td colspan='4'></td>
               <td colspan='4'></td>
               <td className='text-center' colspan='3'><strong>Resultado</strong> </td>  
               <td colspan="3"></td>
            </tr> 
          </tfoot>
        </Table> 
    </div>
  )
})
export default PdGenerateTermsTable