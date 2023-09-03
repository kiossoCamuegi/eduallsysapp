import React from 'react'
import TransferStudentStatementPrints from '../components/Reports/TransferStudentStatementPrints';

function TransferStudentStatementPrint() {
    document.title = 'Imprimir declaração de transferencia'; 
    return (
      <div>
        <div className="ed-space">
           
        </div>
        <div className="eduall-print-area">
             <div className="box">
                 <TransferStudentStatementPrints/>
             </div>
        </div>
      </div>
    )
}

export default TransferStudentStatementPrint