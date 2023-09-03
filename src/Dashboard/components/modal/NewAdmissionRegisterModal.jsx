import React, {useState} from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Modal, Form, Button} from 'react-bootstrap'
import { Save } from '@mui/icons-material';
import DraggableModal from '../../../General/components/DraggableModal';

function NewAdmissionRegisterModal() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  return (
    <div>
       <button className='btn btn-main ml-2' onClick={handleShow}>
           <AddCircleOutlineIcon/> Criar registro de admição
      </button> 
      <Modal className='animate__animated animate__zoomInDown'  centered  dialogAs={DraggableModal}  size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><h5> Criar registro de admição</h5></Modal.Title>
        </Modal.Header>
        <Modal.Body className='scrollLimit'>
          <Form> 
            <Form.Group className="mb-3"  >
              <Form.Label>Titulo<span className='text-danger ml-2'>*</span></Form.Label>
              <Form.Control type="text" autoFocus/>
            </Form.Group>  
            <Form.Group className="mb-3"  >
              <Form.Label>Código<span className='text-danger ml-2'>*</span></Form.Label>
              <Form.Control type="text"/>
            </Form.Group>  
            <Form.Group className="mb-3"  >
              <Form.Label>Curso<span className='text-danger ml-2'>*</span></Form.Label>
              <Form.Select select>
                  <option value="1" selected>1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
              </Form.Select>
            </Form.Group>  
            <Form.Group className="mb-3"  >
              <Form.Label>Data inicial<span className='text-danger ml-2'>*</span></Form.Label>
              <Form.Control type="date"/>
            </Form.Group> 
            <Form.Group className="mb-3"  >
              <Form.Label>Data de finalização<span className='text-danger ml-2'>*</span></Form.Label>
              <Form.Control type="date"/>
            </Form.Group> 
            <Form.Group className="mb-3"  >
              <Form.Label>Número minimo de candidatos<span className='text-danger ml-2'>*</span></Form.Label>
              <Form.Control type="number"/>
            </Form.Group> 
            <Form.Group className="mb-3"  >
              <Form.Label>Número maximo de candidatos<span className='text-danger ml-2'>*</span></Form.Label>
              <Form.Control type="number"/>
            </Form.Group> 
            <Form.Group className="mb-3"  >
              <Form.Label>Estado<span className='text-danger ml-2'>*</span></Form.Label>
              <Form.Select select>
                  <option value="1" selected>1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
              </Form.Select>
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

export default NewAdmissionRegisterModal