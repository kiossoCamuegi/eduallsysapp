import React from 'react'
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import {GoTasklist} from "react-icons/go";
import {BsClipboardCheck} from "react-icons/bs";
import {BiTimer} from "react-icons/bi";
import { GetEmployeAttendanceValue } from '../../../General/components/InstituteData';

function EmployeeDasboardBox(props){

    // GoTasklist BsClock BsClipboardCheck BiTimer BsStar

  const  Data = [
      {icon:<BsClipboardCheck />, title:"Tarefas atribuidas", value:653 },
      {icon:<GoTasklist />, title:"Faltas aplicadas", value:<GetEmployeAttendanceValue Type={1} ID={props.employeeid} />},
      {icon:<BiTimer/>, title:"Periodos de trabalho", value:4},
  ];

  return (
    <div className='ed-flex ed-space'>
        {Data.map((item, index)=>{
            return(
             <Box key={index}> 
                 <div className="icon bg-main-light">{item.icon}</div>
                 <div className="block">
                    <h1>{item.value}</h1>
                    <span>{item.title}</span>
                 </div>
                 <div className="view">
                    <Link to="#"></Link>
                 </div>
             </Box>
            );
        })}
    </div>
  )
}


const Box = styled.div` 
   width:32%;
   min-width:100px;
   min-height:50px;
   border-radius:6px; 
   min-height:100px;
   margin:15px 0px !important;
   background:var(--ed-white);  
   box-shadow:var(--ed-shadow-df);   
   padding:20px;
   display:flex;
   position:relative;


    h1{
        font-size:22px;
        margin:5px 0px;
        font-weight:600;
    }

    span{
        font-size:16px;
        color:var(--ed-grey-text);
    }

  .icon{
      min-width:60px;
      width:60px;
      height:60px;
      border-radius:100%;
      display:flex;
      align-items:center;
      justify-content:center;
      margin-right:10px;

        svg{
            color:var(--ed-white);
            width:30px;
            height:30px;
        }
  }
      
`;


export default EmployeeDasboardBox
