import { requirePropFactory } from '@material-ui/core';
import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import AddsGenerator from './AddsGenerator';
import TitleBlock from './TitleBlock';
import FriendBox from '../Students/Components/FriendBox';
import StudentDebtsTable from '../Students/Components/StudentDebtsTable';
import TaskBox from '../Students/Components/TaskBox';
import { Avatar } from '@mui/material';

const Tasks = [
   {title:'Tarefa de matematica',date:'12-02-2022',color:'#eafff6',link:"#"},
   {title:'Projeto de geometria',date:'01-10-2022',color:'#ffeeee', link:"#"},
   {title:'Quimica quantica',date:'04-09-2022',color:'#fff1e6',link:"#"}
];
 
const Friends = [
    {name:'José Martins', link:'', img:require('../../Assets/images/avatars/avatar-3.jpg')},
    {name:'Pedro Kyle', link:'', img:require('../../Assets/images/avatars/avatar-4.jpg')},
    {name:'Sara Lopes', link:'', img:require('../../Assets/images/avatars/avatar-5.jpg')},
    {name:'Carla Solange', link:'', img:require('../../Assets/images/avatars/avatar-6.jpg')},
];


function MenuRight(props) {
  return (
  <Container>
    <div className={!props.relative ? 'container-el abs' : 'container-el'}>
      <Content> 
        <div className="mt-4">
            <ul>
              <TitleBlock title="Patrocinados"/>
              <AddsGenerator single margin small text='left' />
            </ul>
        </div>
          <div className="mt-4"> 
              <ul>
              <TitleBlock title='Trabalhos pendentes'/>
                  {
                      Tasks.map((item, index)=>{
                          return(
                              <TaskBox key={index} props={item} />
                          )
                      })
                  }
            </ul>
          </div>
          <ul>
            <TitleBlock title='Mensagens'/>
              {
                  Friends.map((item, index)=>{
                      return(
                          <FriendBox key={index} props={item} />
                      )
                  })
              }
          </ul>
          <ul>
              <TitleBlock title='Pagamentos pendentes'/>
                <StudentDebtsTable/>
                <br />
          </ul>
      </Content>
    </div>
  </Container>
  )
}


const Content = styled.div`
   width:100%;
   border-bottom;
   max-height:98vh; 
   overflow-y:auto; 

   @media screen and (max-width:1350px){
      padding-right:5px;

      ul{
          padding:10px 0px;
      }
  }

   ul{
     padding:10px 20px;
     border-bottom:1px solid  #eaeaee;
   }


    &&::-webkit-scrollbar{
     width:6px;
     background-color:transparent;
   }

   &&:hover{ 
    &&::-webkit-scrollbar-thumb{
       background:rgb(219, 219, 219); 
    }
  }
`;

const Container = styled.div`  
.container-el{ 
   width:100%;
   min-width:350px;
   max-width:400px;
   height:100vh;
   background:var(--ed-white);
   border-left:1px solid #eaeaee; 
   padding-top:60px; 

   @media screen and (max-width:1450px){max-width:320px;border:5px solid green;}
   @media screen and (max-width:1300px){max-width:310px;border:5px solid purple;}
   @media screen and (max-width:1290px){max-width:300px;border:5px solid gold;}
   @media screen and (max-width:1280px){max-width:295px;border:5px solid red;}
}

.container-el.abs{ 
  position:fixed;
  top:0px;
  right:0px;
}

 
`;

export default MenuRight