import { AttachFile, CallEnd, Mic, VideoCall, VideoCallOutlined, VolumeDown } from '@material-ui/icons'; 
import { CameraFront, Monitor } from '@mui/icons-material';
import { Avatar } from '@mui/material'
import React from 'react'
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReduceTextLength from './components/ReduceTextLength';

const Icon =  require('../Assets/images/icons/youtube.png');

const Videos = [
    "",
   "",
    ""
]

const Picture = [
    require('../Assets/images/covers/img_4.jpg'),
    require('../Assets/images/covers/img_11.jpg'),
    require('../Assets/images/covers/img_3.jpg'),
    require('../Assets/images/avatars/avatar-0.jpg'),
    require('../Assets/images/logo.png'),
]


function Play(){ 
    let video = document.querySelector(".main-video");
    video.play();
}


function VideoChat() {
  return (
    <div className="video-chat"> 
             <section className="participants-videos"> 
                <div className="header bg-main">
                  
                    <div className="total-participants">
                          <h4><div className="dot bg-green"></div> 12 partcipantes</h4>
                    </div>
                 </div>
                 <div className="list-scroll">
                 <article className="prt-box">
                    <video src={Videos[0]} poster=""></video>
                    <div className="prt-box-over">
                          <div className="top-box-over">
                               <div className="name">Carlos pedro</div>
                          </div>
                          <div className="bottom-box-over">
                              <div className="btn-sound"><Mic/></div>
                              <div className="btn-video"><VideoCall/></div>
                          </div>
                    </div>
                </article>
                 </div>
           </section> 
        <div className="chat-video-container">
            <video src={Videos[1]}  autoPlay={true} muted  className='main-video'></video>
            <div className="chat-video-container-over">
                <div className="top-controls"> 
                    <div className="current-user-box">
                        <video src={Videos[2]} autoPlay poster={Picture[3]} muted> </video>
                        <div className="controls">
                                
                        </div>
                    </div> 
                </div>
                <div className="chat-over-messages">
                     <ul>
                        <li className="chat-message-box">
                           <div className="avatar">
                              <Avatar alt="" sx={{width:40, height:40}} />
                           </div>
                            <div className="msg-box">
                                 <div className="ed-space">
                                    <div className="name">Sara</div>
                                    <div className="time"><small>10:15</small></div>
                                 </div>
                                 <div className="text">
                                    hi can i make some questions ?  i don't realy understand how did you made that thinh work like that.
                                 </div>
                            </div>
                        </li>
                        <li className="chat-message-box">
                           <div className="avatar">
                              <Avatar alt="" sx={{width:40, height:40}} />
                           </div>
                            <div className="msg-box">
                                 <div className="ed-space">
                                    <div className="name">Carlos</div>
                                    <div className="time"><small>10:15</small></div>
                                 </div>
                                 <div className="text">
                                      Mi mama sad yes  😎😃😎🙄
                                 </div>
                            </div>
                        </li>
                        <li className="chat-message-box">
                           <div className="avatar">
                              <Avatar alt="" sx={{width:40, height:40}} />
                           </div>
                            <div className="msg-box">
                                 <div className="ed-space">
                                    <div className="name">Carlos</div>
                                    <div className="time"><small>10:15</small></div>
                                 </div>
                                 <div className="text">
                                      Hi have👽🐱‍👓 some files
                                      <div className="ed-link-preview">
                                      <Link target='_blank' to='#'>
                                        <div className="ed-link-header">
                                            <img loading="lazy" role="presentation" src={Picture[1]} alt="#" />
                                        </div>
                                        <div className="ed-link-body">
                                                <h2>Mastery with fullstack Bootcamp cloning the world 15 top  apps.</h2>
                                                <small>
                                                    <ReduceTextLength text='You will learn how to build a whole applications  like Zoom,    Skype, Jitsi,  netflix , spotify facebook...' />
                                                </small>
                                                <div className="ed-flex">
                                                    <div className="icon">
                                                    <img loading="lazy" role="presentation" src={Icon} alt="" />
                                                    </div>
                                                    <span><ReduceTextLength text='https://therealdeveloper.io' /></span>
                                                </div>
                                            </div>
                                        </Link>
                                      </div>
                                 </div>
                            </div>
                        </li>
                        <li className="chat-message-box">
                           <div className="avatar">
                              <Avatar alt="" sx={{width:40, height:40}} />
                           </div>
                            <div className="msg-box">
                                 <div className="ed-space">
                                    <div className="name">Katia</div>
                                    <div className="time"><small>10:15</small></div>
                                 </div>
                                 <div className="text">
                                     It's sunday let's chill out guys 🤩✨
                                      <div className="single-image">
                                            <img loading="lazy" role="presentation" src={Picture[2]} alt="" />
                                      </div>
                                 </div>
                            </div>
                        </li> 
                     </ul>
                     <div className="chat-form">
                          <Form>
                               <Form.Control placeholder='Escreva qualquer coisa' />
                               <div className="assets">
                               <div className="emoji-box">
                                    <button className="toggle-emoji-box">😀</button>
                               </div>
                               <label htmlFor="chat-video-files"><button><AttachFile/></button></label>
                               <input type="file" hidden id="chat-video-files" />
                               </div>
                          </Form>
                     </div>
                </div>
                <div className="bottom-controls">
                   <div className="buttons">
                       <button className='volume-btn'>
                            <Mic />
                        </button>
                        <button className='bg-red'>
                            <CallEnd/>
                        </button>
                        <button className='share-screen-btn'>
                            <Monitor/>
                        </button>
                        <button className='video-btn'>
                            <VideoCallOutlined/>
                        </button>
                   </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default VideoChat