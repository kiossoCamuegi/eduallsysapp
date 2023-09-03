import React, {useState} from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Modal, Form, Button} from 'react-bootstrap'
import { Password, Save } from '@mui/icons-material';
import DraggableModal from '../../../General/components/DraggableModal';

function NewUserAccount() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  return (
    <div>
    <button className='btn btn-main' onClick={handleShow}>
        <AddCircleOutlineIcon/> Registrar novo usúario
   </button> 
    <Modal  centered size='lg'  className='animate__animated animate__zoomInDown'  dialogAs={DraggableModal}  show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title><h5> Registrar novo usúario</h5></Modal.Title>
    </Modal.Header>
    <Form>
    <Modal.Body className='scrollLimit'>
        <Form.Group className="mb-3">
          <Form.Label>Nome de usúario<span className="text-danger">*</span> </Form.Label>
          <Form.Control required type="text" autoFocus/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Código de funcionario<span className="text-danger">*</span> </Form.Label>
          <Form.Control required type="text" autoFocus/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email<span className="text-danger">*</span></Form.Label>
          <Form.Control type="text" required/>
        </Form.Group> 
        <Form.Group className="mb-3"  >
          <Form.Label>Nivel de Acesso<span className="text-danger">*</span></Form.Label>
          <Form.Select>
               <option value="0">Superadmin</option>
               <option value="1">Admin</option>
               <option value="2">Professor</option> 
          </Form.Select>
        </Form.Group> 
       <div className="ed-flex password-generator">
           <Form.Group className="mb-3"  >
             <Form.Label>Senha <span className="text-danger">*</span></Form.Label>
             <Form.Control readOnly disabled value='' type="password" required/>
         </Form.Group> 
         <button className='bg-primary btn'><Password/></button>
       </div>
    </Modal.Body>
    <Modal.Footer>
      <div className="ed-space">
         <Button className='bg-light text-dark' onClick={handleClose}> Cancelar </Button>
         <Button className="btn btn-main" type='submit'><Save/> Salvar  </Button>
      </div>
    </Modal.Footer>
    </Form>
  </Modal>
   </div>
  )
}

export default NewUserAccount