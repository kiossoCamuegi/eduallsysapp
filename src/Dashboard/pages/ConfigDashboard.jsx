import React from 'react'
import WidgetBox from '../components/elements/DashboardComponents/Widgets/WidgetBox';


function ConfigDashboard() {
  return (
    <div className='dashboard-components'>
         <section>
             <h2>Widgets</h2>
             <WidgetBox/>
         </section>
    </div>
  )
}

export default ConfigDashboard