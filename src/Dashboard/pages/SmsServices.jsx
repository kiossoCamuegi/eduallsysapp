
import { Check, Error, ErrorOutline, Send } from '@material-ui/icons';
import { Avatar } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import {  Form } from 'react-bootstrap';
import styled from 'styled-components';
import RandomAvatarColor from '../../General/components/RandomAvatarColor';
 
function SmsServices() {
 document.title ="Serviços de SMS";
const [Messages, SetMessages] = useState([{status:'error'},{status:'success'},{status:'success'},{status:'error'},{status:'success'},{status:'success'},{status:'error'},{status:'success'},])
 const contacts = [{type:'st'},{type:'emp'},{type:'prt'},{type:'st'},{type:'emp'},{type:'prt'}, {type:'st'},{type:'emp'},{type:'prt'},   ]



  return (
       <> 
       <WarningBox className='bg-white'>
           <div className="ed-flex"><div className="dot bg-green-light"></div><span>Mensagens por enviar : </span> <div className="ml-2">26.000</div></div>
           <div className="ed-flex mt-2"><div className="dot bg-red"></div><span>Mensagens enviadas : </span> <div className="ml-2">346</div> </div>
       </WarningBox>
       <Container >
            <BoxContacts>
                <Form>
                    <div className="ed-space mb-4">
                        <div>
                            <h3>Contactos</h3>
                        </div>
                        <div>
                            <Form.Select aria-label="Default select example">
                                <option>Todos</option>
                                <option value="1">One</option> 
                            </Form.Select>
                        </div>
                    </div>
                    <div className="filters">
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"> 
                        <Form.Control type="email" placeholder="Pesquisar ..." />
                    </Form.Group> 
                    </div>
                    <a href="#" className="text-main-light">selecionar todos</a>
                </Form>
                <div className="contacts-list">
                    <ul>
                        {
                            contacts.map((item,index)=>{
                                return(
                                   <div className="block">
                                      <label htmlFor={index}>
                                            <li key={index}>
                                                <div className="ed-flex">
                                                    <Avatar sx={{height:40,width:40}} style={{background:`${RandomAvatarColor()}`}} src="" alt="#" />
                                                    <div className="block ml-2">
                                                        <div className="name">Sara Manuel</div>
                                                        <div className="phone">976 255 837</div>
                                                    </div>
                                                </div>
                                                <div className="ed-flex"> 
                                                     <div className={`type ${item.type}`}>aluno</div>
                                                      <Form.Check aria-label={index} className='ml-2' id={index} />
                                                </div> 
                                            </li>
                                      </label>
                                   </div>
                                )
                            })
                        }
                    </ul>
                </div>
            </BoxContacts>
            <MessageBox>
                <Form className='form'>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label> <h3>Compor Mensagem</h3> </Form.Label>
                        <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                    <div className="ed-space">
                        <div className="tollbar">

                        </div>
                        <div>
                            <button className="btn bg-main"> <Send/> Enviar </button>
                        </div>
                    </div> 
                </Form>
                <div className="latest-messages">
                {
                    Messages.map((item,index)=>{
                        return(
                            <CardMessage key={index} className={`${item.status}-card`}>
                                    <div className="block">
                                        <span>Carlos pedro Mateus</span>
                                    </div>
                                    <div className='ed-flex'>
                                        <div className="date">10 de Maio de 2022 - 10:30</div>
                                        <div className="icon">{ item.status === 'error' ? <ErrorOutline /> : <Check/> }</div>
                                    </div>
                            </CardMessage>
                        )
                    })
                }
                </div>
            </MessageBox>
        </Container>
        <br />
    </>
  )
}


const Container  = styled.div`
    width:100%;
    display:flex;
    justify-content:space-between;
`;

const WarningBox = styled.div`
   margin-bottom:20px;
   width:100%;
   padding:10px 20px; 
   font-size:15px;
   color:var(--ed-dark);
   box-shadow:var(--ed-shadow-df);
   border-radius:6px;

   .dot{
      width:6px;
      height:6px; 
      margin-right:10px;
      border-radius:100%;
   }

    div{
        align-items:center;

        span{
            font-weight:500;
        }

        strong{
            letter-spacing:1px;
        }
    }
`;

  

const BoxContacts = styled.div`
   min-width:350px;
   width:30%;
   min-height:50vh; 
   border-radius:6px;  
   margin-bottom:20px !important;
   background:var(--ed-white);  
   box-shadow:var(--ed-shadow-df); 
   padding:20px;
   position: relative;

  label{
     width:100%;
  }

     a.text-main-light{
        text-decoration:underline !important;
        font-size:14px;
     }

    h3{
        font-size:17px;
        font-weight:600;
    } 


    .contacts-list{
        ul{
            padding:0px;
            list-style:none;
            max-height:700px;
            overflow-y:auto; 

            &:hover{  
               padding-right:15px;
            }

            &::-webkit-scrollbar{
                width:6px;
                background-color:transparent;
            }

            .form-check-input{
                  width:30px;
            }

            &:hover{ 
                &::-webkit-scrollbar-thumb{
                    background:#eaeaee;   
                }
            }

            li{
                display:flex;
                width:100%;
                justify-content:space-between;
                position:relative;
                margin:20px 0px;

                .name{
                    font-size:14px;
                }

                .phone{
                      font-size:12px;
                      margin-top:5px;
                      font-weight:550;
                }

                .type{
                   font-size:12px;
                   color:var(--ed-dark);
                   padding:2px 10px;
                   border-radius:30px;
                   text-align:center;  
                }

                .type.st{background:#bde0fe;}
                .type.emp{background:#fbf8cc;}
                .type.prt{background:#98f5e1;} 
            }
        }
    }

`;

const MessageBox = styled.div`
     width:70%;
     padding-left:20px;
     min-width:200px;
     display:block; 


     .latest-messages{ 
        overflow-y:auto;
        max-height:700px;

           &:hover{  
               padding-right:15px;
            }
        
            &::-webkit-scrollbar{
                width:6px;
                background-color:transparent;
            }

            &:hover{ 
                &::-webkit-scrollbar-thumb{
                    background:#eaeaee;   
                }
            }
     }


     button{
        padding:8px 10px;
        font-size:14px;

         svg{
             width:18px;
             height:18px;
         }
     }
        

        .success-card {
            background: #e0fff8;
        }

        .error-card {
            background: #fff1f2;
        }

        .success-card .icon {
            background: #98f5e1;
        }

        .error-card .icon {
            background: #ffcfd2;
        }
        
     .form{
        border-radius:6px;  
        margin-bottom:20px !important;
        background:var(--ed-white);  
        box-shadow:var(--ed-shadow-df); 
        width:100%;
        padding:10px;

          h3{
             font-size:17px;
             font-weight:600;
          }
     }
`;

const CardMessage = styled.div`
       width:100%;
       height:auto;
       min-height:50px;
       display:flex;
       align-items:center;
       justify-content:space-between;
       position:relative;
       margin:20px 0px;
       padding:20px;
       border-radius:6px;
       border:4px solid var(--ed-white);
       transition:all 1s ease-in-out;
       cursor:pointer;

       &:hover{
           transform:scaleX(1.02);
       }
       

       span{
           font-size:15px;
           font-weight:500;
       }

       .date{
         font-size:13px;
         margin-right:20px;
         background:var(--ed-dark);
         padding:6px 10px;
         border-radius:40px;
         color:var(--ed-white);
       }
 

       .icon{ 
            border-radius:100%;
            width:40px;
            height:40px;
            display:flex;
            align-items:center;
            justify-content:center; 

               
       }


`;

export default SmsServices