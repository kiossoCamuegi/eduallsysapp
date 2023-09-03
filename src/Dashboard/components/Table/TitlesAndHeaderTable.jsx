import React, {useState, useEffect} from 'react'
import Table from './Table';
import axios from 'axios';
import Hoot from '../../../General/components/Hoot';
import { Delete, Description, Edit ,OpenInBrowser, Refresh } from '@mui/icons-material';
import DeleteModal from '../elements/DeleteModal';
import NewCicleModal from '../modal/NewCicleModal';
import { Link } from 'react-router-dom';
import SwitchFromPages from '../../../General/components/SwitchFromPages';
import TableGrid from '../../../General/components/TableGrid';
const TABLEURL = Hoot()+"eduallgettitlesandheaders/get/"

 
 
const columns = [ 
  { 
   field: 'index',
   headerName: 'Nº', 
   width: 90 , 
  },
  { 
    field: 'name',
    headerName: 'Nome', 
    width: 500 , 
   },
   { 
    field: 'use',
    headerName: 'Tipo de uso', 
    width: 200 , 
   },  
  {
    field: 'action',
    headerName: 'Ação', 
    width: 150,  
     resizable: true, cellRenderer:(props) => { 
      return     <div className="ed-flex">
      <Link to={`/register_title_and_headers/id=${props.data.id}`}>
            <button cicle_code={props.data.id}  className="btn-circle bg-success text-light">
                 <Edit/>
            </button> 
      </Link>
     <DeleteModal title='este texto' url={Hoot()+`edualltitleandheaderdelete/delete/${props.data.id}`} 
     message='Texto deletado com sucesso' toggle_btn={ 
       <button  className="btn-circle bg-danger ml-2 text-light">
           <Delete/>
       </button>} />
     </div> ;
    }
  } 
];


function TitlesAndHeaderTable() { 
  const [data, setData] = useState([]);
  const [load, setLoaded] = useState(false);

  async function loadData(){
      setLoaded(false);
      const response = await axios.get(TABLEURL);
      const rows = []; 
      response.data.map((item, index)=>{  
                rows.push({
                index:index+1,
                id:item.ed_title_id, 
                use:item.ed_title_for,  
                name:item.ed_title_name,  
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
          TableTitle='Titulos e Cabeçalhos'
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
          TableTitle='Titulos e Cabeçalhos'
          TableBtn={<button className="btn table-btn-small el-refresh-list bg-main-light  ml-2" onClick={loadData}><Refresh /></button>}
      />
  </div>
  )
}
}

export default TitlesAndHeaderTable