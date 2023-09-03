import { Avatar } from '@material-ui/core';
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

function FriendBox({props}){
  return (
    <Link to={props.link ? props.link : ''}>
      <Box>
          <Avatar src={props.img ? props.img : ''} alt={props.name ? props.name : ''} sx={{width:50,height:50}} />
          <p>{props.name ? props.name : ''}</p>
      </Box>
    </Link>
  )
}


const Box = styled.div`
  margin:10px 0px;
  display:flex;
  align-items:center;

   p{
     font-size:15px;
     margin-left:10px;
     color:var(--black);
     font-weight:500;
   }
`;

export default FriendBox