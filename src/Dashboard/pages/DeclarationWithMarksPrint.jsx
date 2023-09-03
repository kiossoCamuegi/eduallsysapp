import React from 'react'
import StudentDeclarationWithMarksPrint from '../components/Reports/StudentDeclarationWithMarksPrint';

function DeclarationWithMarksPrint() {
    document.title = 'Imprimir recibo de confirmação de matrícula'; 
    return (
      <div>
        <div className="ed-space">
           
        </div>
        <div className="eduall-print-area">
             <div className="box">
                  <StudentDeclarationWithMarksPrint />
             </div>
        </div>
      </div>
    )
}

export default DeclarationWithMarksPrint