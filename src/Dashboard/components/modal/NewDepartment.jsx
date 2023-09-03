import React, {useState} from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Modal, Form, Button} from 'react-bootstrap'
import { Save } from '@mui/icons-material';
import DraggableModal from '../../../General/components/DraggableModal';

function NewDepartment() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  return (
   <div>
    <button className='btn btn-main' onClick={handleShow}>
        <AddCircleOutlineIcon/> Registrar departamento
   </button> 
    <Modal  centered  className='animate__animated animate__zoomInDown'  dialogAs={DraggableModal}  show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title><h5>Registrar departamento</h5></Modal.Title>
    </Modal.Header>
    <Modal.Body className='scrollLimit'>
      <Form>
        <Form.Group className="mb-3"  >
          <Form.Label>Titulo<span className="text-danger ml-2">*</span> </Form.Label>
          <Form.Control required type="text" autoFocus/>
        </Form.Group>
        <Form.Group className="mb-3"  >
          <Form.Label>Código<span className="text-danger ml-2">*</span> </Form.Label>
          <Form.Control type="text" required/>
        </Form.Group> 
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <div className="ed-space">
         <Button className='bg-light text-dark' onClick={handleClose}> Cancelar </Button>
         <Button className="btn btn-main" onClick={handleClose}><Save/> Salvar  </Button>
      </div>
    </Modal.Footer>
  </Modal>
   </div>
  )
}

export default NewDepartment