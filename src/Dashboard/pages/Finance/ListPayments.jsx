import { AddCircleOutline } from '@mui/icons-material';
import React from 'react'
import { Link } from 'react-router-dom';
import PopPaymentDetailsModal from '../../components/modal/PopPaymentDetailsModal';
import ListPaymentsTable from '../../components/Table/ListPaymentsTable';

function ListPayments() {
    document.title = 'Listar pagamentos de serviços'; 
    return (
      <div>
        <div className="ed-space">
          <div></div>
            <div> 
                <Link to="/servicepayments"><button className="btn bg-main"><AddCircleOutline/> Pagar serviços</button></Link>
            </div> 
        </div>
        <div className="eduall-table">
             <PopPaymentDetailsModal/>
             <ListPaymentsTable/>
        </div>
      </div>
    )
}

export default ListPayments