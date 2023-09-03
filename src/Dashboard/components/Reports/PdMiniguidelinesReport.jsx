import React, {useEffect, useState} from 'react'
import { Check } from '@mui/icons-material' 
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Modal, Form, Button, Table} from 'react-bootstrap'
import { Save } from '@mui/icons-material'; 
import axios from 'axios';
import Hoot from '../../../General/components/Hoot';
import {CourseDataOptions, AcademicYearDataOptions, ClassroomsDataOptions, CicleDataOptions, GetInstituteCode, AcademiclevelDataOptions, TitlesAndHeadersDataOptions, GetClassroom_byclass, GetClasstitle_byclass, GetAcademiclevel_byclass, GetPeriod_byclass, GetAcademicYear_byclass, GetCourse_byclass} from '../../../General/components/InstituteData'; 
import { Print } from '@material-ui/icons';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import BackButton from '../elements/BackButton';
import PdMiniguidelinestable from '../Table/PdMiniguidelinestable';
import CRValue from '../../../General/components/CRValue';
import RandomCodeGenerator from '../../../General/components/RandomCodeGenerator';


function PdMiniguidelinesReport() { 
    const [Total, setTotal] = useState([""]);    
    const DATAURL = [ Hoot()+"eduallgetsingletitleandheader/get/"];
    const containerPrint = useRef();
    const [CurrentClass, SetCurrentClass] = useState(21); 
    const [CurrentSubject, SetCurrentSubject] = useState(21); 
 

    const ChildRef = useRef();



    async function StudentData(e){
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
    
        let titleCode = 0;
        const setTitleCode = (e)=>{
            StudentData(e);
            titleCode = e;
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
    

          const handlePrint = useReactToPrint({
            content:()=> containerPrint.current,
            documentTitle:'eduall_mini_pauta'+'_'+Date.now()+RandomCodeGenerator(10),
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
                                        <TitlesAndHeadersDataOptions  code={0}/>
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
                      <div className="enrollment-print-data miniguidelines-report">
                           <div className="header-doc">
                           <div className="header-print"></div>
                            <div className="header-subtitle">
                                  <div className="text-danger">   Mini-pauta da  <GetAcademiclevel_byclass ID={CurrentClass}/> </div>
                            </div>
                        </div> 
                        <div className="report-body">  
                          <div  >
                          <div>  
                            {CurrentClass !== null ? 
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
                                : 
                                <></>  
                                }
                                </div> 
                                <div className="mt-4"> 
                                        <PdMiniguidelinestable ref={ChildRef} Filters={{subject:CurrentSubject, class:CurrentClass}} ClassId={CurrentClass}  />
                                </div>   
                                  <br/>
                                 <div className="doc-footer mt-4"> 
                                    <aside className="col ed-flex wrap-3 mt-4">
                                            <main className="bx ed-flex">
                                                <div className="label">O professor : </div>
                                                <div className="text">
                                                    <div className="text-content">
                                                        <span className="str"></span>
                                                    </div>
                                                </div>
                                            </main> 
                                            <main className="bx ed-flex">
                                                <div className="label">Contacto : </div>
                                                <div className="text">
                                                    <div className="text-content">
                                                        <span className="str"></span>
                                                    </div>
                                                </div>
                                            </main>
                                            <main className="bx ed-flex">
                                                <div className="label">Data da Assinatura : </div>
                                                <div className="text">
                                                    <div className="text-content">
                                                        <span className="str"></span>
                                                    </div>
                                                </div>
                                            </main> 
                                    </aside>
                                    <div className="asignature" style={{position:'relative',bottom:'0px',height:'auto',marginTop:'30px'}}> 
                                       <div className="ed-space mt-4">
                                       <div className="block">                                            
                                            <h4>O Diretor de turma</h4><br />
                                            <div className="line"></div>
                                        </div>
                                        <div className="block">                                            
                                            <h4>O Subdiretor pedagógico</h4><br />
                                            <div className="line"></div>
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

export default PdMiniguidelinesReport
