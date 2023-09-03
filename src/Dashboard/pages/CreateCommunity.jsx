import React from 'react'
import NewCommunityModal from '../components/modal/NewCommunityModal'
import CommunitiesTable from '../components/Table/CommunitiesTable'

function CreateCommunity() {
    document.title = "Criar nova comuna";
    return (
      <div>
      <div className="ed-space">
          <div></div>
          <div className="ed-flex">
           <NewCommunityModal/>
          </div>
      </div>
      <div className="eduall-table">
           <CommunitiesTable/>
      </div>
    </div>
    )
}

export default CreateCommunity