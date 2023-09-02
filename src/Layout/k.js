<Route render={()=>(  
    <>
   <InternetWidget/>  
   <div  className={`dashboard-container  ${props.mode} ${props.color}`}>  
 <Sidebar Access={UserAccess}   />
 <div className="dashboard-content">
     <Navbar/> 
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
           <Route path='/employeeinfo/:id' component={EmployeeInformation} />
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
           <Route path='/quarterlynotes' component={QuarterlyNotes}/>
           <Route path='/studentsbyclass' component={PdClassList}/>
           <Route path='/miniguidelines' component={Pdminiguidelines}/>
           <Route path='/quarterfinalagenda' component={QuarterFinalAgenda} />
           <Route path='/generalagendaforthequarter' component={GeneralAgendaForTheQuarter} />
           <Route path='/notesbyquarter' component={PdNotesByQuarter}/>
           <Route path='/feature_notes' component={ PdFeatureNotes}/>
           <Route path='/exam_guidelines' component={PdExamsNotes }/> 
           <Route path="/pdg_attendance"  component={PdAttendance}/> 
           

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
     </div>   
   </div>
   </div> 
    </> 
    )}/> 