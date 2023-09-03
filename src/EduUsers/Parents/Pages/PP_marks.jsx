import React, { useEffect, useState } from 'react'
import PdSchoolMarksTable from '../../../Dashboard/components/Table/PdSchoolMarksTable';
import PdStudentMarksTable from '../../../Dashboard/components/Table/PdStudentMarksTable';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { styled } from 'styled-components';

function PP_marks(props) {
    const [ActiveTab, setActiveTab] = useState(0);
    const [studentId, setStudentId] = useState(0);
    const [StudentClass, setStudentClass] = useState(null);
 

    useEffect(()=>{
      console.log(props.data.student)
      setStudentId(props.data.student.ed_student_id);
      setStudentClass(props.data.student.ed_student_class); 
    },[])

    return (
      <BoxItem>
         <div className="ed-space">
            <div></div>
              <div className='ed-flex'>
              <FormControl id="academic_level_forExam">
                <div className="ed-flex"> 
                      <RadioGroup  aria-labelledby="academic_level_forExam" defaultValue={0}
                       name="radio-buttons-group" id="academic_level_forExam" onChange={(e)=>setActiveTab(e.target.value*1)}  >
                      <div className="ml-2 ed-flex">
                          <FormControlLabel value="1" control={<Radio />} label="Nota escolar" />
                          <FormControlLabel value="0" control={<Radio />} label="Boletim escolar" /> 
                      </div>
                      </RadioGroup> 
                  </div>
              </FormControl> 
              </div> 
           </div> 
          <div className="d-none"> <h1> {studentId}  / {StudentClass} </h1></div>
           {StudentClass !== null ?
              <>
               <div className={ActiveTab === 0 ? "mt-2" : "d-none"}>     
                <PdStudentMarksTable StudentCode={studentId}  ClassId={StudentClass} />  
              </div>    
              <div  className={ActiveTab === 1 ? "mt-2" : "d-none"}>   
                <PdSchoolMarksTable StudentCode={studentId}  ClassId={StudentClass} />  
              </div>   
              </> : <></>
           }
      </BoxItem>
    )
}

const BoxItem = styled.div`
    background:var(--ed-white); 
    border-radius:6px; 
    box-shadow:var(--ed-shadow-df);
    min-width:100px;
    margin-top:30px; 
    padding:20px; 
`;

export default PP_marks
