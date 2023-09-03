import React from 'react'
import NewCicleModal from '../components/modal/NewCicleModal';
import CiclesTable from '../components/Table/CiclesTable';

function NewCicle() {
    document.title = 'Lista dos ciclos'; 
    return (
      <div>
        <div className="ed-space">
          <div></div>
            <div> 
              <NewCicleModal/>
            </div> 
        </div>
        <div className="eduall-table">
            <CiclesTable/>
        </div>
      </div>
    )
}

export default NewCicle