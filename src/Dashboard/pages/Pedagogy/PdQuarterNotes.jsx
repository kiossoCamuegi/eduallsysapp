import { AddCircleOutline, PrintOutlined, Search } from '@mui/icons-material';
import React, { useState , useRef} from 'react'
import { Form, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ClassDataOptions, GetAcademiclevel_byclass, GetAcademicYear_byclass, GetClassroom_byclass, GetClasstitle_byclass, GetCourse_byclass, GetPeriod_byclass, SubjectDataOptions } from '../../../General/components/InstituteData';
import SwitchFromPages from '../../../General/components/SwitchFromPages';
import PdQuarterNotesTable from '../../components/Table/PdQuarterNotesTable';
import DashboardContainerWrapper from '../../components/elements/DashboardContainerWrapper';
import CustomTableContainer from '../../components/elements/CustomTableContainer';
import EmptyImage from '../../../Assets/images/svg/personal_info.svg';

function PdQuarterNotes() {
 document.title = "Notas trimestrais"; 
   const [CurrentClass, SetCurrentClass] = useState(null); 
   const [CurrentSubject, SetCurrentSubject] = useState(null); 
   const [CurrentQuarter, SetCurrentQuarter] = useState(1);
   const [load, setLoaded] = useState(false); 

     const ChildRef = useRef();

     const Run = (e, t)=>{
      setLoaded(false);
       setTimeout(() => {
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
          setLoaded(true);
       }, 300);

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
                        <div className="block col ml-2"> 
                            <Form.Select select onChange={(e)=>Run(e.target.value, "q")} >
                                 <option value="1">Iº Trimestre</option>
                                 <option value="2">IIº Trimestre</option>
                                 <option value="3">IIIº Trimestre</option>
                             </Form.Select> 
                        </div> 
                           <div className="block ml-2 col-lg-5"> 
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
          <CustomTableContainer title="Notas trimestrais" content={<div>
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
                {load ? <PdQuarterNotesTable ref={ChildRef} Filters={{quarter:CurrentQuarter, class:CurrentClass}}   /> :
                 <div className='empty-search'><img loading="lazy" role="presentation" src={EmptyImage} alt="selecione um estudante" /> </div> }  
             </div> 
          </div>
         </div> }/>
        </div>
      } />
      
   )
}

export default PdQuarterNotes