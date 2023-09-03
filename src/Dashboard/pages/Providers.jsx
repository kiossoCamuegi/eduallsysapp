import React from 'react'
import NewproviderModal from '../components/modal/NewproviderModal';
import ProviderTable from '../components/Table/ProviderTable';

function Providers() {
    document.title = 'Lista dos fornecedores'; 
    return (
      <div>
        <div className="ed-space">
          <div></div>
            <div> 
              <NewproviderModal/>
            </div> 
        </div>
        <div className="eduall-table">
            <ProviderTable/>
        </div>
      </div>
    )
}

export default Providers