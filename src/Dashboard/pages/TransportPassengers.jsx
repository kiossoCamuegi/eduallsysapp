import React from 'react'
import NewTransportPassengerModal from '../components/modal/NewTransportPassengerModal';
import TransportPassengersTable from '../components/Table/TransportPassengersTable';

function TransportPassengers() {
    document.title = "Lista dos passageiros no transporte";
    return (
      <div>
        <div className="ed-space">
          <div></div>
            <div> 
              <NewTransportPassengerModal/>
            </div> 
        </div>
        <div className="eduall-table">
            <TransportPassengersTable/>
        </div>
      </div>
    )
}

export default TransportPassengers