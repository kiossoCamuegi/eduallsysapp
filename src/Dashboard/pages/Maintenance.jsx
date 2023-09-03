import React from 'react'
import NewMaintenenceModal from '../components/modal/NewMaintenenceModal';
import MaintenanceTable from '../components/Table/MaintenanceTable';

function Maintenance() {
    document.title = 'Lista das viaturas para manutenção'; 
    return (
      <div>
        <div className="ed-space">
          <div></div>
            <div> 
                <NewMaintenenceModal/>
            </div> 
        </div>
        <div className="eduall-table">
            <MaintenanceTable/>
        </div>
      </div>
    )
}

export default Maintenance