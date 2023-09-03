import React from 'react'
import { Link } from 'react-router-dom'; 
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';  
import UnregistrationGrid from '../components/Grid/UnregistrationGrid';

function Unregistration() {
  return (
    <div>
    <div className="ed-space">
      <div></div>
        <div> 
           <Link className='btn bg-main ml-2' to='/NewTransportRouter'> 
              <AddCircleOutlineIcon/> Gerar anulação de Matrícula
           </Link>
        </div> 
    </div>
    <div className="eduall-grid">
        <UnregistrationGrid/>
    </div>
  </div>
  )
}

export default Unregistration