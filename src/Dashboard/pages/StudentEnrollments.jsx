import React from 'react'
import StudentEnrollmentTable from '../components/Table/StudentEnrollmentTable';
import { Link } from 'react-router-dom'; 
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';  
import { SummarizeOutlined } from '@mui/icons-material';
import NewEnrollmentConfirmationModal from '../components/modal/NewEnrollmentConfirmationModal';


function StudentEnrollments() {
    document.title = 'Efectuar confirmação da matrícula'; 
    return (
      <div>
        <div className="ed-space">
            <div className='ed-flex'>
             
            </div> 
            <div>
                <NewEnrollmentConfirmationModal />
            </div>
        </div>
        <div className="eduall-table">
              <StudentEnrollmentTable/>
        </div>
      </div>
    )
}

export default StudentEnrollments