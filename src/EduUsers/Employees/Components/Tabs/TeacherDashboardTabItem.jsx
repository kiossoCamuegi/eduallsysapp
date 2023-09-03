import React from 'react'
import styled from 'styled-components'
import Chart from 'react-apexcharts'; 
import { Form } from 'react-bootstrap';
import TableGrid from '../../../../General/components/TableGrid';
import ProfileCalendar from '../../../Components/ProfileCalendar';
import { CiBookmarkPlus } from "react-icons/ci";
import {FaTasks} from 'react-icons/fa'; 
import { GetClasstitle_byclass, GetSubject } from '../../../../General/components/InstituteData';
import ShedulerComponent from '../../../../General/ShedulerComponent';
import AddsGenerator from '../../../Components/AddsGenerator';


 
 


function TeacherDashboardTabItem(props) {
     const rows = [];
   const BoxCounts = [
      {color:"var(--ed-blue-light)", icon: <CiBookmarkPlus color='white' size={25} />, title:"Turmas que eu leciono", total:props.Data.ClassList.length}, 
      {color:"var(--ed-red-light)", icon: <FaTasks color='white' size={25} />, title:"Tarefas pendentes", total:"0"}, 
      {color:"var(--ed-green)", icon:<CiBookmarkPlus color='white' size={30} />, title:"Disciplinas que leciono", total:props.Data.SubjectsList.length}, 
      {color:"var(--ed-orange-light)", icon:<CiBookmarkPlus color='white' size={30} />, title:"Faltas aplicadas aos alunos", total:"0"}, 
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
   
     
   const columns = [ 
     { field: 'index', headerName: 'Disciplina', width: 150 },
     {
       field: 'title',
       headerName: 'Turma',
       width:110,
       editable: true,
     }, 
       {
       field: 'code',
       headerName: 'Data & Hora',
       width:140,
       editable: true,
     },  
     {
       field: 'action',
       headerName: 'Ação', 
       width: 150, 
       sortable:false,  
     } 
   ];

   
  return (
     <Container>
         <div className="top-container">
            <Row>
                <FlexBox>
                     {
                        BoxCounts.map((item, index)=>{
                             return(
                                <div key={index} className="small-box">
                                   <Box>
                                       <div className="ed-flex">
                                           <div className="icon bg-main-light">{item.icon}</div>
                                           <div className="ed-flex">
                                                <h1>{item.total}</h1>
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
                 <div className="Big-Box">
                      <Box className='f-height'>
                         <div className="ed-space">
                             <div><h5>Faltas por turmas</h5></div>
                             <Form>
                                  <Form.Select>
                                       {props.Data.ClassList.map((item, index)=>{
                                           return(<option value={item} selected={index === 0 ? true : false}> 
                                                 <GetClasstitle_byclass ID={item} />
                                            </option> )
                                       })}
                                  </Form.Select>
                             </Form>
                         </div>
                         <div className="center">
                               <div className="chart-box">
                                 <Chart  
                                       options={ChartOptions_donut.options}
                                       series={ChartOptions_donut.series}
                                       labels={ChartOptions_donut.labels}
                                       type='pie' 
                                       width="99%" height='100%'
                                 />
                               </div>
                         </div>
                      </Box>
                 </div>
            </Row>
            <Row>
            <div className='calendar-box'>
               <Box className='box-calendar'>
                   <ProfileCalendar/>
               </Box>
            </div>
            <div className="pd-2"></div>
             <div className="table-box">
               <TableGrid 
                  TableHead={columns}
                  TableBody={rows} 
                  TableHeight={300}
                  TableTitle='Minhas faltas' 
                />
             </div> 
            </Row>
            <Row>
               <div className="week-calendar-box">
                  
               </div>
               <div className="pd-2"></div>
               <div className="scheduler-box"> 
                     <ShedulerComponent data={[]} title="Minhas tarefas & Eventos" /> 
               </div>
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
   min-width:720px;
   max-width:520px;
   flex-wrap:wrap;
   justify-content:space-between;
   
   .small-box{
      min-width:350px;
      max-width:350px;

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
   width:100%;
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

   h1{ 
      font-size:24px;
      font-weight:600; 
   }
 
`

export default TeacherDashboardTabItem