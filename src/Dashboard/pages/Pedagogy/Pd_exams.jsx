import React from 'react'
import { Link } from 'react-router-dom'; 
import NewExamModal from '../../components/modal/Pedagogy/NewExamModal';
import PdExams_table from '../../components/Table/PdExams_table';
import {BsCalendar2Date} from "react-icons/bs";

function Pd_exams() {
    document.title = 'Calendário de provas'; 
    return (
      <div>
        <div className="ed-space">
          <div></div>
            <div className='ed-flex'> 
              <Link className='btn bg-green-light btn-icon' to='/exams_calendar'>
                  <BsCalendar2Date/>
              </Link>
               <div className='ml-2'><NewExamModal /></div>
            </div> 
        </div>
        <div className="eduall-table">
            <PdExams_table />
        </div>
      </div>
    )
}

export default Pd_exams
