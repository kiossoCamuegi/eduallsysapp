import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'

function TaskBox({props}){
  return (
     <Link to={props.link ? props.link : '#'}>
        <Box style={{background:props.color ? props.color : '#000'}}>
            <h4>{props.title ? props.title : ''}</h4>
            <div className="block">
                <div className="date">data de entrega</div>
                <span>{props.date ? props.date : ''}</span>
            </div>
        </Box>                 
     </Link>
  )
}


const Box = styled.div`
   margin:20px 0px;
   width:100%;
   min-height:100px;
   border-radius:6px;
   padding:10px;

   h4{
      color:var(--ed-blue-dark);
      font-size:16px;
      margin:0px;
      font-weight:bold;
   }

   .block{
      margin-top:10px;

      .date{
        font-size:14px;
        color:var(--ed-blue-dark);
        margin-bottom:5px;
      }

      span{
          color:grey;
          font-size:13px;
      }
   }

     
`;

export default TaskBox