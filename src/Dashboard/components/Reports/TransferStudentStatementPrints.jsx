import React, {useEffect, useState} from 'react'
import { Check } from '@mui/icons-material' 
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Modal, Form, Button} from 'react-bootstrap'
import { Save } from '@mui/icons-material'; 
import axios from 'axios';
import Hoot from '../../../General/components/Hoot';
import {CourseDataOptions, AcademicYearDataOptions, ClassroomsDataOptions, CicleDataOptions, GetInstituteCode, AcademiclevelDataOptions, TitlesAndHeadersDataOptions} from '../../../General/components/InstituteData'; 
import { Print } from '@material-ui/icons';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import BackButton from '../elements/BackButton';

function TransferStudentStatementPrints() {
    const EnrollmentsData = [""];  

    const DATAURL = [ Hoot()+"eduallgetsingletitleandheader/get/"];
    const containerPrint = useRef();

    const StudentData = async(e)=>{
    if(Math.floor(e) >= 0){
        const response = await axios.get(DATAURL[0]+`${e}`)  
        if(response.data.length >= 1) {    
            let outputs = document.querySelectorAll(".box .header-print");
            for (let i = 0; i < outputs.length; i++) {
                outputs[i].innerHTML = JSON.parse(response.data[0].ed_title_description);
            }  
        }
    }
    }  

    const setTitleCode = (e)=>{
        StudentData(e);
    }

        
    const Multiplicate = (e)=>{
            
    }

      
     let day = new Date().getDay()
     let month = new Date().getMonth()
     let year = new Date().getYear()


    const handlePrint = useReactToPrint({
        content:()=> containerPrint.current,
        documentTitle:'declaração_de_transferência'+'_'+Date.now(), 
        copyStyles:true
    });
    
    
    return (
        <div>
            <div className="print-enrollment-header">
                <div className="ed-space">
                     <div className="ed-flex">
                        <button className="btn bg-main-light btn-icon-m0" onClick={handlePrint}><Print/> </button>
                        <Form.Group className='ml-2' > 
                            <Form.Select onChange={(e)=>Multiplicate(e.target.value)} style={{maxWidth:'100px'}} >
                                 <option value="1">1X</option>
                                 <option value="2">2X</option>
                                 <option value="3">3X</option>
                                 <otpion value="4">4X</otpion>
                                 <otpion value="5">5X</otpion>
                                 <otpion value="6">6X</otpion>
                            </Form.Select>
                        </Form.Group>  
                     </div>
                     <div className="ed-flex">
                          <Form>
                          <Form.Group > 
                                   <Form.Select onChange={(e)=>setTitleCode(e.target.value)} id="doc-header-type">
                                        <TitlesAndHeadersDataOptions/>
                                    </Form.Select>
                                </Form.Group>  
                          </Form>
                          <div className="ml-2"> 
                                <BackButton /> 
                            </div>
                     </div>
                </div>
            </div>
         <div ref={containerPrint} style={{width:'100%', height:window.innerHeight}} > 
        {
        EnrollmentsData.map((item, index)=>{
             return(
                <section className={`paper-container  paper-container-${index}`}    >
                <div className="PaperBox">
                      <div className="enrollment-print-data">
                           <div className="header-doc">
                           <div className="header-print"></div>
                            <div className="header-subtitle">
    
                            </div>
                        </div> 
                        <div className="report-body">
                         <div className="transfer-student-statement-print">


                            <div className="ed-flex mt-2">
                                 <div className="tx">  Sr(a) Diretor(a) da Unidade Escolar</div>
                                <div className="data fill"></div>
                            </div>
                            <div className="lgm">
                            <div className="wt mt-4">
                                  <div className="ed-space">
                                    <div></div>
                                    <div>
                                        Abaixo assinado, responsável legal pelo(a) aluno(a)
                                    </div>
                                  </div>
                             </div>
                            </div>
                            <div className="ed-flex">
                            <div className="data fill">

                             </div>,
                            </div>
                            <div className="wt">
                               regulamento matriculado(a) no <div className="schollname"></div>
                               <div className="ed-flex">
                                  <div className="tx">sob o nº</div>
                                  <div className="data fill"></div>
                               </div>
                            </div> 
                            <div className="ed-wrap">
                                <div className="ed-flex">
                                    atualmente cursando a <div className="data"></div>
                                </div>
                                <div className="ed-flex">
                                    Classe do 
                                    <div className="data"></div>
                                </div>
                            </div>
                           <div className="ed-wrap">
                           <div className="wrap">
                                nesta Unidade Escolar, vem muito respeitosamente requerer a
                               <strong className='ml-2'>Transferência de unidade escolar para o Ano letivo de </strong>
                               <div className="data academicyear"></div>
                            </div>,
                            <div className="mt-2 description">
                                Os principais fatores de risco relacionados ao desenvolvimento do câncer são: atividade física, tabagismo, alimentação, peso corporal, hábitos sexuais, fatores ocupacionais, bebidas alcoólicas, exposição solar, radiações e medicamentos.
                            </div>
                           </div>
                           <br />
                           <div className="mt-2">
                               <strong> Para o quê está anexando os seguintes documentos :</strong>
                               <div className="mt-2 description">
                                 Um pedido de desculpas é uma expressão de arrependimento ou remorso por ações, enquanto pedir desculpas é o ato de expressar arrependimento ou remorso. Em situações informais, pode ser abreviado para "desculpa" ou "desculpe-me".
                              </div>
                           </div>
                           <br />
                           <div className="block mt-4">
                              <div className="text-left">
                                  <h2>Itens de preenchimento obrigatório</h2>
                              </div>
                              <div className="ed-wrap">
                               <div className="tx"> Unidade Escolar (para a qual deseja efectuar a transferência) </div>
                                <div className="description">

                                </div>
                              </div>
                              <div className="ed-wrap mt-2">
                                 Turno :
                                  <div className="ml-2">1º( <Check/> )</div>
                                  <div className="ml-2">2º(  )</div>
                                  <div className="ml-2">3º(  )</div>
                                  <div className="ml-2">Sem preferência ( )</div>
                              </div>
                              <div className="ed-wrap mt-2">
                                <div className="tx"> Língua Estrangeira</div> ( <strong>esclusivo para alunos do Ensino Médio</strong>)</div>
                              <div className="description"></div>
                           </div>
                           <div>
                               <div className="ed-wrap description mt-4">
                                  <div className="ed-space">
                                    <div></div>
                                    <div>
                                        <div> Declara, outrossim, que está ciente de que o simples preenchimento deste requerimento a</div>
                                    </div>
                                  </div>
                                    transferência solicitada e que o deferimento do pedido está diretamente a transferência
                                   solicitadae que o deferimento do pedido está diretamente vinculado ao quantitativo de vagas da unidade Escolar para a qual solicitoua transferência, à análise da exposição de motivos e a
                                  à  possibilidade de contemplar a opão de Língua Estrangeira do aluno, no caso do ensino Médio. 
                               </div>
                           </div>
                           <div className="ed-space mt-4">
                              <div className="ed-wrap"></div>
                              <div className="ed-flex date">
                                 <div className="location">Luanda aos</div>
                                 <div className="data day text-center"> {  day } </div> 
                                 de <div className="month data "> {month} </div> 
                                 de <div className="year data">{year}</div>
                              </div> 
                           </div>

                           <div className="asignature">
                                <div className="ed-space">
                                    <div className="block">
                                        <div className="line"></div>
                                         <h4>Assinatura do(a) Encarregado de educação</h4>
                                    </div>
                                    <div className="block">
                                        <div className="line"></div>
                                         <h4>Assinatura do(a) Funcionário (a)</h4>
                                    </div>
                                </div>
                            </div>

                        </div>
                      </div>
                    </div>
                </div>
            </section> 
             )
            })
          }
         </div>
        </div>
      )
}

export default TransferStudentStatementPrints