import React from 'react'
import NewDriverModal from '../components/modal/NewDriverModal';
import DriversTable from '../components/Table/DriversTable';

function Drivers() {
    document.title = "Registrar motorista";
    return (
      <div>
          <div className="ed-space">
              <div></div>
              <div className="ed-flex">
               <NewDriverModal/>
              </div>
          </div>
          <div className="eduall-table">
               <DriversTable/>
          </div>
      </div>
    )
}

export default Drivers