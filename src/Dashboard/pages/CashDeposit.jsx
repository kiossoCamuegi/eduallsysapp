import React from 'react'
import { Form } from 'react-bootstrap' 
import styled from 'styled-components' 
import { Link } from 'react-router-dom'; 
import  {Save , Delete, Send, BallotOutlined, SummarizeOutlined} from '@mui/icons-material';
import { Alert } from 'bootstrap'; 
import BuildDataHistory from '../components/elements/BuildDataHistory';
import FileUpload from '../../General/components/FileUpload';
import { Avatar } from '@mui/material'; 
import { RichTextEditor } from '../../General/components/RichTextEditor';

function CashDeposit() {
    document.title = 'Depositar valores'; 
    return (
      <div>
         <>
     <Form>
       <div className="box-register">
       <div className="ed-space mb-4">
            <div className="ed-flex">
                <button className="btn bg-danger" id='clearForm'>
                   <Delete/>  Limpar
                </button>
                <button className="btn ml-2 bg-green-light" id="">
                  <Save/>  Salvar
                </button> 
            </div> 
            <div>
              <Link className='btn bg-main' to='/Deposit'>
                  <SummarizeOutlined/> Valores depositados
              </Link>
            </div>
        </div>  
         <BoxContainer className='boxItem'>
          <div className="ed-space mb-4">
              <div><h2 className="title" style={{marginBottom:'0px'}}>Dados do deposito</h2></div>
               <BuildDataHistory/>
          </div> 
             <Form.Group> 
                  <div className="ed-flex   col-12 mt-4">
                        <div className="block col-lg-6">
                            <Form.Label>Código do aluno</Form.Label>
                            <Form.Control  type="number"   placeholder=""  /> 
                        </div> 
                        <div className="block ml-2 " style={{width:'49%'}}>
                            <Form.Label>Nome do aluno</Form.Label>
                            <Form.Select required name='' placeholder=""  >
                                  <option value="male" selected>#</option>
                                  <option value="female">#</option>
                            </Form.Select> 
                        </div>
                    </div>
             </Form.Group>  
             <Form.Group> 
                  <div className="ed-flex col-12 mt-4"> 
                        <div className="block col-lg-6">
                            <Form.Label>Valor a depositar</Form.Label>
                            <Form.Control  type="number"   placeholder=""  /> 
                        </div>
                        <div className="block ml-2 " style={{width:'49%'}}>
                            <Form.Label>Forma de pagamento</Form.Label>
                            <Form.Select required name='' placeholder=""  >
                                  <option value="#" selected>#</option> 
                            </Form.Select> 
                        </div>
                    </div>
             </Form.Group> 
             <Form.Group> 
                  <div className="ed-flex col-12 mt-4"> 
                        <div className="block col-lg-6">
                            <Form.Label>Conta movimentada</Form.Label>
                            <Form.Control  type="text"   placeholder=""  /> 
                        </div>
                        <div className="block ml-2 " style={{width:'49%'}}>
                            <Form.Label>Nº do recibo</Form.Label>
                            <Form.Control  type="text"   placeholder=""  /> 
                        </div>
                    </div>
             </Form.Group> 
         </BoxContainer> 
       <br />  
          <BoxContainer>
          <div className="ed-space mb-4">
              <div><h2 className="title" style={{marginBottom:'0px'}}>Descrição</h2></div> 
          </div> 
             <Form.Group> 
                 <RichTextEditor/>
             </Form.Group>   
          </BoxContainer>
       <br />
      <BoxContainer className='boxItem'>
            <h2 className="title">Carregar Recibo de pagamento</h2> 
             <FileUpload input_name="student_files" Icon="0" type_of_files="image/x-png,image/gif,image/jpeg,Docs/pdf"  extensions="png,jpeg,jpg,pdf"  />
       </BoxContainer> 
       <br /> 
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


export default CashDeposit