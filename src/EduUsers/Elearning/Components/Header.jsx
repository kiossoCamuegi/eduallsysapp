import { PlayCircleRounded } from '@mui/icons-material';
import React from 'react'
import styled from 'styled-components'
import CoverImg from '../../../Assets/images/elearning_main.png';

function Header() {
  return (
    <HeaderContainer>
         <div className="block">
              <span>Cursos & materiais didaticos</span>
              <h1>A maior academia de cursos online gratis  de todos os tempos .</h1>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo totam pariatur ipsa aut laborum tenetur, 
              soluta laudantium. Iure, quae dolore voluptatum fugiat sint non nobis iste obcaecati veniam minus 
              corporis distinctio quaerat necessitatibus provident et similique?  Soluta voluptas quasi corporis in
              voluptatem eaque dicta est nulla. Ex quibusdam unde ducimus.</p>
              <div className="ed-flex mt-4">
                  <button className='btn bg-main-light'>Comece agora <PlayCircleRounded /> </button>  
              </div>
         </div>
         <div className="image-block">
              <img loading="lazy" role="presentation" src={CoverImg} alt="" />
         </div>
    </HeaderContainer>
  )
}


const HeaderContainer = styled.div`
   width:100%;
   min-height:600px;
   background:var(--ed-yellow);
   padding:20px;
   display:flex;
   padding-top:100px;
   padding-bottom:0px;

   @media screen and (max-width:1280px){
        .image-block { 
            display:flex;
            align-items:flex-end;
            justify-content:flex-end;

            img{
              min-width:650px;
              max-height:450px;
           }
        }

        .block{
            h1{font-size:35px !important;}
            p{font-size:15px !important;}
        }
   }

     .block{
          max-width:800px;
          padding-right:20px;
          margin-top:50px;

           

          button{
             box-shadow:none !important;
             border:none !important;
          }

          span{
              color:#F15BB5;
              font-size:20px;
          }

          p{
            font-size:16px;
            font-weight:500;
          }

           h1{
              font-weight:bolder;
              font-size:50px;
              margin:10px 0px;
           }
     }
`;

export default Header