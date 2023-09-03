import AssignmentReturnOutlinedIcon from '@mui/icons-material/AssignmentReturnOutlined';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import AssignmentReturnedOutlinedIcon from '@mui/icons-material/AssignmentReturnedOutlined';
import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined';
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import styled from 'styled-components'
import Chart from 'react-apexcharts'; 
import { LibraryTotalAuthors, LibraryTotalBooks, LibraryTotalBorrowedBooks, LibraryTotalReturnedBooks } from '../../../General/components/InstituteData';
import LibraryDonwloadBooksCharts from './Components/LibraryDonwloadBooksCharts';

function LibraryDashboard() {
  document.title = "Dashboard bibliotecario";
  const [value, onChange] = useState(new Date());
  const [totalBorrowedBooks , SetTotalBorrewedBooks] = useState(0);
  const [totalReturnedBooks , SetTotalReturnedBooks] = useState(0);

  const GetTotalBorrowedBooks = (e)=>{
     SetTotalBorrewedBooks(e);
  }

  const GetTotalReturnedBooks = (e)=>{
    SetTotalReturnedBooks(e);
  }



  const ChartOptions_donut = {
    series: [totalBorrowedBooks, totalReturnedBooks], 
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

 
  return (
    <div>
           <BoxFlex> 
             <Box className='boxItem'>
                  <Block>
                    <div className="ed-flex">
                      <div><LibraryBooksOutlinedIcon/> </div> 
                      <h3><LibraryTotalBooks/></h3>  
                    </div> 
                    <span>Livros</span> 
                  </Block>
              </Box>
              <Box className='mrb-2 boxItem'> 
                    <Block> 
                        <div className="ed-flex">
                          <div><LocalLibraryOutlinedIcon/></div>
                          <h3><LibraryTotalAuthors/></h3>
                        </div>
                        <span>Autores</span>
                    </Block> 
              </Box>
              <Box className='boxItem'> 
                    <Block>
                        <div className="ed-flex">
                          <div><AssignmentReturnOutlinedIcon/></div>
                         <h3><LibraryTotalBorrowedBooks GetData={GetTotalBorrowedBooks} /></h3>
                      </div> 
                        <span>Emprestimos</span>
                    </Block>
              </Box>
              <Box className='boxItem'>  
                    <Block>
                    <div className="ed-flex">
                      <div><AssignmentReturnedOutlinedIcon/></div>
                      <h3 className='ed-flex'><LibraryTotalReturnedBooks GetData={GetTotalReturnedBooks} /></h3>
                    </div>
                     <span>Devoluções</span>
                    </Block>
              </Box>
           </BoxFlex> 
           <BoxFlex>  
           <LargeChart>
                <div><h2 className="title">Downloads mensais dos livros</h2></div>
                <LibraryDonwloadBooksCharts />
           </LargeChart>
               <div className="pd-2"></div>
               <div  className='d-block'>
               <div className="Chart-box mt-2">
                   <div><h2 className="title">Entrada e saida de livros</h2></div>
                    <Chart  
                          options={ChartOptions_donut.options}
                          series={ChartOptions_donut.series}
                          labels={ChartOptions_donut.labels}
                          type='pie' 
                          width="99%" height={200}
                    />
                </div> 
                <div className="Chart-box mt-2">
                   <div><h2 className="title">Entrada e saida de livros</h2></div>
                    <Chart  
                          options={ChartOptions_donut.options}
                          series={ChartOptions_donut.series}
                          labels={ChartOptions_donut.labels}
                          type='pie' 
                          width="99%" height={200}
                    />
                </div> 
               </div>
           </BoxFlex> 
           <br />
    </div>
  )
}


const LargeChart = styled.div` 
    width:100%;
    border-radius:6px;  
    margin:7px 0px !important;
    background:var(--ed-white);  
    box-shadow:var(--ed-shadow-df); 
    padding:20px; 
    max-height:600px; 

    .MuiBox-root {
       box-shadow:unset !important;
    }

    
    .title{ 
        font-size:18px;  
        font-weight:600;
        margin-top:10px; 
    }



     div:has(.apexcharts-canvas){ 
        width:100%;
     }

      .apexcharts-canvas{
         width:100% !important;
         min-width:100% !important; 
      }
`;

const BoxFlex = styled.div`
    display:flex; 
    width:100%; 
    justify-content:space-between;

    .title{  
        font-size:18px;  
        font-weight:600;
        margin-top:10px;
        margin-bottom:25px; 
    }


    .d-block{
      min-width:40%;
    }

     .Chart-box{
        width:100%; 
        height:290px; 
        border-radius:6px;  
        margin-bottom:21px !important;
        background:var(--ed-white);  
        box-shadow:var(--ed-shadow-df); 
        padding:20px;

         @media screen and (max-width:1500px){ 
            min-width:39.2%;
         }
     }
`;

const Box = styled.div`
   width:24%;
   min-width:200px;
   border-radius:6px; 
   height:150px;
   margin-bottom:21px !important;
   background:var(--ed-white);  
   box-shadow:var(--ed-shadow-df);
   display:flex;
   align-items:center; 
   padding:20px;
   position: relative;
   color:var(--ed-dark);

   .icon{
      font-size:60px;
      font-weight:600;
   }

   svg{
       width:45px;
       height:45px;
       fill:var(--ed-blue-dark);
   }

   h3{
       text-transform:capitalize;
       font-size:27px;
       font-weight:600;
   }

   span{
       font-size:15px;
       font-weight:500;
   }
`;


const Block = styled.div`
   display:flex;
   flex-direction:column;
   align-items:flex-end;
   text-align:right; 
`;

export default LibraryDashboard