import { CallEnd, Mic, VolumeDown } from '@material-ui/icons'; 
import { CameraFront } from '@mui/icons-material';
import { Avatar } from '@mui/material'
import React from 'react'
import { useState } from 'react';
import Picture from '../Assets/images/avatars/avatar-0.jpg';


function UserVoiceCall() {
  const [windowWidth, setWindowWidth] = useState();

  setInterval(() => {
    setWindowWidth(window.innerWidth)
  }, 1000);


  return (
    <div className="bg-main call_user">
           <div className="video-box">
                <video  muted loop autoPlay className='main-video'></video>
                <div className="current-user-video">
                      <video muted loop autoPlay></video>  
                </div> 
           </div>
           <div className="call-user-over">
           <div className="call_user-volume-control">
              <input type="range"  id="#" />
              <button className="volume-status">
                   <VolumeDown/>
              </button>
           </div>
          <div className="call_user-block"> 
               <Avatar sx={ windowWidth >= 800 ? { width:300, height:300 } : { width:150, height:150 }} src={Picture} alt="kiosso"  />
               <div className="call-status-label">Ligando ....</div>
          </div>
          <div className="bottom-buttons"> 
               <button className=''>
                   <Mic />
               </button>
               <button className='bg-red'>
                    <CallEnd/>
               </button>
               <button className=''>
                     <CameraFront/>
               </button>
          </div>
           </div>
    </div>
  )
}


export default UserVoiceCall