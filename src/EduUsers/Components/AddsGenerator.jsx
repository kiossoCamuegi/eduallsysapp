import React, { useEffect, useState } from 'react';
import AdBox from './AdBox';
import Hoot from '../../General/components/Hoot';
import axios from 'axios';

const Adds = [ 
  {
    code:"1",
    img:require('../../Assets/images/ads/8.png'), 
    title:'O melhores produtos só aqui gestão',
    link:'https://www.bing.com/search?pglt=2083&q=clickup&cvid=9374fb5dcbb04de4884cc5b075e7c0d9&aqs=edge.0.0l8j69i65.1614j0j1&FORM=ANNTA1&PC=U531',
    linkname:'clickup.com',
    owner_name:"Paulo mateus",
    owner_picture:Hoot()+"",
    owner_link:"#"
 }, 
   {
    code:"2",
    img:require('../../Assets/images/ads/10.jpg'), 
    title:'O melhores produtos só aqui',
    link:'https://www.bing.com/search?pglt=2083&q=clickup&cvid=9374fb5dcbb04de4884cc5b075e7c0d9&aqs=edge.0.0l8j69i65.1614j0j1&FORM=ANNTA1&PC=U531',
    linkname:'clickup.com',
    owner_name:"Paulo mateus",
    owner_picture:Hoot()+"",
    owner_link:"#"
 }, 
 {
  code:"3",
   img:require('../../Assets/images/ads/11.jpg'), 
   title:'O melhores produtos só aqui',
   link:'https://www.bing.com/search?pglt=2083&q=clickup&cvid=9374fb5dcbb04de4884cc5b075e7c0d9&aqs=edge.0.0l8j69i65.1614j0j1&FORM=ANNTA1&PC=U531',
   linkname:'clickup.com',
   owner_name:"Paulo mateus",
   owner_picture:Hoot()+"",
   owner_link:"#"
}, 
{
     code:"4",
     img:require('../../Assets/images/ads/12.webp'), 
     title:'Spotify premium',
     link:'https://www.bing.com/search?pglt=2083&q=clickup&cvid=9374fb5dcbb04de4884cc5b075e7c0d9&aqs=edge.0.0l8j69i65.1614j0j1&FORM=ANNTA1&PC=U531',
     linkname:'spotify.com',
     owner_name:"Paulo mateus",
     owner_picture:Hoot()+"",
     owner_link:"#"
  }, 
    {
     code:"5",
     img:require('../../Assets/images/ads/13.jpg'), 
     title:'Microsoft office professional',
     link:'https://www.bing.com/search?pglt=2083&q=clickup&cvid=9374fb5dcbb04de4884cc5b075e7c0d9&aqs=edge.0.0l8j69i65.1614j0j1&FORM=ANNTA1&PC=U531',
     linkname:'Microsoft.com',
     owner_name:"Paulo mateus",
     owner_picture:Hoot()+"",
     owner_link:"#"
  }, 
  {
    code:"6",
    img:require('../../Assets/images/ads/14.jpg'), 
    title:'O melhores produtos só aqui',
    link:'https://www.bing.com/search?pglt=2083&q=clickup&cvid=9374fb5dcbb04de4884cc5b075e7c0d9&aqs=edge.0.0l8j69i65.1614j0j1&FORM=ANNTA1&PC=U531',
    linkname:'clickup.com',
    owner_name:"Paulo mateus",
    owner_picture:Hoot()+"",
    owner_link:"#"
 }, 
 {
     code:"7",
     img:require('../../Assets/images/ads/15.jpg'), 
     title:'O melhores produtos só aqui',
     link:'https://www.bing.com/search?pglt=2083&q=clickup&cvid=9374fb5dcbb04de4884cc5b075e7c0d9&aqs=edge.0.0l8j69i65.1614j0j1&FORM=ANNTA1&PC=U531',
     linkname:'clickup.com',
     owner_name:"Paulo mateus",
     owner_picture:Hoot()+"",
     owner_link:"#"
  }, 
  {
    code:"8",
    img:require('../../Assets/images/ads/16.png'), 
    title:'O melhores produtos só aqui',
    link:'https://www.bing.com/search?pglt=2083&q=clickup&cvid=9374fb5dcbb04de4884cc5b075e7c0d9&aqs=edge.0.0l8j69i65.1614j0j1&FORM=ANNTA1&PC=U531',
    linkname:'clickup.com',
    owner_name:"Paulo mateus",
    owner_picture:Hoot()+"",
    owner_link:"#"
 }, 
]

const URL = Hoot()+"edualladsregister/post/";


 


function AddsGenerator(props){ 
  const [CurrentAdd, setCurrentAdd] = useState(null);


  useEffect(()=>{ 
    let x = (Math.floor(Math.random() * Adds.length) + 0);
    RegisteraDS(Adds[x]); 
    StartPoping();
  },[]);



  const StartPoping = ()=>{
     let x = (Math.floor(Math.random() * Adds.length) + 0);
     setInterval(() => { 
         RegisteraDS(Adds[x]); 
         x = (Math.floor(Math.random() * Adds.length) + 0); 
     }, 60000);
  }
 

  const  RegisteraDS = async(e)=>{
    
    console.clear();
    console.log(window.history);

     if(document.hidden === false){
        try {
          axios.post(URL+e.code, e.code).then((dt)=>{    
            setCurrentAdd(e); 
          }).catch((error)=>{
              StartPoping(); 
          });  
        } catch (error) { 
          StartPoping();
        }  
     }   
}


 
if(CurrentAdd !== null){
  return (
    <div>  
       <AdBox  margin={props.margin ? false : true}  small={props.small  ? true : false}  text={props.text ? 'left' : 'right'} size='lg' key={0} data={CurrentAdd} />  
    </div>
  ) 
}


}

export default AddsGenerator