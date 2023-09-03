import React from 'react'
import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import { Edit} from '@mui/icons-material';
import { Swiper, SwiperSlide } from 'swiper/react'; 
import { Avatar, AvatarGroup } from '@mui/material';
import ReduceTextLength from '../../../General/components/ReduceTextLength';
import Hoot from '../../../General/components/Hoot';

function ProfileGlobal({data, info}){
 
    console.log("*******************")
    console.log(data.user_Information.ed_user_account_detDescription);

  return (
    <Content>
        <section className="about-section">
            <div className="ed-space">
                <h1 className='title'>Sobre</h1>
                <Link><div className="edit"><Edit/></div></Link>  
            </div>
            <div className="section-content">
                   <p className="description">{data.user_Information.ed_user_account_detDescription}</p>
                   <div className="details">
                       <div className="ed-wrap tags">
                          {["Professor", "Pintor", "Marcineiro"].map((item)=>{
                             return(<div className='tag'>{item}</div>);
                          })}
                       </div>
                   </div>
            </div>
        </section>
        <section className="academic-section">
            <div className="ed-space">
                <h1 className='title'>Formação acadêmica</h1>
                <Link><div className="edit"><Edit/></div></Link>  
            </div>
            <div className="section-content">
                <ul>
                   <li>
                       <Avatar variant="rounded"  sx={{width:60,height:60}}  />
                          <div className="block-dets ml-2">
                              <div className="name">Colegio alpega</div>
                              <strong>Desde 24.09.2000 até 10.09.2005</strong>
                          </div>
                   </li>
                   <li>
                       <Avatar variant="rounded"  sx={{width:60,height:60}}  />
                          <div className="block-dets ml-2">
                              <div className="name">Colegio alpega</div>
                              <strong>Desde 24.09.2000 até 10.09.2005</strong>
                          </div>
                   </li>
                </ul>
            </div>
        </section>
        <section className="institutes-section">
            <div className="ed-space">
               <div className="ed-flex"><h1 className='title'>Instituições de ensino</h1> 
                 <div className="badge bg-main-light text-light ml-1">{data.user_institutes.length}</div>
               </div>
                <Link><div className="edit"><Edit/></div></Link>  
            </div>
            <div className="section-content"> 
           {data.user_institutes.length >= 1 ?
           <div className="details institutes">
             <div className="mt-2">
           <ul> 
             <Swiper  Autoplay={true}  spaceBetween={10}  slidesPerView={3} onSlideChange={() => console.log('slide change')}  onSwiper={(swiper) => console.log(swiper)} >
                {data.user_institutes.map((item, index)=>{ 
                   return( <SwiperSlide key={index} >
                    <Link to={`/dashboard/${item.ed_institute_code }`} >
                       <li>
                         <Avatar variant="rounded"  src={Hoot()+item.ed_institute_logo} sx={{width:90,height:90}}  />
                         <div className="block-dets ml-2">
                             <div className="name"><ReduceTextLength text={item.ed_institute_name} length="40"  /> </div>
                            <div className="ed-block">
                                <div><small>4 turmas </small></div>
                               <div> <small>6 disciplinas</small></div>
                            </div>
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
            </div>
        </section>
        <section className="childs-section">
            <div className="ed-space">
               <div className="ed-flex"><h1 className='title'>Meus filhos</h1> 
                 <div className="badge bg-main-light text-light ml-1">{data.user_childs.length}</div>
               </div>
                <Link><div className="edit"><Edit/></div></Link>  
            </div>
            <div className="section-content"> 
             <ul>
             {data.user_childs.map((item, index)=>{
                    return(
                    <Link to={`parent_portal/${item.ed_student_id}`} key={index}>
                       <li>
                        <div className="avatar-box">
                           <Avatar  src={Hoot()+item.ed_student_picture} sx={{width:80,height:80}} alt={item.ed_student_name}  />
                           <div className="status"></div>
                         </div>
                         <div className="block">
                            <div className="name ml-2 mt-2"><ReduceTextLength text={item.ed_student_name} length="30"  /></div> 
                            <div className="ed-flex ml-2 mt-1">
                               <Avatar variant="rounded"  src={Hoot()+item.ed_institute_logo} sx={{width:20,height:20}}  />
                               <div className="ed-block ml-2">
                                   <div className="ed-flex">
                                      <ReduceTextLength text={item.ed_institute_name} length="60"  />
                                   </div> 
                               </div> 
                            </div>
                         </div>
                       </li>  
                     </Link>)  
                 })} 
                </ul>
            </div>
        </section>
    </Content>
  )
}

const Content = styled.div`
  display:block;
  width:100%;
  padding:20px; 
  padding-top:40px;
  background:var(--ed-white);  
  border-radius:10px;
  box-shadow:var(--ed-shadow-df);

     section{
        border-bottom:1px solid  #eaeaee;
        padding-bottom:30px;
        margin-bottom:20px;

        .ed-space{
          margin-bottom:20px;
          
            a{
                width:40px;
                height:40px;
                border-radius:100%;
                border:1px solid #eaeaee;
                display:flex;
                align-items:center;
                justify-content:center;
      
                  svg{
                      color:var(--ed-silver);
                      width:20px;
                      height:20px;
                  }
            }
        }
      
  
        .section-content{
          ul{
              padding:0px;
              margin:0px;
          }

          li{
            display:flex;
         }
        } 

     }

     .about-section{

        p.description{ 
            font-size: 15px;
            font-weight:400!important;
            margin: 15px 0px;
        }

        .tag{
             padding:5px 10px;
             border-radius:6px;
             margin-right:10px;
             margin-top:10px;
             border:1px solid  #eaeaee;
        }
    }

    .academic-section{
          li{
            margin-bottom:20px;
               
               .name{
                  font-size:16px;
                  margin-top:5px;
               }

               strong{
                  font-size:14px;
                  color:var(--ed-grey-text);
               }
          }
    }

    .institutes-section{
          li{
            padding:10px;
            border-radius:6px; 
            display:flex;
            align-items:center; 
            border:1px solid #eaeaee; 
            height:120px;

            a, .name{
               color:var(--ed-dark);
               font-size:16px;
            }

              small{
                font-size:14px;
                color:var(--ed-grey-text);
              }

          }
    }


   .childs-section{
      border:none;

       li{
          display:flex; 
          border-bottom:1px solid #eaeaee;
          margin-top:10px;
          padding-bottom:20px;

          a, .name{
            color:var(--ed-dark);
            font-size:16px;
         }

            .ed-flex{
                font-size:14px;
                color:var(--ed-grey-text);
            }
       }
   }





`;

export default ProfileGlobal
