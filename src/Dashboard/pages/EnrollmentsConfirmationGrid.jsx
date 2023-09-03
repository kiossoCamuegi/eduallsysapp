import React, { useState } from 'react'; 
import { Form } from 'react-bootstrap'; 
import { Search } from '@mui/icons-material'; 
import DateTimePicker from 'react-datetime-picker'; 
import NewEnrollmentConfirmationModal from '../components/modal/NewEnrollmentConfirmationModal';
import EnrollmentConfirmationGrid from '../components/Grid/EnrollmentConfirmationGrid';

function EnrollmentsConfirmationGrid() {
    document.title = "Confirmações"; 
    const [value1, setValue1] = useState();
    const [value2, setValue2] = useState();
  
    const handleChange = (e) => {
        
    };
    
  
    return (
      <div>
          <div className="ed-space">
            <div className='ed-flex'>
              <Form>
                  <div className="search-box">
                    <Form.Group>
                        <div className="ed-flex fill">
                        <Search/> 
                            <div className="ed-flex ml-2"> 
                                <span>De </span>
                                 <div className="ml-2">
                                     <DateTimePicker id='date-1' onChange={handleChange} value={value1} />
                                 </div>
                            </div>
                            <div className="ed-flex ml-2">
                                <span>Até </span>
                                <div className="ml-2">
                                    <DateTimePicker  id='date-2' onChange={handleChange} value={value2} />
                                </div>
                            </div>
                        </div> 
                   </Form.Group> 
                  </div>
              </Form>
            </div>
              <div> 
                 <NewEnrollmentConfirmationModal  />
              </div> 
          </div>
          <div className="eduall-grid">
                <EnrollmentConfirmationGrid/>
          </div>
       </div>   
    )
}

export default EnrollmentsConfirmationGrid