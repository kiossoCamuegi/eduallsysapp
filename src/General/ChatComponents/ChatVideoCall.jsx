import React from 'react';
import {BsCameraVideoFill, BsCameraVideoOffFill} from "react-icons/bs";
import {ImPhoneHangUp} from "react-icons/im";
import {FaMicrophone, FaMicrophoneSlash} from "react-icons/fa";
import { Avatar } from '@mui/material';

 
function ChatVideoCall() {
  return (
    <div className='chat-video-call d-none'>
        <div className="main-video-chat-user">
            <video src="" poster='https://images.squarespace-cdn.com/content/v1/55b254a0e4b0311bbf89923a/1519052590913-KHA34LFRILWHHZ40TUPW/FDC78573-A965-42E0-B415-A45ECDEB284C.jpg' ></video>
        </div>
      <div className="chat-video-content">
      <div className="chat-video-header">
            <div className="ed-space">
                <div className="ed-block">
                    <h1>Sara miller</h1>
                    <small>estados unidos da america</small>
                </div>
                <div className="time">04:34 PM</div>
            </div>
        </div>
        <div className="chat-video-share-screen">

        </div>
        <div className="chat-video-options">
           <div className="chat-video-users">
            <div className="avatar"><Avatar sx={{width:60,height:60}}  /></div>
            <div className="avatar"><Avatar sx={{width:60,height:60}}  /></div>
            <div className="avatar"><Avatar sx={{width:60,height:60}}  /></div>
           </div>
           <div className="chat-video-controls">
              <button className="btn btn-video"><BsCameraVideoFill/> </button>
              <button className="btn btn-call"><ImPhoneHangUp/> </button>
              <button className="btn btn-mic"><FaMicrophone/> </button>
           </div>
        </div>
      </div>
    </div>
  )
}

export default ChatVideoCall
