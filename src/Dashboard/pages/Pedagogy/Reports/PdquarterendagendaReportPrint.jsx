import React from 'react'
import PdquarterendagendaReport from '../../../components/Reports/PdquarterendagendaReport';
import Navbar from '../../../components/elements/Navbar';
import { styled } from 'styled-components';

function PdquarterendagendaReportPrint() {
    document.title =  "";
    return (
      <div>
          <Navbar logo />  
            <Container> 
             <div className="eduall-print-area horizontal-view">
                <div className='hz-box' >
                    <PdquarterendagendaReport/>
                  </div>
              </div> 
            </Container> 
      </div>
    );
}


const Container = styled.div`
    width:100%; 
    position:relative;
`; 

export default PdquarterendagendaReportPrint
