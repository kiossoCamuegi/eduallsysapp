import React, { useRef, useState } from 'react' 
import { ClassDataOptions, GetAcademiclevel_byclass, GetAcademicYear_byclass, GetClassroom_byclass, GetClasstitle_byclass, GetCourse_byclass, GetPeriod_byclass, SubjectDataOptions } from '../../../General/components/InstituteData';
import { Form, Table } from 'react-bootstrap'
import SwitchFromPages from '../../../General/components/SwitchFromPages'
import { AddCircleOutline, PrintOutlined, Search } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import PdExamNotesTable from '../../components/Table/PdExamNotesTable'
import CustomTableContainer from '../../components/elements/CustomTableContainer'


function PdExamsNotes() {
    document.title = "Pautas dos exames";
    const [CurrentClass, SetCurrentClass] = useState(null); 
    const [CurrentSubject, SetCurrentSubject] = useState(); 

    const ChildRef = useRef();

    const Run = (e, t)=>{
    if (t === "c") {
      SetCurrentClass(e);
      setTimeout(() => {
        if (CurrentClass !== null){
            ChildRef.current.RunGetNotes();
        } else{
            SetCurrentClass(e);
            ChildRef.current.RunGetNotes(); 
        }
      }, 100);
    }else if(t === "s"){
     SetCurrentSubject(e);
     setTimeout(() => {
       if (CurrentSubject !== null){
           ChildRef.current.RunGetNotes();
       } else{
           SetCurrentSubject(e);
           ChildRef.current.RunGetNotes(); 
       }
     }, 100);
    } 
  }

    return (
      <div>  
      <div className="ed-space">
            <div>
               <Form>
                  <div className='search-box'>
                  <Form.Group>
                        <div className="ed-flex col ed-space">
                         <Search />    
                            <div className="block ml-2"> 
                                <Form.Select onChange={(e)=>Run(e.target.value, "s")}>
                                       <SubjectDataOptions/>
                                 </Form.Select> 
                            </div> 
                            <div className="block ml-2"> 
                                <Form.Select onChange={(e)=>Run(e.target.value, "c")} >
                                      <ClassDataOptions/>
                                 </Form.Select> 
                            </div>  
                        </div> 
                   </Form.Group> 
                  </div>
                </Form>  
            </div>
            <div className="ed-flex" >
                 <Link to="#"> <button className='btn bg-black btn-icon'><PrintOutlined /></button> </Link>  
            </div>
        </div>  
      <CustomTableContainer title="Pautas dos exames" content={<div>
        <div className="ed-table-container">
        <div>
          {CurrentClass !== null ?
           <Table responsive bordered  >  
         <tbody>
              <tr>
               <td>
                   <div className="ed-space">
                      <div><strong>Sala</strong></div>
                      <div><GetClassroom_byclass ID={CurrentClass} /></div>
                   </div>
               </td> 
                <td>
                   <div className="ed-space">
                      <div><strong>Turma</strong></div>
                      <div><GetClasstitle_byclass ID={CurrentClass} /></div>
                   </div>
               </td> 
                <td>
                   <div className="ed-space">
                      <div><strong>Classe</strong></div>
                      <div> <GetAcademiclevel_byclass ID={CurrentClass}/></div>
                   </div>
               </td> 
           </tr>
            <tr>
               <td>
                   <div className="ed-space">
                      <div><strong>Período</strong></div>
                      <div><GetPeriod_byclass ID={CurrentClass} /></div>
                   </div>
               </td> 
                <td>
                   <div className="ed-space"> 
                       <div><strong>Ano letivo</strong></div>
                      <div><GetAcademicYear_byclass  ID={CurrentClass} /> </div>
                   </div>
               </td> 
                <td>
                   <div className="ed-space">
                      <div><strong>Prof</strong></div>
                      <div>****</div>
                   </div>
               </td> 
           </tr>
            <tr>
               <td rowSpan='2' colSpan='3'>
                   <div className="ed-space"> 
                      <div><strong>Curso</strong></div>
                      <div><GetCourse_byclass ID={CurrentClass} /></div>
                   </div>
               </td>  
           </tr>
         </tbody>
       </Table>
          : <></>

          }
       </div>
   </div>
      <div className="eduall-table">
         <div className="ed-table-container">
             <PdExamNotesTable  ref={ChildRef} SubjectId={CurrentSubject} ClassId={CurrentClass}  />
         </div> 
      </div>
     </div> }/>
      </div> 
     )
}

export default PdExamsNotes
