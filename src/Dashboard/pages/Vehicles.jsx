import React from 'react'
import NewVehicleModal from '../components/modal/NewVehicleModal';
import VehiclesTable from '../components/Table/VehiclesTable';

function Vehicles() {
    document.title = 'Lista das viaturas para o transporte'; 
    return (
      <div>
        <div className="ed-space">
          <div></div>
            <div> 
                <NewVehicleModal/>
            </div> 
        </div>
        <div className="eduall-table">
            <VehiclesTable/>
        </div>
      </div>
    )
}

export default Vehicles