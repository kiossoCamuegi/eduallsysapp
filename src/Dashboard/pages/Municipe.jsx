import React from 'react'
import NewMnModal from '../components/modal/NewMnModal';
import MnTable from '../components/Table/MnTable';

function Municipe() {
    document.title = "Criar novo municipio";
    return (
      <div>
      <div className="ed-space">
          <div></div>
          <div className="ed-flex">
           <NewMnModal/>
          </div>
      </div>
      <div className="eduall-table">
           <MnTable/>
      </div>
    </div>
    )
}

export default Municipe