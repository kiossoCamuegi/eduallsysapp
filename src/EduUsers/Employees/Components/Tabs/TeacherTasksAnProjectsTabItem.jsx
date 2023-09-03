import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap';
import styled from 'styled-components';
import { GetClasstitle_byclass, GetSubject } from '../../../../General/components/InstituteData';
import CRValue from '../../../../General/components/CRValue';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AddOutlined, PrintOutlined } from '@mui/icons-material';
import Hoot from '../../../../General/components/Hoot';

  
import Chart from 'react-apexcharts';  
import TableGrid from '../../../../General/components/TableGrid';
import ProfileCalendar from '../../../Components/ProfileCalendar';
import { CiBookmarkPlus } from "react-icons/ci";
import {FaTasks} from 'react-icons/fa';  
import ShedulerComponent from '../../../../General/ShedulerComponent'; 
import EmployeeTaskGrid from '../../../../Dashboard/components/Grid/EmployeeTaskGrid';
import { BsBox2Heart } from 'react-icons/bs';

 
 



const TABLEURL = [
   Hoot()+"eduallsinglequarterlynotebyqrtsubcls/get/"
];


function TeacherTasksAnProjectsTabItem(props) {
   const rows = [];
   const BoxCounts = [
      {color:"var(--ed-blue-light)", icon: <CiBookmarkPlus color='white' size={25} />, title:"Grupos criados", total:0}, 
      {color:"var(--ed-red-light)", icon: <FaTasks color='white' size={25} />, title:"Tarefas atribuidas", total:"0"}, 
      {color:"var(--ed-green)", icon:<CiBookmarkPlus color='white' size={30} />, title:"Projectos atribuidos", total:0}, 
      {color:"var(--ed-orange-light)", icon:<CiBookmarkPlus color='white' size={30} />, title:"Ficheiros anexados", total:"0"}, 
   ];
    
     const ChartOptions_donut = { 
       series: [100, 50], 
       options: {
         chart: {
           width: 200,
           type: 'pie',
         },
         colors: ['var(--ed-purple-light)', 'var(--ed-silver)'],
         labels: ['Emprestimos', 'Devoluções'],
         responsive: [{
           breakpoint: 480,
           options: {
             chart: {
               width: 200
             },
             legend: {
               position: 'bottom'
             }
           }
         }]
       }, 
     }; 
   

    return(
      <Container>
         <div className="top-container">
           <Row>
                 <section>
                  <div className="secondary-container">
                              <BoxItem className='boxItem'>
                              <div className="box-details">
                                 <div className="ed-space">
                                       <div><h1 className="title">Projectos pendentes</h1></div>
                                       <div>
                                          <button className="btn btn-circle text-main-light"><AddOutlined /></button>
                                       </div>
                                 </div>
                              </div>
                              <div>
                                 <EmployeeTaskGrid employeeid={1}  />
                                 </div>
                              </BoxItem> 
                         </div>
                  </section>
                  <aside  className='main-flex' >
                     <div className="flex-box"> 
                       <div className="chart-box">
                       <div className="ed-space">
                           <div><h1 className="title">Tarefas por turma</h1></div>
                           <div>
                              <button className="btn btn-circle text-main-light"><AddOutlined /></button>
                           </div>
                       </div>
                      <div className="mt-4">
                      <Chart  
                              options={ChartOptions_donut.options}
                              series={ChartOptions_donut.series}
                              labels={ChartOptions_donut.labels}
                              type='pie' 
                              width="99%" height='100%'
                        />
                      </div>
                       </div> 
                  <FlexBox>
                     {
                        BoxCounts.map((item, index)=>{
                             return(
                                <div key={index} className="small-box">
                                   <Box>
                                       <div className="ed-flex">
                                           <div className="icon bg-main-light">{item.icon}</div>
                                           <div className="ed-flex">
                                                <h1 className='count' >{item.total}</h1>
                                            </div>
                                       </div>
                                       <div className="ed-block"> 
                                            <h4 className="title">{item.title}</h4>
                                       </div>
                                   </Box>
                                </div>
                             )
                        })
                     }
                  </FlexBox> 
                  </div>
                  <div className="scheduler-box"> 
                     <ShedulerComponent data={[]} title="Tarefas & Projectos" /> 
                  </div>
               </aside>
            </Row>
         </div> 
      </Container>
 )
}


const Container = styled.section`
     display:block;
     width:100%;
     padding:0px 20px;

     .top-container{
         margin-top:-90px;
     }

     .btn.btn-circle{
         width:40px;
         height:40px;
         border-radius:100%;
         border:1px solid var(--ed-purple-light) !important;
         display:flex;
         align-items:center; 
     }
     
   .chart-box{
      width:100%;
      border-radius:6px;   
      margin-right:15px;
      background:var(--ed-white);  
      box-shadow:var(--ed-shadow-df); 
      padding:20px;
      position: relative;
      min-height:320px !important; 

       h1.title{
         font-size: 18px;
         font-weight: 600;
         margin: 0px;
       }
       
   }


     .main-flex{ 
      width:100%; 
       padding-left:15px;
       margin-top:14px;

        .flex-box{
            display:flex;
        }
     }

     
     .secondary-container{
      min-width:350px;
      width:350px;
      min-height:400px; 

        .boxItem{
            min-height:300px;

            h1.title{
               font-size: 18px;
               font-weight: 600;
               margin: 0px;
             }
        }
  }


     .scheduler-box{
         width:100%;
         border-radius:6px; 
         min-height:150px;
         margin-bottom:21px !important;
         background:var(--ed-white);  
         box-shadow:var(--ed-shadow-df); 
         padding:20px;
         position: relative;
     }

     .calendar-box{
        height:360px; 
        min-width:500px;
        margin-top:15px;

          .box-calendar {
            padding:0px;
            height:360px;


            div{
              box-shadow:none !important;
            }
          }
     }

     .table-box{
         width:100%;
         min-width:650px; 
     }
`;

const Row = styled.div`
   display:flex;
   justify-content:space-between;
   width:100%; 

   .chart-box{
      height:200px;

      @media screen and (max-width:1290px){
         height:300px; 
      }
   }

   .week-calendar-box{
      min-width:300px; 
      margin-bottom:21px !important;   
      border-radius:6px; 
      min-height:150px; 
      background:var(--ed-white);  
      box-shadow:var(--ed-shadow-df); 
      padding:20px;
      position: relative; 
   }
 
   .Big-Box{
       width:100%;
       min-height:320px;
       max-height:320px;
       padding-left:20px;

       .f-height{
           height:100%; 
           .center{
              margin-top:40px;
           }
       }
   }
`;

const FlexBox = styled.div`
   display:flex;
   width:100%;
   min-width:700px;
   max-width:700px;  
   height:max-content;
   flex-wrap:wrap;
   justify-content:space-between;
   
   .small-box{
      min-width:340px;
      max-width:340px;

      .title{
          font-size:16px;
          font-weight:600;
      }

      .icon{
         width:50px;
         height:50px;
         border-radius:100%; 
         margin-right:10px;
         display:flex;
         align-items:center;
         justify-content:center;

            svg{
                 fill:var(--ed-white);
                 color:var(--ed-white);
            }
      }
   }
`;

const Box = styled.div` 
   border-radius:6px; 
   height:150px;
   margin-bottom:21px !important;
   background:var(--ed-white);  
   box-shadow:var(--ed-shadow-df); 
   padding:20px;
   position: relative;
 


   h4{ 
      font-size:20px;
      font-weight:600; 
      margin-top:20px !important;
   }

   h5{ 
      font-size:20px;
      font-weight:600;  
   }

   h1.count{ 
      font-size:24px;
      font-weight:600; 
   }


`


const BoxItem = styled.div`
min-width:100px;
border-radius:6px; 
min-height:100px;
margin:15px 0px !important;
background:var(--ed-white);  
box-shadow:var(--ed-shadow-df);  
 

 .box-details{
     padding:20px; 
 }


`

export default TeacherTasksAnProjectsTabItem