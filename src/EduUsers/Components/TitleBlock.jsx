import React from 'react'
import styled from 'styled-components'

function TitleBlock(props){
  return (
    <Block>
        <h1>
             <span>{props.title ? props.title : ''}</span>
            <div className="line bg-main-light"></div>
        </h1>
    </Block>
  )
}


const Block = styled.div` 
   margin-bottom:40px;

    h1{
      position:relative;
      margin:0px;
      width:max-content;
      font-size:18px;
      color:var(--black);
      font-weight:bold;
      display:block;
       
        .line{ 
            position:absolute;´
            left:0px;
            top:30px;
            width:90%;
            height:5px;
            border-radius:30px;
        }
    }
`;

export default TitleBlock