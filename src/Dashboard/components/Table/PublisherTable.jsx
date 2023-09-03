import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Delete, Description, Edit , PreviewOutlined } from '@mui/icons-material';
import Table from './Table';
import Hoot from '../../../General/components/Hoot';
import DeleteModal from '../elements/DeleteModal';  
import NewPublisher from '../modal/NewPublisherModal';
import TableGrid from '../../../General/components/TableGrid';
import { Badge } from 'react-bootstrap';
import { Refresh } from '@material-ui/icons';
const TABLEURL = Hoot()+"edualllibrarypublishers/get";
let Status = ["Activo", "Inactivo"];

const PublisherHead = [ 
    'Nº',
    'Editora',  
    'Estado', 
    'Ação'
];

 
const columns = [ 
    { 
     field: 'index',
     headerName: 'Nº',
     width:90,  
     resizable: true,
    },
    { 
      field: 'title',
      headerName: 'Editora',  
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
        return    <div className="ed-flex">
        <NewPublisher  title='Atualizar ' update='true' get={Hoot()+`eduallsinglelibrarypublisher/get/${props.data.id}`}  
        url={Hoot()+`edualllibrarypublisherupdate/update/${props.data.id}`}  toggle_btn={
        <button  className="btn-circle bg-success text-light">
            <Edit/>
        </button> 
        } />
        <DeleteModal title='esta editora' url={Hoot()+`edualllibrarypublisherdelete/delete/${props.data.id}`} 
         message='Editora deletada com sucesso' toggle_btn={
          <button  className="btn-circle bg-danger ml-2 text-light">
             <Delete/>
          </button>
         }/> 
      </div>
      }
    } 
  ]; 
     
 
  

function PublisherTable() {
    const [data, setData] = useState([]);
    const [load, setLoaded] = useState(false);
  
    async function loadData(){
      setLoaded(false); 
        const response = await axios.get(TABLEURL);
        const rows = []; 
          response.data.map((item, index)=>{   
              rows.push({
                index:index+1,
                id:item.ed_library_publisher_id,   
                title:item.ed_library_publisher_name, 
                status:item.ed_library_publisher_status,  
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
            TableTitle='Lista das editoras'
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
            TableTitle='Lista das editoras'
            TableBtn={<button className="btn table-btn-small el-refresh-list bg-main-light  ml-2" onClick={loadData}><Refresh /></button>}
        />
    </div>
    )
  }
   
}

export default PublisherTable