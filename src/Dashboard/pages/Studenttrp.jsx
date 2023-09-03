import React from 'react'
import NewStudentTrp from '../components/modal/NewStudentTrp';
import StudentsTrpTable from '../components/Table/StudentsTrpTable';

function Studenttrp() {
    document.title = 'Efetuar Transferência'; 
    return (
      <div>
        <div className="ed-space">
          <div></div>
            <div> 
               <NewStudentTrp/>
            </div> 
        </div>
        <div className="eduall-table">
            <StudentsTrpTable/>
        </div>
      </div>
    )
}

export default Studenttrp