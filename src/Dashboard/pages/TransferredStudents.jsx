import React from 'react'
import NewStudentTransferModal from '../components/modal/NewStudentTransferModal'
import Transferredstudentstable from '../components/Table/Transferredstudentstable'

function TransferredStudents() {
    document.title = "Tranferir estudantes"
    return (
      <div>
      <div className="ed-space">
          <div></div>
          <div className="ed-flex">
           <NewStudentTransferModal/>
          </div>
      </div>
      <div className="eduall-table">
         <Transferredstudentstable/>
      </div>
    </div>
    )
}

export default TransferredStudents