import * as React from 'react'; 
import TableGrid from '../../General/components/TableGrid';
import styled from 'styled-components';
import FeespaymentsTable from '../components/Table/FeespaymentsTable';
import Table from '../../Table';

 


function Kiosso() {
  
    return(
       <div className="d-flex bg-green" style={{width:'100%'}}> 
           <Box className='bg-primary'></Box>  
             <div className="col bg-green">
                <Table/>
          </div> 
       </div>
      )
}


const Box = styled.div`
   width:350px; 
   min-width:350px;
   height:100vh;
`;


export default Kiosso
