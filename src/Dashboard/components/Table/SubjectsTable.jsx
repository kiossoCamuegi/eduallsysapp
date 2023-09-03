import React ,{useState, useEffect} from 'react'
import Table from './Table'
import { Delete, Description, Edit ,OpenInBrowser, Refresh } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import axios from 'axios'
import Hoot from '../../../General/components/Hoot'; 
import DeleteModal from '../elements/DeleteModal';
import NewSubject from '../modal/NewSubject';
import TableGrid from '../../../General/components/TableGrid';

const TABLEURL = Hoot()+"eduallsubjectsapi/get/"
const subject_type = ["Teorica", "Pratica", "Teorica / Pratica"];

 

const columns = [ 
  { 
   field: 'index',
   headerName: 'Nº', 
   width: 90 , 
   resizable: true,
  },
  { 
      field: 'title',
      headerName: 'Nome da disciplina',  
      resizable: true,
  }, 
   { 
    field: 'type',
    headerName: 'Tipo de disciplina',  
    resizable: true,
   },  
   { 
    field: 'category',
    headerName: 'Categoria',  
    resizable: true,
   },   
  {
    field: 'action',
    headerName: 'Ação',  
     resizable: true, 
     cellRenderer:(props) => { 
      return  <div className="ed-flex">
      <NewSubject title='Atualizar ' update='true' get={Hoot()+`eduallsinglesubject/get/${props.data.id}`}  
        url={Hoot()+`eduallsubjectupdate/update/${props.data.id}`}  
          toggle_btn={
           <button subject-code={props.data.id} className="btn-circle bg-success text-light">
                 <Edit/>
            </button> 
          }
      />
    <DeleteModal title='esta disciplina' url={Hoot()+`eduallsubjectdelete/delete/${props.data.id}`} message='Disciplina deletada com sucesso' toggle_btn={ 
     <button  className="btn-circle bg-danger ml-2 text-light">
         <Delete/>
     </button>} /> 
   </div>;
    }
  } 
];

function SubjectsTable() {  
  const [data, setData] = useState([]);
  const [load, setLoaded] = useState(false);

  async function loadData(){
      setLoaded(false); 
      const response = await axios.get(TABLEURL); 
      const rows = [];
      response.data.map((item, index)=>{  
        rows.push({
          index:index+1,
          id:item.ed_subject_id,  
          type:subject_type[Math.floor(item.ed_subject_type)],
          title:item.ed_subject_title,   
          category:item.ed_subject_category,
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
          TableTitle='Disciplinas Académicas'
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
          TableTitle='Disciplinas Académicas'
          TableBtn={<button className="btn table-btn-small el-refresh-list bg-main-light  ml-2" onClick={loadData}><Refresh /></button>}
      />
  </div>
  )
}
}

export default SubjectsTable