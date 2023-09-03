import React from 'react'
import NewJobTitle from '../components/modal/NewJobTitle';
import JobsTitlesTable from '../components/Table/JobsTitlesTable';

function JobTitles() {
    document.title = "Criar nova profissão";
    return (
      <div>
      <div className="ed-space">
          <div></div>
          <div className="ed-flex">
           <NewJobTitle/>
          </div>
      </div>
      <div className="eduall-table">
           <JobsTitlesTable/>
      </div>
    </div>
    )
}

export default JobTitles