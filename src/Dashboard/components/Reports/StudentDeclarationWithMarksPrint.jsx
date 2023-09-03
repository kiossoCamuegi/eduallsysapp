import React, {useEffect, useState} from 'react'
import { Check } from '@mui/icons-material' 
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Modal, Form, Button, Table} from 'react-bootstrap'
import { Save } from '@mui/icons-material'; 
import axios from 'axios';
import Hoot from '../../../General/components/Hoot';
import {CourseDataOptions, AcademicYearDataOptions, ClassroomsDataOptions, CicleDataOptions, GetInstituteCode, AcademiclevelDataOptions, TitlesAndHeadersDataOptions, GetSubject} from '../../../General/components/InstituteData'; 
import { Print } from '@material-ui/icons';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import BackButton from '../elements/BackButton';
import CRValue from '../../../General/components/CRValue';


function StudentDeclarationWithMarksPrint() {
    const EnrollmentsData = [""]; 
    const [Total, setTotal] = useState([""]);  

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
        let Amount = [];
         for(let i = 0; i < e; i++) {
             Amount.push("");
        }
       setTotal(Amount);
       setTitleCode(CRValue("#doc-header-type"));
    }
  

    useEffect(()=>{
        setTimeout(() => {
            setTitleCode(CRValue("#doc-header-type"));
        }, 1000);
    },[]);

      
     let day = new Date().getDay()
     let month = new Date().getMonth()
     let year = new Date().getYear()


    const handlePrint = useReactToPrint({
        content:()=> containerPrint.current,
        documentTitle:'declaração'+'_'+Date.now(), 
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
                                    <option value="4">4X</option> 
                                    <option value="5">5X</option> 
                            </Form.Select>
                        </Form.Group>  
                     </div>
                     <div className="ed-flex">
                          <Form>
                          <Form.Group > 
                                   <Form.Select onChange={(e)=>setTitleCode(e.target.value)} id="doc-header-type">
                                        <TitlesAndHeadersDataOptions code={4}  />
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
        Total.map((item, index)=>{
             return(
                <section className={`paper-container  paper-container-${index}`}    >
                <div className="PaperBox">
                   <div className="bordered">
                   <div className="b0">
                        <div className="b1">
                           <div className="b2">
                             <div className="enrollment-print-data declaration-report-content">
                                <div className="header-doc">
                                <div className="header-print"></div>
                                    <div className="header-subtitle">
                                       <div className="d3-text">
                                            <h1>Declaração</h1>
                                        </div>
                                    </div>
                                </div> 
                                <div className="report-body">
                                <div className="declaration_report">
                                        <div contentEditable className="description-area mt-2 mb-4">
                                            Conforme a solicitação do encarregado de educação e para os devidos efeitos legais, declara-se
                                            que: <strong className="text-red">Bernardino dos Santos Bernardo</strong> , 
                                            Filho de Francisco Eugenio Bernardo e de Silvina
                                            Kingana Dos Santos, nascido aos 27 de Agosto de 2007, natural do Cazenga, Província de Luanda
                                            Portador do B.I nº 02026888LA055, emitido aos 07/11/2019 passado pelo Arquivo de
                                            Identificação de Luanda.
                                        </div>
                                        <div contentEditable className="d-none description mb-4">
                                            É aluno interno desta instituição, matriculado na <strong>7ª Classe</strong> no Ano Lectivo de 2021/2022, na
                                            turma <strong>B</strong> , sala nº 06, sob nº 08, Período da Tarde.
                                            <br />
                                        </div>
                                        <div contentEditable className="description mb-4">
                                            Esteve nesta escola no Ano Lectivo de 2021/2022 a frequentar a <strong>4ª Classe</strong> , na turma B, sob
                                            nº 24, tendo obtido as seguintes classificações:
                                        </div>
                                        
                                        <ul>
                                            {[1,2,3,4,5,6,7,8,9,10].map((item, index)=>{
                                                return(
                                                <li className="ed-space mt-2" key={index}>
                                                    <div className='sub ed-flex'><div className="dt"></div> <GetSubject ID={item} /> </div>
                                                    <div className="b"></div>
                                                    <div className="mrk">(12) Valores</div>
                                                </li>
                                                )
                                            })}
                                        </ul> 

                                        <div className="description mb-2" contentEditable>
                                            A presente Declaração destina-se para efeito  <strong>desportivo.</strong>
                                        </div>
                                        <div className="description mb-4" contentEditable>
                                            Por ser verdade e assim constar, Passo a presente Declaração que vai por mim assinada e
                                            autenticada com o carimbo a óleo em uso nesta instituição escolar.
                                        </div> 
                                        <div className="text-center mb-2">
                                            <span>Viana, 22 de Julho de 2022</span>
                                        </div>
                                        <div className="asignature center">
                                            <div className="text-center block"> 
                                                   <h4>O Director Pedagógico</h4> 
                                                <div className="line"></div>
                                                <div className="asignature-place">
                                                    <h3>Carlos Manuel Pedro</h3>
                                                </div>
                                            </div>
                                        </div>
                                </div> 
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

export default StudentDeclarationWithMarksPrint