import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Delete,   Edit ,  Refresh } from '@mui/icons-material'; 
import Hoot from '../../../General/components/Hoot'; 
import DeleteModal from '../elements/DeleteModal'; 
import NewBookCategory from '../modal/Library/NewBookCategoryModal';
import TableGrid from '../../../General/components/TableGrid';

const TABLEURL = Hoot()+"edualllibrarytypecategories/get";

 
const columns = [ 
  { 
   field: 'index',
   headerName: 'Nº',
   width:90,  
   resizable: true,
  },
  { 
    field: 'title',
    headerName: 'Categoria',  
    resizable: true,
    width:350,  
   },      
  {
    field: 'action',
    headerName: 'Ação',  
     resizable: true,
      cellRenderer:(props) => { 
      return   <div className="ed-flex"> 
        <NewBookCategory  title='Atualizar ' update='true' get={Hoot()+`eduallsinglelibrarycategory/get/${props.data.id}`}  
            url={Hoot()+`edualllibrarycategoryupdate/update/${props.data.id}`}  toggle_btn={  
          <button className="btn-circle bg-success text-light">
              <Edit/>
          </button>  
          }/> 
           <DeleteModal title='esta Sala' url={Hoot()+`edualllibrarycategorydelete/delete/${props.data.id}`} message='Sala deletada com sucesso' toggle_btn={
              <button className="btn-circle bg-danger ml-2 text-light">
                  <Delete/>
             </button>
           }/>
     </div>  
    }
  } 
]; 


 

function BooksCategoryTable() { 
  const [data, setData] = useState([]);
  const [load, setLoaded] = useState(false);

  async function loadData(){
    setLoaded(false); 
      const response = await axios.get(TABLEURL);
      const rows = []; 
        response.data.map((item, index)=>{   
            rows.push({
              index:index+1,
              id:item.ed_library_category_id,   
              title:item.ed_library_category_title, 
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
          TableTitle='Lista das categorias de livros'
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
          TableTitle='Lista das categorias de livros'
          TableBtn={<button className="btn table-btn-small el-refresh-list bg-main-light  ml-2" onClick={loadData}><Refresh /></button>}
      />
  </div>
  )
} 
}

export default BooksCategoryTable