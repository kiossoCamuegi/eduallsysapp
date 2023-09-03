import React from 'react'
import { Table } from 'react-bootstrap'
import styled from 'styled-components'

function StudentDebtsTable() {
  return (
      <Container>
      <Table bordered hover size="sm">
      <thead style={{background:'var(--ed-background-color)'}}>
        <tr> 
          <th>
              <div className="ed-space">
                <TL><h3 className='text-red'>Total</h3></TL>
                <TL><h3 className='text-red'> 83.000.00 AOA</h3></TL>
              </div> 
           </th> 
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
               <Block>
                    <div><strong>Propina de janeiro</strong></div>
                    <div className="mt-2"><span>Ano acad 2020-2021</span></div>
                </Block> 
           </td> 
        </tr>  
         <tr>
          <td>
               <Block>
                    <div><strong>Propina de janeiro</strong></div>
                    <div className="mt-2"><span>Ano acad 2020-2021</span></div>
                </Block> 
           </td> 
        </tr>  
      </tbody>
    </Table>
    <br /><br />
      </Container>
  )
}



const Container = styled.div`
   
`;

const TL = styled.div`
     padding:10px;
     h3{
       font-size:18px;
        margin:0px;
     }

       @media screen and (max-width:1280px){
        h3{
           font-size:16px;    
        }
`;


const Block = styled.div`
    display:block;
    strong{
      font-size:16px;
    }
    span{
      font-size:14px;
    }
`;



export default StudentDebtsTable