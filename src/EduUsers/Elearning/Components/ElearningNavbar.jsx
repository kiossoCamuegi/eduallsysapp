import React from 'react'
import { styled } from 'styled-components'
import Logo from  '../../../Assets/images/logo-small-white.png';
import { Link } from 'react-router-dom';
import {TbShare3, TbNote}  from "react-icons/tb";
function ElearningNavbar() {
  return (
    <Navbar>
       <menu>
         <Link to='/newsfeed' >
           <div className='bg-main logo-menu'>
              <img loading="lazy" role="presentation" src={Logo} alt="eduallsys" />
            </div>
          </Link>
         <div className="br ml-2"></div>
         <h1 className='ml-2'>Gestão empresarial e contabilidade informatizada ll</h1>
       </menu>
       <menu>
           <button className="btn bordered"><TbNote/> Bloco de notas </button>
           <button className="ml-2 btn bordered"><TbShare3/>  partilhar curso</button>
       </menu>
    </Navbar>
  )
}


const Navbar =  styled.div`
  width:100%;
  height:70px; 
  position:fixed;
  z-index:1000; 
  top:0px;
  left:0px;
  padding:0px; 
  display:flex;
  align-items:center;
  background:var(--ed-white);
  justify-content:space-between;  
  box-shadow:var(--ed-shadow-df);

  .logo-menu{
    min-width:45px;
    width:45px;
    height:45px;
    border-radius:6px;
    display:flex;
    align-items:center;
    justify-content:center;

       img{
           width:26px;
           height:26px;
           margin:0px;
       }
  }

  menu { 
    display:flex;
    margin:0px !important; 
    padding:10px 20px;
    align-items:center;
    height:100%; 

    h1{
      font-size:20px;
    }

       .br{
            width:1px;
            height:100%;
            background:var(--ed-silver);
       }

       .btn.bordered{
          color:var(--ed-dark)  !important;
          border:1px solid var(--ed-dark) !important;
          background:transparent;
          box-shadow:unset  !important;
       }
  }


`;

export default ElearningNavbar
