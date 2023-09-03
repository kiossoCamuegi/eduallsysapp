import { Camera, Remove, Save } from '@mui/icons-material';
import React, { useState, useRef, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styled from 'styled-components';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import RandomCodeGenerator from '../../../General/components/RandomCodeGenerator';

function PictureModal(props) {
const [show, setShow] = useState(false);
 const VideoRef = useRef(null);
 const PhotoRef  = useRef(null);
 const [hasPhoto, setHasPhoto] = useState(false); 
 
const handleClose = () => {
    if(hasPhoto){
        let photo = PhotoRef.current;
        let ctx = photo.getContext('2d');
        ctx.clearRect(0,0, photo.width, photo.height); 
        setHasPhoto(false);
    }
    setShow(false);
}

 const GetVideo = ()=>{
    navigator.mediaDevices.getUserMedia({
           video:{width:1980,height:1080}
    }).then(stream=>{
         let video = VideoRef.current;
         video.srcObject = stream;
         video.play();

    }).catch(err=>{
            console.error(err)
    });
 }


 const handleShow = () => {
    setShow(true);
    GetVideo();
}

 const TakePhoto = ()=>{
      const width = 414;
      const  height = width  / (16/9)+100;

      let video = VideoRef.current;
      let photo = PhotoRef.current;

      photo.width = width;
      photo.height = height;

      let ctx = photo.getContext('2d');
      ctx.drawImage(video, 0, 0 , width, height); 
      setHasPhoto(true);
 }


 const handleApply = ()=>{
    handleClose();
 }
 

 const handleSave = ()=>{
    let Class = "link_"+RandomCodeGenerator(50)+RandomCodeGenerator(30)+"".toLowerCase();
    const link = document.createElement('a');
    link.classList.add(Class)
    console.log(link.classList)

    
    link.download =  'eduall_picture_'+RandomCodeGenerator(30)+'.png';
    link.href = PhotoRef.current.toDataURL();
    link.click(); 
    document.querySelector(`a.${Class}`).remove();
    console.log(document.querySelectorAll(`a.${Class}`) )

 }


  return (
    <div>
        <div> 
             {props.toggle_btn ?  <div onClick={handleShow}>{props.toggle_btn}</div>  :  
            <button onClick={handleShow} className="btn bg-main"> <Camera/> Fotografar</button>} 
         </div>
        <Modal  size="lg"  centered show={show} onHide={handleClose}  backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
           <Modal.Title><h5> Câmera fotografica</h5></Modal.Title>
        </Modal.Header> 
        <Modal.Body>
            <CaptureBox>
                  <video ref={VideoRef} ></video>
                  <div className={hasPhoto ? 'pop' : ''} >
                      <div className="block">
                          <button className="btn bg-danger" onClick={()=>setHasPhoto(false)} ><ClearOutlinedIcon/></button>
                          <button className="btn bg-blue"onClick={handleSave}><Save/></button>
                      </div>
                      <canvas ref={PhotoRef}></canvas> 
                  </div>
            </CaptureBox>
        </Modal.Body>
        <Modal.Footer> 
            {hasPhoto ? <Button className='bg-light text-dark' onClick={handleApply}><EmojiEmotionsOutlinedIcon/> Aplicar </Button> : <></>}
            <Button className='bg-main' onClick={TakePhoto} ><CameraAltOutlinedIcon /> Capturar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}


const CaptureBox = styled.div`
    height:400px;
    width:100%;
    border:2px dotted var(--ed-silver);
    border-radius:6px;
    position:relative;
    background:var(--ed-background-color); 
    overflow:hidden;

    video{
         width:100%;
         height:100%;
         background:var(--ed-dark);
    }

    canvas{
        display:none;
        background:var(--ed-white); 
        width:120px;
        height:100px;
        border:2px dotted var(--ed-silver); 
        border-radius:6px;
    }   

    .pop{
        display:flex;
        align-items:center;
        position:absolute;
        top:20px;
        right:20px;

        .block{
            padding-right:15px;

            .btn{
                width:30px;
                height:30px;
                border-radius:100%;
                display:flex;
                align-items:center;
                justify-content:center;

                  svg{
                      margin:0px !important;
                      width:18px;
                      height:18px;
                  }
            }

             .btn.bg-blue{
                 margin-top:10px;
                 background:var(--ed-blue) !important;
             }
        }

         canvas{
              display:block;
         }
    }
`;



export default PictureModal