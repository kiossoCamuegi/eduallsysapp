import React from 'react'
import styled from 'styled-components';
import Navbar from '../../components/elements/Navbar';
import PdSchedulerCalendar from './components/PdSchedulerCalendar';
import DatePickerBox from '../../../General/components/DatePickerBox';
import { useEffect } from 'react';

function PdScheduler() {
    document.title = "Emissão de horários"; 
    const MonthOptions = ["Janeiro" , "Fevereiro", "Março",   "Abril",  "Maio",  "Junho", "Julho",  "Agosto", "Setembro", "Outubro", "Novembro",  "Dezembro"];
    const date =  MonthOptions[(new Date().getMonth())-1]  + " "+ new Date().getFullYear(); 
    return (
        <div>
            <Navbar logo /> 
            <Container>
              <Menu className='boxItem'>
                 <DatePickerBox />
              </Menu>
                <Content>
                  <ContentMenu>
                    <div className="ed-space  pd-1">
                        <div className="ed-flex">
                            <h1>{date}</h1>
                        </div>
                        <div className="ed-flex">
                            
                            <button className="btn bg-main">Adicionar nova agenda</button>
                        </div>
                    </div>
                  </ContentMenu>
                  <PdSchedulerCalendar/>
                 </Content> 
            </Container>
        </div>
      ) 
}


const ContentMenu = styled.div`
   width:100%;
   margin-bottom:20px;
`;

const Container = styled.div`
    width:100%;
    display:flex;
`; 


const Menu = styled.div` 
  height:calc(100vh - 80px);
  max-height:calc(100vh - 80px);  
  border-right:1px solid #E9ECEF; 
  border-left:1px solid #E9ECEF; 
  width:330px; 
  min-width:330px;
  max-width:330px;  
`;
 
const Content = styled.div`
    width:100%; 
    height:calc(100vh - 80px);
    max-height:calc(100vh - 80px); 
    background:var(--ed-background-color);
    padding:20px; 
    overflow-y:auto; 
`;

export default PdScheduler