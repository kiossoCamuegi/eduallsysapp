import React , {useState, useEffect} from 'react'
import { Avatar } from '@mui/material';
import { flexbox } from '@mui/system';
import { Link } from 'react-router-dom';
import Table from './Table';
import axios from 'axios';
import { AddCircleOutline, Delete, Description, Edit, PreviewOutlined} from '@mui/icons-material';

import Hoot from '../../../General/components/Hoot';
import { GetClasstitle_byclass } from '../../../General/components/InstituteData';
const TABLEURL = Hoot()+"eduallstudentsapi/get/";
 

const StudentHead = [
    'Nº de matrícula', 
    'Nome', 
    'Turma',   
    'Ação'
];


const StudentOptions = {
    filterType: 'checkbox'
}


function StudentsTransport() {
 
    const [data, setData] = useState([]);
  
    async function loadData(){
        const response = await axios.get(TABLEURL);
        setData(response.data);
    }
  
    useEffect(()=>{
        loadData();
    },[]);
  
    const StudentBody = [];
    data.map((item, index)=>{
        if(item != null){
          StudentBody.push(
            [
              <Link to='#' className='text-dark'>{item.ed_student_code}</Link>, 
              <div className='ed-flex'>
                <Avatar alt={item.ed_student_name}   src={item.ed_student_picture != ""  ?  Hoot()+item.ed_student_picture : ""} /> 
                 <span className='ml-2'>{item.ed_student_name}</span>
              </div> ,
              <div> <GetClasstitle_byclass ID={item.ed_student_class}/></div>,   
              <div className="ed-flex">
                 <button className="btn btn-bordered bg-success text-light">
                    <AddCircleOutline/>Adicionar ao transporte
                 </button> 
              </div>
            ]
           );
        }
    });
  
  
    return (
      <Table
         TableHead={StudentHead}
         TableBody={StudentBody}
         TableOptions={StudentOptions}
         TableTitle='Lista dos estudantes'
      />
    )
}

export default StudentsTransport