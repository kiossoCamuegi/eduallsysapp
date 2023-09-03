import { PrintOutlined, Search } from '@mui/icons-material'
import React, { useRef, useState } from 'react'
import { Form, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom' 
import { ClassDataOptions, GetAcademiclevel_byclass, GetAcademicYear_byclass, GetClassroom_byclass, GetClasstitle_byclass, GetCourse_byclass, GetPeriod_byclass, SubjectDataOptions } from '../../../General/components/InstituteData';
import QuarterlyNotesModal from '../../components/modal/Pedagogy/QuarterlyNotesModal'
import PdQuarterFinalAgenda from '../../components/Table/PdQuarterFinalAgenda'
import DashboardContainerWrapper from '../../components/elements/DashboardContainerWrapper'
import CustomTableContainer from '../../components/elements/CustomTableContainer'

function QuarterFinalAgenda() {
  document.title = "Pauta final do trimestre";
  const [CurrentClass, SetCurrentClass] = useState(null);
  const [CurrentQuarter, SetCurrentQuarter] = useState(null);

  const ChangeClass = (e)=>{ 
     Run(e);
  } 
   
 
 const ChildRef = useRef();

 const Run = (e)=>{  
   SetCurrentClass(e.target.value);
   setTimeout(() => {
     if (e.target.value !== null){
         ChildRef.current.RunGetNotes();
     } else{
         SetCurrentClass(e.target.value);
         ChildRef.current.RunGetNotes(); 
     }
   }, 500);
}

  return ( 
    <DashboardContainerWrapper  content={
      <div>
      <div className="ed-space">
       <div>
          <Form >
             <div className='search-box'>
             <Form.Group>
                   <div className="ed-flex">
                    <Search />  
                       <div className="block col ml-2"> 
                           <Form.Select   onChange={(e)=>ChangeClass(e)}>
                                 <ClassDataOptions/>
                            </Form.Select> 
                       </div>  
                   </div> 
              </Form.Group> 
             </div>
           </Form>  
       </div>
       <div className="ed-flex" >
           <Link to={(CurrentClass !== null && CurrentQuarter !== null) ? `/quarterfinalagenda_report_print/${CurrentClass},${CurrentQuarter}` : '#'} > <button className='btn bg-black btn-icon'><PrintOutlined /></button> </Link>
           <div className="ml-2" style={{minWidth:'160px'}}><QuarterlyNotesModal/></div>
       </div>
     </div> 
     <CustomTableContainer title="Pauta final do trimestre" content={
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
      <td >
          <div className="ed-space"> 
              <div><strong>Curso</strong></div>
              <div>{(CurrentClass !== null && CurrentClass*1 !== NaN )  ? <GetCourse_byclass ID={CurrentClass} /> : <></> } </div>
          </div>
      </td>  
      </tr> 
      </tbody>
      </Table> 
      <div className="eduall-table">
         <div className="ed-table-container">
          <PdQuarterFinalAgenda ref={ChildRef} ClassId={CurrentClass} />
         </div>
      </div>  
         </div>
     }/>
   </div> 
    } />
  )
}

export default QuarterFinalAgenda