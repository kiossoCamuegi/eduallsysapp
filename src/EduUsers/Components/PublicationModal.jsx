import React, {useRef, useState} from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Modal, Form, Button} from 'react-bootstrap'
import { Attachment, Save } from '@mui/icons-material'; 
import axios from 'axios';
import Hoot from '../../General/components/Hoot';
import ClearInputs from '../../General/components/ClearInputs'; 
import CRValue from '../../General/components/CRValue';
import {toast} from 'react-toastify';
import { EmojiEmotions, Update } from '@material-ui/icons'; 
import styled from 'styled-components';
import EmojiPicker from 'emoji-picker-react';
import {FcLandscape, FcGallery,FcNews, FcStart, FcTemplate} from "react-icons/fc";
import { Avatar } from '@mui/material';
import {BsFillCaretDownFill} from "react-icons/bs";
import { Link } from 'react-router-dom';
import InputEmoji from 'react-input-emoji'
import RandomCodeGenerator from '../../General/components/RandomCodeGenerator';
import FileUpload from '../../General/components/FileUpload';

function PublicationModal(props) {
    const [show, setShow] = useState(false);
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({}); 
    const [emojiShow, ToggleEmojiShow] = useState(false); 
    const [PostText, setText] = useState("");
    const [PostFor, setPostFor] = useState(0);
    const [FontSize, SetFontSize] = useState(20);
    const [Files, setFiles] = useState([]);
    const ChildRef = useRef();
    const PostBackgrounds = [ ];

 
  
    const handleClose = () => setShow(false);
    const handleShow = () => {
       setShow(true);  
    };
     
  
  
    const FORMURL = [
      Hoot()+"eduallpublicationregister/post/",
      Hoot()+"eduallfilesregister/post/", 
      props.get ? props.get : '',
      props.url ? props.url : ''
    ];
  
 
      
const GetFiles = (e)=>{
  setFiles(e);
  SetFontSize(14); 
}

 
  
    const setField = (field, value)  =>{
      setForm({
          ...form,
          [field]:value
      })
  
      if(!!errors[field]){
           setErrors({
              ...errors,
              [field]:null
           });  
      }
  }
   
  
    const validateForm = ()=>{ 
      const NewErrors = {};
   
      return NewErrors;
  }
  
  
  
    const FormSubmit = (e)=>{  
      const post_code = RandomCodeGenerator(5000)
      e.preventDefault();   
      const formErrors = validateForm();
      if(Object.keys(formErrors).length > 0){
           setErrors(formErrors);
           toast.error("Verifique todos os  campos");   
        }else{

           
          function UploadPaymentFiles(){  
            if(Files.length >= 1){
                for(let i = 0; i < Files[0].length; i++) {
                  const file = Files[0][i];   
                  const fileData = new FormData();
                  let extension = "pdf" 
                  fileData.append("file_name", file);
                  fileData.append("file_code",post_code);
                  fileData.append("file_size",file.size);
                  fileData.append("file_type",file.type);
                  fileData.append("file_use", "feepayment_register");
                  fileData.append("file_extension", extension);  
        
                  axios.post(FORMURL[1] , fileData)
                  .then((e)=>{     
                     if(i === (Files[0].length - 1)){
                    
                     };    
                  }).catch((error)=>{
                    toast.error(`Lamnentamos mas não foi possivel salvar o ${i+1}ª ficheiro anexado`);   
                    console.log(error); 
                  });  
                }   
            }    
         }

          const SUBMIT_INPUTS = {post_for:PostFor,  post_total_files:Files.length, post_text:PostText, post_code:post_code};
     
         
     
           axios.post(FORMURL[0], SUBMIT_INPUTS).then((e)=>{ 

            console.log(e);
            
             
              UploadPaymentFiles(); 
              toast.success("Publicado com sucesso !");
              setForm({});
              ClearInputs();
              setTimeout(() => { 
                handleClose();
                setFiles([]);
             }, 1000);  

            }).catch((error)=>{
              toast.error("Lamentamos mas não foi  possivel executar esta ação")
              console.log(error); 
            }); 
          
          
        }  
    };
  
 
    function handleOnEnter(text) {
        console.log("enter", text.split("").length);
         if(Files.length  === 0){
           text.split("").length > 90 ? SetFontSize(14) : SetFontSize(20);
         }
        setText(text)
      };  

   
    return (
        <>
         <div onClick={handleShow} className='col' >
            {
              props.toggle_btn ? props.toggle_btn :   ''
            }
       </div>
      <Modal className='animate__animated animate__zoomInDown'  centered  size='md'   show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> 
           <PostHeader>
           <div className="ed-flex ml-2">
              <Link to="#"><Avatar src={props.picture} sx={{width:45,height:45}} /></Link>
               <div className="ml-2">
                   <h5> Partilhe a sua historia</h5>
                   <div className="pb-for">Para todos parceiros <BsFillCaretDownFill/> </div>
                </div>
            </div>
           </PostHeader>
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={FormSubmit}> 
         <Modal.Body className='scrollLimit'> 
              <PostModalContainer>
                   <section>
                    <div className="text-container">
                        <section className="background-changer">
                              {
                                PostBackgrounds.map((item, index)=>{
                                  return(
                                      <article key={item.id}>
                                          <img loading="lazy" role="presentation" src={item.image} alt={item.name} />
                                      </article>
                                  )
                                })
                              }
                        </section> 
                        <div className="textfield" >
                          <textarea name="" placeholder='Escreva qualquer coisa...' style={{fontSize:`${FontSize}px`}}
                          onChange={(e)=>handleOnEnter(e.target.value)} id="post-text" cols="30" rows="5"></textarea>
                        </div> 
                    </div>
                    <div className="ed-flex mt-4">
                        <div>
                          <input hidden type="file" name="" id="post-files" />
                          <label  className='custom-label' htmlFor="post-files">
                            <FcGallery size={20}/>
                            <span>Imagem / videos</span>
                          </label>
                        </div> 
                    </div>
                    <div className="uploaded-filess">
                          <FileUpload input_name="feepayment_files" Icon="0"  type_of_files="image/x-png,image/gif,image/jpeg"   extensions="png, jpeg, jpg" Files={GetFiles}  ref={ChildRef}   />
                    </div>
                   </section>
              </PostModalContainer>
         </Modal.Body>
           <PostModalFooter>
              <div className="ed-space">
                  <div></div>
                  <div className="ed-flex"> 
                      <Button className="btn bg-main-light ml-2" type="submit">Publicar</Button>
                  </div>
              </div>
           </PostModalFooter>
         </Form>
       </Modal> 
     </>
      ) 
}

const PostHeader = styled.div`
   display:block;
   

   .ml-2{
      cursor:pointer;
   }

   h5{
      font-size:16px !important;
   }

   .pb-for{
      font-size:13px;
      font-weight:500;
      color:var(--ed-grey-text);
      display:flex;
      align-items:center;
      margin-top:3px;

       svg{
          margin-left:5px;
       }
  }
`;


const PostModalContainer = styled.div`
    min-height:200px;  

    .custom-label{
       display:flex;
       font-size:14px;
       align-items:center;
       padding:6px 10px;
       border-radius:6px;
       margin-right:10px;
       margin-bottom:10px;
       background:var(--ed-background-color); 
       cursor:pointer;
       border:1px solid var(--ed-white-smoke);

        span{margin-left:8px;}
    }

    
    textarea{
        width:100%;
        border-radius:4px;
        padding:10px;
        line-height:25px;
        font-weight:500; 
    }

     
  

     .background-changer{
        width:100%;
        display:flex;
        align-items:center;
        margin-bottom:20px;
       
        article{
           width:78px;
           min-width:78px;
           height:60px;
           border-radius:8px; 
           margin-right:20px;
           overflow:hidden;
           box-shadow:var(--ed-shadow-df);
           cursor:pointer;
           transition:all 1s ease-in-out;

            &:hover{
               transform:scale(1.1);
            }

            img{
                width:100%;
                height:100%;
                object-fit:cover;
            }
        }
     }
`;

const PostModalFooter = styled.div`
    padding:20px; 
    border-top:1px solid var(--ed-silver-light);
`;

export default PublicationModal