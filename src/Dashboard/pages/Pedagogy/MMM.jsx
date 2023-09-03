import React from 'react'
import TableX from './TableX'
import TableY from './TableY'
import { styled } from 'styled-components'

function MMM() {
  return (
   <Cont> 
        <TableX/>
          <br />
       <TableY/> 
   </Cont>
  )
}



const Cont = styled.div`
   .ag-theme-alpine{
      min-height:600px;
   }
`;

export default MMM
