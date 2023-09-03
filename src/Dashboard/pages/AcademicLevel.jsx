import React from 'react'
import NewAcademicLevelModal from '../components/modal/NewAcademicLevelModal'
import AcademicLevelTable from '../components/Table/AcademicLevelTable'

function AcademicLevel() {
    document.title = "registrar classe"
  return (
    <div>
    <div className="ed-space">
        <div></div>
        <div className="ed-flex">
         <NewAcademicLevelModal/>
        </div>
    </div>
    <div className="eduall-table">
         <AcademicLevelTable/>
    </div>
  </div>
  )
}

export default AcademicLevel