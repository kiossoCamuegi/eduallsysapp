import React from 'react'
import PdMiniguidelinesReport from '../../../components/Reports/PdMiniguidelinesReport'
import Navbar from '../../../components/elements/Navbar';
import { styled } from 'styled-components';

function PdMiniguidelinesReportPrint() {
 document.title =  "Mini-pautas relatorios";
  return (
    <div>
        <Navbar logo />  
          <Container> 
           <div className="eduall-print-area horizontal-view">
              <div className='hz-box' >
                  <PdMiniguidelinesReport/>
                </div>
            </div> 
          </Container> 
    </div>
  )
}


const Container = styled.div`
    width:100%; 
    position:relative;
`; 
export default PdMiniguidelinesReportPrint
