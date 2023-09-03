import React, {useState} from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Modal, Form, Button} from 'react-bootstrap'
import { Save } from '@mui/icons-material';
import DraggableModal from '../../../General/components/DraggableModal';

function NewServicePaymentModal() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  return (
    <div>
         <button className='btn bg-dark  ml-2' onClick={handleShow}>
           <AddCircleOutlineIcon/> Registrar pagamento de serviço
      </button> 
      <Modal className='animate__animated animate__zoomInDown'   centered size='lg' dialogAs={DraggableModal}  show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><h5>Registrar pagamento de serviço</h5></Modal.Title>
        </Modal.Header>
        <Modal.Body className='scrollLimit'>
          <Form> 
            <Form.Group className="mb-3"  >
              <Form.Label>Nome do aluno <span className='text-danger ml-2'>*</span></Form.Label>
              <Form.Select required select>
                  <option value="#" selected>Carlos Mateus</option> 
              </Form.Select>
            </Form.Group> 
            <Form.Group className="mb-3"  >
              <Form.Label>Serviço <span className='text-danger ml-2'>*</span></Form.Label>
              <Form.Select required select>
                  <option value="#" selected>Aulas de Karate</option> 
              </Form.Select>
            </Form.Group> 
            <Form.Group className="mb-3"  >
              <Form.Label>Ano lectivo <span className='text-danger ml-2'>*</span></Form.Label>
              <Form.Select required select>
                  <option value="#" selected>2012</option> 
              </Form.Select>
            </Form.Group> 
            <Form.Group className="mb-3"  >
              <Form.Label>Mês <span className='text-danger ml-2'>*</span></Form.Label>
              <Form.Select required select>
                  <option value="#" selected>Janeiro</option> 
              </Form.Select>
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

export default NewServicePaymentModal