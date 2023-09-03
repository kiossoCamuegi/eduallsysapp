import React from 'react'
import NewFeeModal from '../components/modal/NewFeeModal'
import FeesList from '../components/Table/FeesList'

function Fees() {
    document.title = "Taxas"
    return (
      <div>
      <div className="ed-space">
          <div></div>
          <div className="ed-flex">
           <NewFeeModal/>
          </div>
      </div>
      <div className="eduall-table">
           <FeesList/>
      </div>
    </div>
    )
}

export default Fees