import React from 'react'
import { Form } from 'react-bootstrap';
import { styled } from 'styled-components';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

function TCCD_settings_notifications() {
  return (
    <div>
       <Container>
             <div className="title"><h2>Password</h2></div>
            <div className="description"><p>Por favor digite  a password atual para poder fazer uma modificação.</p></div>
           
                <Form>
                <div className="block-form">
                   <div className="ed-space">
                       <div className="text-block">
                           <h3>Notificações de email</h3>
                           <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita eius fugiat, dicta maiores blanditiis vero.</p>
                       </div>
                       <div className="inputs-block">
                           <Form.Check   type="switch"  id="custom-switch"  label="Check this switch" />
                           <div className="ed-block mt-4">
                                <FormControlLabel control={<Checkbox defaultChecked />} label="Lembrar sempre" />
                               <div>
                                  <small>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, consequuntur!</small>
                               </div>
                            </div>
                            <div className="ed-block mt-4">
                                <FormControlLabel control={<Checkbox defaultChecked />} label="Lembrar sempre" />
                                <div>
                                   <small>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, consequuntur!</small>
                                </div>
                            </div>
                            <div className="ed-block mt-4">
                                <FormControlLabel control={<Checkbox defaultChecked />} label="Lembrar sempre" />
                               <div>
                                  <small>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, consequuntur!</small>
                               </div>
                            </div>
                       </div>
                    </div>  
                  </div>
                  <div className="block-form">
                   <div className="ed-space">
                       <div className="text-block">
                           <h3>Notificações de email</h3>
                           <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita eius fugiat, dicta maiores blanditiis vero.</p>
                       </div>
                       <div className="inputs-block">
                           <Form.Check   type="switch"  id="custom-switch"  label="Check this switch" />
                            <div className="ed-block mt-4">
                                <FormControlLabel control={<Checkbox defaultChecked />} label="Lembrar sempre" />
                               <div>
                                  <small>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, consequuntur!</small>
                               </div>
                            </div>
                            <div className="ed-block mt-4">
                                <FormControlLabel control={<Checkbox defaultChecked />} label="Lembrar sempre" />
                                <div>
                                   <small>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, consequuntur!</small>
                                </div>
                            </div>
                            <div className="ed-block mt-4">
                                <FormControlLabel control={<Checkbox defaultChecked />} label="Lembrar sempre" />
                               <div>
                                  <small>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, consequuntur!</small>
                               </div>
                            </div>
                       </div>
                    </div>  
                  </div>
                </Form> 
       </Container>
       <br />
    </div>
  )
}


const Container = styled.div`
    margin:30px 0px;
    background:var(--ed-white);  
    box-shadow:var(--ed-shadow-df); 
    border-radius:6px; 
    padding:20px; 

    .title h2{
      font-size:20px;  
      font-weight:bold;
      margin-top:10px;
      margin-bottom:10px;
    }

    h3{
        font-size:16px;
        font-weight:bold;
    }

    p{
      font-size:14px;
      color: #6C757D;
    }


    .ed-space{
        align-items:flex-start; 
    }

      .block-form{
          margin:20px 0px;
          padding-top:40px;
          border-top: 1px solid var(--ed-silver-light);   


            small,p{
              color: #6C757D;
            }

            span{
              font-weight:bold;
            }

            .text-block{
               max-width:400px; 
               width:400px; 
               padding-right:10px;
            }


            .inputs-block{ 
               width:100%;
               max-width:70%;          

               .form-check{ ;
                  display:flex;
                  align-items:center;
                  width:max-content;
                  cursor:pointer;

                    label{
                        margin-left:10px; 
                    }
               }
            }
      }
`;

export default TCCD_settings_notifications
