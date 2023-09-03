import React from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PaidServicesTable from '../components/Table/PaidServicesTable';
import { Link } from 'react-router-dom';

function PaidServices() {
    document.title = 'Lista dos serviços'; 
    return (
      <div>
        <div className="ed-space">
          <div></div>
            <div> 
               <Link to="/servicepayments" className="btn btn-main">
                   <AddCircleOutlineIcon/> Registrar pagamento de  serviço
                </Link>
            </div> 
        </div>
        <div className="eduall-table">
            <PaidServicesTable/>
        </div>
      </div>
    )
}

export default PaidServices