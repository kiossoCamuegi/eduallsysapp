import React from 'react'
import NewYearModal from '../components/modal/NewYearModal'
import YearsList from '../components/Table/YearsList'

function New_academic_year() {
  document.title = "Ano academico";
  return (
    <div>
        <div className="ed-space">
           <div></div>
           <div className="ed-flex">
               <NewYearModal/>
           </div>
        </div>
        <div className="eduall-table">
            <YearsList/>
        </div>
    </div>
  )
}

export default New_academic_year