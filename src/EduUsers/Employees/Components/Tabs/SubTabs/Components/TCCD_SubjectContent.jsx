import React, { useState } from 'react'
import styled from 'styled-components'
import { AiOutlineMenu, AiOutlinePlusCircle } from "react-icons/ai";
import { BsFillMenuButtonWideFill} from "react-icons/bs";
import { Add, AddCircleOutline, Delete, Edit, FileOpenOutlined,  FolderOutlined,  PlayArrowOutlined } from '@mui/icons-material';
import Chart from 'react-apexcharts'; 
import CreateContentModal from '../Modal/CreateContentModal';
import { ProgressBar } from 'react-bootstrap';
import { GetClasstitle_byclass, GetSubject } from '../../../../../../General/components/InstituteData';
import { Form } from 'react-bootstrap'
import CreateLessonSectionModal from '../Modal/CreateLessonSectionModal';

function TCCD_SubjectContent(props) {
  const [dragContentItemIndex, setdragContentItemIndex] = useState();
  const [dragOverContentItemIndex, setdragOverContentItemIndex] = useState();

const IconType = [<><PlayArrowOutlined /></>, <><FileOpenOutlined /> </>, <><FolderOutlined /></>  ]

const ChartOptions_donut = {
    series: [44, 55 ], 
    labels: ['Finalisado', 'Não finalizado'], 
    options: { 
      chart: {
        width: 200
      },
      colors: ['var(--ed-purple-light)', 'var(--ed-silver)'],
      legend: {
        position: 'top'
      }
    } 
  }

const [Data, setData] = useState([
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
]);



//handle drag start
const HandleonContentDragStart = (index)=>{
     setdragContentItemIndex(index);
}

//handle drag over
const HandleonContentDragOver = (e)=>{
  e.preventDefault();
}

//handle drop

const HandleonContentDrop = (index, pos)=>{
     console.log(`Move item  ${dragContentItemIndex} to position ${index} on array   ${pos} `);

     const OldData = Data;
     const DataToUpdatePosition = []; 

     const _data = [...Data];
     const dragItem = _data[pos].section_data.splice(dragContentItemIndex, 1); 
     _data[pos].section_data.splice(dragOverContentItemIndex, 0 , dragItem[0]);
     setData(_data); 

     for(let i = 0; i < _data.length; i++) {
         
     }



}

const HandleDragEnter = (index)=>{
     console.log("New position ", index);
    setdragOverContentItemIndex(index);
} 

const HandleDragLeave = (e)=>{
     setdragContentItemIndex(undefined);
}

const HandleDragEnd = (e)=>{
  setdragContentItemIndex(undefined);
  setdragOverContentItemIndex(undefined);
}


 

  return (
    <div>
      <Container>
        <div>
            <Form >
             <div className="ed-flex mb-4">
                 <div style={{minWidth:'170px'}}>
                    <Form.Label>Turma - Disciplina</Form.Label>
                 </div>
                 <Form.Select text="number" id="quarterly_note_npp">
                      {props.data.map((item, index)=>{
                          return(<option value={item.ed_tch_subject_class + "|"+ item.ed_tch_subject_code}> 
                                <GetClasstitle_byclass ID={item.ed_tch_subject_class} /> 
                                ( <GetSubject ID={item.ed_tch_subject_code} /> )
                            </option>)
                      })} 
                  </Form.Select>
             </div>
            </Form> 
           <div className="details-box">
               <div className="content">
               <div className="chart-container">
                 <Chart  
                    options={ChartOptions_donut.options}
                    series={ChartOptions_donut.series}
                    labels={ChartOptions_donut.labels}
                    type='pie'  height='100%' width="99%"
                 /> 
                 <div className="block-data mt-4">
                    <div className="ed-space mb-2">
                        <div className="ed-flex"><strong>23 aulas de / 90</strong>  </div>
                        <div className="ed-flex">45%</div>
                    </div>
                    <ProgressBar  variant='info' now={45} />
                 </div>
                 <div className="block-data mt-4">
                    <div className="ed-space mb-2">
                        <div className="ed-flex"><strong>23 aulas de / 90</strong>  </div>
                        <div className="ed-flex">45%</div>
                    </div>
                    <ProgressBar  variant='danger' now={45} />
                 </div>
                 <div className="block-data mt-4">
                    <div className="ed-space mb-2">
                        <div className="ed-flex"><strong>23 aulas de / 90</strong>  </div>
                        <div className="ed-flex">45%</div>
                    </div>
                    <ProgressBar  variant='warning' now={45} />
                 </div>
                 <div className="block-data mt-4">
                    <div className="ed-space mb-2">
                        <div className="ed-flex"><strong>23 aulas de / 90</strong>  </div>
                        <div className="ed-flex">45%</div>
                    </div>
                    <ProgressBar  variant='primary' now={45} />
                 </div>
               </div>
               </div>
           </div>
        </div> 
           <div className="content-block">
               <div className="ed-space space-header">
                     <div>
                        <h1>Plano curricular da turma</h1>
                     </div>
                     <div className='ed-flex'>
                        <button className="bg-black btn ed-flex">
                            <div className="mr-1"><AddCircleOutline /></div> 
                            Adicionar conteudo
                        </button>
                        <CreateLessonSectionModal 
                         TeacherClassCode={null}
                         data={props.data}
                          toggle_btn={
                            <button className="bg-main btn ed-flex ml-2">
                             <div className="mr-1"><FolderOutlined /></div> 
                                Criar capitulo / secção
                           </button>
                          }
                        /> 
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
                                      <CreateContentModal data={props.data}  /> 
                                 </div>
                             </div>
                             <ol className="section-data">
                                 {item.section_data.map((content, i)=>{
                                     return(
                                        <li draggable 
                                           onDragStart={()=> HandleonContentDragStart(i)} 
                                           onDragOver={HandleonContentDragOver} 
                                           onDrop={()=>HandleonContentDrop(i, index)} 
                                           onDragEnter={()=>HandleDragEnter(i)}
                                           onDragLeave={HandleDragLeave} 
                                           onDragEnd={HandleDragEnd}
                                           className={`section-data-item ${(i % 2 === 0) ? 'odd' : 'df'} `} key={i}>
                                             <div className="ed-space">
                                                <div className="section-data-item-title">
                                                    <div className="icon"><AiOutlineMenu/></div>
                                                    <div className="ed-flex">
                                                        {IconType[content.lesson_type] }
                                                        <h2> {i} - {content.lesson_title}</h2>
                                                    </div>
                                                </div>
                                                <div className="section-data-item-controls">
                                                  <div className="badge bg-success mr-2">Visualizar</div>
                                                    <div className="section-data-item-actions"> 
                                                        <div className="ed-flex">
                                                            <button   className="btn-circle bg-success text-light">
                                                                <Edit />
                                                            </button>   
                                                            <button  className="btn-circle bg-danger ml-2 text-light">
                                                                <Delete />
                                                            </button>
                                                        </div>
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

   .ed-flex.mb-4{
      align-items:center;

        label{
          margin:0px;
        }
   }

   .progress {
      height:6px;
   }

   .chart-container{
        width:100%;   
        height:320px; 
    }

     .details-box{ 
        width:400px;
        min-width:400px;  
        min-height:700px;
        background:var(--ed-white);  
        box-shadow:var(--ed-shadow-df); 
        border-radius:6px; 
        padding:20px;
        position:relative; 
     }

     .content-block{
         padding-left:30px;
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
                        cursor:move;

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



export default TCCD_SubjectContent
