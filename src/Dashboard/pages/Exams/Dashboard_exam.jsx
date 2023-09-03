import React from 'react'
import styled from 'styled-components';
import Chart_1 from '../../components/elements/Charts/Exams/Chart_1';
import Chart_2 from '../../components/elements/Charts/Exams/Chart_2';
import Chart_3 from '../../components/elements/Charts/Exams/Chart_3';  


function Dashboard_exam() {
 document.title = "Dashboard de exames";
  return (
    <div> 
      <div className="ed-exam-charts ed-space">
        <div className="col-lg-4">
           <Box>
              <h2>Exames por estado </h2>
              <div className="center">
                 <Chart_1/>
              </div>
           </Box>
        </div>
        <div className="pdm-2"></div>
        <div className="hundred">
            <Box>
              <h2>Exames por categoria </h2>
                <Chart_2/>
            </Box>
        </div>
      </div>
      <Box>
          <h2>Registro de exames por mês </h2>
          <Chart_3/>
      </Box>
    </div>
  )
}


const Box = styled.div`
    width:100%; 
    border-radius:6px;   
    padding:20px;
    min-height:428px;
    background:var(--ed-white);  
    box-shadow:var(--ed-shadow-df);
    margin:20px 0; 

   .center{
      margin:auto;
   }

    h2{
      text-transform:capitalize;
      font-size:17px;
      font-weight:600;
   }
`;

export default Dashboard_exam