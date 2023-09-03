import React, {useEffect, useRef, useState} from 'react'
import { Check } from '@mui/icons-material' 
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Modal, Form, Button, Table} from 'react-bootstrap'
import { Save } from '@mui/icons-material'; 
import axios from 'axios';
import Hoot from '../../../General/components/Hoot';
import {Link , useParams} from "react-router-dom";
import ClearInputs from '../../../General/components/ClearInputs'; 
import {CourseDataOptions, AcademicYearDataOptions, ClassroomsDataOptions, CicleDataOptions, GetInstituteCode, AcademiclevelDataOptions, TitlesAndHeadersDataOptions, GetClasstitle_byclass, GetAcademiclevel_byclass, GetPeriod_byclass, GetAcademicYear_byclass, GetClassroom_byclass, GetCourse_byclass, GetServiceTitle, GetServiceCointText, GetserviceCoin} from '../../../General/components/InstituteData'; 
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


const DATAURL = [ 
    Hoot()+"eduallgetsingletitleandheader/get/",
    Hoot()+"eduallfeepaymentsingle/get/",
    Hoot()+"eduallsinglestudentapi/get/",
    Hoot()+"eduallgetsingleinstitute/get/1"
];

function StudentTuitionPaymentPrintInvoice() {
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


 
        
    const Multiplicate = (e)=>{
      let Amount = [];
       for(let i = 0; i < e; i++) {
           Amount.push("");
      }
     setTotal(Amount); 
  }

    const {id} = useParams(); 

    const user = UserAccountData();  
    async function loadData(){
        const response = await axios.get(DATAURL[1]+`${id}`); 
        if(response.data.length >= 1){  
             setData([response.data[0]]);   
             const response2 = await axios.get(DATAURL[2]+`${response.data[0].ed_fee_payment_student}`); 
               if(response2.data.length >= 1){
                   setStudentData(response2.data[0]);     
                    const response3 = await axios.get(DATAURL[3]); 
                    if(response3.data.length >= 1){
                        setInstituteData(response3.data[0]);
                        SetFounded(true);   
                    }else{
                      SetFounded(false);  
                    }
             }else{
              SetFounded(false);  
             }
        }else{
          SetFounded(false);  
        }  
        setLoaded(true);  
    }


 
      useEffect(()=>{
          loadData();  
      },[]);



    const handlePrint = useReactToPrint({
        content:()=> containerPrint.current,
        documentTitle:'eduall_fatura_de_pagamento_de_propina'+'_'+Date.now()+RandomCodeGenerator(10),
        copyStyles:true
    });


    
 
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
                             <div>
                                 <BackButton />
                             </div>
                        </div>
                    </div>
                 <div ref={containerPrint} style={{width:'100%', height:window.innerHeight}} >   
                           {
                               <>
                                  {user.length > 0 ?  <>
                                    {(user[0] !== null) ?  <>
                                         {
                                          Total.map((item, index)=>{   
                                            return(
                                                <section className={`paper-container`}  key={index}  >
                                                <div className="PaperBox">
                                                    <div className="enrollment-print-data tuition-document"   key={index}> 
                                                    <div className="report-body"> 
                                                    <section className="student-tuition-payment-report-invoice"> 
                                                          <br />
                                                            <div className="ed-space tp">
                                                                <div className='space-end bl-box'>
                                                                <div className="itt-data">
                                                                    <div className="institute-logo"> 
                                                                        <img loading="lazy" role="presentation" src={Hoot()+InstituteData.ed_institute_logo} alt={InstituteData.ed_institute_name} /> 
                                                                    </div>
                                                                     <div className="block">
                                                                          <div className="ed-flex"><h3>{InstituteData.ed_institute_name}</h3></div>
                                                                          <div className="ed-flex">{InstituteData.ed_institute_address}  </div>
                                                                          <div className="ed-flex">Nº de Contribuinte: {InstituteData.ed_institute_nif}  </div> 
                                                                          <div className="ed-flex">Tel: {InstituteData.ed_institute_phone1} | {InstituteData.ed_institute_phone2} </div>
                                                                          <div className="ed-flex">E-mail: {InstituteData.ed_institute_email}</div>
                                                                     </div> 
                                                                </div>
                                                                <div className="block dtt"> 
                                                                    <div className="ed-flex"><strong className='mr-1'>Data de emissão :  </strong>{CurrentDate}</div>
                                                                    <div className="ed-flex"><strong className='mr-1'>Data de pagamento : </strong>{}</div>
                                                                    <div className="ed-flex"><strong className='mr-1'>Ano lectivo : </strong> <GetAcademicYear_byclass ID={studentData.ed_student_class} />  </div>
                                                                    <div className="ed-flex"><strong className='mr-1'>Operador : </strong>{user[0][0].USER_INFORMATION.ed_user_account_name} </div>
                                                                 </div>
                                                                </div>
                                                               <div className='bl-box' >
                                                                   <br /><br /><br/><br /><br/>
                                                                   <div className="std-data">
                                                                     <div className="std-data-header">Dados do aluno</div>
                                                                     <ul>
                                                                        <li><strong>Nome :</strong> {studentData.ed_student_name } </li>
                                                                        <li><strong>Nº : </strong> {studentData.ed_student_id } </li>
                                                                        <li><strong>Turma : </strong> <GetClasstitle_byclass ID={studentData.ed_student_class}/></li>
                                                                        <li><strong>Sala : </strong> <GetClassroom_byclass ID={studentData.ed_student_class } /></li>
                                                                        <li><strong>Curso : </strong> <GetCourse_byclass ID={studentData.ed_student_class}/></li> 
                                                                     </ul>
                                                                  </div>
                                                               </div>
                                                            </div>
                                                            <div className="table-data">
                                                             <Table striped bordered hover>
                                                                <thead>
                                                                  <tr>
                                                                    <th>Nº</th>
                                                                    <th>Cod</th>
                                                                    <th>Descrição</th>
                                                                    <th>Qtd</th>
                                                                    <th>Val.Unit</th>
                                                                    <th>Taxa / Valor</th>
                                                                    <th>IVA</th>
                                                                    <th>Desc</th>
                                                                    <th>Val. Total</th>
                                                                  </tr>
                                                                </thead>
                                                                <tbody> 
                                                                   {
                                                                    data.map((DT, index)=>{
                                                                      return (
                                                                        <tr key={index}>
                                                                          <td>{index+1}</td> 
                                                                            <td>{DT.ed_fee_payment_id}</td> 
                                                                            <td>
                                                                            Propina
                                                                            {" de " + MonthOptions[DT.ed_fee_payment_month.split('.')[0]*1]  +" de " }
                                                                            {DT.ed_fee_payment_month.split('.')[1]}
                                                                            </td> 
                                                                            <td>1 </td>  
                                                                            <td>
                                                                              <div className="ed-flex">
                                                                                {NumberToPrice(DT.ed_fee_payment_price*1) + " "+ " "} <GetserviceCoin ID={DT.ed_fee_payment_service} />   
                                                                              </div>  
                                                                            </td> 
                                                                            <td>
                                                                            {
                                                                              DT.ed_fee_payment_fineType*1 === 1 ?
                                                                                <div className='ed-flex'> 
                                                                                  {NumberToPrice(DT.ed_fee_payment_fineValue)+" "}  <GetserviceCoin ID={DT.ed_fee_payment_service} /> 
                                                                                </div>
                                                                                : 
                                                                              DT.ed_fee_payment_fineValue+'%'
                                                                            }
                                                                            </td> 
                                                                            <td>
                                                                                 {(DT.ed_fee_payment_iva*1 <= 0 ? 0 : DT.ed_fee_payment_iva)}%
                                                                            </td>
                                                                            <td>{DT.ed_fee_payment_discount}%</td>  
                                                                            <td> 
                                                                              <div className="ed-flex">
                                                                              {
                                                                               NumberToPrice(
                                                                                (  DT.ed_fee_payment_price*1 -  ((DT.ed_fee_payment_price * DT.ed_fee_payment_discount) / 100)  + 
                
                                                                                (DT.ed_fee_payment_iva*1 <= 0 ? 0 : ((DT.ed_fee_payment_price  * DT.ed_fee_payment_iva)  / 100)) + 
                  
                                                                                (
                                                                                DT.ed_fee_payment_fineType*1 === 1 ? 
                                                                                    DT.ed_fee_payment_fineValue*1  
                                                                                    :  
                                                                                ((DT.ed_fee_payment_price*1 * DT.ed_fee_payment_fineValue*1) / 100)
                                                                                ))
                                                                               )
                                                                              }  
                                                                              {" "+" "}
                                                                                <GetserviceCoin ID={DT.ed_fee_payment_service} /> 
                                                                              </div>
                                                                          </td> 
                                                                        </tr> 
                                                                      )
                                                                    }) 
                                                                   } 
                                                                </tbody>
                                                                </Table>
                                                            </div>  
                                                            <div className="ed-space std-footer">
                                                                <div className="block  lg-table">
                                                                  <Table className='m-0' bordered>
                                                                    <thead>
                                                                        <tr>
                                                                          <th>Modo de Pagamento</th>
                                                                          <th>Banco</th>
                                                                          <th>Nº de Referência</th> 
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>{PaymentMethods[data[0].ed_fee_payment_type] }</td>
                                                                            <td>{data[0].ed_fee_payment_type*1 !== 0 ? data[0].ed_fee_payment_bank : ''}</td>
                                                                            <td>{data[0].ed_fee_payment_type*1 !== 0 ? data[0].ed_fee_payment_bordereux :'' } </td> 
                                                                        </tr> 
                                                                     </tbody>
                                                                  </Table>
                                                                
                                                                <div className="mt-2">
                                                                   <strong>Resumo imposto</strong>
                                                                </div>
                                                              
                                                                 <div className="mt-2">
                                                                 <Table className='m-0' bordered>
                                                                    <thead>
                                                                        <tr>
                                                                          <th>Taxa / Valor</th>
                                                                          <th>Incidéncia / Qdd</th>
                                                                          <th>Total</th>
                                                                          <th>Motivo</th> 
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>IVA {"("+  data[0].ed_fee_payment_iva +"%)"} </td>
                                                                            <td> 
                                                                             <div className="ed-flex">
                                                                              { NumberToPrice(data[0].ed_fee_payment_price*1 ) }  
                                                                              {" "+" "}
                                                                                <GetserviceCoin ID={data[0].ed_fee_payment_service} /> 
                                                                              </div> 
                                                                            </td>
                                                                            <td> 
                                                                              <div className="ed-flex">
                                                                              {
                                                                              NumberToPrice(( data[0].ed_fee_payment_price*1  +  
                                                                                (data[0].ed_fee_payment_iva*1 <= 0 ? 0 : ((data[0].ed_fee_payment_price  * data[0].ed_fee_payment_iva)  / 100)))) 
                                                                              }  
                                                                              {" "+" "}
                                                                                <GetserviceCoin ID={data[0].ed_fee_payment_service} /> 
                                                                              </div>  
                                                                            </td>
                                                                            <td></td>
                                                                        </tr> 
                                                                     </tbody>
                                                                  </Table>
                                                                  <div className="mt-1" style={{minHeight:'80px', maxWidth:'500px'}}>
                                                                      <div className='ed-wrap'> 
                                                                         <small className='d-none'>
                                                                           <span><strong className='mr-1'>Obs : </strong>  
                                                                              {
                                                                                data.map((item, index)=>{
                                                                                  return(
                                                                                    <span key={index} className='mr-1'><strong>{index+1})- </strong>
                                                                                       {item.ed_fee_payment_type*1 === 0 ? PaymentMethods[item.ed_fee_payment_type*1]  : ''} 
                                                                                       {item.ed_fee_payment_type*1 !== 0 ? 
                                                                                           (item.ed_fee_payment_bank +" "+  PaymentMethods[item.ed_fee_payment_type*1])  
                                                                                       : ''} 
                                                                                       ({item.ed_fee_payment_price} <GetserviceCoin ID={item.ed_fee_payment_service} />)  
                                                                                    </span> 
                                                                                  )
                                                                                })
                                                                              } 
                                                                            </span>
                                                                         </small>
                                                                      </div>
                                                                  </div>
                                                                 </div>
                                                                </div>
                                                                <div className="block sm-table">
                                                                <Table >
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Resumo</th> 
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>
                                                                             <div className="ed-space">
                                                                                <div><strong>Subtotal:</strong></div>
                                                                                <div><strong> <div className="ed-flex">
                                                                                    {
                                                                                      NumberToPrice(data[0].ed_fee_payment_price*1)
                                                                                    }  
                                                                                   {" "+" "}
                                                                                    <GetserviceCoin ID={data[0].ed_fee_payment_service} /> 
                                                                                </div>
                                                                                </strong></div>
                                                                            </div> 
                                                                          </td>
                                                                        </tr> 
                                                                        <tr>
                                                                            <td>
                                                                             <div className="ed-space">
                                                                                <div>Desc:</div>
                                                                                <div>{data[0].ed_fee_payment_discount}% </div>
                                                                            </div> 
                                                                          </td>
                                                                        </tr> 
                                                                        <tr>
                                                                            <td>
                                                                             <div className="ed-space">
                                                                                <div>IVA:</div>
                                                                                <div>{data[0].ed_fee_payment_iva}%</div>
                                                                            </div> 
                                                                          </td>
                                                                        </tr> 
                                                                        <tr>
                                                                            <td>
                                                                             <div className="ed-space">
                                                                                <div>Valor Entrege:</div>
                                                                                <div>0,00</div>
                                                                            </div> 
                                                                          </td>
                                                                        </tr> 
                                                                        <tr>
                                                                            <td>
                                                                             <div className="ed-space">
                                                                                <div>Troco:</div>
                                                                                <div>0,00</div>
                                                                            </div> 
                                                                          </td>
                                                                        </tr> 
                                                                        <tr>
                                                                            <td>
                                                                             <div className="ed-space">
                                                                                <div><strong>Total:</strong></div>
                                                                                <div><strong>
                                                                                  {<div className="ed-flex">
                                                                                    {
                                                                                    NumberToPrice(( data[0].ed_fee_payment_price*1 -  ((data[0].ed_fee_payment_price * data[0].ed_fee_payment_discount) / 100)  + 
                      
                                                                                    (data[0].ed_fee_payment_iva*1 <= 0 ? 0 : ((data[0].ed_fee_payment_price  * data[0].ed_fee_payment_iva)  / 100)) + 
                      
                                                                                    (
                                                                                      data[0].ed_fee_payment_fineType*1 === 1 ? 
                                                                                       data[0].ed_fee_payment_fineValue*1  
                                                                                        :  
                                                                                    ((data[0].ed_fee_payment_price*1 * data[0].ed_fee_payment_fineValue*1) / 100)
                                                                                    ))) 
                                                                                    }  
                                                                                    {" "+" "}
                                                                                    <GetserviceCoin ID={data[0].ed_fee_payment_service} /> 
                                                                              </div>} 
                                                                              </strong></div>
                                                                            </div> 
                                                                          </td>
                                                                        </tr>  
                                                                    </tbody>
                                                                </Table>  
                                                                </div>
                                                            </div>
                                                            <div className="institute-bank-data">
                                                              <div className={data.length >= 9 ? "mt-4" : "mt-2"}>
                                                              <h2>Cordenadas Bancárias</h2>
                                                                <div className="ed-flex"><strong className='mr-1'><small>Banco :</small></strong><small>{InstituteData.ed_institute_bank1}</small></div>
                                                                <div className="ed-flex"><strong className='mr-1'><small>Beneficiario :</small></strong><small>{InstituteData.ed_institute_bank1_recipient}</small></div>
                                                                <div className="ed-flex"><strong className='mr-1'><small><small>Nº de Conta :</small></small></strong><small>{InstituteData.ed_institute_bank1_account_number}</small> </div>
                                                              </div>
                                                            </div>
                                                            <div className="auth-info"> 
                                                                 <span className={data.length >= 9 ? "mt-0" : "mt-0"}>Processado por software eduallsys - Colégios  / Licenciado pela AGT Nº 1285</span> 
                                                            </div>
                                                      </section>
                                                    </div>
                                                </div>
                                                </div> 
                                              </section>  
                                            )
                                          })
                                         } 
                                     </> : <></>}
                                  </>  : <></>  }

                                   


                               </>



                             
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

export default StudentTuitionPaymentPrintInvoice