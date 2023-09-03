import React from 'react'
import NewClassRoomModal from '../components/modal/NewClassRoomModal'
import ClassroomList from '../components/Table/ClassroomList'

function ClassRoom() {
  document.title = "Salas de aula";
  return (
    <div>
    <div className="ed-space">
        <div></div>
        <div className="ed-flex">
         <NewClassRoomModal/>
        </div>
    </div>
    <div className="eduall-table">
         <ClassroomList/>
    </div>
</div>
  )
}

export default ClassRoom