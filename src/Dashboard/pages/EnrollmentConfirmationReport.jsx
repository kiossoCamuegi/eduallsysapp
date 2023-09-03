import React from 'react'
import StudentEnrollmentConfirmationReport from '../components/Reports/StudentEnrollmentConfirmationReport';

function EnrollmentConfirmationReport() {
    document.title = 'Imprimir recibo de confirmação de matrícula'; 
    return (
      <div>
        <div className="ed-space">
           
        </div>
        <div className="eduall-print-area">
             <div className="box">
                  <StudentEnrollmentConfirmationReport/>
             </div>
        </div>
      </div>
    )
}

export default EnrollmentConfirmationReport