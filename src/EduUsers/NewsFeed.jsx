import React, { useEffect } from 'react'
import UserNavbar from './Components/UserNavbar'
import styled from 'styled-components';
import { Avatar, AvatarGroup , Skeleton } from '@mui/material';
import { Badge, Form } from 'react-bootstrap';
import { BookmarksOutlined,ChatBubbleOutline, CommentOutlined, FavoriteBorder, ForumOutlined,
   GroupOutlined, HomeOutlined, ImageOutlined, MailOutlineOutlined, NotificationsNoneRounded, Share, ThumbDown, ThumbsUpDownOutlined, 
   ThumbUpSharp, YouTube } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { HeartBrokenOutlined, QuestionMarkRounded, ThumbDownAltOutlined } from '@mui/icons-material';
 
import Photogrid from "react-facebook-photo-grid"; 
import MenuLeft from './Components/MenuLeft';
import MenuRight from './Components/MenuRight';  
import { useState } from 'react';
import AddsGenerator from './Components/AddsGenerator';
import SidebarLeft from './Employees/Components/SidebarLeft';
import Hoot from '../General/components/Hoot';
import ImageLazyLoading from '../General/components/ImageLazyLoading';
import PostForm from './Components/PostForm';

import { BiSend, BiSmile, BiSticker, BiSolidFile } from 'react-icons/bi'
import {FaRegComment,FaRegHeart} from "react-icons/fa";
import {MdAttachFile} from "react-icons/md";
import {FiSend} from "react-icons/fi";
import GifPicker from 'gif-picker-react';
import InputEmoji from 'react-input-emoji'
import CheckinternetStatus from '../General/components/CheckinternetStatus';

const Vd = "";
const Pt = 'https://miamioh.edu/regionals/news-events/_files/images/2022/12/amazon-800x400.jpg'
 

const Books = [
   require('../Assets/images/covers/books/book-0.jpeg'), 
   require('../Assets/images/covers/books/book-2.jpg'),
   require('../Assets/images/covers/books/book-3.jpg'),
   require('../Assets/images/covers/books/book-4.jpg'),
   require('../Assets/images/covers/books/book-5.jpg'),
   require('../Assets/images/covers/books/book-6.jpg'),
   require('../Assets/images/ads/3.png')
];

const GridImages = [
  "https://www.stjulians.com/userfiles/sjlmvc/Images/Header/school-life/header-afterschool.jpg",
  "https://www.greatbeginningslc.com/blog/wp-content/uploads/2016/02/blog-banner.jpg",
  "https://www.ashokaschools.org/preschool-wadala/image-basket/fine-art-at-ashoka-pre-school-1543681019.jpg",
  "https://www.forbes.com/advisor/wp-content/uploads/2022/04/school.jpeg",
  "https://s18670.pcdn.co/wp-content/uploads/FHI360_financialliteracy.jpg",
  "https://d3eizkexujvlb4.cloudfront.net/2020/04/27071151/10-ways-to-increase-student-participation-in-school-based-therapy.jpg",
  "https://www.verywellfamily.com/thmb/h6tEX4kbPUG9QtbJly5OnFaqKl8=/1000x1000/smart/filters:no_upscale()/soccer-56c7a29b3df78cfb37893519.jpg"
];
 



function NewsFeed({userdata}) {
  document.title = "Noticias";
  const [isLoading, SetLoading] = useState(false);
  let lettername = userdata.user_Information.ed_user_account_name.split(' ')[0].split('')[0].toUpperCase()+
  userdata.user_Information.ed_user_account_name.split(' ')[userdata.user_Information.ed_user_account_name.split(' ').length -1].split('')[0].toUpperCase()

  const [show, setShow] = useState(false);
  const [GifItem , setGifItem] = useState(null);
  const [text, setText] = useState("");
  
const GetFeedPosts = ()=>{ 
    SetLoading(true); 
}

const getGifImage = (e)=>{ 
  console.clear();
  console.log(e.preview.url);
  setShow(false);
}


 


 useEffect(()=>{
     GetFeedPosts();
 },[]);
 
  const PublicationsArray = [
      {
         ed_publication_id:0,
         ed_publication_user_code:1,
         ed_publication_type:1,
         ed_publication_title:'',
         ed_publication_postDate:'19/10/2022',
         ed_publication_description:'O deficitário domínio de leitura, traduzido em esforço penoso de decifração, arruína qualquer interesse em viajar pelas páginas de um jornal ou de um livro, e mata o desejo de descobrir e soltar a voz do outro, presa num registo de papel. Aqui se aplica com toda a propriedade o que Stanovich chamou de “o efeito de Mateus”, numa alegoria à',
         ed_publication_cover:'',
         ed_publication_link:[],
         ed_publication_assets:[
            {
              type:'image', 
              images: [/*require('../Assets/images/covers/posts/1.webp')*/"https://lh3.googleusercontent.com/drive-viewer/AITFw-wnRREu2QzwDcT2k04FdrRYL3_JrjZX-YeRhswGdGKWVzg6UakbJlg_giAHp_9lHr3UlwOIcz3c7G36pxOWaJK681WeDw=s1600"]
           },
         ],
      },
      {
        ed_publication_id:0,
        ed_publication_user_code:1,
        ed_publication_type:1,
        ed_publication_title:'',
        ed_publication_postDate:'19/10/2022',
        ed_publication_description:'O deficitário domínio de leitura, traduzido em esforço penoso de decifração, arruína qualquer interesse em viajar pelas páginas de um jornal ou de um livro, e mata o desejo de descobrir e soltar a voz do outro, presa num registo de papel. Aqui se aplica com toda a propriedade o que Stanovich chamou de “o efeito de Mateus”, numa alegoria à',
        ed_publication_cover:'',
        ed_publication_link:[],
        ed_publication_assets:[
           {
             type:'image', 
             images: [/*require('../Assets/images/covers/posts/1.webp')*/"https://craftwork-images.b-cdn.net/wp-content/uploads/edd/Dashboards-1.png"]
          },
        ],
     },
      {
         ed_publication_id:0,
         ed_publication_user_code:1,
         ed_publication_type:1,
         ed_publication_title:'',
         ed_publication_postDate:'19/10/2022',
         ed_publication_description:'O deficitário domínio de leitura, traduzido em esforço penoso de decifração, arruína qualquer interesse em viajar pelas páginas de um jornal ou de um livro, e mata o desejo de descobrir e soltar a voz do outro, presa num registo de papel. Aqui se aplica com toda a propriedade o que Stanovich chamou de “o efeito de Mateus”, numa alegoria à',
         ed_publication_cover:'',
         ed_publication_link:[],
         ed_publication_assets:[
            { 
             type:"image",
             images:[
              require('../Assets/images/covers/posts/8.jpg'),
              require('../Assets/images/covers/posts/9.jpg'),
              require('../Assets/images/covers/posts/10.jpg'),
              require('../Assets/images/covers/posts/11.jpg'),
              require('../Assets/images/covers/posts/12.jpg'),
              require('../Assets/images/covers/posts/13.jpg'),
             ]
          }
         ],
      },
        {
         ed_publication_id:0,
         ed_publication_user_code:1,
         ed_publication_type:1,
         ed_publication_title:'',
         ed_publication_postDate:'19/10/2022',
         ed_publication_description:'O deficitário domínio de leitura, traduzido em esforço penoso de decifração, arruína qualquer interesse em viajar pelas páginas de um jornal ou de um livro, e mata o desejo de descobrir e soltar a voz do outro, presa num registo de papel. Aqui se aplica com toda a propriedade o que Stanovich chamou de “o efeito de Mateus”, numa alegoria à',
         ed_publication_cover:'',
         ed_publication_link:[],
         ed_publication_assets:[
            { 
             type:"image",
             images:[
              require('../Assets/images/covers/posts/2.jpg')
             ]
          }
         ],
      },
        {
         ed_publication_id:0,
         ed_publication_user_code:1,
         ed_publication_type:3,
         ed_publication_title:'Facebook revela fundo de US$ 10 milhões para criadores de ‘Horizon Worlds’',
         ed_publication_postDate:'19/10/2022',
         ed_publication_description:'No ano passado, o Facebook lançou seu programa beta Horizon apenas para convidados, oferecendo a um seleto grupo de usuários do Oculus Quest a chance de criar seus próprios mundos virtuais usando um amplo arsenal das melhores ferramentas de construção de mundos da categoria. Desde então, o Facebook Horizon cresceu imensamente em tamanho e escala. Os primeiros criadores já criaram centenas de mundos para a tão esperada plataforma social de realidade virtual.',
         ed_publication_cover:'',
          ed_publication_link:[
          { title:'oculus.com',
            route:'https://www.oculus.com/horizon-worlds/'
          }
         ],
         ed_publication_assets:[
            { 
             type:"image",
             images:[
              require('../Assets/images/covers/posts/15.jpg'),
              require('../Assets/images/covers/posts/16.jpg'),
              require('../Assets/images/covers/posts/17.jpg'), 
            ]
          }
         ],
      },
       {
         ed_publication_id:0,
         ed_publication_user_code:1,
         ed_publication_type:2,
         ed_publication_title:'Robótica educacional: o que é, como funciona e importância.',
         ed_publication_postDate:'19/10/2022',
         ed_publication_description:'O deficitário domínio de leitura, traduzido em esforço penoso de decifração, arruína qualquer interesse em viajar pelas páginas de um jornal ou de um livro, e mata o desejo de descobrir e soltar a voz do outro, presa num registo de papel. Aqui se aplica com toda a propriedade o que Stanovich chamou de “o efeito de Mateus”, numa alegoria à',
         ed_publication_cover:'',
         ed_publication_link:[],
         ed_publication_assets:[
            {type:'image',images: [require('../Assets/images/covers/posts/7.jpg')]}
         ],
      },
       {
         ed_publication_id:0,
         ed_publication_user_code:1,
         ed_publication_type:3,
         ed_publication_title:'Tesla Motors  está acelerando a transição mundial para a energia sustentável com carros elétricos ...',
         ed_publication_postDate:'19/10/2022',
         ed_publication_description:'Tesla, Inc., é uma empresa automotiva e de armazenamento de energia norte americana, que desenvolve, produz e vende automóveis elétricos de alto desempenho, componentes para motores e transmissões para veículos elétricos e produtos à base de baterias.',
         ed_publication_cover:'',
         ed_publication_link:[
          { title:'tesla.com',
            route:'https://www.tesla.com/model3'
          }
         ],
         ed_publication_assets:[
            {type:'image',images:[require('../Assets/images/covers/posts/17.webp')]}
         ],
      }
  ]; 

  return ( 
      <div>
          <div className="eduall_network">
           <UserNavbar data={userdata} />
              <Container> 
                    <Content> 
                     <div>
                      <SidebarLeft />
                      <Column>
                        <MenuLeft data={userdata} />
                        <AddsGenerator small />
                      </Column>
                     </div> 
                      <div>
                        <PostContainer>
                          <div className="wrapper-container"> 
                         <PostForm userdata={userdata} />
                        <div className="posts-content">
                          {
                            PublicationsArray.map((post, index)=>{
                              let postTypeHeaderData = "";
                              let postDetsType = "";
                              if(post.ed_publication_type ===  3){
                                postDetsType = "dets";
                                postTypeHeaderData = "Patrocinado";
                              }else if(post.ed_publication_type ===  2){
                                postTypeHeaderData = post.ed_publication_postDate;
                                postDetsType = "dets-event";
                              } else{
                                postTypeHeaderData = post.ed_publication_postDate;
                              }

                              if ( post.ed_publication_assets[0].video) {
                                   console.log( post.ed_publication_assets[0].video)
                              }


                            return <PostBox>
                            <div className="ed-space">
                              <div className="ed-flex post-by">
                                <Avatar className='df' sx={{width:40, height:40}} alt='' />
                                <div className="ed-block">
                                  <span>Pedro Manuel</span> 
                                  <div className="small-header-text">{postTypeHeaderData}</div>
                                </div>
                              </div>
                              <div className="ed-flex"></div>
                            </div>
                            <div className={postDetsType}>
                            <p className="description">
                               {post.ed_publication_description}
                            </p>
                               {post.ed_publication_type === 3 ?  
                                <a href="">  
                                 {
                                  post.ed_publication_assets.length === 1 ? 
                                    <div className="post-assets">
                                      {post.ed_publication_assets[0].type === "image" ? 
                                          <>
                                          {  post.ed_publication_assets[0].images.length  === 1 ?
                                          <div className="post-image-box"> 
                                           <>
                                            { isLoading 
                                            ? ( <ImageLazyLoading  height={300} source={post.ed_publication_assets[0].images[0]} alt="" />) :
                                              (<Skeleton variant='rectangle' animation='wave' width='100%' height={400} />)
                                            }
                                          </> 
                                          </div>
                                          : 
                                            <>
                                               { isLoading 
                                               ? (<Photogrid images={post.ed_publication_assets[0].images} />) :
                                                 (<Skeleton variant='rectangle' animation='wave' width='100%' height={400} />)
                                               }
                                            </>
                                          }
                                          </>
                                          :
                                        <></>  
                                    }
                                    {post.ed_publication_assets[0].type === "video" ?  
                                          <div className="post-video-box">
                                              {
                                                post.ed_publication_assets[0].video ? 
                                                <>
                                                   <h1>{post.ed_publication_assets[0].video.poster}</h1>
                                                   
                                                </> 
                                                : <><h1>No</h1></>  
                                              }
                                          </div> 
                                          :
                                        <></>  
                                    }
                                  </div>
                                  : 
                                  <></>
                                  } 
                                 </a> 
                                :
                                <>
                                 {
                                  post.ed_publication_assets.length === 1 ? 
                                    <div className="post-assets">
                                      {post.ed_publication_assets[0].type === "image" ? 
                                          <>
                                          {  post.ed_publication_assets[0].images.length  === 1 ?
                                          <div className="post-image-box">
                                             <>
                                               { isLoading 
                                               ? (<ImageLazyLoading  source={post.ed_publication_assets[0].images[0]} alt="" />) :
                                                 (<Skeleton variant='rectangle' animation='wave' width='100%' height={400} />)
                                               }
                                            </> 
                                          </div>
                                          :  
                                          <>
                                          { isLoading 
                                          ? (<Photogrid images={post.ed_publication_assets[0].images} />) :
                                            (<Skeleton variant='rectangle' animation='wave' width='100%' height={400} />)
                                          }
                                          </> 
                                          }
                                          </>
                                          :
                                        <></>  
                                    }
                                  </div>
                                  : 
                                  <></>
                                  } 
                                </> 
                                } 
                               <div className="block-dets">
                                   {post.ed_publication_title !== "" ? <h4> {post.ed_publication_title} </h4> : <></>}
                                    {
                                      post.ed_publication_link.length >= 1 ? 
                                        <a href={post.ed_publication_link[0].route} target="_blank">
                                            <div className="badge bg-blue">{post.ed_publication_link[0].title}</div> 
                                        </a>   
                                      : <></>
                                    }
                               </div>

                            </div>
                            <div className="bar"/>
                            <div className="reactions">
                              <div className="ed-space">
                                <div className="ed-flex">
                                  <button>
                                    <FaRegHeart />
                                    <span>10</span>
                                  </button>
                                  <button className='ml-2'>
                                    <FaRegComment />
                                    <span>12</span>
                                  </button>
                                </div>
                                <div>
                                  <button>
                                    <Share />
                                  </button>
                                </div>
                              </div>
                              <div className="ed-flex ml-2">
                                <AvatarGroup max={4} sx={{width:'100px',height:'30px'}}>
                                  <Avatar className='df' sx={{width:30,height:30}} />
                                  <Avatar className='df' sx={{width:30,height:30}} />
                                  <Avatar className='df' sx={{width:30,height:30}} />
                                  <Avatar className='df' sx={{width:30,height:30}} />
                                  <Avatar className='df' sx={{width:30,height:30}} />
                                  <Avatar className='df' sx={{width:30,height:30}} />
                                  <Avatar className='df' sx={{width:30,height:30}} />
                                </AvatarGroup>
                                <div className="ed-wrap pwr">
                                  <strong>Curtido </strong> por
                                  <strong> Naria sousa </strong>
                                  e outras 23k pessoas
                                </div>
                              </div>
                            </div> 
                            <div>
                                <Form className='comment-form' >
                                    <Link to="/profile"><Avatar className='df' src={Hoot()+userdata.user_Information.ed_user_account_picture}  sx={{width:40, height:40}} alt='' /></Link>
                                    <div className="ml-2 input-text">
                                      <input type="text" placeholder='Diga algo interessante ...' className="form-control" />
                                    </div>
                                  <div className="gif-toggle ml-2">
                                      <div className={show ? "" : "d-none"}>
                                      {CheckinternetStatus() ? <GifPicker locale="pt_PT" onGifClick={getGifImage} tenorApiKey={"AIzaSyAs6jyixfg6l_1hMawHp317rRdN0Fpc1dg"} />: <></> }
                                  </div> 
                                   <div onClick={()=>setShow(show ? false : true)}><BiSticker /> </div>
                                  </div>
                                </Form>
                            </div>
                          </PostBox>
                           })
                          } 
                         </div>
                        </div> 
                      </PostContainer>
                      </div>
                       <div>
                           <MenuRight/>
                        </div>
                    </Content> 
            </Container>
          </div>
      </div>
  )
}

 
const Container = styled.div`
  width:100%;
  display:flex; 
  min-height:100vh;  
  background:var(--ed-background-color);   
  padding-left:70px;

 
  .recommendations {
    width:100%;
    margin-bottom:20px;  

    .carousel{
       display:flex;
       overflow-x:auto;  

       &::-webkit-scrollbar{
          height:0px;
          width:0px;
          background:transparent;
       }

       article:first-child{
           margin-left:0px;
       }
    }
 
    article{
      width:170px;
      min-width:170px;
      height:250px;
      background:var(--ed-white); 
      padding:10px;
      border-radius:6px;
      margin:10px;
      box-shadow:var(--ed-shadow-df);
      transition:all 1s ease-in-out;
      transform:scale(0.99);

      &:hover{
          transform:scale(1.05);
      }

      p div{
        font-size:14px;
        margin-top:10px;
        font-weight:normal !important;
        line-height:22px;
        color:var(--ed-dark);
      }

      img{
         height:140px;
      }
    }
  }

  .title{ 
    text-transform:uppercase;
    position:relative;
    margin-bottom:20px;

     &::after{
         content:'';
         position:absolute;
         top:30px;
         left:0px;
         width:140px;
         height:4px;
         border-radius:6px; 
         background:var(--ed-purple-light);
     }

        h3{
          font-size:17px;
          font-weight:600;
        }
  }

  .posts-content{
    position:sticky;
  }


`;


const PostBox = styled.div` 
    width:100%;
    background:var(--ed-white); 
    border-radius:6px;
    margin:30px 0px;
    padding:20px 0px;
    box-shadow:var(--ed-shadow-df);


    .MuiAvatar-root{
       background:#CED4DA !important;
    }
    
    .post-by{
        padding:0px 20px;
    }

    .ed-flex.ml-2{
        align-items:center !important;
    }

    .comment-form{ 
        display:flex;
        justify-content:space-between;
        align-items:center;
        width:100%;
        margin-top:30px;
        padding:0px 20px;
        position:relative;

        .ml-2.input-text{
            width:100%;
        }

        .GifPickerReact.gpr-main{
          position: absolute !important; 
          right:0px;  
          margin-top:-461px;  
          border-bottom-right-radius:0px !important;
          border-bottom-left-radius:0px !important;
          box-shadow:var(--ed-shadow-df) !important;  
      }
      
 
         input{
            background:var(--ed-background-color); 
         }

             .react-input-emoji--wrapper{
                width:100% !important;
                margin:0px; 
                background:var(--ed-background-color); 
                border:none !important;
                box-shadow:none !important;
             } 
          
         svg{
              width:25px;
              height:25px;
              margin:0px !important;
              fill:var(--ed-grey-text) !important;
              color:var(--ed-grey-text) !important; 
              cursor: pointer;
          }
          
          
         .gif-toggle{
             position: relative;
          }
   
    }

    .ed-flex{ 

      .ed-block{
        margin-left:20px;
         
         .name{
            font-size:18px;
         }
           
         .small-header-text{
           font-size:13px;
           color:var(--grey);
         }
    }
    }

     .bar{
         width:100%;
         height:1px;
         background:var(--ed-white-smoke);
     }

    .block-dets{
        padding:10px 20px;

        h4{
            margin:0px;
            font-size:16px;
            margin-botom:10px;
            max-width:690px;
            line-height:30px; 
            font-weight:600; 
        }

        .badge{
          margin-top:10px;
        }
    }

    
    .dets{
        background:#F5FAFF;
        padding:10px 0px;
        margin-top:20px;
    }

    .dets-event{
      background:#FFFBF0;
      padding:10px 0px;
      margin-top:20px;
    }

    .post-assets{ 
      padding:0px !important;
      margin:0px;
      margin-top:20px;

       video, iframe ,img{
           width:100%; 
           max-height:900px; 
           margin:0px !important;
       }


       video{
           background:var(--ed-dark);
       }
    }


    .description{
        padding:0px 20px;
        font-size:14px;
        font-weight:300 !important;
        margin:15px 0px;  
    }

    .pwr{
      font-size:15px;
    }

   .reactions{
      padding:0px 20px;
      margin-top:15px;


      .ed-flex{
        align-items:flex-start;
      }
    
    .ed-space{
        margin-bottom:20px; 

        button{
             border:none;
             background:none;
             display:flex;
             align-items:center;
             cursor:pointer;

             span{
              font-size:12px !important;
              font-weight:600 !important;
             }

             svg{
                width:20px;
                height:20px;
                margin-right:5px;
                color:var(--ed-blue-dark);
             }
        }
    }
  
    strong{
      margin:0px 6px;
    }

    .MuiAvatar-root{
      width:30px !important;
      height:30px !important;
      font-size:13px !important;
    }
   }

`; 

const PostContainer = styled.div`   
  padding-left:calc(340px + 20px);
  padding-right:calc(410px + 20px);
  width:100%;
  height:auto;  
  margin-top:100px;
  min-height:500px; 
  position:relative;  

    .wrapper-container{
        max-width:800px;  
        margin:0 auto;
    }

    @media screen and (max-width:1520px){padding-right:calc(330px + 20px); background:gold; }
    @media screen and (max-width:1450px){padding-right:calc(330px + 20px); background:gold; }
    @media screen and (max-width:1400px){padding-right:calc(400px + 20px); background:orange;}
    @media screen and (max-width:1390px){padding-right:calc(210px + 20px); padding-right:calc(110px + 20px);background:gold;}
    @media screen and (max-width:1280px){padding:0px 50px;padding-left:60px;background:purple;}


 &&::-webkit-scrollbar{
    width:6px;
    background-color:transparent;
 }

  &&::-webkit-scrollbar-thumb{
     background:transparent; 
 }

  
 @media screen and (max-width:1300px){
     max-width:640px !important;
 }

  .post-form form{
    width:100%; 
    border-radius:6px;    
    padding:15px 20px;
    background:var(--ed-white);  
    box-shadow:var(--ed-shadow-df);
    margin-bottom:20px;

    .form-post-box{
      width:99%;
      margin-left:10px;
      padding:8px 10px;
      height:80px;
      border-radius:6px;
      background:transparent; 
      border:1px solid #eaeaee;
      cursor:pointer;
      
          span{
              font-size:14px;
              color:var(--ed-grey-text);
          }
     }

    .ed-flex{
       width:100%; 
       align-items:flex-start;

       label{
          display:flex;
          align-items:center;
          margin-right:15px;
          margin-top:20px;
          font-size:15px;
          background:var(--ed-silver-light);
          padding:6px 10px;
          border-radius:6px;

          svg{
            margin-right:5px;
          }
       }
    }

    input{
        padding:10px 20px;
        width:95% !important; 
        background:var(--ed-background-color); 
        margin-left:10px;
        border:none !important;
        box-shadow:none !important;
    }

  }
`;


const Content = styled.div`
  display:flex;
  width:100%;
  justify-content:space-between;
`;
 
 const Column = styled.div` 
    displaY:block;
    min-width:400px;
    max-width:400px; 
    height:98vh;
    overflow:hidden;
    overflow-y:auto;
    padding-top:100px;
    padding-left:110px;
    position:fixed; 
    top:0px;
    left:0px;
    z-index:10; 
    background:transparent;

    @media screen and (max-width:1280px){
        min-width:380px;
        max-width:380px; 
    }

    &&::-webkit-scrollbar{
        width:0px;
        background: transparent;
      }
    
    &&::-webkit-scrollbar-thumb{
         width:0px;
         background-color: transparent;
     }
 `;

export default NewsFeed