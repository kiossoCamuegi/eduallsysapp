import React, {useState} from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Modal, Button} from 'react-bootstrap';
import styled from "styled-components";
import DraggableModal from '../../../General/components/DraggableModal';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import { AttachFileOutlined } from '@mui/icons-material';

function PopPaymentDetailsModal() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
    <div>
        <button className='btn btn-main' onClick={handleShow}>
            <AddCircleOutlineIcon/> Detalhes do pagamento
    </button> 
        <Modal size='lg' centered   className='animate__animated animate__zoomInDown'  dialogAs={DraggableModal}  show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        <Modal.Title><h5>Detalhes do pagamento</h5></Modal.Title>
        </Modal.Header>
        <Modal.Body className='scrollLimit'>
           <Box className="boxItem"> 
               <div className="ed-flex">
                   <Link to=''><Avatar alt="name here" src="" sx={{ width: 106, height: 106 }}/></Link>
                   <div className="d-block ml-2 description">
                        <h3 className='name '>Nome : <Link to='' className='text-main label-student-name'>#</Link></h3>
                        <h5>Turma : <Link to='' className='text-main label-student-class'>#</Link></h5>
                   </div>
               </div>
                <div className="ed-flex mt-4 description">
                    <h5>Classe : <Link to='' className='text-main label-student-level'>#</Link> </h5>
                    <h5 className='ml-2'>Sala : <Link to='' className='text-main label-student-classroom'>#</Link></h5>
                </div>
                <div className="ed-flex mt-2 description">
                    <h5>Curso : <Link to='' className='text-main label-student-class'>#</Link></h5>
                    <h5 className='ml-2'>Periodo : <Link to='' className='text-main label-student-class'>#</Link></h5>
                </div> 
             </Box>
             <Main>
                <ul>
                    <li>Nº de pagamento : <span class="text-main-light">#####</span></li>
                    <li>Data & Hora : <span class="text-main-light">#####</span></li>
                    <li>Serviço :<span class="text-main-light">#####</span></li>
                    <li>Operador :<span class="text-main-light">#####</span></li>
                    <li>Divida anterior :<span class="text-main-light">#####</span></li>
                    <li>Desconto :<span class="text-main-light">#####</span></li>
                    <li>Saldo usado :<span class="text-main-light">#####</span></li>
                    <li>Valor entregue :<span class="text-main-light">#####</span></li>
                    <li>Metodo de pagamento :<span class="text-main-light">#####</span></li>
                    <li>Comprovativo de pagamento : <Link to="#"><span class="text-blue"><AttachFileOutlined/> #####</span></Link> </li>
                    <li>Nº de pagamento :<span class="text-main-light">#####</span></li>
                    <li>Nº de pagamento :<span class="text-main-light">#####</span></li>
                    <div className="total bg-main mt-4">
                        <div className="ed-space">
                            <div><h1>Total factura : </h1></div>
                            <div><h1>378.000.00 Kz</h1></div>
                        </div>
                    </div>
                </ul>
             </Main>
        </Modal.Body>
        <Modal.Footer>
        <div className="ed-space">
            <div></div>
            <Button className='bg-light text-dark' onClick={handleClose}> Fechar janela </Button> 
        </div>
        </Modal.Footer>
    </Modal>
    </div>
    )
}

const Box = styled.div`
    width:100%; 
    border-radius:6px;   
    padding:20px 10px; 
    min-height:200px; 
    margin:10px 0; 

    .ex{
        font-size:16px;
        margin-top:8px;
        margin-right:25px; 
    }



    .description{
        .name{
            font-size:18px;
            margin-bottom:15px;
            margin-top:10px;
        }

        h5{
            font-size:16px;
        }
    }
 
`;

const Main = styled.main`
      ul{
        padding:0px;
        padding-left:10px;
        border-top:1px solid var(--ed-white-smoke);
        padding-top:20px;
        
        li{
            margin:10px 0px;
            font-size:15px;
            font-weight:500;

            .text-blue{
                color:var(--ed-blue-light);

                svg{
                    width:20px;
                    fill:var(--ed-blue-light);
                }
            }
        }

        .total{
            padding:10px 15px;
            margin-top:20px;
            border-radius:6px;

            h1{
                color:var(--ed-white);
                font-size:18px;
                margin:0px;
            }
        }
      }
`;

export default PopPaymentDetailsModal