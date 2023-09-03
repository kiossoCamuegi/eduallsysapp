import React, {useEffect, useRef, useState} from 'react'
import { Check } from '@mui/icons-material' 
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Modal, Form, Button, Table} from 'react-bootstrap'
import { Save } from '@mui/icons-material'; 
import axios from 'axios';
import Hoot from '../../../General/components/Hoot';
import {Link , useParams} from "react-router-dom";
import ClearInputs from '../../../General/components/ClearInputs'; 
import {CourseDataOptions, AcademicYearDataOptions, ClassroomsDataOptions, CicleDataOptions, GetInstituteCode, AcademiclevelDataOptions, TitlesAndHeadersDataOptions, GetClasstitle_byclass, GetAcademiclevel_byclass, GetPeriod_byclass, GetAcademicYear_byclass, GetserviceCoin} from '../../../General/components/InstituteData'; 
import {toast} from 'react-toastify'; 
import Logo from '../../../Assets/images/logos/alpega.png';
import { Print } from '@material-ui/icons'; 
import { useReactToPrint } from 'react-to-print';
import NotFounded from '../../../General/components/NotFounded';
import Loader from '../../../General/components/Loader';
import RandomCodeGenerator from '../../../General/components/RandomCodeGenerator';
import BackButton from '../elements/BackButton';
import CRValue from '../../../General/components/CRValue';


const DATAURL = [ 
    Hoot()+"eduallgetsingletitleandheader/get/",
    Hoot()+"eduallfeepaymentsingle/get/",
    Hoot()+"eduallsinglestudentapi/get/",
];

function StudentTuitionPaymentReport() {
    const [Total, setTotal] = useState([""]);    
    const containerPrint = useRef();
    const [data, setData] = useState([]);
    const [studentData, setStudentData] = useState([]);
    const [Loaded, setLoaded] = useState(false);
    const [StudentPersonalInformation, setStudentPersonalInformation] = useState([]);
    const [Founded, SetFounded]  = useState(false);

    const CurrentDay = new Date().getMonth();
    const CurrentMonth = new Date().getDay();
    const CurrentYear = new Date().getFullYear();

    const MonthOptions = ["Janeiro" , "Fevereiro", "Março",   "Abril",  "Maio",  "Junho", "Julho",  "Agosto", "Setembro", "Outubro", "Novembro",  "Dezembro"];


    async function StudentData(e){
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

    const {id} = useParams(); 

    async function LoadData(){
        const response = await axios.get(DATAURL[1]+`${id}`); 
        if(response.data.length >= 1){
             setData(response.data[0]);  
             const response2 = await axios.get(DATAURL[2]+`${response.data[0].ed_fee_payment_student}`); 
               if(response2.data.length >= 1){
                   setStudentData(response2.data[0]);
                   SetFounded(true);  
             }
        }
        console.clear();
        console.log(data);
        setLoaded(true);
    }


      useEffect(()=>{
          LoadData(); 
          setTimeout(() => { 
            setTitleCode(CRValue("#doc-header-type"));
         }, 1000);
      },[]);


const Print = useReactToPrint({
    content:()=> containerPrint.current,
    documentTitle:'eduall_recibo_de_pagamento_de_propina'+'_'+Date.now()+RandomCodeGenerator(10),
    copyStyles:true
});

      
    const handlePrint = ()=>{
        const style = document.createElement('style');
        style.innerHTML = `@page {size:portrait}`;
        style.id = 'page-orientation';
        document.head.appendChild(style);
        Print();
    }
    
    


     if(Loaded) { 
        if (Founded){
              let ST  = StudentPersonalInformation; 
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
                                         <option value="4">4X</option> 
                                         <option value="5">5X</option> 
                                    </Form.Select>
                                </Form.Group>  
                             </div>
                             <div className="ed-flex">
                                  <Form>
                                  <Form.Group > 
                                           <Form.Select onChange={(e)=>setTitleCode(e.target.value)} id="doc-header-type">
                                                <TitlesAndHeadersDataOptions code={2} />
                                            </Form.Select>
                                        </Form.Group>  
                                  </Form>
                                  <div className="ml-2">
                                    <div>
                                      <BackButton />
                                     </div>
                                  </div>
                             </div>
                        </div>
                    </div>
                 <div ref={containerPrint} style={{width:'100%', height:window.innerHeight}} >  
                        <section className={`paper-container`}    >
                        <div className="PaperBox">
                              {
                                Total.map((item, index)=>{
                                     return(
                                        <div className="enrollment-print-data tuition-document"   key={index}>
                                   <div className="header-doc">
                                   <div className="header-print"></div>
                                    <div className="header-subtitle">
            
                                    </div>
                                </div> 
                                    <div className="report-body"> 
                                    <section className="student-tuition-payment-report-card"> 
                                <div className="ed-space">
                                <div></div> 
                                <aside className="title-block ed-flex">
                                    <div className="label">Recibo Nº</div>
                                    <div className="text">
                                            <div className="text-content align-space">
                                                <span className='str'> { } </span>  
                                                <span className='str'> /  {CurrentYear} </span> 
                                            </div>
                                    </div>
                                </aside>
                                </div>
                                <br />
                                <aside className="col ed-flex">
                                    <div className="label">O(a) aluno (a)</div>
                                    <div className="text">
                                            <div className="text-content">
                                                <span className='str'> {studentData.ed_student_name } </span>
                                            </div>
                                    </div>
                                </aside> 

                                <aside className="col ed-flex wrap-4">
                                        <main className="bx ed-flex">
                                            <div className="label">Nº</div>
                                            <div className="text">
                                                <div className="text-content">
                                                    <span className="str">{studentData.ed_student_id}</span>
                                                </div>
                                            </div>
                                        </main> 
                                        <main className="bx ed-flex">
                                            <div className="label">Classe</div>
                                            <div className="text">
                                                <div className="text-content">
                                                    <span className="str">{<GetAcademiclevel_byclass ID={studentData.ed_student_class}/>}</span>
                                                </div>
                                            </div>
                                        </main>
                                        <main className="bx ed-flex">
                                            <div className="label">Turma</div>
                                            <div className="text">
                                                <div className="text-content">
                                                    <span className="str">{<GetClasstitle_byclass ID={studentData.ed_student_class}/>}</span>
                                                </div>
                                            </div>
                                        </main>
                                        <main className="bx ed-flex">
                                            <div className="label">Período</div>
                                            <div className="text">
                                                <div className="text-content">
                                                    <span className="str">{<GetPeriod_byclass ID={studentData.ed_student_class} />}</span>
                                                </div>
                                            </div>
                                        </main> 
                                </aside>

                                <aside className="col ed-flex">
                                    <div className="label">Depositou a favor desta instituição  o valor de </div>
                                    <div className="text">
                                            <div className="text-content">
                                                <span className='str'>  
                                                      { 
                                                      data.ed_fee_payment_price*1 -  ((data.ed_fee_payment_price * data.ed_fee_payment_discount) / 100)  +  
                                                        (data.ed_fee_payment_iva*1 <= 0 ? 0 : ((data.ed_fee_payment_price  * data.ed_fee_payment_iva)  / 100)) + 

                                                        (data.ed_fee_payment_fineType*1 === 1 ?  data.ed_fee_payment_fineValue*1  
                                                        : ((data.ed_fee_payment_price*1 * data.ed_fee_payment_fineValue*1) / 100)) 
                                                        }  
                                                     {" "+" "}   
                                                     <GetserviceCoin ID={data.ed_fee_payment_service} /> 
                                                 </span>
                                            </div>
                                    </div>
                                </aside>

                                <aside className="col ed-flex">
                                    <div className="label">Correspondente á</div>
                                    <div className="text">
                                            <div className="text-content">
                                                <span className='str'>  Propina do mês 
                                                  {" de " + MonthOptions[data.ed_fee_payment_month.split('.')[0]*1]  +" de " }
                                                  {data.ed_fee_payment_month.split('.')[1]}
                                                 </span>
                                            </div>
                                    </div>
                                </aside>
                                

                                <aside className="col ed-wrap wrap-2">
                                        <main className="bx ed-flex">
                                            <div className="label">Do ano lectivo</div>
                                            <div className="text">
                                                <div className="text-content">
                                                    <span className="str">{<GetAcademicYear_byclass ID={studentData.ed_student_class} />}</span>
                                                </div>
                                            </div>
                                        </main> 
                                        <main className="bx ed-flex">
                                            <div className="label">Conforme o Talão de Deposito Nº</div>
                                            <div className="text">
                                                <div className="text-content">
                                                    <span className="str">{data.ed_fee_payment_bordereux}</span>
                                                </div>
                                            </div>
                                        </main> 
                                </aside>

                                <aside className="col ed-flex">
                                    <div className="label">Banco</div>
                                    <div className="text">
                                            <div className="text-content">
                                                <span className='str'> {data.ed_fee_payment_bank} </span>
                                            </div>
                                    </div>
                                </aside>  

                                <br /> 

                                <div className="doc-footer mt-4"> 
                                    <div className="asignature mt-4">
                                    <div className="ed-space mt-4"> 
                                        <aside className="col ed-wrap wrap-3">
                                        <main className="bx ed-flex">
                                            <div className="label">Luanda, aos </div>
                                            <div className="text">
                                                <div className="text-content">
                                                    <span className="str">{ }</span>
                                                </div>
                                            </div>
                                        </main> 
                                        <main className="bx ed-flex">
                                            <div className="label">de</div>
                                            <div className="text">
                                                    <div className="text-content">
                                                        <span className="str">{   }</span>
                                                    </div>
                                            </div>
                                            </main> 
                                            <main className="bx ed-flex">
                                            <div className="label">de</div>
                                            <div className="text">
                                                    <div className="text-content">
                                                        <span className="str">{}</span>
                                                    </div>
                                            </div>
                                            </main> 
                                        </aside> 
                                        <div className="block">                                            
                                            <h4>O (A) Responsável</h4><br />
                                            <div className="line"></div>
                                        </div>
                                    </div>
                                    </div>  
                                </div>


                                    </section>
                                    </div>
                                    <div className="auth-info mt-2">
                                        <div style={{marginTop:'10px'}}><span>Processado por software eduallsys - Colégios  / Licenciado pela AGT Nº 1285</span></div>
                                    </div>
                                </div>
                                )
                            })
                          }
                        </div> 

                    </section>  
                 </div>
                </div>
      
               </div>
             </div>
             )
        }else{
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

export default StudentTuitionPaymentReport