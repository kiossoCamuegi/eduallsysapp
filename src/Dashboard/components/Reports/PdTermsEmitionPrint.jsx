import React, {useEffect, useState} from 'react'
import { Check } from '@mui/icons-material' 
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Modal, Form, Button, Table} from 'react-bootstrap'
import { Save } from '@mui/icons-material'; 
import axios from 'axios';
import Hoot from '../../../General/components/Hoot';
import ClearInputs from '../../../General/components/ClearInputs'; 
import {CourseDataOptions, AcademicYearDataOptions, ClassroomsDataOptions, CicleDataOptions, GetInstituteCode, AcademiclevelDataOptions, TitlesAndHeadersDataOptions, GetClassroom_byclass, GetClasstitle_byclass, GetAcademiclevel_byclass, GetPeriod_byclass, GetAcademicYear_byclass, GetCourse_byclass} from '../../../General/components/InstituteData'; 
import {toast} from 'react-toastify'; 
import Logo from '../../../Assets/images/logos/alpega.png';
import { Print } from '@material-ui/icons';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import PdGenerateTermsTable from '../Table/PdGenerateTermsTable';
import RandomCodeGenerator from '../../../General/components/RandomCodeGenerator';
import BackButton from '../elements/BackButton';

function PdTermsEmitionPrint() {
    const EnrollmentsData = [""];  
    const [amount, setAmount] = useState(1);
    const [CurrentClass, SetCurrentClass] = useState(null); 

    const DATAURL = [ Hoot()+"eduallgetsingletitleandheader/get/"];
    const containerPrint = useRef();

    const StudentData = async(e)=>{
    if(Math.floor(e) >= 0){
        const response = await axios.get(DATAURL[0]+`${e}`)  
        if(response.data.length >= 1) {    
            let outputs = document.querySelectorAll(".PaperBox .header-print");
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
         setAmount(e);
    }

    const handlePrint = useReactToPrint({ 
        content:()=> containerPrint.current,
        documentTitle:'eduall_relatorio_de_termo_de_matricula_e_frequencia_aproveitamento'+'_'+RandomCodeGenerator(30), 
        copyStyles:true
    });


    const PrintData = ()=>{
        const style = document.createElement('style');
        style.innerHTML = `@page {size:landscape}`;
        style.id = 'page-orientation';
        document.head.appendChild(style); 
        handlePrint() 
    }


    return (
        <div>
            <div className="print-enrollment-header">
                <div className="ed-space">
                     <div className="ed-flex">
                        <button className="btn bg-main-light btn-icon-m0" onClick={()=>PrintData()}><Print/> </button>
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
     
                <section className={`paper-container  paper-container-0`}    >
                <div className="PaperBox">
                      <div className="enrollment-print-data">
                           <div className="header-doc">
                           <div className="header-print"></div>
                            <div className="header-subtitle">
    
                            </div>
                        </div> 
                      <div className="report-body">
                          <div className="report-term-emition">
                               <div className="student-data">
                                  <aside className="ed-data">
                              
                            <div className="ed-wrap ed-space">
                              <div className="fw  mt-2  w3">
                                  <div className="wd"> Nome : </div><div className="data"></div>
                              </div>
                              <div className="fw  mt-2 w3 ">
                                  <div className="wd">Filho de </div><div className="data"></div>
                              </div>
                              <div className="fw  mt-2  w3">
                                  <div className="wd"> e de </div><div className="data"></div>
                              </div>
                            </div>
                            <div className="ed-wrap  ed-space">
                              <div className="fw mt-2 w3">
                                   <div className="wd"> Nascido aos : </div><div className="data"></div>
                                </div>
                                <div className="fw mt-2 w3">
                                  <div className="wd"> natural de </div> <div className="data"></div>
                                </div>
                                <div className="fw mt-2 w3">
                                   <div className="wd">Morada </div> <div className="data"></div>
                                </div>
                            </div>  
                            <div className="ed-wrap">
                                <div className="fw w3 mt-2">
                                   <div className="wd">Nº do BI</div><div className="data"></div>
                                </div>
                               <div className="fw w3 mt-2">
                                 <div className="wd">Emitido aos</div><div className="data"></div> 
                               </div>
                               <div className="fw  w3 mt-2 ml-2">
                                 <div className="wd">Validade</div> <div className="data">987656453</div>                              
                               </div>
                            </div>
                            <div className="ed-wrap ed-space">
                                <div className="fw w2 mt-2">
                                    <div className="wd">O encarregado</div><div className="data"> Marta silva andré Morais  </div>
                                </div>
                                <div className="fw w2 mt-2">
                                  <div className="wd"> Contacto</div> <div className="data">900878654</div>
                                </div>
                            </div> 
                              </aside>
                               </div> 
                                    <div className='mt-2 mb-2'>
                                    <Table responsive bordered  >  
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div className="ed-space">
                                                <div><strong>Sala</strong></div>
                                                <div><GetClassroom_byclass ID={CurrentClass} /></div>
                                                </div>
                                            </td> 
                                            <td>
                                                <div className="ed-space">
                                                <div><strong>Turma</strong></div>
                                                <div><GetClasstitle_byclass ID={CurrentClass} /></div>
                                                </div>
                                            </td> 
                                            <td>
                                                <div className="ed-space">
                                                <div><strong>Classe</strong></div>
                                                <div> <GetAcademiclevel_byclass ID={CurrentClass}/></div>
                                                </div>
                                            </td> 
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="ed-space">
                                                <div><strong>Período</strong></div>
                                                <div><GetPeriod_byclass ID={CurrentClass} /></div>
                                                </div>
                                            </td> 
                                            <td>
                                                <div className="ed-space"> 
                                                    <div><strong>Ano letivo</strong></div>
                                                <div><GetAcademicYear_byclass  ID={CurrentClass} /> </div>
                                                </div>
                                            </td> 
                                            <td>
                                                <div className="ed-space">
                                                <div><strong>Prof</strong></div>
                                                <div>****</div>
                                                </div>
                                            </td> 
                                        </tr>
                                        <tr>
                                            <td rowSpan='2' colSpan='3'>
                                                <div className="ed-space"> 
                                                <div><strong>Curso</strong></div>
                                                <div><GetCourse_byclass ID={CurrentClass} /></div>
                                                </div>
                                            </td>  
                                        </tr>
                                    </tbody>
                                    </Table>
                                    </div> 
                               <PdGenerateTermsTable />
                          </div>
                      </div>
                    </div>
                </div>
            </section>    

         </div>
        </div>
     )
}

export default PdTermsEmitionPrint
