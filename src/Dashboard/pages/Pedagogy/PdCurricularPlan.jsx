import React, { useState } from 'react'
import styled from 'styled-components'; 
import Navbar from '../../components/elements/Navbar';
import { Form } from 'react-bootstrap';
import TeacherClassCard from './components/TeacherClassCard';
import CurricularPlanContent from './components/CurricularPlanContent';
import Chart from 'react-apexcharts';  

function PdCurricularPlan() {
  document.title = "Plano curricular dos professores"; 
  const [TeacherData, setTeacherData] = useState([
    {
      class_data:[{class_code:21,curricular_plan:88},{class_code:21,curricular_plan:17}]
    },
    {
      class_data:[{class_code:21,curricular_plan:37}]
    },
    {
      class_data:[{class_code:21,curricular_plan:78},{class_code:21,curricular_plan:57},{class_code:21,curricular_plan:78}]
    },
  ]);

  const ChartOptions_donut = {
    series: [44, 55 ], 
    labels: ['Finalisado', 'Não finalizado'], 
    options: { 
      chart: {
        width: 200
      },
      legend: {
        position: 'top'
      }
    } 
  }


  return (
    <div>
    <Navbar logo /> 
    <Container>
      <Menu className='boxItem'>
      <Form >
        <Form.Group> 
            <div className='mt-2'> 
                <Form.Select >
                 
                </Form.Select> 
            </div>  
            <div className='mt-2'> 
                <Form.Select >
                 
                </Form.Select> 
            </div>  
            <div className='mt-2'> 
                <Form.Select >
                 
                </Form.Select> 
            </div>  
          </Form.Group> 
        </Form>  
        <ol>
            {TeacherData.map((item, index)=>{
              return(
                  <TeacherClassCard key={index}  data={item} />
              )
            })}
        </ol>
      </Menu>
        <Content>
            <Form>
               <div className="ed-space">
                   
               </div>
            </Form>
           <CurricularPlanContent />
        </Content>
         <Menu className='boxItem lg'>
         <Chart options={ChartOptions_donut.options}  series={ChartOptions_donut.series} labels={ChartOptions_donut.labels} type='pie'  height='100%' width="99%"/> 
         </Menu>
    </Container>
</div>
  )
}

const Container = styled.div`
    width:100%;
    display:flex;
    
    ul, ol, li{  
      list-style:none;
    }

     .boxItem.lg{
        width:320px !important; 
        min-width:320px !important; 
        max-width:320px !important;  
     }
`; 


const Menu = styled.div` 
  height:calc(100vh - 80px);
  max-height:calc(100vh - 80px);  
  border-right:1px solid #E9ECEF; 
  border-left:1px solid #E9ECEF; 
  width:270px; 
  min-width:270px;
  max-width:270px; 

    form{
       padding:10px 20px;
    }

     ol{
      padding:10px 20px;
      margin:10px 0px;
     }
`;

const Box = styled.div`
    width:100%; 
    border-radius:6px;   
    padding:20px 0px;
    min-height:300px;
    height:auto;
    background:var(--ed-white);  
    box-shadow:var(--ed-shadow-df);
    margin:10px 0;
    position:relative; 

    .title{
        padding:0px 20px;

        h1{
            font-weight:600;
            font-size: 18px; 
            margin:0px;
        }
    }
   
`;

const Content = styled.div`
    width:100%; 
    height:calc(100vh - 80px);
    max-height:calc(100vh - 80px); 
    background:var(--ed-background-color);
    padding:20px; 
    overflow-y:auto; 
`;
export default PdCurricularPlan
