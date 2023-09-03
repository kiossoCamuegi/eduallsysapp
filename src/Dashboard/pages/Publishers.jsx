import React from 'react'
import NewPublisherModal from '../components/modal/NewPublisherModal'
import PublisherTable from '../components/Table/PublisherTable'

function Publishers() {
    document.title = "Registrar editoras"
    return (
      <div>
      <div className="ed-space">
          <div></div>
          <div className="ed-flex">
           <NewPublisherModal/>
          </div>
      </div>
      <div className="eduall-table">
           <PublisherTable/>
      </div>
    </div>
    )
}

export default Publishers