import React, {useEffect, useState} from 'react'
import { Check } from '@mui/icons-material' 
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Modal, Form, Button} from 'react-bootstrap'
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
import { useParams } from 'react-router-dom';
import NotFounded from '../../../General/components/NotFounded';
import Loader from '../../../General/components/Loader';
import BackButton from '../elements/BackButton';


function StudentEnrollmentConfirmationReport() {
    const EnrollmentsData = [""];  
    const containerPrint = useRef();
    const [Total, setTotal] = useState([""]);   
     const [data, setData] = useState([]);
    const [studentData, setStudentData] = useState([]);
    const [Loaded, setLoaded] = useState(false);
    const [InstituteData, setInstituteData] = useState([]);
    const [StudentPersonalInformation, setStudentPersonalInformation] = useState([]);
    const [Founded, SetFounded]  = useState(null);
 
    const CurrentDate = new Date().toLocaleString();

    const {id} = useParams(); 

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




       async function loadData(){  
             const response = await axios.get(DATAURL[2]+id); 
               if(response.data.length >= 1){
                   setStudentData(response.data[0]);     
                    const response2 = await axios.get(DATAURL[3]); 
                    if(response2.data.length >= 1){
                        setInstituteData(response2.data[0]);
                        SetFounded(true);  
                        console.log(response2.data[0])
                    }else{
                      SetFounded(false);  
                    }
             }else{
              SetFounded(false);  
             }
        }  


      useEffect(()=>{
          loadData();
          setLoaded(true);
      },[]);






    const setTitleCode = (e)=>{
        StudentData(e);
    }

        
    const Multiplicate = (e)=>{
            
    }



    const handlePrint = useReactToPrint({
        content:()=> containerPrint.current,
        documentTitle:'eduall_matrícula_&_confirmação'+'_'+CurrentDate, 
        copyStyles:true
    });
    





    if(Loaded) { 
        if (Founded === true){
              let ITD  = StudentPersonalInformation; 
              let ST = studentData;

              console.log(ST)
    
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
                        <section className='report-enrollment-confirmation'>
                             <div className="custom-space">
                                <div className="block">
                                   <div className="fw enrolled-confirmation-at">
                                        Inscreve-se na <div className="data sm"> 8ª </div> <strong>Classe</strong>
                                    </div>
                                    <div className="fw enrolled-confirmation-date">
                                        Data : <div className="data">{CurrentDate} </div>
                                    </div>
                                </div>
                                <div className="picture">
                                    <img loading="lazy" role="presentation" src="https://imageio.forbes.com/specials-images/imageserve/62d599ede3ff49f348f9b9b4/0x0.jpg?format=jpg&crop=821,821,x155,y340,safe&height=416&width=416&fit=bounds" alt="" />
                                </div>
                             </div>
                            <div className="enrolled-confirmation-row">
                               <div className="fw row-item"><strong>Confirmação</strong><div className="checkBox"> {} </div></div>
                               <div className="fw row-item"><strong>Matrícula</strong><div className="checkBox"> {} </div></div>
                               <div className="fw row-item"><strong>Nº de Matricula</strong><div className="enrollment-code"> {} </div></div>
                            </div>
                            <div className="ed-flex mt-2 enrolled-confirmation-name">
                                <div className="wd"> Nome : </div><div className="data fill"></div>
                            </div>
                            <div className="ed-wrap">
                              <div className="fw mt-2 enrolled-confirmation-naturalness">
                                    Natural de : <div className="data"></div>
                                </div>
                                <div className="fw mt-2 ml-2 enrolled-confirmation-birthday">
                                   nascido aos : <div className="data">19 / 12 / 2001</div>
                                </div>
                                <div className="fw mt-2 ml-2 enrolled-confirmation-address">
                                   Morada : <div className="data">Mutamba , ruas dos generais</div>
                                </div>
                            </div> 
                            <div className="ed-flex mt-2 enrolled-confirmation-phones">
                                <div className="wd">Escola de proveniência :</div><div className="data fill">Colegio elizangela filomena</div>
                            </div>
                            <div className="ed-wrap">
                               <div className="ed-flex mt-2 enrolled-confirmation-fathername">
                                 Nome do pai : <div className="data">Carlos josé pedro Morais</div> 
                               </div>
                               <div className="fw  mt-2 ml-2 enrolled-confirmation-fatherphone">
                                 Nº de telefone : <div className="data">987656453</div>                              
                               </div>
                            </div>
                            <div className="ed-wrap">
                                <div className="ed-flex  mt-2 enrolled-confirmation-mothername">
                                    Nome da mãe : <div className="data"> Marta silva andré Morais  </div>
                                </div>
                                <div className="fw mt-2 ml-2 enrolled-confirmation-motherphone">
                                   Nº de telefone : <div className="data">900878654</div>
                                </div>
                            </div>
                            <div className="ed-wrap">
                                <div className="ed-flex mt-2 enrolled-confirmation-mothername">
                                   <div className="wd"> Encarregado (a) de educação :</div> <div className="data fill">Paulo Manuel Gomes  </div>
                                </div>
                                <div className="fw ml-2 mt-2 enrolled-confirmation-motherphone">
                                   Residencia : <div className="data">Iª de maio vila historil</div>
                                </div>
                                <div className="fw mt-2 enrolled-confirmation-motherphone">
                                   Nº de telefone : <div className="data">900878654</div>
                                </div>
                            </div>
                            <div className="text-center">
                                <h2>Documentos entregues</h2>
                                <div className="pdr"></div>
                            </div>
                            <div className="ed-flex mt-4">
                                <div className="fw enrolled-confirmation-docs">
                                    <div className="wd">Fotocopia do BI ou Cédula</div>
                                    <div className="checkBox">{}</div>
                                </div>
                                <div className="fw mlg mt-2 enrolled-confirmation-docs">
                                    <div className="wd">Atestado Médico</div>
                                    <div className="checkBox">{}</div>
                                </div>
                            </div>
                            <div className="ed-flex">
                                <div className="fw enrolled-confirmation-docs">
                                    <div className="wd">Fotocopia do cartão de vacina</div>
                                    <div className="checkBox">{}</div>
                                </div>
                                <div className="fw mt-2 mlg enrolled-confirmation-docs">
                                    <div className="wd">Declaração com notas</div>
                                    <div className="checkBox">{}</div>
                                </div>
                            </div>
                            <div className="ed-flex">
                                <div className="fw enrolled-confirmation-docs">
                                    <div className="wd">Fotografias do tipo passe</div>
                                    <div className="checkBox">{}</div>
                                </div>
                                <div className="fw mlg enrolled-confirmation-docs">
                                    <div className="wd">Certificado do ensino secundário</div>
                                    <div className="checkBox">{}</div>
                                </div>
                            </div>
                            <div className="asignature">
                                <div className="ed-space">
                                    <div className="block">
                                        <div className="line"></div>
                                         <h4>Assinatura do(a) Encarregado de educação</h4>
                                    </div> 
                                </div>
                            </div> 
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
        }else if(Founded === false){
            return (
                <NotFounded />
            )
        }
      }else{
        return(
            <div className="loader-content-box">
               <Loader />
            </div>
         )
      } 









}

export default StudentEnrollmentConfirmationReport