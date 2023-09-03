import { BookOutlined,  ErrorOutline,  HomeOutlined, MailOutlineRounded, NotificationsNoneRounded, } from '@material-ui/icons';
import { CurrencyPoundOutlined, QuizOutlined} from '@mui/icons-material';
import { Avatar, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import jwt_decode from 'jwt-decode';  
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';


import {GoBell} from "react-icons/go";
import {BsJournalBookmark, BsChat, BsCollectionPlay, BsHouse, BsQuestionCircle, BsCalendarEvent,   } from "react-icons/bs";


import { Link } from 'react-router-dom';
import styled from 'styled-components'
import Logo from  '../../Assets/images/logo-small-white.png';
import { deepOrange } from '@material-ui/core/colors'; 
import NotificationUserPop from './NotificationUserPop';
import NavbarSearchForm from './NavbarSearchForm';
import Hoot from '../../General/components/Hoot';




import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';  
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import ReduceTextLength from '../../General/components/ReduceTextLength';





function UserNavbar({data}) {
  const [UserData, setUserData] = useState({});  
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const DATA_URL = [
     Hoot()+'eduallsingleuserdata/get/',
     Hoot()+'token'
  ];

  async function loadData(){  
      setUserData({
          email:data.user_Information.ed_user_account_email,
          phone:data.user_Information.ed_userphone,
          picture:Hoot()+data.user_Information.ed_user_account_picture,
          code:data.user_Information.ed_user_account_id,
          name:data.user_Information.ed_user_account_name,
          color:data.user_Information.ed_user_account_detAvatarColor,
          fisrtlastname:data.user_Information.ed_user_account_name.split(' ')[0] + ' '+  data.user_Information.ed_user_account_name.split(' ')[data.user_Information.ed_user_account_name.split(' ').length -1],
          lettername:data.user_Information.ed_user_account_name.split(' ')[0].split('')[0].toUpperCase()+data.user_Information.ed_user_account_name.split(' ')[data.user_Information.ed_user_account_name.split(' ').length -1].split('')[0].toUpperCase()
      }); 
 };
  
  useEffect(()=>{
    loadData(); 
   console.log(data.user_Information);
  },[]);
  
  

  return (
    <NavbarMenu>
         <menu className="ed-flex">
         <Link to='/newsfeed' >
          <div className='bg-main-light logo-menu'>
              <img loading="lazy" role="presentation" src={Logo} alt="eduallsys" />
          </div>
          </Link>
          <div>
              <NavbarSearchForm userCode={UserData.code}/>
          </div>
        </menu>
        <menu className="ed-flex navbar-links">
             <Link to='/newsfeed'><BsHouse />Noticias</Link>
             <Link to='/learning'><BsCollectionPlay />Cursos</Link>
             <Link to='/forum'><BsQuestionCircle />Forum</Link>
             <Link to='/virtual_library'><BsJournalBookmark/>Livraria</Link>
             <Link to='/events'><BsCalendarEvent/>Eventos</Link>
        </menu>
        <menu className='ed-flex'>
            <ul>
               <NotificationUserPop Toggle={ 
                  <li>
                      <GoBell/>
                      <div className="count bg-danger">+99</div> 
                  </li>
               }/>
              <Link to="/chat">
                 <li>
                    <BsChat/>
                     <div className="count bg-danger">+99</div>
                  </li>  
              </Link>
            </ul>
            <Link className='ml-2' to='#'>


            <IconButton  onClick={handleClick}  size="small"  sx={{ ml: 2 }} aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true" aria-expanded={open ? 'true' : undefined} >
              <Avatar  src={UserData.picture} alt={UserData.lettername} sx={{width:40,height:40,bgcolor:UserData.color}}>{UserData.lettername}</Avatar>
             </IconButton> 
              <Menu  anchorEl={anchorEl} id="account-menu"  open={open}  onClose={handleClose} onClick={handleClose}
               PaperProps={{
          elevation: 0,
          style: {
            maxHeight: 400,
            width: '300px',
          },
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }} >
             <Link to="/profile" className='text-dark'>
               <MenuItem onClick={handleClose}> 
                  <Avatar  src={UserData.picture} alt={UserData.lettername} sx={{bgcolor:UserData.color}} /> {UserData.fisrtlastname}
               </MenuItem> 
            </Link>
            <Divider />
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <PersonAdd fontSize="small" />
              </ListItemIcon>
               Adicionar nova conta
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Configurações
            </MenuItem>

            
            <MenuItem >
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
               Terminar sessão
            </MenuItem>  


  
          </Menu>
        </Link>
      </menu>
  </NavbarMenu> 
  )
}



const NavbarMenu = styled.div`
    width:100%;
    height:70px; 
    position:fixed;
    z-index:1000; 
    top:0px;
    left:0px;
    padding:0px; 
    display:flex;
    align-items:center;
    background:var(--ed-white);
    justify-content:space-between;  
    box-shadow:var(--ed-shadow-df);

    input{
        border:none !important;
    }


    .logo-menu{
      min-width:45px;
      width:45px;
      height:45px;
      border-radius:6px;
      display:flex;
      align-items:center;
      justify-content:center;

         img{
             width:26px;
             height:26px;
             margin:0px;
         }
    }

    menu { 
      margin:0px !important; 
      padding:10px 20px;
      align-items:center;
      height:100%;

    ul{
      display:flex;
      align-items:center;
      padding:0px;
      margin:0px !important;
    }

      ul li {
          position:relative;
          margin-left:30px;
          list-style:none;
          cursor:pointer;

          svg{
            width:20px;
            height:20px;
            fill:var(--dark);
          }

          .count{
            padding:3px 5px;
            border-radius:20px;
            position: absolute;
            top:-10px;
            left:10px;
            font-size:11px;
            font-weight:400;
            color:var(--ed-white);
            background:var(--danger);
          }
      }
      
   
    }
 
    .navbar-links a{
      margin:0px 10px;
      color:var(--dark);
      font-size:17px;
      display:flex;
      align-items:center;
      font-weight:500;

      svg{
        fill:var(--dark);
        margin-right:5px;
      }
    }


`; 
export default UserNavbar