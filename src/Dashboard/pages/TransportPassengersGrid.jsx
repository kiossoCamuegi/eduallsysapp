
import React, { useState } from 'react'
import { Link } from 'react-router-dom';  
import { Form } from 'react-bootstrap' 
import { Search } from '@mui/icons-material';
import NewTransportPassengerModal from '../components/modal/NewTransportPassengerModal';
import TransportStudentsGrid from '../components/Grid/TransportStudentsGrid';


function TransportPassengersGrid() {
  document.title = 'Lista dos passageiros grade'; 
  const [data, setData] = useState([]);
 

    return (
      <div>
        <div className="ed-space">
          <div className='ed-flex'>
            <Form>
              <div className='search-box'>
              <Form.Group>
                    <div className="ed-flex fill">
                     <Search/>
                        <div className="block ml-2"> 
                            <Form.Control  type="text"  placeholder="Escreva qualquer coisa"  autoFocus /> 
                        </div>
                        <div className="block ml-2"> 
                            <Form.Select select>
                                  <option selected disabled>Turma</option>
                             </Form.Select> 
                        </div> 
                    </div> 
               </Form.Group> 
              </div>
            </Form>
          </div>
            <div> 
               <NewTransportPassengerModal/>
            </div> 
        </div>
        <div className="eduall-grade">
            <TransportStudentsGrid  />
        </div>
      </div>
    )
}

export default TransportPassengersGrid