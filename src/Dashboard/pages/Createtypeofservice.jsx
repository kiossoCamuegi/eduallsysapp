import React from 'react'
import NewTypeOfService from '../components/modal/NewTypeOfService';
import TypeofServiceTable from '../components/Table/TypeofServiceTable';

function Createtypeofservice() {
    document.title = "Registrar tipo de serviço";
    return (
      <div>
      <div className="ed-space">
          <div></div>
          <div className="ed-flex">
             <NewTypeOfService/>
          </div>
      </div>
      <div className="eduall-table">
            <TypeofServiceTable/>
      </div>
    </div>
    )
}

export default Createtypeofservice