import React, { useEffect, useRef, useState } from 'react'; 
import PdStudentMarksTable from '../../components/Table/PdStudentMarksTable';
import { AddCircleOutline, PrintOutlined, Search } from '@mui/icons-material';
import { Form, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ClassDataOptions, GetStudentName,   GetAcademiclevel_byclass, GetAcademicYear_byclass, 
GetClassroom_byclass, GetClasstitle_byclass, GetCourse_byclass, GetPeriod_byclass,  StudentSelectSearch, StudentsArray } from '../../../General/components/InstituteData';
import SelectSearch from 'react-select-search';
import DashboardContainerWrapper from '../../components/elements/DashboardContainerWrapper';
import CustomTableContainer from '../../components/elements/CustomTableContainer';
import axios from 'axios';
import Hoot from '../../../General/components/Hoot';
import SmallLoader from '../../../General/components/SmallLoader';
 

const TABLEURL = [
    Hoot()+"eduallstudentsapi/get/",
    Hoot()+"eduallsingleclassapi/get/",
    Hoot()+"eduallgetstudentsbyclass/"
]; 

function PdStudentMarks() {
   document.title = "Boletim de notas individual"; 
   const [CurrentClass, SetCurrentClass] = useState(null);
   const [StudentCode, SetStudentCode] = useState(null);   
   const [StudentsData, setStudentsData] = useState([]);  
   const [LoadingStudents, setLoadingStudents] = useState(false);



   const ChildRef = useRef();

   const ChangeClass = (e)=>{
      Run(e.target.value, "c");
      GetStudentsByClass(e.target.value);
   }

     const GetStudentCode  = (e)=>{
         SetStudentCode(e);
         Run(e, "s");
     }



     const GetStudentsByClass = async(e)=>{ 
        setLoadingStudents(true);
        setStudentsData([]); 
          try {
            const response = await axios.get(TABLEURL[2]+e); 
            const students = []; 
            if(response.data !== null){    
                response.data.map((item, index)=>{
                  students.push({name:item.ed_student_name, value:item.ed_student_id});
                }) 
              }    
              setStudentsData(students); 
          } catch (error) {
              console.log(error);
          }
          setLoadingStudents(false); 
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
                   <Form.Group className="block ml-2"> 
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
        <Link to={`/printstudentmarks/${StudentCode+","+CurrentClass}`}> <button className='btn bg-black btn-icon'><PrintOutlined /></button> </Link>
        <div  style={{minWidth:'230px'}}> 
            <button className="btn bg-main ml-2"> <AddCircleOutline /> Registrar novo estudante</button>
        </div>
    </div>
</div>

    <CustomTableContainer title="Boletim de notas" content={<div>
        <div className="ed-table-container">
        <div>
        {CurrentClass != null ?
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
                : 
            <></>
        }
        </div>
        </div>
        <div className="eduall-table">  
        <div className="ed-table-container">
            <PdStudentMarksTable ref={ChildRef} StudentCode={StudentCode}  ClassId={CurrentClass}  /> 
        </div>
        </div>
    </div> }/> 

    </div>
    } /> 
   )
}

export default PdStudentMarks