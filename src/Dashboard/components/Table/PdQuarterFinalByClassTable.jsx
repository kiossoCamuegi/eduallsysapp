import axios from 'axios';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { Table } from 'react-bootstrap';
import Hoot from '../../../General/components/Hoot';
import { GetSchoolNoteMFD, GetSchoolNotes, GetSubject } from '../../../General/components/InstituteData';
const TABLEURL = [
    Hoot()+"eduallgetstudentsbyclass/",
    Hoot()+"eduallsingleclassapi/get/", 
];



const PdQuarterFinalByClassTable = forwardRef((props, ref)=>{ 
  const [CurrentSubjects , SetCurrentSubjects]= useState([]); 
  const Class = props.ClassId ? props.ClassId : 0;
  const [data, setData] = useState([]);  
  const [load, setLoaded] = useState(false);

    const loadData = async ()=>{ 
     try { 
      setLoaded(false);
       const [response, response2] = await  Promise.all([
         axios.get(TABLEURL[0]+Class),
         axios.get(TABLEURL[1]+`${Class}`)
       ]); 
       setLoaded(true);
       setData(response.data); 
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
    <div>  
      {load ?  
      <Table striped responsive bordered>
      <thead> 
         <tr>
            <th style={{minWidth:'40px',verticalAlign:"middle"}} className='text-center' rowSpan="2">Nº</th>
            <th style={{minWidth:'300px',verticalAlign:"middle"}} className='text-left' rowspan="2">Nome do aluno</th> 
             {
              
              CurrentSubjects.map((item, index)=>{
                 return <th  colspan="4" className='text-center'><GetSubject ID={item} /></th>  
              })
            } 
            <th style={{minWidth:'140px',verticalAlign:"middle"}} className='text-center' rowspan="2">OBS</th> 
         </tr> 
         <tr className='text-center'> 
           {
               CurrentSubjects.map((item, index)=>{
                   return(
                       <>
                         <th>MT1</th>
                         <th>MT2</th>
                         <th>MT3</th>
                         <th>MFD</th>  
                       </>
                   )
               })
           }
         </tr>  
       </thead>
         <tbody>
             {
               data.map((item,index)=>{
                 let StudentCode = item.ed_student_id;
                   return <tr key={item.ed_student_id}>
                          <td className='text-left'>{index+1}</td>
                          <td className='text-left'>{item.ed_student_name}</td>  
                         {CurrentSubjects.map((sub, ind)=>{
                           return<>  
                               <td className='text-center'>{StudentCode !== null ? <GetSchoolNotes quarter={1} student={StudentCode ? StudentCode : 0} class={Class} subject={sub} type={4} />: <span className='text-warning'>#</span>}</td> 
                               <td className='text-center'>{StudentCode !== null ? <GetSchoolNotes quarter={2} student={StudentCode ? StudentCode : 0} class={Class} subject={sub} type={4} />: <span className='text-warning'>#</span>}</td> 
                               <td className='text-center'>{StudentCode !== null ? <GetSchoolNotes quarter={3} student={StudentCode ? StudentCode : 0} class={Class} subject={sub} type={4} />: <span className='text-warning'>#</span>}</td> 
                               <td className='text-center'>{StudentCode !== null ? <GetSchoolNoteMFD class={Class}  student={StudentCode ? StudentCode : 0} subject={sub}/>:<span className='text-warning'>#</span>}</td>
                           </>
                       })}
                       <td className='text-center'>
                           <select name={StudentCode} id={StudentCode} className="text-center form-control">
                               <option value="Transito">Transito</option>
                               <option value="Reprovado">Reprovado</option>
                           </select>
                       </td>
                   </tr> 
             })} 
         </tbody>
       </Table>
      : <></>}
    </div>
  )
})

export default PdQuarterFinalByClassTable