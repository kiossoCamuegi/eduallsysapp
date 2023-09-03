
import React from 'react'
import NewLibraryRackModal from '../components/modal/NewLibraryRackModal'
import RackLibraryTable from '../components/Table/RackLibraryTable'

function LibraryRacks() {
    document.title = "Adicionar prateleiras"
    return (
      <div>
      <div className="ed-space">
          <div></div>
          <div className="ed-flex">
           <NewLibraryRackModal/>
          </div>
      </div>
      <div className="eduall-table">
           <RackLibraryTable/>
      </div>
    </div>
    )
}

export default LibraryRacks