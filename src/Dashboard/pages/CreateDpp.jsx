import React from 'react'
import CreateDppModal from '../components/modal/CreateDppModal';
import DisciplinarProcessTable from '../components/Table/DisciplinarProcessTable';

function CreateDpp() {
    document.title = "Criar processo disciplinar";
    return (
      <div>
      <div className="ed-space">
          <div></div>
          <div className="ed-flex">
             <CreateDppModal/>
          </div>
      </div>
      <div className="eduall-table">
            <DisciplinarProcessTable/>
      </div>
  </div>
    )
}

export default CreateDpp