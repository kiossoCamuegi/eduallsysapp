import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'; 
import Hoot from '../../../../General/components/Hoot';
import axios from 'axios';
import { RemoveRoadTwoTone } from '@mui/icons-material';
import Loader from '../../../../General/components/Loader';
import styled from 'styled-components';


function StudentsNByAcademicLevelChart() {
   const [data, setData] = useState([]);
   const [loaded, setLoaded] = useState(false);

 
   async function loadData(){ 
        const academicLevel_response = await axios.get(Hoot()+"eduallacademiclevelsapi/get");
        const class_response =  await axios.get(Hoot()+"eduallclassapi/get");
        const students_response =  await axios.get(Hoot()+"eduallstudentsapi/get");

        const ChartOptions = {
            series: [{
            name: 'Masculino',
            data: []
            }, {
            name: 'Femenino',
            data: []
            }],
            options: {
            chart: {
                type: 'bar',
                height: 350, 
            }, 
            colors: ['var(--ed-purple-light)', 'var(--ed-silver)'],
            plotOptions: {
                bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded' 
                } 
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 2, 
            },
            xaxis: {
                categories: [],
            },
            yaxis: {
                title: {
                text: 'Estudantes'
                }
            },
            fill: {
                opacity: 1,
            },
            tooltip: {
                y: {
                formatter: function (val) {
                    return val + " estudantes"
                }
                }
            }
            }, 
        };  

        const row = [];
        const row_2 = [];

        academicLevel_response.data.map((AC, i)=>{
            class_response.data.map((CL, e)=>{  
                if(AC.ed_academic_level_id*1 === CL.ed_class_academic_level){
                   row.push({level:AC.ed_academic_level_id*1 , level_title:AC.ed_academic_level_title, class: CL.ed_class_id, students:[], gender:[[],[]]})
                   row_2.push(AC.ed_academic_level_id*1)
                }  
            }) 
          if(!row_2.includes(AC.ed_academic_level_id*1)){
             row.push({level:AC.ed_academic_level_id*1 , level_title:AC.ed_academic_level_title,  class:null, students:[], gender:[[],[]]})
          }
        })

        
        students_response.data.map((item, index)=>{
            row.map((AC, i)=>{
                if(item.ed_student_class === AC.class){
                     AC.students.push(item.ed_student_name)
                    AC.gender[item.ed_student_gender.toLowerCase() === 'male' ? 0 : 1].push(item.ed_student_name);
                }
            })
        }); 

        const labels = []
        const ML_data = [];
        const FL_data = [];
        row.map((item, index)=>{
            labels.push(item.level_title);
            ML_data.push(item.gender[0].length);
            FL_data.push(item.gender[1].length);
        });
        ChartOptions.options.xaxis.categories = labels;
        ChartOptions.series[0].data = ML_data;
        ChartOptions.series[1].data = FL_data;
           
        setData(ChartOptions);
        setLoaded(true); 
   }

   useEffect(()=>{
      loadData();
   },[]);
  
  return (
    <div>
       {loaded === false ? 
         <Container>
             <Loader absolute small />
          </Container>
         : 
        <Container>
            <Chart  options={data.options} series={data.series} type="bar" height={350}  />
        </Container>
        }
    </div>
  )
}


const Container = styled.div`
   min-height:350px;
   position:relative;
   width:99%; 
`;


export default StudentsNByAcademicLevelChart
