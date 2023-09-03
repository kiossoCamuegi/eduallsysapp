import React, {useState, useEffect} from 'react'
import Table from './Table'
import { Delete, Description, Edit ,OpenInBrowser, PrintOutlined, Refresh } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Hoot from '../../../General/components/Hoot';
import DeleteModal from '../elements/DeleteModal';
import NewTime from '../modal/NewTime';
import TableGrid from '../../../General/components/TableGrid';
import { GetStudentNameAndPicture } from '../../../General/components/InstituteData';
import { Badge } from 'react-bootstrap';
import SwitchFromPages from '../../../General/components/SwitchFromPages';
import { Avatar } from '@mui/material';
import NewStudentTransferModal from '../modal/NewStudentTransferModal';

const TABLEURL = Hoot()+'eduallstudenttransferences/get';
  
 
const columns = [ 
  { 
   field: 'index',
   headerName: 'Nº',
   width:90,  
   resizable: true,
  },
  { 
    field: 'student',
    headerName: 'Nome do estudante',  
    resizable: true,
    width:300,
    cellRenderer:(props)=>{
      return  <SwitchFromPages link={`studentinfo/${props.data.student_id}`}
      menu='3'  menu_item='17'  toggle_btn={ 
        <div className='ed-flex'>
            <Avatar alt={props.data.student_name}   src={props.data.student_picture != ""  ?  Hoot()+props.data.student_picture : ""} /> 
            <span  className='text-dark ml-2'>{props.data.student_name}</span>
        </div>
      }/>
   }
   },
   { 
    field: 'place',
    headerName: 'Local a transferir',  
    resizable: true,
   },  
   { 
    field: 'addmarks',
    headerName: 'Adicionar notas',  
    resizable: true,
    cellRenderer:(props)=>{
      return  Math.floor(props.data.addmarks) === 1 ? 
      <Badge bg='info'><div className="text-dark">Com notas</div></Badge> :
      <Badge bg='danger'><div className="text-dark">Sem notas</div></Badge>
    }
   },  
   { 
    field: 'effect',
    headerName: 'Efeito da transferência',  
    resizable: true,
   },  
  {
    field: 'action',
    headerName: 'Ação',  
     resizable: true,
      cellRenderer:(props) => { 
      return   <div className="ed-flex">
      <NewStudentTransferModal  title='Atualizar ' update='true' get={Hoot()+`eduallsinglestudenttransference/get/${props.data.id}`}  
       url={Hoot()+`eduallstudenttransferenceupdate/update/${props.data.id}`} 
        toggle_btn={
         <button className="btn-circle btn-edit-timing bg-success text-light">
            <Edit/>
          </button> 
        }
      />
     <DeleteModal title='esta transferência' url={Hoot()+`eduallstudenttransferencedelete/${props.data.id}`} 
        message='Transferência deletado com sucesso' toggle_btn={
         <button className="btn-circle btn-delete-timing bg-danger ml-2 text-light">
         <Delete/>
     </button>
        }/> 
       <Link  to={`/student_transfer_reportprint/${props.data.id}`}>
          <button className="btn-circle  bg-primary  ml-2 text-light">
              <PrintOutlined />
          </button>
        </Link>
  </div> ;
    }
  } 
];


function Transferredstudentstable() {
    const [data, setData] = useState([]);
    const [load, setLoaded] = useState(false);
  
    async function loadData(){
     try {
       setLoaded(false); 
       console.clear();
         const response = await axios.get(TABLEURL);
         const rows = []; 
           response.data.map((item, index)=>{  
                rows.push({
                     index:index+1,
                     id:item.ed_student_transference_id,
                     student:item.ed_student_transference_code,
                     place:item.ed_student_transference_to,
                     effect:item.ed_student_transference_reason,
                     addmarks:item.ed_student_transference_with_marks,
                     student_id:item.ed_student_id,  
                     student_name:item.ed_student_name,
                     student_picture:item.ed_student_picture ,
                });
             });  
         setData(rows); 
         setTimeout(() => {
           setLoaded(true); 
         }, 200);
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
            TableTitle='Solicitações de transferência'
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
            TableTitle='Solicitações de transferência'
            TableBtn={<button className="btn table-btn-small el-refresh-list bg-main-light  ml-2" onClick={loadData}><Refresh /></button>}
        />
    </div>
    )
  } 
}

export default Transferredstudentstable