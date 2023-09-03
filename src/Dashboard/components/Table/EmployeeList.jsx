import React , {useState, useEffect} from 'react'
import { Avatar } from '@mui/material'; 
import { Link } from 'react-router-dom'; 
import axios from 'axios';
import { Delete, Description, Edit, PreviewOutlined, Refresh} from '@mui/icons-material';
import Hoot from '../../../General/components/Hoot'; 
import DeleteModal from '../elements/DeleteModal';
import TableGrid from '../../../General/components/TableGrid';
import { Badge } from 'react-bootstrap';
import SwitchFromPages from '../../../General/components/SwitchFromPages';
import { GetJobTitle } from '../../../General/components/InstituteData';
const TABLEURL = Hoot()+"eduallemployeesget/get/";

const Genders = ["Masculino", "Femenino"];



const columns = [ 
  { field: 'index',
   headerName: 'Nº',  
   width:90,
   resizable: true, 
  },
  {
    field: 'name',
    headerName: 'Nome do funcionário', 
    resizable: true, 
    minWidth:300,
    cellRenderer:(props)=>{
       return    <SwitchFromPages link={`employeeinfo/${props.data.id}`}
       menu='3'  menu_item='17'  toggle_btn={
       <div className='ed-flex'>
         <Avatar alt={props.data.name}   src={props.data.picture != ""  ?  Hoot()+props.data.picture : ""} /> 
         <span className='ml-2'>{props.data.name}</span>
       </div>
     } />
    }
  }, 
  {
    field: 'gender',
    headerName: 'Genero',
    resizable: true, 
    cellRenderer:(props)=>{
      return <>{props.data.gender === 'male' ? <Badge bg='success'>Masculino</Badge> : <Badge bg='danger'>Femenino</Badge> }</>
    }
  },
  {
    field: 'charge',
    headerName: 'Cargo',
    sortable:false, 
    cellRenderer:(props)=>{
      return <GetJobTitle ID={props.data.charge} />
    }
  },
  {
    field: 'status',
    headerName: 'Status',
     resizable: true, cellRenderer:(props)=>{
      return  Math.floor(props.data.status) === 1 ? 
      <Badge bg='info'><div className="text-dark">Activo</div></Badge> :
      <Badge bg='danger'><div className="text-dark">Inactivo</div></Badge>
    }
  }, 
  {
    field: 'action',
    headerName: 'Ação', 
     resizable: true, 
     cellRenderer:(props) => { 
      return <div className="ed-flex">
          <Link to={`/updateemployee/${props.data.id}`}>
             <button  className="btn-circle bg-success text-light">
                <Edit/>
            </button>  
          </Link>
          <Link to="#">
             <button student-code={props.data.id} className="btn-circle bg-warning ml-2 text-light">
                <PreviewOutlined />
            </button>
          </Link>
          <DeleteModal title='este funcionario' url={Hoot()+`eduallemployeedelete/delete/${props.data.id}`} 
           message='Estudante deletado com sucesso' toggle_btn={
            <button  className="btn-circle bg-danger ml-2 text-light">
               <Delete/>
            </button>
           }/> 
        </div> ;
    }
  } 
];



function EmployeeList() {
    const [data, setData] = useState([]);
    const [load, setLoaded] = useState(false);
  
    async function loadData(){
        setLoaded(false); 
        const response = await axios.get(TABLEURL); 
          const rows = []; 
          response.data.map((item, index)=>{  
                rows.push({
                index:index+1,
                id:item.ed_employee_id,
                name:item.ed_employee_name,
                picture:item.ed_employee_picture,
                status:item.ed_employee_status,
                charge:item.ed_employee_charge,
               gender:item.ed_employee_gender 
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
            TableTitle='Lista dos funcionarios'
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
            TableBody={data} 
            TableTitle='Lista dos funcionarios'
            TableBtn={<button className="btn table-btn-small el-refresh-list bg-main-light  ml-2" onClick={loadData}><Refresh /></button>}
        />
    </div>
    )
  }
}

export default EmployeeList