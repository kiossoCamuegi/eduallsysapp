import React from 'react'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltips from 'react-bootstrap/Tooltip';

function Tooltip(props){

 const renderTooltip = (e)=>(
    <Tooltips id="button-tooltip" {...e} >
       {props.text ? props.text : ''}
    </Tooltips>
 )

  return (
     <OverlayTrigger placement={props.place} overlay={renderTooltip} delay={{show:250, hide:400}}>
           {
            props.toggle_btn ? props.toggle_btn : <div></div>
           }
     </OverlayTrigger>
  )
}

export default Tooltip