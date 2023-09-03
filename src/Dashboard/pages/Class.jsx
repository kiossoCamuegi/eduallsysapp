import React from 'react'
import NewClassModal from '../components/modal/NewClassModal'
import ClassList from '../components/Table/ClassList' 

function Class() {
  document.title = "Criar Turmas"
  return (
    <div>
    <div className="ed-space">
        <div></div>
        <div className="ed-flex">
         <NewClassModal/>
        </div>
    </div>
    <div className="eduall-table">
         <ClassList/> 
    </div>
  </div>
  )
}

export default Class