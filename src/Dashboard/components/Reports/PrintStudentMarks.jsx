import React, {useEffect, useRef, useState} from 'react'
import { Check } from '@mui/icons-material' 
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Modal, Form, Button, Table} from 'react-bootstrap'
import { Save } from '@mui/icons-material'; 
import axios from 'axios';
import Hoot from '../../../General/components/Hoot';
import {Link , useParams} from "react-router-dom";
import ClearInputs from '../../../General/components/ClearInputs'; 
import {CourseDataOptions, AcademicYearDataOptions, ClassroomsDataOptions, CicleDataOptions, GetInstituteCode, AcademiclevelDataOptions, TitlesAndHeadersDataOptions, GetClasstitle_byclass, GetAcademiclevel_byclass, GetPeriod_byclass, GetAcademicYear_byclass, GetClassroom_byclass, GetCourse_byclass, GetServiceTitle, GetServiceCointText, GetserviceCoin, GetStudentName} from '../../../General/components/InstituteData'; 
import {toast} from 'react-toastify'; 
import Logo from '../../../Assets/images/logos/alpega.png';
import { Print } from '@material-ui/icons'; 
import { useReactToPrint } from 'react-to-print';
import NotFounded from '../../../General/components/NotFounded';
import Loader from '../../../General/components/Loader';
import RandomCodeGenerator from '../../../General/components/RandomCodeGenerator'; 
import { UserAccountData } from '../../../General/components/UserAccountData';
import NumberToPrice from '../../../General/components/NumberToPrice';
import BackButton from '../elements/BackButton';
import CRValue from '../../../General/components/CRValue';
import moment from 'moment';
import PdStudentMarksTable from '../Table/PdStudentMarksTable';



function PrintStudentMarks() {
    const [Total, setTotal] = useState([""]);   
    const containerPrint = useRef(); 

    const DATAURL = [ 
        Hoot()+"eduallgetsingletitleandheader/get/",
        Hoot()+"eduallfeepaymentsingle/get/",
        Hoot()+"eduallsinglestudentapi/get/",
        Hoot()+"eduallgetsingleinstitute/get/1"
    ];

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
  }

    const {Class, Student} = useParams(); 
 


    const handlePrint = useReactToPrint({
        content:()=> containerPrint.current,
        documentTitle:'eduall_boletim_de_notas'+'_'+Date.now()+RandomCodeGenerator(10),
        copyStyles:true
    }); 
    
    
    return (
    <div>
    <div className="eduall-print-area">
        <div className="box"> 
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
            {Total.map((item, index)=>{   
                return(
                    <section className={`paper-container`}  key={index}  >
                    <div className="PaperBox">
                        <div className="enrollment-print-data studentmarks-print-data"   key={index}> 
                        <div className="header-doc">
                           <div className="header-print"></div>
                            <div className="header-subtitle"> 
                            </div>
                        </div> 
                        <div className="report-body">  
                            <div className="mb-3">
                            <Table responsive bordered  >  
                            <tbody>
                                <tr>
                                    <td  colSpan='5'>
                                        <div className='ed-flex'>  
                                        <div><strong>Nome :</strong></div>
                                        <div className="text-danger ml-2"><GetStudentName ID={Student} /></div>
                                        </div>
                                    </td>  
                                </tr>
                                <tr>
                                    <td>
                                        <div className="ed-space">
                                        <div><strong>Sala</strong></div>
                                        <div><GetClassroom_byclass ID={Class} /></div>
                                        </div>
                                    </td> 
                                    <td>
                                        <div className="ed-space">
                                        <div><strong>Turma</strong></div>
                                        <div><GetClasstitle_byclass ID={Class} /></div>
                                        </div>
                                    </td> 
                                    <td>
                                        <div className="ed-space">
                                        <div><strong>Classe</strong></div>
                                        <div> <GetAcademiclevel_byclass ID={Class}/></div>
                                        </div>
                                    </td> 
                                    <td>
                                        <div className="ed-space">
                                        <div><strong>Nº de processo</strong></div>
                                        <div>{Student}</div>
                                        </div>
                                    </td>  
                                    <td>
                                        <div className="ed-space">
                                        <div><strong>Período</strong></div>
                                        <div><GetPeriod_byclass ID={Class} /></div>
                                        </div>
                                    </td> 
                                </tr>
                                <tr> 
                                    <td>
                                        <div className="ed-space"> 
                                            <div><strong>Ano letivo</strong></div>
                                        <div><GetAcademicYear_byclass  ID={Class} /> </div>
                                        </div>
                                    </td> 
                                    <td rowSpan='2' colSpan='4'>
                                        <div className="ed-flex"> 
                                        <div><strong>Curso : </strong></div>
                                        <div className='ml-2'><GetCourse_byclass ID={Class} /></div>
                                        </div>
                                    </td>   
                                </tr> 
                            </tbody>
                            </Table>
                            </div>
                            <PdStudentMarksTable nostriped StudentCode={Student}  ClassId={Class}  />  
                            <div className="mt-4">
                               <div className="footer-content mt-4">  
                                <div className="mt-4 ed-center" contentEditable>Localização e data atual aqui</div>
                                    <div className="ed-space">
                                        <div className="ed-block ed-center block-line">
                                            <h3 contentEditable>O Diretor de Turma</h3>
                                            <div className="line"></div>
                                        </div>
                                        <div className="ed-block ed-center block-line">
                                                <h3 contentEditable>O Diretor Pedagógico</h3>
                                            <div className="line"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div> 
                  </section>  
                )
            })} 
        </div>
    </div>

    </div>
    </div>
    )
        
}

export default PrintStudentMarks
