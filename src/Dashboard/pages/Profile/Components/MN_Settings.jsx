import React, { useRef, useState } from 'react'
import { Form } from 'react-bootstrap';
import styled from 'styled-components'
import CRValue from '../../../../General/components/CRValue';
import { toast } from 'react-toastify';
import axios from 'axios';
import Hoot from '../../../../General/components/Hoot';
import { ImagePreview } from '../../../components/elements/ImagePreview';
import { Avatar } from '@mui/material';
import ManagerSettingsPasswordForm from './SubComponents/SettingsComponents/ManagerSettingsPasswordForm';

function MN_Settings(props) {
  const Data = props.Data ? props.Data : {};
  const [activeTab, setActiveTab] = useState(0);
 
  return (
    <div>
         <Container>
            <BoxContainer>
                  <div className="cover">
                      <div className="cover-wall">
                        {/**add image tag */}
                        </div> 
                       <div className="cover-over">
                           <div className="ed-space">
                               <div className="ed-flex">
                                  <div className="avatar-box">
                                     <Avatar sx={{width:150,height:150}}   alt=''/> 
                                  </div>
                               </div>
                               <div className="ed-flex"></div>
                           </div>
                       </div>
                  </div>
                  <br />
                  <div className="profile-settings-tab">
                      <ul>
                        <li onClick={()=>setActiveTab(0)} className={activeTab === 0 ? 'active' : ''} >Meus detalhes</li>
                        <li onClick={()=>setActiveTab(1)} className={activeTab === 1 ? 'active' : ''} >Perfil</li>
                        <li onClick={()=>setActiveTab(2)} className={activeTab === 2 ? 'active' : ''} >Password</li>
                        <li onClick={()=>setActiveTab(3)} className={activeTab === 3 ? 'active' : ''} >Team <div className="badge bg-silver text-dark">34</div></li>
                        <li onClick={()=>setActiveTab(4)} className={activeTab === 4 ? 'active' : ''} >Email</li>
                        <li onClick={()=>setActiveTab(5)} className={activeTab === 5 ? 'active' : ''} >Notificações</li> 
                      </ul> 
                      <hr />
                      <div className="tab-content">
                            <div className={activeTab === 0 ? "tab-item" : "d-none"}> 
                               <ManagerSettingsPasswordForm />
                           </div>
                           <div className={activeTab === 1 ? "tab-item" : "d-none"}>
                               <ManagerSettingsPasswordForm />
                           </div>
                           <div className={activeTab === 2 ? "tab-item" : "d-none"}>
                               <ManagerSettingsPasswordForm />
                           </div>
                           <div className={activeTab === 3 ? "tab-item" : "d-none"}>
                               <ManagerSettingsPasswordForm />
                           </div>
                           <div className={activeTab === 4 ? "tab-item" : "d-none"}>
                               <ManagerSettingsPasswordForm />
                           </div>
                           <div className={activeTab === 5 ? "tab-item" : "d-none"}>
                               <ManagerSettingsPasswordForm />
                           </div>

                      </div>
                  </div> 
            </BoxContainer>
         </Container>
         <br />
    </div>
  )
}

const Container = styled.div`
    width:100%; 
    
    
    .title h2{
      font-size:18px;  
      font-weight:600;
      margin-top:10px;
      margin-bottom:10px;
    }

    .description p{
        font-size:14px;
    }

    hr{
       border-color: var(--grey) !important;
       background: var(--grey) !important;
    }
 
     form{
       width:100%; 
     }

`;

 
const BoxContainer = styled.div` 
    width:100%; 
    border-radius:6px;
    margin-bottom:20px;   
    min-height:600px;
    background:var(--ed-white);  
    box-shadow:var(--ed-shadow-df);  
    overflow:hidden;
    padding-bottom:20px;


       .mt-4 .ed-space{ 

         input, select, textarea{
            width:100%;
            border:10px solid red;
         }
    }

    .cover{
        height:200px;
         
        position:relative !important;

        .cover-wall{
            img{
                width:100%;
                height:200px;
                object-fit:cover;
            }
        }

        .cover-over{
          padding:0px 20px;
          height:200px;  
          display:flex;
          align-items:flex-end;
          justify-content:flex-end;
          z-index:100;
          position:absolute !important;
          top:0px;
          left:0px;
          width:100%; 
          background:var(--ed-trp-1);

          .avatar-box{  
            margin-bottom:-70px; 
          }
        
  
          .avatar-box .MuiAvatar-circular{
                border:5px solid var(--ed-white); 
                box-shadow:var(--ed-shadow-df);
            }
        }
    }

    .profile-settings-tab{
      margin-top:80px;
      padding:0px 20px;

      ul{
          list-style:none;
          display:flex;
          padding:0px;
          margin:0px;
          margin-bottom:30px;

          li{
             margin-right:20px;
             cursor:pointer;
             position:relative;
          }

          li.active{ 
            font-weight:600;

            &:after{
              position:absolute;
              top:30px;
              left:0px;
              border-radius:30px; 
              min-width:calc(100% + 5px);
              height:4px;
              content:'';
              background:var(--ed-dark);
          }
        }

      }
    }

    .tab-content{
        .tab-item{
           display:block !important; 
        }
    }
`;

const FlexBox = styled.div`
   margin:10px 0;
   display:flex; 
`;

export default MN_Settings