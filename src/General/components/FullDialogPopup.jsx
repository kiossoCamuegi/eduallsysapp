import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import styled from 'styled-components';
import { Close } from '@material-ui/icons';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


function FullDialogPopup(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <div>
         <div onClick={handleClickOpen}>
             {props.btn_toggle ? props.btn_toggle : <></>}
         </div>
        <Dialog className='special-dialog'  fullScreen  open={open}  onClose={handleClose}  TransitionComponent={Transition}>
          <AppBar sx={{ position: 'relative' }}>
            <Toolbar>
             <div className="ed-space">
               <div className="title"><h1>{props.title}</h1></div> 
                <div onClick={handleClose} className="close-btn">
                    <Close/>
                </div>
             </div>
            </Toolbar>
          </AppBar>
          <Content>
              {props.content ? props.content : <></>} 
          </Content>
        </Dialog>
      </div>
    );
}



const Content = styled.div`
  max-height:92vh;
  height:92vh;
  padding:20px;
  overflow-y:auto;
`;
 
 

export default FullDialogPopup
