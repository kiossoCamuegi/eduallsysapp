import styled from 'styled-components'; 
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline'; 
import PlayLessonOutlinedIcon from '@mui/icons-material/PlayLessonOutlined'; 
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import Chart from 'react-apexcharts'; 
import TodayTask from '../components/Table/TodayTask';  
import { ClassCountData, StudentsCountData, CourseCountData, EmployeesCountData } from '../../General/components/InstituteData';
import AnimationPage from '../../General/AnimationPage';
import StudentsNByAcademicLevelChart from '../components/elements/Charts/StudentsNByAcademicLevelChart';
import StudentNByClassChart from '../components/elements/Charts/StudentNByClassChart';
import Calendar from 'react-calendar';
import { useState } from 'react';
import DashboardEventsTable from '../components/Table/DashboardEventsTable';
 
 
const Dashboard = ()=>{
  document.title = 'Dashboard'+ " - "+ "******";  
  const [value, onChange] = useState(new Date());
    return(
      <AnimationPage>              
          <div> 
            <div className="mt-2">
            <Flex>
                <BoxFlex>
                       <Box className='mrb-2 boxItem'>
                            <div className="ed-flex">
                            <div className="icon"><PeopleOutlineIcon/></div>
                            <h3><StudentsCountData/> </h3>
                            </div>
                            <Block >  
                                <span>Estudantes Matriculados</span>
                            </Block>
                         </Box>
                         <Box className='mrb-2 boxItem'>
                            <div className="ed-flex">
                            <div className="icon"><PlayLessonOutlinedIcon/></div>
                            <h3><ClassCountData/></h3>
                            </div>
                            <Block> 
                                <span>Total turmas </span>
                            </Block>
                         </Box>
                        <Box className='boxItem'>
                            <div className='ed-flex'>
                                 <div className="icon"><AssignmentOutlinedIcon/></div>
                                <h3>0</h3> 
                            </div>
                            <Block> 
                                <span>Número Total de solicitações</span>
                            </Block>
                        </Box>
                        <Box className='boxItem'>
                                <div className="ed-flex">
                                <div className="icon"><BadgeOutlinedIcon/></div> 
                                <h3><EmployeesCountData /></h3>
                                </div>
                                <Block> 
                                    <span>Total funcionarios</span>
                                </Block>
                        </Box>
                    </BoxFlex> 
                    <ChartBox>
                        <div className='chart-container'>
                            <div className="title"><h1>Número de estudantes por turma</h1></div>
                            <StudentNByClassChart /> 
                        </div>
                    </ChartBox>
                </Flex> 
            </div>
          <Flex>
              <BoxItem className='boxItem'>
                  <div className="title"><h1>Número de estudantes por classe</h1></div>
                 <StudentsNByAcademicLevelChart/>
              </BoxItem>
          </Flex> 
          </div>  
          <div className="mt-2">
            <Flex> 
                <div className="space">
                <div className="calendar-box">
                    <Calendar onChange={onChange} value={value} />
                </div>
                <div className="table-box">
                    <DashboardEventsTable />
                </div> 
                </div> 
            </Flex>
          </div>
          <br />
      </AnimationPage> 
    );
} 


const Flex = styled.div`
   display:flex;
   width:100%; 
   
   .space{
     display:flex;
     justify-content:space-between;

     .custom-table {
          margin:0px;
     }
   }

     .calendar-box{
        width:38%;
        .react-calendar {
            min-height:360px;
        }
     }

     .table-box{ 
         min-width:60%;
         width:60%;
     }
`;


const BoxFlex = styled.div`
    display:flex; 
    width:100%;
    flex-wrap:wrap;
    max-width:550px;
    min-width:550px;  
    justify-content:space-between;
`;

const Box = styled.div`
   width:48%;
   min-width:200px;
   border-radius:6px; 
   height:164px;
   margin-bottom:21px !important;
   background:var(--ed-white);  
   box-shadow:var(--ed-shadow-df);
   display:flex;
   flex-direction:column;
   justify-content:center;
   padding:20px;
   position: relative;

   .ed-flex{
      align-items:center;
   }

  .icon{
   width:60px;
   height:60px;
   display:flex;
   align-items:center;
   justify-content:center;
   border-radius:100%;
   background:var(--ed-purple-light);

    svg{
        width:30px;
        height:30px;
        fill:var(--ed-white);
    }
  }

   h3{ 
       font-size:30px;
       font-weight:600;
       margin:0px;
       margin-left:15px;
       color:var(--ed-blue-dark);
   }

   span{
       font-size:14px; 
   }
`;


const Block = styled.div`
   display:block;
   margin-top:10px;
`;

const ChartBox = styled.div`
    width:100%;
    padding-left:20px; 

    .chart-container{
        width:100%; 
        border-radius:6px;   
        padding:20px;
        height:348px;
        background:var(--ed-white);  
        box-shadow:var(--ed-shadow-df);
    }

    .title h1{
      font-size: 18px;
      font-weight: 600;
      margin: 0px;
      margin-bottom:20px;
   }
`;


const BoxItem = styled.div`
    width:100%; 
    border-radius:6px;
    margin-bottom:20px;    
    margin-top:10px;
    padding:20px;
    min-height:300px;
    background:var(--ed-white);  
    box-shadow:var(--ed-shadow-df);


       .title h1{
          font-size: 18px;
          font-weight: 600;
          margin: 0px;
       }
`;

export default Dashboard;