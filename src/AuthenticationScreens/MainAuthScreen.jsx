import React from 'react'
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import logo from '../Assets/images/logo-small-white.png'; 
import InternetToggle from '../Dashboard/components/elements/InternetToggle';

function MainAuthScreen(props) {
    return (
        <Content>
           <div className="signin-area">
              <div className="ed-space float-top">
                  <div>
                    <Link to='/'>
                          <img loading="lazy" role="presentation" src={logo} alt="eduallsys" />
                    </Link>
                  </div>
                <div>
                  {/* <InternetToggle /> */}
                </div>
              </div>
              <Container>  
              {props.content}
          </Container>
          <div className="auth-area-footer">
            <div className="wrapper">
                <div className="powered"> 
                    <span>This software is powered by <a href="#" className='text-main-light'>BriSoftware</a></span> 
                </div> 
                <div id="google_translate_element"></div>
            </div>
          </div>
        </div>
        </Content>
      );
}


const Content = styled.div`
  .auth-area-footer{
    width:100%;
    min-height:100px;
    background:var(--ed-background-color); 

    .powered{
      width:100%;
      left:0px;
      padding:10px; 
      display: flex;
      align-items: center;
      justify-content: center;

     span{
        display: flex;
        align-items: center;
        font-size:15px;
        font-weight:500;
        color:var(--ed-dark);

        a{
           margin-left:5px; 
        }

     }
    } 
  }
`;

 

const Container = styled.div`  
   width:100%;
   height:100vh; 
   paddding:20px;
   display:flex;
   align-items:center;
   justify-content:center; 
   flex-direction:column;

   .dot{
      background:var(--ed-silver);
      border:1px solid var(--ed-grey);
      width:12px;
      height:12px;
      border-radius:100%;
      margin-left:8px;
   }

   .or{   
      display:flex;
      align-items:center;
      justify-content:space-between; 
      color:grey;  

        .ln{
            width:45%;
            height:1px;
            background:var(--ed-silver);
        }
   }

   .btn-social{
    min-width:232px !important;
    max-width:232px !important;
    box-shadow:unset !important;
    font-size:15px !important;
    border:1px solid var(--ed-silver) !important;

      svg{
        margin-right:10px;
      }
}

.btn-facebook{
     svg{
         fill:var(--ed-blue-light);
     }
}



    .btn-linkedin{
      svg{
          fill:var(--ed-blue);
      }
    }


  .latest-accounts{

      ul{
        display:flex;
        margin-top:20px;
        padding:0px;
        padding-left:5px;
        max-width:580px;
        min-height:110px; 
        overflow-y:auto; 
    
        .swiper{
          margin-left:0px !important;
        }
    
         li{
          display:flex;   
          min-width:65px;
          width:65px;
          height:65px;
          align-items:center;
          justify-content:center; 
          padding:4px;
          border-radius:6px; 
          background:var(--white);
          box-shadow:var(--ed-shadow-1); 
          position:relative;
          margin:0px;
          margin-top:10px;
          margin-right:15px; 
          cursor:pointer;
          transition:all 1s ease-in-out;


          .admin{
              position:absolute;
              bottom:0px;
              right:0px;
              background:var(--ed-purple-light); 
              padding:5px;
              z-index:100; 
              color:var(--ed-white);
              display:flex;   
              align-items:center;
              justify-content:center;  
              font-size:10px; 

                svg{
                     width:16px;
                     height:16px;
                }
          }
    
          .remove{
            position:absolute;
            top:-5px;
            right:-5px;
            border-radius:100%;
            display:none;  
            align-items:center;
            justify-content:center; 
            width:20px;
            height:20px;
            cursor:pointer;
            border:1px solid var(--ed-red);
            z-index:100;
    
              svg{
                color:var(--ed-red)!important;
                fill:var(--ed-red)!important;
              }
         }
    
          &:hover{ 
              .remove{
                display:flex;
              }
          }
    
    
               .icon{
                  width:50px;
                  min-width:50px;
                  height:50px;
                  border-radius:6px;
                  display:flex;  
                  align-items:center;
                  justify-content:center;  
    
                  svg{
                      color:var(--white)!important;
                      fill:var(--white)!important;
                      width:30px;
                      height:30px;
                  }
               }
          
         }
       }
      
    }
 

 
 

   .form-area{ 
       width:100% !important;
       min-width:500px !important;
       max-width:500px !important; 
       display:flex;  
       flex-direction:column;
       padding:15px;
       background:var(--white);
       box-shadow:var(--ed-shadow-df);
       border-radius:6px; 
       z-index:1000;
       position:relative;


       .ed-space{ 
          a, label span{
              font-size:14px !important;
          }
       }

       .ed-space.sc{
          justify-content:center;  
       }

       .form-message h5{
            font-size:17px;
            text-transform:unset !important;
            margin:0px !important;
        } 
   
       h1{
         text-transform: unset !important;
         font-size:30px;
         font-weight:bolder; 
       }

       p{
        font-size:13px;
        font-weight:500;
        letter-spacing:1px;
        color:var(--silver);
        margin:10px 0px;
       }

       input{
            padding:7px 10px;
            font-size:16px;
       }
    } 

    .image-cover{
      position:absolute;
      right:20px;
      bottom:20px;
      
      img{
        max-width:500px;
       }

      @media screen and (min-width:1280px){
            img{
                max-width:400px;
            }
      }
      
    }
`
 

export default MainAuthScreen 