import { Avatar } from '@mui/material'
import React, { useState } from 'react'
import { BiSearch } from 'react-icons/bi';

function ChatHeader(props){
 const [show, setShow] = useState(false);


  return (
    <div className='chat-messages-top'>
       <div className="content ed-space">
       <div className="ed-flex">
            <Avatar sx={{width:50,height:50}} alt="my SharpRe" src="/static/images/avatar/1.jpg" />
            <div className="ed-block">
                 <h1>Carla mateus</h1>
                 <div className="status">
                    <div className="dot"></div>
                    <span>Online</span>
                </div>
            </div>
         </div>
         <div className="menubar">
            <button onClick={()=>setShow(show ? false : true)}><BiSearch/></button> 
         </div>
       </div>
       <div className={show ? "search-form" : "search-form hide"}>
          <input type="text" placeholder='pesquisar...' className="form-control" />
       </div>
    </div>
  )
}

export default ChatHeader
