import React from 'react'
import PaymentsTable from '../../components/Table/PaymentsTable'
import styled from 'styled-components'

function Generalpayments() {
  return (
    <Container> 
        <PaymentsTable/>
    </Container>
  )
}

const Container = styled.div`
   padding:0;
   position:relative;
`;

export default Generalpayments