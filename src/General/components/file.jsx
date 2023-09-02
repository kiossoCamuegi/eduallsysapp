{   
fileList.map((item, index)=>{   
   for(let i = 0; i < FileType.length; i++){  
      if(item.type === FileType[i]){ 
            if(item.type === "image/png" || item.type === "image/jpg" || item.type === "image/jpeg" 
            || item.type === "image/jfif" || item.type === "image/gif"){
            return(
               <div className="loaded-item" key={index} id={`loaded-item-el-${index}`}>
                  <div className="box">
                  <img loading="lazy" role="presentation" src={item ? URL.createObjectURL(item) :  null} alt="#" />
                  <div className="box-over">
                  <div className="size">
                        {GetSize(item.size)}
                  </div>
                  </div>
                  </div>
                  <div className="dets">
                     <h3><ReduceTextLength text={item.name.split('.')[0]} length={window.innerWidth <= 1600 ? 15 : 20}  /></h3>
                     <div className='btn'   onClick={(e)=>RemoveFileItem(index, 'loaded-item-el-'+index)} >Remover</div>
                  </div>
               </div>
               )
            }else if(item.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" 
            || item.type === "application/pdf"){
            
            return(
               <div className="loaded-item" key={index} id={`loaded-item-el-${index}`}>
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
                     <div className='btn d-none'   onClick={(e)=>RemoveFileItem(index, 'loaded-item-el-'+index)} >Remover</div>
                  </div>
               </div>
            )
            } 
         } 
   }     
 }) 
}

const RemoveFileItem = (i , e)=>{
   document.getElementById(e).remove();

   const DataFiles = [];
   for(let i = 0; i < fileList.length; i++) {
        DataFiles.push(fileList[i]);
   } 

   console.log("Before remove = ",  DataFiles.length);

   if(DataFiles[i]) delete DataFiles[i]; 
   setFileList(DataFiles);

 
 
     console.table(fileList);
    

    


     console.table(DataFiles)

   

   console.log("After remove = ",  DataFiles.length);


   /*
   if(DataFiles[i]) delete DataFiles[i]; 
   
   setFileList(DataFiles);
  // props.Files([DataFiles]); 

   console.log("After remove = ",  fileList.length);
   */
}



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
            border:1px solid var(--ed-red) !important; 
            background:transparent !important;
            padding:5px 10px;
            color:var(--ed-red) !important; 
            box-shadow:unset !important; 
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
          height:280px;
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

            div.btn{
               padding:3px 10px;
               border:2px solid var(--ed-red) !important;
               color:var(--ed-red) !important;
               background:transparent !important;
               box-shadow:none;
               font-size:13px;
            }
         } 

          .box{
            height:170px;
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