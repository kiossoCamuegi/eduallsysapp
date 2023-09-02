import React from 'react'
import ChatSidebar from './ChatComponents/ChatSidebar'
import ChatUsers from './ChatComponents/ChatUsers'
import ChatMessages from './ChatComponents/ChatMessages'
import ChatVideoCall from "./ChatComponents/ChatVideoCall"

function Chat() {
  return (
    <div className='ed-chat-container'>
        <ChatSidebar />
        <ChatUsers />
        <ChatMessages/>
        <ChatVideoCall />
    </div>
  )
}

export default Chat
