import { PreviewOutlined } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import Hoot from '../../../General/components/Hoot';
import RandomAvatarColor from '../../../General/components/RandomAvatarColor';


const PARENTSURL =  Hoot()+ 'eduallparents/get';
const GetGrade = ["Mãe " ,"Pai", "Irmão",  "Tio", "Tia"];

function StudentParents(props) {
  let studentCode = props.data.ed_student_code ? props.data.ed_student_code  : 0;
  const [Parents, SetParents] = useState([]);
  const [Loaded , SetLoaded] = useState(false);

  async function GetFiles(){
    console.clear();
      const response = await axios.get(PARENTSURL);
      let ParentsData = [];
      if(response.data.length >= 1){  
          response.data.map((item, index)=>{
               let students = item.ed_parent_students_code.split("|");
               for (let i = 0; i < students.length; i++) {
                    if(students[i] === studentCode){
                        ParentsData.push(item);  
                    }
               }
          })
          console.clear();
          SetParents(ParentsData);
          SetLoaded(true);
          console.table(ParentsData);  
      }
  }


   useEffect(()=>{ 
        GetFiles();
   },[]);

   if(Loaded){
    return (
      <Table >
      <thead>
        <tr>
          <th>Nome</th>
          <th>Email</th>
          <th>Genero</th>
          <th>Grau parentesco</th>
          <th>Telefone</th>
        </tr>
      </thead>
      <tbody>
            {
              Parents.map((item, index)=>{
                  return (
                    <tr key={index}>
                    <td> 
                        <div className="ed-flex"> 
                          <Avatar sr={item.ed_parent_picture !=="" ? Hoot()+item.ed_parent_picture : ""} 
                          className='ml-2' sx={{width:40,height:40}} style={{background:`${RandomAvatarColor()}` , marginRight:10}} />
                          {item.ed_parent_name}
                      </div>
                    </td>
                    <td>{item.ed_parent_email}</td>
                    <td>{item.ed_parent_gender === 0 ? "Masculino" : "Femenino"}</td>
                    <td>{GetGrade[Math.floor(item.ed_parent_degree_of_kinship)]}</td>
                    <td>{item.ed_parent_phone}</td>
                  </tr> 
                )
              })
            } 
      </tbody>
    </Table>
    );
   }
}

export default StudentParents