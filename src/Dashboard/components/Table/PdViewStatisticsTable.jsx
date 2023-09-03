 
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { Table } from 'react-bootstrap'
import axios from 'axios';
import Hoot from '../../../General/components/Hoot';
import { GetSchoolNoteExamResult, GetSchoolNoteFeatured, GetSchoolNoteMFD, GetSchoolNotes, GetStudentGender, GetStudentName } from '../../../General/components/InstituteData';

const TABLEURL = [
  Hoot()+"eduallgetstudentsbyclass/" 
]; 
  

const PdViewStatisticsTable = forwardRef((props,ref)=> {
    const [students, SetStudents] = useState([]); 
    const Subject = props.Filters.subject ? props.Filters.subject : null;
    const Class = props.Filters.class ? props.Filters.class : null;

  async function loadData(){
     try {
       const response = await axios.get(TABLEURL[0]+Class);
       SetStudents(response.data); 
     } catch (error) {
        console.log(error);
     }
  }



  useImperativeHandle(ref, ()=>({
    RunGetNotes(){
      console.log("printing the subject code : "+ Subject);
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
          <tr className='text-center'>
             <th rowSpan="2" style={{verticalAlign :"middle"}} >Nº</th>
             <th rowspan="2" style={{verticalAlign :"middle",minWidth:"300px"}}>Nome do aluno</th> 
             <th rowspan="2" style={{verticalAlign :"middle"}}>Sexo</th> 
             <th  colspan="5">Iº Trimestre   </th> 
             <th  colspan="5">IIº Trimestre</th>  
             <th  colspan="5">IIIº Trimestre</th>  
             <th rowspan="2" style={{verticalAlign :"middle"}}>MFD</th> 
             <th rowspan="2" style={{verticalAlign :"middle"}}>NR</th> 
             <th rowspan="2" style={{verticalAlign :"middle"}}>MF</th>
            <th rowspan="2" style={{verticalAlign :"middle"}}>Aproveito</th>  
          </tr>
          <tr className='text-center'>
            <th >MAC1</th>
            <th >NPP1</th>
            <th >NPT1</th>
            <th >MT1</th>
            <th>RES</th> 

            <th >MAC2</th>
            <th >NPP2</th>
            <th >NPT2</th>
            <th >MT2</th>
            <th>RES</th> 

            <th >MAC3</th>
            <th >NPP3</th>
            <th >NPT3</th>
            <th >MT3</th>
            <th>RES</th> 
            </tr>
            </thead>
            <tbody>
            { 
              students.map((item, index)=>{ 
                  return   <tr>
                         <td className='text-center'> {index+1} </td>
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

                         <td><div className="text-center">{item.ed_student_id  !== null ? <GetSchoolNoteMFD   student={item.ed_student_id ? item.ed_student_id : 0} subject={Subject}   />: <span className='text-warning'>#</span>}</div></td>
                        


                         <td><div className="text-center">{item.ed_student_id  !== null ? <GetSchoolNoteFeatured class={Class} student={item.ed_student_id ? item.ed_student_id : 0} subject={Subject}/> : <span className='text-warning'>#</span>}</div></td>
                         <td><div className="text-center">{item.ed_student_id  !== null ? <GetSchoolNoteExamResult class={Class} student={item.ed_student_id ? item.ed_student_id : 0} subject={Subject}/> : <span className='text-warning'>#</span>}</div></td>

 
                         <td>###</td>
                   </tr>   
              })
            }
          </tbody>  
          <tfoot>   
           <tr>
               <td colspan='6' className='bg-grey'><strong>ESTATÍSTICAS</strong></td>
               <td colspan='5' className='bg-grey'><strong>Iº TRIMESTRE</strong></td>
               <td colspan='5' className='bg-grey'><strong>IIº TRIMESTRE</strong></td>
               <td colspan='5' className='bg-grey'><strong>IIIº TRIMESTRE</strong></td> 
               <td colspan='1' className='bg-grey'><strong>EF</strong></td> 
            </tr> 
            <tr>
               <td colspan='6' className='bg-yellow'><strong>Números de alunos inscritos</strong></td>
               <td colspan='5' rowSpan='3'>--</td>
               <td colspan='5' rowSpan='3'>--</td>
               <td colspan='5' rowSpan='3'>--</td> 
               <td colspan='1' rowSpan='3'><strong>#</strong></td> 
            </tr>  
            <tr>
              <td className='bg-yellow'> <strong>M</strong></td>
              <td colSpan='5'>------</td>
            </tr>
            <tr>
              <td className='bg-yellow'><strong>F</strong></td>
              <td colSpan='5'>------</td>
            </tr>
            <tr>
               <td colspan='6' className='bg-red'><strong>N.ºs de alunos não avaliados ou desistidos</strong></td>
               <td colspan='5'></td>
               <td colspan='5'>--</td>
               <td colspan='5'>--</td> 
               <td colspan='1'><strong>#</strong></td> 
            </tr> 
            <tr>
               <td colspan='6' className='bg-green'><strong>Números de alunos avaliados</strong></td>
               <td colspan='5'></td>
               <td colspan='5'>--</td>
               <td colspan='5'>--</td> 
               <td colspan='1'><strong>#</strong></td> 
            </tr> 
            <tr>
               <td colspan='6' className='bg-blue'><strong>Números de alunos com aproveitamento </strong></td>
               <td colspan='5'></td>
               <td colspan='5'>--</td>
               <td colspan='5'>--</td> 
               <td colspan='1'><strong>#</strong></td> 
            </tr> 
            <tr>
               <td colspan='6' className='bg-brown'><strong>Números de alunos sem aproveitamento </strong></td>
               <td colspan='5'></td>
               <td colspan='5'>--</td>
               <td colspan='5'>--</td> 
               <td colspan='1'><strong>#</strong></td> 
            </tr> 
            <tr>
               <td colspan='6' className='bg-blue-light'><strong>% de alunos com aproveitamento</strong></td>
               <td colspan='5'></td>
               <td colspan='5'>--</td>
               <td colspan='5'>--</td> 
               <td colspan='1'><strong>#</strong></td> 
            </tr>
            <tr>
               <td colspan='6' className='bg-brown-light'><strong>% de alunos sem aproveitamento</strong></td>
               <td colspan='5'></td>
               <td colspan='5'>--</td>
               <td colspan='5'>--</td> 
               <td colspan='1'><strong>#</strong></td> 
            </tr>  
          </tfoot>
        </Table> 
    </div>
  )
})

export default PdViewStatisticsTable