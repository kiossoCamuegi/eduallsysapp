import React from 'react'
import NewActivityType from '../components/modal/NewActivityType'; 

function ActivityType() {
  document.title = 'Tipos de actividades';  
  return (
    <div>
    <div className="ed-space">
        <div></div>
        <div className="ed-flex">
            <NewActivityType/>
        </div>
    </div>
    <div className="eduall-table">
         
    </div>
   </div>
  )
}

export default ActivityType