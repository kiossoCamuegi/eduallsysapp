import React from 'react'
import EnrollmentPrint from '../components/Reports/EnrollmentPrint';

function StudentEnrollmentPrint() {
    document.title = 'Imprimir recibo de matrícula'; 
    return (
      <div>
        <div className="ed-space">
           
        </div>
        <div className="eduall-print-area">
             <div className="box">
                 <EnrollmentPrint/>
             </div>
        </div>
      </div>
    )
}

export default StudentEnrollmentPrint