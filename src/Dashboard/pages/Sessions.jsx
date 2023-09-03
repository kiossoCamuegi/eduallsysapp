import React from 'react'
import NewSession from '../components/modal/NewSession';
import SessionsTable from '../components/Table/SessionsTable';

function Sessions() {
    document.title = 'Lista das sessões'; 
    return (
      <div>
        <div className="ed-space">
          <div></div>
            <div> 
              <NewSession/>
            </div> 
        </div>
        <div className="eduall-table">
            <SessionsTable/>
        </div>
      </div>
    )
}
export default Sessions