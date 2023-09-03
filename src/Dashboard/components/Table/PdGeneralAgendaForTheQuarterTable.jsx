import axios from 'axios';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { Table } from 'react-bootstrap';
import Hoot from '../../../General/components/Hoot';
import { GetSchoolNoteExam, GetSchoolNoteExamResult, GetSchoolNoteFeatured, GetSchoolNoteMFD, GetSubject } from '../../../General/components/InstituteData';
const TABLEURL = [
    Hoot()+"eduallgetstudentsbyclass/",
    Hoot()+"eduallsingleclassapi/get/"
];


const PdGeneralAgendaForTheQuarterTable = forwardRef((props,ref)=> {
  const [students, SetStudents] = useState([]);
  const [CurrentSubjects , SetCurrentSubjects]= useState([]); 
  const Class = props.ClassId ? props.ClassId : 0;
  const [data, setData] = useState([]); 
  const [Text, setText] = useState([]); 
  const [load, setLoaded] = useState(false);
   
 

    const loadData = async ()=>{ 
      const response2 = await axios.get(TABLEURL[1]+`${Class}`);
      if(Class !== 0) SetCurrentSubjects(response2.data.length >= 1 ? response2.data[0].ed_class_subjects.split(',')  : []); 

      const response = await axios.get(TABLEURL[0]+`${Class}`); 
      setData(response.data); 
   };

   
  useImperativeHandle(ref, ()=>({
    RunGetNotes(){
      console.log("printing the subject code : "+ Class);
      loadData();
    }
  }))
 
  
  useEffect(()=>{ 
    loadData();
    setLoaded(true)
  },[]);

  return (
    <div> 
     <Table striped responsive bordered  >
       <thead>
          <tr className='text-center'>
             <th style={{verticalAlign :"middle"}} className='text-center' rowSpan="3" >Nº</th>
             <th style={{minWidth:'300px',verticalAlign :"middle"}} className='text-left' rowspan="3"  >Nome do aluno</th> 
             {
               CurrentSubjects.map((item, index)=>{
                  return <th  style={{verticalAlign :"middle"}} colspan="4"><GetSubject ID={item} /></th>  
               })
             } 
             <th className='text-left' style={{verticalAlign :"middle"}} rowspan="3">OBS</th> 
          </tr>
          <tr className='ed-block'>
            {
                CurrentSubjects.map((item, index)=>{
                    return(
                        <>
                        <th height="80" className='vertical-th'><div className="txt-col">MFD</div></th>
                        <th height="80" className='vertical-th'><div className="txt-col">NE / MEC</div></th>
                        <th height="80" className='vertical-th'><div className="txt-col">MF</div></th>
                        <th height="80" className='vertical-th'><div className="txt-col">Recurso</div></th>  
                        </>
                    )
                })
            }
          </tr>  
        </thead>
          <tbody>
              {
                data.map((item,index)=>{
                 return  <tr key={item.ed_student_id}>
                         <td className='text-left'>{index+1}</td>
                        <td className='text-left'>{item.ed_student_name}</td> 
                          {CurrentSubjects.map((subject, ind)=>{
                            return<> 
                                <td className='text-center'><GetSchoolNoteMFD class={Class}  student={item.ed_student_id ? item.ed_student_id : 0} subject={subject}  /></td>
                                <td className='text-center'><GetSchoolNoteExam  class={Class} subject={subject} student={item.ed_student_id} /></td>
                                <td className='text-center'> <GetSchoolNoteExamResult class={Class} student={item.ed_student_id ? item.ed_student_id : 0} subject={subject} /> </td>
                                <td className='text-center'><GetSchoolNoteFeatured class={Class} student={item.ed_student_id ? item.ed_student_id : 0} subject={subject}/> </td> 
                            </>
                        })}
                        <td className='text-center'>0</td>
                    </tr>   
              })} 
          </tbody>
        </Table>
    </div>
  )
});

export default PdGeneralAgendaForTheQuarterTable