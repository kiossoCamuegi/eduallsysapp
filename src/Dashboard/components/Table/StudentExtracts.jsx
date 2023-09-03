import React , {useState, useEffect} from 'react'
import { Avatar } from '@mui/material';
import { flexbox } from '@mui/system';
import { Link } from 'react-router-dom';
import Table from './Table';
import axios from 'axios';
import { Delete, Description, Edit, PreviewOutlined} from '@mui/icons-material';

import Hoot from '../../../General/components/Hoot';
import { GetClasstitle_byclass } from '../../../General/components/InstituteData';
import { PrintOutlined } from '@material-ui/icons';
const TABLEURL = Hoot()+"eduallstudentsapi/get/";

const Genders = ["Masculino", "Femenino"];


const StudentHead = [ 
    'Nome', 
    'Turma',  
    'Pagamentos',
    'Notas',
    'Sobre o aluno',
    'Presença escolar'
];


const StudentOptions = {
    filterType: 'checkbox'
}

function StudentExtracts() {
 
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
              <div className='ed-flex'>
                <Avatar alt={item.ed_student_name}   src={item.ed_student_picture != ""  ?  Hoot()+item.ed_student_picture : ""} /> 
                 <span className='ml-2'>{item.ed_student_name}</span>
              </div> ,
              <div> <GetClasstitle_byclass ID={item.ed_student_class}/></div>,    
              <button student-code={item.ed_student_id} className="btn-circle bg-warning text-light">
                   <PrintOutlined/>
              </button>,
               <button student-code={item.ed_student_id} className="btn-circle bg-warning text-light">
                  <PrintOutlined />
               </button>,
                <button student-code={item.ed_student_id} className="btn-circle bg-warning text-light">
                   <PrintOutlined/>
                </button>,
                 <button student-code={item.ed_student_id} className="btn-circle bg-warning text-light">
                    <PrintOutlined/>
                </button>
              ]
           );
        }
    });
  
  
    return (
      <Table
         TableHead={StudentHead}
         TableBody={StudentBody}
         TableOptions={StudentOptions}
         TableTitle='Extratos'
      />
    )
}

export default StudentExtracts