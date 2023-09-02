import React from 'react'
import { Route, Routes} from 'react-router-dom'
import EmployeeDashboard from '../EduUsers/Employees/EmployeeDashboard';
import NewsFeed from '../EduUsers/NewsFeed';
import Chat from '../General/Chat';

function TeacherRoutes() { 
  return (
    <Routes>
       <Route path='/dashboard' element={<EmployeeDashboard /> }/> 
       <Route path='/newsfeed' element={<NewsFeed />} />  
       <Route path='/chat' element={<Chat />}/> 
    </Routes>
  )
}

export default TeacherRoutes