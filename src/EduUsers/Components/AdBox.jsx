import { AnchorTwoTone } from '@mui/icons-material';
import React, { useEffect } from 'react'
import styled from 'styled-components'
import ReduceTextLength from '../../General/components/ReduceTextLength';
import {AiOutlineLink } from "react-icons/ai";
import { Avatar } from '@mui/material';
import ImageLazyLoading from '../../General/components/ImageLazyLoading';

function AdBox(props) { 
  
  useEffect(()=>{
    console.log("Ad number - "+props.data.code+ " added successfuly");
  },[]);

  return (
    <div>
       <a href={props.data.link ? props.data.link : ''} target='_blank'>
         <Box>
            <div className={`block ${props.size ? props.size : ''} 
               ${props.small === true ? ' small ' : ''} 
               ${props.margin === true ? ' margin-t0 ' : ''} 
               ${props.text ? props.text : ''}`}>
               <ImageLazyLoading  source={props.data.img ? props.data.img : ''} alt={props.data.linkname ? props.data.linkname : ''} />
              <div className="dts">
                  <div><h2>{props.data.title ? props.data.title : ''}</h2></div>
                  <div><small> {props.data.linkname ? props.data.linkname : ''} </small></div> 
                   <a href="#" target='_blank' className="ed-flex mt-2 owner text-dark">
                      <Avatar className='df' src={props.data.owner_picture}  sx={{width:30, height:30}}  />
                      <div className="ml-1"><span><ReduceTextLength text={props.data.owner_name} length="17" /></span></div>
                   </a>
              </div>
            </div>
         </Box>
       </a>
    </div>
  )
}


const Box = styled.div`
  width:100%; 
 
  .block{
      max-width:300px;
      text-align:left;
      display:flex;
       margin:20px 0px; 

       .dts{
         padding-left:20px;
         text-align:left;
       }

       .owner{
           display:flex;
           margin:5px 0px;
           padding:5px;
           padding-right:10px;
           border-radius:30px;
           align-items:center; 
           width:max-content;
           background:var(--ed-silver-light);

             span{
                font-size:13px;
             }
       }


  }

  .block.small{
      img{max-height:120px !important;margin:0px;} 
      display:flex;
      align-items:flex-end;
  }

  .block.margin-t0{
    margin-top:0px !important;
    margin-bottom:20px; 
  }

  .block.right{
    text-align:right;
  }

  .block.lg{
      max-width:400px; 

      img{
          height:200px;
      }
  }

  img{
      width:120px;
      object-fit:fill;
      height:130px;
      border-radius:6px;
      margin-bottom:10px;
      border:1px solid  #eaeaee;
  }

  h2{
    font-size:13px;
    margin-bottom:10px;
    color:var(--black);
    letter-spacing:1px;
    font-weight:600;
  }

  small{
     color:grey;
     font-size:12px; 
  }

  p{
      font-size:14px;
      color:var(--ed-blue-dark);
       margin-top:8px;
  }
`;

export default AdBox