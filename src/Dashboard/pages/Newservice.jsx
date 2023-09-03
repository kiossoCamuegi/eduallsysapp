import React from 'react'
import NewServiceModal from '../components/modal/NewServiceModal';
import ServicesTable from '../components/Table/ServicesTable';

function Newservice() {
    document.title = 'Lista dos serviços'; 
    return (
      <div>
        <div className="ed-space">
          <div></div>
            <div> 
              <NewServiceModal/>
            </div> 
        </div>
        <div className="eduall-table">
            <ServicesTable/>
        </div>
      </div>
    )
}

export default Newservice