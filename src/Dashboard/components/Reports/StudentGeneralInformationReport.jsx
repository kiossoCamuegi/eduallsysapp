import React, {useEffect, useState} from 'react'
import { Check } from '@mui/icons-material' 
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Modal, Form, Button, Table} from 'react-bootstrap'
import { Save } from '@mui/icons-material'; 
import axios from 'axios';
import Hoot from '../../../General/components/Hoot';
import ClearInputs from '../../../General/components/ClearInputs'; 
import {CourseDataOptions, AcademicYearDataOptions, ClassroomsDataOptions, CicleDataOptions, GetInstituteCode, AcademiclevelDataOptions, TitlesAndHeadersDataOptions} from '../../../General/components/InstituteData'; 
import {toast} from 'react-toastify'; 
import Logo from '../../../Assets/images/logos/alpega.png';
import { Print } from '@material-ui/icons';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';


function StudentGeneralInformationReport() {
     const EnrollmentsData = [""];  
    const [amount, setAmount] = useState(1);

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
         setAmount(e);
    }

    const handlePrint = useReactToPrint({
        content:()=> containerPrint.current,
        documentTitle:'eduall_relatorio_geral_do_aluno'+'_'+Date.now(), 
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
                           <section className="student-general-information-print">

                           </section>
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

export default StudentGeneralInformationReport