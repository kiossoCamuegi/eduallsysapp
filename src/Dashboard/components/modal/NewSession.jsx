import React, {useState} from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Modal, Form, Button} from 'react-bootstrap'
import { Save } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import DraggableModal from '../../../General/components/DraggableModal';

function NewSession() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  return (
    <div>
       <button className='btn btn-main ml-2' onClick={handleShow}>
           <AddCircleOutlineIcon/> Registrar nova sessão / Aula
      </button> 
      <Modal className='animate__animated animate__zoomInDown'  centered  dialogAs={DraggableModal}  show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><h5>Registrar sessão</h5></Modal.Title>
        </Modal.Header>
        <Modal.Body className='scrollLimit'>
          <Form>

            <Form.Group className="mb-3"  >
              <Form.Label>Titulo <span className='text-danger ml-2'>*</span></Form.Label>
              <Form.Control   type="email"  placeholder="name@example.com"   autoFocus/>
            </Form.Group> 
            <Form.Group className="mb-3"  >
              <Form.Label>Curso<span className='text-danger ml-2'>*</span></Form.Label>
              <Form.Select select   type="email"  placeholder="name@example.com">
                  <option value="1" selected>1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
              </Form.Select>
            </Form.Group> 
            <small><Link to='/NewCourse' className='text-primary mt-2'>Criar Curso</Link></small>
            <Form.Group className="mb-3 mt-3"  >
              <Form.Label>Turma<span className='text-danger ml-2'>*</span></Form.Label>
              <Form.Select select   type="email"  placeholder="name@example.com">
                  <option value="1" selected>1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
              </Form.Select>
            </Form.Group> 
            <Form.Group className="mb-3"  >
              <Form.Label>Disciplina<span className='text-danger ml-2'>*</span></Form.Label>
              <Form.Select select   type="email"  placeholder="name@example.com">
                  <option value="1" selected>1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
              </Form.Select>
            </Form.Group> 
            <Form.Group className="mb-3"  >
              <Form.Label>Periodo<span className='text-danger ml-2'>*</span></Form.Label>
              <Form.Select select   type="email"  placeholder="name@example.com">
                  <option value="1" selected>1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
              </Form.Select>
            </Form.Group>  
            <Form.Group className="mb-3"  >
              <Form.Label>Sala nº<span className='text-danger ml-2'>*</span></Form.Label>
              <Form.Select select   type="email"  placeholder="name@example.com">
                  <option value="1" selected>1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
              </Form.Select>
            </Form.Group>  
            <Form.Group className="mb-3"  >
              <div className="block mb-3">
                <Form.Label>Data<span className='text-danger ml-2'>*</span></Form.Label>
                <Form.Control select   type="date"/>
              </div>
              <div className="block">
                <Form.Label>Dia da semana<span className='text-danger ml-2'></span></Form.Label>
                <Form.Select select   type="email"  placeholder="name@example.com">
                  <option value="1" selected>1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
              </Form.Select>
              </div>
            </Form.Group>  
            
            <Form.Group className="mb-3"  >
              <div className="block mb-3">
                <Form.Label>Horario inicial<span className='text-danger ml-2'>*</span></Form.Label>
                <Form.Control select   type="time"/>
              </div>
              <div className="block">
                <Form.Label>Horario final<span className='text-danger ml-2'>*</span></Form.Label>
                <Form.Control select   type="time"/>
              </div>
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

export default NewSession