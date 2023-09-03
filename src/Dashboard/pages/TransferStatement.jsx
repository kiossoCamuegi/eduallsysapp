import React from 'react'
import TransferStudentStatementTable from '../components/Table/TransferStudentStatementTable'

function TransferStatement() {
  document.title = "Lista das declarações"
    return (
      <div>
      <div className="ed-space">
          <div></div>
          <div className="ed-flex">
               
          </div>
      </div>
      <div className="eduall-table">
            <TransferStudentStatementTable/>
      </div>
    </div>
    )
}

export default TransferStatement