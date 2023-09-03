 
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { Table } from 'react-bootstrap'
import axios from 'axios';
import Hoot from '../../../General/components/Hoot';
import { GetSchoolNoteExamResult, GetSchoolNoteFeatured, GetSchoolNoteMFD, GetSchoolNotes, GetStudentGender, GetStudentName } from '../../../General/components/InstituteData';

const TABLEURL = [
  Hoot()+"eduallgetstudentsbyclass/", 
]; 
  

const  PdMiniguidelinestable = forwardRef((props,ref)=> {
  const [students, SetStudents] = useState([]);
  const [data, setData] = useState([]); 
  const Class = props.ClassId ? props.ClassId : 0;
  const Subject = props.Filters.subject ? props.Filters.subject : 0;

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
      console.log("printing the class code : "+ Class);
      loadData();
    }
  }))

 
  useEffect(()=>{
    loadData();
  },[])
  
  return (
    <div> 
        <Table striped responsive bordered  >
       <thead>
          <tr className='text-left'>
             <th rowSpan="2" style={{verticalAlign:"middle"}} className='text-center'>Nº</th>
             <th rowspan="2" style={{verticalAlign:"middle",minWidth:"300px"}} className='text-center'>Nome do aluno</th> 
             <th rowspan="2" style={{verticalAlign:"middle"}} className='text-center'>Sexo</th> 
             <th colspan="5" style={{verticalAlign:"middle"}} className='text-center'>Iº Trimestre</th> 
             <th colspan="5" style={{verticalAlign:"middle"}} className='text-center'>IIº Trimestre</th>  
             <th colspan="5" style={{verticalAlign:"middle"}} className='text-center'>IIIº Trimestre</th>  
             <th rowspan="2">MFD</th> 
             <th rowspan="2">NR</th> 
             <th rowspan="2">MF</th>
             <th rowspan="2" style={{verticalAlign:"middle"}} className='text-center'>Aproveito</th>  
          </tr>
          <tr className='text-center'>
            <th>MAC1</th>
            <th>NPP1</th>
            <th>NPT1</th>
            <th>MT1</th>
            <th>RES</th> 

            <th>MAC2</th>
            <th>NPP2</th>
            <th>NPT2</th>
            <th>MT2</th>
            <th>RES</th> 

            <th>MAC3</th>
            <th>NPP3</th>
            <th>NPT3</th>
            <th>MT3</th>
            <th>RES</th> 
            </tr>
            </thead>
            <tbody>
            { 
              students.map((item, index)=>{ 
                  return   <tr>
                         <td className='text-center'>{index+1}</td>
                         <td className='text-left'><GetStudentName ID={item.ed_student_id} />  </td>
                         <td><GetStudentGender  ID={item.ed_student_id} /></td> 
                         <td><div className="text-center">{item.ed_student_id  !== null ? <GetSchoolNotes quarter={1}  class={Class} student={item.ed_student_id ? item.ed_student_id : 0} subject={Subject} type={1} />: <span className='text-warning'>#</span>}</div></td>
                         <td><div className="text-center">{item.ed_student_id  !== null ? <GetSchoolNotes quarter={1}  class={Class} student={item.ed_student_id ? item.ed_student_id : 0} subject={Subject} type={2} />: <span className='text-warning'>#</span>}</div></td>
                         <td><div className="text-center">{item.ed_student_id  !== null ? <GetSchoolNotes quarter={1}  class={Class} student={item.ed_student_id ? item.ed_student_id : 0} subject={Subject} type={3} />: <span className='text-warning'>#</span>}</div></td>
                         <td><div className="text-center">{item.ed_student_id  !== null ? <GetSchoolNotes quarter={1}  class={Class} student={item.ed_student_id ? item.ed_student_id : 0} subject={Subject} type={4} />: <span className='text-warning'>#</span>}</div></td>
                         <td><div className="text-center">***</div></td>  
 
                         <td><div className="text-center">{item.ed_student_id  !== null ? <GetSchoolNotes quarter={2}  class={Class} student={item.ed_student_id ? item.ed_student_id : 0} subject={Subject} type={1} />: <span className='text-warning'>#</span>}</div></td>
                         <td><div className="text-center">{item.ed_student_id  !== null ? <GetSchoolNotes quarter={2}  class={Class} student={item.ed_student_id ? item.ed_student_id : 0} subject={Subject} type={2} />: <span className='text-warning'>#</span>}</div></td>
                         <td><div className="text-center">{item.ed_student_id  !== null ? <GetSchoolNotes quarter={2}  class={Class} student={item.ed_student_id ? item.ed_student_id : 0} subject={Subject} type={3} />: <span className='text-warning'>#</span>}</div></td>
                         <td><div className="text-center">{item.ed_student_id  !== null ? <GetSchoolNotes quarter={2}  class={Class} student={item.ed_student_id ? item.ed_student_id : 0} subject={Subject} type={4} />: <span className='text-warning'>#</span>}</div></td>
                         <td><div className="text-center">***</div></td>  
 
                         <td><div className="text-center">{item.ed_student_id  !== null ? <GetSchoolNotes quarter={3}  class={Class} student={item.ed_student_id ? item.ed_student_id : 0} subject={Subject} type={1} />: <span className='text-warning'>#</span>}</div></td>
                         <td><div className="text-center">{item.ed_student_id  !== null ? <GetSchoolNotes quarter={3}  class={Class} student={item.ed_student_id ? item.ed_student_id : 0} subject={Subject} type={2} />: <span className='text-warning'>#</span>}</div></td>
                         <td><div className="text-center">{item.ed_student_id  !== null ? <GetSchoolNotes quarter={3}  class={Class} student={item.ed_student_id ? item.ed_student_id : 0} subject={Subject} type={3} />: <span className='text-warning'>#</span>}</div></td>
                         <td><div className="text-center">{item.ed_student_id  !== null ? <GetSchoolNotes quarter={3}  class={Class} student={item.ed_student_id ? item.ed_student_id : 0} subject={Subject} type={4} />: <span className='text-warning'>#</span>}</div></td>
                         <td><div className="text-center">***</div></td>  

                         <td><div className="text-center">{item.ed_student_id  !== null ? <GetSchoolNoteMFD class={Class}  student={item.ed_student_id ? item.ed_student_id : 0} subject={Subject}   />: <span className='text-warning'>#</span>}</div></td>
                         <td><GetSchoolNoteFeatured class={Class} student={item.ed_student_id ? item.ed_student_id : 0} subject={Subject}/></td>
                         <td><GetSchoolNoteExamResult class={Class} student={item.ed_student_id ? item.ed_student_id : 0} subject={Subject}/></td>
                         <td>
                         <select style={{border:"none !important",background:"transparent !important"}} name={item.ed_student_id } id={item.ed_student_id } className="text-center form-control">
                                <option style={{color:"green !important"}} value="Transito">Transito</option>
                                <option style={{color:"gold !important"}} value="Reprovado">Não transito</option>
                            </select>
                         </td>
                     </tr>   
                })
            }
          </tbody>  
        </Table>
    </div>
  )
})

export default PdMiniguidelinestable 