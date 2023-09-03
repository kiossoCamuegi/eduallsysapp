import React, {useState} from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Modal, Form, Button} from 'react-bootstrap'
import DraggableModal from '../../../General/components/DraggableModal';

function NewStudentModal() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


  return (
    <div>
       <button className='btn btn-main' onClick={handleShow}>
           <AddCircleOutlineIcon/> Registrar novo estudante
      </button> 
      <Modal className='animate__animated animate__zoomInDown'  centered  dialogAs={DraggableModal}  show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><h5>Registrar estudante</h5></Modal.Title>
        </Modal.Header>
        <Modal.Body className='scrollLimit'>
          <Form>
            <Form.Group className="mb-3"  >
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <div className="ed-space">
             <Button className='bg-light' onClick={handleClose}> Cancelar </Button>
             <Button className="btn btn-main" onClick={handleClose}> Salvar  </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default NewStudentModal