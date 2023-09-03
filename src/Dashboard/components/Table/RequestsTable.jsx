import React, { useEffect, useState } from 'react'
import Table from './Table';  
import axios from 'axios';
import { Delete,  Edit, Refresh} from '@mui/icons-material';
 
import Hoot from '../../../General/components/Hoot';
import DeleteModal from '../elements/DeleteModal';
import NewRequestModal from '../modal/NewRequestModal';
import TableGrid from '../../../General/components/TableGrid';

const TABLEURL = Hoot()+"eduallgetrequests/get";
 
const columns = [ 
    { 
     field: 'index',
     headerName: 'Nº',
     width:90,  
     resizable: true,
    },
    { 
      field: 'name',
      headerName: 'Nome',  
      resizable: true,
     },
     { 
      field: 'type',
      headerName: 'Tipo de solicitação',  
      resizable: true,
     }, 
     { 
        field: 'registeredBy',
        headerName: 'Cadastrado por',  
        resizable: true,
    },  
    { 
        field: 'requestdate',
        headerName: 'Data de solicitação',  
        resizable: true,
    },  
    { 
        field: 'status',
        headerName: 'Status',  
        resizable: true,
    },  
    {
      field: 'action',
      headerName: 'Ação',  
       resizable: true,
        cellRenderer:(props) => { 
        return   <div className="ed-flex">
        <NewRequestModal  title='Atualizar ' update='true' get={Hoot()+`eduallgetsingletiming/get/${props.data.id}`}  
         url={Hoot()+`edualltimingupdate/update/${props.data.id}`} 
          toggle_btn={
           <button className="btn-circle btn-edit-timing bg-success text-light">
              <Edit/>
            </button> 
          }
        />
       <DeleteModal title='este horário' url={Hoot()+`edualltimingdelete/delete/${props.data.id}`} 
          message='Horário deletado com sucesso' toggle_btn={
           <button className="btn-circle btn-delete-timing bg-danger ml-2 text-light">
           <Delete/>
       </button>
          }/> 
    </div> ;
      }
    } 
  ];
function RequestsTable() {
    const [data, setData] = useState([]);
  const [load, setLoaded] = useState(false);

  async function loadData(){
    setLoaded(false); 
      const response = await axios.get(TABLEURL);
      const rows = []; 
        response.data.map((item, index)=>{   
            rows.push({
                  index:index+1,
                  id:item.ed_request_id,
                  name:item.ed_request_made_by,
                  type:item.ed_request_type,
                  status:item.ed_request_status,
                  user:item.ed_request_user_code,
                  date:item.ed_request_registerDate
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
          TableTitle='Solicitações'
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
          TableTitle='Solicitações'
          TableBtn={<button className="btn table-btn-small el-refresh-list bg-main-light  ml-2" onClick={loadData}><Refresh /></button>}
      />
  </div>
  )
}
}

export default RequestsTable