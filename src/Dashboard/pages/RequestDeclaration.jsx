import React from 'react'
import NewDeclarationRequestModal from '../components/modal/NewDeclarationRequestModal';
import RequestedDeclarationsTable from '../components/Table/RequestedDeclarationsTable';

function RequestDeclaration() {
    document.title = 'Solicitar declaração'; 
    return (
      <div>
        <div className="ed-space">
          <div></div>
            <div> 
                <NewDeclarationRequestModal/>
            </div> 
        </div>
        <div className="eduall-table">
              <RequestedDeclarationsTable/>
        </div>
      </div>
    )
}

export default RequestDeclaration