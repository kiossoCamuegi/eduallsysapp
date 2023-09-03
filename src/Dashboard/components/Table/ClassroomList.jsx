import React, {useState, useEffect} from 'react'
import axios from 'axios'

import { Delete, Description, Edit , PreviewOutlined, Refresh } from '@mui/icons-material';
import Table from './Table';
import Hoot from '../../../General/components/Hoot';
import NewClassRoomModal from '../modal/NewClassRoomModal';
import DeleteModal from '../elements/DeleteModal';
import TableGrid from '../../../General/components/TableGrid';

const TABLEURL = Hoot()+"eduallclassroomapi/get/";
 

const columns = [ 
  { 
   field: 'index',
   headerName: 'Nº',  
   resizable: true,
  }, 
   { 
    field: 'title',
    headerName: 'Nº da Sala',  
    resizable: true,
   },   
  {
    field: 'action',
    headerName: 'Ação',  
     resizable: true,
      cellRenderer:(props) => { 
      return   <div className="ed-flex">
      <NewClassRoomModal  title='Atualizar ' update='true' get={Hoot()+`eduallsingleclassroomapi/get/${props.data.id}`}  
       url={Hoot()+`eduallclassroomupdate/update/${props.data.id}`}  toggle_btn={  
     <button classroom_code={props.data.id} className="btn-circle bg-success text-light">
         <Edit/>
     </button>  
     }/> 
      <DeleteModal title='esta Sala' url={Hoot()+`eduallclassroomdelete/delete/${props.data.id}`} message='Sala deletada com sucesso' toggle_btn={
         <button classroom_code={props.data.id} className="btn-circle bg-danger ml-2 text-light">
             <Delete/>
        </button>
      }/>
     </div>;
    }
  } 
];

function ClassroomList() {    
  const [data, setData] = useState([]);
  const [load, setLoaded] = useState(false);

  async function loadData(){
    setLoaded(false);
    const response = await axios.get(TABLEURL); 
    const rows = []; 
    response.data.map((item, index)=>{  
              rows.push({
              index:index+1,
              id:item.ed_classroom_id,  
              code:item.ed_classroom_code,
              title:item.ed_classroom_title,   
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
          TableTitle='Lista das salas'
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
          TableTitle='Lista das salas'
          TableBtn={<button className="btn table-btn-small el-refresh-list bg-main-light  ml-2" onClick={loadData}><Refresh /></button>}
      />
  </div>
  )
}
}

export default ClassroomList