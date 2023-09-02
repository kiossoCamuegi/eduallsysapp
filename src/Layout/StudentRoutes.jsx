
import React from 'react'
import { Route } from 'react-router-dom'
import StudentProfile from '../EduUsers/Students/pages/StudentProfile';
import StudentCalls from '../EduUsers/Students/pages/StudentCalls'; 
import StudentRequest from '../EduUsers/Students/pages/StudentRequest'; 
import PersonalProfile from '../EduUsers/Students/pages/PersonalProfile';  
import Chat_Jitsi from '../General/Chat_Jitsi'; 
import CustomList from '../EduUsers/CustomList'; 
import El_Home from '../EduUsers/Elearning/El_Home';
import CalendarApp from '../General/CalendarApp'; 
import AccessForm from '../Dashboard/pages/AccessForm'; 
import Setup from '../CompanySetup/Setup';
import Chat from '../General/Chat';
import PAGAMENTO from '../Dashboard/components/Grid/Upload.jsx'; 
import NewsFeed from '../EduUsers/NewsFeed';
import UserVoiceCall from '../General/UserVoiceCall';
import VideoChat from '../General/VideoChat';
import VirtualLibrary from '../EduUsers/VirtualLibrary';

function StudentRoutes() {
  return (
      <>
      <Route path='/Setup' component={Setup} />
      <Route path='/pagamento' component={PAGAMENTO} />  
      <Route path='/access' component={AccessForm} />
      <Route path='/chat' component={Chat}/> 
      <Route path='/uservoicecall' component={UserVoiceCall}/> 
      <Route path='/videochat' component={VideoChat}/> 
      <Route path='/newsfeed' component={NewsFeed} />  
      <Route path='/library' component={VirtualLibrary} />
      <Route path='/eduall_jitsi_room' component={Chat_Jitsi} /> 
      <Route path='/profile' component={PersonalProfile} />  
      <Route path='/studentprofile' component={StudentProfile} /> 
      <Route path='/myclasscalls' component={StudentCalls} /> 
      <Route path='/studentrequests' component={StudentRequest} />
      <Route path='/clt' component={CustomList } /> 
      <Route path='/elearning_main' component={El_Home} />
      <Route path='/calendar' component={CalendarApp } /> 
      </>
  )
}

export default StudentRoutes