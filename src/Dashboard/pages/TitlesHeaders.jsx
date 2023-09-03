import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import TitlesAndHeaderTable from '../components/Table/TitlesAndHeaderTable';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'; 

function TitlesHeaders() {
  document.title = 'Lista dos titulos e cabeçalhos'; 
    return (
      <div>
        <div className="ed-space">
          <div></div>
            <div> 
                <Link to='/register_titles_headers'>
                   <button className='btn btn-main ml-2' >
                      <AddCircleOutlineIcon /> Registrar cabeçalho e titulos
                   </button>  
                </Link>
            </div> 
        </div>
        <div className="eduall-table">
            <TitlesAndHeaderTable/>
        </div>
      </div>
    )
} 

export default TitlesHeaders