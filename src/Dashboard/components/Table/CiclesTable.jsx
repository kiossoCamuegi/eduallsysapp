import React, {useState, useEffect} from 'react'
import Table from './Table';
import axios from 'axios';
import Hoot from '../../../General/components/Hoot';
import { Delete, Description, Edit ,OpenInBrowser, Refresh } from '@mui/icons-material';
import DeleteModal from '../elements/DeleteModal';
import NewCicleModal from '../modal/NewCicleModal';
import TableGrid from '../../../General/components/TableGrid';

const TABLEURL = Hoot()+"eduallciclesapi/get/"
 
const columns = [  
  { field: 'index', headerName: 'Nº'},
  {
    field: 'title',
    headerName: 'Ciclo académico',
    resizable: true,
  },
  {
    field: 'code',
    headerName: 'Abreviação',
    resizable: true,
  },  
  {
    field: 'action',
    headerName: 'Ação', 
     resizable: true,
     cellRenderer:(props) => { 
      return  <div className="ed-flex">
      <NewCicleModal title='Atualizar ' update='true' get={Hoot()+`eduallsinglecicle/get/${props.data.id}`}  
       url={Hoot()+`eduallcicleupdate/update/${props.data.id}`} 
           toggle_btn={
             <button cicle_code={props.data.id}  className="btn-circle bg-success text-light">
                 <Edit/>
            </button> 
           } 
      />
     <DeleteModal title='este ciclo' url={Hoot()+`eduallcicledelete/delete/${props.data.id}`} message='Ciclo academico deletado com sucesso' toggle_btn={ 
       <button  className="btn-circle bg-danger ml-2 text-light">
           <Delete/>
       </button>} />
     </div>;
    }
 }
];




function CiclesTable() {
  const [data, setData] = useState([]); 
  const [load, setLoaded] = useState(false);

  async function loadData(){
    setLoaded(false)
      const response = await axios.get(TABLEURL); 
      const rows = [];
      response.data.map((item, index)=>{ 
        rows.push({
          id:item.ed_cicle_id,
          index:index+1,
          title:item.ed_cicle_title,
          code:item.ed_cicle_code,
          action:'',  
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
            TableTitle='Ciclos acadêmicos'
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
              TableBody={[]} 
              TableTitle='Ciclos acadêmicos'
              TableBtn={<button className="btn table-btn-small el-refresh-list bg-main-light  ml-2" onClick={loadData}><Refresh /></button>}
          />
    </div>
    )
  }
  
 
}

export default CiclesTable