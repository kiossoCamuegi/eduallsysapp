 
import { Copyright } from '@material-ui/icons';
import { ArrowBack, ArrowRight, InstallDesktopOutlined, Save } from '@mui/icons-material';
import React, { useState } from 'react'
import styled from 'styled-components'
import Logo from '../Assets/images/logo-small-white.png';
import {Form} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FileUpload from '../General/components/FileUpload';



function Setup() {

 const [box, setBox] = useState(1);

  return (
    <SetupContainer >
            <div className="top-box bg-main">
               <div className="logo">
                  <a href='https://eduallsys.com' target='_blank'>
                    <img loading="lazy" role="presentation" src={Logo} alt="eduallsys" />
                  </a>
               </div>
               <div>
                  <button className="btn bg-white text-dark">Comparar preços</button>
               </div>
            </div>
         
        <div className="block">
            <div className="progress-track">
                <div className="option done">
                     <div className="dt">
                        <div className="circle">1</div>
                         <span></span>
                     </div>
                    <div className="line"></div>
                </div>
                <div className="option done">
                      <div className="dt">
                        <div className="circle">2</div>
                         <span></span>
                     </div>
                    <div className="line"></div>
                </div>
                <div className="option">
                     <div className="dt">
                        <div className="circle">3</div>
                         <span></span>
                     </div>
                    <div className="line"></div>
                </div>
                <div className="option">
                     <div className="dt">
                        <div className="circle">4</div>
                         <span></span>
                     </div> 
                </div>
            </div>
            <div className="progress-text-track">
                <div>Sobre</div>
                <div>Requisitos</div>
                <div>Segurança</div>
                <div>Finalizar</div>
            </div>
          <Form> 
               
          </Form>
        </div>
    </SetupContainer> 
  )
}
 

const SetupContainer = styled.section`
    height:100vh;  
    background:var(--ed-background-color); 
    width:100%;
    padding:20px;
    display:flex;
    align-items:center;
    justify-content:center;

    .block{
        width:100%;
        width:600px;
    }

    .progress-text-track{
        width:100%; 
        display:flex;
        align-items:center;
        justify-content:space-between;
        margin-bottom:25px;  
    }

    .progress-track{
        width:100%; 
        display:flex;
        align-items:center;
        justify-content:space-between;
        text-align:center;
        margin:20px 0px;

        .option.done{
            .circle{
                background:var(--ed-green);
                color:var(--ed-white);
                border-color:var(--ed-green);
            }
            .line{
                background:var(--ed-green);
            }
        }

        .option{
            display:flex;
            align-items:center;

            .circle{
                width:40px;
                height:40px;
                min-width:40px;
                min-height:40px;
                border-radius:100%;
                display:flex;
                align-items:center;
                justify-content:center;
                cursor:pointer;
                border:3px solid var(--ed-purple-light);
                color:var(--ed-purple-light);
            }

            .line{
                width:146.6px;
                min-width:146.6px;
                height:4px;
                background:var(--ed-purple-light);
            }
        }

        


    }

    .upload-box{
        width:100%;
        padding:10px;
        background:var(--ed-background-color);
        border:3px dotted silver;
        border-radius:6px;
        display:flex;
        align-items:center;
        justify-content:center;
        text-align:center;
        flex-direction:column;
        min-height:300px; 
    }
    

    .top-box{
        position:absolute;
        width:100%;
        top:0px;
        left:0px;
        padding:10px 20px;
        display:flex;
        align-items:center;
        justify-content:space-between;

        img{
            max-width:60px;
        }
    }

    .float-right{
        display:flex;
        align-items:center;
        justify-content:flex-end;
        width:100%;
        margin:10px 0px; 

        button{
            max-width:130px;
            display:flex;
           align-items:center;
           justify-content:center;
           margin-left:10px;

           a{
             color:var(--ed-white);
           }

           svg{
              margin:0px;
              margin-right:5px;
           }
        }
    }

    .box-content{
        display:block;
    }

    .box-content.hide{
         display:none;
    }

    form{
        width:100%;
        min-height:300px;
        max-height:440px;
        border-radius:6px;
        padding:20px;
        background:var(--white);
        box-shadow:var(--ed-shadow-df);
        display:flex; 
        flex-direction:column;
        position:relative;

        h2{
            font-size:20px;
            font-weight:550;
            margin-bottom:20px;
            margin-top:10px;
        }

        a{
            margin-left:-6px;
        }

        .flex-inputs{
            width:100%;
            display:flex;
            justify-content:space-between;

            .mb-3{
                width:48%; 
            }
        }

        input, select{
            width:100%;
            padding:7px 10px;
            font-size:16px;
        }

        button{ 
            margin:10px 0px;
        }

    }
    
`;


const Footer = styled.footer`

`;


export default Setup