import axios from 'axios';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { Table } from 'react-bootstrap';
import Hoot from '../../../General/components/Hoot';
import { GetSchoolNoteMFD, GetSchoolNotes, GetSubject } from '../../../General/components/InstituteData';

const TABLEURL = [
  Hoot()+"eduallgetstudentsbyclass/", 
  Hoot()+"eduallsingleclassapi/get/"
];

const PdQuarterFinalAgenda = forwardRef((props, ref)=> {
  const [students, SetStudents] = useState([]);
  const [CurrentSubjects , SetCurrentSubjects]= useState([]); 
  const Class = props.ClassId ? props.ClassId : 0; 
   
  async function loadData(){
     try {
       const response = await axios.get(TABLEURL[0]+Class); 
       SetStudents(response.data);
     } catch (error) {
        console.log(error);
     } 
  };


    const loadData1 = async ()=>{ 
     try {
       const response2 = await axios.get(TABLEURL[1]+`${Class}`);
       if(Class !== 0) SetCurrentSubjects(response2.data.length >= 1 ? response2.data[0].ed_class_subjects.split(',')  : []); 
     } catch (error) {
        console.log(error);
     }
   };

 
   useImperativeHandle (ref, ()=>({
    RunGetNotes(){ 
       loadData();
       loadData1();
       console.log("Running the function....")
    }
  }))
  
  useEffect(()=>{ 
    loadData(); 
  },[]);

  return (
    <div>  
     <Table striped responsive bordered>
       <thead>
          <tr>
             <th style={{verticalAlign :"middle"}} className='text-center' rowSpan="2">Nº</th>
             <th style={{minWidth:'300px',verticalAlign:"middle"}}  className='text-left' rowspan="2">Nome do aluno</th> 
             {CurrentSubjects.map((item, index)=>{
                  return <th  style={{verticalAlign :"middle"}} className='text-center'  colspan="4"><GetSubject ID={item} /></th>  
              })} 
              <th style={{minWidth:'140px',verticalAlign:"middle"}}  className='text-center' colSpan="2" rowSpan="2">Resultado</th> 
          </tr>
          <tr className='text-center'>
            {
                CurrentSubjects.map((item, index)=>{
                    return(
                        <>
                        <th className='text-center' >MFD</th>
                        <th className='text-center' >NE</th>
                        <th className='text-center' >MF</th>
                        <th className='text-center' >Recurso</th>  
                        </>
                    )
                })
            } 
          </tr>   
        </thead>
          <tbody>
          { 
              students.map((item, index)=>{ 
                  return  <>
                  <tr>
                         <td className='text-center'>{index+1}</td> 
                         <td className='text-left'>{item.ed_student_name} </td>  
                         {CurrentSubjects.map((sub, ind)=>{
                            return<> 
                                <td className="text-center">{item.ed_student_id  !== null ? <GetSchoolNoteMFD class={Class}  student={item.ed_student_id ? item.ed_student_id : 0} subject={sub}  />: <span className='text-warning'>#</span>}  </td>
                                <td className='text-center'>{item.ed_student_id  !== null ? <GetSchoolNotes  student={item.ed_student_id ? item.ed_student_id : 0} class={Class} subject={sub} type={2} />: <span className='text-warning'>#</span>}</td>
                                <td className='text-center'>{item.ed_student_id  !== null ? <GetSchoolNotes student={item.ed_student_id ? item.ed_student_id : 0} class={Class} subject={sub} type={3} />: <span className='text-warning'>#</span>}</td>
                                <td className='text-center'>{item.ed_student_id  !== null ? <GetSchoolNotes student={item.ed_student_id ? item.ed_student_id : 0} class={Class} subject={sub} type={4} />: <span className='text-warning'>#</span>}</td> 
                            </>
                        })} 
                         <td>
                      <select name={item.ed_student_id } id={item.ed_student_id } className="text-center form-control">
                            <option value="Transito">Transito</option>
                            <option value="Reprovado">Reprovado</option>
                        </select>
                       </td>
                    </tr> 
                  </>
                })
            }
             
          </tbody>
        </Table>
    </div>
  )
})


export default PdQuarterFinalAgenda

/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 *  

 {
              data.map((item, index)=>{
                 return
                    <tr key={index}>
                        <td className='text-left'>{index+1}</td>
                        <td className='text-left'>{item.ed_student_name}</td> 
                          {CurrentSubjects((sub, ind)=>{
                            return<> 
                                <td className='text-center'></td>
                                <td className='text-center'></td>
                                <td className='text-center'></td>
                                <td className='text-center'></td>
                                <td className='text-center'></td>
                            </>
                        })}
                    </tr>   
              })}

 */