import React, {useState, useEffect} from 'react' 
import {  Switch, Route, useHistory, Link, useRouteMatch  } from "react-router-dom"; 
import Dashboard from '../Dashboard/pages/Dashboard';
import Students from '../Dashboard/pages/Students';
import Academic_Structure from '../Dashboard/pages/Academic_Structure';
import New_academic_year from '../Dashboard/pages/New_academic_year';
import NewStudentBase from '../Dashboard/pages/NewStudentBase';
import StudentsGrid from '../Dashboard/pages/StudentsGrid';
import Subjects from '../Dashboard/pages/Subjects';
import Sessions from '../Dashboard/pages/Sessions';
import Timing from '../Dashboard/pages/Timing';  
import Exam from '../Dashboard/pages/Exams/Exam';
import Course from '../Dashboard/pages/Course';
import ClassRoom from '../Dashboard/pages/ClassRoom';
import Class from '../Dashboard/pages/Class';
import ExamsList from '../Dashboard/pages/Exams/ExamsList';
import StudentInfo from '../Dashboard/pages/StudentInfo';
import Departments from '../Dashboard/pages/Departments';
import ActivityType from '../Dashboard/pages/ActivityType';
import Fees from '../Dashboard/pages/Fees';
import AdmissionRegister from '../Dashboard/pages/AdmissionRegister';
import AddBusRoutes from '../Dashboard/pages/AddBusRoutes'; 
import TransportRouteList from '../Dashboard/pages/TransportRouteList';
import busStop from '../Dashboard/pages/busStop';
import Questions from '../Dashboard/pages/Exams/Questions';
import Parents from '../Dashboard/pages/Parents';
import NewParent from '../Dashboard/pages/NewParent';
import ParentsGrid from '../Dashboard/pages/ParentsGrid';
import Dashboard_exam from '../Dashboard/pages/Exams/Dashboard_exam';
import NewMarks from '../Dashboard/pages/Exams/NewMarks';
import HonorBoard from '../Dashboard/pages/HonorBoard';
import Newservice from '../Dashboard/pages/Newservice';
import NewCicle from '../Dashboard/pages/NewCicle';
import NewGrade from '../Dashboard/pages/NewGrade';
import FeesPayments from '../Dashboard/pages/Finance/FeesPayments';
import Listdebts from '../Dashboard/pages/Finance/Listdebts'; 
import StudentEnroll from '../Dashboard/pages/StudentEnroll';
import Registrationconfirmation from '../Dashboard/pages/RegistrationConfirmation';
import Unregistration from '../Dashboard/pages/Unregistration';
import Studenttrp from '../Dashboard/pages/Studenttrp';
import Servicepayments from '../Dashboard/pages/Servicepayments';
import PaidServices from '../Dashboard/pages/PaidServices';
import CreateDpp from '../Dashboard/pages/CreateDpp';
import CreateMrt from '../Dashboard/pages/CreateMrt'; 
import Declarations from '../Dashboard/pages/Declarations';
import CreateWarning from '../Dashboard/pages/CreateWarning';
import CashDeposit from '../Dashboard/pages/CashDeposit';
import DailyMovemment from '../Dashboard/pages/Finance/DailyMovemment';
import JobTitles from '../Dashboard/pages/JobTitles';
import Newprovince from '../Dashboard/pages/Newprovince';
import Municipe from '../Dashboard/pages/Municipe';
import CreateCommunity from '../Dashboard/pages/CreateCommunity';
import CreatePeriod from '../Dashboard/pages/CreatePeriod';
import StudentStatus from '../Dashboard/pages/StudentStatus';
import DeclarationType from '../Dashboard/pages/DeclarationType';
import Createtypeofservice from '../Dashboard/pages/Createtypeofservice';
import CreateNacionality from '../Dashboard/pages/CreateNacionality';
import ConfigurateTx from '../Dashboard/pages/ConfigurateTx';
import NewSchoolsOfProvenance from '../Dashboard/pages/NewSchoolsOfProvenance';
import SchoolsOfProvenance from '../Dashboard/pages/SchoolsOfProvenance';
import CreateTypeOfAvaliation from '../Dashboard/pages/CreateTypeOfAvaliation';
import PaymentMethod from '../Dashboard/pages/Settings/PaymentMethod';
import AccountPlan from '../Dashboard/pages/Settings/AccountPlan';
import UserPermitions from '../Dashboard/pages/Settings/UserPermitions';
import NewEmployee from '../Dashboard/pages/NewEmployee';
import ConfigDashboard from '../Dashboard/pages/ConfigDashboard';
import About_Institute from '../Dashboard/pages/About_Institute';
import UserAccounts from '../Dashboard/pages/UserAccounts'; 
import Navbar from '../Dashboard/components/elements/Navbar';
import Sidebar from '../Dashboard/components/elements/Sidebar'; 
import ListPayments from '../Dashboard/pages/Finance/ListPayments';
import TypeOfBook from '../Dashboard/pages/Library/TypeOfBook';
import NewbookRegister from '../Dashboard/pages/Library/NewbookRegister';
import AcademicLevel from '../Dashboard/pages/AcademicLevel';
import Providers from '../Dashboard/pages/Providers';
import Employees from '../Dashboard/pages/Employees'; 
import UploadDemo from '../Dashboard/pages/UploadDemo';
import Coins from '../Dashboard/pages/Finance/Coins';
import Salles from '../Dashboard/pages/Finance/Pointofsale/Salles';
import Main from '../Dashboard/pages/Finance/Pointofsale/Main';
import NewProduct from '../Dashboard/pages/Finance/Pointofsale/NewProduct';
import Debts from '../Dashboard/pages/Finance/Debts';
import Billings from '../Dashboard/pages/Finance/Billings';
import Generalpayments from '../Dashboard/pages/Finance/Generalpayments';
import TransferredStudents from '../Dashboard/pages/TransferredStudents';
import EnrollmentsAndConfirmation from '../Dashboard/pages/EnrollmentsAndConfirmation';
import UsersRequests from '../Dashboard/pages/UsersRequests';
import Vehicles from '../Dashboard/pages/Vehicles';
import AddTransportStops from '../Dashboard/pages/AddTransportStops';
import Maintenance from '../Dashboard/pages/Maintenance';
import KeyCombinations from '../Dashboard/components/elements/KeyCombinations';
import TransportVehiclesGrid from '../Dashboard/pages/TransportVehiclesGrid';
import TransportStops from '../Dashboard/pages/TransportStops';
import TransportPassengers from '../Dashboard/pages/TransportPassengers';
import TransportPassengersGrid from '../Dashboard/pages/TransportPassengersGrid';
import Drivers from '../Dashboard/pages/Drivers';
import TitlesHeaders from '../Dashboard/pages/TitlesHeaders';
import FinePrice from '../Dashboard/pages/FinePrice';
import StudentEnrollmentPrint from '../Dashboard/pages/StudentEnrollmentPrint';
import NewUserRegister from '../Dashboard/pages/NewUserRegister';
import Authors from '../Dashboard/pages/Authors'; 
import InternetWidget from '../Dashboard/components/elements/InternetWidget'; 
import Publishers from '../Dashboard/pages/Publishers';
import BooksCategory from '../Dashboard/pages/BooksCategory';
import LibraryRacks from '../Dashboard/pages/LibraryRacks';
import BorrowBooks from '../Dashboard/pages/BorrowBooks';
import BooksListGrid from '../Dashboard/pages/BooksListGrid';
import BooksList from '../Dashboard/pages/BooksList';
import BooksToReceive from '../Dashboard/pages/BooksToReceive';
import LibraryDashboard from '../Dashboard/pages/Library/LibraryDashboard';
import Extracts from '../Dashboard/pages/Extracts';
import EnrollmentsGrid from '../Dashboard/pages/EnrollmentsGrid';
import StudentEnrollments from '../Dashboard/pages/StudentEnrollments';
import RequestDeclaration from '../Dashboard/pages/RequestDeclaration';
import EnrollmentDashboardReport from '../Dashboard/pages/EnrollmentDashboardReport';
import EnrollmentsConfirmationGrid from '../Dashboard/pages/EnrollmentsConfirmationGrid';
import EnrollmentConfirmationReport from '../Dashboard/pages/EnrollmentConfirmationReport';
import TransferStatement from '../Dashboard/pages/TransferStatement';
import TransferStudentStatementPrint from '../Dashboard/pages/TransferStudentStatementPrint';
import DeclarationWithMarksPrint from '../Dashboard/pages/DeclarationWithMarksPrint';
import StudentTuition from '../Dashboard/pages/StudentTuition';
import TransportTuition from '../Dashboard/pages/TransportTuition';
import StudentTuitionPaymentPrint from '../Dashboard/pages/StudentTuitionPaymentPrint';
import SmsServices from '../Dashboard/pages/SmsServices';
import MailServices from '../Dashboard/pages/MailServices';
import RegisterTitleAndHeaders from '../Dashboard/pages/RegisterTitleAndHeaders';
import StudentGeneralInformationPrint from '../Dashboard/pages/StudentGeneralInformationPrint';
import RegisterErrrorAndFeedback from '../Dashboard/pages/RegisterErrrorAndFeedback';
import ErrorsAndFeedbacks from '../Dashboard/pages/ErrorsAndFeedbacks';
import Auditory from '../Dashboard/pages/Auditory';
import StudentCard from '../Dashboard/pages/StudentCard';
import SystemVisits from '../Dashboard/pages/SystemVisits';
import InvoicingReportPrint from '../Dashboard/pages/InvoicingReportPrint';
import QuarterlyNotes from '../Dashboard/pages/Pedagogy/QuarterlyNotes';
import PdClassList from '../Dashboard/pages/Pedagogy/PdClassList';
import Pdminiguidelines from '../Dashboard/pages/Pedagogy/Pdminiguidelines';
import QuarterFinalAgenda from '../Dashboard/pages/Pedagogy/QuarterFinalAgenda';
import GeneralAgendaForTheQuarter from '../Dashboard/pages/Pedagogy/GeneralAgendaForTheQuarter';
import PdQuarterNotes from '../Dashboard/pages/Pedagogy/PdQuarterNotes';
import PdStudentMarks from '../Dashboard/pages/Pedagogy/PdStudentMarks';
import PdSchoolMarks from '../Dashboard/pages/Pedagogy/PdSchoolMarks';
import PdQuarterNotesByClass from '../Dashboard/pages/Pedagogy/PdQuarterNotesByClass';
import PdGenerateTerms from '../Dashboard/pages/Pedagogy/PdGenerateTerms';
import PdViewStatistics from '../Dashboard/pages/Pedagogy/PdViewStatistics';
import PdMarksRanking from '../Dashboard/pages/Pedagogy/PdMarksRanking';
import UpdateStudent from '../Dashboard/pages/UpdateStudent';
import StudentTuitionPaymentPrintInvoiceDoc from '../Dashboard/pages/StudentTuitionPaymentPrintInvoiceDoc';
import IVA_Discount from '../Dashboard/pages/Finance/IVA_Discount';
import ManagerProfile from '../Dashboard/pages/Profile/ManagerProfile';
import SubjectsDivision from '../Dashboard/pages/Pedagogy/SubjectsDivision';
import axios from 'axios';
import Hoot from '../General/components/Hoot';
import PdScheduler from '../Dashboard/pages/Pedagogy/PdScheduler';
import UpdateEmployee from '../Dashboard/pages/UpdateEmployee';
import PdNotesByQuarter from '../Dashboard/pages/Pedagogy/PdNotesByQuarter';
import Kiosso from '../Dashboard/pages/Kiosso';
import PdCurricularPlan from '../Dashboard/pages/Pedagogy/PdCurricularPlan';  
import MyImages from '../Dashboard/MyImages'
import {FaRegUserCircle}  from "react-icons/fa";
import EmployeeInformation from '../Dashboard/pages/EmployeeInformation';
import StudentTransferPrint from '../Dashboard/pages/StudentTransferPrint';
import UpdateParent from '../Dashboard/pages/UpdateParent'; 
import jwt_decode from 'jwt-decode';  
import PdFeatureNotes from '../Dashboard/pages/Pedagogy/PdFeatureNotes';
import PdExamsNotes from '../Dashboard/pages/Pedagogy/PdExamNotes';
import EmployeeDashboard from '../EduUsers/Employees/EmployeeDashboard';
import PdMiniguidelinesReportPrint from '../Dashboard/pages/Pedagogy/Reports/PdMiniguidelinesReportPrint';
import PdquarterendagendaReportPrint from '../Dashboard/pages/Pedagogy/Reports/PdquarterendagendaReportPrint';
import { GetFullWindowStatus } from '../Dashboard/components/elements/FullWindowStatus';
import PdAttendance from '../Dashboard/pages/Pedagogy/PdAttendance';
import StudentCardGenerator from '../Dashboard/pages/StudentCardGenerator';
import Chat from '../General/Chat';
import NewsFeed from '../EduUsers/NewsFeed';
import PersonalProfile from "../EduUsers/PersonalProfile"; 
import Chat_Jitsi from '../General/Chat_Jitsi';
import StudentProfile from '../EduUsers/Students/pages/StudentProfile';
import StudentCalls from '../EduUsers/Students/pages/StudentCalls';
import StudentRequest from '../EduUsers/Students/pages/StudentRequest';
import CustomList from '../EduUsers/CustomList';
import WatchCourse from '../EduUsers/Elearning/WatchCourse';
import ParentPortal from '../EduUsers/Parents/ParentPortal';
import Pd_exams from '../Dashboard/pages/Pedagogy/Pd_exams';
import PdExamsCalendar from '../Dashboard/pages/Pedagogy/PdExamsCalendar';
import PrintStudentMarks from '../Dashboard/components/Reports/PrintStudentMarks';
import MailBox from '../EduUsers/MailBox'; 
import VirtualLibrary from '../EduUsers/Library/VirtualLibrary';

const DATA_URL = [
  Hoot()+'token',
  Hoot()+'eduallsingleuserdata/get/',
  Hoot()+'eduallgetuseraccess/get/',
  Hoot()+'logout',
  Hoot()+"eduallgetsingleuserinstitutes/get/",
  Hoot()+"eduallgetsingleuserchilds/get/"
];

function CustomRoutes(props) {  
  const [token, setToken] = useState(null); 
  const [UserAccess, setUserAccess] = useState(null); 
  const [Show, setShow] = useState(false);  
  const [UserType, setUserType]  = useState("");
  const [data, setData] = useState({});
  const history = useHistory();   


   const match = ''

   useEffect(()=>{  
    console.log(match)
}, [match]);




  const refreshToken = async ()=>{ 
    try { 
      const response = await axios.get(DATA_URL[0]); 
      console.log(response.data)
      const decoded = jwt_decode(response.data.accessToken);  
         if(response.data !== null){ 
          setUserType(decoded.cr_usertype*1);  


          if(decoded.cr_usertype === 0){
            const [response0, response1, response2, responseUserAccess] = await Promise.all([
              axios.get(DATA_URL[5]+decoded.cr_usercode), 
              axios.get(DATA_URL[4]+decoded.cr_usercode),   
              axios.get(DATA_URL[1]+decoded.cr_usercode),    
              axios.get(DATA_URL[2]+decoded.cr_username_id)
           ]);  
              
          setUserAccess(responseUserAccess.data.length > 0 ? responseUserAccess.data[0] : {});  
          setData({user_childs:response0.data,   user_institutes:response1.data, user_Information:response2.data });   
          setToken(response.data.accessToken);  

          }else{
            const [response0, response1, response2] = await Promise.all([
              axios.get(DATA_URL[5]+decoded.cr_usercode), 
              axios.get(DATA_URL[4]+decoded.cr_usercode),   
              axios.get(DATA_URL[1]+decoded.cr_usercode),   
           ]);  
               
          setData({user_childs:response0.data,   user_institutes:response1.data, user_Information:response2.data });   
          setToken(response.data.accessToken); 
          setUserAccess({});   

        }}  
    } catch (error) { 
      console.clear(); 
      console.log(error); 
      try {
        localStorage.setItem("CurrentTab", 1);
        localStorage.setItem("CurrentPage", null);
        await axios.delete(DATA_URL[3]);     
      setToken(null);
      setUserAccess(null);
      history.push('/'); 
    } catch (error) {
       console.log("something went wrong"); 
    }   
    }
  }
 
  useEffect(()=>{ 
    setShow(GetFullWindowStatus(false))
    refreshToken(); 
    console.log(match)
}, []);


 

   if(token !== null && UserAccess !== null){
    return ( 
    <Switch> 
             <>
               <Route path="/school_" component={StudentCardGenerator} />
                {(UserType === 1 && UserType !== null)  ?  
                 <> 
                  <Route exact path="/Dashboard/:INSTITUTECODE" render={()=>(<div><EmployeeDashboard userdata={data} /></div>)} />   
                  <Route  path="/parent_portal/:CHILDID" render={()=>(<><ParentPortal userdata={data} /></>)} />  
                  <Route path='/eduall_jitsi_room' component={Chat_Jitsi} />   
                  <Route path='/chat' component={Chat}/> 
                  <Route path='/newsfeed' render={()=>(<div><NewsFeed userdata={data} /></div>)} />  
                  <Route path='/virtual_library' render={()=>(<div><VirtualLibrary userdata={data} /></div>)} />   
                  <Route path='/profile'  render={()=>(<div><PersonalProfile userdata={data} /></div>)} /> 
                  <Route path='/studentprofile' component={StudentProfile} /> 
                  <Route path='/myclasscalls' component={StudentCalls} /> 
                  <Route path='/studentrequests' component={StudentRequest} />
                  <Route path='/clt' component={CustomList } />
                  <Route path='/watch_course' component={WatchCourse } />  
                  <Route path='/sendemail' component={MailBox } /> 
                 </>  
              : 
              <>    
               {!Show ?  
               <Route render={()=>(  
                <> 
               <InternetWidget/>  
               <div  className={`dashboard-container  ${props.mode} ${props.color}`}>  
             <Sidebar Access={UserAccess}   />
             <div className="dashboard-content">
                 <Navbar userdata={data} /> 
                 <div className="dashboard-pages "> 
                 <Switch>  

                    {/*Common routes for all admin users */}
                    <Route path='/Dashboard' component={Dashboard}  />  

                     {/*Minha escola */}
                       <Route path='/New_academic_year' component={New_academic_year} /> 
                       <Route path='/NewCourse' component={Course}/>
                       <Route path='/New_classroom' component={ClassRoom}/>
                       <Route path='/New_class' component={Class}/>
                       <Route path="/NewService" component={Newservice}/>
                       <Route path="/NewCicle" component={NewCicle}/>
                       <Route path="/employees" component={Employees} />
                       <Route path='/Subjects' component={Subjects}/>
                       <Route path='/Timing' component={Timing}/> 
                       <Route path="/new_employee" component={NewEmployee} />
                       <Route path='/newacademiclevel' component={AcademicLevel} />
                       <Route path='/newprovider' component={Providers} />
                       <Route path="/NewSchoolsOfProvenance" component={NewSchoolsOfProvenance} /> 
                       <Route path="/SchoolsOfProvenance" component={SchoolsOfProvenance} /> 
                       <Route path='/updateemployee/:id' component={UpdateEmployee}/>
                       <Route path="/about_institute" component={About_Institute}/> 
                       <Route path="/Createtypeofservice" component={Createtypeofservice} /> 

                     {/*Secretaria*/}
                       <Route path='/NewStudentBase' component={NewStudentBase}/>
                       <Route path='/updatestudent/:id' component={UpdateStudent}/>
                       <Route path='/students' component={Students}  />   
                       <Route path='/StudentsGrid' component={StudentsGrid}/>
                       <Route path='/Parents' component={Parents}/>
                       <Route path='/NewParent' component={NewParent}/>
                       <Route path='/studentenrollmentconfirmation' component={EnrollmentsAndConfirmation}/>
                       <Route path='/studentenrollment' component={StudentEnrollments} />
                       <Route path='/print_student_enrollment/:id' component={StudentEnrollmentPrint} />
                       <Route path='/requestdeclaration' component={RequestDeclaration}/>
                       <Route path="/answerrequests" component={UsersRequests}/>
                       <Route path='/student_transfer_reportprint/:id' component={StudentTransferPrint} />
                       <Route path="/studenttransfer" component={TransferredStudents}/>
                       <Route path="/extracts" component={Extracts} />  
                       <Route path='/enrolledstudents' component={EnrollmentsGrid} />
                       <Route path='/confirmedenrollment' component={EnrollmentsConfirmationGrid}/>
                       <Route path="/enrollmentanuallreports" component={EnrollmentDashboardReport}/>
                       <Route path='/smsservices' component={SmsServices}/>
                       <Route path='/emailservices' component={MailServices}/>
                       <Route path='/StudentGeneralInformationPrint/:id' component={StudentGeneralInformationPrint} />
                       <Route path="/StudentEnroll" component={StudentEnroll} /> 
                       <Route path="/StudenterConfirmation" component={Registrationconfirmation} />             
                       <Route path='/requestdeclaration' component={RequestDeclaration}/>
                       <Route path='/update_parent/:id' component={UpdateParent} />
                       <Route path="/print_student_enrollment_confirmation" component={EnrollmentConfirmationReport}/>
                       <Route path='/parentsgrid' component={ParentsGrid}/>
                       <Route path='/StudentInfo/:id' component={StudentInfo}/>


                     {/*administração */}
                       <Route path="/transferstatement" component={TransferStatement} />
                       <Route path='/transferstudentstatementprint' component={TransferStudentStatementPrint} />
                       <Route path='/declarationwithmarksprint' component={DeclarationWithMarksPrint }/>
                       <Route path="/Declarations" component={Declarations} />

                     {/*finanças */}
                       <Route path="/feespayments" component={FeesPayments}/> 
                       <Route path="/listdebts" component={Listdebts} />  
                       <Route path="/listfeedebts" component={Debts}/>
                       <Route path="/invoicing" component={Billings} />
                       <Route path='/pointofsales_salles' component={Salles  }/>
                       <Route path='/pointofsales_newproduct' component={NewProduct}/>
                       <Route path='/pointofsales_dashboard' component={Main } /> 
                       <Route path='/generalpayments' component={Generalpayments} /> 
                       <Route path="/servicepayments" component={Servicepayments} /> 
                       <Route path="/paidservices" component={PaidServices} />  
                       <Route path='/InvoicingReportPrint' component={InvoicingReportPrint}/>
                       <Route path="/fineprices" component={FinePrice} />
                       <Route path='/iva_and_discounts' component={IVA_Discount}/>
                       <Route path='/definecoins' component={Coins} />
                       <Route path="/student_tuition_payment_print/:id" component={StudentTuitionPaymentPrint}/>
                       <Route path='/transporttuition' component={TransportTuition } />
                       <Route path='/student_tuition_payment_print_invoice/:id' component={StudentTuitionPaymentPrintInvoiceDoc} />
                       <Route path="/listpayments" component={ListPayments }/>
                       <Route path='/NewFees' component={Fees}/>


                     {/*pedagogia */}
                       <Route path='/quarternotes' component={PdQuarterNotes}/>
                       <Route path='/studentmarks' component={PdStudentMarks}/>
                       <Route path='/schoolmarks' component={PdSchoolMarks}/>
                       <Route path='/quarternotesbyclass' component={PdQuarterNotesByClass}/>
                       <Route path='/generateterms' component={PdGenerateTerms}/>
                       <Route path='/ViewStatistics' component={PdViewStatistics}/>
                       <Route path='/MarksRanking' component={PdMarksRanking }/>
                       <Route path="/NewMarks" component={NewMarks}/>
                       <Route path="/HonorBoard" component={HonorBoard}/>
                       <Route path='/notesbyquarter' component={QuarterlyNotes}/>
                       <Route path='/studentsbyclass' component={PdClassList}/>
                       <Route path='/miniguidelines' component={Pdminiguidelines}/>
                       <Route path='/quarterfinalagenda' component={QuarterFinalAgenda} />
                       <Route path='/generalagendaforthequarter' component={GeneralAgendaForTheQuarter} />
                       <Route path='/notesbyquarter' component={PdNotesByQuarter}/>
                       <Route path='/feature_notes' component={ PdFeatureNotes}/>
                       <Route path='/exam_guidelines' component={PdExamsNotes }/> 
                       <Route path="/pdg_attendance"  component={PdAttendance}/> 
                       <Route path="/pdg_exams" component={Pd_exams}/> 
                       <Route path="/exams_calendar" component={PdExamsCalendar} />
                       <Route path="/printstudentmarks/:Student,:Class" component={PrintStudentMarks} />

                       <Route path='/managerprofile' component={ManagerProfile } />  
                      <Route path='/curricularplan' component={PdCurricularPlan } />  
                      <Route path='/miniguideline_report_print/:class,:subject' component={PdMiniguidelinesReportPrint } />  
                      <Route path='/quarterfinalagenda_report_print/:class,:quarter' component={PdquarterendagendaReportPrint } />   
                      <Route path='/subjects_assignement' component={SubjectsDivision} />  
                      <Route path='/employeeinfo/:id' render={()=>(<div><EmployeeInformation data={data} /></div>)} />    
                          

                     {/*Transporte */}
                       <Route path='/registerroute' component={AddBusRoutes}/> 
                       <Route path='/registerstops' component={AddTransportStops} />
                       <Route path='/TransportRoutes' component={TransportRouteList}/> 
                       <Route path='/Transportstops' component={TransportStops}/> 
                       <Route path="/registertransportpassengers" component={TransportPassengers}/>
                       <Route path="/transportpassengers" component={TransportPassengersGrid}/>
                       <Route path="/registertransportdriver" component={Drivers}/>
                       <Route path='/busStop' component={busStop}/> 
                       <Route path='/vehiclesmaintenance' component={Maintenance} />
                       <Route path="/registervehicles" component={Vehicles} />
                       <Route path="/vehiclesgridview" component={TransportVehiclesGrid} />
                       <Route path='/studenttuition' component={StudentTuition } />

                     {/*Biblioteca */}
                       <Route path="/library_registerauthor" component={Authors } /> 
                       <Route path="/library_registerpublisher" component={Publishers} /> 
                       <Route path="/library_categories" component={BooksCategory} />
                       <Route path='/library_registerrack' component={LibraryRacks} />
                       <Route path='/library_borrowbook' component={BorrowBooks} />
                       <Route path='/library_dashboard' component={LibraryDashboard} />
                       <Route path='/library_books_grid' component={BooksListGrid} />
                       <Route path='/library_books' component={BooksList} />
                       <Route path='/library_books_to_receive' component={BooksToReceive} />
                       <Route path='/library_registernewbook' component={NewbookRegister} />
                       <Route path='/library_newtypeofbook' component={TypeOfBook} />
                       <Route path='/library_registernewbook' component={NewbookRegister} />
                       

                     {/*Sistema */}
                      <Route path="/titles_and_headers" component={TitlesHeaders} />
                      <Route path="/register_titles_and_headers" component={RegisterTitleAndHeaders} />
                      <Route path="/newuserregister" component={NewUserRegister}/>
                      <Route path='/auditory' component={Auditory} />
                      <Route path='/systemvisits' component={SystemVisits}/>
                      <Route path="/register_errors_and_feedbacks" component={RegisterErrrorAndFeedback} />
                      <Route path="/usersaccounts" component={UserAccounts}/> 
                      <Route path="/errorsandfeedbacks" component={ErrorsAndFeedbacks}/>

                     {/*Configurações */}
                     <Route path="/settings_paymentmethond" component={PaymentMethod} />
                     <Route path="/settings_accountplan" component={AccountPlan}/>
                     <Route path="/settings_userpermitions" component={UserPermitions}/>
                     <Route path="/configurate_dashboard" component={ConfigDashboard }/>
                          

                     {/*Portal */}
 


                     {/** Other routes */}
                     <Route path='/Academic_Structure' component={Academic_Structure} />
                     <Route path='/Sessions' component={Sessions}/>
                     <Route path='/Exams' component={Exam}/>
                     <Route path='/ExamsList' component={ExamsList}/>
                     <Route path='/Departments' component={Departments}/>
                     <Route path='/ActivityType' component={ActivityType}/>
                     <Route path='/AdmissionRegister' component={AdmissionRegister}/>
                     <Route path='/questions' component={Questions}/>
                     <Route path="/Dashboard_exam" component={Dashboard_exam}/>
                     <Route path="/NewGrade" component={NewGrade}/>
                     <Route path="/unregistration" component={Unregistration} /> 
                     <Route path="/Studenttrp" component={Studenttrp} /> 
                     <Route path="/CreateDpp" component={CreateDpp} /> 
                     <Route path="/CreateMrt" component={CreateMrt} />  
                     <Route path="/CreateWarning" component={CreateWarning} /> 
                     <Route path="/CashDeposit" component={CashDeposit} />  
                     <Route path="/Dailymovimment" component={DailyMovemment} /> 
                     <Route path="/NewJobtitle" component={JobTitles} /> 
                     <Route path="/Newprovince" component={Newprovince} /> 
                     <Route path="/Newmn" component={Municipe} /> 
                     <Route path="/Createcommunity" component={CreateCommunity} /> 
                     <Route path="/Createperiod" component={CreatePeriod} /> 
                     <Route path="/Createstatus" component={StudentStatus} /> 
                     <Route path="/Createdeclarationtype" component={DeclarationType} />  
                     <Route path="/Createnacionality" component={CreateNacionality} /> 
                     <Route path="/ConfigurateTx" component={ConfigurateTx} /> 
                     <Route path="/createtypeofavaliation" component={CreateTypeOfAvaliation} /> 
                     <Route path='/generatestudentcard' component={StudentCard}/>
                     {/* end common routes  */} 
                       
                      
                   </Switch> 
                   <br/>
                 </div>   
               </div>
               </div> 
                </> 
                )}/> 
               : <></> }
              


              </>
             }   
             </>  
     </Switch> 
     ); 
   } else{
    refreshToken(); 
   }
  }
 
export default CustomRoutes