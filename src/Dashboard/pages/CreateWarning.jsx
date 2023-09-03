import React from 'react'
import CreateWarningModal from '../components/modal/CreateWarningModal';
import WarningsList from '../components/Table/WarningsList';

function CreateWarning() {
    document.title = "Registar avisos";
    return (
      <div>
      <div className="ed-space">
          <div></div>
          <div className="ed-flex">
             <CreateWarningModal/>
          </div>
      </div>
      <div className="eduall-table">
            <WarningsList/>
      </div>
  </div>
 )
}

export default CreateWarning