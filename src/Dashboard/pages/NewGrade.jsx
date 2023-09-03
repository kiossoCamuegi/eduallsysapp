import React from 'react'
import NewGradeModal from '../components/modal/NewGradeModal';
import GradesTable from '../components/Table/GradesTable';

function NewGrade() {
    document.title = 'Registrar pontuação'; 
    return (
      <div>
        <div className="ed-space">
          <div></div>
            <div> 
              <NewGradeModal/>
            </div> 
        </div>
        <div className="eduall-table">
            <GradesTable/>
        </div>
      </div>
    )
}

export default NewGrade