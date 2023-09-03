import React from 'react'
import CancelEnrollment from '../components/modal/CancelEnrollment'; 
import ConfirmationsTable from '../components/Table/ConfirmationsTable'; 

function Registrationconfirmation() {
document.title = 'Confirmar Matrícula'; 
  return (
    <div>
        <div className="ed-space">
          <div></div>
            <div className='ed-flex'>
               <CancelEnrollment/> 
            </div> 
        </div>
        <div className="eduall-table">
            <ConfirmationsTable/>
        </div>
  </div>
  )
}

export default Registrationconfirmation