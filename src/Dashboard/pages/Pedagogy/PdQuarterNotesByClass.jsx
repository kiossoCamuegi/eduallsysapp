import { AddCircleOutline, PrintOutlined, Search } from '@mui/icons-material';
import React, { useState , useRef, useEffect} from 'react'
import { Form, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ClassDataOptions, GetAcademiclevel_byclass, GetAcademicYear_byclass, GetClassroom_byclass, GetClasstitle_byclass, GetCourse_byclass, GetPeriod_byclass, SubjectDataOptions } from '../../../General/components/InstituteData';
import SwitchFromPages from '../../../General/components/SwitchFromPages';
import PdQuarterFinalByClassTable from '../../components/Table/PdQuarterFinalByClassTable';
import DashboardContainerWrapper from '../../components/elements/DashboardContainerWrapper';
import CRValue from '../../../General/components/CRValue';
import CustomTableContainer from '../../components/elements/CustomTableContainer';
import Print_quarterlynotesbyclass from '../../components/Reports/Print_quarterlynotesbyclass';


function PdQuarterNotesByClass() {
   document.title = "Pauta final por turma"; 
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
       }, 500);
     }else if(t === "s"){
      SetCurrentSubject(e);
      setTimeout(() => {
        if (CurrentSubject !== null){
            ChildRef.current.RunGetNotes();
        } else{
            SetCurrentSubject(e);
            ChildRef.current.RunGetNotes(); 
        }
      }, 500);
     } 
   }

   useEffect(()=>{
      SetCurrentClass(CRValue("#get-selector-class1"));
      SetCurrentSubject(CRValue("#get-selector-subject1"));
   },[]);

  return ( 
      <DashboardContainerWrapper  content={
         <div>
            <div className="ed-space">
           <div>
           <Form>
              <div className='search-box'>
              <Form.Group>
                    <div className="ed-flex col ed-space">
                     <Search />     
                        <div className="block ml-2 col"> 
                            <Form.Select id="get-selector-subject1" onChange={(e)=>Run(e.target.value, "c")}>
                                  <ClassDataOptions/>
                             </Form.Select> 
                        </div>  
                    </div> 
               </Form.Group> 
              </div>
            </Form>  
        </div>
        <div className="ed-flex" > 
              <Print_quarterlynotesbyclass   SubjectId={CurrentSubject} ClassId={CurrentClass}
                 toggle_btn={<button className='btn btn-icon bg-black'><PrintOutlined /></button>}  /> 
               <SwitchFromPages link='quarterlynotes'
                menu='6'  menu_item='68' toggle_btn={
                 <div  style={{minWidth:'80px'}}> 
                      <button className="btn bg-main ml-2"> <AddCircleOutline /> lançar nota</button>
                 </div>
              } />
        </div>
       </div>
       <CustomTableContainer title="Pauta final por turma" content={<div>
        <div className="ed-table-container">
         <div>   
         <Table responsive bordered  >  
            <tbody>
            <tr>
            <td>
                  <div className="ed-space">
                     <div><strong>Sala</strong></div>
                     <div>{(CurrentClass !== null && CurrentClass*1 !== NaN )  ? <GetClassroom_byclass ID={CurrentClass} />: <></> } </div>
                  </div>
            </td> 
               <td>
                  <div className="ed-space">
                     <div><strong>Turma</strong></div>
                     <div> {(CurrentClass !== null && CurrentClass*1 !== NaN )  ? <GetClasstitle_byclass ID={CurrentClass} />: <></> } </div>
                  </div>
            </td> 
               <td>
                  <div className="ed-space">
                     <div><strong>Classe</strong></div>
                     <div> {(CurrentClass !== null && CurrentClass*1 !== NaN )  ? <GetAcademiclevel_byclass ID={CurrentClass}/>: <></> } </div>
                  </div>
            </td> 
         </tr>
         <tr>
            <td>
                  <div className="ed-space">
                     <div><strong>Período</strong></div>
                     <div> {(CurrentClass !== null && CurrentClass*1 !== NaN )  ?<GetPeriod_byclass ID={CurrentClass} />: <></> } </div>
                  </div>
            </td> 
               <td>
                  <div className="ed-space"> 
                     <div><strong>Ano letivo</strong></div>
                     <div> {(CurrentClass !== null && CurrentClass*1 !== NaN )  ? <GetAcademicYear_byclass  ID={CurrentClass} /> : <></> } </div>
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
                     <div>{(CurrentClass !== null && CurrentClass*1 !== NaN )  ? <GetCourse_byclass ID={CurrentClass} /> : <></> } </div>
                  </div>
            </td>  
         </tr>
         </tbody>
         </Table> 
        </div>
    </div>
        <div className="eduall-table">
          <div className="ed-table-container">
              <PdQuarterFinalByClassTable ref={ChildRef} Filters={{subject:CurrentSubject, class:CurrentClass}} ClassId={CurrentClass} />
          </div> 
       </div>
       </div> }/>
      </div>
      }  /> 
  )
}

export default PdQuarterNotesByClass