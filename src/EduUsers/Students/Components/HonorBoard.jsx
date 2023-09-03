import React from 'react'
import styled from 'styled-components';
import { Avatar, AvatarGroup } from '@mui/material'; 
 import { Link } from 'react-router-dom'; 
import {ThumbDownAltOutlined, ThumbUpSharp } from '@material-ui/icons';

function HonorBoard() {
  return (
    <div>
        <Sidebar>
            <Box>
                <div className="title"><h3>Quadro de honra</h3></div>
                    <ul className='honorBoard'>
                        <li> 
                        <Link  to='/studentprofile'>
                            <Avatar src='' sx={{width:80, height:80}} />
                            <div className="name">Sara Manuel</div>
                        </Link>
                        <div className="score"><strong className='text-green'>16</strong> Valores</div>
                        <div className="reactions">
                                <button><ThumbUpSharp /> <span>37</span></button>
                                <button><ThumbDownAltOutlined /> <span>90</span></button>
                        </div> 
                        </li> 
                        <li> 
                        <Link  to='/studentprofile'>
                            <Avatar src='' sx={{width:80, height:80}} />
                            <div className="name">Sara Manuel</div>
                        </Link>
                        <div className="score"><strong className='text-green'>16</strong> Valores</div>
                        <div className="reactions">
                                <button><ThumbUpSharp/> <span>37</span></button>
                                <button><ThumbDownAltOutlined/> <span>90</span></button>
                        </div> 
                        </li> 
                        <li> 
                        <Link  to='/studentprofile'>
                            <Avatar src='' sx={{width:80, height:80}} />
                            <div className="name">Sara Manuel</div>
                        </Link>
                        <div className="score"><strong className='text-green'>16</strong> Valores</div>
                        <div className="reactions">
                                <button><ThumbUpSharp/> <span>37</span></button>
                                <button><ThumbDownAltOutlined/> <span>90</span></button>
                        </div> 
                        </li> 
                        <li> 
                        <Link  to='/studentprofile'>
                            <Avatar src='' sx={{width:80, height:80}} />
                            <div className="name">Sara Manuel</div>
                        </Link>
                        <div className="score"><strong className='text-green'>16</strong> Valores</div>
                        <div className="reactions">
                                <button><ThumbUpSharp/> <span>37</span></button>
                                <button><ThumbDownAltOutlined/> <span>90</span></button>
                        </div> 
                        </li> 
                        <li> 
                        <Link  to='/studentprofile'>
                            <Avatar src='' sx={{width:80, height:80}} />
                            <div className="name">Sara Manuel</div>
                        </Link>
                        <div className="score"><strong className='text-green'>16</strong> Valores</div>
                        <div className="reactions">
                                <button><ThumbUpSharp/> <span>37</span></button>
                                <button><ThumbDownAltOutlined/> <span>90</span></button>
                        </div> 
                        </li> 
                        <li> 
                        <Link  to='/studentprofile'>
                            <Avatar src='' sx={{width:80, height:80}} />
                            <div className="name">Sara Manuel</div>
                        </Link>
                        <div className="score"><strong className='text-green'>16</strong> Valores</div>
                        <div className="reactions">
                                <button><ThumbUpSharp/> <span>37</span></button>
                                <button><ThumbDownAltOutlined/> <span>90</span></button>
                        </div> 
                        </li> 
                    </ul>
              </Box> 
        </Sidebar>
    </div>
  )
}



const Box = styled.div`
    width:100%; 
    border-radius:6px;   
    min-height:200px;
    background:var(--ed-white);  
    box-shadow:var(--ed-shadow-df);
    margin-bottom:30px 0; 
    padding:20px;
    padding-top:20px;

    @media screen and (max-width:1300px){
      .honorBoard li{
         margin:15px 0px !important;
         width:100%; 
      }
   }
 
    .honorBoard{
        display:flex;
        width:100%;
        justify-content:space-around;
        flex-wrap:wrap;
        padding:0px;
        margin:10px 0px; 
 

        li{ 
          margin:15px 4px;
          padding:10px;
          border:1px solid whitesmoke;
          border-radius:6px; 
          min-height:200px;
          display:flex;
          flex-direction:column;
          text-align:center;
          align-items:center; 

          a{
            margin:0px !important;
            padding:0px;
            display:flex;
            flex-direction:column;
            text-align:center;
            align-items:center;   
          }

          .name{
            color:var(--ed-dark);
            font-weight:500;
            font-size:14px;
            margin:10px 0px;
          }

          .score{
              font-size:13px !important;
              margin-bottom:10px;
              color:var(--ed-green-light);
          }

          button{
             border-radius:30px;
             border:1px solid #ced4da;
             font-size:13px;
             margin:5px;
             cursor:pointer;
             background:none;
            
             svg{
                fill:#ced4da;
                width:16px;
             }

             span{
                 color:#ced4da;
                 font-size:12px;
             }
          }
 
        }
    }
`;


const Sidebar = styled.div`
   width:300px; 
   min-width:380px;
   display:block; 
   min-height:55vh;
   
   @media screen and (max-width:1300px){
      max-width:240px !important;
      min-width:240px !important;
   }
`;



export default HonorBoard