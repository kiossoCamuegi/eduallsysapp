import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';

function SmallLoader(props) {
  return (
    <div>
        <CircularProgress size={props.sm ? 20 : (props.size ? props.size : 30) }   />
    </div>
  )
}

export default SmallLoader
