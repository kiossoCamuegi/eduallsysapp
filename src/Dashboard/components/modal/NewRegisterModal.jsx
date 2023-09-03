import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Modal,   Button} from 'react-bootstrap' 
import DraggableModal from '../../../General/components/DraggableModal';
import { Link } from 'react-router-dom';
import React, {useState} from 'react'


function NewRegisterModal() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Link to="#" onClick={handleShow} className="btn btn-main"><AddCircleOutlineIcon className='mr-2' />Novo</Link> 
      <Modal id='Newmodal'  show={show}  onHide={handleClose} centered   dialogAs={DraggableModal}  >
         <div className="new-modal-container">
         <Modal.Header closeButton className='bg-main'>
          <Modal.Title> <span className="text-light title">Comece registrando</span> </Modal.Title>
        </Modal.Header>
        <div className="container">
            <ul>
                <li onClick={handleClose}><Link to='/NewStudentBase'><AddCircleOutlineIcon/> Registrar estudantes</Link></li> 
                <li onClick={handleClose}><Link to=''><AddCircleOutlineIcon/> Registrar estudantes</Link></li> 
                <li onClick={handleClose}><Link to=''><AddCircleOutlineIcon/> Registrar estudantes</Link></li> 
                <li onClick={handleClose}><Link to=''><AddCircleOutlineIcon/> Registrar estudantes</Link></li> 
                <li onClick={handleClose}><Link to=''><AddCircleOutlineIcon/> Registrar estudantes</Link></li> 
                <li onClick={handleClose}><Link to=''><AddCircleOutlineIcon/> Registrar estudantes</Link></li> 
                <br /><hr />
                <li onClick={handleClose}><Link to=''><AddCircleOutlineIcon/> Registrar estudantes</Link></li> 
                <li onClick={handleClose}><Link to=''><AddCircleOutlineIcon/> Registrar estudantes</Link></li> 
                <li onClick={handleClose}><Link to=''><AddCircleOutlineIcon/> Registrar estudantes</Link></li> 
                <li onClick={handleClose}><Link to=''><AddCircleOutlineIcon/> Registrar estudantes</Link></li> 
                <li onClick={handleClose}><Link to=''><AddCircleOutlineIcon/> Registrar estudantes</Link></li> 
                <li onClick={handleClose}><Link to=''><AddCircleOutlineIcon/> Registrar estudantes</Link></li> 
                <br /><hr />
                <li onClick={handleClose}><Link to=''><AddCircleOutlineIcon/> Registrar estudantes</Link></li> 
                <li onClick={handleClose}><Link to=''><AddCircleOutlineIcon/> Registrar estudantes</Link></li> 
                <li onClick={handleClose}><Link to=''><AddCircleOutlineIcon/> Registrar estudantes</Link></li> 
                <li onClick={handleClose}><Link to=''><AddCircleOutlineIcon/> Registrar estudantes</Link></li> 
                <li onClick={handleClose}><Link to=''><AddCircleOutlineIcon/> Registrar estudantes</Link></li> 
                <li onClick={handleClose}><Link to=''><AddCircleOutlineIcon/> Registrar estudantes</Link></li> 
                <li onClick={handleClose}><Link to=''><AddCircleOutlineIcon/> Registrar estudantes</Link></li> 
                <li onClick={handleClose}><Link to=''><AddCircleOutlineIcon/> Registrar estudantes</Link></li> 
           </ul>
        </div>
        <Modal.Footer className='bg-main'>
          <Button style={{background:"#ffff"}} onClick={handleClose}> <span className="text-dark"> Close </span> </Button> 
        </Modal.Footer>
         </div>
      </Modal>
    </div>
  )
}

export default NewRegisterModal