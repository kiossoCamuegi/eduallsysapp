import React from 'react' 
import EnrolledStudents from '../components/Table/EnrolledStudents';

function StudentEnroll() {
document.title = 'Lista das sessões'; 
  return (
    <div>
        <div className="ed-space">
          <div></div>
            <div> 
     
            </div> 
        </div>
        <div className="eduall-table">
            <EnrolledStudents/>
        </div>
  </div>
  )
}

export default StudentEnroll