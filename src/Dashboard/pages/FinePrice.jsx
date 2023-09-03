import React from 'react'
import NewFinePriceModal from '../components/modal/NewFinePriceModal';
import styled from 'styled-components'; 
import FinesTable from '../components/Table/FinesTable';

function FinePrice() {
    document.title = 'Aplicar multas'; 
    return (
      <div> 
           <div className="ed-space">
            <div></div>
            <div><NewFinePriceModal/></div>
           </div>
           <FinesTable/>
      </div>
    )
}

 
export default FinePrice