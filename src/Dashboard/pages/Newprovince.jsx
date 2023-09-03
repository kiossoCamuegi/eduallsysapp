import React from 'react'
import NewPrvModal from '../components/modal/NewPrvModal';
import PrvTable from '../components/Table/PrvTable';

function Newprovince() {
    document.title = "Criar nova provincia";
    return (
      <div>
      <div className="ed-space">
          <div></div>
          <div className="ed-flex">
              <NewPrvModal/>
          </div>
      </div>
      <div className="eduall-table">
           <PrvTable/>
      </div>
    </div>
    )
}

export default Newprovince