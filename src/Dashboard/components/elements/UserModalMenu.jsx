import React, {useEffect, useState} from 'react'
import {Form, Offcanvas} from 'react-bootstrap' 
import StyleBadge from './StyleBadge';
import UserImage from "../../../Assets/images/avatars/avatar-1.jpg";
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import { Link, useNavigate } from 'react-router-dom';
import Hoot from '../../../General/components/Hoot';
import axios from "axios";
import styled from 'styled-components';
import { Avatar, AvatarGroup } from '@mui/material';
import AvatarImg from '../../../Assets/images/avatars/avatar-6.jpg'; 
import { Camera, Dashboard, DashboardOutlined, Lock, LockOutlined, SettingsOutlined } from '@material-ui/icons';
import { CameraOutlined, ChangeCircle, HandshakeOutlined, HandshakeRounded, LogoutTwoTone, SettingsApplicationsTwoTone, TaskAltOutlined } from '@mui/icons-material';
 import { UserAccountData } from '../../../General/components/UserAccountData';
import { GetInstituteCode } from '../../../General/components/InstituteData';
import RandomAvatarColor from '../../../General/components/RandomAvatarColor';
import KeyShortcut from '../../../General/components/KeyShortcut';
import KeyDownEvent from '../../../General/components/KeyDownEvent';
import Logout from '../../../General/components/Logout';
let ImageSize = {width:40, height:40};

function UserModalMenu({data}) {

const [show, setShow] = useState(false); 
const handleClose = () => setShow(false);
const handleShow = () => setShow(true); 

  const userdata = data.user_Information;

if(userdata !== null) {  
        const CurrentUsername = userdata.ed_user_account_name.split(' ').length < 1 ?  userdata.ed_user_account_name.split(' ')[0]  : 
        (userdata.ed_user_account_name.split(' ')[0] + ' '+  userdata.ed_user_account_name.split(' ')[userdata.ed_user_account_name.split(' ').length -1]);

        const firstLastLetter = userdata.ed_user_account_name.split(' ').length < 1 ? userdata.ed_user_account_name.split(' ')[0] :
        (userdata.ed_user_account_name.split(' ')[0].split('')[0].toUpperCase()+userdata.ed_user_account_name.split(' ')[userdata.ed_user_account_name.split(' ').length -1].split('')[0].toUpperCase()); 
 
       return (
         <div>   
           <li onClick={handleShow} className="ed-flex me-2 user-menu-avatar ">
               <StyleBadge size={ImageSize} source={Hoot()+userdata.ed_user_account_picture}   alt=''/>
               <ArrowDropDownRoundedIcon/>
           </li> 
         <Offcanvas placement='end' id="offcanvasRight" show={show} onHide={handleClose}> 
           <Offcanvas.Body>
              <ProfileMenu>
                 <ProfileBox className='bg-blue'>
                      <div className='avatarimage'>
                         <Link to='/managerprofile'>
                            <Avatar src={Hoot()+userdata.ed_user_account_picture}  sx={{width:70,height:70}} alt={CurrentUsername}>{firstLastLetter}</Avatar>
                         </Link>
                       </div>
                      <Link to='/managerprofile'>
                       <div className="ed-block">
                           <h1> { CurrentUsername }   </h1>
                           <span>{ userdata.ed_user_account_email }</span>
                      </div>
                      </Link>
                      <div className="float-icon">
                           <button><SettingsOutlined /></button>
                      </div>
                 </ProfileBox>
                 <Logout toggle_btn={ <li  className="#">
                    <div className="icon"><LogoutTwoTone/></div> Terminar sessão
                   </li>}/>
                  <div className="d-none">
                  <li>
                        <div className="icon"><DashboardOutlined /></div> Alterar meu dashboard
                     </li>
                     <li>
                        <div className="icon"><LockOutlined/></div>Definições de acesso
                     </li>
                     <li>
                           <div className="icon"><CameraOutlined /> </div>Minhas operações
                     </li>
                     <li>
                           <div className="icon"><HandshakeOutlined /> </div> Solicitações
                     </li>
                     <li>
                           <div className="icon"><TaskAltOutlined /> </div> Minhas tarefas
                     </li>
                     <h1>Usúarios online</h1>
                        <div className="mb-3">
                        <AvatarGroup max={7}  sx={{width:320, height:30}}>
                              <Avatar style={{background:`${RandomAvatarColor()}` , marginRight:10}} />
                              <Avatar style={{background:`${RandomAvatarColor()}` , marginRight:10}}  />
                              <Avatar style={{background:`${RandomAvatarColor()}` , marginRight:10}}  />
                              <Avatar style={{background:`${RandomAvatarColor()}` , marginRight:10}}  />
                              <Avatar style={{background:`${RandomAvatarColor()}` , marginRight:10}}  />
                              <Avatar style={{background:`${RandomAvatarColor()}` , marginRight:10}}  />
                              <Avatar style={{background:`${RandomAvatarColor()}` , marginRight:10}}  />
                              <Avatar style={{background:`${RandomAvatarColor()}` , marginRight:10}}  />
                        </AvatarGroup>
                        </div>
                     <h1>Trocar de conta</h1>
                     <ol>
                        <li onClick={()=>Logout("felizardajose@gmail.com")}>
                           <Avatar style={{background:`${RandomAvatarColor()}`}} src="" alt="#" />
                           <span>Carlos mendonça</span>
                        </li>
                        <li onClick={()=>Logout("838")}>
                           <Avatar style={{background:`${RandomAvatarColor()}`}} src="" alt="#" />
                           <span>Carlos mendonça</span>
                        </li>
                        <li onClick={()=>Logout("838")}>
                           <Avatar style={{background:`${RandomAvatarColor()}`}} src="" alt="#" />
                           <span>Carlos mendonça</span>
                        </li>
                        <li onClick={()=>Logout("838")}>
                           <Avatar style={{background:`${RandomAvatarColor()}`}} src="" alt="#" />
                           <span>Carlos mendonça</span>
                        </li>
                     </ol>
                  </div>
              </ProfileMenu>
           </Offcanvas.Body>
         </Offcanvas>
       </div>
       ); 
  }  

}



const ProfileMenu = styled.ul`
    padding:0px; 
    max-height:88vh;
    overflow-y:auto; 
    padding-right: 10px; 


   &::-webkit-scrollbar{
      width:6px;
      background-color:transparent;
   }

   &::-webkit-scrollbar-thumb{
      background:rgb(219, 219, 219); 
   }
   
   li{
      cursor:pointer;
      padding:10px 20px;
      border-radius:6px;
      margin:15px 0px;
      font-size:16px;
      display:flex;
      align-items:center;
      min-height:50px;
      color:var(--ed-dark); 
      border:1px solid var(--ed-white-smoke);
   

      .icon{
      
         svg{
           margin-right:10px;
        }}
   }

    h1{
      margin-bottom:20px;
      font-size:20px;
      margin-top:30px;
    }

   ol{
      padding:0px;
      margin:20px 0px;

      li{
         display:flex;
         align-items:center;

          span{
            margin-left:20px;
          }
      }
   }
`;

const ProfileBox = styled.div`
    padding:10px;
    min-height:100px;
    margin:20px 0px; 
    border-radius:6px;
    border:1px solid var(--ed-white-smoke);
    display:flex;
    align-items:center;
    position:relative;

    &::after{
      content:"";
      position:absolute;
      top:-20px;
      right:10px;
      z-index:1;
      width:50px;
      height:50px;
      border-radius:100%;
      background:var(--ed-white); 
    }

    .avatarimage{
      background:var(--ed-white);
      border:3px solid var(--ed-white);
      box-shadow:var(--ed-shadow-df);
      border-radius:100%;
    }

   .ed-block{
     padding-left:15px;
     padding-top:5px;
     color:var(--ed-white);

    h1{
      margin:0px;
      font-size:18px;
    }

    span{
        font-size:13px;
        font-weight:500;
    }
   }

    .float-icon{
      position:absolute;
      top:-15px;
      right:15px;
      z-index:1000;

       button{
            padding:4px;
            width:40px;
            height:40px;
            border-radius:100%;
            display:flex;
            align-items:center;
            justify-content:center;
            cursor:pointer;
            background:var(--ed-dark);
            border:2px solid var(--ed-white);
            box-shadow:var(--ed-shadow-df);

            svg{
               fill:var(--ed-white);
            }
       }
    }

`;

export default UserModalMenu