import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { forwardRef } from 'react';
import { useImperativeHandle } from 'react';
import { Table } from 'react-bootstrap';
import Hoot from '../../../General/components/Hoot';
import { GetSchoolNoteExam, GetSchoolNoteMFD, GetSchoolNotes, GetSubject, GetTotalStudentsAttandanceByClassSubQrt } from '../../../General/components/InstituteData'; 
const TABLEURL = [
    Hoot()+"eduallstudentsapi/get/",
    Hoot()+"eduallsingleclassapi/get/"
];


const PdSchoolMarksTable = forwardRef((props,ref)=> { 
  const [CurrentSubjects , SetCurrentSubjects]= useState([]);  
  const Class = props.ClassId ? props.ClassId : 0; 
  const StudentCode = props.StudentCode ? props.StudentCode : null;  
  const [load, setLoaded] = useState(false);

  useImperativeHandle(ref, ()=>({
    RunGetNotes(){
      console.log("printing the class code : "+Class);
      loadData();
    }
  }))


    async function loadData(){ 
      setLoaded(false);
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
      setLoaded(true);
      console.log("function 1 is running right now");
   };
 
  
  useEffect(()=>{ 
    loadData();  
  },[]);


 
 
  return (
    <div>   
      {load ? 
        <Table striped responsive bordered  >
        <thead>
           <tr className='text-center'> 
              <th rowspan="2" style={{verticalAlign :"middle"}} >Disciplinas curriculares</th>  
              <th  colspan="5">Iº Trimestre</th> 
              <th  colspan="5">IIº Trimestre</th>  
              <th  colspan="5">IIIº Trimestre</th>   
              <th colspan="4">Classificação anual</th>
           </tr>
           <tr className='text-center'>
             <th>MAC1</th>
             <th>NPP1</th>
             <th>NPT1</th>
             <th>MT1</th>
             <th>Fal</th> 
 
             <th>MAC2</th>
             <th>NPP2</th>
             <th>NPT2</th>
             <th>MT2</th>
             <th>Fal</th> 
 
             <th>MAC3</th>
             <th>NPP3</th>
             <th>NPT3</th>
             <th>MT3</th>
             <th>Fal</th> 
 
              <th>MFD</th>
              <th>NE</th>
              <th>MEC</th>
              <th>MFA</th>
             </tr>
             </thead>
             <tbody>
                   {  
                 CurrentSubjects.map((item, index)=>{
                      return    <tr key={index}> 
                          <td className='text-left'><GetSubject ID={item} /></td> 
                          <td className="text-center">{StudentCode  !== null ? <GetSchoolNotes class={Class} quarter={1} student={StudentCode ? StudentCode : 0} subject={item} type={1} />: <span className='text-warning'>#</span>} </td>
                          <td className="text-center">{StudentCode  !== null ? <GetSchoolNotes class={Class} quarter={1} student={StudentCode ? StudentCode : 0} subject={item} type={2} />: <span className='text-warning'>#</span>} </td>
                          <td className="text-center">{StudentCode  !== null ? <GetSchoolNotes class={Class} quarter={1} student={StudentCode ? StudentCode : 0} subject={item} type={3} />: <span className='text-warning'>#</span>} </td>
                          <td className="text-center">{StudentCode  !== null ? <GetSchoolNotes class={Class} quarter={1} student={StudentCode ? StudentCode : 0} subject={item} type={4} />: <span className='text-warning'>#</span>} </td>
                          <td className="text-center"  style={{color:"var(--ed-grey-text)"}}>{StudentCode  !== null ? <GetTotalStudentsAttandanceByClassSubQrt class={Class} quarter={1} student={StudentCode ? StudentCode : 0} subject={item} />: <span className='text-warning'>#</span>}</td>
                          
                          <td className="text-center">{StudentCode  !== null ? <GetSchoolNotes class={Class} quarter={2} student={StudentCode ? StudentCode : 0} subject={item} type={1} />: <span className='text-warning'>#</span>} </td>
                          <td className="text-center">{StudentCode  !== null ? <GetSchoolNotes class={Class} quarter={2} student={StudentCode ? StudentCode : 0} subject={item} type={2} />: <span className='text-warning'>#</span>} </td>
                          <td className="text-center">{StudentCode  !== null ? <GetSchoolNotes class={Class} quarter={2} student={StudentCode ? StudentCode : 0} subject={item} type={3} />: <span className='text-warning'>#</span>} </td>
                          <td className="text-center">{StudentCode  !== null ? <GetSchoolNotes class={Class} quarter={2} student={StudentCode ? StudentCode : 0} subject={item} type={4} />: <span className='text-warning'>#</span>} </td>
                          <td className="text-center"  style={{color:"var(--ed-grey-text)"}}>{StudentCode  !== null ? <GetTotalStudentsAttandanceByClassSubQrt class={Class} quarter={2} student={StudentCode ? StudentCode : 0} subject={item} />: <span className='text-warning'>#</span>}</td>
 
                          <td className="text-center">{StudentCode  !== null ? <GetSchoolNotes class={Class} quarter={3} student={StudentCode ? StudentCode : 0} subject={item} type={1} />: <span className='text-warning'>#</span>} </td>
                          <td className="text-center">{StudentCode  !== null ? <GetSchoolNotes class={Class} quarter={3} student={StudentCode ? StudentCode : 0} subject={item} type={2} />: <span className='text-warning'>#</span>} </td>
                          <td className="text-center">{StudentCode  !== null ? <GetSchoolNotes class={Class} quarter={3} student={StudentCode ? StudentCode : 0} subject={item} type={3} />: <span className='text-warning'>#</span>} </td>
                          <td className="text-center">{StudentCode  !== null ? <GetSchoolNotes class={Class} quarter={3} student={StudentCode ? StudentCode : 0} subject={item} type={4} />: <span className='text-warning'>#</span>} </td>
                          <td className="text-center" style={{color:"var(--ed-grey-text)"}}  >{StudentCode  !== null ? <GetTotalStudentsAttandanceByClassSubQrt class={Class} quarter={3} student={StudentCode ? StudentCode : 0} subject={item} />: <span className='text-warning'>#</span>}</td>
 
                          <td className="text-center">{StudentCode  !== null ? <GetSchoolNoteMFD class={Class}  student={StudentCode ? StudentCode : 0} subject={item}  />: <span className='text-warning'>#</span>}  </td>
                          <td className="text-center">{StudentCode  !== null ? <GetSchoolNoteExam  class={Class} subject={item} student={StudentCode} />  : <span className='text-warning'>#</span>} </td>
                          <td className="text-center"></td>
                          <td className="text-center"></td>
                      </tr>   
                 })
             } 
           </tbody>  
           <tfoot>
             <tr>
                 <td className='text-left' rowSpan='2'>
                   <strong>Avaliação do comportamento</strong>
                 </td> 
                 <td className="text-center"><strong>NS</strong></td> 
                 <td className="text-center"><strong>S</strong></td> 
                 <td className="text-center"><strong>B</strong></td> 
                 <td className="text-center"><strong>MB</strong></td> 
                 <td className="text-center"><strong>E</strong></td> 
                 <td className="text-center"><strong>NS</strong></td> 
                 <td className="text-center"><strong>S</strong></td> 
                 <td className="text-center"><strong>B</strong></td> 
                 <td className="text-center"><strong>MB</strong></td> 
                 <td className="text-center"><strong>E</strong></td> 
                 <td className="text-center"><strong>NS</strong></td> 
                 <td className="text-center"><strong>S</strong></td> 
                 <td className="text-center"><strong>B</strong></td> 
                 <td className="text-center"><strong>MB</strong></td> 
                 <td className="text-center"><strong>E</strong></td> 
                 <td className="text-center"><strong>NS</strong></td> 
                 <td className="text-center"><strong>S</strong></td> 
                 <td className="text-center"><strong>B</strong></td> 
                 <td className="text-center"><strong>MB</strong></td>  
             </tr>
             <tr>       
                 <td className="text-center">----</td> 
                 <td className="text-center">----</td> 
                 <td className="text-center">----</td> 
                 <td className="text-center">----</td> 
                 <td className="text-center">----</td> 
                 <td className="text-center">----</td> 
                 <td className="text-center">----</td> 
                 <td className="text-center">----</td> 
                 <td className="text-center">----</td> 
                 <td className="text-center">----</td> 
                 <td className="text-center">----</td> 
                 <td className="text-center">----</td>  
                 <td className="text-center">----</td> 
                 <td className="text-center">----</td> 
                 <td className="text-center">----</td> 
                 <td className="text-center">----</td> 
                 <td className="text-center">----</td> 
                 <td className="text-center">----</td> 
                 <td className="text-center">----</td>  
             </tr>  
             <tr>
                <td colspan='1'><strong>Observação sobre progressão qualitativa do aluno na aula</strong></td>
                <td colspan='5'></td>
                <td colspan='5'></td>
                <td colspan='5'></td>
                <td colspan='4'></td>  
             </tr>
             <tr>
                <td colspan='1'><strong>Assinatura do encarregado de educação (legivel)</strong></td>
                <td colspan='5'></td>
                <td colspan='5'></td>
                <td colspan='5'></td>
                <td colspan='4'></td>  
             </tr>
             <tr height="100px">
                <td colspan='1'><strong>Situação do Aluno :</strong></td>
                <td colspan='15'><strong>Observações:</strong> </td>
                <td colspan='5'></td>
             </tr>
           </tfoot>
         </Table> 
      : <></> }
    </div>
  )
});

export default PdSchoolMarksTable