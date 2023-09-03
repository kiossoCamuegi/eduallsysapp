import React from 'react';
import styled from 'styled-components';
import { Avatar} from '@mui/material';
import { Form } from 'react-bootstrap';
import { BookmarksOutlined,ChatBubbleOutline, CommentOutlined, FavoriteBorder, ForumOutlined, GroupOutlined, HomeOutlined, ImageOutlined, MailOutlineOutlined, NotificationsNoneRounded, Share, ThumbDown, ThumbsUpDownOutlined, ThumbUpSharp, YouTube } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { HeartBrokenOutlined, QuestionMarkRounded, ThumbDownAltOutlined } from '@mui/icons-material';
import { useState } from 'react';

 

function EmployeeMenu(props) {

  const e = localStorage.getItem("CurrentPage");
  const getCurrentPage = Math.floor(JSON.parse(e) ?  e : 1);
  const [CurrentPage, SetCurrentPage] = useState(getCurrentPage);

  const DefineCurrentPage = (e)=>{
       localStorage.setItem("CurrentPage", e);
       SetCurrentPage(e);
  }

  return ( 
    <SidebarLeft>
        <Box className='mb-3'>
            
          {
            !props.profile ?
            <div className="profile-box">
            <Link to='/profile'>
            <div className="ed-flex">
                <Avatar src='' sx={{width:45,height:45}} />
                <h4 className='text-dark'>Carlos manuel pedro</h4>   
            </div>
            </Link> 
            <div className="ed-space">
                <div className="ed-block">
                    <h3>23</h3>
                    <span>Faltas</span>
                </div>
                <div className="ed-block">
                    <h3>182</h3>
                    <span>Avisos</span>
                </div>
                <div className="ed-block">
                    <h3>95</h3>
                    <span>Publicações</span>
                </div>
            </div>
        </div>
        :   
          <div></div>
          }

        <ul>
            <li onClick={()=>DefineCurrentPage(1)} className={CurrentPage === 1 ? 'active' : ''}><Link to='/newsfeed'><HomeOutlined/> Noticias </Link></li> 
            <li onClick={()=>DefineCurrentPage(2)} className={CurrentPage === 2 ? 'active' : ''}><Link to='#'><ForumOutlined/>Forum </Link></li>
            <li onClick={()=>DefineCurrentPage(3)} className={CurrentPage === 3 ? 'active' : ''}><Link to='#'><ChatBubbleOutline/> Descuções </Link></li>
            <li onClick={()=>DefineCurrentPage(4)} className={CurrentPage === 4 ? 'active' : ''}><Link to='/library'><BookmarksOutlined/> Biblioteca </Link></li>
            <li onClick={()=>DefineCurrentPage(5)} className={CurrentPage === 5 ? 'active' : ''}><Link to='#'><GroupOutlined/> Colegas </Link></li>
            <li onClick={()=>DefineCurrentPage(6)} className={CurrentPage === 6 ? 'active' : ''}><Link to='/studentrequests'><HomeOutlined/> Solicitações </Link></li>
            <li onClick={()=>DefineCurrentPage(7)} className={CurrentPage === 7 ? 'active' : ''}><Link to='#'><QuestionMarkRounded/>  Provas </Link></li>
            <li onClick={()=>DefineCurrentPage(8)} className={CurrentPage === 8 ? 'active' : ''}><Link to='#'><NotificationsNoneRounded/> Notificações </Link></li>
            <li onClick={()=>DefineCurrentPage(9)} className={CurrentPage === 9 ? 'active' : ''}><Link to='#'><MailOutlineOutlined/> Mensagens </Link></li>
        </ul>
        </Box> 
    </SidebarLeft> 
  )
}




const SidebarLeft = styled.div`
  width:300px; 
  min-width:300px;
  display:block; 
  position:relative; 
  max-height:95vh;
  overflow-y:auto; 
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;


   @media screen and (max-width:1280px){
       width:25%;
       min-width:25%;
       max-width:25%;  
  }


.profile-box{
    background:var(--ed-background-color);
    border:1px solid whitesmoke;
    padding:15px;
    border-radius:6px;
    margin-bottom:20px;

    .ed-flex h4{
        font-size:15px;
        margin-left:10px;
    }

     .ed-space {
        text-align:center; 
        width:100%;

        .ed-block{
           margin-top:15px;
        }

        .ed-block h3{
           font-size:20px;
           font-weight:600;
        }

        .ed-block span{
            font-size:13px;
            color:var(--grey);
        }
     }
 }

 
 ul{
  margin:20px 0px;
  padding:0px;
  list-style:none;

  li a{
     margin:10px 0px;
     padding:10px 12px;
     display:flex;
     border-radius:6px;
     align-items:center;
      color:var(--ed-dark);
      font-size:16px;

      svg{
        margin-right:10px;
      }
  }

  li:hover a{
      color:var(--ed-purple-light);

      svg{
        fill:var(--ed-purple-light);
      }
  }

  li.active{
     a{
       background:linear-gradient(to right, var(--ed-purple), var(--ed-purple-light));
       color:var(--ed-white);

      svg{
         fill:var(--ed-white);
      }
     }
  }
 }
`;


const Box = styled.div`
    width:98%; 
    border-radius:6px;   
    min-height:200px;
    background:var(--ed-white);  
    box-shadow:var(--ed-shadow-df);
    margin-bottom:30px 0; 
    padding:20px;

     img{
         width:100%;
         border-radius:4px;
         min-height:200px;
         object-fit:cover;
     }
`;

export default EmployeeMenu