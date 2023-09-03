import React , {useState, useEffect} from 'react'
import { Avatar } from '@mui/material'; 
import Table from './Table';
import axios from 'axios'; 
import Hoot from '../../../General/components/Hoot';
import { GetStudentName, GetStudentPicture } from '../../../General/components/InstituteData';
import { Link } from 'react-router-dom';
import { Delete, Edit, PreviewOutlined, PrintOutlined, Refresh } from '@mui/icons-material';
import DeleteModal from '../elements/DeleteModal';
import { Badge } from 'react-bootstrap';
import DescriptionWindow from '../modal/DescriptionWindow';
import NewDeclarationRequestModal from '../modal/NewDeclarationRequestModal';
import TableGrid from '../../../General/components/TableGrid';
import SwitchFromPages from '../../../General/components/SwitchFromPages';
import moment from "moment";

const TABLEURL =  [
  Hoot()+"edualldeclarationrequests/get",
  Hoot()+'eduallsinglestudentapi/get/'
]; 
 
const columns = [ 
    { field: 'index', headerName: 'Nº', width: 90 },
    {
      field: 'student',
      headerName: 'Nome do aluno',
      width:300,
      editable: true,
      resizable: true, 
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
      field: 'requestedBy',
      headerName: 'Solicitado por',
      width:170,
      editable: true, 
      resizable: true, 
      cellRenderer:(props)=>{
        let type = props.data.requestedBy*1;
        if(type === 0){
           return <Badge bg='info'>Encarregado</Badge> 
        }else if(type === 1){
          return <Badge bg='warning'>Estudante</Badge> 
        }else{
          return <Badge bg='danger'>Professor</Badge> 
        } 
    }
    }, 
    {
      field: 'type',
      headerName: 'Tipo de declaração',
      width:180,
      sortable:false, 
      resizable: true, 
      cellRenderer:(props)=>{
        return   props.data.type*1 === 1 ? <Badge bg='info'>Com Notas</Badge> : <Badge bg='danger'>Sem Notas</Badge>
    }
    },
    {
      field: 'registerDate',
      headerName: 'Data de solicitação',
      width:170,
      editable: true ,
      resizable: true,
    },
    {
      field: 'status',
      headerName: 'Status',
      width:140,
      resizable: true,
      cellRenderer:(props)=>{
        return  <div className="ed-flex ed-center text-center"> 
         {
           props.data.status === 0 ? 
         <div className="ed-flex">
              <div className="dot-table bg-red"></div>
              <span className="ml-2">Pendente</span>
         </div> : 
          <div className="ed-flex">
             <div className="dot-table bg-green"></div>
             <span className="ml-2">Entregue</span>
          </div>
        }
    </div>
    }
    }, 
    {
      field: 'action',
      headerName: 'Ação', 
      width: 150, 
      sortable:false,
       resizable: true, cellRenderer:(props) => { 
        return  <div className="ed-flex">
        <NewDeclarationRequestModal  title='Atualizar ' update='true' get={Hoot()+`eduallsingledeclarationrequest/get/${props.data.id}`}  
           url={Hoot()+`edualldeclarationrequestupdate/update/${props.data.id}`}  toggle_btn={
           <button  className="btn-circle bg-success text-light">
            <Edit/>
         </button> 
        } />
        <DeleteModal title='esta solicitação' url={Hoot()+`edualldeclarationrequestdelete/delete/${props.data.id}`} 
           message='Solicitação deletada com sucesso' toggle_btn={
           <button  className="btn-circle bg-danger ml-2 text-light">
              <Delete/>
          </button>
        }/> 
      </div>   
      }
    } 
  ];
  

function RequestedDeclarationsTable(props) {
    const [data, setData] = useState([]); 
    const [load, setLoaded] = useState(false);
     
    async function loadData(){
       try {
        setLoaded(false);
         const response = await axios.get(TABLEURL[0]); 
         const rows = [];
         response.data.map((item, index)=>{    
             rows.push({
               index:index+1,
               id:item.ed_declaration_request_id,  
               requestedBy: item.ed_declaration_request_by,
               type:item.ed_declaration_request_with_marks,
               registerDate:moment(item.ed_declaration_request_registerDate).format("YYYY-MM-DD HH:mm:ss"),
               status: item.ed_declaration_request_status,
               student_id:item.ed_student_id,  
               student_name:item.ed_student_name,
               student_picture:item.ed_student_picture ,
               action:'',  
           })  
         })
         setData(rows);
         setTimeout(() => {
           setLoaded(true);
         }, 200);
       } catch (error) {
        setLoaded(true);
       }
    };
    
    useEffect(()=>{ 
      loadData(); 
    },[]);

 
if (load) {
    return (
          <div>
          <TableGrid
              TableHead={columns}
              TableBody={data} 
              TableTitle='Solicitações de declaração'
              TableBtn={<button className="btn table-btn-small el-refresh-list bg-main-light  ml-2" onClick={loadData}><Refresh/></button>}
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
        TableTitle='Solicitações de declaração'
        TableBtn={<button className="btn table-btn-small el-refresh-list bg-main-light  ml-2" onClick={loadData}><Refresh/></button>}
    />
</div>
) 
} 
}

export default RequestedDeclarationsTable
  



    