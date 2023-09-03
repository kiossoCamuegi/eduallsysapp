import React from 'react'
import StudentGeneralInformationReport from '../components/Reports/StudentGeneralInformationReport';

function StudentGeneralInformationPrint() {
  document.title = 'Imprimir relatório geral do aluno'; 
    return (
      <div>
        <div className="ed-space">
           
        </div>
        <div className="eduall-print-area">
             <div className="box">
                 <StudentGeneralInformationReport />
             </div>
        </div>
      </div>
    )
}

export default StudentGeneralInformationPrint