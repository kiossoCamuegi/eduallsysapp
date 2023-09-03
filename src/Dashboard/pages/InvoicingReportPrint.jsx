import React from 'react'
import InvoicingReport from '../components/Reports/InvoicingReport';

function InvoicingReportPrint() {
   document.title = 'Imprimir dados de faturação'; 
    return (
      <div>
        <div className="ed-space">
           
        </div>
        <div className="eduall-print-area horizontal-view">
             <div className="box">
                 <InvoicingReport />
             </div>
        </div>
      </div>
    )
}

export default InvoicingReportPrint