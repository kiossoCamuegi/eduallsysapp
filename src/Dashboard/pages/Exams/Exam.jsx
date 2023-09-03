import React from 'react';

import styled from 'styled-components';
import NewExam from '../../components/modal/NewExam';
import NewExamOnline from '../../components/modal/NewExamOnline'; 


function Exam() {
  document.title = "Exames"
  return (
    <div>
       <div className="ed-space">
          <div className="ed-flex"></div>
          <div className="ed-flex">
               <NewExamOnline/>
               <div className="ml-2">
                    <NewExam />
               </div>
          </div>
      </div>
      <Box> 
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

export default Exam