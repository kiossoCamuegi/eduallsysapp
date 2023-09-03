import React, {useState, useEffect, useImperativeHandle, forwardRef} from 'react'
import axios from 'axios'
import { Delete, Description, Edit , InfoOutlined, PreviewOutlined, Refresh } from '@mui/icons-material';
import TableGrid from '../../../General/components/TableGrid';
import Hoot from '../../../General/components/Hoot';
import SwitchFromPages from '../../../General/components/SwitchFromPages';
import { Avatar } from '@mui/material';
import { GetAcademicYearCodebyclass, GetAcademicYearCode_byclass, GetAcademiclevel_byclass, GetClassroom_byclass, GetPeriod_byclass, GetClasstitle_byclass, GetCourse_byclass, GetAcademicYear_byclass } from '../../../General/components/InstituteData';
import NewfeeManualPaymentModal from '../modal/NewfeeManualPaymentModal';
import DeleteModal from '../elements/DeleteModal';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import StudentDetailsMenu from '../elements/StudentDetailsMenu';
import { styled } from 'styled-components';


const TABLEURL = Hoot()+"eduallgetstudentsbyclass/";
const FORMURL = [
    Hoot()+"eduallsinglestudentfeepayment/get/",
    Hoot()+"eduallsinglestudentapi/get/",
    Hoot()+"eduallsingleserviceapi/get/",
    Hoot()+"eduallsingleacademicyearapi/get/",
    Hoot()+"eduallfeepaymentcheckpaidmonth/",
 ]; 


 

const ListDebts = forwardRef((props, ref) =>{
    let month = new Date().getMonth()
    let currentMonth = month+1 <= 12 ? month+1 : month; 
    let Months = [];
    const CY =  new Date().getFullYear(); 
    const MonthsList = ["Janeiro", "Fevereiro", "Março",
    "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro",
    "Outubro", "Novembro", "Dezembro"]  

    const [Data, setData] = useState([]);
    const [load, setLoaded] = useState(false); 
    const class_filter = props.Class ? props.Class : null; 
    

    async function loadData(){
        setLoaded(false);
       if(class_filter !== null && class_filter*1 >= 0){
         const response2 = await axios.get(TABLEURL+class_filter);
         const rows = []; 
         const TableHeader = []; 

         response2.data.map((student, stIndex)=>{ 
 
            const GetPaymentData = (studentCode, Academic_year)=>{   
        
                  let CurrentStudentData = {}; 
                  setTimeout(() => { 
                      if (studentCode !== null) { 
                         async function CheckStudentPayment(){ 
                              try {
                                                  
                              const [AcademicYearData,  response] = await  Promise.all([
                                  axios.get( FORMURL[3]+Academic_year), 
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
              
                                    //  console.log("Senario n 3");
              
                                        Months = CurrentMonths;  
                                      }  
               
                                  
                                      /// end 
              
                                      /*** ADDING PAYMENT STATUS */
                                      if(Months.length >= 1){   
                                          let  Months1 = Months;
                                            
                                           const StudentData = async()=>{ 
                                                 if (student !== null ){  
                                                    CurrentStudentData.name = student.ed_student_name;
                                                    CurrentStudentData.class = student.ed_student_class;
                                                    CurrentStudentData.picture = Hoot()+student.ed_student_picture; 
                                                    CurrentStudentData.id = student.ed_student_id;  
                                                    CurrentStudentData.class_title = student.ed_class_title;
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
                                                                      //console.log("Case 0 = "+thisMonthYear + " | "+currentYear);
              
                                                                  }else{  
              
                                                                     if((Months1[a].code*1) < (((currentMonth-1)+"."+CY)*1) && Months1[a].status !== 'paid'){  
                                                                          let thisMonthYear =  Months1[a].month.split(" ")[2]*1;
                                                                          if(thisMonthYear <= currentYear) { 
                                                                              Months1[a].status = "notpaid"; 
                                                                          };   
                                                                          //console.log("Case 1= "+thisMonthYear + " | "+currentYear);
                                                                     } else{
              
                                                                       if (Y2 - Y1 === 0 ) { 
                                                                          let thisMonthYear =  Months1[a].month.split(" ")[2]*1;
                                                                          if(thisMonthYear <= currentYear) { 
                                                                              if(Months1[a].status !== 'paid') Months1[a].status = "notpaid"; 
                                                                          };  
                                                                        //  console.log("Case 2= "+thisMonthYear + " | "+currentYear);
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
                                                                      // console.log("Case 3 = "+thisMonthYear + " | "+currentYear);
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
                                                                     // console.log("Case 4 = "+thisMonthYear + " | "+currentYear);
                                                                  }
                                                                 } 
                                                             }
                                                        }
               
                                                       CurrentStudentData.months = Months1; 

                                                        if(stIndex === response2.data.length-1){
                                                            TableHeader.push({ field: 'index', headerName: 'Nº', width: 90});
                                                            TableHeader.push({ field: 'name', headerName: 'Nome', width: 300})
                                                           
                                                        }

                                                       if(Months1.length >= 1){CurrentStudentData.founded = true}else{CurrentStudentData.founded  = false;} 
              
                                                  }  
                                                 ServiceData();
                                            }, 100); 
                                                        
                                      }
                                      // END 
                                  }   
                              }  
                              } catch (error) {
                                CurrentStudentData.founded  = false;
                              } 
                          }
                          CheckStudentPayment();
                      } 
                  }, 10); 
                  
                rows.push(CurrentStudentData);
            }
            GetPaymentData(student.ed_student_id, student.ed_class_year);


            setData(rows);
         })   

 
        setLoaded(true);
      }
    }





   
  
    useEffect(()=>{
        loadData();  
    },[]);


    useImperativeHandle(ref, ()=>({
         loadData(){
            loadData();
         }
    }))
  
 
  if(load){   
    console.log(Data); 
      return (
       <Container>
           {Data.map((student, index)=>{  
               return( 
                <Box key={index}> 
                    <div className="ed-space">
                        <div className="ed-flex mb-4">
                            <li className="ed-flex ex"><div className="dot success"></div> Pago</li> 
                            <li className="ed-flex ex"><div className="dot warning"></div>Não pago</li>
                            <li className="ed-flex ex"><div className="dot other"></div> Outras</li>
                        </div> 
                        <div className="ed-flex  " style={{marginRight:'10px'}}>
                            {(student.id !== "#" & student.id !== null) ? <StudentDetailsMenu student_id={student.id}  toggle_btn={<div className='btn-pm-info'><InfoOutlined /></div>} /> : <></>}
                        </div>
                    </div> 
                        <div className="ed-flex"> 
                        <SwitchFromPages link={`studentinfo/${student.id}`}
                            menu='3'  menu_item='17'  toggle_btn={
                                <Link to="#"><Avatar alt={student.name}  className='df' 
                                        src={student.picture != "#"  ? student.picture  : ""} 
                                        sx={{ width: 106, height: 106 }}/>
                                </Link>
                            } /> 
                        <div className="d-block ml-2 description"> 
                        <SwitchFromPages link={`studentinfo/${student.id}`}
                            menu='3'  menu_item='17'  toggle_btn={ <h5 className='name '>Nome : <Link to="#" 
                            className='text-main-light label-student-name'> {student.name} </Link></h5>
                            } /> 
                            <h5>Turma : <Link to='#' className='text-main-light label-student-class'> <GetClasstitle_byclass ID={student.class} />  </Link></h5>
                        </div>
                      </div>
                        <h2>Propinas pagas</h2>
                        <div className="wrap wrap-scroll"> 
                            {/*
                              {student.months.map((item, index)=>{
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
                            })}

                        */}
                        </div>  
                  </Box>
               );
           })}
       </Container>
    )
  }else{
      return(<h1>Loading ....</h1>);
  }
})

const Container = styled.section`
    
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


export default ListDebts
