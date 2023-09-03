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
import styled from "styled-components";
import Draggable from 'react-draggable';
import { Form } from 'react-bootstrap';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


function StudentCardDesigner() {
    const [open, setOpen] = React.useState(false);
    const [Image1, setImage1] = React.useState('');
    const [LogoMark, setLogoMark] = React.useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function ChangeCard1Image(e){setImage1(e);}
    function ChangeCardLogo(e){setLogoMark(e);}
    

   return (
    <div>
       <button className="btn bg-main" onClick={handleClickOpen}>Criar modelo</button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Sound
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <WorkArea>
            <div className="tool-bar">
                <Form>
                   <Form.Group className='mb-2'>
                       <Form.Label>Trocar imagem de fundo do cartão</Form.Label>
                       <Form.Control type='url' placeholder='Inserir Url da imagem ...' onChange={(e)=>ChangeCard1Image(e.target.value)} />
                   </Form.Group>
                    <Form.Group className='mb-2'>
                       <Form.Label>Trocar logotipo da escola</Form.Label>
                       <Form.Control type='url' placeholder='Inserir Url da imagem ...' onChange={(e)=>ChangeCardLogo(e.target.value)} />
                   </Form.Group>
                </Form>
            </div>
            <div className="model-preview">
                

                   <div className="block-card">
                      <div className="type bg-red text-light">PARTE FRONTAL</div>
                      <div  className="front-side" contentEditable>
                          <div className="card-container">
                               <img loading="lazy" role="presentation" src={Image1} alt="" className="card-container-image" />
                               <div className="card-container-over">
                                     <div className="card-header">
                                        <div className="ed-flex">
                                           <div className="logo"><img loading="lazy" role="presentation" src={LogoMark} alt="" /></div>
                                           <div className="card-header-text">
                                                <h1>Universidade Harvard</h1>
                                                <strong>Harvard's motto, Veritas, has a long — and for two centuries, invisible</strong>
                                           </div>
                                        </div>
                                     </div>
                                     <div className="card-itens">
                                         <div className="ed-space">
                                            <img loading="lazy" role="presentation" src="https://secure.gravatar.com/avatar/2650e6492255a176e3742760897fb57b?s=150&r=g&d=https://www.ieeer10.org/wp-content/plugins/userswp/assets/images/no_profile.png" alt="" className="avatar" />
                                         </div>
                                         <ul>

                                         </ul>
                                     </div>
                                     <div className="card-footer">
                                        <div className="ed-space">

                                        </div>
                                     </div>
                               </div>
                          </div>
                      </div>
                   </div>
                   

                 
                <div className="block-card">
                  <div className="type bg-red text-light" contentEditable>PARTE INVERSA</div>
                    <div  className="back-side">
                       
                    </div> 
                  </div>   



            </div>
        </WorkArea>
      </Dialog>
    </div>
  );
}


const WorkArea = styled.div` 
   padding:20px;


   .tool-bar{
      margin:20px 0px;
   }

   .model-preview{
        width:100%;
        display:flex;
        align-items:center;
        justify-content:center;
        min-height:600px;
        overflow-y:auto;
        background:var(--ed-silver-light); 
        padding:20px;

        .block-card{
           display:flex;
           align-items:center;
           justify-content:center;
           flex-direction:column;

           .type{
               padding:7px 15px;
               border-top-right-radius:10px;
               border-top-left-radius:10px;
           }

        .front-side, .back-side{
             margin:0px 10px; 
             margin-bottom:20px;
             background:var(--ed-white);
             box-shadow:var(--ed-shadow-df);
             height:300px;
             width:500px;
             padding:5px; 


             .card-container{
               height:290px;
               width:100%;
               position:relative;


              .card-container-image{
                  width:100%;
                  height:290px;
                  object-fit:cover;
              }


              .logo img{
                     max-width:200px;
                     max-height:70px;   
              }

              .card-container-over{
                   position:absolute;
                   top:0px;
                   left:0px;
                   width:100%;
                   height:100%; 
                   padding:10px;

                   .ed-flex{
                       align-items:flex-start;
                   }

                   .card-itens{
                      .avatar{
                          width:100px;
                          height:100px;
                      }
                   }


                      .card-header-text{
                           h1{font-size:20px;}
                           margin-left:20px;
                      }

                }
             }
         }
       }
   }

`;


export default StudentCardDesigner
 