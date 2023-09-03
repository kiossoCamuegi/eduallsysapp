import React from 'react'
import NewBusStop from '../components/modal/NewBusStop'
import BusStopList from '../components/Table/BusStopList'

function busStop() {
  return (
    <div>
    <div className="ed-space">
        <div></div>
        <div className="ed-flex">
         <NewBusStop/>
        </div>
    </div>
    <div className="eduall-table">
         <BusStopList/>
    </div>
  </div>
  )
}

export default busStop