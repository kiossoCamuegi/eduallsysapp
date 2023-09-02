import React, { useEffect , useState} from 'react'
import CustomRoutes from './CustomRoutes'; 
import {BrowserRouter as Router, Switch, Route, Link, useHistory, useLocation } from "react-router-dom";   
import ThemeAction from '../Redux/Actions/ThemeAction'; 
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify'; 
import AccessForm from '../Dashboard/pages/AccessForm'; 
import Setup from '../CompanySetup/Setup'; 
import PAGAMENTO from '../Dashboard/components/Grid/Upload.jsx';  
import UserVoiceCall from '../General/UserVoiceCall';
import VideoChat from '../General/VideoChat'; 
import NotFounded from '../General/components/NotFounded';
import ConnectionBadge from '../General/components/ConnectionBadge';
import Login from '../AuthenticationScreens/Login';
import ForgotPassword from "../AuthenticationScreens/ForgotPassword"
import Signup from '../AuthenticationScreens/Signup';
import WesbiteRoutes from './WesbiteRoutes';
import AccountVerification from '../AuthenticationScreens/AccountVerification';

const checkThemeAndColorStatus = ()=>{
  if(localStorage.getItem('colorMode') === null){localStorage.setItem('colorMode', 'theme-color-purple')}
  if (localStorage.getItem('colorMode') === "theme-color-customer"){
    if(document.documentElement.style.getPropertyValue("--ed-customer-color") === ""){
      document.documentElement.style.setProperty("--ed-customer-color", localStorage.getItem("customer-primary-color"))}
      if(document.documentElement.style.getPropertyValue("--ed-customer-color-light") === ""){
      document.documentElement.style.setProperty("--ed-customer-color-light", localStorage.getItem("customer-secondery-color"))} 
  }
}

const  Layout = ()=> {
  const themeReducer = useSelector(state => state.ThemeReducer);
  const dispatch = useDispatch();   
 
 
useEffect(()=>{
    checkThemeAndColorStatus();
    const themeClass = localStorage.getItem("themeMode", 'theme-mode-light');
    const colorClass = localStorage.getItem("colorMode", "theme-mode-light"); 
    dispatch(ThemeAction.setMode(themeClass));
    dispatch(ThemeAction.setColor(colorClass)); 


    




}, [dispatch]);

document.body.classList = "";
document.body.classList.add(themeReducer.mode);
document.body.classList.add(themeReducer.color); 
  
/*
  return (   
    <BrowserRouter>
     <ToastContainer position='top-right'/>
       <Switch> 
         <Route path='/' exact  component={Login}/> 

         <Route path='/forgot_password' exact  component={ForgotPassword}/> 
         <Route path='/Setup' component={Setup} />
         <Route path='/pagamento' component={PAGAMENTO} />  
         <Route path='/access' component={AccessForm} />
         <Route path='/chat' component={Chat}/> 
         <Route path='/uservoicecall' component={UserVoiceCall}/> 
         <Route path='/videochat' component={VideoChat}/> 
         <Route path='/newsfeed' component={NewsFeed} />  
         <Route path='/library' component={VirtualLibrary} />
         <Route path='/eduall_jitsi_room' component={Chat_Jitsi} /> 
         <Route path='/page1' component={AnimationPage1} />
         <Route path='/page2' component={AnimationPage2} />
 
 
         
         <Route path='/profile' component={PersonalProfile} />  
         <Route path='/studentprofile' component={StudentProfile} /> 
         <Route path='/myclasscalls' component={StudentCalls} /> 
         <Route path='/studentrequests' component={StudentRequest} />
         <Route path='/clt' component={CustomList } />
 
 
         
         
         <Route path='/elearning_main' component={El_Home} />
         <Route path='/calendar' component={CalendarApp } />
         <Route exact path='/teacher_dashboard' component={EmployeeDashboard}/>
         <CustomRoutes  mode={themeReducer.mode} color={themeReducer.color} />   
        </Switch>
    </BrowserRouter> 
   )
   */


   return(
    <Router>
        <ToastContainer position='top-right'/>
        <ConnectionBadge />
    <Switch>
    <Route path='/' exact  component={Login }/> 
    <Route path='/signup' exact  component={Signup }/> 

    <Route path='/forgot_password' exact  component={ForgotPassword  }/> 
    <Route path='/Setup' component={Setup} />
    <Route path='/pagamento' component={PAGAMENTO} />  
    <Route path='/access' component={AccessForm} />
   
    <Route path='/uservoicecall' component={UserVoiceCall}/> 
    <Route path='/videochat' component={VideoChat}/> 


    <Route path='/eduall_user_account_verification/:id,:code' component={AccountVerification}/> 

    

   


      <CustomRoutes  mode={themeReducer.mode} color={themeReducer.color} />  
      <WesbiteRoutes /> 

      <Route path='/*' component={NotFounded} /> 
    </Switch>
  </Router>
   )


}
  
export default Layout

 