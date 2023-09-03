import React from 'react'
import SubjectsTable from '../components/Table/SubjectsTable'; 
import NewSubject from '../components/modal/NewSubject';


function Subjects() {
    document.title = 'Lista das disciplinas'; 
    return (
      <div>
        <div className="ed-space">
          <div></div>
            <div> 
              <NewSubject/>
            </div> 
        </div>
        <div className="eduall-table">
            <SubjectsTable/>
        </div>
      </div>
    )
}

export default Subjects