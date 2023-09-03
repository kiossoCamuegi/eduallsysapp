import React from 'react'
import styled from 'styled-components'
import { AiOutlineMenu, AiOutlinePlusCircle } from "react-icons/ai";
import { BsFillMenuButtonWideFill} from "react-icons/bs";
import { Add, AddCircleOutline, Delete, Done, Edit, Error, FileOpenOutlined,  FolderOutlined,  Info,  PlayArrowOutlined } from '@mui/icons-material';
import { Form } from 'react-bootstrap';
import { ClassDataOptions } from '../../../../General/components/InstituteData';

function CurricularPlanContent() {

    const IconType = [<><PlayArrowOutlined /></>, <><FileOpenOutlined /> </>, <><FolderOutlined /></>  ]
 
    
    const Data = [
        {section_title:'Geometria analitica',
          section_code:'',
          section_data:[
               {lesson_code:1, lesson_type:0,lesson_title:'Figuras geometricas'},
               {lesson_code:2, lesson_type:2,lesson_title:'Analise de sistemas quadraticos'},
               {lesson_code:3, lesson_type:0,lesson_title:'Estrutura de um quadardo linear'},
               {lesson_code:4, lesson_type:1,lesson_title:'Manuel de assistencia para exercicios'},
               {lesson_code:5, lesson_type:0,lesson_title:'exercicios de aplicação'},
          ] 
        },
        {section_title:'Trigonometria e Alegbra linear',
        section_code:'',
        section_data:[
             {lesson_code:1, lesson_type:0,lesson_title:'Figuras geometricas'},
             {lesson_code:2, lesson_type:2,lesson_title:'Analise de sistemas quadraticos'},
             {lesson_code:3, lesson_type:0,lesson_title:'Estrutura de um quadardo linear'},
             {lesson_code:4, lesson_type:1,lesson_title:'Manuel de assistencia para exercicios'},
             {lesson_code:5, lesson_type:0,lesson_title:'exercicios de aplicação'},
        ] 
      }
    ]
    
    
      return (
        <div>
          <Container> 
               <div className="content-block">
                   <div className="ed-space space-header">
                         <div>
                            <h1>Plano curricular da turma</h1>
                         </div>
                         <div className='ed-flex'>
                             <Form>
                                  <Form.Select>
                                      <ClassDataOptions/>
                                  </Form.Select>
                             </Form>
                         </div>
                   </div>
                   <ul>
                     {Data.map((item, index)=>{
                        return(
                            <li className="section-content" key={index}>
                             <section>
                                 <div className="section-header">
                                     <div className="ed-space"> 
                                          <div className="section-title">
                                              <BsFillMenuButtonWideFill /> <h2>{item.section_title}</h2>
                                          </div>  
                                         <button className='btn btn-danger-bordered text-danger'>Anular</button>
                                     </div>
                                 </div>
                                 <ol className="section-data">
                                     {item.section_data.map((content, i)=>{
                                         return(
                                            <li className={`section-data-item ${(i % 2 === 0) ? 'odd' : 'df'} `} key={i}>
                                                 <div className="ed-space">
                                                    <div className="section-data-item-title">
                                                        <div className="icon"><AiOutlineMenu/></div>
                                                        <div className="ed-flex">
                                                            {IconType[content.lesson_type] }
                                                            <h2>{content.lesson_title}</h2>
                                                        </div>
                                                    </div>
                                                    <div className="section-data-item-controls">
                                                      <div className="badge bg-success mr-2">Visualizar</div>
                                                        <div className="section-data-item-actions">  
                                                            <div className="status bg-info"><Done /> </div>
                                                            {/*
                                                              <div className="status bg-warning"><Info /> </div>
                                                               <div className="status bg-danger"><Error /> </div> 
                                                            */}
                                                        </div>
                                                    </div>
                                                 </div>
                                            </li>
                                         )
                                     })}
                                 </ol>
                            </section>
                         </li>
                        )
                     })}
                   </ul>
               </div>
          </Container>
        </div>
      )
}

const Container = styled.div`
   display:flex;
   width:100%; 
   justify-content:space-between;
   margin: 20px 0px;

   .chart-container{
        width:100%;   
        height:320px; 
    }

     .details-box{ 
        width:400px;
        min-width:400px;
        min-height:200px;  
        background:var(--ed-white);  
        box-shadow:var(--ed-shadow-df); 
        border-radius:6px; 
        padding:20px;
        position:relative;
     }


     .section-data-item-actions {
        display:flex;
        align-items:center;
        justify-content:center;

        .status{
          width:30px;
          height:30px;
          border-radius:100%;
          display:flex;
          align-items:center;
          justify-content:center;

           svg{
              width:18px;
              height:18px;
              margin:0px;
              color:var(--ed-white);
           }
      }
    }

     .content-block{ 
         width:100%;

         .space-header{
              h1{
                font-size:20px;
                margin:0px;
                font-weight:600;
              }
         }

            ul{
                padding:0px;
                margin:20px 0px;

                  li, ol{
                    margin:0px;
                  }

                  ol{
                      padding:0px;
                      
                  }

                  .section-content{
                    border:1px solid #E9ECEF; 
                    margin-bottom:30px; 
                    border-top-right-radius:6px;
                    border-top-left-radius:6px;

                    .ed-space{
                        padding:0px 10px;
                        height:60px;
                    }

                      .section-header, .section-data-item-title,
                      .section-title, .section-data-item-controls, .add-button{
                         display:flex;
                         align-items:center; 
                      }

                      .section-title{ 
                        padding-right:20px;
                        border-right:1px solid #E9ECEF; 
                        height:60px;
                      }

                      .add-button{
                        color:var(--grey);
                        padding-left:20px;
                        border-left:1px solid #E9ECEF; 
                        height:60px;
                        cursor:pointer;
                      }

                      h2{
                        font-size:18px;
                        margin:0px;
                        margin-left:10px;
                      }


                      .section-header,
                      .section-data-item.df{
                          background:var(--ed-white);
                      }

                      .section-data-item.odd{
                        background:var(--ed-grey);  
                      }

                      .section-data-item{
                        border-top:1px solid #E9ECEF; 
                        color:var(--grey);
                        cursor:grab;

                        .icon{
                            border-right:1px solid #E9ECEF; 
                            padding-right:0px;
                            height:60px;
                            width:55px;
                            align-items:center; 
                            display:flex;
                            justify-content:center; 
                            margin-right:10px;

                              svg{
                                  margin:0px !important;
                              }
                        }

                        h2{
                            color:var(--grey);
                        }
                         .section-data-item-actions{
                            border-left:1px solid #E9ECEF; 
                            padding-left:20px;
                            height:60px;

                            .ed-flex{  
                                height:100%;
                            }
                         }
                      }

                      .section-header{
                          box-shadow:var(--ed-shadow-df); 
                          border-top-right-radius:6px;
                          border-top-left-radius:6px;

                            svg{
                                 width:20px;
                                 height:20px;
                                 margin-right:10px;
                            }
                      }


                  }


            }
     }



`;


export default CurricularPlanContent
