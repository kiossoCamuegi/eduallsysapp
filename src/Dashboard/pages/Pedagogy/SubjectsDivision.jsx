import React, { useEffect } from 'react'
import styled from 'styled-components';
import Navbar from '../../components/elements/Navbar';
import { Form, ProgressBar } from 'react-bootstrap';
import { ClassDataOptions, GetAcademicYear_byclass, GetAcademiclevel_byclass, GetClassroom_byclass, GetCourse_byclass, GetPeriod_byclass, GetemployeesOptionsType, SubjectDataOptions } from '../../../General/components/InstituteData';
import { FaEllipsisH } from 'react-icons/fa';
import ReduceTextLength from '../../../General/components/ReduceTextLength';
import { DockRounded, Folder, PlayCircle } from '@mui/icons-material';
import { AiOutlinePlayCircle ,AiOutlineUserAdd} from "react-icons/ai";
import { HiOutlineDocumentText } from "react-icons/hi";
import { Link } from 'react-router-dom';
import { Avatar, AvatarGroup } from '@mui/material';
import AsignSubjectsCanvas from '../../components/modal/Pedagogy/AsignSubjectsCanvas';
import Chart from 'react-apexcharts'; 
import ActiveTeachersAvatars from './components/ActiveTeachersAvatars';
import Hoot from '../../../General/components/Hoot';
import { GetFullWindowStatus, SetFullWindowStatus } from '../../components/elements/FullWindowStatus';

const Images = [
    require("../../../Assets/images/avatars/avatar-0.jpg"),
    require("../../../Assets/images/avatars/avatar-1.jpg"),
    require("../../../Assets/images/avatars/dp-3.jpg"),
    require("../../../Assets/images/avatars/avatar-3.jpg"),
    require("../../../Assets/images/avatars/avatar-4.jpg"),
    require("../../../Assets/images/avatars/avatar-5.jpg"),
    require("../../../Assets/images/avatars/avatar-6.jpg"),
    require("../../../Assets/images/avatars/avatar-7.jpg"),
    require("../../../Assets/images/avatars/dp-1.jpg"), 
    require("../../../Assets/images/avatars/dp-2.jpg"), 
    require("../../../Assets/images/avatars/dp-3.jpg"),  
    require("../../../Assets/images/avatars/dp-4.jpg"), 
    require("../../../Assets/images/avatars/dp-5.jpg"), 
    require("../../../Assets/images/avatars/dp-6.jpg"),  
]

function SubjectsDivision() {
    document.title = "Distribuir disciplinas"; 
    var ChartOptions =  [
     { 
      series: [70],
      options: {
        chart: {
          height: 100,
          type: 'radialBar',
        },
        plotOptions: {
          radialBar: {
            hollow: {
              size: '40%',
            },
            track: {
                background: '#1cbd00'
            }
          },
        },
        labels: [''],
      },  
    },
    { 
        series: [70],
        options: {
          chart: {
            height: 100,
            type: 'radialBar',
          },
          plotOptions: {
            radialBar: {
              hollow: {
                size: '40%',
              },
              track: {
                background: '#1cbd00'
              }
            },
          },
          labels: [''],
        },  
      }
     ];


     const DATAURL = [
        Hoot()+"",
        Hoot()+"",
        Hoot()+"",
     ];

   
     useEffect(()=>{
        setTimeout(() => {
            SetFullWindowStatus(true);
            GetFullWindowStatus()
        }, 500);
     },[]);


    return (
        <div> 
            <Container> 
              <Menu className='boxItem'>
              <Form >
               <Form.Group> 
                    <div className='mt-2'>  
                      <Form.Label>Disciplina</Form.Label>
                       <Form.Select > 
                          <SubjectDataOptions />
                        </Form.Select> 
                    </div> 
                    <div className='mt-2'>  
                       <Form.Label>Professor(a)</Form.Label>
                        <Form.Select> 
                             <GetemployeesOptionsType ID={0}/>
                        </Form.Select> 
                    </div>  
                    <div className='mt-2'> 
                        <Form.Label>Turma</Form.Label>
                        <Form.Select> 
                          <ClassDataOptions />
                        </Form.Select> 
                    </div>   
                 </Form.Group> 
               </Form>  
               <ul className="class-details">
                  <li className="ed-space">
                    <div className="ed-flex">
                       <div className="dt bg-orange"></div>
                       Tarefas
                    </div>
                    <div className="ed-flex">
                       <span>{0}</span>
                    </div>
                  </li>
                  <li className="ed-space">
                    <div className="ed-flex">
                       <div className="dt bg-green"></div>
                       Projectos
                    </div>
                    <div className="ed-flex">
                       <span>{0}</span>
                    </div>
                  </li>
                  <li className="ed-space">
                    <div className="ed-flex">
                       <div className="dt bg-red"></div>
                       Aulas
                    </div>
                    <div className="ed-flex">
                       <span>{0}</span>
                    </div>
                  </li>
                  <li className="ed-space">
                    <div className="ed-flex">
                       <div className="dt bg-blue"></div>
                        Estudantes
                    </div>
                    <div className="ed-flex">
                       <span>{0}</span>
                    </div>
                  </li>
               </ul>
               <hr />
               <ul className='curricular-plan'>
                  <h1>Plano curricular</h1>
                  <section>
                     {[{color:"red"},{color:'blue'}].map((item, index)=>{
                        return(
                            <article key={index}>
                            <div className="header">
                                <div className="icon" style={{background:`${item.color}`}}>A</div>
                                 <div className="ed-space">
                                      <div className="ed-block">
                                          <h2><ReduceTextLength length='19' text='Analise matematica' /></h2>
                                          <span>unidade 1</span>
                                      </div>
                                      <div className="toggle-btn">
                                          <FaEllipsisH/>
                                      </div>
                                 </div>
                            </div>
                          <div className="art-item single">
                              <div className="art-item-single">
                                <AiOutlinePlayCircle />
                                <span><ReduceTextLength length='12' text='Equações do primeiro grao com duas' /></span>
                              </div>
                          </div>
                          <div className="art-item">
                               <div className="mt">
                                  <div className="art-item-header">
                                      <Folder/><ReduceTextLength length='12' text='Trigonometria' /> 
                                  </div>
                                  <div className="art-item-sub-item">
                                      <div className="art-item-sub-item-header">
                                              <Folder /> 
                                              <ReduceTextLength length='9' text='Figuras geometricas' /> 
                                      </div>
                                      <div className="art-item-sub-item-content">
                                              <div className="art-item-sub-item-single">
                                                  <HiOutlineDocumentText/>
                                                  <span><ReduceTextLength length='10' text='circulos dimensionais' /></span>
                                              </div>
                                      </div> 
                                  </div>
                                  <div className="art-item-mt-single">
                                    <AiOutlinePlayCircle/>
                                    <span><ReduceTextLength length='12' text='Equações do primeiro grao com duas' /></span>
                                  </div>
                               </div>
                          </div>
                          <div className="art-item-new">
                             <div className="txt">
                                  <Link to='#' className='text-main-light'>Criar novo +</Link>
                             </div>
                          </div>
                        </article>
                        )
                     })
                     }
                  </section>
               </ul>
              </Menu>
                <Content>
                   <div className="ed-space">
                      <div className="ed-block">
                          <h1>Professores activos na instituição</h1>
                          <ActiveTeachersAvatars />
                      </div>
                      <div className="ed-block">
                         <AsignSubjectsCanvas  toggle_btn={
                            <button className='btn bg-main ed-flex'>
                                <div className="mr-1"><AiOutlineUserAdd/></div>
                                Distribuir
                            </button>
                         } />
                      </div>
                   </div>
                     <Box className='boxItem'>
                        <div className="title">
                            <h1>Distribuição das disciplinas</h1>
                        </div>
                        <ul>
                            {Images.map((teacher, id)=>{
                               return(
                                <li key={id}>
                                <div className="header">
                                    <div className="ed-space">
                                            <div className="ed-flex">
                                                <Avatar alt='carlos' src={teacher} sx={{background:'#2B9348',width:50,height:50}} />
                                                <div className="ed-block ml-2">
                                                    <h4>Manuel pedro de sousa</h4>
                                                    <div className="ed-flex">
                                                        <small>Disciplina :</small> <small className='text-red'>Matematica</small>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="badge bg-orange text-white">Turma : LOP30</div>
                                            </div>
                                        </div>
                                    </div>
                                    <ol>
                                    {[""].map((item, index)=>{
                                        return(
                                            <section key={index} className="class-dt">
                                            <div className="mt-4 ed-wrap">
                                                <div className="badge bg-green-light mr-2 text-dark mt-2">
                                                    Ano lectivo : <GetAcademicYear_byclass ID={21}/>
                                                </div>
                                                <div className="badge bg-main-light mr-2 mt-2">
                                                Sala : <GetClassroom_byclass ID={21}/>
                                                </div>
                                                <div className="badge bg-main-light mr-2 mt-2">
                                                Curso : <GetCourse_byclass ID={21}/>
                                                </div>
                                                <div className="badge bg-main-light mr-2 mt-2">
                                                    Periodo : <GetPeriod_byclass ID={21}/>
                                                </div> 
                                                <div className="badge bg-main-light mt-2">
                                                    Classe : <GetAcademiclevel_byclass ID={21}/>
                                                </div> 
                                            </div>
                                            <div className="sub-header mt-4">
                                                <h5>Calendário de aulas na turma xxx</h5>
                                            </div>
                                            <div className="ed-wrap">
                                                <div className="tm-box mt-2 text-main-light mr-2 ed-flex">
                                                    10:00 - 11:30 / Segunda-feira
                                                </div>
                                                <div className="tm-box mt-2 text-main-light mr-2 ed-flex">
                                                    09:00 - 10:30 / Quarta-feira
                                                </div>
                                                <div className="tm-box mt-2 text-main-light mr-2 ed-flex">
                                                    11:00 - 11:30 / Sexta-feira
                                                </div>
                                            </div>
                                            </section>
                                        )
                                    })
                                    }
                                    </ol>
                                </li>
                               )
                            })
                            }
                        </ul>
                     </Box>
                </Content>
                 <Menu className='boxItem'>
                    <section className='cr-situation'>
                        <div className="chart-box bg-gold text-dark">
                             <div className="ed-space">
                                <div><h2>Estatística dos professores</h2></div>
                                <div><h2>%</h2></div>
                             </div>
                             <div className="charts-container ed-block ">
                                  {ChartOptions.map((item, index)=>{
                                     return(
                                        <div className='mt-4' key={index}>
                                           <strong>###</strong>
                                           <ProgressBar  variant='danger' now={6*(1+index*4)} /> 
                                       </div>
                                     )
                                  }) 
                                  }
                             </div>
                        </div>
                        <div className="chart-box mt-2 bg-black text-light">
                            <div className="ed-space">
                                <div><h2>Estatística dos alunos</h2></div>
                                <div><h2>%</h2></div>
                             </div>
                             <div className="charts-container ed-block">
                                  {ChartOptions.map((item, index)=>{
                                     return(
                                         <div className='mt-4' key={index}>
                                            <strong>###</strong>
                                             <ProgressBar  variant='primary' now={6*(1+index*5)} /> 
                                         </div>
                                     )
                                  }) 
                                  }
                             </div>
                        </div>
                        <h1>Situação curricular</h1>
                            <ul>
                            {Images.map((item, index)=>{
                                return (
                                <li key={index}>
                                    <div className="ed-space">
                                       <div className="ed-flex">
                                            <Avatar alt='carlos' src={item} sx={{background:'#2B9348',width:40,height:40}} />
                                            <div className="ed-block ml-2">
                                                <h4><ReduceTextLength text='Manuel pedro de sousa' length={15} /></h4>
                                                <div className="ed-flex">
                                                    <small>Disciplina :</small> 
                                                    <small className='text-red ml-1'>
                                                       <ReduceTextLength text='Matematica' length={7} />
                                                    </small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                   <div className="class ed-flex">
                                       <strong>Turma:</strong> 
                                       <span>HSJ3</span>
                                   </div>
                                   <ProgressBar  variant='info' now={6*(index+1)} />
                                   <div className="ed-space bottom-info">
                                       <div className="ed-flex">
                                           <strong>90 /</strong>
                                           de 178 aulas
                                       </div>
                                       <div className="ed-flex">{6*(index+1)}%</div>
                                   </div>
                                </li>
                                )
                            })
                            }
                     </ul>
                    </section>
                 </Menu>
            </Container>
            <br />
        </div>
      ) 
} 

const Container = styled.div`
    width:100%;
    display:flex;
`; 


const Menu = styled.div`  
  max-height:950px;   
  background:var(--ed-white);
  border-radius:6px;
  width:270px; 
  min-width:270px;
  max-width:270px;  
  box-shadow:var(--ed-shadow-df);

  
  .progress {
      height:6px;
   }


      form{
        padding:0px 20px;  
        margin:0px; 
      }


      ul.class-details{
           padding:5px 20px;
           margin:0px;

           li{
              margin:10px 0px;
              font-size:15px;

                .dt{
                     margin-right:10px;
                     width:8px;
                     height:8px;
                     border-radius:100%;
                }

                span{
                      color:var(--secondary);
                }
           }
      }

      hr{
        border:1px solid #dadbdb; 
        margin:10px 0px;
      }


    ul.curricular-plan{
        margin:0px;
        padding:7px 20px;

        h1{
            font-weight:600;
            font-size: 18px; 
            margin:0px;
        }

         section{   
            overflow-y: auto;
            max-height:34vh;
            padding-right:10px; 


            &::-webkit-scrollbar{
                width:6px !important;
                background-color:transparent !important;
            }
            
            &:hover::-webkit-scrollbar-thumb{
                background:rgb(219, 219, 219) !important; 
            }



              article{
                 margin-top:30px;
                 position:relative;

                 position:relative;
                 &:after{
                     content:'';
                     position:absolute; 
                     width:1px; 
                     background:silver;
                     top: 0;
                     bottom: 0;
                     left:16px;
                 }

             
                        
                    .art-item-new{
                        padding-top:10px;
                        padding-left:50px;
                        font-size:13px;

                        .txt{  
                            position:absolute;
                            left:50px;
                            top:0px;
                        }

                        position:relative;
                        &:before{
                            content:'';
                            position:absolute; 
                            width:28px;
                            height:1px; 
                            background:silver;
                            bottom:0px; 
                            left:16px;
                        }
                    } 

                    .header{
                         display:flex;
                         
                         .icon{
                              color:var(--ed-white);
                              font-size:20px;
                              text-transform:uppercase;
                              height:40px;
                              width:40px;
                              min-height:40px;
                              min-width:40px;
                              border-radius:5px;
                              display:flex;
                              align-items:center;
                              justify-content:center;
                              z-index:100;
                              position:relative;
                         }

                         

                         .ed-space{
                            align-items:flex-end; 
                          }

                        .ed-block{
                            padding-left:10px; 

                            h2{
                              font-size:14px;
                              color:var(--ed-dark);
                              margin:0px;
                            }

                            span{
                                color:var(--dark);
                                font-size:12px;
                            }  
                        }

                        .toggle-btn{ 
                            cursor:pointer;
                              
                              svg{
                                  fill:grey;
                                  width:10px;
                              }
                        }
                        
                    }

                    .art-item .mt{
                        position:relative; 
                        margin:20px 0px;
                   
                        &:after{
                            content:'';
                            position:absolute; 
                            width:1px; 
                            background:silver;
                            top:0px;
                            bottom: 0;
                            left:15px;
                        }

                    }

                    
                    .art-item{ 
                        padding-left:45px; 
                        margin:10px 0px; 
                        position:relative; 

                           svg{
                              width:15px;
                              margin-right:10px;
                           }

                           .art-item-single{
                              font-size:14px;
                              display:flex; 
                              align-items:center;
                              cursor:pointer;

                              position:relative;
                                &:before{
                                    content:'';
                                    position:absolute; 
                                    width:28px;
                                    height:1px; 
                                    background:silver;
                                    top:10px; 
                                    left:-29px;
                                }
                           }


                           .art-item-header{
                               background:#d9f8eb !important;
                               color:var(--ed-dark);
                               padding:0px 6px;
                               border-radius:4px;
                               font-size:14px;
                               position:relative;
                               z-index:100;
                               cursor:pointer;
                                
                                &:before{
                                    content:'';
                                    position:absolute; 
                                    width:28px;
                                    height:1px; 
                                    background:silver;
                                    top:10px; 
                                    left:-29px;
                                }

                                 svg{
                                      color:rgb(218, 159, 9);
                                      fill:rgb(218, 159, 9);
                                 }
                           }

                           

                           .art-item-mt-single{
                                font-size:13px;
                                display:flex;
                                align-items:center;
                                padding-left:25px;
                                padding-top:0px;
                                
                               position:relative;
                               &:before{
                                   content:'';
                                   position:absolute; 
                                   width:8px;
                                   height:1px; 
                                   background:silver;
                                   top:10px; 
                                   left:17px;
                               }
                            }

                           .art-item-sub-item{
                                padding-left:25px;
                                font-size:13px;
                                margin:10px 0px;
                                position:relative;

                                &:after{
                                    content:'';
                                    position:absolute; 
                                    width:1px; 
                                    background:silver;
                                    top:0px;
                                    bottom: 0;
                                    left:36px;
                                }

                                  .art-item-sub-item-header{
                                      background:#ffe2e2 !important;
                                      padding:0px 6px;
                                      border-radius:4px; 
                                      position:relative;
                                      z-index:100;
                                      cursor:pointer;

                                      &:before{
                                          content:'';
                                          position:absolute; 
                                          width:10px;
                                          height:1px; 
                                          background:silver;
                                          top:10px; 
                                          left:-10px;
                                      }

                                      svg{
                                        color:rgb(218, 159, 9);
                                        fill:rgb(218, 159, 9);
                                     }
                                  }
                             
                                   .art-item-sub-item-content{
                                    position:relative; 
                                    padding-left:20px;

                                    .art-item-sub-item-single{
                                        margin-top:10px; 
                                        padding-left:15px;

                                        position:relative;
                                        &:before{
                                            content:'';
                                            position:absolute; 
                                            width:22px;
                                            height:1px; 
                                            background:silver;
                                            top:10px; 
                                            left:-8px;
                                        }
                                    }
                                   }



                           } 

                    }  
              }   
        } 
    }

 .cr-situation{
    padding:20px;

     .chart-box{
        width:100%; 
        border-radius:6px;   
        padding:10px;
        min-height:100px;   
        box-shadow:var(--ed-shadow-df);

           .ed-space{
                h2{
                    font-size:13.5px;
                    margin:0px;
                    font-weight:600;
                }
           }
     }

     h1{
        font-weight:600;
        font-size: 18px; 
        margin:0px;
        margin-top:20px;
     }

     ul{
          padding:0px;
          padding-right:5px;
          margin:10px 0px;
          max-height:36vh;
          overflow-y:auto;
          
          &::-webkit-scrollbar{
            width:6px !important;
            background-color:transparent !important;
        }
        
        &:hover::-webkit-scrollbar-thumb{
            background:rgb(219, 219, 219) !important; 
        }


        li{
            background:#eff2fb;
            padding:10px;
            border-radius:6px;
            list-style:none;
            margin: 10px 0px;

            .ed-block{
                padding-left:5px; 

                h4{
                  font-size:14px;
                  color:var(--ed-dark);
                  margin:0px;
                }

                small{
                    color:var(--dark);
                    font-size:12px;
                }  
            }

            .progress {
                height:6px;
            }


            .class{
                  font-size:14px;
                  margin:10px 0px;

                    strong{
                        font-size:14px !important;
                        margin-right:8px;
                    }
            } 

           .bottom-info{
              margin-top:10px;
              font-size:12px;
               
              strong , .ed-flex{
                 font-size:12px;
              }
           }
           

          }
     }

 }


`;

const Box = styled.div`
    width:100%; 
    border-radius:6px;   
    padding:20px 0px;
    min-height:300px;
    height:auto;
    background:var(--ed-white);  
    box-shadow:var(--ed-shadow-df);
    margin:10px 0;
    position:relative; 

    .title{
        padding:0px 20px;

        h1{
            font-weight:600;
            font-size: 18px; 
            margin:0px;
        }
    }
 
     ul{
        padding:0px;
        margin:0px;
         
        li{
            margin:25px 0px; 
            list-style:none;

            .header{
                background:#eff2fb;
                padding:10px 20px;
                position:relative;
                z-index:100;

                  .ed-block{
                    padding-left:20px;

                      h4{ 
                        margin:0px;
                        font-size:16px;
                      }

                  }
            }

             ol{ 
                 margin-top:-2px;
                 padding:0px 20px;

                  .class-dt{
                    border:2px dashed silver; 
                    margin:0px; 
                    border-top-color:transparent;

                    .sub-header{
                        background:#eff2fb;
                        padding:10px 20px;

                          h5{
                              padding:0px;
                              margin:0px;
                              font-size:16px;
                          }
                    }

                     .ed-wrap{
                       padding:20px;

                         .tm-box{
                            padding:8px 14px;
                            border:1px solid var(--ed-purple-light);
                            border-radius:6px;
                            font-size:15px;
                         }
                     }
                  }


          


             }
        }
     }


`;

const Content = styled.div`
    width:100%; 
    height:calc(100vh - 80px);
    max-height:calc(100vh - 80px); 
    background:var(--ed-background-color);
    padding:20px; 
    overflow-y:auto;

   .ed-space{
      
    h1{
        font-weight:600;
        font-size: 18px; 
        margin:10px 0px;
    }

     .MuiAvatarGroup-root{
        max-width:max-content !important;
     }
   }

   &::-webkit-scrollbar{
        width:6px !important;
        background-color:transparent !important;
    }
 
    &::-webkit-scrollbar-thumb{
        background:rgb(219, 219, 219) !important; 
    }

`;

export default SubjectsDivision;