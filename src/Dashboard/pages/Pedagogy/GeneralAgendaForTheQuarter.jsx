import { PrintOutlined, Search } from '@mui/icons-material'
import React, { useEffect, useRef, useState } from 'react'
import { Form, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AnimationPage from '../../../General/AnimationPage'
 import QuarterlyNotesModal from '../../components/modal/Pedagogy/QuarterlyNotesModal'
import PdGeneralAgendaForTheQuarterTable from '../../components/Table/PdGeneralAgendaForTheQuarterTable'
import DashboardContainerWrapper from '../../components/elements/DashboardContainerWrapper'
import { ClassDataOptions, GetAcademiclevel_byclass, GetAcademicYear_byclass, GetClassroom_byclass, GetClasstitle_byclass, GetCourse_byclass, GetPeriod_byclass, SubjectDataOptions } from '../../../General/components/InstituteData';
import CustomTableContainer from '../../components/elements/CustomTableContainer'
import Print_pdgeneralagendaofthequarter from '../../components/Reports/Print_pdgeneralagendaofthequarter'
import EmptyImage from '../../../Assets/images/svg/personal_info.svg';

function GeneralAgendaForTheQuarter() {
 document.title = "Pauta geral"
   const [CurrentClass, SetCurrentClass] = useState(null); 
   const [Loaded, SetLoaded] = useState(false);
   const [load, setLoaded] = useState(false); 

   const ChildRef = useRef();

   const Run = (e, t)=>{
    setLoaded(false);
    setTimeout(() => {
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
          } 
          setLoaded(true);
    }, 200);
   }

 

   useEffect(()=>{
        SetLoaded(true);
   },[]);


   if(Loaded){
      return ( 
        <DashboardContainerWrapper  content={
            <div>
            <div className="ed-space">
                <div>
                <Form>
                    <div className='search-box'>
                    <Form.Group>
                            <div className="ed-flex">
                            <Search/>  
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
                     <Print_pdgeneralagendaofthequarter ClassId={CurrentClass}
                     toggle_btn={<button className='btn bg-black btn-icon'><PrintOutlined /></button>}  />
                    <div className="ml-2" style={{minWidth:'160px'}}><QuarterlyNotesModal/></div>
                </div>
            </div>
            <CustomTableContainer title="Pauta Geral" content={<div>
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
                {load ? <PdGeneralAgendaForTheQuarterTable ref={ChildRef} ClassId={CurrentClass} /> : 
                <div className='empty-search'><img loading="lazy" role="presentation" src={EmptyImage} alt="selecione um estudante" /></div>}
            </div>
            </div>
            </div> }/>

        </div>
        } />
                
     )
   }

 
}

export default GeneralAgendaForTheQuarter