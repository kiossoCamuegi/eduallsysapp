import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Hoot from '../../../../General/components/Hoot';
import { Delete,  Edit  } from '@mui/icons-material';
import DeleteModal from '../../elements/DeleteModal';
import NewTypeOfBookModal from '../../modal/Library/NewTypeOfBookModal';
import TableGrid from '../../../../General/components/TableGrid';
import { Refresh } from '@material-ui/icons';

const TABLEURL = Hoot()+"edualllibrarytypeofbooks/get";

 
const columns = [ 
  { 
   field: 'index',
   headerName: 'Nº',
   width:90,  
   resizable: true,
  },
  { 
    field: 'title',
    headerName: 'Tipo de livro',  
    resizable: true,
    width:350,  
   },      
  {
    field: 'action',
    headerName: 'Ação',  
     resizable: true,
      cellRenderer:(props) => { 
      return   <div className="ed-flex"> 
        <NewTypeOfBookModal  title='Atualizar ' update='true' get={Hoot()+`eduallsinglelibrarytypeofbook/get/${props.data.id}`}  
          url={Hoot()+`edualllibrarytypeofbookupdate/update/${props.data.id}`}  toggle_btn={  
        <button  className="btn-circle bg-success text-light">
            <Edit/>
        </button>  
        }/> 
         <DeleteModal title='este  tipo de livro' url={Hoot()+`edualllibrarytypeofbookdelete/delete/${props.data.id}`} message='tipo de livro deletado com sucesso' toggle_btn={
            <button  className="btn-circle bg-danger ml-2 text-light">
                <Delete/>
           </button>
         }/>
     </div>  
    }
  } 
]; 


function TypeOfBookTable() {
  const [data, setData] = useState([]);
  const [load, setLoaded] = useState(false);

  async function loadData(){
    setLoaded(false); 
      const response = await axios.get(TABLEURL);
      const rows = []; 
        response.data.map((item, index)=>{   
            rows.push({
              index:index+1,
              id:item.ed_library_typeofbook_id,   
              title:item.ed_library_typeofbook_title,  
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
          TableTitle='Lista dos tipos de livros'
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
          TableTitle='Lista dos tipos de livros'
          TableBtn={<button className="btn table-btn-small el-refresh-list bg-main-light  ml-2" onClick={loadData}><Refresh /></button>}
      />
  </div>
  )
}
}

export default TypeOfBookTable