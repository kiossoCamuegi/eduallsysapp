import React, {useState} from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Modal, Form, Button} from 'react-bootstrap'
import { Save } from '@mui/icons-material';
import DraggableModal from '../../../General/components/DraggableModal';


function NewBusStop() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  return (
    <div>
       <button className='btn btn-main ml-2' onClick={handleShow}>
           <AddCircleOutlineIcon/> Registrar paragem
      </button> 
      <Modal className='animate__animated animate__zoomInDown'  centered  dialogAs={DraggableModal}  show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><h5>Registrar paragem</h5></Modal.Title>
        </Modal.Header>
        <Modal.Body className='scrollLimit'>
          <Form> 
            <Form.Group className="mb-3"  >
              <Form.Label>Titulo<span className='text-danger ml-2'>*</span></Form.Label>
              <Form.Control type="text" autoFocus/>
            </Form.Group>   
            <Form.Group className="mb-3"  >
              <Form.Label>Rota<span className='text-danger ml-2'>*</span></Form.Label>
              <Form.Select select>
                  <option value="1" selected>1</option> 
              </Form.Select>
            </Form.Group>  
            <Form.Group className="mb-3"  >
              <Form.Label>Tempo de chegada<span className='text-danger ml-2'>*</span></Form.Label>
              <Form.Control type="time"/>
            </Form.Group>   
            <Form.Group className="mb-3"  >
              <Form.Label>Descrição<span className="text-danger ml-2">*</span> </Form.Label>
              <Form.Control as="textarea" rows={4}/>
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

export default NewBusStop