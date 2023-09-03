import { forwardRef, useImperativeHandle, useRef, useState }from 'react'
import styled from 'styled-components';

import Img_1 from '../../Assets/images/svg/docs.svg';
import Img_2 from '../../Assets/images/svg/images.svg';
import Img_3 from '../../Assets/images/svg/videos.svg';
import Img_4 from '../../Assets/images/svg/network.svg';
import  DocImg from '../../Assets/images/svg/doc.png';
import { Delete } from '@material-ui/icons';
import ReduceTextLength from './ReduceTextLength';
import CheckinternetStatus from './CheckinternetStatus';

const FileType = [
   "image/png", 
   "image/jpg", 
   "image/jpeg", 
   "image/jfif", 
   "image/gif", 
   "image/webp",
   "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
   "application/pdf"
];


const FileIcons = [{img: Img_1}, {img: Img_2}, {img: Img_3}];

 

const FileUpload = forwardRef((props, ref) => { 

  const DropRef = useRef(null);
  const [fileList, setFileList] = useState([]); 
 

  const InputChange = (e)=>{  
     setFileList(e.target.files);   
     const DataFiles = [];
     for(let i = 0; i < e.target.files.length; i++) {
          DataFiles.push(e.target.files[i]);
     } 
     props.Files([DataFiles]);  
  }

  const ClearFiles = ()=>{
     setFileList([]);
     props.Files([]);
  }


  useImperativeHandle(ref, ()=>({
      ClearFiles(){
         setFileList([]);
         props.Files([]);
      }
  }))

   const  GetSize = (e) =>{ 
      let size = Math.floor(e / 1024 ** 2);
      return size + "MB";
   }

 
  return (
     <Container className="upload-container-box">
         <label htmlFor={props.input_name}>
            {CheckinternetStatus()  ? 
               <div  className={props.size ? "upload-container small" : "upload-container"}>
                 <div className="icon">
                    <img loading="lazy" role="presentation" src={FileIcons[props.Icon].img} alt={props.input_name} />
                 </div>
                 <h4>
                     Arrastar os seus ficheiros neste campo para serem carregados no sistema (
                     <span className='text-main-light'> carregar apenas ficheiros do tipo {props.extensions} </span>)
                 </h4>
            </div>
            : <>
               <div  className={props.size ? "upload-container small" : "upload-container"}>
                 <div className="icon">
                    <img loading="lazy" role="presentation" src={Img_4} alt={props.input_name} />
                 </div>
                 <h4>
                     conecte-se a uma rede wifi
                 </h4>
            </div>
            </> } 
         </label>
         {CheckinternetStatus()  ? 
         <label htmlFor={props.input_name}> 
              <button className="btn btn-main"> {props.text ? props.text : 'Carregar ficheiros'} </button>
          </label>
          : <></> }
          {CheckinternetStatus()  ?  <input type="file" onChange={InputChange}  multiple={props.single ? false : true} 
          name={props.input_name} hidden id={props.input_name} accept={props.type_of_files} />  : <></> }
       

       <div  className={fileList.length >= 1 ? "file-loader"  : "d-none"}>
         <div className="clear bg-danger" onClick={ClearFiles} ><Delete/> Remover ficheiros </div> 
          { 
            Array.from(fileList).map((item, index)=>{   
               for(let i = 0; i < FileType.length; i++){
                   if(item.type === FileType[i]){ 
                      if(item.type === "image/png" || item.type === "image/jpg" || item.type === "image/jpeg" 
                       || item.type === "image/jfif" || item.type === "image/gif"){
                        return(
                           <div className="loaded-item" key={index}>
                             <div className="box">
                             <img loading="lazy" role="presentation" src={item ? URL.createObjectURL(item) :  null} alt="#" />
                              <div className="box-over">
                              <div className="size">
                                   {GetSize(item.size)}
                              </div>
                              </div>
                             </div>
                           </div>
                         )
                      }else if(item.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" 
                      || item.type === "application/pdf"){
                        
                        return(
                           <div className="loaded-item" key={index}>
                           <div className="box">
                               <div className="docimg">
                                  <img loading="lazy" role="presentation"   src={item ? DocImg :  null} alt="#" />
                               </div>
                            <div className="box-over">
                            <div className="size">
                                 {GetSize(item.size)}
                            </div>
                            </div>
                           </div>
                            <div className="dets">
                              <h3><ReduceTextLength text={item.name.split('.')[0]} length={window.innerWidth <= 1600 ? 15 : 20}  /></h3>
                               <button className='btn d-none'>Remover</button>
                            </div>
                          </div>
                        )
                      } 
                   }
               }  
               
            })
          }
       </div>
    </Container>  
  )
})


const Container = styled.div`
   width:100%;
   position:relative;
   max-height:600px;
   padding:10px;
   background:var(--ed-background-color);
   border:3px dotted silver;
   border-radius:6px;
   display:flex;
   align-items:center;
   justify-content:center;
   text-align:center;
   flex-direction:column; 

   .upload-container{
       min-height:300px;  
    }

    .upload-container.small{
         min-height:100px !important; 

         h4{
            font-size:15px; 
         }

         img{
            max-width: 200px;
            margin-top:0px;  
         }

         .btn{ 
            font-size:14px; 
            position:relative;
         }
    }


   label{ 
       width:100%;
       height:100%;
       padding:20px 30px;
       display:flex;
       align-items:center;
       justify-content:center;
       text-align:center;
       flex-direction:column;
   }

   img{
       max-width:250px;
       margin:20px 0;
       min-height:250px;
   }

   h4{
       font-size:17px;
       max-width:570px;
       line-height:30px;
       margin-bottom:20px;
       font-weight:500 !important;
       color:#a4b0be;
 
   }


   .file-loader{
      display:flex;
      justify-content:flex-start;
      flex-wrap:wrap;
      position:absolute;
      top:0px;
      left:0px;
      width:100%;
      background:var(--ed-background-color);
      z-index:100;
      height:100%;
      padding:20px;
      max-height:600px;
      overflow-y:auto;

      &::-webkit-scrollbar{
         width:6px;
         background-color:transparent;
     }
     
     &::-webkit-scrollbar-thumb{
         background:rgb(219, 219, 219); 
     }


     
     @media screen and (max-width:1280px){
      .loaded-item{
           width:30.5% !important;

            .box{
               height:230px;
            }
      }
}

     


      .clear{
          min-width:40px;
          min-width:40px; 
          min-height:30px;
          max-height:30px;
          position:absolute;
          top:1px;
          right:1px;
          border-radius:2px;
          display:flex;
          align-items:center;
          justify-content:center;
          cursor:pointer;
          z-index:1000;
          color:var(--ed-white);
          font-size:13px;
          padding:4px 15px;


          svg{
             fill:var(--ed-white);
             width:20px;
             height:20px;
             margin-right:5px;
          }
      }

      .loaded-item{
          min-width:200px;
          width:18%; 
          margin:10px; 
          position:relative; 
          border:4px solid var(--ed-white);
          box-shadow:var(--ed-shadow-df);
          height:320px;
          border-radius:6px;
          background:var(--ed-white);

         .dets{
            padding:10px;
            display:block;
            text-align:left;
            margin-top:5px;

            h3{
               font-size:15px;
               text-align:left;
            }  

            button{
               padding:3px 10px;
               border:2px solid var(--ed-red) !important;
               color:var(--ed-red) !important;
               background:transparent !important;
               box-shadow:none;
               font-size:13px;
            }
         } 

          .box{
            height:210px;
            position:relative; 
            overflow:hidden;
            border-radius:6px;
            background:var(--ed-white);

            
            .docimg{
               padding:60px;  

               img{
                    width:100%;
               }
           }

            .box-over{
                position:absolute;
                top:0px;
                left:0px;
                width:100%;
                height:100%;
                display:flex; 
                justify-content:flex-end;
                padding:10px;
                background:var(--ed-trp-1);

                .size{
                  padding:4px 10px;
                  background:var(--ed-white);
                  box-shadow:var(--ed-shadow-df);
                  border-radius:6px;
                  height:30px;
                  font-size:15px;
                }
            }
               
            img, video, doc{
               width:100%;
               height:100%;
               margin:0px;
               min-height:auto !important;
            }
          }
      }
   }
`;

 

export default FileUpload