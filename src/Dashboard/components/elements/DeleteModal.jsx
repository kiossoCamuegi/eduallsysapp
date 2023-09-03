import React, {useState} from 'react' 
import {Modal,   Button} from 'react-bootstrap' 
import DraggableModal from '../../../General/components/DraggableModal'; 
import DeleteImg  from '../../../Assets/images/3D/cogs.png';
import { Close, Delete, DeleteOutline, Message } from '@material-ui/icons';
import {toast} from 'react-toastify';
import axios from 'axios'; 
import { Done } from '@mui/icons-material';
import RefreshList from '../../../General/components/RefreshList';

function DeleteModal(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => { setShow(false)}
    const handleShow = () =>{
       setShow(true);
       setDeleted(false);
    };
    const [Deleted, setDeleted] = useState(false);

   const URL = props.url ? props.url : ''; 
   const TITLE = props.title ? props.title : '';
   const element = props.remove_element ? props.remove_element : null;
   const MESSAGE = props.message ? props.message : 'Lamentamos mas não foi possivel realizar esta ação';

    const DeleteElement = (e)=>{  
         e.preventDefault();   
         console.log(URL)
        if(URL === null){ 
              toast.error("Lamentamos mas não foi possivel realizar esta ação");    
          }else{  
            axios.put(URL).then(()=>{   
              setDeleted(true);    
              RefreshList()
              toast.success("Informação deletada com sucesso !"); 
              handleClose();
             if(element !== null) document.querySelector(element).classList.toggle("d-none");
            })
            .catch((error)=>{
              toast.error("Lamentamos mas não foi possivel deletar esta informação !");}); 
          }  
      };



  return (
    <div>
    <div onClick={handleShow}>{props.toggle_btn}</div>
    <Modal  className='animate__animated animate__zoomInDown'  centered  dialogAs={DraggableModal}  show={show} onHide={handleClose}>
    <div className="prt">
    <div className= {Deleted === false ? "deleteIcon " : "deleteIcon deleted" } style={{marginTop:'-10px'}}>
         <div className="icon">
               {Deleted === false ? <DeleteOutline/> : <Done/>}
         </div>
     </div>
    </div>
    <div>
        <div className="close-modal"  onClick={handleClose}>
            <div className="top-icon">
                <Close/>
            </div>
        </div>
         <div className="ed-flex"> 
            <div className="block text-center modal-delete-details pd-2 mt-4">
                {Deleted === false ?  <h2>{props.fullmessage ? '' : 'Esta prestes a deletar '} {TITLE} </h2> : <h2 className='text-green'>Bom trabalho {MESSAGE} </h2> }
                {Deleted === false ?  <p>Todo e qualquer registro no sistema que comtenha esta informação sera modificado ou deletado permanentemente.</p> : <p></p> }
            </div>
         </div>
    </div>
     <Modal.Body className='scrollLimit'>
          <div className="modal-delete-body">
          {
            Deleted === false ? 
            <div className="ed-center"> 
                <div className="ed-flex">  
                    <>
                      <Button className='bg-light text-dark' onClick={handleClose}> Cancelar </Button>
                      <Button className={Deleted === false ? "btn bg-danger btn-outlined ml-2" : "btn bg-black text-light ml-2"}  onClick={DeleteElement}>Apagar</Button> 
                    </>  
                </div>
            </div>
              :
              <div className="ed-center">
                   <Button className='bg-light text-dark' onClick={handleClose}> Ok </Button>
              </div>
            }
          </div>
    </Modal.Body> 
  </Modal>
   </div>
  )
}

export default DeleteModal