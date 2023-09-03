import React from 'react'
import { Link } from 'react-router-dom'; 
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'; 
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined';
import StudentEnrollmentAndConfirmationTable from '../components/Table/StudentEnrollmentAndConfirmationTable';
import { SummarizeOutlined } from '@mui/icons-material';
import NewEnrollmentConfirmationModal from '../components/modal/NewEnrollmentConfirmationModal';
 

function EnrollmentsAndConfirmation() {
    document.title = 'Efectuar confirmação da matrícula'; 
    return (
      <div>
        <div className="ed-space">
            <div className='ed-flex'>
            </div> 
            <div>
                <NewEnrollmentConfirmationModal confirmation />
            </div>
        </div>
        <div className="eduall-table">
              <StudentEnrollmentAndConfirmationTable/>
        </div>
      </div>
    )
}

export default EnrollmentsAndConfirmation