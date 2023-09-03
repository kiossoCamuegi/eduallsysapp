import React, { useEffect, useState } from 'react'
import Table from './Table';  
import axios from 'axios';
import { Delete,  Edit, Refresh} from '@mui/icons-material'; 
import Hoot from '../../../General/components/Hoot';
import DeleteModal from '../elements/DeleteModal';
import NewCourseModal from '../modal/NewCourseModal';
import TableGrid from '../../../General/components/TableGrid';
const TABLEURL = Hoot()+"eduallcoursesapi/get/";
 

const columns = [ 
    { 
     field: 'index',
     headerName: 'Nº',  
     resizable: true,
     width:90,
    }, 
    { 
        field: 'title',
        headerName: 'Titulo',  
        resizable: true,
        width:200,
    },
    { 
      field: 'date',
      headerName: 'Data',  
      resizable: true, 
     },
     { 
        field: 'description',
        headerName: 'Descrição',  
        resizable: true, 
    }, 
];
  

 

function SingleEmployeeRequests(props) {
    const [data, setData] = useState([]);
    const [load, setLoaded] = useState(false);
  
    async function loadData(){
        try {
           setLoaded(false);
           const response = await axios.get(TABLEURL); 
           const rows = []; 

        
      
         setData(rows);  
         setLoaded(true); 
        } catch (error) {
            setLoaded(true); 
        }
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
            TableTitle='Solicitações & Reclamações'
            TableHeight={300}
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
            TableTitle='Solicitações & Reclamações'
            TableHeight={300}
            TableBtn={<button className="btn table-btn-small el-refresh-list bg-main-light  ml-2" onClick={loadData}><Refresh /></button>}
        />
        </>
    </div>
    )
  }
}

export default SingleEmployeeRequests
