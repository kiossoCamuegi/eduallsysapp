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


function GenerateDeclarations() {
    document.title = 'Pagamento der serviços'; 
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
              <Link className='btn btn-main' to='/DeclarationsList'>
                  <SummarizeOutlined/>Listas das Declarações
              </Link>
            </div>
        </div> 
        <div className="flex-wrapp">
           <Box className="boxItem"> 
               <div className="ed-flex">
                   <Link to=''><Avatar alt="name here" src="" sx={{ width: 106, height: 106 }}/></Link>
                   <div className="d-block ml-2 description">
                        <h3 className='name '>Nome : <Link to='' className='text-main'>Carlos pedro manuel</Link></h3>
                        <h5>Turma : <Link to='' className='text-main'>KL9P2</Link></h5>
                   </div>
               </div>
                <div className="ed-flex mt-4 description">
                    <h5>Classe: 12 º</h5>
                    <h5 className='ml-2'>Periodo : tarde</h5>
                </div>
                <div className="ed-flex mt-2 description">
                    <h5>Curso: Informatica</h5>
                    <h5 className='ml-2'>Periodo : tarde</h5>
                </div> 
             </Box>
             <div className="pdm"></div>
             <BoxContainer className='boxItem'>
          <div className="ed-space mb-4">
              <div><h2 className="title" style={{marginBottom:'0px'}}>Dados do aluno</h2></div>
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
                   <div className="ed-flex   col-12 mt-4">
                         <div className="block col-lg-6">
                            <Form.Label>Efeito </Form.Label>
                            <Form.Select required name='' placeholder=""  >
                                  <option value="male" selected>#</option>
                                  <option value="female">#</option>
                            </Form.Select> 
                        </div> 
                        <div className="block ml-2 " style={{width:'49%'}}>
                            <Form.Label>Tipo de declarção</Form.Label>
                            <Form.Select required name='' placeholder=""  >
                                  <option value="1" selected>Com notas</option>
                                  <option value="0">Sem Notas</option>
                            </Form.Select> 
                        </div>
                    </div>
             </Form.Group> 
         </BoxContainer> 
        </div> 
         <br />
        <BoxContainer className='boxItem'>
          <div className="ed-space mb-4">
              <div><h2 className="title" style={{marginBottom:'0px'}}>Descrição da declaração</h2></div> 
          </div> 
          <Form.Group className="mb-3"  > 
           <RichTextEditor/>
        </Form.Group> 
       </BoxContainer> 
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

const Box = styled.div`
    width:auto; 
    border-radius:6px;   
    padding:20px; 
    min-height:200px;
    background:var(--ed-white);  
    box-shadow:var(--ed-shadow-df);
    margin:10px 0;
    min-width:430px;

    .ex{
        font-size:16px;
        margin-top:8px;
        margin-right:25px;

        .dot{
            width:20px;
            height:20px;
            border-radius:100%;
            margin-right:10px;
            border:3px solid var(--ed-white);
            box-shadow:var(--ed-shadow-df);
        }

        .dot.warning{
            background:#FFBD00;
        }

        .dot.success{
            background:#52B69A;
        }

        .dot.other{
            background:#CED4DA;
        }
    }



    .description{
        .name{
            font-size:18px;
            margin-bottom:15px;
            margin-top:10px;
        }

        h5{
            font-size:16px;
        }
    }

    h2{
        margin:10px 0;
        font-size:18px;
        font-weight:600;
    }
`;

export default GenerateDeclarations