import { AddCircleOutline, PrintOutlined, Search } from '@mui/icons-material';
import React, { useRef, useState } from 'react'
import { Form, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ClassDataOptions, GetAcademiclevel_byclass, GetAcademicYear_byclass, GetCicle_byclass, GetClassroom_byclass, GetClasstitle_byclass, GetCourse_byclass, GetPeriod_byclass, SubjectDataOptions } from '../../../General/components/InstituteData';
import SwitchFromPages from '../../../General/components/SwitchFromPages'; 
import PdViewStatisticsTable from '../../components/Table/PdViewStatisticsTable';
import DashboardContainerWrapper from '../../components/elements/DashboardContainerWrapper';
import CustomTableContainer from '../../components/elements/CustomTableContainer';
import Print_pdstatistics from '../../components/Reports/Print_pdstatistics';

function PdViewStatistics() {
    document.title = "Visualizar estatísticas"; 
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
     }else{
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

   const ChangeClass = (e)=>{ 
      Run(e.target.value, "c");
   }

   const ChangeSubject = (e)=>{ ;
      Run(e.target.value, "s");
   }


 
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
                       <div className="block ml-2 col"> 
                           <Form.Select select onChange={(e)=>ChangeSubject(e)}>
                                  <SubjectDataOptions/>
                            </Form.Select> 
                       </div> 
                       <div className="block ml-2"> 
                           <Form.Select onChange={(e)=>ChangeClass(e)}>
                                 <ClassDataOptions/>
                            </Form.Select> 
                       </div>  
                   </div> 
              </Form.Group> 
             </div>
           </Form>  
       </div>
       <div className="ed-flex" > 
                <Print_pdstatistics SubjectId={CurrentSubject} ClassId={CurrentClass}
                 toggle_btn={<button className='btn btn-icon bg-black'><PrintOutlined /></button>}  /> 
              <SwitchFromPages link='quarterlynotes'
               menu='6'  menu_item='68' toggle_btn={
                <div  style={{minWidth:'80px'}}> 
                     <button className="btn bg-main ml-2"> <AddCircleOutline /> lançar nota</button>
                </div>
             } />
       </div>
   </div>
   <CustomTableContainer title="Visualizar estatisticas" content={
    <div>
        <div className="ed-table-container">
            <div>
            {CurrentClass ?
            <>
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
                        <td  colSpan='2'>
                            <div className="ed-space"> 
                            <div><strong>Curso</strong></div>
                                <div className="text-danger">
                                <div><GetCourse_byclass ID={CurrentClass} /></div>
                                </div>
                            </div>
                        </td>  
                        <td >
                            <div className="ed-space"> 
                            <div><strong>Ciclo</strong></div>
                            <div><GetCicle_byclass ID={CurrentClass} /></div>
                            </div>
                        </td>  
                    </tr> 
                </tbody>
                </Table>
            </>
            :
            <></>    

            }
             </div>
          </div>
      <div className="eduall-table">
         <div className="ed-table-container">
              <PdViewStatisticsTable ref={ChildRef} Filters={{subject:CurrentSubject, class:CurrentClass}} ClassId={CurrentClass}  />
         </div> 
      </div>
           </div>
       } />
    </div>
    } />
   )
}

export default PdViewStatistics