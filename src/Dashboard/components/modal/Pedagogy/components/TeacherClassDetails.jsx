import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import DraggableModal from '../../../../../General/components/DraggableModal';
import { Close } from '@mui/icons-material';
import { Avatar, AvatarGroup } from '@mui/material';
import styled from 'styled-components';
import { ProgressBar } from 'react-bootstrap';
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined';
import  {MdOutlineLaunch} from "react-icons/md";
 
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const Images = [
    require("../../../../../Assets/images/avatars/avatar-0.jpg"),
    require("../../../../../Assets/images/avatars/avatar-1.jpg"),
    require("../../../../../Assets/images/avatars/dp-3.jpg"),
    require("../../../../../Assets/images/avatars/avatar-3.jpg"),
    require("../../../../../Assets/images/avatars/avatar-4.jpg"),
    require("../../../../../Assets/images/avatars/avatar-5.jpg"),
    require("../../../../../Assets/images/avatars/avatar-6.jpg"),
    require("../../../../../Assets/images/avatars/avatar-7.jpg"),
    require("../../../../../Assets/images/avatars/dp-1.jpg"), 
    require("../../../../../Assets/images/avatars/dp-2.jpg"), 
    require("../../../../../Assets/images/avatars/dp-3.jpg"),  
    require("../../../../../Assets/images/avatars/dp-4.jpg"), 
    require("../../../../../Assets/images/avatars/dp-5.jpg"), 
    require("../../../../../Assets/images/avatars/dp-6.jpg"),  
]

function ChildModal(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <React.Fragment>
        <div onClick={handleOpen}>
           {props.toggle_btn ? props.toggle_btn : <></>}
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style, width: 200 }}>
            <h2 id="child-modal-title">Text in a child modal</h2>
            <p id="child-modal-description">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </p>
            <Button onClick={handleClose}>Close Child Modal</Button>
          </Box>
        </Modal>
      </React.Fragment>
    );
  }
  
   

function TeacherClassDetails(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <div>
        <div onClick={handleOpen}>
          {props.toggle_btn ? props.toggle_btn : <></>}
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description" 
        >
          <Box  sx={{ ...style, width: 500 }}>
            <Details>
            <div className="ed-space box-header">
                 <div><h5>Turmas na qual leciona  </h5></div>
                 <div onClick={handleClose}><Close /></div>
            </div>
             <ol>
             {["",""].map((Class, id)=>{
                return(
                    <li key={id}>
                    <div className="ed-space mb-2">
                            <h3>Turma - HSJ3</h3>
                            <div className="badge bg-main-light">34 alunos</div>
                        </div>
                       <div className="ed-space">
                       <AvatarGroup max={10}>
                            {Images.map((item, index)=>{
                                return(
                                    <Avatar alt="Remy Sharp" src={item} key={index} /> 
                                )
                            })
                            }
                        </AvatarGroup>
                         <ChildModal toggle_btn={ <div className='pop-window'><LaunchOutlinedIcon/></div>  }  />
                       </div>
                        <div className="ed-space mt-2">
                            <div className="text-danger"><span>Situação curricular</span></div>
                            <div><span>Matematica</span></div>
                        </div>
                        <div className="mt-2 mb-3">
                           <ProgressBar  variant='info' now={70} />
                        </div>
                        <div className="ed-space">
                         <div className='ed-flex'><strong>98</strong><span className='ml-1'> / de 160 aulas</span></div>
                         <div><span className="percentage">90%</span></div>
                      </div>
                   </li>
                )
              })}
             </ol>
            </Details> 
          </Box>
        </Modal>
      </div>
    );
}

const Details = styled.div`
    margin:10px 0px;
    padding:0px;

    .box-header{
        margin-bottom:20px;

         h5{
            font-size:18px;
            font-weight:bold;
         }

         svg{
            cursor:pointer;
            fill:grey;
         }
    }

   ol{
    overflow-y:auto;  
    max-height:450px; 
    padding:0px;
    margin:0px;
    padding-right:10px;
    list-style:none;

    &::-webkit-scrollbar{
        width:6px;
        background-color:transparent;
    }
    
    &:hover::-webkit-scrollbar-thumb{
        background:rgb(219, 219, 219); 
    }

     li{
        padding:0px;
        margin:15px 0px;
        list-style:none;

        .ed-space{
            h3{
                font-size:15px;
                margin:0px;
                font-weight:600;
            }
            
                
            .pop-window{
                cursor:pointer;

                svg{
                    fill:var(--ed-purple-light);
                    width:15px;
                }
            }

            strong,span,div{
                font-size:14px;
            }
        }

        .ed-flex{ 
             strong,span,div{
                font-size:14px;
             }
        }
 

          .MuiAvatarGroup-root{
              max-width:max-content !important;
              width:auto  !important;
          }
     }
   }
`;


export default TeacherClassDetails






 