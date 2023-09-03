import React from 'react'
import NewRequestModal from '../components/modal/NewRequestModal';
import RequestsTable from '../components/Table/RequestsTable';

function UsersRequests() {
    document.title = 'Atender solicitações'; 
    return (
      <div>
        <div className="ed-space">
          <div></div>
            <div> 
                 <NewRequestModal/>
            </div> 
        </div>
        <div className="eduall-table">
             <RequestsTable/>
        </div>
      </div>
    )
}

export default UsersRequests