import React from 'react'
import { Form } from 'react-bootstrap' 
import styled from 'styled-components' 
import { Link } from 'react-router-dom'; 
import  {Save , Delete, Send, BallotOutlined, SummarizeOutlined, Report, PrintTwoTone} from '@mui/icons-material';
import { Alert } from 'bootstrap'; 
import BuildDataHistory from '../../components/elements/BuildDataHistory';

function DailyMovemment() {
  return (
    <div>
        <Form>
       <div className="box-register">
       <div className="ed-space mb-4">
            <div className="ed-flex"> 
                <button className="btn ml-2 bg-green-light" id="">
                  <PrintTwoTone/> Gerar Relatorio
                </button> 
            </div>
            <div className="ed-flex"> 
                <Link to='/Students' className='btn ml-2 btn-main'>
                   <SummarizeOutlined/> Lista de estudantes
                </Link>
            </div>
        </div> 
       <BoxContainer className='boxItem'>
          <div className="ed-space mb-4">
              <div><h2 className="title" style={{marginBottom:'0px'}}>Informações do Relatorio</h2></div> 
          </div> 
             <Form.Group> 
                  <div className="ed-flex  col-12 mt-4">
                        <div className="block col-lg-6">
                            <Form.Label>Data  inicial</Form.Label>
                            <Form.Control  type="date" required  /> 
                        </div>
                        <div className="block ml-2" style={{width:'49%'}}>
                            <Form.Label>Data de finalização</Form.Label>
                            <Form.Control required  type="date"   /> 
                        </div>
                    </div>
                    <div className="ed-flex  col-12 mt-4">
                      <div className="block col-lg-6">
                            <Form.Label>Ordenar por</Form.Label>
                            <Form.Select required name='' placeholder=""  >
                                  <option value="#" selected>#</option>
                                  <option value="#">#</option>
                            </Form.Select> 
                        </div>
                        <div className="block ml-2" style={{width:'49%'}}>
                            <Form.Label>Tipo de movimento</Form.Label>
                            <Form.Select required name='' placeholder=""  >
                                  <option value="#" selected>Todos</option>
                            </Form.Select> 
                        </div>
                    </div>
             </Form.Group> 
       </BoxContainer>
       <br />
       <BoxContainer className='boxItem'>
          <div className="ed-space mb-4">
              <div><h2 className="title" style={{marginBottom:'0px'}}>Informações de exibição (Opcional)</h2></div> 
          </div> 
             <Form.Group> 
                  <div className="ed-flex  col-12 mt-4">
                        <div className="block col-lg-6">
                            <Form.Label>Adicionar Logo ao cabeçalho</Form.Label>
                            <Form.Select name=''>
                                  <option value="1" selected>Sim</option>
                                  <option value="0">Não</option>
                            </Form.Select> 
                        </div>
                        <div className="block ml-2" style={{width:'49%'}}>
                            <Form.Label>Selecionar texto para o cabeçalho</Form.Label>
                            <Form.Select  name=''>
                                  <option value="#" selected>Cabeçalho geral (defino pela instituição)</option>
                                  <option value="#">#</option>
                            </Form.Select> 
                        </div>
                    </div>
                    <div className="ed-flex  col-12 mt-4">
                    <div className="block col-lg-6">
                            <Form.Label>Selecionar cor do cabeçalho da tabela</Form.Label>
                            <Form.Control style={{minWidth:'100%'}} className='col-lg-12' value='#aeaeae'  type="color"   /> 
                        </div>
                      <div className="block ml-2" style={{width:'49%'}}>
                            <Form.Label>Selecionar tipo de tabela</Form.Label>
                            <Form.Select  name='' placeholder=""  >
                                  <option value="#" selected>Branco / Cinza</option>
                                  <option value="#">Branco</option>
                            </Form.Select> 
                        </div>
                    </div>
             </Form.Group> 
       </BoxContainer>
       <br />
       </div>
       </Form>
    </div>
  )
}

const BoxContainer = styled.div` 
    width:100%; 
    border-radius:6px;
    margin-bottom:20px;  
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


export default DailyMovemment