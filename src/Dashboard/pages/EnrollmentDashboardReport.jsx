import React from 'react'
import Chart from 'react-apexcharts';
import styled from 'styled-components';
import AnuallEnrollmentOperatorsTable from '../components/Table/AnuallEnrollmentOperatorsTable';

function EnrollmentDashboardReport() {
  document.title = "Relatorio anual de Matrículas e confirmações";

    const ChartSettings   = {
            
        series: [{
        name: 'Matriculas',
        type: 'column',
        data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 67]
        }, {
        name: 'Confirmações',
        type: 'area',
        data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43, 80]
        }],
        options: {
        chart: {
            height: 350,
            type: 'line',
            stacked: false,
        },
        stroke: {
            width: [0, 2, 5],
            curve: 'smooth'
        },
        plotOptions: {
            bar: {
            columnWidth: '40%'
            }
        },
        
        fill: {
            opacity: [0.85, 0.25, 1],
            gradient: {
            inverseColors: false,
            shade: 'light',
            type: "vertical",
            opacityFrom: 0.85,
            opacityTo: 0.55,
            stops: [0, 100, 100, 100]
            }
        },
        labels: ['01/01/2022', '02/01/2022', '03/01/2022', '04/01/2022', '05/01/2022', '06/01/2022', '07/01/2022',
            '08/01/2022', '09/01/2022', '10/01/2022', '11/01/2022','12/01/2022'
        ],
        markers: {
            size: 0
        },
        xaxis: {
            type: 'datetime'
        },
        yaxis: {
            title: {
            text: ' Registros efectuados',
            },
            min: 0
        },
        tooltip: {
            shared: true,
            intersect: false,
            y: {
            formatter: function (y) {
                if (typeof y !== "undefined") {
                return y.toFixed(0) + " Registros  efectuados";
                }
                return y;
        
            }
            }
        }
        }, 
    };


  return (
    <div>
         <ChartBox>
              <h3>Matrículas e confirmações anuais</h3>
             <Chart options={ChartSettings.options} series={ChartSettings.series} type="line" height={350}  />
         </ChartBox>
         <AnuallEnrollmentOperatorsTable/>
    </div>
  )
}


    const BoxItem = styled.div`
        width:100%; 
        border-radius:6px;
        margin-bottom:20px;    
        margin-top:20px;
        padding:20px;
        min-height:300px;
        background:var(--ed-white);  
        box-shadow:var(--ed-shadow-df);
    `;

    const ChartBox = styled.div`
            width:100%; 
            border-radius:6px;
            margin-bottom:20px;    
            margin-top:20px;
            padding:20px;
            min-height:300px;
            background:var(--ed-white);  
            box-shadow:var(--ed-shadow-df);

            
            h3{
                text-transform:capitalize;
                font-size:20px;
                font-weight:500;
            }

    `;


export default EnrollmentDashboardReport