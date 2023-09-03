import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import InternetWidget from './InternetWidget'

function DashboardPageWrapper(props) {
  return (
    <div>
     <InternetWidget />  
       <div  className={`dashboard-container  ${props.mode} ${props.color}`}>  
        <Sidebar Access={props.access}   />
         <div className="dashboard-content">
            <Navbar /> 
            <div className="dashboard-pages "> 
            {props.content}
         </div>
       </div>             
      </div>
    </div>
  )
}

export default DashboardPageWrapper
