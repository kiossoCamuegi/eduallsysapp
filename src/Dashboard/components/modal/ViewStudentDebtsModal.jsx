import React, {useState} from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Modal, Form, Button} from 'react-bootstrap'
import { Save } from '@mui/icons-material';
import DraggableModal from '../../../General/components/DraggableModal';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { Link } from 'react-router-dom';
import { Avatar } from '@mui/material';

function ViewStudentDebtsModal(props){
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
          <Link className='text-dark ed-flex' onClick={handleShow}>
              <Avatar alt={props.studentName != null ? props.studentName : ''} 
               src={props.studentPicture != null ? props.studentPicture : ''} /> 
              <div className="ed-flex">
                  <RemoveRedEyeOutlinedIcon className='ml-2'  /> 
                  <span className='ml-2'>{props.studentName != null ? props.studentName : ''}</span>
              </div>
          </Link>
          <Modal className='animate__animated animate__zoomInDown'   dialogAs={DraggableModal}  show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title><h5>Registrar ano Académica</h5></Modal.Title>
            </Modal.Header>
            <Modal.Body className='scrollLimit'>
              <Form>
                
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <div className="ed-space">
                 <Button className='bg-light text-dark' onClick={handleClose}> Cancelar </Button>
                 <Button className="btn btn-main" onClick={handleClose}>
                     <Save/> Salvar  
                  </Button>
              </div>
            </Modal.Footer>
          </Modal>
        </div>
      )
}

export default ViewStudentDebtsModal