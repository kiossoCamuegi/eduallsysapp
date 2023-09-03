import React, { useState } from 'react';
import styled from 'styled-components';
import TCCD_settings_general from './SubTabs/Components/settings/TCCD_settings_general';
import TCCD_settings_profile from './SubTabs/Components/settings/TCCD_settings_profile';
import TCCD_settings_password from './SubTabs/Components/settings/TCCD_settings_password';
import TCCD_settings_teams from './SubTabs/Components/settings/TCCD_settings_teams';
import TCCD_settings_email from './SubTabs/Components/settings/TCCD_settings_email';
import TCCD_settings_notifications from './SubTabs/Components/settings/TCCD_settings_notifications';

function TeacherSettingsTabItem() {
  const [ActiveTab, SetActiveTab] = useState(1);

  const ChangeActiveTab=(e)=>{
      SetActiveTab(e);
  }
return(
<div>
  <Container>
   <div className="top-container">
      <Box> 
         <ul className="content-tab-header ed-wrap">
               <li onClick={()=>ChangeActiveTab(1)} className={ActiveTab === 1 ? 'active bg-main-light' : ''}>Meus detalhes</li>
               <li onClick={()=>ChangeActiveTab(2)} className={ActiveTab === 2 ? 'active bg-main-light' : ''}>Perfil</li>
               <li onClick={()=>ChangeActiveTab(3)} className={ActiveTab === 3 ? 'active bg-main-light' : ''}>Password</li>
               <li onClick={()=>ChangeActiveTab(4)} className={ActiveTab === 4 ? 'active bg-main-light' : ''}>Team</li>  
               <li onClick={()=>ChangeActiveTab(5)} className={ActiveTab === 5 ? 'active bg-main-light' : ''}>Email</li>
               <li onClick={()=>ChangeActiveTab(6)} className={ActiveTab === 6 ? 'active bg-main-light' : ''}>Notificações</li>    
          </ul> 
      </Box>
   </div> 
       <div className="container-content">
           <div className={ActiveTab === 1 ? '' : 'd-none'} >
               <TCCD_settings_general/>
           </div>
            <div className={ActiveTab === 2 ? '' : 'd-none'} >
               <TCCD_settings_profile/>
           </div>
            <div className={ActiveTab === 3 ? '' : 'd-none'} >
              <TCCD_settings_password/>   
           </div>
            <div className={ActiveTab === 4 ? '' : 'd-none'} >
              <TCCD_settings_teams/>
           </div> 
           <div className={ActiveTab === 5 ? '' : 'd-none'} >
              <TCCD_settings_email/>     
           </div>
           <div className={ActiveTab === 6 ? '' : 'd-none'} >
              <TCCD_settings_notifications/>
           </div> 
       </div>
</Container>
</div>
)
}


const Container = styled.section`
     display:block;
     width:100%;
     padding:0px 20px;

     .top-container{
         margin-top:-90px;
         z-index:100;
     } 
 
     .content-tab-header{
        margin:0px;
        padding:0px;

         
        li.active{ 
            color:var(--ed-white);
        }

        li{
            padding:10px 20px;
            margin-right:15px;
            border-radius:50px;
            cursor:pointer;
            transition:all 1s ease-in-out;
            border:1px solid var(--ed-silver-light);
        }
     }
`;

const Box = styled.div`
   width:100%;
   border-radius:6px; 
   min-height:90px;
   margin-bottom:21px !important;
   background:var(--ed-white);  
   box-shadow:var(--ed-shadow-df); 
   padding:0px 20px;
   position: relative;
   display:flex;
   align-items:center;
`;

export default TeacherSettingsTabItem
