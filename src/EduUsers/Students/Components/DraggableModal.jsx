import React from 'react'
import {ModalDialog} from 'react-bootstrap';
import Draggable   from 'react-draggable';


export default class DraggableModal extends React.Component {
  render(){
    return <Draggable style={{cursor:'move'}}  handle='.modal-header'><ModalDialog {...this.props}/></Draggable>
  }
} 