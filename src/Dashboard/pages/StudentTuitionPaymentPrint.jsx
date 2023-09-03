import React from 'react'
import StudentTuitionPaymentReport from '../components/Reports/StudentTuitionPaymentReport';

function StudentTuitionPaymentPrint() {
  document.title = 'Imprimir declaração de transferencia'; 
    return (
      <div>
        <div className="ed-space">
           
        </div> 
          <StudentTuitionPaymentReport/> 
      </div>
    )
}

export default StudentTuitionPaymentPrint