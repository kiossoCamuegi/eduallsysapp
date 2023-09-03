import React, { useEffect, useState } from 'react'
import Table from './Table';  
import axios from 'axios';
import { Delete,  Edit, Refresh} from '@mui/icons-material';
 import Hoot from '../../../General/components/Hoot';
import DeleteModal from '../elements/DeleteModal';
import NewDeclarationModal from '../modal/NewDeclarationModal';
import { GetStudentName, GetStudentNameAndPicture, GetStudentPicture } from '../../../General/components/InstituteData';
import { Link } from 'react-router-dom';
import Switch from '@mui/material/Switch';
import { PrintOutlined } from '@material-ui/icons';
import TableGrid from '../../../General/components/TableGrid';
import { Badge } from 'react-bootstrap';
const TABLEURL = Hoot()+"edualldeclarations/get/";


 
const columns = [ 
    { 
     field: 'index',
     headerName: 'Nº',  
     resizable: true,
     width:90,
    }, 
    { 
      field: 'student',
      headerName: 'Nome do estudante',  
      resizable: true,
      cellRenderer:(props)=>{
        return <GetStudentNameAndPicture size='40' ID={props.data.student} />
      }
     },
     { 
        field: 'effect',
        headerName: 'Efeito',  
        resizable: true,
     }, 
     { 
        field: 'type',
        headerName: 'Tipo de declaração',  
        resizable: true,
        cellRenderer:(props)=>{
            return  Math.floor(props.data.type) === 1 ? 
            <Badge bg='info'><div className="text-dark">Com notas</div></Badge> :
            <Badge bg='danger'><div className="text-dark">Sem notas</div></Badge>
          }
     }, 
    {
      field: 'action',
      headerName: 'Ação',  
       resizable: true,
       width:220,
       cellRenderer:(props) => { 
        return  <div className="ed-flex">
            <NewDeclarationModal title='Atualizar ' update  get={Hoot()+`eduallgetsingledeclaration/get/${props.data.id}`}  
            url={Hoot()+`edualldeclarationupdate/update/${props.data.id}`}  toggle_btn={
            <button  className="btn-circle  bg-success text-light">
            <Edit/>
            </button>} /> ,
            <Link to={`/declarationwithmarksprint/${props.data.id}`} >
                <button className="btn-circle btn-bordered bg-primary ml-2 "><PrintOutlined /></button>
            </Link>,
        <DeleteModal title='esta declaração' url={Hoot()+`edualldeclarationdelete/delete/${props.data.id}`} message='Declaração deletada com sucesso' toggle_btn={ 
        <button  className="btn-circle bg-danger ml-2 text-light">
            <Delete/>
        </button>} />
        </div>;
      }
    } 
];


function DeclarationsTable() {
    const [data, setData] = useState([]);
    const [load, setLoaded] = useState(false);
  
    async function loadData(){
       try {
        setLoaded(false);
        const response = await axios.get(TABLEURL); 
        const rows = []; 
        response.data.map((item, index)=>{  
          rows.push({
            index:index+1, 
            id:item.ed_declaration_id,
            student:item.ed_declaration_student_code,
            effect:item.ed_declaration_effect,
            type:item.ed_declaration_with_marks,
            action:'',  
          }) 
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
            TableTitle='Solicitações de declaração'
            TableBtn={<button className="btn table-btn-small el-refresh-list bg-main-light  ml-2" onClick={loadData}><Refresh /></button>}
        />
    </div>
    )
  }else{
    return (
      <div> 
        <><div className="d-none">*</div>
        <TableGrid
            TableHead={columns}
            TableBody={[]} 
            TableTitle='Solicitações de declaração'
            TableBtn={<button className="btn table-btn-small el-refresh-list bg-main-light  ml-2" onClick={loadData}><Refresh /></button>}
        />
        </>
    </div>
    )
  } 
}

export default DeclarationsTable