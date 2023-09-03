import React from 'react'
import ShedulerComponent from '../../../General/ShedulerComponent'
import { styled } from 'styled-components';
import {BsClock} from "react-icons/bs";



function PP_calendar(props) { 

  return (
     <Container>
         <h1 className="title">Calendário de aulas</h1>
          <div className="content"> 
              <section className="weekdays">
                   <article className="week-item wh1"> 
                        <div className="week-header-title">Segunda-feira</div>
                        <div className="week-body">
                             <ul>
                             <li>
                                  <div className="small-el-title">Matematica</div>
                                   <small className="time ed-flex"><BsClock />10:30 - 11:20</small>
                                </li>
                                <li>
                                  <div className="small-el-title">Matematica</div>
                                   <small className="time ed-flex"><BsClock />10:30 - 11:20</small>
                                </li>
                             </ul>
                        </div>
                   </article>
                   <article className="week-item wh2"> 
                        <div className="week-header-title">Terça-feira</div>
                        <div className="week-body">
                             <ul>
                               <li>
                                  <div className="small-el-title">Matematica</div>
                                   <small className="time ed-flex"><BsClock />10:30 - 11:20</small>
                                </li>
                                <li>
                                  <div className="small-el-title">Matematica</div>
                                   <small className="time ed-flex"><BsClock />10:30 - 11:20</small>
                                </li>
                                <li>
                                  <div className="small-el-title">Matematica</div>
                                   <small className="time ed-flex"><BsClock />10:30 - 11:20</small>
                                </li>
                             </ul>
                        </div>
                   </article>
                   <article className="week-item wh3"> 
                        <div className="week-header-title">Quarta-feira</div>
                        <div className="week-body">
                             <ul>
                                <li>
                                  <div className="small-el-title">Matematica</div>
                                   <small className="time ed-flex"><BsClock />10:30 - 11:20</small>
                                </li>
                                <li>
                                  <div className="small-el-title">Matematica</div>
                                   <small className="time ed-flex"><BsClock />10:30 - 11:20</small>
                                </li>
                             </ul>
                        </div>
                   </article>
                   <article className="week-item wh4"> 
                        <div className="week-header-title">Quinta-feira</div>
                        <div className="week-body">
                             <ul>
                                <li>
                                  <div className="small-el-title">Matematica</div>
                                   <small className="time ed-flex"><BsClock />10:30 - 11:20</small>
                                </li>
                             </ul>
                        </div>
                   </article>
                   <article className="week-item wh5"> 
                        <div className="week-header-title">Sexta-feira</div>
                        <div className="week-body">
                             <ul>
                               <li>
                                  <div className="small-el-title">Matematica</div>
                                   <small className="time ed-flex"><BsClock />10:30 - 11:20</small>
                                </li>
                             </ul>
                        </div>
                   </article>
                   <article className="week-item wh6"> 
                        <div className="week-header-title">Sabado</div>
                        <div className="week-body">
                             <ul>
                               <li>
                                  <div className="small-el-title">Matematica</div>
                                   <small className="time ed-flex"><BsClock />10:30 - 11:20</small>
                                </li>
                             </ul>
                        </div>
                   </article>
                   <article className="week-item wh7"> 
                        <div className="week-header-title">Domingo</div>
                        <div className="week-body">
                             <ul>
                                <li>
                                  <div className="small-el-title">Matematica</div>
                                   <small className="time ed-flex"><BsClock />10:30 - 11:20</small>
                                </li>
                             </ul>
                        </div>
                   </article>
              </section>
              <ShedulerComponent data={props.data  ? props.data : []} />
          </div>
     </Container>
  )
}


const Container = styled.div` 
  width:100%;
  background:var(--ed-white); 
  border-radius:6px; 
  box-shadow:var(--ed-shadow-df);
  padding:20px;

   .content{
     display:flex; 
     margin-top:20px; 


      .weekdays{
          min-width:250px; 
          border-left:1px solid var(--ed-silver-light);
          padding-right:20px;
          padding-left:9px;
          margin-right:20px;
          max-height:520px;
          overflow-y:auto;

          &::-webkit-scrollbar{
            width:6px !important;
            background-color:transparent !important;
          }
          
          &::-webkit-scrollbar-thumb{
              background:rgb(219, 219, 219) !important; 
          } 


            .week-item{
                position:relative; 
                margin-top:20px;

                  &:after{
                     position:absolute;
                     left:0px;
                     top:9px; 
                     content:"";
                     width:30px;
                     height:1px;
                     background:var(--ed-silver-light);
                  }

                  &:before{
                    position:absolute;
                    left:-10px;
                    top:-1px; 
                    content:"";
                    width:20px;
                    height:20px;
                    border-radius:100%; 
                    border:2px solid var(--ed-white);
                    box-shadow:var(--ed-shadow-1);
                    z-index:100;
                 }
                  
                  .week-header-title{
                    padding-left:35px;
                  }

               .week-body{
                  ul{
                    padding:0px; 
                      
                     li{
                        margin:15px 0px;
                        list-style:none;
                        border-bottom:1px solid var(--ed-silver-light);
                        padding-bottom:10px;
                        padding-left:10px; 

                          .small-el-title{
                              font-size:14px;
                              color:var(--ed-grey-text);   
                          }

                          .time{
                              font-size:13px;
                              margin-top:5px;

                              svg{
                                  margin-right:5px;
                              }
                          }


                     }
                  }
               }  
            }

            .week-item.wh1{&:before{background:var(--ed-orange);}}
            .week-item.wh2{&:before{background:var(--ed-green);}}
            .week-item.wh3{&:before{background:var(--ed-blue);}}
            .week-item.wh4{&:before{background:var(--ed-purple-light);}}
            .week-item.wh5{&:before{background:var(--ed-red);}}
            .week-item.wh6{&:before{background:var(--ed-brown);}}
            .week-item.wh7{&:before{background:var(--ed-gold);}} 

      } 
   }
`;

export default PP_calendar
