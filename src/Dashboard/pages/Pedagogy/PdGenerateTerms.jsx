import React, { useRef, useState } from 'react';  
import { AddCircleOutline, PrintOutlined, Search } from '@mui/icons-material';
import { Form, Table} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ClassDataOptions, GetAcademiclevel_byclass, GetAcademicYear_byclass, GetClassroom_byclass, GetClasstitle_byclass, GetCourse_byclass, GetPeriod_byclass, SubjectDataOptions } from '../../../General/components/InstituteData';
import { StudentSelectSearch } from '../../../General/components/InstituteData';
import SelectSearch from 'react-select-search';
import SmallLoader from '../../../General/components/SmallLoader';
import PdGenerateTermsTable from '../../components/Table/PdGenerateTermsTable'
import FullDialog from '../../components/elements/FullDialog';
import PdTermsEmitionPrint from '../../components/Reports/PdTermsEmitionPrint';
import DashboardContainerWrapper from '../../components/elements/DashboardContainerWrapper';
import CustomTableContainer from '../../components/elements/CustomTableContainer';
import axios from 'axios';
import Hoot from '../../../General/components/Hoot';

const TABLEURL = [ 
  Hoot()+"eduallgetstudentsbyclass/",
  Hoot()+'eduallsinglestudentapi/get/'
]; 

function PdGenerateTerms() {
   document.title = "Emitir termos";
   const [CurrentClass, SetCurrentClass] = useState(null);
   const [StudentCode, SetStudentCode] = useState(null);    
   const [StudentsData, setStudentsData] = useState([]);  
   const [StudentPersonalInformation, setStudentPersonalInformation] = useState([]);
   const [LoadingStudents, setLoadingStudents] = useState(false);
   const ChildRef = useRef();


   const ChangeClass = (e)=>{
      GetStudentsByClass(e.target.value);
      Run(e.target.value, "c"); 
   }

   const GetStudentCode  = (e)=>{ 
      GetStudentData(e);
      Run(e, "s"); 
    }

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
      SetStudentCode(e);
      setTimeout(() => {
        if (StudentCode !== null){
            ChildRef.current.RunGetNotes();
        } else{
            SetStudentCode(e);
            ChildRef.current.RunGetNotes(); 
        }
      }, 500);
     }
   }

 
  
const GetStudentsByClass = async(e)=>{ 
    try {
      setLoadingStudents(true);
      setStudentsData([]); 
      const response = await axios.get(TABLEURL[0]+e); 
      const students = []; 
      if(response.data !== null){    
          response.data.map((item, index)=>{
            students.push({name:item.ed_student_name, value:item.ed_student_id});
          }) 
        }    
        setLoadingStudents(false);
        setStudentsData(students); 
    } catch (error) {
      setLoadingStudents(false);
      setStudentsData([]); 
    }
}


  
const GetStudentData = async(e)=>{ 
  try {
    setLoadingStudents(true);
    const response = await axios.get(TABLEURL[1]+e); 
    if (response.data.length >= 1){ 
         setStudentPersonalInformation(response.data[0]);
         document.title = "Emitir termo do aluno (a) " + " - "+response.data[0].ed_student_name;
         setLoadingStudents(false); 
    }else{
        setLoadingStudents(false); 
    }
  } catch (error) {
    setLoadingStudents(false);
  } 
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
                        <Form.Group className="block ml-2 col-lg-5"> 
                            <Form.Select onChange={(e)=>ChangeClass(e)} >
                                  <ClassDataOptions />
                             </Form.Select> 
                        </Form.Group>  
                       <div className="ed-flex">
                         <Form.Group className='ml-2' >  
                            <SelectSearch  onChange={(e)=>GetStudentCode(e)}  value={StudentCode} options={StudentsData} search={true} 
                            placeholder="Selecione um aluno" />
                         </Form.Group>  
                         {LoadingStudents ? 
                          <div className='ed-flex'><div className="pd-2"></div> 
                             <SmallLoader /> 
                          </div> : 
                        <></>} 
                       </div>
                    </div> 
               </Form.Group> 
              </div>
            </Form>  
        </div>
        <div className="ed-flex" >
            <>
              <FullDialog 
                content_data={<PdTermsEmitionPrint/>}   
                title='Emitir termo'          
               toggle_btn={
                 <button className='btn bg-black btn-icon'><PrintOutlined /></button>  
               }/>
            </>
            <div  style={{minWidth:'230px'}}> 
                <button className="btn bg-main ml-2"> <AddCircleOutline /> Registrar novo estudante</button>
            </div>
        </div>
    </div>
    <CustomTableContainer title="Emitir termos" content={<div>
      <div className="ed-center">
      {(CurrentClass !== null && CurrentClass*1 !== NaN )  ? <h5 className='mt-2 mb-3'><div> <GetCourse_byclass ID={CurrentClass} /></div></h5> : <></>} 
      </div>
       <div className="ed-table-container mt-2">
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
                     <div><strong>Sob o Nº</strong></div>
                     <div>****</div>
                  </div>
            </td> 
         </tr> 
         </tbody>
         </Table> 
        </div>
    </div>
      <div className='eduall-table'>
          <div className="ed-table-container">
             <PdGenerateTermsTable ref={ChildRef} StudentCode={StudentCode}  ClassId={CurrentClass} />
          </div>
      </div>
     </div> }/>
    </div>
    } />
  )
}

export default PdGenerateTerms