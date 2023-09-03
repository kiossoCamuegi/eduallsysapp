import React from 'react'
import { Link } from 'react-router-dom'; 
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';  
import StopsList from '../components/Table/StopsList';


function TransportStops() {
 document.title = "Lista das paragens do transporte";
  return (
    <div>
      <div className="ed-space">
        <div></div>
          <div> 
             <Link className='btn bg-main ml-2' to='/registerstops'> 
                <AddCircleOutlineIcon/> Registrar nova paragem
             </Link>
          </div> 
      </div>
      <div className="eduall-table">
          <StopsList/>
      </div>
    </div>
  )
}

export default TransportStops