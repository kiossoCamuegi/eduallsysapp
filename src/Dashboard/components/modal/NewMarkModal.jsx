import React, {useState} from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Modal, Form, Button} from 'react-bootstrap'
import { Save } from '@mui/icons-material';
import DraggableModal from '../../../General/components/DraggableModal'; 
function NewMarkModal() { 
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  return (
    <div>
    <button className='btn btn-main ml-2' onClick={handleShow}>
        <AddCircleOutlineIcon/> Registrar nota
   </button>  
   <Modal size='lg' dialogAs={DraggableModal} centered  className='animate__animated animate__zoomInDown'  show={show} onHide={handleClose}>
     <Modal.Header closeButton>
       <Modal.Title><h5>Registrar notas</h5></Modal.Title>
     </Modal.Header>
     <Modal.Body className='scrollLimit'>
       <Form>
         <Form.Group className="mb-3"  >
           <Form.Label>Turma<span className="text-danger ml-2">*</span> </Form.Label>
           <Form.Select Select>
               <option value="1" selected>---</option>
           </Form.Select>
         </Form.Group>
         <Form.Group className="mb-3"  >
           <Form.Label>Estrutura academica<span className="text-danger ml-2">*</span> </Form.Label>
           <Form.Select Select>
               <option value="1" selected>---</option>
           </Form.Select>
         </Form.Group>
         <Form.Group className="mb-3"  >
           <Form.Label>Disciplina ou Cadeira<span className="text-danger ml-2">*</span> </Form.Label>
           <Form.Select Select>
               <option value="1" selected>Ingles</option>
           </Form.Select>
         </Form.Group>
         <Form.Group className="mb-3"  >
           <Form.Label>Nome do aluno<span className="text-danger ml-2">*</span> </Form.Label>
           <Form.Select Select>
               <option value="1" selected>---</option>
           </Form.Select>
         </Form.Group>
         <hr />
         <div className="ed-flex">
         <Form.Group className="mb-3 col-lg-6"  style={{paddingRight:'10px'}}  >
           <Form.Label>MAC1 (P1)<span className="text-danger ml-2">*</span> </Form.Label>
           <Form.Control type="time" required autoFocus/>
         </Form.Group> 
         <Form.Group className="mb-3 col-lg-6" style={{paddingLeft:'10px'}}  >
           <Form.Label>NPP1 (P2)<span className="text-danger ml-2">*</span> </Form.Label>
           <Form.Control type="time" required autoFocus/>
         </Form.Group>
         </div> 
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

export default NewMarkModal