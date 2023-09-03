import React ,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom' 
import Hoot from '../../../General/components/Hoot'
import axios from 'axios' 
import { GetAuthorName, GetBookCategoryTitle, GetBookPublisherName, GetTypeOfBookTitle } from '../../../General/components/InstituteData';
import DeleteModal from '../elements/DeleteModal';
import { Delete, Edit, Refresh } from '@mui/icons-material';
import Table from './Table';
import TableGrid from '../../../General/components/TableGrid';
const TABLEURL = Hoot()+`edualllibrarybooks/get`;   

const columns = [ 
  { 
   field: 'index',
   headerName: 'Nº',
   width:90,  
   resizable: true,
  },
  { 
    field: 'title',
    headerName: 'Nome do livro',  
    resizable: true,
    width:350,  
    cellRenderer:(props) =>{
      return <>
      <div className="ed-flex">
        <div className='tableImg'>
           <img loading="lazy" role="presentation" src={props.data.picture !== "" ? Hoot()+props.data.picture : "#"} alt="#"  />
        </div>       
          {props.data.title}
      </div>
      </>
    }
   }, 
   { 
    field: 'author',
    headerName: 'Autor',  
    resizable: true,
    cellRenderer:(props) =>{
      return <>
         <GetAuthorName ID={props.data.author}/>
      </>
    }
   }, 
   { 
    field: 'type',
    headerName: 'Tipo de livro',  
    resizable: true,
    cellRenderer:(props) =>{
      return <>
      <GetTypeOfBookTitle ID={props.data.type}/>
      </>
    }
   }, 
   { 
    field: 'category',
    headerName: 'Cátegoria',  
    resizable: true,
    cellRenderer:(props) =>{
      return <>
      <GetBookCategoryTitle ID={props.data.category}/>
      </>
    }
   }, 
   { 
    field: 'date',
    headerName: 'Data de aquisição',  
    resizable: true,
   },  
   { 
    field: 'publisher',
    headerName: 'Editora',  
    resizable: true,
    cellRenderer:(props) =>{
      return <>
        <GetBookPublisherName ID={props.data.publisher}/>
      </>
    }
   },  
  {
    field: 'action',
    headerName: 'Ação',  
     resizable: true,
      cellRenderer:(props) => { 
      return   <div className="ed-flex"> 
      <Link to={'library_registernewbook/'+props.data.id}  className="btn-circle bg-success">
          <Edit />
      </Link>   
      <DeleteModal title='este livro' url={Hoot()+`edualllibrarybookdelete/delete/${props.data.id}`}
       message='Livro deletado com sucesso' toggle_btn={
         <button  className="btn-circle bg-danger ml-2">
             <Delete />
         </button>
       }/>
     </div>  
    }
  } 
]; 

function BooksListTable(){  
  const [data, setData] = useState([]);
  const [load, setLoaded] = useState(false);

  async function loadData(){
    setLoaded(false); 
      const response = await axios.get(TABLEURL);
      const rows = []; 
        response.data.map((item, index)=>{   
            rows.push({
                  index:index+1,
                  id:item.ed_library_book_id,  
                  picture:item.ed_library_book_picture,
                  title:item.ed_library_book_title,
                  author:item.ed_library_book_author,
                  type:item.ed_library_book_type,
                  category:item.ed_library_book_category,
                  date:item.ed_library_book_acquisition_date,
                  publisher:item.ed_library_book_publisher,
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
          TableTitle='Lista dos livros'
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
          TableTitle='Lista dos livros'
          TableBtn={<button className="btn table-btn-small el-refresh-list bg-main-light  ml-2" onClick={loadData}><Refresh /></button>}
      />
  </div>
  )
}
 
}

export default BooksListTable