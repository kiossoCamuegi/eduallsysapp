import React from 'react'
import NewfeeManualPaymentModal from '../../components/modal/NewfeeManualPaymentModal'
import DebtsTable from '../../components/Table/DebtsTable'
import {Form } from 'react-bootstrap'
import { Search } from '@mui/icons-material';
import NewServicePaymentModal from '../../components/modal/NewServicePaymentModal';

function Listdebts() {
    document.title = "Dividas gerais";
  return (
     <div>
         <div className="ed-space">
             <div className='ed-flex'>
                 <NewServicePaymentModal/>
             </div>
             <div>
                 <NewfeeManualPaymentModal/>
            </div>
         </div>
         <DebtsTable/>
     </div>
  )
}

export default Listdebts