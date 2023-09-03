import { BookOutlined,  ErrorOutline,  HomeOutlined, MailOutlineRounded, NotificationsNoneRounded, } from '@material-ui/icons';
import { CurrencyPoundOutlined, QuizOutlined} from '@mui/icons-material';
import { Avatar } from '@mui/material';
import React from 'react'

import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';

import { Link } from 'react-router-dom';
import styled from 'styled-components'
import Logo from  '../../../Assets/images/logo-small-white.png';
import { deepOrange } from '@material-ui/core/colors'; 
import NavbarSearchForm from '../../Components/NavbarSearchForm';
import NotificationUserPop from '../../Components/NotificationUserPop';
const AvatarImg =  require('../../../Assets/images/avatars/avatar-7.jpg')

function NavbarStudent() {
  return ( 
    <NavbarMenu>
        <menu className="ed-flex">
          <div className='bg-main logo-menu'>
            <Link to='/newsfeed' >
                 <img loading="lazy" role="presentation" src={Logo} alt="eduallsys" />
             </Link>
          </div>
          <div>
              <NavbarSearchForm/>
          </div>
        </menu>
        <menu className="ed-flex navbar-links">
             <Link to='/newsfeed'><HomeOutlinedIcon /> Noticias</Link>
             <Link to='mymarks'><FactCheckOutlinedIcon /> Notas</Link>
             <Link to='mypayments'><PaidOutlinedIcon/> Pagamentos</Link>
             <Link to='studycontent'><BookOutlined/> Material didático</Link>
             <Link to='/myclasscalls'><ErrorOutline/> Chamadas</Link>
        </menu>
        <menu className='ed-flex'>
            <ul>
               <NotificationUserPop Toggle={ 
                  <li>
                      <NotificationsNoneRounded/>
                      <div className="count bg-danger">+99</div> 
                  </li>
               }/>
              <Link to="/chat">
                 <li>
                    <MailOutlineRounded/>
                     <div className="count bg-danger">+99</div>
                  </li>  
              </Link>
            </ul>
            <Link className='ml-2' to='/profile'>
                <Avatar  sx={{width:40,height:40,bgcolor: deepOrange[500]}}  src={AvatarImg} alt=''>CP</Avatar>
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
          margin-right:30px;
          list-style:none;
          cursor:pointer;

          svg{
            width:27px;
            height:27px;
            fill:var(--dark);
          }

          .count{
            padding:3px 10px;
            border-radius:20px;
            position: absolute;
            top:-14px;
            left:12px;
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

      svg{
        fill:var(--dark);
        margin-right:5px;
      }
    }


`; 


export default NavbarStudent