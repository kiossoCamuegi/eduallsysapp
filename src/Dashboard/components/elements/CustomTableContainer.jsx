import React from 'react'
import { styled } from 'styled-components'

function CustomTableContainer(props) {
  return (
     <Container>
        <div className="title"><h1>{props.title}</h1></div>
        {props.content}
     </Container>
  )
}


const Container = styled.div`
  margin:30px 0px;
  border-radius:6px;   
  background:var(--ed-white);  
  box-shadow:var(--ed-shadow-df); 
  padding:20px;
  text-align:left !inportant;

  .title{
      width:100%; 
      text-align:left !inportant;

        h1{
            font-size: 18px;
            font-weight:bolder !important;
            margin: 0px; 
            margin-bottom:20px;
        }
  }

    table, .ed-table-container, .custom-table{
        box-shadow:unset !important; 
    }

    .empty-search{
        width:100%;
        min-height:500px;
        display:flex;
        align-items:center;
        justify-content:center;

           img{
              max-width:900px; 
           }
    }
`;



export default CustomTableContainer
