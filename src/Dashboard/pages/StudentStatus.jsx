import React from 'react'
import NewStudentStatusModal from '../components/modal/NewStudentStatusModal';
import StudentStatusTable from '../components/Table/StudentStatusTable';

function StudentStatus() {
    document.title = "Criar Status";
    return (
      <div>
      <div className="ed-space">
          <div></div>
          <div className="ed-flex">
           <NewStudentStatusModal/>
          </div>
      </div>
      <div className="eduall-table">
           <StudentStatusTable/>
      </div>
    </div>
    )
}

export default StudentStatus