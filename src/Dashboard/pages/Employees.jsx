import React from 'react'
import { Link } from 'react-router-dom'; 
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'; 
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined';
import EmployeeList from '../components/Table/EmployeeList';

function Employees() {
    document.title = 'Lista dos funcionarios'; 
    return (
      <div>
        <div className="ed-space">
          <div></div>
            <div>
              <Link className='btn bg-green-light' to='/employees_grid'>
                  <BallotOutlinedIcon/>
              </Link>
               <Link className='btn bg-main ml-2' to='/new_employee'> 
                  <AddCircleOutlineIcon/> Registrar novo funcionario
               </Link>
            </div> 
        </div>
        <div className="eduall-table">
            <EmployeeList/>
        </div>
      </div>
    )
}

export default Employees