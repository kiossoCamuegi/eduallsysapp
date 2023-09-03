import React from 'react'
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import ImagesPanel from '../components/elements/CardsPanel/ImagesPanel';
const LogoImg = [
    require('../../Assets/images/logo.png'),
    require('../../Assets/images/logo-small-white.png'),
]; 


function GetAllCss(element) {
    var css = window.getComputedStyle(element);
    for (var i=0; i<css.length; i++) {
        console.log(css[i] +'='+css.getPropertyValue(""+css[i]))
    }
}

//b+gp9x8i6PGAuu4

function StudentCardGenerator() {
    document.title = "Criar cartão escolar";
  return (
     <Container>
          <SidebarLeft>
          <div className="logo bg-main">
                <Link to='/Dashboard'><img loading="lazy" role="presentation" src={LogoImg[1]} alt="eduallsys" /></Link>
            </div>
            <ul>
                <li></li>
            </ul>
          </SidebarLeft>
          <Templates>
              <ImagesPanel />
          </Templates>
          <Content>
              
          </Content>
     </Container>
  )
}

const Container =  styled.div`
     display:flex;
     background:var(--ed-background-color);  
     height:100vh; 
`;


const Content = styled.div`
    display:block;
`;


const Templates = styled.div`
    min-width:350px;
    width:350px;
    height:100vh; 
    border-right:1px solid #E9ECEF;
    background:var(--ed-white);
`;


const SidebarLeft = styled.div`
  width:80px;
  min-width:80px;  
  height:100vh;
  background:var(--ed-white);
  border-right:1px solid #E9ECEF;

  .logo {
     width:100%;
     display:flex;
     align-items: center;
     justify-content:center; 
     height:80px;
     background:var(--ed-purple);
 

    img{
       width:40px;
       margin:0px;
     }
   }

  hr{
      border:1px solid grey; 
      width:100%;
      height:1px;
  }

  ul{
      padding:6px;
      display:flex;
      flex-direction:column;
      margin:0px;
      justify-content: space-between; 
      width:100%;
      height:92vh; 
      align-items: center;

      @media screen and (max-width:1280px){
         height:90vh;
      }

      div{
        display:flex;
        flex-direction:column;

        li{
            margin:9px 0;
            width:45px;
            height:45px;
            min-width:45px;
            min-height:45px;
            border-radius:100%;
            display: flex;
            align-items: center;
            justify-content: center;
            animation:pop 0.2s ease-in;
            cursor:pointer;
            transition:all 1s ease;
            list-style:none;
  
            svg{
                width:23px;
                height:23px;
                fill:var(--ed-white); 
                color:var(--ed-white);
            }
        }

        .active{
            background-color:var(--ed-purple-light) !important;
            color:#41365c !important;
            box-shadow: var(--ed-shadow-df);
        }
      }

      .menu{
          max-height:63vh; 
          overflow-y:auto;
      }

    .menu::-webkit-scrollbar{
        width:0px;
        background: transparent;
      }
    
    .menu::-webkit-scrollbar-thumb{
         width:0px;
         background-color: transparent;
     }
  }
`;


export default StudentCardGenerator
