import React, { useState } from 'react'
import { styled } from 'styled-components';
import {BiWifi, BiWifiOff } from "react-icons/bi";
import {RiCloseFill} from "react-icons/ri";

function ConnectionBadge(props){
 const [Connected, SetConnected] = useState(null);

 const HideBox = ()=>{
    SetConnected(null);
 }


 const ChekInternetConnection = ()=>{  
    const ST = navigator.onLine; 
    if(ST && (Connected !== null)){
        SetConnected(true);
        setTimeout(() => {
          if(Connected !== null){
            //  HideBox();
            //  console.log("we will remove the box");
             console.log(Connected);

          }
        }, 3000);
    }else if(!ST  && (Connected === null)){
        console.log("The box is  hidden and no network founded !");
    }else{
        if(Connected === false){
            SetConnected(false);
            console.log("we are showing the box");
        }
    }
 }

setInterval(() => {
    //ChekInternetConnection();
}, 5000);


  return (
    <Container className={Connected !== null ? `animate__animated  animate__fadeInBottomRight` : 'd-none'}>
        <div className={`bar ${Connected ? 'on' : 'ofl'} `}  ></div>
         {Connected ? 
           <div className="icon on"><BiWifi/></div> :
          <div className="icon ofl"><BiWifiOff/></div>
          }
         <div className="block">
              <h3> {
                  Connected ? 
                  'Vc está online agora' :
                  'Vc está offline agora'
                } 
              </h3>
             <span>{
                  Connected ? 
                  'kiosso! internet está conectada.' :
                  'Opps! internet está desconectada.'
              }</span>
         </div>
         <div className="btn close" onClick={()=>HideBox()}><RiCloseFill/> </div>
    </Container>
  )
}


const Container = styled.div`
    position:fixed;
    bottom:30px;
    right:30px;
    z-index:2000; 
    background:var(--ed-white);
    padding:15px 20px;
    display:flex;
    align-items:center;
    border-radius:6px;
    min-width:300px; 
    box-shadow:var(--ed-shadow-1);
    width:max-content;
    color:var(--ed-silver);
    overflow:hidden;
    text-transform: unset !important;

    .close{
        width:30px;
        height:30px;
        border-radius:100%;
        display:flex;
        align-items:center;
        justify-content:center;
        margin-left:20px;
        background:var(--ed-silver);
        color:red;
        box-shadow:none;

         svg{
            fill:grey;  
            margin:0px;
            min-width:20px;
            min-height:20px; 
        }
    }

    span{
         font-size:12px; 
         color:grey;
         margin:0px;
         width:20px;
    }

    h3{
        font-size:16px;
        margin:0px;
        margin-bottom:5px;
        color:var(--black);
        font-weight:bolder;
    }

     
     .icon{
        width:45px;
        height:45px;
        display:flex;
        align-items:center;
        justify-content:center;
        margin-right:15px;
        border-radius:100%;

        svg{
            min-width:21px;
            min-height:21px;
            margin:0px; 
            fill:var(--ed-white);
        }
     }

     .bar{
          position:absolute;
          top:0px;
          left:0px;
          width:5px;
          height:100%;
     }

      .ofl{background:var(--ed-red);}
      .on{background:var(--ed-green);}
`;

export default ConnectionBadge
