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
import styled from 'styled-components' 
import { PrintOutlined } from '@mui/icons-material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

 

function FullDialog(props) {
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
            {props.toggle_btn ? props.toggle_btn  : <></> }
        </div>
        <Dialog  fullScreen  open={open}  onClose={handleClose} TransitionComponent={Transition}>
          <AppBar sx={{ position: 'relative' }}>
            <Toolbar>
              <div className="ed-space">
                <div className="ed-flex"> 
                    <Title>{props.title ? props.title : ''} </Title>
                </div>
                <div className="ed-flex"> 
                     <IconButton  edge="start"  color="inherit" className='bg-black' onClick={handleClose} aria-label="close" >
                         <CloseIcon />
                    </IconButton> 
                </div>
              </div>
            </Toolbar>
          </AppBar>
           <DialogContent>
                 <div className="eduall-print-hr-area">
                    {props.content_data ? props.content_data : <></>}
                 </div>
             </DialogContent>
        </Dialog>
      </div>
    );
}

const DialogContent = styled.div`
    padding:20px;
    overflow-y:auto;  
    max-height:91vh;
    height:91vh;
    background:var(--ed-dark);


     &::-webkit-scrollbar{
        width:6px !important;
        background-color:transparent !important;
    }
     
     &::-webkit-scrollbar-thumb{
        background:rgb(219, 219, 219) !important; 
    }
`;

const Title = styled.div`
    font-size: 20px;
    font-weight: 550;
    margin: 0; 
    font-weight: bold !important;
    color:var(--ed-dark);
`;

export default FullDialog
 