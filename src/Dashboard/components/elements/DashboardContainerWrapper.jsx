import React, { useState } from 'react'
import { styled } from 'styled-components'

function DashboardContainerWrapper(props) { 
    let reduceNumber = 400;
    const [CurrentWidth, setCurrentWidth] = useState((window.innerWidth-reduceNumber)+"px");  

    window.onresize = (e)=>{ 
        setCurrentWidth((e.target.innerWidth - reduceNumber) +"px"); 
    }

   

  return (
     <Container className='ed-flex ed-center'>
         <div className='content-pages' style={{width:CurrentWidth, maxWidth:CurrentWidth}}>
            <div className="ed-flex">
                <div className='ctc'> 
                  {props.content}
                </div>
            </div>
        </div>
        <br />
     </Container>
  )
}


const Container = styled.div`
   margin:0 auto;
   width:100%;  

     .content-pages{
          overflow-x:auto; 
          text-align: left !important;

          .ctc{
              width:100%;
              text-align: left !important;
          }
     }
`;

export default DashboardContainerWrapper
