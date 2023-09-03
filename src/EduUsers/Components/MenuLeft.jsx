import styled from 'styled-components';
import { Avatar } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap';
import {FcBusinessman,FcCalendar,FcCollaboration,FcSettings} from "react-icons/fc";
import Hoot from '../../General/components/Hoot';
 
import { Swiper, SwiperSlide } from 'swiper/react'; 
import ReduceTextLength from '../../General/components/ReduceTextLength';
 


const Images = [ 
    require('../../Assets/images/covers/img13.jpg'),
    require('../../Assets/images/avatars/avatar-7.jpg'),
    require('../../Assets/images/covers/walls/img10.jpg')
];



function MenuLeft({data}){
 
  let lettername = data.user_Information.ed_user_account_name.split(' ')[0].split('')[0].toUpperCase()+data.user_Information.ed_user_account_name.split(' ')[data.user_Information.ed_user_account_name.split(' ').length -1].split('')[0].toUpperCase()
  return (
     <Container>
         <div className="cover">
             {data.user_Information.ed_user_account_detProfileCover !== null  ?
             <img loading="lazy" role="presentation" src={Hoot()+data.user_Information.ed_user_account_detProfileCover} alt="eduall" className='wall' />
             : <div className="wall"></div>} 
             <div className="cover-over">
                 <Link to="/profile"><div className="avatar"> 
                      <Avatar src={Hoot()+data.user_Information.ed_user_account_picture}  alt={lettername} 
                      sx={{width:90,height:90,bgcolor:data.user_Information.ed_user_account_detAvatarColor}}>
                           {lettername}
                      </Avatar>
                   </div>
                </Link>
             </div>
         </div>
          <div className="details mt-2">
            <div className="block mt-4 text-left"> 
               <div className="mt-4">
                <Link to="/profile">
                  <div><h5>{ data.user_Information.ed_user_account_name}</h5></div>
                </Link>
               </div>
               <p className='quote mt-2'>{data.user_Information.ed_user_account_detQuote}</p>
           </div>  
         </div> 
       {data.user_childs.length >= 1 ?
        <>
          <hr />
          <div className="details childs">
            <h5>Filhos<span className="text-main-light ml-1">({data.user_childs.length})</span> </h5>
            <div className="block mt-2">
              <ul> 
              <Swiper  Autoplay={true}  spaceBetween={10}  slidesPerView={1.1} onSlideChange={() => console.log('slide change')}  onSwiper={(swiper) => console.log(swiper)} >
                 {data.user_childs.map((item, index)=>{
                    return( <SwiperSlide key={index} >
                    
                       <li>
                       <Link to={`parent_portal/${item.ed_student_id}`} >
                        <div className="avatar-box">
                          <Avatar  src={Hoot()+item.ed_student_picture} sx={{width:45,height:45}} alt={item.ed_student_name}  />
                           <div className="status"></div>
                         </div>
                         </Link> 
                         <div className="block">
                           <Link to={`parent_portal/${item.ed_student_id}`} >
                                <div className="name ml-2"><ReduceTextLength text={item.ed_student_name} length="12" /></div>
                            </Link> 
                            <div className="ed-flex ml-2 mt-1">
                               <Avatar variant="rounded"  src={Hoot()+item.ed_institute_logo} sx={{width:20,height:20}}  />
                               <small className="text-main-light ml-2">
                                    <ReduceTextLength text={item.ed_institute_name} length="15"  />
                               </small>
                            </div>
                         </div>
                       </li>  
                    </SwiperSlide>)  
                 })} 
              </Swiper> 
              </ul>
            </div>
         </div>
         <hr/>
        </> 
        : 
       <></>
       }
        {data.user_institutes.length >= 1 ?
           <div className="details institutes">
           <h5>Instituições de ensino<span className="text-main-light ml-1">({data.user_institutes.length})</span> </h5>
           <div className="mt-2">
           <ul className='mb-2'> 
             <Swiper  Autoplay={true}  spaceBetween={10}  slidesPerView={1.1} onSlideChange={() => console.log('slide change')}  onSwiper={(swiper) => console.log(swiper)} >
                {data.user_institutes.map((item, index)=>{
                 console.clear();
                 console.log(data.user_institutes)
                   return( <SwiperSlide key={index} >
                    <Link to={`/dashboard/${item.ed_institute_code }`} >
                       <li>
                         <Avatar variant="rounded"  src={Hoot()+item.ed_institute_logo} sx={{width:60,height:60}}  />
                         <div className="block-dets ml-2">
                             <div className="name"><ReduceTextLength text={item.ed_institute_name} length="30"  /> </div>
                             <small className="text-main-light">Professor</small>
                         </div>
                       </li> 
                     </Link>
                   </SwiperSlide>)
                })} 
             </Swiper> 
             </ul> 
           </div>
          </div> 
       : <></>
      }
     </Container>
  )
}


const Container = styled.div` 
   width:100%;
   background:var(--ed-white); 
   border-radius:6px; 
   overflow:hidden;
   margin-bottom:20px;
   box-shadow:var(--ed-shadow-df);
   min-height:200px;

   .cover{
      height:105px;
      position:relative;

        .wall{
            width:100%;
            height:90px;
            object-fit:cover;
        }

        div.wall{
         width:100%;
         height:90px;
         background:var(--ed-purple);
        }
 

        .cover-over{
            position:absolute;
            top:0px;
            left:20px;
            width:100%;
            top:0px;
            height:140px;
            display:flex;
            align-items:flex-end;
            justify-content:flex-start;


              .avatar{
                  margin-bottom:8px;
                  border-radius:100%;
                  background:var(--ed-white);
                  border:4px solid var(--ed-white);
                  box-shadow:var(--ed-shadow-df);
              }
        }
   }




   .institutes{
         li{
            height:80px;
         }
   }

     .details{
         padding:5px 20px;  

         h5{
            font-size:16px;
            font-weight:bold;
            color:var(--ed-dark);
            margin:0px !important;
         }

         .quote{
             font-size:13px;
             color:var(--ed-grey-text);
         }


         hr{
          margin:0px;
         }



         ul{
            padding:0px;
            margin:0px; 
            display:flex;
            width:100%;
         
              a{
                  
                  li{
                    width:100%;
                    padding:10px;
                    border-radius:6px;
                    margin:0px;
                    display:flex;
                    align-items:center; 
                    border:1px solid #eaeaee;

                      a{
                          width:max-content;
                      }
                  } 

              }
         }

     }

     ul{
        margin:20px 0px;
        padding:0px;
          

          li{
            margin:12px 0px;
            font-size:15px;
            color:var(--ed-blue-dark);
            border:1px solid #eaeaee;
            display:flex;
            padding:10px;
            border-radius:6px;

               .name{
                  color:var(--ed-dark);
               }
          }
     }



     .table-box{ 
      td{
         font-size:15px;
      }
    }


     .profile-box{
          display:flex;
          align-items:center;
          padding:15px 10px;
          justify-content:center;
          font-size:14px;
          border-top:1px solid #eaeaee;
     }
`;

export default MenuLeft