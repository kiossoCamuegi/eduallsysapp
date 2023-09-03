import React from 'react'
import { styled } from 'styled-components';
import { GetSubject } from '../../../General/components/InstituteData';
import { Avatar, AvatarGroup } from '@mui/material';
import { ProgressBar } from 'react-bootstrap';
import {BsClock} from "react-icons/bs";

function EmployeeTaskGrid(props) {

    const GetType = ["Controle", "Contagem", "Monitoramento"];

    const Data = [
        {
             id:1,
             type:1,
             subject:23,
             class:22,
             startDate:10,
             endDate:50, 
             color:"var(--ed-brown)",
             title:"Compostos quimicos",
             canseled:false
         },
         {
            id:2,
            type:1,
            subject:23,
            class:22,
            startDate:10,
            endDate:50, 
            color:"var(--ed-blue-light)",
            title:"Compostos quimicos",
            canseled:true
        },
        {
            id:3,
            type:2,
            subject:23,
            class:22,
            startDate:10,
            endDate:50, 
            color:"var(--ed-green)",
            title:"Compostos quimicos",
            canseled:false
        },
        {
            id:4,
            type:2,
            subject:23,
            class:22,
            startDate:10,
            endDate:50, 
            color:"var(--ed-orange)",
            title:"Compostos quimicos",
            canseled:false
        }
    ];



  return (
     <Container>
        <ul>
            {Data.map((item, index)=>{
                return(
                   <li key={index}>
                      <div className="box-details">
                      <div className="type"  style={{background:item.color}}> 
                          {item.type === 1 ?
                              <div className="ed-flex">
                                   Aula de Biologia
                              </div> :
                               <div className="ed-flex">
                                   {GetType[item.type]}
                               </div>
                          }
                       </div>
                       <h3 className="title">{item.title}</h3>
                       {item.type === 1 ?
                             <div className="ed-flex ed-space">
                               <div className='students-avatar'  
                                style={{maxWidth:`${8 > 6 ? "195" :  5*32}px`}}>
                                 <AvatarGroup max={6} sx={{ '& .MuiAvatar-root': { width: 35, height: 35, fontSize: 13 }}}> 
                                       {[0,1,2,3,4,5,6,7,8,9].map((avatar, i)=>{
                                           return(<Avatar key={i} className='df'/>)
                                       })}
                                  </AvatarGroup> 
                               </div>
                               <div className="red">
                                   icon 
                               </div>
                             </div>
                             :
                            <></>
                          }
                          <div className="progress-status">
                              <div className="ed-space mt-2">
                                  <div><span>Progresso</span></div>
                                  <div><span>60%</span></div>
                              </div>
                              <div className="bar-status ed-flex">
                                  {item.canceled ? <ProgressBar  variant='danger' now={45} /> :  <ProgressBar  variant='primary' now={45} /> }
                                  {item.canseled ? <div className="ml-2 text-danger">Canselado</div> : <></>}
                              </div> 
                          </div>
                        <div className="time ed-flex mt-2"><BsClock/> <div className="ml-1">das 12:30 ate as 14:30 (1H)</div> </div>
                      </div>
                     <hr />
                   </li>
                )
            })}
        </ul>
      <div className="box-details">
        {Data.length >= 1  ? 
            <button className="btn btn-bordered text-main-light">Visualizar todas as tarefas</button>  
        : <></>}
      </div>
     </Container>
  )
}



const Container = styled.div`
   display:block;

   .box-details{
      padding:20px;
      margin:0px;
   }

    ul{
        padding:0px !important;
        padding-top:20px !important;
        margin:0px !important;
        border-top:1px solid #E9ECEF;

         li{ 
            list-style:none;
            padding-bottom:30px;
            padding-top:0px !important;

            .box-details{
                padding-top:0px !important;

                .progress{
                    width:100%;
                    height:7px; 
                }

                .bar-status{
                    margin:5px 0px;
                }

              .type{
                width:max-content;
                color:var(--ed-white);
                font-size:16px;
                border-radius:6px;
                padding:5px 10px;
                font-size:15px;
             }

             h3.title{
                font-size:16px;
                margin:10px 0px;
                font-weight:600;
             }

             .time , .progress-status span{
                 color:var(--ed-grey-text);
                 font-size:15px;
             } 
            }


            hr{ 
                border-color:#E9ECEF;
                margin:0px;
            }

         }

         li:last-child{
            padding-bottom:0px !important;
        }
    }

    .btn.btn-bordered{
        width:100%;
        border:1px solid var(--ed-purple-light) !important;
        text-align:center;
        padding:10px !important;
    }
`;






export default EmployeeTaskGrid
