import React from 'react'
import StudentTransferReportPrint from '../components/Reports/StudentTransferReportPrint';

function StudentTransferPrint() {
    document.title = 'Imprimir relátorio de transferência de estudante'; 
    return (
      <div>
        <div className="ed-space">
           
        </div>
        <div className="eduall-print-area-content">
             <div className="box">
                 <StudentTransferReportPrint />
             </div>
        </div>
      </div>
    )
}

export default StudentTransferPrint
