import React, { useState } from 'react';
import styled from 'styled-components';
import TCCD_attachfiles from './SubTabs/TCCD_attachfiles';
import TCCD_books from './SubTabs/TCCD_books';
import TCCD_courses from './SubTabs/TCCD_courses';
import TCCD_createlessons from './SubTabs/TCCD_createlessons';
import TCC_curricularplan from './SubTabs/TCC_curricularplan';

function TeacherStudentContentTabItem(props) {
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
                     <li onClick={()=>ChangeActiveTab(1)} className={ActiveTab === 1 ? 'active bg-main-light' : ''}>Anexar ficheiros</li>
                     <li onClick={()=>ChangeActiveTab(2)} className={ActiveTab === 2 ? 'active bg-main-light' : ''}>Criar Aula</li>
                     <li onClick={()=>ChangeActiveTab(3)} className={ActiveTab === 3 ? 'active bg-main-light' : ''}>Livros</li>
                     <li onClick={()=>ChangeActiveTab(4)} className={ActiveTab === 4 ? 'active bg-main-light' : ''}>Cursos</li> 
                     <li onClick={()=>ChangeActiveTab(5)} className={ActiveTab === 5 ? 'active bg-main-light' : ''}>Plano curricular</li> 
                </ul> 
            </Box>
         </div> 
             <div className="container-content mt-2">
                 <div className={ActiveTab === 1 ? '' : 'd-none'} >
                      <div className="Wrapper">
                         <TCCD_attachfiles />
                      </div>
                 </div>
                  <div className={ActiveTab === 2 ? '' : 'd-none'} >
                       <div className="Wrapper">
                          <TCCD_createlessons/>
                       </div>
                 </div>
                  <div className={ActiveTab === 3 ? '' : 'd-none'} >
                      <div className="Wrapper">
                          <TCCD_books/>
                      </div>
                 </div>
                  <div className={ActiveTab === 4 ? '' : 'd-none'} >
                      <div className="Wrapper">
                         <TCCD_courses/>
                      </div>
                 </div> 
                 <div className={ActiveTab === 5 ? '' : 'd-none'} >
                      <div className="Wrapper">
                         <TCC_curricularplan Data={props.Data} />
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
`


export default TeacherStudentContentTabItem