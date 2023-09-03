import React from 'react'
import { Link } from 'react-router-dom'; 
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';  
import TransportRoutesTable from '../components/Table/TransportRoutesTable'; 

function TransportRouteList() {
  document.title = "";
  return (
    <div>
      <div className="ed-space">
        <div></div>
          <div> 
             <Link className='btn bg-main ml-2' to='/registerroute'> 
                <AddCircleOutlineIcon/> Registrar nova rota
             </Link>
          </div> 
      </div>
      <div className="eduall-table">
          <TransportRoutesTable/>
      </div>
    </div>
  )
}

export default TransportRouteList