import { Avatar } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Badge } from 'react-bootstrap';
import styled from 'styled-components'
import CalcAgeByBirthday from '../../../../General/components/CalcAgeByBirthday';
import Hoot from '../../../../General/components/Hoot';
import { GetClasstitle_byclass } from '../../../../General/components/InstituteData';
import TableGrid from '../../../../General/components/TableGrid';
import { Refresh } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import GetAllowedAge from '../../../../General/components/GetAllowedAge';
import {BsChatText, BsInfoCircle} from "react-icons/bs";
const TABLEURL = Hoot()+"eduallstudentsapi/get/";

const columns = [ 
  { 
    field: 'student',
    headerName: 'Nome do aluno', 
    resizable: true, 
    width:260,
    cellRenderer:(props)=>{
        return <div className='ed-flex'>
            <Avatar alt={props.data.student}   src={props.data.picture !== ""  ?  Hoot()+props.data.picture : ""} /> 
            <span className='ml-2'>{props.data.student}</span>
        </div>
    } 
  },
  {
    field: 'gender',
    headerName: 'Sexo', 
    resizable: true, 
    width:140,
    cellRenderer:(props)=>{
      return <>{props.data.gender === 'male' ? <Badge bg='success'>Masculino</Badge> : <Badge bg='danger'>Femenino</Badge> }</>
    }
  }, 
    {
    field: 'age',
    headerName: 'Idade', 
    width:100,
  },   
  {
    field: 'action',
    headerName: 'Ação',  
     resizable: true, cellRenderer:(props) => { 
     return <div className="ed-flex"> 
      {(props.data.ageValue >= GetAllowedAge()) ? 
          <Link to="#"><button className="btn-circle  bg-main-light"><BsChatText/></button></Link>  
          : <button   className="btn-circle  bg-secondary"><BsChatText/></button>}   
         <Link to="#"><button className="btn-circle bg-success ml-2"><BsInfoCircle/></button> </Link>
      </div>;
    }  
   }
]; 
//GetAllowedAge
function TeacherClassesTabItem(props){ 

  const [data, setData] = useState([]); 
  const [load, setLoaded] = useState(false);
   
  async function loadData(){ 
    const response = await axios.get(TABLEURL); 
    const rows = [];   
    setLoaded(false);
    props.Data.ClassList.map((item, i)=>{
      rows.push({class_code:item, students:[]}); 
      response.data.map((student, index)=>{   
          if(item !== null && item*1 >= 0){ 
              if(student.ed_student_class === Math.floor(item)){ 
                  rows.map((r, e)=>{
                     if (item === r.class_code) {
                         r.students.push({
                            id:index+1,
                            age:CalcAgeByBirthday(student.ed_student_birthday)+" anos",
                            ageValue:CalcAgeByBirthday(student.ed_student_birthday),
                            student:student.ed_student_name,  
                            picture:student.ed_student_picture,  
                            gender:student.ed_student_gender
                        })
                     }
                  })  
            }
          } 
      })
    }); 
    setData(rows); 
    setLoaded(true) 
  };
  
  useEffect(()=>{ 
    loadData(); 
  },[]);
  
    
  if(load){
    return (
      <div>
          <Container>
             {
               data.map((item, i)=>{ 
                  return  <div className={`table-box ${((data.length % 2 !== 0)  && (i === data.length-1)) ? 'large' : 'small'}`} key={i}>
                      <TableGrid 
                          TableHead={columns}
                          TableBody={item.students} 
                          TableHeight={420}
                          TableInputCode={i}
                          TableTitle={<>Turma  - <GetClasstitle_byclass ID={item.class_code}/></>} 
                      />
                  </div>
               })
             }
          </Container>
      </div>
    )
   } 
}

const Container = styled.div`
   width:100%;
   margin-top:-90px;
   display:flex;
   flex-wrap:wrap;
   justify-content:space-around;
   padding:0px 10px;

    .table-box{ 
        width:49%;
        .MuiBox-root{
          margin:0px 0px;
        }

        @media screen and (max-width:1300px){
           width:48%;
        }
    }


    .table-box.large{
        width:100% !important;
    }
`;

export default TeacherClassesTabItem