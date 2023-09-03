import { Avatar } from '@mui/material'
import React from 'react'

function StyleBadge(props) {
  return (
    <div>
         <Avatar sx={props.size}  src={props.source} />
    </div>
  )
}

export default StyleBadge