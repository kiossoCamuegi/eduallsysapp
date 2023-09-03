import React, {useState, useEffect} from 'react'
import axios from 'axios'

import { Delete, Description, Edit , PreviewOutlined, Refresh } from '@mui/icons-material';
import Table from './Table';
import Hoot from '../../../General/components/Hoot';
import NewClassRoomModal from '../modal/NewClassRoomModal';
import DeleteModal from '../elements/DeleteModal';
import BorrowBookModal from '../modal/BorrowBookModal';
import { Badge } from 'react-bootstrap';
import { GetsingleBookData, GetsingleBookPicture, GetsingleBookTitle, GetStudentName, GetStudentPicture } from '../../../General/components/InstituteData';
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
        return     <div className="ed-flex">
        <div className="tableImg">
            <GetsingleBookPicture ID={props.data.book} />
        </div> 
        <div className="ml-2"><GetsingleBookTitle ID={props.data.book} /> </div>
       </div>
      }  
     },   
     { 
        field: 'usercode',
        headerName: 'Nome do Usúario',  
        resizable: true,
        width:300,   
        cellRenderer:(props)=>{
          return <div className="ed-flex td-block">
          <GetStudentPicture size={40}  ID={props.data.usercode} />
          <div className="ed-block ml-2">
              <h4><GetStudentName ID={props.data.usercode} /></h4> 
          </div>
        </div>
        }  
       },  
       { 
        field: 'usercode',
        headerName: 'Tipo de usúario',  
        resizable: true,
        width:170,   
        cellRenderer:(props)=>{
          return <div className="ed-flex">
           ********
        </div>
        }  
       },   
       { 
        field: 'date',
        headerName: 'Data de solicitação & Devolução',  
        resizable: true,
        width:300,    
       },   
       { 
        field: 'status',
        headerName: 'Situação',  
        resizable: true,
        width:170,   
        cellRenderer:(props)=>{
          return <>
           {props.data.status === 0 ? 
            <Badge bg='danger'>Não retornado</Badge> : <Badge bg='info'>Retornado</Badge>
           }
          </>
        }  
       },       
    {
      field: 'action',
      headerName: 'Ação',  
       resizable: true,
        cellRenderer:(props) => { 
        return   <div className="ed-flex"> 
       <BorrowBookModal title='Atualizar ' update='true' get={Hoot()+`eduallsinglelibraryborrowedbook/get/${props.data.id}`}  
        url={Hoot()+`edualllibraryborrowedbookupdate/update/${props.data.id}`}  toggle_btn={  
        <button  className="btn-circle bg-success text-light">
            <Edit/>
        </button>  
        }/> 
        <DeleteModal title='um livro emprestado por um usúario da instituição' url={Hoot()+`edualllibraryborrowedbookdelete/delete/${props.data.id}`} message='empretimo deletado com sucesso' toggle_btn={
            <button   className="btn-circle bg-danger ml-2 text-light">
                <Delete/>
        </button>
        }/>
       </div>  
      }
    } 
  ]; 


 

 
function BorrowBooksTable() {
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
                date:'De ' + item.ed_library_borrowed_book_date + " ate " + item.ed_library_borrowed_book_devolutionDate,  
                book:item.ed_library_borrowed_book_code,
                status:item.ed_library_borrowed_book_status,
                usercode:item.ed_library_borrowed_book_usercode,
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
            TableTitle='Livros emprestados'
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
            TableTitle='Livros emprestados'
            TableBtn={<button className="btn table-btn-small el-refresh-list bg-main-light  ml-2" onClick={loadData}><Refresh /></button>}
        />
    </div>
    )
  } 
     
}

export default BorrowBooksTable