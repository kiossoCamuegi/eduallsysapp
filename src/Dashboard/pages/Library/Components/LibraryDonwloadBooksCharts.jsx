import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chart from 'react-apexcharts'; 

function LibraryDonwloadBooksCharts() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    
  const DownloadChart   = {
    series: [{
        data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1492, 1617, 1980]
      }],
      options: {
        chart: {
          type: 'bar',
          height: 300
        },
        plotOptions: {
          bar: {
            barHeight: '100%',
            distributed: true,
            horizontal: true,
            dataLabels: {
              position: 'bottom'
            },
          }
        },
        colors: [ 
            "var(--ed-purple)", "var(--ed-purple-light)", "#7B2CBF", "#9D4EDD", "#C77DFF",
            "#7371FC", "#5C0099",  "#7c4e99", "#6704a9", "#3f2d46", "#865898", "#5c0d63"
        ],
        dataLabels: {
          enabled: true,
          textAnchor: 'start',
          style: {
            colors: ['#fff']
          },
          formatter: function (val, opt) {
            return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
          },
          offsetX: 0,
          dropShadow: {
            enabled: true
          }
        },
        stroke: {
          width: 1,
          colors: ['#fff']
        },
        xaxis: {
          categories: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
            'Agosto', 'Setembro' ,'Outubro', 'Novembro', 'Dezembro'
          ],
        },
        yaxis: {
          labels: {
            show: false
          }
        }, 
        subtitle: {
            text: 'Category Names as DataLabels inside bars',
            align: 'center',
        },
        tooltip: {
          theme: 'dark',
          x: {
            show: false
          },
          y: {
            title: {
              formatter: function () {
                return ''
              }
            }
          }
        }
      },
  };  
  
    return (
      <div className='d-flex' >
       <div className="mt-4">
       <Tabs   orientation="vertical"
          variant="scrollable"  value={value}
          onChange={handleChange}  aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: 'divider' }}  >
          <Tab label="2022" {...a11yProps(0)} />
          <Tab label="2023" {...a11yProps(1)} />
          <Tab label="2024" {...a11yProps(2)} /> 
        </Tabs>
       </div>
        <TabPanel value={value} index={0}>
             <Chart options={DownloadChart.options} series={DownloadChart.series} type="bar" width={'99%'} height={450} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel> 
      </div>
    );
}
 
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

 

export default LibraryDonwloadBooksCharts
