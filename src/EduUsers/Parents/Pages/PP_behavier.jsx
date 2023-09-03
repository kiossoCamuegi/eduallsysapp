import React from 'react'
import { styled } from 'styled-components';
import ProgressBar from 'react-bootstrap/ProgressBar';
import {BsEmojiSmile,BsEmojiExpressionless,BsEmojiLaughing,BsEmojiAngry,BsEmojiFrown} from "react-icons/bs";
import { Avatar } from '@mui/material';
import {BsStarFill,BsStarHalf, BsStar} from "react-icons/bs";

function PP_behavier() {
  return (
    <div>
        <div className="mt-4">
          <Box>
            <h1 className="title">Avaliação do comportamento</h1>
             <div className="avaliation-progress">
                <div className="ed-flex mt-2">
                    <div><span><BsEmojiSmile /> 34</span></div>
                      <div className='progress-box'><ProgressBar now={90} /></div>
                    <div><span>Bem educado</span></div>
                 </div>
                 <div className="ed-flex mt-2">
                    <div><span><BsEmojiExpressionless /> 12</span></div>
                      <div className='progress-box'><ProgressBar now={60} /></div>
                    <div><span>Distraido nas aulas</span></div>
                 </div>
                 <div className="ed-flex mt-2">
                    <div><span><BsEmojiLaughing /> 9</span></div>
                      <div className='progress-box'><ProgressBar now={40} /></div>
                    <div><span>Participação activa</span></div>
                 </div>
                 <div className="ed-flex mt-2">
                    <div><span><BsEmojiAngry /> 15</span></div>
                      <div className='progress-box'><ProgressBar now={20} /></div>
                    <div><span>Rebelde e confusionista</span></div>
                 </div>
                 <div className="ed-flex mt-2">
                    <div><span><BsEmojiFrown /> 18</span></div>
                    <div className='progress-box'><ProgressBar now={10} /></div>
                    <div><span>Atrasado nas aulas</span></div>
                 </div>
             </div>
          </Box>
        </div>
        <div className="mt-4">
          <Box>
             <h1 className="title">Comentários</h1>
             <section className="comments">
                 {[1,2,3,4,5].map((comment, index)=>{
                    return( 
                      <article key={index} className='comment'>
                          <div className="comment-header">
                              <div className="avatar-box">
                                   <div className="status"></div>
                                   <Avatar src="" sx={{width:60,height:60}} />  
                               </div>
                              <div className="ed-block">
                                 <div className="name">some random name here</div>
                                 <small>13 dias atrás</small>
                              </div>
                          </div>
                          <div className="comment-body">
                             <div className="stars">
                                 <div><BsStarFill /> </div>
                                 <div><BsStarFill /> </div>
                                 <div><BsStarFill /> </div>
                                 <div><BsStarHalf /> </div>
                                 <div><BsStar /> </div>
                             </div>
                             <p>Bom aluno , tem boas notas e é muito habilidoso no seu trabalho, acredito que com um pouquinho mais de 
                              foco e objetivos traçados vira a ser um grande aluno e um  grande engenheiro um dia basta continuarem a dar o
                              devido suporte e veremos um grande ser crescendo.</p>
                          </div>
                      </article>
                    )
                 })}
             </section>
          </Box>
        </div>
    </div>
  )
}

const Box = styled.div`
    background:var(--ed-white); 
    border-radius:6px; 
    box-shadow:var(--ed-shadow-df);
    width:100%;
    margin:20px 0px; 
    padding:20px; 

    
   .title{
      font-size: 18px;
      font-weight: 600;
      margin: 0px; 
    }

    .avaliation-progress{ 
      margin-top:20px;

      div{
        min-width:70px;
        font-size:16px;
      }

      div span svg{
         width:22px;
         height:22px;
         margin-right:6px;
      }

      .progress-box{
        width:73%; 
        margin:0px 15px;

        .progress-bar{
          background:var(--ed-purple-light) !important;
        }
   
       .progress {
         width:100%;
         height:8px !important;
        }
      }
    }





    .comments{
        display:block;
        padding:20px 0px;

          .comment{
              margin:10px 0px;

              small,p{
                  font-size:15px;
                  color:var(--ed-grey-text);
              }

              .comment-header{
                  display:flex;

                  .avatar-box{
                     width:60px;
                     height:60px;
                     position:relative;

                      .status{
                         position:absolute;
                         top:-2px;
                         right:2px;
                         width:15px;
                         height:15px;
                         background:var(--ed-green);
                         z-index:100;
                         border-radius:100%;
                         border:3px solid var(--ed-white);
                         box-shadow:var(--ed-shadow-df);
                      } 
                  }

                  .ed-block{
                    padding-left:20px;

                      .name{
                         font-size:16px;
                         font-weight:500;
                      }
                  }

              }


              .comment-body{
                 
                .stars{
                    display:flex;
                    margin:10px 0px;

                     div{
                        margin-right:10px;

                        svg{
                            color:var(--ed-gold);
                        }
                     }
                }



                border-bottom:1px solid var(--ed-silver);
                padding-bottom:40px;
                margin-bottom:30px;
              } 
          }



    }


`;


export default PP_behavier
