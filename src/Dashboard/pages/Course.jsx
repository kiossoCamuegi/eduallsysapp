import React from 'react'  
import NewCourseModal from '../components/modal/NewCourseModal';
import CoursesList from '../components/Table/CoursesList';

function Course() {
  document.title = "Cursos";
  return (
    <div>
        <div className="ed-space">
            <div></div>
            <div className="ed-flex">
             <NewCourseModal/>
            </div>
        </div>
        <div className="eduall-table">
             <CoursesList/>
        </div>
    </div>
  )
}

export default Course