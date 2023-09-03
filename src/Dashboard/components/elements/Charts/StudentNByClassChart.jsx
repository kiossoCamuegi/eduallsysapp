import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'; 
import Hoot from '../../../../General/components/Hoot';
import axios from 'axios';
import { RemoveRoadTwoTone } from '@mui/icons-material';
import Loader from '../../../../General/components/Loader';
import styled from 'styled-components';


function StudentNByClassChart() {
   const [data, setData] = useState([]);
   const [loaded, setLoaded] = useState(false);

 
   async function loadData(){  
        const class_response =  await axios.get(Hoot()+"eduallclassapi/get");
        const students_response =  await axios.get(Hoot()+"eduallstudentsapi/get");
        const colorsData = [ 
            "var(--ed-purple)", "var(--ed-purple-light)", "#7B2CBF", "#9D4EDD", "#C77DFF",
            "#7371FC", "#5C0099", "#6A994E", "#70798C", "#577590",
            "#CE4257", "#FFD166", "#118AB2", "#FFD670", "#70798C", 
            "#1E96FC", "#F72585", "#DC562E", "#55A630", "#1B263B",
        ];

        const ChartOptions = { 
            series: [],
            options: {
              chart: {
                type: 'polarArea',
              },
              labels: [],
              colors:[],
              stroke: {
                colors: ['#fff', ]
              },
              fill: {
                opacity: 0.9
              },
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
      
            const row = []; 
      
            class_response.data.map((CL, e)=>{   
                row.push({class_title:CL.ed_class_title, class_code:CL.ed_class_id, students:[]})
            }) 

            row.map((CL, index)=>{
                students_response.data.map((item, index)=>{
                    if(CL.class_code === item.ed_student_class){
                         CL.students.push(item.ed_student_name); 
                    }
                }); 
            });


            const VALUES = [];
            const COLORS = [];
            const LABELS = [];
            row.map((item, index)=>{
               VALUES.push(item.students.length); 
               COLORS.push(colorsData[index]);
               LABELS.push(" "+" "+item.class_title+ ` - (${item.students.length} estudantes )`);
            });
            ChartOptions.series = VALUES;
            ChartOptions.options.labels = LABELS;
            ChartOptions.options.colors = COLORS;
          
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
              <Chart  options={data.options} series={data.series} type="polarArea" height={280}  /> 
          </Container>
         }
    </div>
  )
}


const Container = styled.div`
   min-height:200px;
   position:relative;
   width:99%;
`;


export default StudentNByClassChart
