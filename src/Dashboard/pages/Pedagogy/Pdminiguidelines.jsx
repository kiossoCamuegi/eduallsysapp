import { AddCircleOutline, PrintOutlined, Search } from '@mui/icons-material';
import React, { useEffect, useRef, useState } from 'react'
import { Form, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ClassDataOptions, GetAcademiclevel_byclass, GetAcademicYear_byclass, GetClassroom_byclass, GetClasstitle_byclass, GetCourse_byclass, GetPeriod_byclass, SubjectDataOptions } from '../../../General/components/InstituteData';
import SwitchFromPages from '../../../General/components/SwitchFromPages';
import PdMiniguidelinestable from '../../components/Table/PdMiniguidelinestable';
import DashboardContainerWrapper from '../../components/elements/DashboardContainerWrapper';
import CRValue from '../../../General/components/CRValue';
import CustomTableContainer from '../../components/elements/CustomTableContainer';
import Print_pdminiguideline from '../../components/Reports/Print_pdminiguideline';

function Pdminiguidelines() {
  document.title = "Mini pautas"; 
   const [CurrentClass, SetCurrentClass] = useState(null); 
   const [CurrentSubject, SetCurrentSubject] = useState(0); 

   const ChildRef = useRef();

   const Run = (e, t)=>{
     if (t === "c") { 
      if(e*1 > 0){
         console.log("here we go - "+e)
         SetCurrentClass(e);
         setTimeout(() => {
            ChildRef.current.RunGetNotes();
         }, 500);
      }
     }else{
      SetCurrentSubject(e);
      setTimeout(() => {
        if (CurrentSubject !== null){
         ChildRef.current.RunGetNotes();
        }else{
            SetCurrentSubject(e);
         ChildRef.current.RunGetNotes(); 
        }
      }, 500);
     } 
   }

   const ChangeClass = (e)=>{ 
      Run(e.target.value, "c");
   }

   const ChangeSubject = (e)=>{ ;
      Run(e.target.value, "s");
   }


   useEffect(()=>{
      console.clear();
      console.log(CRValue("#get-selector-class2")); 
   },[]);
 
   return (
      <DashboardContainerWrapper  content={
         <div> 
         <div className="ed-space">
        <div>
           <Form>
              <div className='search-box'>
              <Form.Group>
                    <div className="ed-flex">
                     <Search />    
                        <div className="block ml-2 col-lg-6"> 
                            <Form.Select id="get-selector-subject2" select onChange={(e)=>ChangeSubject(e)}>
                                   <SubjectDataOptions/>
                             </Form.Select> 
                        </div> 
                        <div className="block ml-2"> 
                            <Form.Select id="get-selector-class2" onChange={(e)=>ChangeClass(e)}>
                                  <ClassDataOptions/>
                             </Form.Select> 
                        </div>  
                    </div> 
               </Form.Group> 
              </div>
            </Form>  
        </div>
        <div className="ed-flex" > 
                <Print_pdminiguideline  SubjectId={CurrentSubject} ClassId={CurrentClass}
                 toggle_btn={<button className='btn btn-icon bg-black'><PrintOutlined /></button>} /> 
               <SwitchFromPages link='quarterlynotes'
                menu='6'  menu_item='68' toggle_btn={
                 <div  style={{minWidth:'80px'}}> 
                      <button className="btn bg-main ml-2"> <AddCircleOutline /> lançar nota</button>
                 </div>
              } />
        </div>
    </div>
    <CustomTableContainer title="Mini pautas" content={<div>
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
       <div className="eduall-table" >
          <div className="ed-table-container">
             {(CurrentClass*1 !== NaN )  ? <PdMiniguidelinestable ref={ChildRef} 
             Filters={{subject:CurrentSubject, class:CurrentClass*1 !==NaN }} ClassId={CurrentClass}  /> : <></>}
          </div> 
       </div>
     </div> }/>
     </div>
      } />
   )
}


 

export default Pdminiguidelines