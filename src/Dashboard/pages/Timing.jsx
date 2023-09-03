import React from 'react'
import NewTime from '../components/modal/NewTime';
import TimeList from '../components/Table/TimeList';

function Timing() {
    document.title = 'Lista dos horarios'; 
    return (
      <div>
        <div className="ed-space">
          <div></div>
            <div> 
              <NewTime/>
            </div> 
        </div>
        <div className="eduall-table">
            <TimeList/>
        </div>
      </div>
    )
}

export default Timing