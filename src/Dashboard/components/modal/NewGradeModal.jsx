import React, {useState} from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Modal, Form, Button} from 'react-bootstrap'
import { Save } from '@mui/icons-material';
import DraggableModal from '../../../General/components/DraggableModal';

function NewGradeModal() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  return (
    <div>
         <div>
    <button className='btn btn-main ml-2' onClick={handleShow}>
        <AddCircleOutlineIcon/> Registrar pontuação
   </button> 
   <Modal size='lg' dialogAs={DraggableModal}  centered  className='animate__animated animate__zoomInDown'  show={show} onHide={handleClose}>
     <Modal.Header closeButton>
       <Modal.Title><h5>Registrar pontuação</h5></Modal.Title>
     </Modal.Header>
     <Modal.Body className='scrollLimit'>
       <Form>
         <Form.Group className="mb-3"  >
           <Form.Label>Titulo<span className="text-danger ml-2">*</span> </Form.Label>
           <Form.Control type="text" autofocus/>
         </Form.Group>   
         <Form.Group className="mb-3"  >
           <Form.Label>Pontução (%)<span className="text-danger ml-2">*</span> </Form.Label>
           <Form.Control type="number" autofocus/>
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
    </div>
  )
}

export default NewGradeModal