import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Refresh } from '@mui/icons-material'; 
import Hoot from '../../../General/components/Hoot'; 
import TableGrid from '../../../General/components/TableGrid';
import SwitchFromPages from '../../../General/components/SwitchFromPages';
import { Avatar } from '@mui/material';
import { Badge } from 'react-bootstrap';
import CalcAgeByBirthday from '../../../General/components/CalcAgeByBirthday';


const TABLEURL =  Hoot()+"eduallgetstudentsbyclass/";
//const TABLEURL = Hoot()+"eduallstudentsapi/get/";
 



const columns = [ 
  { field: 'index',
   headerName: 'Nº de matrícula',  
   resizable: true,
    cellRenderer:(props)=>{
      return  <SwitchFromPages link={`studentinfo/${props.data.id}`}
      menu='3'  menu_item='17'  toggle_btn={  <span  className='text-dark'>{props.data.id}</span>} />
   }
  },
  {
    field: 'name',
    headerName: 'Nome do aluno', 
    resizable: true, 
    width:400,
    cellRenderer:(props)=>{
       return    <SwitchFromPages link={`studentinfo/${props.data.id}`}
       menu='3'  menu_item='17'  toggle_btn={
       <div className='ed-flex'>
         <Avatar alt={props.data.name}   src={props.data.picture != ""  ?  Hoot()+props.data.picture : ""} /> 
         <span className='ml-2'>{props.data.name}</span>
       </div>
     } />
    }
  },  
  {
    field: 'gender',
    headerName: 'Genero',
    resizable: true,
    width:140,
    cellRenderer:(props)=>{
        return props.data.gender === "female" ?
          <Badge bg='danger'>Femenino</Badge>
        : <Badge bg='info'>Masculino</Badge>
    }
  },
  {
    field: 'age',
    headerName: 'Idade',
    sortable:false, 
    resizable: true,
    width:100,
  },
  {
    field: 'status',
    headerName: 'Status',
     resizable: true, 
     width:120,
     cellRenderer:(props)=>{
      return  Math.floor(props.data.status) === 1 ? 
      <Badge bg='info'><div className="text-dark">Activo</div></Badge> :
      <Badge bg='danger'><div className="text-dark">Inactivo</div></Badge>
    }
  },  
];


 function PdStudentsByClass(props) { 
    const ClassCode = props.ClassId ?  props.ClassId : 0; 
    const [data, setData] = useState([]);
    const [load, setLoaded] = useState(false);
  
    async function loadData(){
      setLoaded(false);
        const response = await axios.get(TABLEURL+ClassCode); 
        const rows = [];
        response.data.map((item, index)=>{  
          rows.push({
            index:index+1,
            id:item.ed_student_id,
            picture:item.ed_student_picture,
            name:item.ed_student_name,  
            age:CalcAgeByBirthday(item.ed_student_birthday)+ " anos",  
            class:item.ed_student_class,
            cicle:'',
            status:item.ed_student_status,
            gender:item.ed_student_gender, 
            action:'',  
         }) 
      }); 
        setData(rows);
       setTimeout(() => {
         setLoaded(true);
       }, 200); 
    }
   
  useEffect(()=>{ 
    loadData(); 
  },[ClassCode]); 


if(load){
      return (
      <div>
        <TableGrid
            TableHead={columns}
            TableBody={data} 
            TableTitle='Lista dos estudantes por turma'
            TableBtn={<button className="btn table-btn-small el-refresh-list bg-main-light  ml-2" onClick={loadData}><Refresh /></button>}
        />
    </div>
    )
  }else{
    return (
      <div>
        <div className="d-none">*</div>
        <TableGrid
            TableHead={columns}
            TableBody={data} 
            TableTitle='Lista dos estudantes por turma'
            TableBtn={<button className="btn table-btn-small el-refresh-list bg-main-light  ml-2" onClick={loadData}><Refresh /></button>}
        />
    </div>
    )
  }
 }
 
 export default PdStudentsByClass