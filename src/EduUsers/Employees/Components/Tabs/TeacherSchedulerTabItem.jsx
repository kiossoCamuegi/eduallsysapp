import React, { useState } from 'react';
import styled from 'styled-components';
import TCCDscheduler_events from './SubTabs/Scheduler/TCCDscheduler_events';

function TeacherSchedulerTabItem() {
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
                 <li onClick={()=>ChangeActiveTab(1)} className={ActiveTab === 1 ? 'active bg-main-light' : ''}>Eventos</li>
                 <li onClick={()=>ChangeActiveTab(2)} className={ActiveTab === 2 ? 'active bg-main-light' : ''}>Agenda</li>
                 <li onClick={()=>ChangeActiveTab(3)} className={ActiveTab === 3 ? 'active bg-main-light' : ''}>Plano de aulas</li>
                 <li onClick={()=>ChangeActiveTab(4)} className={ActiveTab === 4 ? 'active bg-main-light' : ''}>Exames</li>  
            </ul> 
        </Box>
     </div> 
         <div className="container-content">
             <div className={ActiveTab === 1 ? '' : 'd-none'} >
                  <div >
                    <TCCDscheduler_events />
                  </div>
             </div>
              <div className={ActiveTab === 2 ? '' : 'd-none'} >
                   <div >
                     
                   </div>
             </div>
              <div className={ActiveTab === 3 ? '' : 'd-none'} >
                  <div >
                       
                  </div>
             </div>
              <div className={ActiveTab === 4 ? '' : 'd-none'} >
                  <div >
                      
                  </div>
             </div> 
             <div className={ActiveTab === 5 ? '' : 'd-none'} >
                  <div >
                   
                  </div>
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


     .container-content{
         .container{ 
              width:100% !important;
              max-width:100% !important; 
              box-shadow:var(--ed-shadow-df);
              border:1px solid red;
              background:var(--ed-white);
              border-radius:6px;
         }
     }

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


export default TeacherSchedulerTabItem;
