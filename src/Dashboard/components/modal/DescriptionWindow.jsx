import React, {useEffect, useState} from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Modal, Form, Button} from 'react-bootstrap'
import { PreviewOutlined, Save } from '@mui/icons-material';
import DraggableModal from '../../../General/components/DraggableModal';


function DescriptionWindow(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const handleShow = () => {  
    setShow(true);
    setTimeout(() => {
      let content = props.description_content ? JSON.parse(props.description_content) : <div>NO DATA FOUNDED</div>
      if(document.querySelectorAll(".description-modal-data").length >= 1){
        document.querySelector(".description-modal-data").innerHTML = content
      }   
    }, 500);  
  }

 



return (
  <div>
       <div onClick={handleShow}>
            {
              props.toggle_btn ? props.toggle_btn :   <button className='btn btn-main'><PreviewOutlined/></button>  
            }
       </div>
    <Modal className='animate__animated animate__zoomInDown'  size='lg' centered  dialogAs={DraggableModal}  show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title><h5>Descrição</h5></Modal.Title>
      </Modal.Header>
      <Modal.Body className='scrollLimit'>
         <div className="description-modal-data"></div>
      </Modal.Body> 
    </Modal>
  </div>
)
}

export default DescriptionWindow