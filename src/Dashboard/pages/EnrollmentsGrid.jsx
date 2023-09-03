import React, { useState } from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'; 
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import { Form } from 'react-bootstrap' 
import { Search } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import EnrollmentsGridList from '../components/Grid/EnrollmentsGridList'; 
import DateTimePicker from 'react-datetime-picker';
import NewEnrollmentConfirmationModal from '../components/modal/NewEnrollmentConfirmationModal';

function EnrollmentsGrid() { 
  document.title = "Matrículas"; 
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
               <NewEnrollmentConfirmationModal />
            </div> 
        </div>
        <div className="eduall-grid">
            <EnrollmentsGridList/>
        </div>
     </div>   
  )
}

export default EnrollmentsGrid