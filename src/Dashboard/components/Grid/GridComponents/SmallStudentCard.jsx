import React from 'react'
import styled from 'styled-components';
import { Avatar } from '@mui/material';
import { GetAcademicYearCodeByClass } from '../../../../General/components/GetAcademicYearCodeByClass';
import { GetAcademicYearCode } from '../../../../General/components/InstituteData';
import { SettingsApplicationsRounded } from '@material-ui/icons';
import Hoot from '../../../../General/components/Hoot';  
import axios from 'axios';
import { Badge } from 'react-bootstrap';

function SmallStudentCard(props){
    const data = props.data ? props.data : []; 

    const DATA_URL = [ 
        Hoot()+"eduallsingleclassapi/get/"
    ];

    const SendStudentID = async(a, b)=>{     
        let o = null;  
         if(b !== undefined && b >= 0){ 
                const response = await axios.get(DATA_URL[0]+b); 
                if(response.data.length >= 1){ 
                    o = response.data[0].ed_class_year; 
                }
            }  
        props.GetData(a , (o*1) );  
   }

   const ranDomColor = (e)=>{
      let letters = "0123456789ABCDEF"; let color = "#";
      for(let i = 0; i < 6; i++) {color += letters[Math.floor(Math.random() * (16))]}
      return color;
   }


  const Students = [];
  data.map((item, index)=>{ 
        Students.push(
            {
              student_id:item.ed_student_id,
              student_code:item.ed_student_code,
              student_name:item.ed_student_name,
              student_picture:item.ed_student_picture,
              student_class:item.ed_student_class,
              student_linkedin:item.ed_student_linkedin,
              student_email:item.ed_student_email,
              student_phone:item.ed_student_phone,
              student_facebook:item.ed_student_facebook,
            }
        )
  });


    return(<>   
        {
          Students.map((student, index)=>{  
             return(
              <Card key={index} className={'small-student-card el-refresh-list_'+student.student_id} onClick={()=>SendStudentID(student.student_id, student.student_class)}>
              <div className="hide">
                  <span>KLAO93</span>
                  <span>Informatica</span>
              </div>
              <div className="identity bg-main-light" ></div>
              <div className="content">
                  <Avatar className='df' alt={student.student_name} src={student.student_picture != ""  ?  Hoot()+student.student_picture : ""} />
                  <div className="ed-block">
                      <h3>{student.student_name}</h3>
                      <div className="ml-1"> 
                             <div className="ed-flex">
                                 <small className='ml-1 text-main-light'>Nº de matrícula : {student.student_id}</small>
                             </div> 
                      </div>
                  </div>
              </div>
             </Card>
             )
          })
   }</>)
}


const Card = styled.article`
   margin:15px 0;
   width:100%;
   height:65px;
   border-radius:6px;
   border:1px solid var(--ed-silver-light);
   cursor:pointer;
   display:flex;
   overflow:hidden;

   .hide{
       display:none;
   }

  .identity{
      border-top-right-radius:4px;
      border-bottom-right-radius:4px;
      width:5px;
      margin-right:10px;
      height:100%;
  }

  .content{
      padding:10px;
      display:flex;
      align-items:center;

      h3{
          font-size:13.5px;
          margin:0;
          margin-left:10px;
          margin-bottom:5px;
      }

      small{
        font-size:12px;
      }
  }
   
`;

export default SmallStudentCard