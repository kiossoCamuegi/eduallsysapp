import React, {useEffect, useRef, useState} from 'react'
import { Check } from '@mui/icons-material' 
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Modal, Form, Button, Table} from 'react-bootstrap'
import { Save } from '@mui/icons-material'; 
import axios from 'axios';
import Hoot from '../../../General/components/Hoot';
import {Link , useParams} from "react-router-dom";
import ClearInputs from '../../../General/components/ClearInputs'; 
import {CourseDataOptions, AcademicYearDataOptions, ClassroomsDataOptions, CicleDataOptions, GetInstituteCode, AcademiclevelDataOptions, TitlesAndHeadersDataOptions, GetClasstitle_byclass, GetAcademiclevel_byclass, GetPeriod_byclass, GetAcademicYear_byclass, GetClassroom_byclass, GetCourse_byclass, GetServiceTitle, GetServiceCointText, GetserviceCoin, GetSubject} from '../../../General/components/InstituteData'; 
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


const DATAURL = [ 
    Hoot()+"eduallgetsingletitleandheader/get/",
    Hoot()+"eduallsinglestudenttransference/get/",
    Hoot()+"eduallsinglestudentapi/get/",
    Hoot()+"eduallgetsingleinstitute/get/1"
];


function StudentTransferReportPrint() {
    const [Total, setTotal] = useState([""]);   
    const containerPrint = useRef();
    const [data, setData] = useState([]);
    const [studentData, setStudentData] = useState([]);
    const [Loaded, setLoaded] = useState(false);
    const [InstituteData, setInstituteData] = useState([]);
    const [StudentPersonalInformation, setStudentPersonalInformation] = useState([]);
    const [Founded, SetFounded]  = useState(null);
    const [CurrentUserName, setCurrentUserName] = useState('');

    const CurrentDay = new Date().getMonth();
    const CurrentMonth = new Date().getDay();
    const CurrentYear = new Date().getFullYear();
    const CurrentDate = new Date().toLocaleString();

    const MonthOptions = ["Janeiro" , "Fevereiro", "Março",   "Abril",  "Maio",  "Junho", "Julho",  "Agosto", "Setembro", "Outubro", "Novembro",  "Dezembro"];
    const PaymentMethods = ["Dinheiro a mão", "Transferência", "Depósito"];


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

    const {id} = useParams(); 

  
    async function loadData(){
        const response = await axios.get(DATAURL[1]+`${id}`); 
        if(response.data.length >= 1){
           let dt = [response.data[0]]; 
             setData(dt);  
             const response2 = await axios.get(DATAURL[2]+`${response.data[0].ed_student_transference_code}`); 
               if(response2.data.length >= 1){
                   setStudentData(response2.data[0]);     
                    const response3 = await axios.get(DATAURL[3]); 
                    if(response3.data.length >= 1){
                        setInstituteData(response3.data[0]);
                        SetFounded(true);  
                        console.log(response3.data[0])  
                    }else{
                      SetFounded(false);  
                    }
             }else{
              SetFounded(false);  
             }
        }else{
          SetFounded(false);  
        } 
        console.log(data);
        setLoaded(true);  
    }


 
      useEffect(()=>{
          loadData(); 
          setTimeout(() => { 
             setTitleCode(CRValue("#doc-header-type"));
          }, 1000);
      },[]);



    const handlePrint = useReactToPrint({
        content:()=> containerPrint.current,
        documentTitle:'eduall_relatorio_de_transferencia_de_estudante'+'_'+Date.now()+RandomCodeGenerator(10),
        copyStyles:true
    });


    const HandlePrintDoc = ()=>{
        let paper = document.querySelectorAll(".PaperBox");
        for (let i = 0; i < paper.length; i++) {
             paper[i].classList.add("inputNoBorder");
        }
        handlePrint();
    }


    
     if(Loaded) { 
        if (Founded === true){
              let ST  = StudentPersonalInformation;  
              return (
                <div>
                <div className="eduall-print-area">
                   <div className="box"> 
                    <div className="print-enrollment-header">
                        <div className="ed-space">
                             <div className="ed-flex">
                                <button className="btn bg-main-light btn-icon-m0" onClick={HandlePrintDoc}><Print/> </button>
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
                                                <TitlesAndHeadersDataOptions code={3} />
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
                 <div ref={containerPrint} style={{width:'100%'}} >   
                           {
                            Total.map((item, index)=>{   
                                return(
                                    <section className={`paper-container`}  key={index}  >
                                    <div className="PaperBox pd2">
                                        <div className="enrollment-print-data student_transfer-document bordered"   key={index}> 
                                         <div className="b0">
                                            <div className="b1">
                                                <div className="b2">
                                                <div className="header-doc">
                                                    <div className="header-print"></div>
                                                        <div className="header-subtitle">
                                                           <div className="d3-text">
                                                               <h1>Declaração</h1>
                                                           </div>
                                                        </div>
                                                    </div> 
                                                    <div className="report-body"> 
                                                          <div className="std-trp-body">
                                                          <div contentEditable className="std-transference-edit">
                                                                <div className='mb-2'>
                                                                    Para os devidos efeitos, declara-se que: <span className='text-red'>{`Lukénia Carla Longiwa Viegas`} </span> 
                                                                    Filha de Maneco Carlos
                                                                    Viegas e de Albina Elinda Longiwa, nascida aos 12 de Novembro de 2009, 
                                                                    natural de Viana, Província de Luanda, Portadora do B.I nº 010182831LA043, 
                                                                    emitido aos 16/05/2019, passado pelo Arquivo de Registo Civil de Luanda.
                                                                </div>
                                                                <div className='mb-4'>
                                                                    Esteve nesta escola no Ano Lectivo de 2022-2023 a frequentar a <strong>7ª Classe</strong>, 
                                                                    na turma B, sob nº 20, tendo obtido, no Primeiro Trimestre,
                                                                    as seguintes classificações:
                                                                </div>
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
                                                            <div contentEditable className="mt-4">
                                                               <div className="mb-2">
                                                                  A presente Declaração destina-se para efeitos de Matrícula.
                                                               </div>
                                                               <div contentEditable>
                                                                    Por ser verdade e assim constar, passo a presente declaração que vai por 
                                                                    mim assinada  e autenticada com o carimbo a óleo em uso nesta instituição escolar.
                                                               </div>
                                                            </div>  
                                                            <div className="block-lines mt-4">
                                                                <ol>
                                                                    <li className="ed-flex">
                                                                          <span>Contas:</span>
                                                                          <div className="text">
                                                                              <span>#####</span>
                                                                          </div>
                                                                    </li>
                                                                    <li className="ed-flex">
                                                                          <span>Emolumento:</span>
                                                                          <div className="text">
                                                                              <span>#####</span>
                                                                          </div>
                                                                    </li>
                                                                    <li className="ed-flex">
                                                                          <span>Papel:</span>
                                                                          <div className="text">
                                                                              <span>#####</span>
                                                                          </div>
                                                                    </li>
                                                                    <li className="ed-flex">
                                                                          <span>Buscas:</span>
                                                                          <div className="text">
                                                                              <span>#####</span>
                                                                          </div>
                                                                    </li>
                                                                </ol>
                                                                <br />
                                                                <br />
                                                                <br />
                                                                <br />
                                                                <br />
                                                                <br />
                                                                <br />
                                                            </div>

                                                          </div>


                                                          <div className="asignature">
                                                            <div className="date">Viana, 08 de Maio de 2023</div>
                                                            <br /><br />
                                                              <div className="block">
                                                                    <div className="line"></div>
                                                                    <h4>Assinatura do(a) Diretor (a)</h4>
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

export default StudentTransferReportPrint
