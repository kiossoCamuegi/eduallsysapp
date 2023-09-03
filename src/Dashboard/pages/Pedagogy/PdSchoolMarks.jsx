import React, { useEffect, useRef, useState } from 'react'; 
import PdStudentsMarksTable from '../../components/Table/PdStudentMarksTable';
import { AddCircleOutline, PrintOutlined, Search } from '@mui/icons-material';
import { Form, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ClassDataOptions, GetStudentName,   GetAcademiclevel_byclass, GetAcademicYear_byclass, 
GetClassroom_byclass, GetClasstitle_byclass, GetCourse_byclass, GetPeriod_byclass,  StudentSelectSearch } from '../../../General/components/InstituteData';
import PdSchoolMarksTable from '../../components/Table/PdSchoolMarksTable';
import axios from 'axios';
import Hoot from '../../../General/components/Hoot';
import DashboardContainerWrapper from '../../components/elements/DashboardContainerWrapper';
import SelectSearch from 'react-select-search';
import SmallLoader from '../../../General/components/SmallLoader';
import CustomTableContainer from '../../components/elements/CustomTableContainer';
import Print_pdschoolmarks from '../../components/Reports/Print_pdschoolmarks';
const TABLEURL = [
    Hoot()+"eduallstudentsapi/get/",
    Hoot()+"eduallsingleclassapi/get/",
    Hoot()+"eduallgetstudentsbyclass/"
]; 

function PdSchoolMarks(props) {
   document.title = "Boletim escolar -  individual"; 
   const [CurrentClass, SetCurrentClass] = useState(null);
   const [StudentCode, SetStudentCode] = useState(null);  
   const [StudentsData, setStudentsData] = useState([]);
   const [CurrentSubjects , SetCurrentSubjects]= useState([]); 
   const Class = props.ClassId ? props.ClassId : 0;
   const [LoadingStudents, setLoadingStudents] = useState(false);
   const ChildRef = useRef();

   const ChangeClass = (e)=>{
      SetCurrentClass(e.target.value);
      GetStudentsByClass(e.target.value)
      setTimeout(() => {
        if (CurrentClass !== null){
            ChildRef.current.RunGetNotes();
        } else{
            SetCurrentClass(e.target.value);
            ChildRef.current.RunGetNotes(); 
        }
      }, 500);
   }

     const GetStudentCode  = (e)=>{
         SetStudentCode(e); 
     }

   const loadData1 = async ()=>{ 
      const response2 = await axios.get(TABLEURL[1]+`${Class}`);
      if(Class !== 0) SetCurrentSubjects(response2.data.length >= 1 ? response2.data[0].ed_class_subjects.split(',')  : []); 
   };

  useEffect(()=>{ 
    loadData1(); 
  },[]);  

    
  const GetStudentsByClass = async(e)=>{ 
    setLoadingStudents(true);
    setStudentsData([]); 
    const response = await axios.get(TABLEURL[2]+e); 
    const students = []; 
    if(response.data !== null){    
        response.data.map((item, index)=>{
          students.push({name:item.ed_student_name, value:item.ed_student_id});
        }) 
      }    
      setLoadingStudents(false);
      setStudentsData(students); 
  }



  return (
    <DashboardContainerWrapper  content={
        <div> 
        <div className="ed-space">
        <div>
           <Form >
              <div className='search-box'>
              <Form.Group>
                    <div className="ed-flex col ed-space">
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
        <div className="ed-flex"> 
             <Print_pdschoolmarks   StudentId={StudentCode} ClassId={CurrentClass}
                 toggle_btn={<button className='btn btn-icon bg-black'><PrintOutlined /></button>} /> 
            <div  style={{minWidth:'230px'}}> 
                <button className="btn bg-main ml-2"> <AddCircleOutline /> Registrar novo estudante</button>
            </div>
        </div>
    </div>
         <CustomTableContainer title="Boletim escolar" content={
               <>
               <div className=" ed-table-container">
               <div>
                {CurrentClass !== null ?
                  <Table responsive bordered  >  
                  <tbody>
                      <tr>
                      <td  colSpan='3'>
                          <div className='ed-flex'>  
                              <div><strong>Nome :</strong></div>
                              <div className="text-danger ml-2"><GetStudentName ID={StudentCode} /></div>
                          </div>
                      </td>  
                  </tr>
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
                              <div><strong>Nº de processo</strong></div>
                              <div>{StudentCode}</div>
                          </div>
                      </td> 
                  </tr>
                  <tr>
                      <td rowSpan='2' colSpan='3'>
                          <div className="ed-flex"> 
                              <div><strong>Curso : </strong></div>
                              <div className='ml-2'><GetCourse_byclass ID={CurrentClass} /></div>
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
                   <PdSchoolMarksTable ref={ChildRef} StudentCode={StudentCode}  ClassId={CurrentClass}  /> 
                   <div className="legends ed-wrap mt-2">
                        <div className='mt-2 mr-2 '>Legendas :</div>
                        <div className="ed-flex mr-2 mt-2">NS = Não satisfatório</div>
                        <div className="ed-flex mr-2 mt-2">B = Bom</div>
                        <div className="ed-flex mr-2 mt-2">S = Satisfatório</div>
                        <div className="ed-flex mr-2 mt-2">MB =  Muito bom</div>
                        <div className="ed-flex mr-2 mt-2">E = Excelente</div>
                        <div className="ed-flex mr-2 mt-2">Fal = Faltas</div>
                   </div>
                 </div>
                 <div className="ed-wrap ed-table-legenf">
                  
                 </div>
               </div> 
               </>
         }/>
    </div>
    } />
  )
}

export default PdSchoolMarks