import React from 'react'
import { Form } from 'react-bootstrap' 
import styled from 'styled-components' 
import { Link } from 'react-router-dom'; 
import  {Save , Delete,   SummarizeOutlined} from '@mui/icons-material';
import { Alert } from 'bootstrap';  
import ConfiguretedTxTable from '../components/Table/ConfiguretedTxTable';
function ConfigurateTx() {
    document.title = 'Configurar Multas'; 
    return (
      <div>
         <>
     <Form>
       <div className="box-register">
       <div className="ed-space mb-4">
            <div className="ed-flex"> 
                <button className="btn ml-2 bg-green-light" id="">
                  <Save/>  Salvar
                </button> 
            </div> 
            <div>
              <Link className='btn bg-main' to='/newfees'>
                  <SummarizeOutlined/> Criar  Taxas 
              </Link>
            </div>
        </div>  
        <BoxContainer className='boxItem'>
          <div className="ed-space mb-4">
              <div><h2 className="title" style={{marginBottom:'0px'}}>Regras de pagamento</h2></div> 
          </div> 
             <Form.Group> 
                  <div className="ed-flex   col-12 mt-4"> 
                        <div className="block col-lg-12">
                            <Form.Label>Tipo de Multa</Form.Label>
                            <Form.Select required name='' placeholder=""  >
                                  <option value="#" selected>Por percentagem</option> 
                                  <option value="#">Por Dia</option>
                                  <option value="#">Por valor Fixo</option>
                            </Form.Select> 
                        </div>
                    </div>
             </Form.Group>  
             <Form.Group> 
                  <div className="ed-flex col-ip-3  col-12 mt-4">
                        <div className="block">
                            <Form.Label>De</Form.Label>
                            <Form.Control  type="text" placeholder='1' required  /> 
                        </div> 
                        <div className="block ml-2">
                            <Form.Label>Valor do serviço</Form.Label>
                            <Form.Control  type="text" placeholder='15'  required  /> 
                        </div> 
                        <div className="block ml-2">
                            <Form.Label>Taxa da Multa</Form.Label>
                            <Form.Select required name='' placeholder=""  >
                                  <option value="#" selected>Propinas atrasadas</option> 
                            </Form.Select>
                        </div> 
                    </div>
             </Form.Group>     
       </BoxContainer>
         <br />   
         <div className="eduall-table">
            <ConfiguretedTxTable/>
         </div>
       </div>
     </Form>
     </> 
      </div>
    )
}


const BoxContainer = styled.div` 
    width:100%; 
    border-radius:6px;
    margin:10px 0;
    padding:20px;
    min-height:200px;
    background:var(--ed-white);  
    box-shadow:var(--ed-shadow-df); 


    .Camera{
        min-height:80vh; 
        border:2px dashed var(--purple-light);
    }


    .title{
        font-size:18px; 
        text-transform:uppercase;
        font-weight:600;
        margin-top:10px;
        margin-bottom:25px;
    }

    .col-ip-3{
        width:100%;

        .block{
            width:33.3%;
        }
    }

    .box{ 
        width:100%;
        display:flex;
        flex-direction:column;

        .fill{
            width:100%;
            display:flex;

            .block{
                width:50%;
            }
        }
    }
`;

export default ConfigurateTx