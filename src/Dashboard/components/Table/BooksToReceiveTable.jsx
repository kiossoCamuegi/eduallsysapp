import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Delete, Description, Edit , PreviewOutlined, Refresh } from '@mui/icons-material';
import Table from './Table';
import Hoot from '../../../General/components/Hoot';
import NewClassRoomModal from '../modal/NewClassRoomModal';
import DeleteModal from '../elements/DeleteModal';
import BorrowBookModal from '../modal/BorrowBookModal';
import { Badge } from 'react-bootstrap';
import { GetsingleBookData, GetsingleBookPicture, GetsingleBookTitle, GetStudentName, GetStudentPicture } from '../../../General/components/InstituteData';
import GetRealDate from '../../../General/components/GetRealDate';
import TableGrid from '../../../General/components/TableGrid';

const TABLEURL = Hoot()+"edualllibraryborrowedbooks/get";


 
const columns = [ 
  { 
   field: 'index',
   headerName: 'Nº',
   width:90,  
   resizable: true,
  },
  { 
    field: 'book',
    headerName: 'Nome do livro',  
    resizable: true,
    width:350,  
    cellRenderer:(props)=>{
      return  <div className="ed-flex">
      <div className="tableImg">
          <GetsingleBookPicture ID={props.data.book} />
      </div> 
      <div className="ml-2"><GetsingleBookTitle ID={props.data.book} /></div>
     </div>
    } 
   },  
   { 
    field: 'usercode',
    headerName: 'Nome do usúario',  
    resizable: true,
    width:350,  
    cellRenderer:(props)=>{
      return  <div className="ed-flex">
          *********
     </div>
    } 
   },    
   { 
      field: 'devolutiondate',
      headerName: 'Data de devolução',  
      resizable: true,
      width:190,   
      cellRenderer:(props)=>{
          return   <div className='ed-flex'>
          {props.data.devolutionDate}
          <div className="text-main-light ml-2">{' ( faltam '+  props.data.totalDays + ' dias )' }</div>
        </div>
        }
     },  
     { 
      field: ' delayedDays',
      headerName: 'Dias em atraso',  
      resizable: true,
      width:160,  
      cellRenderer:(props)=>{
        return   <div>
          { Math.floor(props.data.days) < 0 ? 
           <div className='text-danger'> {Math.floor(props.data.days) * -1 } dias de atraso</div> : 
           <div className='text-green'>0 dias de atraso</div> 
          }
        </div>
      }
     },  
]; 
 


function BooksToReceiveTable() {
  const [data, setData] = useState([]);
  const [load, setLoaded] = useState(false);

  async function loadData(){
    setLoaded(false); 
      const response = await axios.get(TABLEURL);
      const rows = []; 
        response.data.map((item, index)=>{   
          let days = GetRealDate(item.ed_library_borrowed_book_devolutionDate, item.ed_library_borrowed_book_date);     
          let totalDays = Math.floor(days) < 0 ? 0 : days 
            rows.push({
              index:index+1,
              id:item.ed_library_author_id,   
              title:item.ed_library_author_name, 
              status:item.ed_library_author_status,  
              book:item.ed_library_borrowed_book_code,
              usercode:item.ed_library_borrowed_book_usercode,
              delayedDays:days,
              devolutiondate:item.ed_library_borrowed_book_devolutionDate,
              totalDays:totalDays,
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
          TableTitle='Livros não devolvidos'
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
          TableTitle='Livros não devolvidos'
          TableBtn={<button className="btn table-btn-small el-refresh-list bg-main-light  ml-2" onClick={loadData}><Refresh /></button>}
      />
  </div>
  )
}  
}

export default BooksToReceiveTable