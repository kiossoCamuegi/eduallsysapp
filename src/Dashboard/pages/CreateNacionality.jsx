import React from 'react'
import NewNacionalityModal from '../components/modal/NewNacionalityModal';
import NacionalityTable from '../components/Table/NacionalityTable';

function CreateNacionality() {
    document.title = "Criar nova Nacionalidade";
    return (
      <div>
      <div className="ed-space">
          <div></div>
          <div className="ed-flex">
             <NewNacionalityModal/>
          </div>
      </div>
      <div className="eduall-table">
           <NacionalityTable/>
      </div>
    </div>
    )
}

export default CreateNacionality