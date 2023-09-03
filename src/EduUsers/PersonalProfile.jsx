import React  ,{useState} from 'react'
import NavbarStudent from './Students/Components/NavbarStudent'
import styled from 'styled-components';
import { Avatar, AvatarGroup } from '@mui/material';
import { Form } from 'react-bootstrap';
import { BookmarksOutlined,ChatBubbleOutline, CommentOutlined, Email, FavoriteBorder, ForumOutlined, GroupOutlined, HomeOutlined, ImageOutlined, LinkedIn, ListAltOutlined, MailOutlineOutlined, NotificationsNoneRounded, Phone, Share, ThumbDown, ThumbsUpDownOutlined, ThumbUpSharp, YouTube } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { HeartBrokenOutlined, QuestionMarkRounded, ThumbDownAltOutlined } from '@mui/icons-material';
import ReduceTextLength from '../General/components/ReduceTextLength';
import HonorBoard from './Students/Components/HonorBoard';
import StudentMenu from './Students/Components/StudentMenu';
import {SettingsOutlined, Facebook,  Instagram } from '@material-ui/icons';
import Slider from 'react-slick';
import StudentProfileGlobal from './Students/Components/StudentProfileGlobal';
import { Tab } from 'bootstrap';
import SidebarLeft from './Students/Components/SidebarLeft';
import MenuRight from './Components/MenuRight';
import UserNavbar from './Components/UserNavbar';
import Hoot from '../General/components/Hoot';
import ProfileGlobal from './Components/Profile/ProfileGlobal';
 

function PersonalProfile({userdata}) {
  document.title = userdata.user_Information.ed_user_account_name;
  const [CurrentTab, SetCurrentTab] = useState(0); 
  const Data = userdata.user_Information;
  let lettername = Data.ed_user_account_name.split(' ')[0].split('')[0].toUpperCase()+
  Data.ed_user_account_name.split(' ')[Data.ed_user_account_name.split(' ').length -1].split('')[0].toUpperCase()

  const SwitchTab = (e)=>{
    SetCurrentTab(e); 
  }

  return (
    <div className='eduall-network'>
         <UserNavbar data={userdata} />
        <div className="d-flex">
          <SidebarLeft/>
          <Container>
            <BlockBox> 
             <Profile>
                  <div className="cover">
                      <div className="cover-wall"> 

{Data.ed_user_account_detProfileCover !== null  ?
                            <img loading="lazy"  role="presentation" src={Hoot()+Data.ed_user_account_detProfileCover} alt="eduall" className='wall' />
                            : <div className="wall"></div>} 


                      </div>
                      <div className="cover-over">
                          <div className="cover-over-top">
                              <div> 
                              </div>
                              <div className="ed-flex">
                                    <div className="profile-user-options">
                                            <Link to="#"><SettingsOutlined/>Definições</Link>
                                            <Link to="#" className='ml-2'><ListAltOutlined/> Historico de actividades</Link>
                                      </div> 
                              </div>
                          </div>
                          <div className="cover-over-bottom">
                              <div className="cover-over-details">
                                    <div className="profile-user-dets">
                                      <div className="avatar-pic">
                                          <Form className='d-none'>
                                              <label htmlFor="ed-user-picture-image">
                                                  <div className="ed-user-picture-image-label">
                                                      <SettingsOutlined />
                                                  </div>
                                              </label>
                                              <input type="file" hidden name="" id="ed-user-picture-image" />
                                          </Form>
                                              <Avatar alt={Data.ed_user_account_name} 
                                              src={Hoot()+Data.ed_user_account_picture} sx={{width:150,height:150,bgcolor: Data.ed_user_account_detAvatarColor}}>
                                              {lettername}
                                          </Avatar>
                                          </div>
                                          <div className="name">
                                              <h5>{Data.ed_user_account_name}</h5>
                                              <div className="mt-2"><small>{Data.ed_user_account_email}</small> </div>
                                          </div>
                                    </div>
                                      
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className="tabs-menu">
                      <ul>
                          <li onClick={()=> SwitchTab(0)} className={CurrentTab === 0 ? 'active' : ''}>Visão geral</li>
                          <li onClick={()=> SwitchTab(1)} className={CurrentTab === 1 ? 'active' : ''}>Publicações</li>
                          <li onClick={()=> SwitchTab(2)} className={CurrentTab === 2 ? 'active' : ''}>Aprendizado</li>
                          <li onClick={()=> SwitchTab(3)} className={CurrentTab === 3 ? 'active' : ''}>Parcerias</li>
                          <li onClick={()=> SwitchTab(4)} className={CurrentTab === 4 ? 'active' : ''}>Galeria</li> 
                      </ul>
                  </div>
              </Profile>
              <Content> 
                    <ProfileContainer> 
                      <Block className={CurrentTab === 0 ? 'active' : 'd-none'} >
                          <ProfileGlobal data={userdata} info={Data} />
                      </Block> 
                      <Block className={CurrentTab === 1 ? 'active' : 'd-none'} >
                            <h1>calendario</h1>
                      </Block> 
                      <Block className={CurrentTab === 2 ? 'active' : 'd-none'} >
                          <h1>Actividades</h1>
                      </Block> 
                      <Block className={CurrentTab === 3 ? 'active' : 'd-none'} >
                          <h1>Solicitações </h1>    
                      </Block> 
                      <Block className={CurrentTab === 4 ? 'active' : 'd-none'} >
                          <h1>publicações </h1>   
                      </Block> 
                      <Block className={CurrentTab === 5 ? 'active' : 'd-none'} >
                          <h1>Extratos </h1> 
                      </Block>    
                  </ProfileContainer>
              </Content> 
            </BlockBox> 
          </Container>
          <MenuRight/>
        </div>
    </div>
  )
}


const Container = styled.div`
    display:flex;
    width:100%;
    padding:20px;
    border:2px solid red;
`;

const BlockBox = styled.div`
     padding-left:80px;   
     width:74%;
`;

const Content = styled.div`
  display:flex;
  width:100%; 
  padding-top:20px;
  background:var(--ed-background-color);  


  h1.title{
    position:relative;
    margin:0px;
    width:max-content;
    font-size:18px;
    color:var(--ed-dark);
    font-weight:bold;
    display:block; 
  }
`;

const Block = styled.div` 
  display:block; 
  width:100%;
`

const ProfileContainer = styled.div`
    width:100%;  
`;

const Profile  = styled.div` 
     width:100%;
     margin-top:70px; 
     margin-bottom:20px;
     border-radius:10px;
     box-shadow:var(--ed-shadow-df);
     overflow:hidden;
     background:var(--ed-white);
 
     .tabs-menu{
        padding:5px;     
        padding-left:160px; 
        width:100%;
        min-height:80px; 

         ul{
            margin:0px;
            display:flex;
            align-items:center;
            margin-top:10px;

             li{ 
                transition:all 1s ease-in-out;
                margin-right:20px;
                font-weight:500;
                cursor:pointer;
                color:var(--ed-dark); 
                padding:10px 20px; 
                border-radius:50px;
                cursor:pointer; 
                display:flex;
                align-items:center;
                border:1px solid  #eaeaee;
             }

             li.active{
                color:var(--ed-white); 
                background:var(--ed-purple-light); 
             }
         }
     }

     .cover{
        width:100%;
        height:300px;
        position:relative;  


        @media screen and (max-width:1280px){
            height:400px;
        }


        .cover-over{
            background:var(--ed-trp-2);
            position:absolute; 
            top:0px;
            left.0px;
            width:100%;
            height:100%;
            padding:20px;


               .cover-over-top{
                  position:absolute;
                  padding:0px 20px;
                  left:0px;
                  top:20px;
                  width:100%;
                  display:flex;
                  justify-content:space-between;

                
                
                .profile-user-options a{
                    padding:10px 15px;
                    cursor:pointer;
                    background:var(--ed-trp-6);
                    color:var(--ed-white);
                    font-size:15px;
                    border-radius:6px;
                  }
               }

               .cover-over-bottom{
                  width:100%;
                  position:absolute;
                  bottom:0px;
                  left:0px;
                  padding:0px 20px;

                    .cover-over-details{
                        width:100%;
                        display:flex;
                        justify-content:space-between;
                        align-items:flex-end; 
                        position:relative;

                        .name{
                            margin-left:170px;
                            margin-bottom:20px;

                             h5{
                                font-size:18px;
                                color:var(--ed-white);
                             }

                             small{
                                color:var(--ed-white);
                                font-size:16px;
                             }
                        }

                        .profile-user-options{
                            margin-bottom:20px;
                            display:flex;

                              .btn{
                                 background:var(--ed-white);
                                 color:var(--ed-purple) !important;
                                 font-size:15px;

                                 svg{
                                      fill:var(--ed-purple);
                                 }
                              }
                        }

                        .ed-user-picture-image-label{
                            width:40px;
                            height:40px;
                            display:flex;
                            align-items:center;
                            justify-content:center; 
                            position:absolute;
                            right:6px;
                            top:30px;
                            z-index:100;
                            border-radius:100%;
                            cursor:pointer;
                            background:#000; 
      
                               svg{
                                  fill:var(--ed-white);
                               }
                        }
      
                         .avatar-pic{
                             margin-bottom:-140px; 
                             width:155px;
                             height:155px;
                             position:relative;
      
                              .MuiAvatar-root{
                                  border:6px solid var(--ed-white);
                                  box-shadow:var(--ed-shadow-df);
                              }
                         }

                    }
               }
        }
                
         .cover-wall{
            height:100%;

           .wall{
                width:100%;
                height:100%;
                object-fit:cover; 
                background:var(--ed-purple);
           }
         }
     }
`;

export default PersonalProfile