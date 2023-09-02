import React from 'react'
import ChatHeader from './Components/ChatHeader'
import ChatForm from './Components/ChatForm';
import { Avatar } from '@mui/material';



const Messages = [
  {user:0, message:" I want a white container with chat bubbles masked to a gradient that when scrolled will change with the gradient below" },
  {user:1, message:" I want a whitescrolled will change with the gradient below" },
  {user:0, message:" I want a whi dient that when scrolled will change with the gradient below" },
  {user:1, message:" I want a white container with chat bubbles masked to a gradient that when scrolled will change with the gradient below" },
  {user:0, message:" I want a white container " },
  {user:1, message:" I want a white container with chat bubbles masked to a gradient that when scrolled will change with the gradient below" },
  {user:1, message:" I want a white container with chat bubbles masked to a gradient " },
  {user:0, message:" I want a white container with chat bubbles masked to a gradient that when scrolled will change with the gradient below" },
  {user:1, message:" I want a white container with chat bubbles masked to a gradient that when scrolled will change with the gradient below" },
  {user:0, message:" I want a white container with chat bubbles" },
  {user:1, message:" I want a white container with chat bubbles masked to a gradient that when scrolled will change with the gradient below" },
  {user:1, message:" I want a white  scrolled will change with the gradient below" },
  {user:0, message:" I want a white container with chat bubbles masked to a gradient that when scrolled will change with the gradient below" },
  {user:0, message:" I want a white container with chat bubbles masked to a gradient that when scrolled will change with the gradient below" },
  {user:1, message:" I want a white container with chat bubbles masked to a gradient that when scrolled will change with the gradient below" },
  {user:0, message:" I want a white contain crolled will change with the gradient below" },
  {user:1, message:" I want a white container with chat bubbles masked to a gradient that when scrolled will change with the gradient below" },
  {user:0, message:" I want a white container with chat bubbles masked to a gradient that when scrolled will change with the gradient below" },
  {user:1, message:" I want a white container the gradient below" },
  {user:1, message:" I want a white container with chat bubbles masked to a gradient that when scrolled will change with the gradient below" },
  {user:0, message:" I want a white container with chat below" },
  {user:1, message:" I want a white container with chat bubbles masked to a gradient that when scrolled will change with the gradient below" },
  {user:0, message:" I want a white container with chat bubbles masked to a gradient that when scrolled will change with the gradient below" },
  {user:1, message:" I want a white container with chat bubbles masked to a gradient that when scrolled will change with the gradient below" },
  {user:1, message:" I want a  a gradient that when scrolled will change with the gradient below" },
  {user:0, message:" I want a white container with chat bubbles masked to a gradient that when scrolled will change with the gradient below" },
]



function ChatMessages() {
  return (
    <div className='chat-messages-area'>
         <ChatHeader />  
            <ul className="messages-area">
                {Messages.map((msg, index)=>{
                  return(
                      <li key={index} className={msg.user === 1  ? "me" : "other"} >
                          <div className="msg-box">
                              <div className="avatar">
                                 <Avatar sx={{width:40,height:40}} />
                              </div>
                              <div className="msg-content">
                                  <div className="ed-space">
                                  {msg.user === 1  ? <div></div> : <div className="name">Sara</div>} 
                                <div className="time">4:12 PM</div>
                              </div>
                                  <div className="content">
                                      <p> {msg.message}</p>
                                  </div>
                                  <div className="msg-status"></div>
                              </div>
                          </div>
                      </li>
                    )
                })}
            </ul>  
         <ChatForm/>
    </div>
  )
}

export default ChatMessages
