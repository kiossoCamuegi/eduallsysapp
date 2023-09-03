import { AddCircleOutline, PrintOutlined, Search } from '@mui/icons-material';
import React, { useRef, useState } from 'react'
import { Form, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ClassDataOptions, GetAcademiclevel_byclass, GetAcademicYear_byclass, GetCicle_byclass, GetClassroom_byclass, GetClasstitle_byclass, GetCourse_byclass, GetPeriod_byclass, SubjectDataOptions } from '../../../General/components/InstituteData';
import SwitchFromPages from '../../../General/components/SwitchFromPages'; 
import PdMarksRankingTable from '../../components/Table/PdMarksRankingTable';
 


function PdMarksRanking() {
    document.title = "Ranking de notas"; 
    const [CurrentClass, SetCurrentClass] = useState(null);  
    const [CurrentQuarter, SetCurrentQuarter] = useState(1);
    const [CurrentType, SetCurrentType] = useState(0);

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
        }else if(t === "q"){
         SetCurrentQuarter(e);
         setTimeout(() => {
           if (CurrentQuarter !== null){
               ChildRef.current.RunGetNotes();
           } else{
               SetCurrentQuarter(e);
               ChildRef.current.RunGetNotes(); 
           }
         }, 500);
         
        }else{
            SetCurrentType(e);
            setTimeout(() => {
              if (CurrentType !== null){
                  ChildRef.current.RunGetNotes();
              } else{
                SetCurrentType(e);
                  ChildRef.current.RunGetNotes(); 
              }
            }, 500);
            
           }
      }
  
    return (
      <div> 
          <div className="ed-space">
         <div>
            <Form>
               <div className='search-box'>
               <Form.Group>
                     <div className="ed-flex">
                      <Search />     
                      <div className="block ml-2"> 
                           <Form.Select  onChange={(e)=>Run(e.target.value, "q")}>
                                <option value="1">Iº Trimestre</option>
                                <option value="2">IIº Trimestre</option>
                                <option value="3">IIIº Trimestre</option>
                            </Form.Select> 
                       </div>  
                       <div className="block ml-2"> 
                           <Form.Select  onChange={(e)=>Run(e.target.value, "t")}>
                                <option value="0">Ver por turma</option>
                                <option value="1">Ver todos</option> 
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
                <SwitchFromPages link='quarterlynotes'
                 menu='6'  menu_item='68' toggle_btn={
                  <div  style={{minWidth:'80px'}}> 
                       <button className="btn bg-main ml-2"> <AddCircleOutline /> lançar nota</button>
                  </div>
               } />
         </div>
     </div>
     <div className="mt-4 mb-2 ed-table-container">
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
                    <td   colSpan='2'>
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
              : 
            <></> 
            } 
         </div>
     </div>
        <div className="mt-4"> 
             <PdMarksRankingTable ref={ChildRef} Filters={{class:CurrentClass, quarter:CurrentQuarter, type:CurrentType}} />
        </div>  
      </div>
    )
}

export default PdMarksRanking