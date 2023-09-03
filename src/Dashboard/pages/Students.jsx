import React from 'react'
import { Link } from 'react-router-dom';
import StudentList from '../components/Table/StudentList' 
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'; 
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined';

function Students() {
  document.title = 'Lista dos estudantes'; 
  return (
    <div>
      <div className="ed-space">
        <div></div>
          <div>
            <Link className='btn bg-green-light' to='/StudentsGrid'>
                <BallotOutlinedIcon/>
            </Link>
             <Link className='btn bg-main ml-2' to='/NewStudentBase'> 
                <AddCircleOutlineIcon/> Registrar novo estudante
             </Link>
          </div> 
      </div>
      <div className="eduall-table">
          <StudentList/>
      </div>
    </div>
  )
}

export default Students