import React from 'react'
import NewTransportTuitionPaymentModal from '../components/modal/NewTransportTuitionPaymentModal';
import TransportTuitionDebtsTable from '../components/Table/TransportTuitionDebtsTable';
import TransportTuitionTable from '../components/Table/TransportTuitionTable';

function TransportTuition() {
    document.title = 'Mensalidades do transporte'; 
    return (
      <div>
        <div className="ed-space">
          <div></div>
            <div> 
               <NewTransportTuitionPaymentModal/>
            </div> 
        </div>
        <div className="eduall-table">
            <TransportTuitionDebtsTable />
        </div>
        <div className="mt-4 eduall-table">
            <TransportTuitionTable/>
        </div>
      </div>
    )
}

export default TransportTuition