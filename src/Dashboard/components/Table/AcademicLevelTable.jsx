 

import React, {useState, useEffect} from 'react'
import Table from './Table';
import axios from 'axios';
import Hoot from '../../../General/components/Hoot';
import { Delete, Description, Edit ,OpenInBrowser, Refresh } from '@mui/icons-material';
import NewAcademicLevelModal from '../modal/NewAcademicLevelModal';
import DeleteModal from '../elements/DeleteModal';  
import TableGrid from '../../../General/components/TableGrid';
import { Badge } from 'react-bootstrap';
const TABLEURL = Hoot()+"eduallacademiclevelsapi/get/"
 


const columns = [ 
  {
  field: 'index', 
  headerName: 'Nº' ,
   resizable: true,
   width:90
  },
  {
    field: 'title',
    headerName: 'Classe',
    resizable: true,
  },
  {
    field: 'forExam',
    headerName: 'Classe de exame',
    resizable: true,
    cellRenderer:(props)=>{
      return  Math.floor(props.data.forExam) === 1 ? 
      <Badge bg='info'><div className="text-dark">Sim</div></Badge> :
      <Badge bg='danger'><div className="text-dark">Não</div></Badge>
    }
  },
  {
    field: 'forFt',
    headerName: 'Classe de recurso',
    resizable: true,
    cellRenderer:(props)=>{
      return  Math.floor(props.data.forFt) === 1 ? 
      <Badge bg='info'><div className="text-dark">Sim</div></Badge> :
      <Badge bg='danger'><div className="text-dark">Não</div></Badge>
    }          
  },
  {
    field: 'action',
    headerName: 'Ação', 
     resizable: true,
     cellRenderer:(props) => { 
      return   <div className="ed-flex">
        <NewAcademicLevelModal  title='Atualizar ' update='true' get={Hoot()+`eduallsingleacademiclevelsapi/get/${props.data.id}`}  
        url={Hoot()+`eduallacademiclevelupdate/update/${props.data.id}`}  toggle_btn={
        <button  className="btn-circle btn-edit-academic-level bg-success text-light">
            <Edit/>
        </button> 
        }/>
        <DeleteModal title='esta classe' url={Hoot()+`eduallacademicleveldelete/delete/${props.data.id}`} message='Classe deletada com sucesso' toggle_btn={ 
      <button  className="btn-circle bg-danger ml-2 text-light">
          <Delete/>
      </button>} /> 
      </div> ;
    }
  } 
];

function AcademicLevelTable() {
    const [data, setData] = useState([]); 
    const [load, setLoaded] = useState(false);
  
    async function loadData(){
        setLoaded(false);
        const response = await axios.get(TABLEURL);
        const rows = [];
        response.data.map((item, index)=>{ 
          rows.push({
            id:item.ed_academic_level_id,
            index:index+1,
            title:item.ed_academic_level_title,
            forExam:item.ed_academic_level_forExam,
            forFt:item.ed_academic_level_forFt,
            action:"",  
         })
        });  
        setData(rows);
        setTimeout(() => {
           setLoaded(true);
        }, 200);
    };
    
    useEffect(()=>{ 
        loadData();  
    },[]);
   
 

    if(load){
        return (
        <div>
          <TableGrid
              TableHead={columns}
              TableBody={data} 
              TableTitle='Classes académicas'
              TableBtn={<button className="btn table-btn-small el-refresh-list bg-main-light  ml-2" onClick={loadData}><Refresh/></button>}
          />
      </div>
      )
    }else{
      return (
        <>
         <div className="d-none">*</div>
          <div>
            <TableGrid
                TableHead={columns}
                TableBody={[]} 
                TableTitle='Classes académicas'
                TableBtn={<button className="btn table-btn-small el-refresh-list bg-main-light  ml-2" onClick={loadData}><Refresh/></button>}
            />
        </div>
        </>
      )
    }
    
}

export default AcademicLevelTable;