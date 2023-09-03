import { AccountCircleOutlined, CalendarTodayOutlined, CastForEducationOutlined, FaceOutlined, ForumOutlined, MonetizationOnOutlined } from '@material-ui/icons';
import { AutoStoriesOutlined, CalendarMonthOutlined, FactCheckOutlined, LogoutTwoTone, SummarizeOutlined, TopicOutlined } from '@mui/icons-material';
import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import Logout from '../../../General/components/Logout';

function SidebarLeft() {
 const [activeMenu, SetActiveMenu] = useState(0); 

 const changeCurrentMenu =(e)=>{
      SetActiveMenu(e);
 }

  return (
     <Content>
        <ul>
            <Link to='/profile'>
               <li  onClick={()=>changeCurrentMenu(1)}   className={activeMenu === 1 ? 'active bg-main-light' : ''}><AccountCircleOutlined /></li>
            </Link>
             <Link to='#'>
               <li  onClick={()=>changeCurrentMenu(2)}   className={activeMenu === 2 ? 'active bg-main-light' : ''}><CalendarTodayOutlined /></li>
            </Link>
             <Link to='#'>
               <li  onClick={()=>changeCurrentMenu(3)}   className={activeMenu === 3 ? 'active bg-main-light' : ''}><FaceOutlined /></li>
            </Link>
             <Link to='#'>
               <li  onClick={()=>changeCurrentMenu(4)}   className={activeMenu === 4 ? 'active bg-main-light' : ''}><MonetizationOnOutlined /></li>
            </Link>
             <Link to='#'>
               <li  onClick={()=>changeCurrentMenu(5)}   className={activeMenu === 5 ? 'active bg-main-light' : ''}><ForumOutlined /></li>
            </Link>
             <Link to='#'>
               <li  onClick={()=>changeCurrentMenu(6)}   className={activeMenu === 6 ? 'active bg-main-light' : ''}><FactCheckOutlined /></li>
            </Link>
             <Link to='#'>
               <li  onClick={()=>changeCurrentMenu(7)}   className={activeMenu === 7 ? 'active bg-main-light' : ''}><SummarizeOutlined /></li>
            </Link>
             <Link to='#'>
               <li  onClick={()=>changeCurrentMenu(8)}   className={activeMenu === 8 ? 'active bg-main-light' : ''}><AutoStoriesOutlined /></li>
            </Link>
             <Link to='#'>
               <li  onClick={()=>changeCurrentMenu(9)}   className={activeMenu === 9 ? 'active bg-main-light' : ''}><CastForEducationOutlined /></li>
            </Link>
             <Link to='#'>
               <li  onClick={()=>changeCurrentMenu(10)}   className={activeMenu === 10 ? 'active bg-main-light' : ''}><TopicOutlined /></li>
            </Link> 
        </ul>
        <ul>
            <div className='icon-red'>
               <Logout toggle_btn={<li><LogoutTwoTone /></li>}  />
            </div>
        </ul>
     </Content>
  )
}


const Content = styled.div`
  min-width:80px;
  max-width:80px;
  background:var(--ed-white);
  height:100vh;
  display:flex;
  align-items:center;
  flex-direction:column;
  justify-content:space-between;
  padding:20px 10px;
  padding-top:100px;
  border-right:1px solid #eaeaee;
  position:fixed;
  left:0px;
  top:0px;
  z-index:100;

  ul{
    padding:0px;
    margin:0px;
    display:flex;
    align-items:center; 
    justify-content:center;
    flex-direction:column;

    .icon-red{
        li svg{
            fill:var(--ed-red);
        }
    }

    li.active{
        svg{
            fill:var(--ed-white);
        }   
    }

    li{
        border-radius:100%;
        width:40px;
        min-width:40px;
        height:40px; 
        margin:5px 0px;
        display:flex;
        transition:all 1s ease-in-out;
        cursor:pointer;
        align-items:center; 
       justify-content:center;

       svg{
           width:22px;
           height:22px;
           margin:0px !important;
           fill:var(--ed-blue-dark);
       }
    }
  }
`;

export default SidebarLeft