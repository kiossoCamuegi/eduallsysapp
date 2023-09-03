import React, {useState} from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Modal, Form, Button} from 'react-bootstrap'
import { Save } from '@mui/icons-material';
import DraggableModal from '../../../General/components/DraggableModal';

function NewExamOnline() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  return (
    <div>
    <button className='btn bg-success' onClick={handleShow}>
        <AddCircleOutlineIcon/> Registrar exame online
   </button> 
   <Modal size='lg' centered  className='animate__animated animate__zoomInDown'  dialogAs={DraggableModal}  show={show} onHide={handleClose}>
     <Modal.Header closeButton>
       <Modal.Title><h5>Registrar exame online </h5></Modal.Title>
     </Modal.Header>
     <Modal.Body className='scrollLimit'>
       <Form>
         <Form.Group className="mb-3" >
           <Form.Label>Titulo<span className="text-danger ml-2">*</span> </Form.Label>
           <Form.Control required type="text" autoFocus/>
         </Form.Group>
         <Form.Group className="mb-3" >
           <Form.Label>Turma<span className="text-danger ml-2">*</span> </Form.Label>
           <Form.Select Select>
               <option value="1" selected>JKD38</option>
           </Form.Select>
         </Form.Group>
         <Form.Group className="mb-3" >
           <Form.Label>Disciplina ou Cadeira<span className="text-danger ml-2">*</span> </Form.Label>
           <Form.Select Select>
               <option value="1" selected>Ingles</option>
           </Form.Select>
         </Form.Group>
         <Form.Group className="mb-3" >
           <Form.Label>Data<span className="text-danger ml-2">*</span> </Form.Label>
           <Form.Control type="date" required autoFocus/>
         </Form.Group>
         <div className="ed-flex">
         <Form.Group className="mb-3 col-lg-6"  style={{paddingRight:'10px'}} >
           <Form.Label>Hora de inicialização<span className="text-danger ml-2">*</span> </Form.Label>
           <Form.Control type="time" required autoFocus/>
         </Form.Group> 
         <Form.Group className="mb-3 col-lg-6" style={{paddingLeft:'10px'}} >
           <Form.Label>Hora de finalização<span className="text-danger ml-2">*</span> </Form.Label>
           <Form.Control type="time" required autoFocus/>
         </Form.Group>
         </div>
         <Form.Group className="mb-3" >
           <Form.Label>Monitor (reponsavel por controlar a prova)<span className="text-danger ml-2">*</span> </Form.Label>
           <Form.Select Select>
               <option value="1" selected>Paulo</option>
           </Form.Select>
         </Form.Group>

         <div className="block">
            <Form.Group className="mb-3  ed-flex" >
                <Form.Check type="checkbox" label=" Alertar todos os estudantes e encarregados "/> 
            </Form.Group>
            <Form.Group className="mb-3" >
                 <Form.Check type="checkbox" label=" Permitir desistencia" />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Check type="checkbox" label=" Permitir Revisão das questões  "/> 
            </Form.Group>
            <Form.Group className="mb-3" >
                 <Form.Check type="checkbox" label=" Enviar resultados por mensagem "/> 
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Check type="checkbox" label=" Publicar resultados no site da instituiçõ "/> 
            </Form.Group>
            <Form.Group className="mb-3" >
                 <Form.Check type="checkbox" label=" Adicionar 10mn de compensação "/> 
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

export default NewExamOnline