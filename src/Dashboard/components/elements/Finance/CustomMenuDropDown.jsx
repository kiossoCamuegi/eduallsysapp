import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function CustomMenuDropDown(props) {
   const [show , setShow] = useState(false); 
   
   const ShowMenu = ()=>{setShow(true);}
   const HideMenu = ()=>{setShow(false);}


  return (
    <div>
         <Container onMouseOver={ShowMenu} onMouseLeave={HideMenu}> 
            <div>
                {props.toggle ? props.toggle : ''}
            </div>
           <MenuDrop className={show === true ? 'dropdown-menu' : 'dropdown-menu d-none'}>
                <ul>  
                    {
                        props.links.map((item, index)=>{
                            return(
                                <Link to={item.route} key={index}><li className="menu-option">{item.route_name}</li></Link>   
                            )
                        })
                    }                 
               </ul>
          </MenuDrop> 
        </Container>
    </div>
  )
}


const Container = styled.div` 
    position:relative;  
`;

const MenuDrop = styled.div`
   position:absolute;
   top:25px;
    border:1px solid  #E9ECEF;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    animation:pop 0.2s ease-out; 
   min-width:200px;
   min-height:100px;
   background:var(--ed-white);
   z-index:1000;  
   box-shadow:var(--ed-shadow-df);
   display:block; 
   padding:0;

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
       

      &:hover{
          background:var(--ed-background-color);
          border-bottom:1px solid #E9ECEF;
          border-top:1px solid #E9ECEF; 
      }

      
    .title{
        color:var(--ed-dark);
        font-size:13px; 
    }
  }
`;

export default CustomMenuDropDown