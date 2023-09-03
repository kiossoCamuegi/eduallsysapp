import React from 'react'
import NewDepartment from '../components/modal/NewDepartment';
import DepartmentsList from '../components/Table/DepartmentsList';

function Departments() {
    document.title = 'Departamentos';  
  return (
    <div>
    <div className="ed-space">
        <div></div>
        <div className="ed-flex">
            <NewDepartment/>
        </div>
    </div>
    <div className="eduall-table">
         <DepartmentsList/>
    </div>
   </div>
  )
}

export default Departments