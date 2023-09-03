import React, {useEffect, useRef, useState} from 'react'
import styled from 'styled-components'
import {Button, Form, OverlayTrigger, Popover } from 'react-bootstrap'
import { Delete, InfoOutlined, Refresh, Search } from '@mui/icons-material';
import FileUpload from '../../../General/components/FileUpload';
import { Alert, Avatar, Checkbox, FormControlLabel } from '@mui/material'; 
import { Link } from 'react-router-dom';
import SmallStudentsGrid from '../../components/Grid/SmallStudentsGrid';
import FeespaymentsTable from '../../components/Table/FeespaymentsTable';
import NewfeeManualPaymentModal from '../../components/modal/NewfeeManualPaymentModal';
import {GetClassroom_byclass, GetClasstitle_byclass, GetCourse_byclass, GetPeriod_byclass,  ClassDataOptions, CourseDataOptions, GetAcademiclevel_byclass, GetInstituteCode, GetAcademicYear_byclass, GetAcademicYearcode_byclass, AcademicYearDataOptions } from '../../../General/components/InstituteData';
import axios from 'axios';
import Hoot from '../../../General/components/Hoot';
import AnimationPage from '../../../General/AnimationPage';
import EmptyImage from '../../../Assets/images/svg/personal_info.svg';
import SwitchFromPages from '../../../General/components/SwitchFromPages';
import KeyShortcut from '../../../General/components/KeyShortcut';
import Loader from '../../../General/components/Loader';
import KeyDownEvent from '../../../General/components/KeyDownEvent';
import StudentDetailsMenu from '../../components/elements/StudentDetailsMenu';
import DeleteModal from '../../components/elements/DeleteModal';
import NotFounded from '../../../General/components/NotFounded';
import { FixedSizeList as List } from "react-window";
import KeyboardEventHandler from 'react-keyboard-event-handler';


function FeesPayments() {
  document.title = "Pagar Propinas"; 
  const [StudentClass , setStudentClass] = useState('#'); 
  const [StudentName , setStudentName] = useState('#');
  const [StudentPicture , setStudentPicture] = useState('#'); 
  const [StudentId , setStudentId] = useState('#'); 
  const [AcademicYear, setAcademicyear] = useState(null);
  const [ShowMonths, setShowMonths] = useState(false);
  const [StudentClassFilter, setStudentClassFilter] = useState(null);
  const [StudentNameFilter, setStudentNameFilter] = useState(null);
  const [PopStatus, setPopStatus] =  useState(false);
  const [MP, SM] = useState([]); 
  const [Founded, setFounded] = useState('');
  const ChildRef = useRef();
 

 const getAcademicYear = (e)=>{
     setAcademicyear(e*1);   
 }


 let DfStudentCode = 0;
 let month = new Date().getMonth()
 let currentMonth = month+1 <= 12 ? month+1 : month; 
 let Months = [];
 const CY =  new Date().getFullYear(); 

 const FORMURL = [
    Hoot()+"eduallsinglestudentfeepayment/get/",
    Hoot()+"eduallsinglestudentapi/get/",
    Hoot()+"eduallsingleserviceapi/get/",
    Hoot()+"eduallsingleacademicyearapi/get/",
    Hoot()+"eduallfeepaymentcheckpaidmonth/",
 ]; 

 
  const GetPaymentData = (studentCode, Academic_year)=>{  
  const MonthsList = ["Janeiro", "Fevereiro", "Março",
    "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro",
    "Outubro", "Novembro", "Dezembro"]  
    setFounded(null); 
    setTimeout(() => { 
        if (studentCode !== null) {
            DfStudentCode = studentCode; 
           async function CheckStudentPayment(){ 
                try {
                                    
                const [AcademicYearData, response1, response] = await  Promise.all([
                    axios.get( FORMURL[3]+Academic_year),
                    axios.get(FORMURL[1]+`${studentCode}`),
                    axios.get(FORMURL[0]+`${studentCode}`+","+`${Academic_year}`)
                ]);
                if (AcademicYearData.data.length >= 1){
                    let CurrentAcademicYearData = AcademicYearData.data[0]; 

                    /// start getting the academic year data 
                    let M1, M2 = null;
                    let Y1, Y2 = null; 
                    let currentYear = new Date().getFullYear();
                    M1 = CurrentAcademicYearData.ed_academic_year_startDate.split('-')[1]*1;
                    M2 = CurrentAcademicYearData.ed_academic_year_endDate.split('-')[1]*1;
                    Y1 = CurrentAcademicYearData.ed_academic_year_startDate.split('-')[0]*1;
                    Y2 = CurrentAcademicYearData.ed_academic_year_endDate.split('-')[0]*1;
                    

                    let CRY = Y2 - Y1 === 1 ? 1 : 0;
                    let DF = 12;   
                
                    if(M2 === 0 || M2 === null || M1 === 0 || M1 === null) return false;    
                      if (Y2 - Y1 <= 1) {
                         

                        if (CRY === 1){ 
                            if((M2*1) <= (M1*1)){ 
                            let CurrentMonths = [];
                            let EX = 0; 
                            let R = (DF - (M1*1) === 0 ? 1 : DF- (M1*1)) + (M2*1);
                            EX = R > DF ? R - DF : null;  
                            
                            
                            for(let i = (M1-1)+1; i <= 12; i++){   
                                    CurrentMonths.push({month:(MonthsList[i-1]  + " de "+ Y1)  ,status:'other', code:((i-1+"."+ Y1)*1)})
                                }
                        
                                if(EX !== 0 && EX !== null){
                                    for (let i = 0; i <= (EX -1); i++) { 
                                        CurrentMonths.push({month:(MonthsList[i-1] + " de "+ Y2)  ,status:'other', code:((i-1 +"."+ Y2)*1)})
                                    }
                                }   
                        
                                for(let i = 0; i <= (M2-1); i++) {  
                                    CurrentMonths.push({month:(MonthsList[i]  + " de "+ Y2)  ,status:'other', code:((i+"."+Y2)*1)  })
                                }   
                            
                        
                            Months = CurrentMonths; 
                        
                            }else{ 
                             let CurrentMonths = [];
                            let EX = M1 === M2 ? M2 : (M1 - M2 < 0 ? M2 : M1 - M2);
                            let DM = DF - M1;  
                        
                            
                            for(let i = (M1*1); i <= DF; i++) { 
                                CurrentMonths.push({month:(MonthsList[i-1]  + " de "+ Y1)  ,status:'other', code: ((i-1+"."+ Y1)*1)  })
                            }
                            
                        
                            if(EX >= 1){ 
                            for(let i = 1; i <= EX; i++) { 
                                CurrentMonths.push({month:(MonthsList[i-1]  + " de "+ Y2)  ,status:'other', code: ((i-1+ "."+ Y2)*1)  })
                            }
                            } 
                              Months = CurrentMonths;  
                            } 
                    
                        }else{
                        let CurrentMonths = []; 
                        CurrentMonths.push({month:(MonthsList[(M1*1)-1]  + " de "+ Y1)  ,status:'other', code: ((((M1*1)-1)+"."+Y1)*1)     })
                        
                        if(M2 !== null){
                            for(let i = (M1*1)+1; i <= M2; i++) { 
                            CurrentMonths.push({month:(MonthsList[i-1]  + " de "+ Y1) ,status:'other', code: (((i-1)+"."+Y1)*1)})
                          }
                        }   

                        console.log("Senario n 3");

                          Months = CurrentMonths;  
                        }  
 
                    
                        /// end 

                        /*** ADDING PAYMENT STATUS */
                        if(Months.length >= 1){   
                            let  Months1 = Months;
                              
                             const StudentData = async()=>{ 
                                   if (response1.data.length >= 1) {  
                                       setStudentName(response1.data[0].ed_student_name);
                                       setStudentClass(response1.data[0].ed_student_class);
                                       setStudentPicture(response1.data[0].ed_student_picture); 
                                       setStudentId(response1.data[0].ed_student_id);  
                                   }
                               }  
                               StudentData();  
                              
        
                                
                               setTimeout(() => {  

                                       const ServiceData = async()=>{  
                                           let paidMonths = []

                                           if (response.data.length >= 1) {   
                                               for(let i = 0; i < response.data.length; i++) {
                                               const e = response.data[i];
                                               if(e.ed_fee_payment_month !== ""){   
                                                   for (let a = 0; a <  Months1.length; a++) {
                                                    if((Months1[a].code*1) === (e.ed_fee_payment_month*1)){
                                                        let thisMonthYear =  Months1[a].month.split(" ")[2]*1;
                                                        Months1[a].status = "paid"   
                                                        paidMonths.push(Months1[a].code*1);  
                                                        console.log("Case 0 = "+thisMonthYear + " | "+currentYear);

                                                    }else{  

                                                       if((Months1[a].code*1) < (((currentMonth-1)+"."+CY)*1) && Months1[a].status !== 'paid'){  
                                                            let thisMonthYear =  Months1[a].month.split(" ")[2]*1;
                                                            if(thisMonthYear <= currentYear) { 
                                                                Months1[a].status = "notpaid"; 
                                                            };   
                                                            console.log("Case 1= "+thisMonthYear + " | "+currentYear);
                                                       } else{

                                                         if (Y2 - Y1 === 0 ) { 
                                                            let thisMonthYear =  Months1[a].month.split(" ")[2]*1;
                                                            if(thisMonthYear <= currentYear) { 
                                                                if(Months1[a].status !== 'paid') Months1[a].status = "notpaid"; 
                                                            };  
                                                            console.log("Case 2= "+thisMonthYear + " | "+currentYear);
                                                         } 

                                                       } 
                                                    } 
                                                   }  
                                               } 
                                           }  
 
        
                                       
                                           for(let i = 0; i <= paidMonths.length; i++){
                                               for(let p = 0; p <= Months1.length; p++){  
                                                if (Months1[i].code !== paidMonths[p]){ 
                                                    if(Months1[i].code < (((currentMonth-1)+"."+CY)*1) && Months1[i].status !== 'paid'){  
                                                         let thisMonthYear =  Months1[i].month.split(" ")[2]*1;
                                                         if(thisMonthYear <= currentYear)  Months1[i].status = "notpaid";  
                                                         console.log("Case 3 = "+thisMonthYear + " | "+currentYear);
                                                    }
                                                  }  
                                               }
                                              }   
                                           }
 
        
                                          if(paidMonths.length === 0){ 
                                            let x = null;
                                           for (let i = 0; i < Months1.length; i++) {
                                                  if(Months1[i].code === (((currentMonth-1)+"."+CY)*1)){  
                                                      x = i;
                                                      if(i >=  x){
                                                           Months1[i].status = "other"; 
                                                      }
                                                   } else{
                                                    if(x !== null){
                                                       if(i > x) {
                                                          Months1[i].status = "other"; 
                                                       }
                                                    }else{ 
                                                        let thisMonthYear =  Months1[i].month.split(" ")[2]*1;
                                                        if(thisMonthYear <= currentYear)  Months1[i].status = "notpaid";  
                                                        console.log("Case 4 = "+thisMonthYear + " | "+currentYear);
                                                    }
                                                   } 
                                               }
                                          }
 
                                         SM(Months1);
                                         setShowMonths(true);    
                                         if(Months1.length >= 1){setFounded(true)}else{setFounded(false);} 

                                    }  
                                   ServiceData();
                              }, 100); 
                                          
                        }
                        // END 
                    }   
                }  
                } catch (error) {
                    setFounded(false)
                } 
            }
            CheckStudentPayment();
        } 
    }, 10); 
  }


 
  const FilterData = (a, e)=>{  
     a === 1 ?  setStudentNameFilter(e.target.value) : setStudentClassFilter(e.target.value);
     ChildRef.current.ChangeFilter(a === 1 ? 1 : 0);
  }

 
     
  const handleKeys = (e)=>{ 
    switch (e) { 
       case "a":
         
        break;
        case "p":
          setPopStatus(true);
        break;  
        default:
    }
 }

  return (
    <div className='feespayments'>
        <KeyboardEventHandler handleKeys={['p']}  onKeyEvent={(key, e) => handleKeys(key)} />
        <div className="ed-space mb-3">
            <div className="ed-block">
            <Form>
                <div className="search-box boxItem">
                <Form.Group>
                    <div className="ed-flex m0 fill">
                    <Search/>
                        <div className="block col  ml-2"> 
                            <Form.Control  type="text" onChange={(e)=>FilterData(1, e)}  placeholder="Escreva qualquer coisa"  autoFocus /> 
                        </div> 
                    </div> 
                </Form.Group> 
                </div>
            </Form>
            </div>
            <div className="ed-flex">
                <NewfeeManualPaymentModal pop={PopStatus}  />
            </div>
        </div>
        <div className="ed-flex" style={{alignItems:'flex-start'}}>
            <FilterBox className='filterBox'>
                <Box className='boxItem'>
                    <div className="title">Selecione um aluno</div>
                    <Container> 
                         <SmallStudentsGrid ref={ChildRef}  FilterByName={StudentNameFilter} 
                         FilterByClass={StudentClassFilter} GetData={GetPaymentData} /> 
                    </Container>
                </Box>
        </FilterBox> 
            <Box className='ml-2 boxItem'>
                {
                Founded === '' ?
                <div className='empty-search'><img loading="lazy" role="presentation" src={EmptyImage} alt="selecione um estudante" /> </div>
                : 
                    <>
                        {
                        Founded === null ? 
                            <LoaderContainer>
                                 <Loader absolute small /> 
                            </LoaderContainer>
                        :   
                        <>
                            {  
                                Founded === false ?
                                    <>
                                      <NotFounded/>
                                    </> 
                                    :

                                <>
                                <div className="ed-space">
                                    <div className="ed-flex mb-4">
                                        <li className="ed-flex ex"><div className="dot success"></div> Pago</li> 
                                        <li className="ed-flex ex"><div className="dot warning"></div>Não pago</li>
                                        <li className="ed-flex ex"><div className="dot other"></div> Outras</li>
                                    </div> 
                                    <div className="ed-flex  " style={{marginRight:'10px'}}>
                                        {(StudentId !== "#" & StudentId !== null) ? <StudentDetailsMenu student_id={StudentId}  toggle_btn={<div className='btn-pm-info'><InfoOutlined /></div>} /> : <></>}
                                    </div>
                                </div>
                                    <div className='d-none'><GetAcademicYearcode_byclass ID={StudentClass}  YearCode={getAcademicYear} /> </div> 
                                    <div className="ed-flex"> 
                                    <SwitchFromPages link={`studentinfo/${StudentId}`}
                                        menu='3'  menu_item='17'  toggle_btn={
                                            <Link to="#"><Avatar alt={StudentName}  className='df' 
                                            src={StudentPicture != "#"  ?  Hoot()+ StudentPicture  : ""} sx={{ width: 106, height: 106 }}/></Link>
                                        } /> 
                                    <div className="d-block ml-2 description"> 
                                    <SwitchFromPages link={`studentinfo/${StudentId}`}
                                        menu='3'  menu_item='17'  toggle_btn={ <h5 className='name '>Nome : <Link to="#" 
                                        className='text-main-light label-student-name'> {StudentName} </Link></h5>
                                        } /> 
                                        <h5>Turma : <Link to='#' className='text-main-light label-student-class'> <GetClasstitle_byclass ID={StudentClass} />  </Link></h5>
                                    </div>
                                </div>
                                <div className="ed-wrap mt-4 description"> 
                                        <h5>Ano academico : <Link to='#' className='text-main-light label-student-level'><GetAcademicYear_byclass ID={StudentClass} /></Link> </h5>
                                        <h5 className='ml-2'>Classe : <Link to='#' className='text-main-light label-student-level'><GetAcademiclevel_byclass ID={StudentClass} /></Link> </h5>
                                        <h5 className='ml-2'>Sala : <Link to='#' className='text-main-light label-student-classroom'> {<GetClassroom_byclass ID={StudentClass} />} </Link></h5>
                                    </div>
                                    <div className="ed-wrap mt-2 description">
                                        <h5>Curso : <Link to='#' className='text-main-light label-student-class'><GetCourse_byclass ID={StudentClass} /></Link></h5>
                                        <h5 className='ml-2'>Periodo : <Link to='#' className='text-main-light label-student-class'><GetPeriod_byclass ID={StudentClass} /> </Link></h5>
                                    </div>  
                                    <h2>Propinas pagas</h2>
                                    <div className="wrap wrap-scroll"> 
                                        {
                                            ShowMonths === true ?
                                            MP.map((item, index)=>{
                                                return(<> 
                                                <OverlayTrigger trigger="clickl" placement="top" overlay={
                                                    <Popover id="popover-basic">
                                                        <Popover.Header  className='bg-black text-light' as="h5">Propina de {item.month}</Popover.Header>
                                                        <Popover.Body> 
                                                                {item.status === "notpaid"   ?   
                                                                    <div className="ed-flex ed-center col">
                                                                        <NewfeeManualPaymentModal toggle_btn={<Button className='btn-small bg-main-light fill-btn'>Pagar</Button>}
                                                                        title='Atualizar ' update='true' get={Hoot()+`eduallfeepaymentsingle/get/ `}  
                                                                        url={Hoot()+`eduallfeepaymentupdate/update/ `}
                                                                        />   
                                                                    </div>   
                                                                    :<></>
                                                                    } 
                                                                    {item.status === "paid"   ?   
                                                                    <div className="ed-flex">
                                                                        <NewfeeManualPaymentModal  toggle_btn={<Button className='btn-small bg-main-light ed-flex'><Refresh/><div className="ml-1">Atualizar</div></Button>}
                                                                        
                                                                        /> 
                                                                        <DeleteModal title='um pagamento de propina' url={Hoot()+`eduallfeepaymentsdelete/delete/`} 
                                                                        message='Pagamento deletado com sucesso' toggle_btn={
                                                                            <Button className="bg-danger ed-flex btn-small ml-2 text-light">
                                                                                <Delete/><div className="ml-1">Anular</div>
                                                                            </Button>
                                                                        } /> 
                                                                        </div>   
                                                                    :<></>
                                                                    }
                                                                    {item.status === "other"   ?   
                                                                    <div className="ed-flex col">
                                                                        <NewfeeManualPaymentModal  toggle_btn={<Button className='btn-small bg-main-light fill-btn'>Pagar</Button>}
                                                                        /> 
                                                                    </div>   
                                                                    :<></>
                                                                    } 
                                                        </Popover.Body>
                                                    </Popover>
                                                    }>  
                                                    <div className={item.status === '' ? 'month' : `month ${item.status}`}  key={index}>{item.month}</div>
                                                </OverlayTrigger> 
                                                </>)
                                            })
                                            :
                                        ''}
                                    </div>
                                </>   
                            }
                        </>
                        
                        }
                    </>  
                }
            </Box> 
        </div>
        <div className="mt-4">
            <FeespaymentsTable/>
        </div>
    </div>
  )
}

const FilterBox = styled.div`
  max-width:400px;
  min-width:400px;
  
  .title{
    font-weight: 600;
    font-size: 18px;
    margin-bottom:10px;
  }

`;

const Box = styled.div`
    width:100%; 
    border-radius:6px;   
    padding:20px;
    min-height:520px;
    height:auto;
    background:var(--ed-white);  
    box-shadow:var(--ed-shadow-df);
    margin:10px 0;
    position:relative;
    overflow:hidden;

    .ed-flex.col div,
    .ed-flex.col div div{
         width:100% !important; 
         border:2px solid gold !important;
    }

    .wrap-scroll{
         overflow-y:auto;
         max-height:180px;
         padding-right:20px;
         padding-left:10px; 
         margin-left:-10px;
    

         &::-webkit-scrollbar{
            width:6px !important;
            background-color:transparent !important;
        }
         
         &::-webkit-scrollbar-thumb{
            background:rgb(219, 219, 219) !important; 
        }
    }

    .empty-search{
         display:flex;
         align-items:center;
         justify-content:center;
         height:100%;
         min-height:440px; 

         img{
              max-width:600px;
              max-height:300px;
         }
    }

    @media screen and (max-width:1290px){ 
        width:auto;
        min-width:50%;
        min-height:550px; 
    }

    .ex{
        font-size:16px;
        margin-top:8px;
        margin-right:25px;

        .dot{
            width:20px;
            height:20px;
            border-radius:100%;
            margin-right:10px;
            border:3px solid var(--ed-white);
            box-shadow:var(--ed-shadow-df);
        }

        .dot.warning{
            background:#FFBD00;
        }

        .dot.success{
            background:#52B69A;
        }

        .dot.other{
            background:#CED4DA;
        }
    }



    .description{
        .name{
            font-size:18px;
            margin-bottom:15px;
            margin-top:10px;
        }

        h5{
            font-size:16px;
        }
    }

    h2{
        margin:10px 0;
        font-size:18px;
        font-weight:600;
    }
`;


const Container = styled.ul` 
    width:100%;
    max-height:430px;
    min-height:430px;
    overflow-y:auto;
    padding:0px;
    padding-right:10px;
 
    @media screen and (max-width:1280px){ 
       max-height:460px;
    }
 
    &::-webkit-scrollbar{
     width:6px;
     background-color:transparent;
   }
 
  &:hover{ 
   &::-webkit-scrollbar-thumb{
     background:#eaeaee;   
    }
  } 
`;


const LoaderContainer = styled.div`
  position:absolute;
  top:0px;
  left:0px;
  width:100%;
  height:100%;
  padding:30px;
  display:flex;
  align-items:center;
  justify-content:center; 
`;


export default FeesPayments