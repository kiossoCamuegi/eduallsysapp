import React, {forwardRef, useImperativeHandle, useState} from 'react'
import USERCOVER from '../../../Assets/images/avatars/user.jpg';
import {Camera, Close} from '@mui/icons-material';
import styled from 'styled-components';
import { Avatar } from '@mui/material';
import PictureModal from './PictureModal';

const ImagePreview = forwardRef((props, ref) => {  
    const [imgPreview, setImgPreview] = useState(null);
    const [ImageError, setImageError] = useState(false);
    const [Image, setImage] = useState(null);

    const ImageCover = props.Cover ? props.Cover : '';

    const handleImageChange = (e)=>{
        e.preventDefault();
        const selected = e.target.files[0];
        const allowed_extensions = ["image/png", "image/jpeg", "image/jpg"];
        const StudentPicture = new FormData();

        if(selected && allowed_extensions.includes(selected.type)){
            setImageError(false); 
            let reader = new FileReader();
            reader.onloadend = () =>{
            setImgPreview(reader.result);  
            };
            reader.readAsDataURL(selected);
            StudentPicture.append('file', e.target.files[0]);
            setImage(e.target.files[0]);
            props.Picture(e.target.files[0]);
        }else{
            setImageError(true);
            console.log("file not supported");
            props.Picture([]);
        }
    } 


    useImperativeHandle(ref , ()=>({
       RemoveImage(){
            setImgPreview(null)
            setImage([]);
            props.Picture([]);
            setImageError(false); 
        }
    }))
    
    const RemoveImage = ()=>{
        setImgPreview(null)
        setImage([]);
        props.Picture([]);
        setImageError(false); 
    }





  return (
   <Preview>
       <div>
            <div className="imgPreview">
                  <div className="avatar-box-container">
                  <div className="avatar-box">
                         <div className="image-preview">
                          <label htmlFor={props.InputName ? props.InputName  : 'eduallfile'}>
                              <Avatar  sx={{ width: 160, height: 160 }} src={imgPreview ? imgPreview : ImageCover} 
                              alt="" className="df preview-container" /> 
                          </label> 
                             {imgPreview && (
                             <div className='removeAvatarImage' onClick={RemoveImage}>
                                <Close/>
                            </div>
                            )}
                         </div> 
                         <div className="flex-buttons ">
                             <PictureModal toggle_btn={ <li className='btn center btn-main'><Camera/></li>} />
                         </div>
                     </div> 
                     <input type='file' onChange={handleImageChange} hidden id={props.InputName ? props.InputName  : 'eduallfile'}/>
                  </div>
            </div>
            <div> {ImageError === true ?  <p className='errorMsg text-danger mt-2'> Ficheiro não suportado </p>  : ' '}</div>
        </div>
   </Preview>
  )
})


const Preview = styled.div`
.avatar-box{
    position:relative;
    margin-right:20px;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;

    .removeAvatarImage{
        position:absolute;
        top:30px;
        left:15px;
        width:28px;
        height:28px;
        background:var(--ed-white);
        border-radius:100%;
        cursor:pointer;
        display:flex;
        align-items:center;
        justify-content:center; 
        box-shadow:var(--ed-shadow-3);
    
        svg{
            width:10px;
            margin:0;
            height:10px;
            fill:var(--ed-red);
        }
    } 

    .image-preview{
        min-width:200px;
        min-height:175px; 
        width:200px; 
        height:175px;
        border-radius:6px; 
        position:relative;
        display:flex;
        justify-content:center; 
       }

     }

     li{
         width:45px;
         height:40px;
         box-shadow:var(--ed-shadow-df);
         border-radius:4px;
         background:var(--purple);
         margin-top:-35px;
         cursor:pointer;
         display:flex;
         align-items:center;
         justify-content:center;
         z-index:100;
         position:relative;

         svg{
             fill:var(--ed-white);
             width:22px;
             height:22px;
             margin:0;
         }
     }
`

export {ImagePreview}