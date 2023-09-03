import React from 'react'
import styled from 'styled-components'
import { GetClasstitle_byclass, GetSubject } from '../../../../../General/components/InstituteData';
import {AiOutlineEye} from "react-icons/ai";
import TCCD_SubjectContent from './Components/TCCD_SubjectContent';

function TCC_curricularplan(props) {

const Subjects = [
    {subject_code:1, class_code:21},
    {subject_code:2, class_code:22},
    {subject_code:3, class_code:23},
    {subject_code:4, class_code:24},
    {subject_code:1, class_code:21},
    {subject_code:2, class_code:22},
    {subject_code:3, class_code:23},
    {subject_code:4, class_code:24},
];

const Colors = ["#FB5607 ", "#8338EC ", "#FFBE0B ", "#FF006E ", "#3A86FF ", "#06D6A0 ", 
"#EF476F ", "#073B4C ", "#B392AC ", "#34A0A4 ", "#9C6644 ", "#F2CC8F ", 
"#E07A5F ",  "#F9844A ",  "#7B2CBF "];

  return (
    <div> 
        <div className="ed-wrap d-none">
              {Subjects.map((item, index)=>{
                 return(
                    <Card key={index} >
                        <div className="view-container">
                            <div className="view bg-black">
                                <AiOutlineEye/>
                            </div>
                        </div>
                        <div style={{background:`${Colors[index >= Colors.length -1 ? 1 : index]}`}} className="content">
                            <div className="subject">
                                <div className="text">
                                    <GetSubject ID={item.subject_code}/>
                                </div>
                            </div>
                            <div className="short">Turma - <GetClasstitle_byclass ID={item.class_code}/> </div>
                        </div>
                    </Card>
                 )
              })}
         </div> 
         <div className=''>
            <TCCD_SubjectContent data={props.Data.data} />
         </div>
         <br /><br /> 
    </div>
    
  )
}


const Title = styled.div` 
    font-size:18px;
    font-weight:600;
`; 

const Card = styled.article`
   min-width:23.6%;
   width:200px;
   height:200px; 
   margin:20px 10px;
   background:var(--ed-white);  
   box-shadow:var(--ed-shadow-df); 
   border-radius:6px; 
   padding:20px;
   position:relative;

   
   .view-container{
        display:flex;
        align-items:center;
        text-align:center;
        flex-direction:column;
        justify-content:center;
        position:absolute;
        top:-20px;
        left:0px;
        width:100%;
        min-height:10px;
        z-index:10;

        .view{
            width:50px;
            min-width:50px;
            height:50px;
            border-radius:100%; 
            display:flex;
            align-items:center;
            text-align:center; 
            justify-content:center;
            cursor:pointer;

            svg{
                fill:#FFFF;
                color:#FFFF;
                width:30px;
                height:30px;
            }
        }
    }

    .content{
        border-radius:6px;
        width:100%;
        height:100%;
        padding:20px;
        display:flex;
        align-items:center;
        text-align:center;
        flex-direction:column;
        justify-content:center;

            .short{
                padding:10px 20px;
                background:var(--ed-white);  
                box-shadow:var(--ed-shadow-df); 
                border-radius:6px;
                font-size:15px;
                font-weight:600;
            }

            .subject{
                margin-bottom:10px;

                .text{
                    text-transform:uppercase;
                    color:#ffff;
                    font-size:18px;
                }
            }

 

    }


 
`;

export default TCC_curricularplan
