import { AttachFile, AttachFileOutlined, Send } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import React from 'react'
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import styled from 'styled-components'
import RandomAvatarColor from '../../General/components/RandomAvatarColor';
import {RichTextEditor} from '../../General/components/RichTextEditor';
import EmailImage from '../../Assets/images/svg/EmailImage.svg'; 
import { UserAccountData } from '../../General/components/UserAccountData';
import Hoot from '../../General/components/Hoot';
import { Link } from 'react-router-dom';
import { BsChatSquareText } from "react-icons/bs";

function MailServices() {
    document.title = "Serviços de email";
    const contacts = [
       {type:'st', ed_contact_email:'#'},
       {type:'emp', ed_contact_email:'#'},
       {type:'prt', ed_contact_email:'#'},
       {type:'st', ed_contact_email:'#'},
       {type:'emp', ed_contact_email:'#'},
       {type:'prt', ed_contact_email:'#'}, 
       {type:'st', ed_contact_email:'#'},
       {type:'emp', ed_contact_email:'#'},
       {type:'prt', ed_contact_email:'#'},
    ];
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [CurrentEmail, setCurrentEmail] = useState(null);
    
    const FileIcons = [
        /**0  */require('../../Assets/images/icons/adobe.png'),
        /**1  */require('../../Assets/images/icons/adobe.png'),
        /**2  */require('../../Assets/images/icons/audio.png'),
        /**3  */require('../../Assets/images/icons/docs.png'),
        /**4  */require('../../Assets/images/icons/excel.png'),
        /**5  */require('../../Assets/images/icons/figma.png'),
        /**6  */require('../../Assets/images/icons/google_drive.png'),
        /**7  */require('../../Assets/images/icons/image.png'),
        /**8  */require('../../Assets/images/icons/powerpoint.png'),
        /**9  */require('../../Assets/images/icons/txt.png'),
        /**10 */require('../../Assets/images/icons/video.png'),
        /**11 */require('../../Assets/images/icons/word.png'),
        /**12 */require('../../Assets/images/icons/xml.png'), 
    ];



    const SelectEmail = (e, email)=>{
         setSelectedEmail(e);
         setCurrentEmail(email);
    }

const data = UserAccountData();

 
       return (
     <Container>
        <div className="contacts-list">
            <Form>
            <div className="ed-space mb-4">
                <div>
                    <h3>Envio de Emails</h3>
                </div>
                <div>
                    <Form.Select aria-label="Default select example">
                        <option>Todos</option>
                        <option value="1">One</option> 
                    </Form.Select>
                </div>
            </div>
            <div className="filters">
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"> 
                <Form.Control type="email" placeholder="Pesquisar ..." />
            </Form.Group> 
          </div> 
        </Form>
        <div className="contacts-container">
              <ul>
                {
                    contacts.map((item,index)=>{
                        return(
                            <div className="block"> 
                                    <li key={index} onClick={()=>SelectEmail(index, item.ed_contact_email)} className={`${selectedEmail === index ? 'bg-main-light' : ''}`}>
                                      <div className="ed-space">
                                          <div className="ed-flex">
                                            <Avatar sx={{height:40,width:40}} style={{background:`${RandomAvatarColor()}`}} src="" alt="#" />
                                            <div className="block ml-2">
                                                <div className="name mt-2">Sara Manuel</div> 
                                            </div>
                                        </div>
                                        <div className="ed-flex mt-2 align-center"> 
                                           <div className="file"><AttachFileOutlined/></div>
                                           <div className="date">10:30 AM</div>
                                        </div> 
                                      </div>
                                        <div className="message-block">
                                            <div className="title"><strong>Relátorio de contas</strong></div>
                                            <span className="latest-email">
                                                O conteúdo deste email é confidencial e destinado ao destinatário  ....
                                            </span>
                                        </div>
                                    </li> 
                            </div>
                        )
                    })
                }
            </ul>
        </div>
        </div>
        <div className="mail-box">
            <div className="mail-box-content">
                {
                    CurrentEmail === null  ? 
                       <div className='empty-block'>
                            <img loading="lazy" role="presentation" src={EmailImage} alt="emails" />
                       </div>
                    :  
                    <>
                    <div className="top-content">
                       <div className="ed-space">
                           <div className="ed-flex">
                              <Avatar  style={{background:`${RandomAvatarColor()}`}} sx={{width:50,height:50}} >AO</Avatar>
                                 <div className="block ml-2">
                                     <div className="name"><strong>Andre Omega</strong></div>
                                     <small>andresilvaomega@gmail.com</small>
                                 </div>
                           </div>
                           <div className="ed-flex">
                                  <Link to='/chat' className='btn bg-main-light'> 
                                     <BsChatSquareText/>
                                  </Link>
                           </div>
                       </div>
                    </div>
                    <section className="emails-content">
                         <article className="mail-message">
                           <div className="ed-space">
                             <div className="ed-flex">
                                  <Avatar src='' style={{background:`${RandomAvatarColor()}`,fontSize:'15px'}} sx={{width:40,height:40}} >{''} </Avatar>
                                  <div className="name ml-2"><strong>{''}</strong></div>
                            </div>
                            <div className="date-time">Amanhã, 18:39 (há 0 minutos)</div>
                           </div>
                           <div className="mail-message-content mt-4">
                               <p>
                                 A escola (do grego scholé, através do termo latino schola) tinha como significado, “discussão ou conferência”, mas também “folga ou ócio”.
                               </p>
                               <p className='mt-4'>
                                  Este último significado, no caso, seria um tempo ocioso onde era possível ter uma conversa interessante e educativa.[1] Hoje é uma instituição concebida para o
                                  ensino de alunos sob a direção de professores.[2] A maioria dos países tem sistemas formais de educação, que geralmente são obrigatórios. Nestes sistemas, os 
                                </p> 
                                <p className='mt-4'>
                                  estudantes progridem através de uma série de níveis escolares e sucessivos. Os nomes para esses níveis nas escolas variam por país, mas geralmente incluem o 
                                  ensino fundamental (ensino básico) para crianças e o ensino médio.
                                </p>  
                                <div className="ed-wrap">

                                    <div className="file-box">
                                        <a href="#">
                                            <div className="file-box-content">
                                                <div className="icon">
                                                    <img loading="lazy" role="presentation" src={FileIcons[0]} alt="" />
                                                </div>
                                               <div className="block ml-2">
                                                     <div className="file-name">Manual de desenvolvimento psicologico ...</div>
                                                     <div className="file-size bg-main-light">15MB</div>
                                               </div>
                                            </div>
                                        </a>
                                    </div>
                                      <div className="file-box">
                                        <a href="#">
                                            <div className="file-box-content">
                                                <div className="icon">
                                                    <img loading="lazy" role="presentation" src={FileIcons[4]} alt="" />
                                                </div>
                                               <div className="block ml-2">
                                                     <div className="file-name">Manual de desenvolvimento psicologico ...</div>
                                                     <div className="file-size bg-main-light">15MB</div>
                                               </div>
                                            </div>
                                        </a>
                                    </div>


                                </div>
                           </div>
                         </article>
                         <article className="mail-message">
                           <div className="ed-space">
                             <div className="ed-flex">
                                  <Avatar src={''} style={{background:`${RandomAvatarColor()}`,fontSize:'15px'}} sx={{width:40,height:40}} >{''} </Avatar>
                                  <div className="name ml-2"><strong>{''}</strong></div>
                            </div>
                            <div className="date-time">Amanhã, 18:39 (há 0 minutos)</div>
                           </div>
                           <div className="mail-message-content mt-4">
                              <p><b>William Henry Gates III</b> <small><a href="/wiki/Ordem_do_Imp%C3%A9rio_Brit%C3%A2nico" title="Ordem do Império Britânico">KBE</a></small> • <small><a href="/wiki/Ordem_do_Infante_D._Henrique" title="Ordem do Infante D. Henrique">GCIH</a></small> (<a href="/wiki/Seattle" title="Seattle">Seattle</a>, <a href="/wiki/28_de_outubro" title="28 de outubro">28 de outubro</a> de <a href="/wiki/1955" title="1955">1955</a>), mais conhecido como <b>Bill Gates</b>, é um <a href="/wiki/Magnata" title="Magnata">magnata</a>, <a href="/wiki/Empres%C3%A1rio" title="Empresário">empresário</a>, <a href="/wiki/CEO" class="mw-redirect" title="CEO">diretor executivo</a>, <a href="/wiki/Investidor" class="mw-redirect" title="Investidor">investidor</a>, <a href="/wiki/Filantropia" title="Filantropia">filantropo</a> e <a href="/wiki/Autor" title="Autor">autor</a> <a href="/wiki/Povo_dos_Estados_Unidos" title="Povo dos Estados Unidos">americano</a>, que ficou conhecido por fundar, junto com <a href="/wiki/Paul_Allen" title="Paul Allen">Paul Allen</a> a <a href="/wiki/Microsoft" title="Microsoft">Microsoft</a>,<sup id="cite_ref-2" class="reference"><a href="#cite_note-2"><span>[</span>2<span>]</span></a></sup> a maior e mais conhecida <a href="/wiki/Empresa" title="Empresa">empresa</a> de <a href="/wiki/Software" title="Software">software</a> do <a href="/wiki/Mundo" title="Mundo">mundo</a> em termos de <a href="/wiki/Valor_de_mercado" title="Valor de mercado">valor de mercado</a>.
                               </p>
                             </div>
                         </article>
                    </section>
                  </>
                }
                <div className="form-content">
                    <Form>
                        <div className="form-box">
                            <Form.Control placeholder='Assunto ...' />
                            <div className="editor mt-2">
                               <RichTextEditor />
                            </div>
                            <div className="ed-space toolbar mt-2">
                                   <div className="ed-flex">
                                        <div className="box-item">
                                            <input type="file" hidden  id='mailfiles' value="" />
                                            <label htmlFor="mailfiles">
                                                 <AttachFile/>
                                            </label>
                                        </div>
                                        <div className="box-item">

                                        </div> 
                                   </div>
                                   <div className="ed-flex">
                                       <button className="btn bg-main"> <Send/> Enviar </button>
                                   </div>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
     </Container>
      ) 
}


const Container = styled.div`
  width:100%;
  display:flex;


 .contacts-list{
    min-width:350px;
    width:30%;
    min-height:50vh; 
    border-radius:6px;  
    margin-bottom:20px !important;
    background:var(--ed-white);  
    box-shadow:var(--ed-shadow-df); 
    padding:20px;
    position: relative;
    max-height:920px;

    
    h3{
        font-size:17px;
        font-weight:600;
    } 

     .contacts-container{
        width:100%;
       background:var(--ed-background-color);

         ul{ 
            width:100%;
            padding:10px 0px;
            border-radius:6px;
            list-style:none;
            max-height:750px;
            overflow-y:auto; 

            label{
                width:100%;
            }

            &:hover{  
               padding-right:15px;
            }

            &::-webkit-scrollbar{
                width:6px;
                background-color:transparent;
            }

            &:hover{ 
                &::-webkit-scrollbar-thumb{
                    background:#eaeaee;   
                }
            }

            li.bg-main-light{
                background:red;
                color:var(--ed-white);

                .name, .title, .date, .latest-email , strong{
                     color:var(--ed-white) !important;
                }

                 svg{
                     fill:var(--ed-white);
                 }
            }

            li{
                display:block;  
                width:100%; 
                position:relative;
                margin:0px;
                padding:0px 10px;
                padding-top:10px;
                padding-bottom:30px;
                border-bottom:1px solid var(--ed-white-smoke);
                cursor:pointer; 


                .ed-flex, .ed-space{
                    align-items:flex-start;
                }

                .message-block{
                    padding-left:50px;
                }

                .ed-flex.align-center{
                    align-items:center;
                }

                .name{
                    font-size:14px;
                }

                .title{
                      font-size:15px; 
                }

                .latest-email{
                   font-size:12px;
                   color:var(--ed-blue-dark); 
                }

                .ed-flex .file svg{
                    width:20px;
                }

                .date{
                    margin-left:10px; 
                    font-size:12px;
                    min-width:80px;
                }


 
            }
        }
     }
  }


     .mail-box{
        width:70%;
        min-height:50vh;
        padding-left:20px;
        min-width:200px;
        display:block; 

        .empty-block{
            min-height:540px;
            padding:20px;
            display:flex;
            align-items:center;
            justify-content:center;


            img{
                max-width:500px;
            }

            @media screen and (max-width:1280px){
                  img{
                      max-width:350px;
                  }
            }
        }


        .mail-box-content{ 
            width:100%;
            min-height:920px;
            border-radius:6px;   
            background:var(--ed-white);  
            box-shadow:var(--ed-shadow-df);  
            position: relative;

            .top-content, .emails-content, .form-content{
               padding:20px;
            } 
 

            .top-content{
                height:90px;
                min-height:90px;

                  .btn svg{
                      margin:0px;
                  }
            }
            
            .emails-content{
                 height:100%;
                 min-height:450px;
                 max-height:450px;
                 overflow-y:auto;
                 padding-right:20px;
                 border-top:1px solid #eaeaee;

                 .mail-message{
                     padding-bottom:20px;
                     margin-bottom:10px;
                     border-bottom:1px solid #eaeaee;

                     .date-time{
                        font-size:13px;
                        color:var(--ed-blue-dark);
                     }

                     .ed-wrap{
                        margin:20px 0px;
                     }

                    .file-box{ 
                      .file-box-content{
                         display:flex;
                         width:300px;
                         height:70px;
                         border:1px solid #eaeaee;
                         background:var(--ed-background-color);
                         padding:10px;
                         margin:10px 5px;   
                         position:relative;

                            .icon{ 
                                min-width:50px;
                                height:50px;
                                min-width:50px;
                                min-height:50px;
                                border:1px solid #eaeaee; 
                                border-radius:100%; 
                                display:flex;
                                align-items:center;
                                justify-content:center;

                                  img{
                                      width:30px;
                                      height:30px;
                                  }
                            }

                            .file-name{
                                font-size:12px;
                                color:var(--ed-blue-dark);
                                margin-bottom:10px;
                            }

                            .file-size{
                                font-size:11px;
                                padding:3px 10px; 
                                color:var(--ed-white);
                                max-width:min-content;
                                position:absolute;
                                bottom:0px;
                                right:0px;
                            }
                        }
                     }


                 }

               &::-webkit-scrollbar{
                    width:6px;
                    background-color:transparent;
                }

                &:hover{ 
                    &::-webkit-scrollbar-thumb{
                        background:#eaeaee;   
                    }
                }

            }


            .form-content{
                button{
                    padding:8px 10px;
                    font-size:14px;

                    svg{
                        width:18px;
                        height:18px;
                    }
                }

                label{ 
                    background:var(--ed-background-color);
                    border-radius:100%;
                    border:1px solid  #eaeaee; 
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    width:45px;
                    height:45px;
                    cursor:pointer;
                }
            }


        }
     }




`;

export default MailServices