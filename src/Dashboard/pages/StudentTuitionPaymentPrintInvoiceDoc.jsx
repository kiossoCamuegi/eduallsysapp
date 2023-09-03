import React from 'react'
import StudentTuitionPaymentPrintInvoice from '../components/Reports/StudentTuitionPaymentPrintInvoice';

function StudentTuitionPaymentPrintInvoiceDoc() {
    document.title = 'Imprimir fatura de pagamento'; 
    return (
      <div>
        <div className="ed-space">
           
        </div>
        <div className="eduall-print-area-content">
             <div className="box">
                 <StudentTuitionPaymentPrintInvoice />
             </div>
        </div>
      </div>
    )
}

export default StudentTuitionPaymentPrintInvoiceDoc