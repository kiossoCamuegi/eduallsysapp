import React from 'react';
import Chart from 'react-apexcharts';

const ChartOptions = {
    series: [
    {
      name: 'Meses do ano',
      data: [40,70,20,90,36,80,30,91,60, 200, 98, 198]
    }, 
  ],
  options:{
       color:['#2980b9'],
       chart:{
         background: 'transparent'
       },
       dataLabels: {
         enabled:false
       },
       stroke:{
         curve: 'smooth'
       },
       xaxis: {
         categories: ['jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Out', 'Nov', 'Dez']
       },
       legend:{
         position: 'top'
       },
       grid:{
         show:false
       }
   }
}

function Chart_salles_per_month() { 
return (
    <div>
       <Chart 
            options={ChartOptions.options}
            series={ChartOptions.series}
            type='bar'
            height='450px' 
            width="99%"
        />
    </div>
  )
}

export default Chart_salles_per_month