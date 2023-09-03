import { Search } from '@mui/icons-material'
import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import DateTimePicker from 'react-datetime-picker'
import PdAttendanceGrid from '../../components/Grid/PdAttendanceGrid';
import NewEmployeeAttendanceModal from '../../components/modal/Pedagogy/NewEmployeeAttendanceModal';

function PdAttendance() {
    document.title = "Livro de ponto"; 
    const [value1, setValue1] = useState();
    const [value2, setValue2] = useState();
  
    const handleChange = (e, type) => {
        console.log(e);
        
        if(type === 0){
             setValue1(e);
        }else{
          setValue2(e);
        }
    };
  
    
  return (
    <div>
        <div className="ed-space">
          <div className='ed-flex'>
            <Form>
                <div className="search-box">
                  <Form.Group>
                      <div className="ed-flex fill m0">
                      <Search/> 
                          <div className="ed-flex ml-2"> 
                              <span>De </span>
                               <div className="ml-2">
                                   <DateTimePicker onChange={(e)=>handleChange(e, 0)} value={value1} />
                               </div>
                          </div>
                          <div className="ed-flex ml-2">
                              <span>Até </span>
                              <div className="ml-2">
                                  <DateTimePicker onChange={(e)=>handleChange(e, 1)} value={value2} />
                              </div>
                          </div>
                      </div> 
                 </Form.Group> 
                </div>
            </Form>
          </div>
            <div> 
              <NewEmployeeAttendanceModal />
            </div> 
        </div>
        <PdAttendanceGrid />
    </div>
  )
}

export default PdAttendance
