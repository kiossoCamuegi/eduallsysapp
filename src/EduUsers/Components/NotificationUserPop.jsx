import { Settings } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import React, {useState, useEffect} from 'react'
import {Form, Offcanvas} from 'react-bootstrap' 
import { Link } from 'react-router-dom';
import iconFile from '../../Assets/images/icons/adobe.png';

function NotificationUserPop(props) {
 
const [show, setShow] = useState(false); 
const handleClose = () => setShow(false);
const handleShow = () => setShow(true); 

const [ToggleState, setToggleState] = useState(1);

const toggleTab = (index)=>{ 
    setToggleState(index);  
 }



  return (
    <>
        <div>
        <a className='switchTheme'><li onClick={handleShow} className="me-2">{props.Toggle}</li></a>
        <Offcanvas placement='end' id="offcanvasRight" className="modal-notifications" show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Noticações</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
              <div className="notification-tabs-header">
                <div className="ed-space">
                    <div><a href="#" className="update-notification-status">Marcar todas como lidas</a></div>
                   <div> 
                       <Link to='' className='settings-icon'><Settings/></Link>
                   </div>
                </div>
                  <div className="ed-flex">
                      <li className={ToggleState === 1 ? "active" : ''}  onClick={()=> toggleTab(1)}>Geral<div className="count">45</div></li>
                      <li className={ToggleState === 2 ? "active" : ''}  onClick={()=> toggleTab(2)}>Ficheiros<div className="count">28</div></li>
                      <li className={ToggleState === 3 ? "active" : ''}  onClick={()=> toggleTab(3)}>Pessoas <div className="count">13</div></li>
                   </div>
                </div>
                <div className="notification-tabs-body">
                      <section  className={ToggleState === 1 ? "tab-box active" : 'tab-box'}>
                          <ul>
                              <li className="unreaded">
                                  <Avatar alt="name here" src="" sx={{ width:35, height:35 }}/>
                                  <div className="block">
                                        <div className="name">Carla 
                                          <span> 
                                              juntou-se a 
                                              <strong><Link to="">Reunião dos ...</Link> </strong>
                                            </span>
                                        </div>
                                        <div className="flex small-info">
                                           <span>2 horas atras</span>
                                           <div className="type"><div className="dot"></div>Professores</div>
                                       </div>
                                  </div>
                              </li>
                              <li className="unreaded">
                                  <Avatar alt="name here" src="" sx={{ width:35, height:35 }}/>
                                  <div className="block">
                                        <div className="name">Carla 
                                          <span> 
                                              juntou-se a 
                                              <strong><Link to="">Reunião dos ...</Link> </strong>
                                            </span>
                                        </div>
                                        <div className="flex small-info">
                                           <span>2 horas atras</span>
                                           <div className="type"><div className="dot"></div>Professores</div>
                                       </div>
                                  </div>
                              </li>
                              <li>
                                  <Avatar alt="name here" src="" sx={{ width:35, height:35 }}/>
                                  <div className="block">
                                        <div className="name">Carla
                                          <span> 
                                              juntou-se a 
                                               <strong><Link to="">Reunião dos ...</Link> </strong>
                                            </span>
                                        </div>
                                       <div className="flex small-info">
                                           <span>2 horas atras</span>
                                           <div className="type"><div className="dot"></div>Professores</div>
                                       </div>
                                       <div className="flex bottom">
                                          <button>Aceitar</button>
                                          <button>Negar</button>
                                       </div>
                                  </div>
                              </li>
                              <li>
                                  <Avatar alt="name here" src="" sx={{ width:35, height:35 }}/>
                                  <div className="block">
                                        <div className="name">Carla
                                          <span> 
                                              juntou-se a 
                                               <strong><Link to="">Reunião dos ...</Link> </strong>
                                            </span>
                                        </div>
                                       <div className="flex small-info">
                                           <span>2 horas atras</span>
                                           <div className="type"><div className="dot"></div>Professores</div>
                                       </div>
                                       <div className="asset">
                                             <div className="ed-flex">
                                                  <img loading="lazy" role="presentation" src={iconFile} alt="" />
                                                  <span>website_portofolio <strong>2GB</strong></span>
                                             </div>
                                       </div> 
                                  </div>
                              </li>
                          </ul>
                      </section>
                      <section  className={ToggleState === 2 ? "tab-box active" : 'tab-box'}>
                            <ul>
                            <li>
                                  <Avatar alt="name here" src="" sx={{ width:35, height:35 }}/>
                                  <div className="block">
                                        <div className="name">Carla
                                          <span> 
                                              juntou-se a 
                                               <strong><Link to="">Reunião dos ...</Link> </strong>
                                            </span>
                                        </div>
                                       <div className="flex small-info">
                                           <span>2 horas atras</span>
                                           <div className="type"><div className="dot"></div>Professores</div>
                                       </div>
                                       <div className="flex bottom">
                                          <button>Aceitar</button>
                                          <button>Negar</button>
                                       </div>
                                  </div>
                              </li>
                            </ul>
                      </section>
                      <section  className={ToggleState === 3 ? "tab-box active" : 'tab-box'}>
                           <ul>
                           <li>
                                  <Avatar alt="name here" src="" sx={{ width:35, height:35 }}/>
                                  <div className="block">
                                        <div className="name">Carla
                                          <span> 
                                              juntou-se a 
                                               <strong><Link to="">Reunião dos ...</Link> </strong>
                                            </span>
                                        </div>
                                       <div className="flex small-info">
                                           <span>2 horas atras</span>
                                           <div className="type"><div className="dot"></div>Professores</div>
                                       </div>
                                       <div className="flex bottom">
                                          <button>Aceitar</button>
                                          <button>Negar</button>
                                       </div>
                                  </div>
                              </li>
                           </ul>
                      </section>
             </div> 
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </>
  )
}

export default NotificationUserPop