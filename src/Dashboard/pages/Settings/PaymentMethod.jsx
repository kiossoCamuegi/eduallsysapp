import { EmailOutlined } from '@material-ui/icons';
import React from 'react'
import { Form } from 'react-bootstrap'
import styled from 'styled-components'

function PaymentMethod() {
  return (
    <div>
        <Form>
            <div className="ed-space">
                <div> 
                    <h5>Plano de usúario</h5>
                    <p>Atualize o seu plano e endereços de pagamento</p> 
                </div> 
                <div className="ed-flex">
                        <button className="btn bg-white text-dark">Cancelar</button>
                        <button className="btn bg-main ml-2">Salvar</button>
                </div> 
            </div>
           <FlexBox>
                <div className="box">
                    <BoxContainer>
                          <div className="box-header">
                               <h3>Email de contacto</h3>
                          </div>
                          <div className="box-body">
                              <div className="input-box">
                                <label htmlFor="currentemail">
                                    <div className="block"> 
                                        <h4>Email de contactos</h4>
                                        <span>escolasistema@gmail.com</span>
                                    </div>
                                    <div className="check"></div>
                                </label>
                                <input type="radio" name="" hidden id="currentemail" />
                              </div>
                              <div className="input-box checked">
                                <label htmlFor="alternativeemail">
                                    <div className="block"> 
                                        <h4>Enviar para um email alternativo</h4>
                                        <div className="form-box">
                                            <EmailOutlined/>
                                            <input type="email" placeholder='Insira um email alternativo' className="form-control" />
                                        </div> 
                                    </div>
                                    <div className="check"></div>
                                </label>
                                <input type="radio" name="" hidden id="alternativeemail" />
                              </div>
                          </div>
                    </BoxContainer>
                </div>
                <div className="box">
                    <BoxContainer>
                        
                    </BoxContainer>
                </div>
           </FlexBox>
           <div className="billing-history">
                <BoxContainer>

                </BoxContainer>
           </div>
        </Form>
    </div>
  )
}

const BoxContainer = styled.div` 
    width:100%; 
    border-radius:6px;
    margin-bottom:20px;   
    min-height:200px;
    background:var(--ed-white);  
    box-shadow:var(--ed-shadow-df);  

    .box-body{
        padding:20px;
    }
`;

const FlexBox = styled.div`
    margin:10px 0;
    display:flex;
    justify-content:space-between;
 
    .box{
        width:49%;
    }

   } 
`;



export default PaymentMethod