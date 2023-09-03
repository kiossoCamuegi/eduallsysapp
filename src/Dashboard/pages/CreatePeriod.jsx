import React from 'react'
import NewPeriodModal from '../components/modal/NewPeriodModal'; 
import PeriodsTable from '../components/Table/PeriodsTable';

function CreatePeriod() {
    document.title = "Criar periodo";
    return (
      <div>
      <div className="ed-space">
          <div></div>
          <div className="ed-flex">
           <NewPeriodModal/>
          </div>
      </div>
      <div className="eduall-table">
           <PeriodsTable/>
      </div>
    </div>
    )
}

export default CreatePeriod