import { PrintOutlined, Search } from '@mui/icons-material'
import React, { useEffect, useRef, useState } from 'react'
import { Form, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ClassDataOptions, GetAcademiclevel_byclass, GetAcademicYear_byclass, GetClassroom_byclass, GetClasstitle_byclass, GetCourse_byclass, GetPeriod_byclass, SubjectDataOptions } from '../../../General/components/InstituteData';
import QuarterlyNotesModal from '../../components/modal/Pedagogy/QuarterlyNotesModal'
import QuarterlyNotesTable from '../../components/Table/QuarterlyNotesTable'
import DashboardContainerWrapper from '../../components/elements/DashboardContainerWrapper'

function QuarterlyNotes() {
  document.title = "Min Pautas - Trimestrais";
  const [CurrentQuarter, SetCurrentQuarter] = useState(1);
  const [CurrentSubject, SetCurrentSubject] = useState(0);
  const [CurrentClass, SetCurrentClass] = useState(null);
  const ChildRef = useRef();

   const Run = (e, t)=>{
     if (t === "c") {
       SetCurrentClass(e);
       setTimeout(() => {
        console.log("going on ...1")
         if (e !== null){
             ChildRef.current.RunGetNotes();
         } else{
             SetCurrentClass(e);
             ChildRef.current.RunGetNotes(); 
         }
       }, 500);
     }else if(t === "s"){
      SetCurrentSubject(e);
      setTimeout(() => {
        console.log("going on ...2")
        if (CurrentSubject !== null){
            ChildRef.current.RunGetNotes();
        } else{
            SetCurrentSubject(e);
            ChildRef.current.RunGetNotes(); 
        }
      }, 500);
     }else{
     SetCurrentQuarter(e);
      setTimeout(() => {
        console.log("going on ...3")
        if (CurrentQuarter !== null){
            ChildRef.current.RunGetNotes();
        } else{
            SetCurrentQuarter(e);
            ChildRef.current.RunGetNotes(); 
        }
      }, 500);
     }
   }


   useEffect(()=>{
     
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
                     <Search/> 
                        <div className="block ml-2 col-lg-3"> 
                            <Form.Select select onChange={(e)=>Run(e.target.value, "q")} >
                                 <option value="1">Iº Trimestre</option>
                                 <option value="2">IIº Trimestre</option>
                                 <option value="3">IIIº Trimestre</option>
                             </Form.Select> 
                        </div> 
                        <div className="block ml-2"> 
                            <Form.Select select onChange={(e)=>Run(e.target.value, "s")}>
                                   <SubjectDataOptions/>
                             </Form.Select> 
                        </div> 
                        <div className="block ml-2"> 
                            <Form.Select onChange={(e)=>Run(e.target.value, "c")}>
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
            <div className="ml-2" style={{minWidth:'160px'}}><QuarterlyNotesModal/></div>
        </div>
    </div>
    <div className="mt-4 mb-2 ed-table-container">
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
    <div className="eduall-table mt-4">
       <div className="ed-table-container">
          {(CurrentClass*1 !== NaN )  ?  <QuarterlyNotesTable 
           Filters={{subject:CurrentSubject, quarter:CurrentQuarter, class:CurrentClass}} ref={ChildRef}  /> : <></>} 
        </div>
    </div>
  </div>
    } /> 
  )
}

export default QuarterlyNotes