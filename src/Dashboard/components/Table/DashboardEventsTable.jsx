import React, { useEffect, useState } from 'react' 
import axios from 'axios';
import { Delete,  Edit, Refresh} from '@mui/icons-material'; 
import Hoot from '../../../General/components/Hoot';
import DeleteModal from '../elements/DeleteModal';
import NewCourseModal from '../modal/NewCourseModal';
import TableGrid from '../../../General/components/TableGrid';
const TABLEURL = Hoot()+"eduallcoursesapi/get/";

  

const columns = [  
    { 
      field: 'title',
      headerName: 'Evento',  
      resizable: true,
     },
     { 
        field: 'start_date',
        headerName: 'Data Início',  
        resizable: true,
     }, 
     { 
        field: 'start_date',
        headerName: 'Data de Finalização',  
        resizable: true,
     }, 
     { 
        field: 'status',
        headerName: 'Situação',  
        resizable: true,
     }, 
];
  
function DashboardEventsTable() {
    const [data, setData] = useState([]);
    const [load, setLoaded] = useState(false);
  
    async function loadData(){
        const response = await axios.get(TABLEURL); 
        const rows = []; 
        setData(rows);
        setLoaded(true); 
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
            TableHeight={350}
            TableTitle='Eventos Recentes'
            TableBtn={<button className="btn table-btn-small el-refresh-list bg-main-light  ml-2" onClick={loadData}><Refresh /></button>}
        />
    </div>
    )
  }
}

export default DashboardEventsTable
