import { Avatar, AvatarGroup } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function TCCD_coursesGrid() {
  const Data = [
    {
        title:'Css design  para iniciantes',level:1, price:'0 kz', createdDate:'Criado aos 20 de Maio de 2020',
       imageSrc:require('../../../../../../Assets/images/courses/0.jpg'),
       Images :[
        require("../../../../../../Assets/images/avatars/avatar-0.jpg"),
        require("../../../../../../Assets/images/avatars/avatar-1.jpg"), 
        require("../../../../../../Assets/images/avatars/dp-2.jpg"), 
        require("../../../../../../Assets/images/avatars/dp-3.jpg"),  
        require("../../../../../../Assets/images/avatars/dp-4.jpg"), 
        require("../../../../../../Assets/images/avatars/dp-5.jpg"), 
        require("../../../../../../Assets/images/avatars/dp-6.jpg"),  
    ]
    },
    {
       title:'Aprenda javascript com 10 projectos',level:2, price:'0 kz', createdDate:'Criado aos 20 de Maio de 2020', 
       imageSrc:require('../../../../../../Assets/images/courses/1.jpg'),
       Images :[
        require("../../../../../../Assets/images/avatars/avatar-0.jpg"), 
        require("../../../../../../Assets/images/avatars/dp-1.jpg"), 
        require("../../../../../../Assets/images/avatars/dp-2.jpg"), 
        require("../../../../../../Assets/images/avatars/dp-3.jpg"),  
        require("../../../../../../Assets/images/avatars/dp-4.jpg"), 
        require("../../../../../../Assets/images/avatars/dp-5.jpg"), 
        require("../../../../../../Assets/images/avatars/dp-6.jpg"),  
    ]
    },
    {
      title:'Wordpress development for pros',level:0, price:'0 kz', createdDate:'Criado aos 20 de Maio de 2020', 
      imageSrc:require('../../../../../../Assets/images/courses/2.jpg'),
      Images :[
        require("../../../../../../Assets/images/avatars/avatar-0.jpg"), 
        require("../../../../../../Assets/images/avatars/dp-1.jpg"), 
        require("../../../../../../Assets/images/avatars/dp-2.jpg"), 
        require("../../../../../../Assets/images/avatars/dp-3.jpg"),  
        require("../../../../../../Assets/images/avatars/dp-4.jpg"), 
        require("../../../../../../Assets/images/avatars/dp-5.jpg"), 
        require("../../../../../../Assets/images/avatars/dp-6.jpg"),  
    ]
    },
    {
        title:'Sass development architecture',level:2, price:'0 kz', createdDate:'Criado aos 20 de Maio de 2020', 
        imageSrc:require('../../../../../../Assets/images/courses/3.jpg'),
        Images :[
            require("../../../../../../Assets/images/avatars/avatar-0.jpg"),
            require("../../../../../../Assets/images/avatars/avatar-1.jpg"),
            require("../../../../../../Assets/images/avatars/dp-3.jpg") ,
            require("../../../../../../Assets/images/avatars/dp-4.jpg"), 
            require("../../../../../../Assets/images/avatars/dp-5.jpg"), 
            require("../../../../../../Assets/images/avatars/dp-6.jpg"),  
        ]
    },
    {
        title:'Node.js API deployment',level:3, price:'0 kz', createdDate:'Criado aos 20 de Maio de 2020',
         imageSrc:require('../../../../../../Assets/images/courses/4.jpg'),
         Images :[
            require("../../../../../../Assets/images/avatars/avatar-0.jpg"),
            require("../../../../../../Assets/images/avatars/avatar-1.jpg"),
            require("../../../../../../Assets/images/avatars/dp-3.jpg"), 
            require("../../../../../../Assets/images/avatars/dp-3.jpg"),  
            require("../../../../../../Assets/images/avatars/dp-4.jpg"), 
            require("../../../../../../Assets/images/avatars/dp-5.jpg"), 
            require("../../../../../../Assets/images/avatars/dp-6.jpg"),  
        ]
    },
    {
        title:'Fullstack development',level:0, price:'0 kz', createdDate:'Criado aos 20 de Maio de 2020', 
        imageSrc:require('../../../../../../Assets/images/courses/5.jpg'),
        Images:[
            require("../../../../../../Assets/images/avatars/avatar-0.jpg"),
            require("../../../../../../Assets/images/avatars/avatar-1.jpg"), 
            require("../../../../../../Assets/images/avatars/avatar-7.jpg"),
            require("../../../../../../Assets/images/avatars/dp-1.jpg"), 
            require("../../../../../../Assets/images/avatars/dp-2.jpg"), 
            require("../../../../../../Assets/images/avatars/dp-3.jpg"),  
            require("../../../../../../Assets/images/avatars/dp-4.jpg"), 
            require("../../../../../../Assets/images/avatars/dp-5.jpg"), 
            require("../../../../../../Assets/images/avatars/dp-6.jpg"),  
        ]
    },
    {
        title:'Vue.js course from 0% to 100%',level:0, price:'0 kz', createdDate:'Criado aos 20 de Maio de 2020',
         imageSrc:require('../../../../../../Assets/images/courses/6.jpg'),
         Images:[
            require("../../../../../../Assets/images/avatars/avatar-0.jpg"),
            require("../../../../../../Assets/images/avatars/avatar-1.jpg"), 
            require("../../../../../../Assets/images/avatars/dp-2.jpg"), 
            require("../../../../../../Assets/images/avatars/dp-3.jpg"),  
            require("../../../../../../Assets/images/avatars/dp-4.jpg"), 
            require("../../../../../../Assets/images/avatars/dp-5.jpg"), 
            require("../../../../../../Assets/images/avatars/dp-6.jpg"),  
        ]
     },
    {
        title:'Arquitectura de computadores',level:'', price:'0 kz', createdDate:'Criado aos 20 de Maio de 2020',
         imageSrc:require('../../../../../../Assets/images/courses/7.jpg'),
         Images :[
            require("../../../../../../Assets/images/avatars/avatar-0.jpg"),
            require("../../../../../../Assets/images/avatars/avatar-1.jpg"),
            require("../../../../../../Assets/images/avatars/dp-3.jpg"),
            require("../../../../../../Assets/images/avatars/avatar-3.jpg"),
            require("../../../../../../Assets/images/avatars/avatar-4.jpg"),
            require("../../../../../../Assets/images/avatars/avatar-5.jpg"),
            require("../../../../../../Assets/images/avatars/avatar-6.jpg"),
            require("../../../../../../Assets/images/avatars/avatar-7.jpg"),
            require("../../../../../../Assets/images/avatars/dp-1.jpg"), 
            require("../../../../../../Assets/images/avatars/dp-2.jpg"), 
            require("../../../../../../Assets/images/avatars/dp-3.jpg"),  
            require("../../../../../../Assets/images/avatars/dp-4.jpg"), 
            require("../../../../../../Assets/images/avatars/dp-5.jpg"), 
            require("../../../../../../Assets/images/avatars/dp-6.jpg"),  
        ]
     }
  ] 

 
  const Levels = ["Iniciante", "Intermediario", "Avanaçado", "Mestre"];

    return (
    <>
     <Container>
        {Data.map((item ,index)=>{
             return(
               <Card key={index}>
                  <div className="card-image">
                     <img loading="lazy" role="presentation" src={item.imageSrc} />
                  </div>
                  <div className="card-dets">
                 <div className="title">
                    <Link to='#'><h2>{item.title}</h2></Link>
                 </div>
                  <div className="ed-space">
                      <div className="level text-main-light">
                          {Levels[item.level]}
                      </div>
                      <div className="price text-main-light">
                        {item.price}
                      </div>
                  </div>
                     <AvatarGroup max={7}>
                        {item.Images.map((el, i)=>{
                            return(
                                <Avatar alt="Remy Sharp" src={el} key={i} /> 
                            )
                        })
                        }
                    </AvatarGroup>
                    <div className="mt-2">
                        <small>+234 alunos cadastrados</small>
                    </div>
                  <div className="creation-date">{item.createdDate}</div>
                  </div>
               </Card>
             )
        })}
    </Container>
      <br/>
    </>
  )
}

const Container = styled.section`
  display:flex;
   width:100%;
   flex-wrap:wrap;
`;

const Card = styled.article`
   min-width:23.6%;
   width:280px;
   height:500px; 
   margin:10px;
   background:var(--ed-white);  
   box-shadow:var(--ed-shadow-df); 
   border-radius:6px;
   overflow:hidden;

    .card-image{
        img{
            height:200px;
            border-radius:6px;
            border:1px solid var(--ed-silver-light);
        }
    }

     .card-dets{
        padding:10px 20px;
        .MuiAvatarGroup-root{
            max-width:max-content !important;
         }

         .title{
            height:70px;
            h2{
                color:var(--ed-dark);
                font-size:18px;
                amrgin:0px;
                margin-bottom:10px;
                font-weight:500; 
                line-height:30px; 
            }
         }

         .ed-space{
            margin:15px 0px;

            .level{ 
                padding:7px 12px;
                border-radius:6px;
                background:var(--ed-background-color);  
             }

             .price{
                font-size:20px;
             }
         }

         small{
            font-size:12px;
         }

         .creation-date{
            color:var(--grey);
            font-size:14px;
            margin-top:5px;
         }
     }
`;

export default TCCD_coursesGrid
