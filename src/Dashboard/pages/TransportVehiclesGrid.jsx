
import React from 'react'
import { Link } from 'react-router-dom';
import StudentListGrid from '../components/Grid/StudentListGrid' 
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'; 
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import { Form } from 'react-bootstrap' 
import { Search } from '@mui/icons-material';
import VehiclesGrid from '../components/Grid/VehiclesGrid';
import NewVehicleModal from '../components/modal/NewVehicleModal';

function TransportVehiclesGrid() {
    document.title = 'Lista dos veiculos'; 
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
                                  <option selected disabled>Motorista</option>
                             </Form.Select> 
                        </div> 
                    </div> 
               </Form.Group> 
              </div>
            </Form>
          </div>
            <div className='d-flex'>
              <Link className='btn bg-green-light' to='/Students'>
                  <SummarizeOutlinedIcon/> Lista dos veiculos
              </Link>
             <div className="ml-2"> <NewVehicleModal/></div>
            </div> 
        </div>
        <div className="eduall-grid">
            <VehiclesGrid/>
        </div>
      </div>
    )
}

export default TransportVehiclesGrid