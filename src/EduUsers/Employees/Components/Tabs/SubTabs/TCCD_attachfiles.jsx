import React from 'react'
import styled from 'styled-components'
import Chart from 'react-apexcharts'; 
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {FcPanorama, FcAudioFile, FcFolder, FcVideoCall} from "react-icons/fc";
import AddFileModal from './Modal/AddFileModal';
import TCC_contentTable from './Tables/TCC_contentTable';

function TCCD_attachfiles(props) {

   const ChartOptions_1 = { 
        series: [70],
        options: { 
            labels:[""]
        }, 
   }; 

  return (
     <Container>
         <Content>
            <div className="ed-space">
                <div className="small-box">
                    <Box className='bg-main-light'>
                       <div className="ed-space">
                            <div>
                                <div className="block">
                                   <div className="ed-flex">
                                     <div className="icon">
                                         <FcVideoCall/>
                                     </div>
                                     <div className="ml-2">
                                        <h1>484</h1>
                                     </div>
                                   </div>
                                    <h3>Videos</h3>
                                    <span >7GB em arquivos</span>
                                </div>
                            </div>
                            <div className='chart-box'>
                                 
                            </div>
                       </div>
                    </Box>
                </div>
                <div className="small-box">
                    <Box>
                      <div className="ed-space">
                             <div>
                                 <div className="block"> 
                                    <div className="ed-flex">
                                      <div className="icon">
                                          <FcAudioFile/>
                                      </div>
                                     <div className="ml-2"><h1>900</h1></div>
                                    </div>
                                    <h3>Audios</h3>
                                    <span >90GB em arquivos</span>
                                </div>
                             </div>
                             <div className='chart-box'>
                               
                             </div>
                      </div>
                    </Box>
                </div>
                <div className="small-box">
                    <Box>
                      <div className="ed-space">
                             <div>
                                 <div className="block">
                                   <div className="ed-flex">
                                       <div className="icon">
                                            <FcPanorama/>
                                        </div>
                                       <div className="ml-2">
                                          <h1>636</h1>
                                       </div>
                                   </div>
                                    <h3>Imagens</h3>
                                    <span >90GB em arquivos</span>
                                </div>
                             </div>
                             <div className='chart-box'>
                                
                             </div>
                      </div>
                    </Box>
                </div>
                <div className="small-box">
                    <Box>
                        <div className='ed-space'>
                             <div className="block">
                               <div className="ed-flex">
                               <div className="icon">
                                     <FcFolder/>
                                </div>
                                <div className="ml-2">
                                    <h1>737</h1>    
                                 </div>
                               </div>
                                <h3>Documentos</h3>
                                <span >2GB em arquivos</span>
                            </div> 
                          <div className='chart-box'>
                             
                          </div>
                        </div> 
                    </Box>
                </div>
             </div>
             <TCC_contentTable />
         </Content>
     </Container>
  )
}

const Content = styled.div`
   width:100%;
   margin:20px 0px;

   .small-box{
       width:24%;

       .ed-space{
          flex-wrap:no-wrap; 
       }

       .chart-box{ 
          width:100px; 
       }

        .bg-main-light{
            h3, h1{
              color:var(--ed-white);
            } 

            span{
              color:var(--ed-silver-light) !important;
            }
        }

        
    .icon{
        width:50px;
        height:50px;
        border-radius:100%;
        background:var(--ed-background-color);
        margin-bottom:10px;
        display:flex;
        align-items:center; 
        justify-content:center;
        border:1px solid var(--ed-silver-light);

          svg{
               width:30px;
               height:23px;
          }
    }

    h1{ 
        font-size:24px;
        font-weight:600; 
     }

    h3{ 
        font-size:16px;
        font-weight:600; 
    }

    span{
        font-size:14px;
        margin-top:10px;
        color:silver;
    }
 }



`;

const Container = styled.section`
     display:block;
     width:100%; 
    
      .ed-space{ 
        .title h2{
            font-size:20px;
            font-weight:600;
            margin:0px; 
        }
    }
`;

const Box = styled.div`
    width:100%;
    border-radius:6px; 
    display:flex;
    align-items:center; 
    justify-content:center;
    height:160px;
    margin-bottom:21px !important;
    background:var(--ed-white);  
    box-shadow:var(--ed-shadow-df); 
    padding:20px;
    position: relative; 
`;

export default TCCD_attachfiles