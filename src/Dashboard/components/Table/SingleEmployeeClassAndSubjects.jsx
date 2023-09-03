import axios from 'axios';
import React, { useState } from 'react'
import { styled } from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react'; 
import Hoot from '../../../General/components/Hoot';
import { useEffect } from 'react';
import { GetAcademicYear_byclass, GetAcademiclevel_byclass, GetClassroom_byclass, GetClasstitle_byclass, GetPeriod_byclass, GetSubject } from '../../../General/components/InstituteData';
import { Link } from 'react-router-dom';
import StudentsAavatars from '../elements/Extra/StudentsAavatars';
import { Avatar, AvatarGroup } from '@mui/material';
import Loader from '../../../General/components/Loader';

function SingleEmployeeClassAndSubjects(props){
const [load, setLoaded] = useState(false);
const [StudentsClass, SetStudentsClass] = useState([]);
const [EmployeeData, setEmployeeData] = useState({ClassList:[], SubjectsList:[], teacherCode:null, Data:[], students:[]});
 
const DATA_URL = [ 
   Hoot()+'eduallgetteachersubjects/get/', 
   Hoot()+"eduallgetstudentsbyclass/"
];

async function loadData(id){ 
    setLoaded(false);
    try {   
        const response = await axios.get(DATA_URL[0]+id); 
            const subjects = [];
            const classes = [];  

            response.data.map((item, index)=>{
                subjects.push(item.ed_tch_subject_code); 
                if(!classes.includes(item.ed_tch_subject_class*1)) classes.push(item.ed_tch_subject_class);  
            }); 

            
       let result = [];

        let getData  = ()=>{ 
            if(classes.length >= 1){
                classes.map((item)=>{
                    let GET = async()=>{
                       const response1 = await axios.get(DATA_URL[1]+item); 
                       result.push({class_code:response1.data[0].ed_class_id, data:response1.data}); 

                       setEmployeeData({
                            ClassList:StudentsClass, 
                            SubjectsList:subjects, 
                            teacherCode:id, 
                            Data:response.data,
                            students:result
                      }); 
                    }
                    GET();
                  }) 
            }else{
                setEmployeeData({
                     ClassList:StudentsClass,
                     SubjectsList:subjects, 
                     teacherCode:id,
                     Data:response.data, 
                     students:[]
                }); 
            } 

           }
         getData();  
        setLoaded(true);
    } catch (error) {
        console.log(error);
    }
 };


 useEffect(()=>{
    loadData(props.employeeid);
    setTimeout(() => {
         console.clear(); 
        console.log(EmployeeData.students);
    }, 1000);
 },[])


 
 

  if(load){
     return(
        <Container>  
          <div className="tch-class">
          <Swiper  spaceBetween={15}  slidesPerView={3.1} 
           onSlideChange={() => console.log('slide change')}  onSwiper={(swiper) => console.log(swiper)} > 
                {EmployeeData.students.map((item, index)=>{
                  return(
                      <SwiperSlide key={index} > 
                      <div className="item mt-4"> 
                          <div className="ed-flex"><h2>Turma - <GetClasstitle_byclass ID={item.class_code} />   ( {item.data.length} alunos )</h2></div>
                          <div className="mt-2"  style={{maxWidth:`${item.data.length > 7 ? "255" :  item.data.length*32}px`}} >
                            <AvatarGroup max={7} sx={{ '& .MuiAvatar-root': { width: 35, height: 35, fontSize: 13 }}}> 
                                {item.data.map((avatar, i)=>{
                                   return(<Avatar className='df' src={Hoot()+avatar.ed_student_picture}   alt={avatar.ed_student_name}  key={i}/>)
                                })}
                           </AvatarGroup> 
                          </div>
                          <div className="mt-2 ed-wrap">

                                <div className="bx text-main-light ed-flex mr-2">
                                    Classe -  <GetAcademiclevel_byclass ID={item.class_code} />
                                </div>    
                                <div className="bx text-main-light ed-flex mr-2">
                                    Periodo -  <GetPeriod_byclass ID={item.class_code} />
                                </div>  
                                <div className="bx text-main-light ed-flex mr-2">
                                    Ano letivo -  <GetAcademicYear_byclass ID={item.class_code} />
                                </div> 
                                <div className="bx text-main-light ed-flex mr-2">
                                    Sala -  <GetClassroom_byclass ID={item.class_code} />
                                </div>  
                              </div>
                          </div>
                     </SwiperSlide>
                     )
                })} 
          </Swiper> 
          </div> 
          <div className="mt-4  subjects"> 
              <Swiper Autoplay={true}  spaceBetween={10}  slidesPerView={4} 
                  onSlideChange={() => console.log('slide change')}  onSwiper={(swiper) => console.log(swiper)} >
                  {EmployeeData.Data.map((item, index)=>{
                     return(<SwiperSlide key={index} >
                           <div className="item">
                              <div className="ed-flex">
                                Turma - <GetClasstitle_byclass ID={item.ed_tch_subject_class} />  {" "}
                                ( <GetSubject ID={item.ed_tch_subject_code} /> )
                              </div>
                              <Link to="#" className='text-main-light'>Visualizar plano curricular</Link>
                           </div>
                     </SwiperSlide>)
                  })} 
              </Swiper>
           </div> 
   </Container>);
  }else{
      return (
            <Container>
                <div className="loading-area">
                   <Loader  absolute small  />
               </div>
            </Container> 
        );
  }
}

 
// GoTasklist BsClock BsClipboardCheck BiTimer BsStar

const Container = styled.div`
    display:block; 
    max-width:1100px;



    .loading-area{
        min-height:200px;
        position:relative;
        top:0px; 
        left:0px;
        width:100%;
        height:100%;
        padding:30px;
        display:flex;
        align-items:center;
        justify-content:center; 
    }



     .subjects{
           
        .item{
            border:1px solid #E9ECEF;
            padding:15px;
            border-radius:6px;
            
            .ed-flex{
                font-size:16px;
                color:var(--ed-grey-text);
            }

            a{
                margin-top:10px;
                font-size:13px;
             }
        }
     }

    .tch-class{ 
        min-height:100px; 
        overflow:hidden;

      .item{
          border:1px solid #E9ECEF;
          padding:15px;
          border-radius:6px;

          .MuiAvatarGroup-root{
              max-width:225px; 
          }

          h2{
              font-size:16px;
              color:var(--ed-grey-text);
          }

           .swiper-boxes{ 
               display:block;
           }

           .bx{
               border:1px solid var(--ed-purple-light);
               padding:4px 10px;
               text-align:center;
               font-size:13px;
               border-radius:30px;
               margin-top:10px;
               margin-right:10px;
           }
      }
    }

`;


export default SingleEmployeeClassAndSubjects


/**
 * 

return(<SwiperSlide key={index} >
    <div className="item mt-4"> 
        <div className="ed-flex">Turma - {item.class} ( {item.data.length} alunos ) </div>


        <div className="mt-2">
        <Swiper Autoplay={true}  spaceBetween={10}  slidesPerView={3} 
        onSlideChange={() => console.log('slide change')}  onSwiper={(swiper) => console.log(swiper)} >
            <SwiperSlide> <div className="bx text-main-light">#</div> </SwiperSlide>
            <SwiperSlide> <div className="bx text-main-light">#</div> </SwiperSlide>
            <SwiperSlide> <div className="bx text-main-light">#</div> </SwiperSlide>
            <SwiperSlide> <div className="bx text-main-light">#</div> </SwiperSlide>
        </Swiper>
        </div>
    </div>
</SwiperSlide>)

 */
 