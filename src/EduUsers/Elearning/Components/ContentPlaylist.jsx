import React from 'react'
import { styled } from 'styled-components'
import { ProgressBar } from 'react-bootstrap';
import {FaRegFilePdf} from "react-icons/fa";
import { Link } from 'react-router-dom';
import ReduceTextLength from '../../../General/components/ReduceTextLength';
import { FiLink2 , FiPlayCircle} from "react-icons/fi";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { BsFiletypeDoc} from "react-icons/bs";

function ContentPlaylist() {
const Icons = [<FaRegFilePdf/>, <FiPlayCircle/>, <AiOutlineQuestionCircle/>, <BsFiletypeDoc/>  ];

const CourseContent =  [ 
    {
        title:'',
        content:[
           { 
             id:0,  type:1,
             title:'',source:'',
             link:'',
             done_status:true
            },
            { 
              id:0,  type:1,
              title:'',source:'',
              link:'',
              done_status:false
            },
            { 
              id:0,  type:1,
              title:'',source:'',
              link:'',
              done_status:false
            },
        ]
     },
      {
        title:'',
        content:[
           { 
             id:0,  type:1,
             title:'',source:'',
             link:'',
             done_status:false
            },
            { 
              id:0,  type:1,
              title:'',source:'',
              link:'',
              done_status:false
            },
            { 
              id:0,  type:1,
              title:'',source:'',
              link:'',
              done_status:false
            },
        ]
     } ,
     {
        title:'',
        content:[
           { 
             id:0,  type:1,
             title:'',source:'',
             link:'',
             done_status:false
            },
            { 
              id:0,  type:1,
              title:'',source:'',
              link:'',
              done_status:false
            },
            { 
              id:0,  type:1,
              title:'',source:'',
              link:'',
              done_status:true
            },
            { 
                id:0,  type:1,
                title:'',source:'',
                link:'',
                done_status:true
            },
            { 
                id:0,  type:1,
                title:'',source:'',
                link:'',
                done_status:false
            },
            { 
                id:0,  type:1,
                title:'',source:'',
                link:'',
                done_status:false
            },
        ]
     } ,
     
]

  return (
    <Container>
            <div className="progress-status ed-space">
                <ProgressBar  variant='info' now={45} />
                <div className="percentage">45%</div>
             </div>   
             <ul>
                {CourseContent.map((item, index)=>{
                     return(
                         <ol key={index}>
                            <h2>Gestão de negocios em empresas</h2>
                              <>
                              {item.content.map((ContItem, i)=>{
                                 return( 
                                      <li key={i} progress={Math.floor((i+1 * 4)/ 100)}  className={`ed-flex ${ContItem.done_status ?  'done' : ''}` }>
                                            <div className="sts"></div>
                                            <div className="ed-block">
                                                <div className="ct-title">
                                                <FaRegFilePdf/>
                                                <span>Ferramentas fundameintas para começar</span>     
                                                </div>
                                                <div className="link text-main-light">
                                                    <FiLink2/>
                                                <small>
                                                    <Link to="#" className='text-main-light ml-1'>
                                                        <ReduceTextLength text='https://americanaddictioncenters.org/' length={30}/>
                                                    </Link>
                                                </small>
                                                </div>
                                            </div>
                                        </li> 
                                        )
                                     }) 
                                    }
                              </>
                        </ol>
                     )
                }) 
                }  
            </ul> 
    </Container>
  )
}

const Container = styled.div`
   min-width:410px;
   width:410px;
   height:100vh; 
   max-height:99vh;
   overflow-y:auto; 
   padding:20px 0px;
   padding-top:80px; 
   background:var(--ed-white);
   border-right:1px solid #E9ECEF; 

   .progress{
       width:85%;
       height:15px; 
   }

   &::-webkit-scrollbar{
      width:6px;
      background-color:transparent;
    }

    &:hover::-webkit-scrollbar-thumb{
        background:rgb(219, 219, 219); 
    }

    .progress-status{
        padding:10px 20px;
     }

    ul{ 
        background:var(--ed-background-color); 
        padding:0px;
        padding-top:20px;
        border-top:1px solid var(--ed-silver);

        ol{
            padding:10px 0px;

            h2{
                font-size:16px;
                font-weight:bolder !important;
                margin:0px 20px;
                margin-bottom:15px; 
            }

            li{
                align-items:flex-start;
                font-size:14px;
                padding:10px 20px;
                position:relative;
                border-bottom:1px solid var(--ed-silver);
                 
                div{
                    z-index:100;
                }

                &:after{
                      content:'';
                      width:100px;
                      height:100%;
                      position:absolute;
                      top:0px;
                      left:0px;
                      z-index:1;
                      background:rgba(112, 255, 114, 0.2);
                }

                .ed-block{
                    cursor:pointer;
                }

                svg{
                    margin-right:5px;
                }

                .sts{
                    width:25px;
                    min-width:25px;
                    height:25px;
                    border:3px solid var(--ed-silver);
                    margin-right:10px;
                    cursor:pointer;
                    border-radius:100%;
                }
            }

             li.done{
                .sts{
                  background:var(--ed-dark);
                  border:5px solid var(--ed-green);
                }
             }


        }
    }


`;

export default ContentPlaylist
