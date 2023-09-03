import React , {useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Button} from 'react-bootstrap';
import MenuIcon from '@mui/icons-material/Menu'; 
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded'; 
import { Language, Web } from '@mui/icons-material'; 


function PointOfSaleNavbar() {
    const TITLES = ["Dashboard ponto de vendas" , "Adicionar novo produto", "Caixa aberto", "Efectuar vendas"];

    let titleStorage = localStorage.getItem("pointofsalesTitle");
    console.log(titleStorage)
    let st = titleStorage ?  titleStorage : 0;
    const [title, setTitle] = useState(st);

    const ChangeTitle = (e)=>{
        localStorage.setItem("pointofsalesTitle", e);
        setTitle(e); 
    }

    return (
        <Container>
          <div className="ed-space">
            <div>
                <h5 className='ml-2'>{TITLES[title]}</h5>
            </div>
            <div>
            <Button className='bg-secondary ml-2 dropdownmenu-toggle ed-flex' style={{position:'relative'}}>
              <span className="ml-2"> Menu ponto de vendas </span><div className="ml-2"><ArrowDropDownRoundedIcon/></div>
                <MenuDrop className='dropdown-menu'>
                     <ul>  
                         <li className='menu-option' onClick={()=>ChangeTitle(0)}>
                            <Link to="/pointofsales_dashboard">
                                <div className="ed-space">
                                    <div className="ed-flex"> 
                                        <div className="title">Dashboard ponto de vendas</div>
                                    </div> 
                                </div> 
                            </Link>
                         </li> 
                         <li className='menu-option' onClick={()=>ChangeTitle(1)}>
                            <Link to="/pointofsales_newproduct">
                                <div className="ed-space">
                                    <div className="ed-flex"> 
                                        <div className="title">Adicionar novo produto</div>
                                    </div> 
                                </div> 
                            </Link>
                         </li> 
                         <li className='menu-option' onClick={()=>ChangeTitle(2)}>
                            <Link to="#">
                                <div className="ed-space">
                                    <div className="ed-flex"> 
                                        <div className="title">Caixa aberto</div>
                                    </div> 
                                </div> 
                            </Link>
                         </li> 
                         <li className='menu-option' onClick={()=>ChangeTitle(3)}>
                            <Link to="/pointofsales_salles">
                                <div className="ed-space">
                                    <div className="ed-flex"> 
                                        <div className="title">Efectuar vendas</div>
                                    </div> 
                                </div> 
                            </Link>
                         </li> 
                    </ul>
              </MenuDrop>
             </Button> 
            </div>
          </div>
        </Container>
    )
}


const Container = styled.div`
   .dropdownmenu-toggle{
       position:relative;

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
   width:250px;
   min-height:100px;
   background:var(--ed-white);
   z-index:1000;  
   box-shadow:var(--ed-shadow-df);
   display:none; 
   padding:0;

   ul{
       display:flex;
       flex-direction:column;
       width:100%;
       padding:0px;
       margin:0;
       list-style:none;
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

export default PointOfSaleNavbar