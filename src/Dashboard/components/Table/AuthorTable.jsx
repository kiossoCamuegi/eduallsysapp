import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Delete, Edit, Refresh } from '@mui/icons-material'; 
import Hoot from '../../../General/components/Hoot'; 
import DeleteModal from '../elements/DeleteModal'; 
import NewAuthorModal from '../modal/NewAuthorModal';
import { Badge } from 'react-bootstrap';
import TableGrid from '../../../General/components/TableGrid';
const TABLEURL = Hoot()+"edualllibraryauthor/get"; 

 
const columns = [ 
  { 
   field: 'index',
   headerName: 'Nº',
   width:90,  
   resizable: true,
  },
  { 
    field: 'title',
    headerName: 'Autor',  
    resizable: true,
    width:350,  
   },    
   { 
      field: 'status',
      headerName: 'Estado',  
      resizable: true,
      width:150,   
      cellRenderer:(props)=>{
          return  Math.floor(props.data.status) === 0 ? 
          <Badge bg='info'><div className="text-dark">Activo</div></Badge> :
          <Badge bg='danger'><div className="text-dark">Inactivo</div></Badge>
        }
     },    
  {
    field: 'action',
    headerName: 'Ação',  
     resizable: true,
      cellRenderer:(props) => { 
      return   <div className="ed-flex"> 
     <NewAuthorModal  title='Atualizar ' update='true' get={Hoot()+`eduallsinglelibraryauthor/get/${props.data.id}`}  
          url={Hoot()+`edualllibraryauthorupdate/update/${props.data.id}`}  toggle_btn={
          <button  className="btn-circle bg-success text-light">
              <Edit/>
          </button> 
          } />
          <DeleteModal title='este autor' url={Hoot()+`edualllibraryauthordelete/delete/${props.data.id}`} 
           message='Autor deletado com sucesso' toggle_btn={
            <button  className="btn-circle bg-danger ml-2 text-light">
               <Delete/>
            </button>
           }/> 
     </div>  
    }
  } 
];  

function AuthorTable() {
  const [data, setData] = useState([]);
  const [load, setLoaded] = useState(false);

  async function loadData(){
    setLoaded(false); 
      const response = await axios.get(TABLEURL);
      const rows = []; 
        response.data.map((item, index)=>{   
            rows.push({
              index:index+1,
              id:item.ed_library_author_id,   
              title:item.ed_library_author_name, 
              status:item.ed_library_author_status,  
              action:""
            }); 
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
          TableTitle='Lista dos autores'
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
          TableTitle='Lista dos autores'
          TableBtn={<button className="btn table-btn-small el-refresh-list bg-main-light  ml-2" onClick={loadData}><Refresh /></button>}
      />
  </div>
  )
}

 
}

export default AuthorTable