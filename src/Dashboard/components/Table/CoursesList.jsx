import React, { useEffect, useState } from 'react'
import Table from './Table';  
import axios from 'axios';
import { Delete,  Edit, Refresh} from '@mui/icons-material';
 
import Hoot from '../../../General/components/Hoot';
import DeleteModal from '../elements/DeleteModal';
import NewCourseModal from '../modal/NewCourseModal';
import TableGrid from '../../../General/components/TableGrid';
const TABLEURL = Hoot()+"eduallcoursesapi/get/";

 let Categories = ["", "Designer", "Arte", "Engenharia", "Saude", "Ciências"] ;
const TAX = ["Sim", "Não"];
 

const columns = [ 
    { 
     field: 'index',
     headerName: 'Nº',  
     resizable: true,
     width:90,
    }, 
    { 
      field: 'title',
      headerName: 'Nome do Curso',  
      resizable: true,
      width:300,
     },
     { 
        field: 'category',
        headerName: 'Categoria',  
        resizable: true,
     }, 
    {
      field: 'action',
      headerName: 'Ação',  
       resizable: true, cellRenderer:(props) => { 
        return  <div className="ed-flex">
            <NewCourseModal title='Atualizar ' update='true' get={Hoot()+`eduallsinglecoursesapi/get/${props.data.id}`}  
            url={Hoot()+`eduallcourseupdate/update/${props.data.id}`}  toggle_btn={
               <button   className="btn-circle  bg-success text-light">
            <Edit/>
            </button>} /> 
        <DeleteModal title='este curso' url={Hoot()+`eduallcoursedelete/delete/${props.data.id}`} message='Curso deletado com sucesso' toggle_btn={ 
        <button  className="btn-circle bg-danger ml-2 text-light">
            <Delete/>
        </button>} />
        </div>;
      }
    } 
];
  

function CoursesList() {  
    const [data, setData] = useState([]);
    const [load, setLoaded] = useState(false);
  
    async function loadData(){
      setLoaded(false);
        const response = await axios.get(TABLEURL); 
        const rows = []; 
        response.data.map((item, index)=>{  
          rows.push({
          index:index+1,
          id:item.ed_course_id, 
          category: Categories[item.ed_course_category*1],
          title:item.ed_course_title, 
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
    },[]);
  
 
  
  
  if(load){
      return (
      <div>
        <TableGrid
            TableHead={columns}
            TableBody={data} 
            TableTitle='Lista dos cursos'
            TableBtn={<button className="btn table-btn-small el-refresh-list bg-main-light  ml-2" onClick={loadData}><Refresh /></button>}
        />
    </div>
    )
  }else{
    return (
      <div> 
        <><div className="d-none">*</div>
        <TableGrid
            TableHead={columns}
            TableBody={[]} 
            TableTitle='Lista dos cursos'
            TableBtn={<button className="btn table-btn-small el-refresh-list bg-main-light  ml-2" onClick={loadData}><Refresh /></button>}
        />
        </>
    </div>
    )
  }
}

export default CoursesList