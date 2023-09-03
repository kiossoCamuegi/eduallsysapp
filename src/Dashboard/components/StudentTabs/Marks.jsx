import { Print } from '@mui/icons-material';
import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'; 
import PdSchoolMarksTable from '../Table/PdSchoolMarksTable';
import PdStudentMarksTable from "../Table/PdStudentMarksTable";

function Marks({data}) {
  const [ActiveTab, setActiveTab] = useState(0);


  return (
    <div>
       <div className="ed-space">
            <div>
              <> 
                <Form.Group className="mb-3"> 
                  <Form.Select onChange={(e)=>setActiveTab(e.target.value*1)}>
                      <option selected value="0">Nota escolar</option>
                      <option value="1">Boletim escolar</option> 
                  </Form.Select>
                </Form.Group> 
              </>
            </div>
            <div>
               <button className="btn bg-main-light btn-icon-m0"><Print /> </button>
            </div>
       </div> 
         {ActiveTab === 0 ?
          <div className="mt-2">   
               <PdSchoolMarksTable  StudentCode={data.ed_student_id}  ClassId={data.ed_student_class} /> 
            </div>  
         : <></>}

        {ActiveTab === 1 ?
          <div className="mt-2">   
                <PdStudentMarksTable StudentCode={data.ed_student_id}  ClassId={data.ed_student_class} />  
            </div>  
         : <></>} 
    </div>
  )
}

export default Marks;