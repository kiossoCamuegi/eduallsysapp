import React from 'react';
import {BiCalendar, BiGroup, BiPlusCircle} from "react-icons/bi";
import {BsCalendarDate, BsTelephone} from "react-icons/bs"
import {RiGalleryLine} from "react-icons/ri"
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup'; 
import { Link } from 'react-router-dom';
import Logo from  '../../Assets/images/logo-small-white.png';

function ChatSidebar() {
  return (
    <div className='chat-sidebar'>
       <aside>
       <div className="mb-2 ed-space"> 
           <Link to='/newsfeed' >
          <div className='bg-main-light logo-menu'>
              <img loading="lazy" role="presentation" src={Logo} alt="eduallsys" />
          </div>
          </Link>
            <button className="btn">
                 <BiCalendar/> Agendar reunião
            </button>
        </div>
        <hr />
      <section>
      <ul className="chat-sidebar-icons">
            <li className='bg-gold'><BsCalendarDate/></li>
            <li className='bg-green'><BsTelephone/></li>
            <li className='bg-red'><RiGalleryLine/></li>
            <li className='bg-blue-light'><BiGroup/></li>
        </ul> 
      </section>
       </aside>
      <aside>
      <section>
        <div className="ed-space title-area">
            <div><h1>Paginas</h1></div>
            <div className='add-icon'> <BiPlusCircle /></div>
        </div>
        <ul className="channels-list">
           <li className="ed-space non-readed-messages">
               <div className="ed-flex">  
                   <div className="icon"><BiGroup/></div>
                   <span className="ml-2">Colegio itamar</span>
               </div>
               <div className="count bg-danger">2</div>
           </li>
           <li className="ed-space non-readed-messages">
               <div className="ed-flex">  
                   <div className="icon"><BiGroup/></div>
                   <span className="ml-2">Colegio itamar</span>
               </div>
               <div className="count bg-danger">2</div>
           </li>
           <li className="ed-space">
               <div className="ed-flex">  
                   <div className="icon"><BiGroup/></div>
                   <span className="ml-2">Colegio itamar</span>
               </div>
           </li>
           <li className="ed-space non-readed-messages">
               <div className="ed-flex">  
                   <div className="icon"><BiGroup/></div>
                   <span className="ml-2">Colegio itamar</span>
               </div>
               <div className="count bg-danger">2</div>
           </li>
           <li className="ed-space ">
               <div className="ed-flex">  
                   <div className="icon"><BiGroup/></div>
                   <span className="ml-2">Colegio itamar</span>
               </div>
               <div className="count bg-danger">2</div>
           </li>
           <li className="ed-space">
               <div className="ed-flex">  
                   <div className="icon"><BiGroup/></div>
                   <span className="ml-2">Colegio itamar</span>
               </div>
           </li> 
        </ul>
        <hr />
    </section>
     <section>
         <div className="ed-space title-area">
             <div><h1>Grupos</h1></div>
             <div className='add-icon'> <BiPlusCircle /></div>
         </div>
         <ul className='groups-list'>
            <li className="ed-space">
               <div className="ed-flex">
               <AvatarGroup max={3} sx={{ '& .MuiAvatar-root': { width: 35, height: 35, fontSize: 13 }}}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                    <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                    <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                    <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                </AvatarGroup>
                <span>Trabalho de fisica</span>
               </div>
            </li>
            <li className="ed-space non-readed-messages">
              <div className="ed-flex">
              <AvatarGroup max={3} sx={{ '& .MuiAvatar-root': { width: 35, height: 35, fontSize: 13 }}}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                    <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                    <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                    <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                </AvatarGroup>
                <span>Reunião dos c...</span>
              </div>
              <div className="count bg-danger">1</div>
            </li> 
         </ul>
         <hr />
     </section>
     <section>
        <div className="ed-space title-area">
            <div><h1>Mensagens diretas</h1></div> 
        </div>
        <ul className="direct-messages">
           <li className='non-readed-messages'>
                <div className="dot"></div>
                <span>Melaine meuri</span>
           </li>
           <li>
                <div className="dot"></div>
                <span>Melaine meuri</span>
           </li>
           <li className='non-readed-messages'>
                <div className="dot"></div>
                <span>Melaine meuri</span>
           </li>
        </ul>
     </section>
      </aside>
    </div>
  )
}

export default ChatSidebar
