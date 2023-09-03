import React, {useEffect, useState} from 'react'
import { Check, CheckBox, CheckBoxOutlineBlank, Done } from '@mui/icons-material' 
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Modal, Form, Button} from 'react-bootstrap'
import { Save } from '@mui/icons-material'; 
import axios from 'axios';
import Hoot from '../../../General/components/Hoot';
import ClearInputs from '../../../General/components/ClearInputs'; 
import {CourseDataOptions, AcademicYearDataOptions, ClassroomsDataOptions, CicleDataOptions, GetInstituteCode, AcademiclevelDataOptions, TitlesAndHeadersDataOptions, GetAcademiclevel_byclass, GetCourse_byclass} from '../../../General/components/InstituteData'; 
import {toast} from 'react-toastify'; 
import Logo from '../../../Assets/images/logos/alpega.png';
import { Print } from '@material-ui/icons';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import RandomCodeGenerator from '../../../General/components/RandomCodeGenerator';
import { useParams } from 'react-router-dom';
import Loader from '../../../General/components/Loader';
import NotFounded from '../../../General/components/NotFounded';
import BackButton from '../elements/BackButton';

function EnrollmentPrint() { 
    const EnrollmentsData = [""];  
    const containerPrint = useRef();
    const [Total, setTotal] = useState([""]);   
     const [data, setData] = useState([]);
    const [studentData, setStudentData] = useState([]);
    const [Loaded, setLoaded] = useState(false);
    const [InstituteData, setInstituteData] = useState([]);
    const [StudentPersonalInformation, setStudentPersonalInformation] = useState([]);
    const [StudentFatherData, SetStudentFatherData] = useState([]);
    const [StudentMotherData, SetStudentMotherData] = useState([]);
    const [StudentGuardionData, SetStudentGuardionData] = useState([]);
    const [Founded, SetFounded]  = useState(null);

    const CurrentDay = new Date().getMonth();
    const CurrentMonth = new Date().getDay();
    const CurrentYear = new Date().getFullYear();
    const CurrentDate = new Date().toLocaleString();

    const {id} = useParams(); 

    const DATAURL = [ 
        Hoot()+"eduallgetsingletitleandheader/get/",
        Hoot()+"eduallfeepaymentsingle/get/",
        Hoot()+"eduallsinglestudentapi/get/",
        Hoot()+"eduallgetsingleinstitute/get/1",
        Hoot()+"eduallparents/get"

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
              let ParentsData = [];

               if(response.data.length >= 1){
                   setStudentData(response.data[0]);     
                    const response2 = await axios.get(DATAURL[3]); 
                    if(response2.data.length >= 1){
                        setInstituteData(response2.data[0]); 

                       if(response.data[0].ed_student_enrolled*1 >= 1){
                       SetFounded(true);
                       }else{SetFounded(false);}  

                        const response3 = await axios.get(DATAURL[4]); 
                        if (response3.data.length >= 1){ 
                            response3.data.map((item, index)=>{   
                                if(item.ed_parent_students_code !== null){
                                    let students = item.ed_parent_students_code.split(',');  
            
                                    
                                    for(let i = 0; i < students.length; i++){
                                        if((students[i]*1) >= 0){ 
                                            if(Math.floor(students[i]) === Math.floor(id)){
                                                 let SH = item.ed_parent_name.split('')[0] + item.ed_parent_name.split('')[item.ed_parent_name.split('').length -1]
                                                  
                                                 if(item.ed_parent_guardion*1 === 1){
                                                    SetStudentGuardionData(item);
                                                 }else{ 
                                                   if(item.ed_parent_degree_of_kinship*1 === 0){
                                                       SetStudentMotherData(item);
                                                   }else if(item.ed_parent_degree_of_kinship*1 === 1){
                                                       SetStudentFatherData(item);   
                                                   }
                                                 }
                                                  


                                            }
                                        }
                                    }
            
                                   
                                   /// console.log(ParentsData);
                                    
                                }
                            })   
                        }  



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

         

 const ToggleCheckBox = (e)=>{
    e.target.classList.toggle("checked")   
 } 
 
        
 const Multiplicate = (e)=>{
    let Amount = [];
     for(let i = 0; i < e; i++) {
         Amount.push("");
    }
   setTotal(Amount); 
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
              let GDT = StudentGuardionData;
              let FDT = StudentFatherData;
              let MDT = StudentMotherData;


              console.log(ST)

              
                return (
                    <div>
                        <div className="print-enrollment-header">
                            <div className="ed-space">
                                <div className="ed-flex">
                                    <button className="btn bg-main-light btn-icon-m0" onClick={handlePrint}><Print/> </button>
                                    <Form.Group className='ml-2' > 
                                        <Form.Select  onChange={(e)=>Multiplicate(e.target.value)}  style={{maxWidth:'100px'}} >
                                            <option value="1">1X</option>
                                            <option value="2">2X</option>
                                            <option value="3">3X</option> 
                                            <option value="4">4X</option> 
                                            <option value="5">5X</option> 
                                            <option value="6">6X</option> 
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
                Total.map((item, index)=>{
                        return(
                            <section className={`paper-container  paper-container-${index}`}  key={index} >
                            <div className="PaperBox">
                                <div className="enrollment-print-data">
                                    <div className="header-doc">
                                    <div className="header-print"></div>
                                        <div className="header-subtitle">

                                        </div>
                                    </div>
                                    <div className='enrollment-and-confirmation-paper'>
                                    
                                        <div className="ed-space ed-space-header">
                                            <div className="block block-header "> 
                                                <aside className="col ed-flex fill">
                                                    <div className="label" style={{minWidth:'100px'}}>Inscreve-se na </div>
                                                    <div className="text">
                                                        <div className="text-content">
                                                           <div className="ed-flex">
                                                                <span className='str'> 
                                                                    <GetAcademiclevel_byclass ID={ST.ed_student_class}/> 
                                                                </span>
                                                                <span className="str"> 
                                                                    <div>  / <GetCourse_byclass  ID={ST.ed_student_class}/></div>
                                                                </span>
                                                           </div>
                                                        </div>
                                                    </div>
                                                </aside> 
                                                <aside className="col ed-flex fill mb0">
                                                    <div className="label" style={{minWidth:'36px'}}>Data </div>
                                                    <div className="text" style={{maxWidth:'150px'}}>
                                                        <div className="text-content">
                                                            <span className='str'>{CurrentDate}</span>
                                                        </div>
                                                    </div>
                                                </aside>
                                            </div>
                                        <div className="block-picture">
                                            <img loading="lazy" role="presentation" src={Hoot()+ST.ed_student_picture}  className={Image === null ? 'd-none' : ''}
                                             alt={ST.ed_student_name} />
                                        </div>
                                        </div>

                                        <div className="block-header-table">
                                            <div className="ed-space">
                                                <div className="ed-flex"><strong>Confirmação </strong><div className="checkbox ml-2"  ><div><Done/></div></div></div>
                                                <div className="ed-flex"><strong>Matrícula</strong><div className="checkbox ml-2"  ><div><Done/></div></div></div>
                                                  <div className="ed-flex"><strong>Nº de Matrícula</strong>
                                                    <div className="inputbox ml-2 mr-2">
                                                       <div>{ST.ed_student_id}</div>
                                                    </div>
                                                 </div>
                                            </div>
                                        </div>

                                        <aside className="col ed-flex fill">
                                            <div className="label" style={{minWidth:'70px'}}>Nome </div>
                                            <div className="text">
                                                <div className="text-content">
                                                    <span className='str ml-2'>{ST.ed_student_name}</span>
                                                </div>
                                            </div>
                                        </aside> 
                                        
                                        <aside className="col ed-flex wrap-3"> 
                                                <main className="bx ed-flex">
                                                    <div className="label" style={{minWidth:'80px'}}>Natural de </div>
                                                    <div className="text">
                                                        <div className="text-content">
                                                            <span className="str ml-2">{ST.ed_student_naturalness} </span>
                                                        </div>
                                                    </div>
                                                </main>
                                                <main className="bx ed-flex">
                                                    <div className="label" style={{minWidth:'100px'}}>, nascidos aos </div>
                                                    <div className="text">
                                                        <div className="text-content">
                                                            <span className="str ml-2"> {ST.ed_student_birthday}</span>
                                                        </div>
                                                    </div>
                                                </main>
                                                <main className="bx ed-flex">
                                                    <div className="label" style={{minWidth:'70px'}}>Morada</div>
                                                    <div className="text">
                                                        <div className="text-content">
                                                            <span className="str ml-2"> {ST.ed_student_address }</span>
                                                        </div>
                                                    </div>
                                                </main> 
                                        </aside>
                                        
                                        <aside className="col ed-flex wrap-2 hth"> 
                                            <main className="bx ed-flex">
                                                <div className="label" style={{minWidth:'230px'}}>Portador do Bilhete de identidade nº </div>
                                                <div className="text">
                                                    <div className="text-content">
                                                        <span className="str ml-2"> {ST.ed_student_identityCard} </span>
                                                    </div>
                                                </div>
                                            </main>
                                            <main className="bx ed-flex">
                                                <div className="label" style={{minWidth:'110px'}}>Nº de Telefone</div>
                                                <div className="text">
                                                    <div className="text-content">
                                                        <span className="str ml-2"> 
                                                             {ST.ed_student_phone !== "" && ST.ed_student_phone !== "####" ? ST.ed_student_phone  : '' }
                                                             {ST.ed_student_phone !== "" && ST.ed_student_phone !== "####" &&
                                                              ST.ed_student_phone2 !== "" && ST.ed_student_phone2 !== "####" ? ' / '  : '' }
                                                             {ST.ed_student_phone2 !== "" && ST.ed_student_phone2 !== "####" ? ST.ed_student_phone2  : '' }
                                                         </span>
                                                    </div>
                                                </div>
                                            </main> 
                                        </aside>

                                        <aside className="col ed-flex wrap-2 hthh"> 
                                            <main className="bx ed-flex">
                                                <div className="label" style={{minWidth:'150px'}}>Escola que frequentou </div>
                                                <div className="text">
                                                    <div className="text-content">
                                                        <span className="str ml-2"> {ST.ed_student_lastschool}  </span>
                                                    </div>
                                                </div>
                                            </main>
                                            <main className="bx ed-flex">
                                                <div className="label" style={{minWidth:'150px'}}>Classe que frequentou</div>
                                                <div className="text">
                                                    <div className="text-content">
                                                        <span className="str ml-2"> {ST.ed_student_lastclass}  </span>
                                                    </div>
                                                </div>
                                            </main> 
                                        </aside>

                                        <aside className="col ed-flex wrap-2 hth"> 
                                            <main className="bx ed-flex">
                                                <div className="label" style={{minWidth:'100px'}}>Nome do pai </div>
                                                <div className="text">
                                                    <div className="text-content">
                                                        <span className="str ml-2"> {FDT !== null ? FDT.ed_parent_name : ''} </span>
                                                    </div>
                                                </div>
                                            </main>
                                            <main className="bx ed-flex">
                                                <div className="label" style={{minWidth:'110px'}}>Nº de Telefone</div>
                                                <div className="text">
                                                    <div className="text-content">
                                                        <span className="str ml-2"> 
                                                           {FDT !== null ? FDT.ed_parent_phone : ''}  
                                                           {FDT !== null ? (FDT.ed_parent_phone2 !== "" ? " / ": '') : ''} 
                                                           {FDT !== null ? FDT.ed_parent_phone2 : ''}
                                                         </span>
                                                    </div>
                                                </div>
                                            </main> 
                                        </aside>

                                        <aside className="col ed-flex wrap-2 hth"> 
                                            <main className="bx ed-flex">
                                                <div className="label" style={{minWidth:'100px'}}>Nome da Mãe </div>
                                                <div className="text">
                                                    <div className="text-content">
                                                        <span className="str ml-2"> {MDT !== null ? MDT.ed_parent_name : ''} </span>
                                                    </div>
                                                </div>
                                            </main>
                                            <main className="bx ed-flex">
                                                <div className="label" style={{minWidth:'110px'}}>Nº de Telefone</div>
                                                <div className="text">
                                                    <div className="text-content">
                                                        <span className="str ml-2"> 
                                                           {MDT !== null ? MDT.ed_parent_phone : ''}  
                                                           {MDT !== null ? (MDT.ed_parent_phone2 !== "" ? " / ": '') : ''} 
                                                           {MDT !== null ? MDT.ed_parent_phone2 : ''}
                                                         </span>
                                                    </div>
                                                </div>
                                            </main> 
                                        </aside> 

                                        <aside className="col fill ed-flex">  
                                            <div className="label" style={{minWidth:'200px'}}>Encarregado(a) de Educação </div>
                                            <div className="text">
                                                <div className="text-content">
                                                    <span className="str ml-2">{GDT !== null ? GDT.ed_parent_name : ''}</span>
                                            </div>  
                                            </div>
                                        </aside>

                                        <aside className="col ed-flex wrap-2 hth"> 
                                            <main className="bx ed-flex">
                                                <div className="label" style={{minWidth:'80px'}} >Residência </div>
                                                <div className="text">
                                                    <div className="text-content">
                                                        <span className="str ml-2"> {GDT !== null ? GDT.ed_parent_address : ''} </span>
                                                    </div>
                                                </div>
                                            </main>
                                            <main className="bx ed-flex">
                                                <div className="label" style={{minWidth:'100px'}}>Nº de Telefone </div>
                                                <div className="text">
                                                    <div className="text-content">
                                                        <span className="str ml-2"> 
                                                          {GDT !== null ? GDT.ed_parent_phone : ''}  
                                                          {GDT !== null ? (GDT.ed_parent_phone2 !== "" ? " / ": '') : ''} 
                                                          {GDT !== null ? GDT.ed_parent_phone2 : ''}
                                                        </span>
                                                    </div>
                                                </div>
                                            </main> 
                                        </aside>

                                        <aside className="col ed-flex wrap-2 hth"> 
                                            <main className="bx ed-flex">
                                                <div className="label" style={{minWidth:'140px'}} >Doença que padece </div>
                                                <div className="text">
                                                    <div className="text-content">
                                                        <span className="str ml-2"> {} </span>
                                                    </div>
                                                </div>
                                            </main>
                                            <main className="bx ed-flex">
                                                <div className="label" style={{minWidth:'80px'}}>Alergico á </div>
                                                <div className="text">
                                                    <div className="text-content">
                                                        <span className="str ml-2"> {} </span>
                                                    </div>
                                                </div>
                                            </main> 
                                        </aside>


                                        <div className="ed-center mb-4">
                                            <h2 className='subtitle'>Documentos Entregues</h2>
                                        </div>

                                        <div className="ed-space delivered-files mb-4" style={{maxWidth:'550px'}}>
                                            <div className="block">
                                                <div className="el ed-space">
                                                    <span>Fotocopia do BI ou Cédula Pessoal</span>
                                                    <div className="checkbox" ><div><Done/></div></div>
                                                </div>
                                                <div className="el ed-space">
                                                    <span>Atestado Médico</span>
                                                    <div className="checkbox" ><div><Done/></div></div>
                                                </div>
                                                <div className="el ed-space">
                                                    <span>Declaração de Transferência </span>
                                                    <div className="checkbox" ><div><Done/></div></div>
                                                </div>
                                            </div>
                                            <div className="block ml-4">
                                            <div className="el ed-space">
                                                    <span>2 ou mais Fotografias tipo passe </span>
                                                    <div className="checkbox"  ><div><Done/></div></div>
                                                </div>
                                                <div className="el ed-space">
                                                    <span>Fotocopia Cartão de Vacina </span>
                                                    <div className="checkbox"  ><div><Done/></div></div>
                                                </div>
                                                <div className="el ed-space">
                                                    <span>Certificado da  Classe </span> 
                                                    <div className="checkbox" ><div><Done/></div></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-4 chcd">
                                        <div className="ed-wrap mt-4">
                                            <span>Declaração da :</span>
                                            <div className="ed-flex ml-2 mr-2">1ª <div className="checkbox" ><div><Done/></div></div></div>
                                            <div className="ed-flex ml-2 mr-2">2ª <div className="checkbox" ><div><Done/></div></div></div>
                                            <div className="ed-flex ml-2 mr-2">3ª <div className="checkbox" ><div><Done/></div></div></div>
                                            <div className="ed-flex ml-2 mr-2">4ª <div className="checkbox" ><div><Done/></div></div></div>
                                            <div className="ed-flex ml-2 mr-2">5ª <div className="checkbox" ><div><Done/></div></div></div>
                                            <div className="ed-flex ml-2 mr-2">6ª <div className="checkbox" ><div><Done/></div></div></div>
                                            <div className="ed-flex ml-2 mr-2">7ª <div className="checkbox" ><div><Done/></div></div></div>
                                            <div className="ed-flex ml-2 mr-2">8ª <div className="checkbox" ><div><Done/></div></div></div>
                                            <div className="ed-flex ml-2">9ª <div className="checkbox"  ><div><Done/></div></div></div>
                                            <div className="ed-wrap mt-2">
                                                <div className="ed-flex  mr-2">10ª <div className="checkbox"  ><div><Done/></div></div></div>
                                                <div className="ed-flex ml-2 mr-2">11ª <div className="checkbox"  ><div><Done/></div></div></div>
                                                <div className="ed-flex ml-2 mr-2">12ª <div className="checkbox" ><div><Done/></div></div></div>
                                                <div className="ed-flex ml-2 mr-2">13ª <div className="checkbox" ><div><Done/></div></div></div> 
                                            </div> 
                                        </div>
                                        </div> 
                                        <div className="doc-footer"> 
                                            <div className="asignature">
                                            <div className="ed-space"> 
                                                <div className="block">                                            
                                                        <h4>Encarregado(a) de Educação</h4><br />
                                                        <div className="line"></div>
                                                    </div>
                                                    <div className="block">                                            
                                                        <h4>O (A) Responsável</h4><br />
                                                        <div className="line"></div>
                                                    </div>
                                                </div>
                                                <div className="auth-info">
                                                     <div className='mt-2'>
                                                        <span>Processado por software eduallsys - Colégios  / Licenciado pela AGT Nº 1285</span></div>
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

export default EnrollmentPrint