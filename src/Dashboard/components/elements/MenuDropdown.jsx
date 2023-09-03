import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Button} from 'react-bootstrap';
import MenuIcon from '@mui/icons-material/Menu'; 
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded'; 
import { Language, TaskAltOutlined, Web } from '@mui/icons-material';

function MenuDropdown() {
  return (
   <Container>
        <Button className='bg-white ml-2 dropdownmenu-toggle ed-flex' style={{position:'relative'}}>
           <MenuIcon/><span className="ml-2"> Mais opções </span><div className="ml-2"><ArrowDropDownRoundedIcon/></div>
           <MenuDrop className='dropdown-menu'>
                <ul>  
                    <li className='menu-option'>
                        <div className="ed-space">
                            <div className="ed-flex">
                                <div className="icon">
                                    <TaskAltOutlined/>
                                </div>
                                <div className="title">Tarefas da instituição</div>
                            </div>
                            <div className='arrow'>
                                <ChevronRightIcon/>
                            </div>
                        </div>
                        <ol>
                            <Link to=''><li>Adicionar tarefa</li></Link>
                            <Link to=''><li>Criar grupos</li></Link>
                            <Link to=''><li>Lista das tarefas</li></Link>
                            <Link to=''><li>Lista dos grupos</li></Link>
                            <Link to=''><li>Atribuir tarefas</li></Link>
                        </ol>
                    </li>  
               </ul>
         </MenuDrop>
        </Button> 
   </Container>
  )
}

const Container = styled.div`
   .dropdownmenu-toggle{
       position:relative;
       color:var(--dark);
       border:1px solid var(--ed-silver-light) !important;
       box-shadow:unset;

       span{
        color:var(--dark);
       }

       svg{
         fill:var(--dark); 
       }

       &:hover{
           .dropdown-menu{
               display:block !important;
           }
       }
   }
`;

const MenuDrop = styled.div`
   position:absolute;
   top:45px;
    border:1px solid  #E9ECEF;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    animation:pop 0.2s ease-out; 
   width:350px;
   min-height:47px;
   background:var(--ed-white);
   z-index:1000;  
   box-shadow:var(--ed-shadow-df);
   display:none; 
   padding:0;


   li{
      list-style:none;
   }

   ul{
       display:flex;
       flex-direction:column;
       width:100%;
       padding:0px;
       margin:0;
   }

  .menu-option{
      width:100%;
      position:relative;
      padding:10px;
      text-align:left; 
      cursor:pointer;
      transition:all 1s ease;
      border:1px solid transparent;

      .icon svg{
          fill:var(--ed-dark-light);
          margin-right:12px;
          width:30px;
      }

      &:hover{
          background:var(--ed-background-color);
          border-bottom:1px solid #E9ECEF;
          border-top:1px solid #E9ECEF;

          ol{
              display:block !important;
              padding:0px !important;
          }
      }

      .arrow svg{
          width:20px;
          fill:var(--ed-blue-dark); 
      }

    .title{
        color:var(--ed-dark);
        font-size:13px; 
    }

    ol{
        position:absolute;
        top:-1px;
        right:-300px; 
        background:var(--ed-white);
        border:1px solid  #E9ECEF;
        padding:0px !important;
        margin:0px !important;
        z-index:50;
        min-width:300px;
        box-shadow:var(--ed-shadow-df);
        animation:pop 0.3s ease-out; 
        display:none;
        
       a{
        padding:0px !important;
        margin:0px !important;

        li{
            width:100%;
            padding:10px; 
            font-size:13px;
            transition:all 1s ease;
            border:1px solid transparent;
            margin:0px !important;

            &:hover{
                background:var(--ed-background-color);
                border-bottom:1px solid #E9ECEF;
                border-top:1px solid #E9ECEF;
            }

        }
       }
    }
  }
`;


export default MenuDropdown