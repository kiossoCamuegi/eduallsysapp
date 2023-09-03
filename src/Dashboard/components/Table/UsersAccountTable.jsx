
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Delete, Description, Edit , Logout, PreviewOutlined, Refresh } from '@mui/icons-material';
import Table from './Table';
import Hoot from '../../../General/components/Hoot'; 
import DeleteModal from '../elements/DeleteModal';
import MUIDataTable from 'mui-datatables';
import jwtDecode from 'jwt-decode';
import { useHistory } from 'react-router-dom'; 
//import { EduallDataCheck } from '../../../General/components/EduallDataCheck';
import TableGrid from '../../../General/components/TableGrid';
import { Badge } from 'react-bootstrap';
import EditUserModal from '../modal/EditUserModal';
import SwitchFromPages from '../../../General/components/SwitchFromPages';
import { Avatar } from '@mui/material';
import { GetJobTitle } from '../../../General/components/InstituteData';
const TABLEURL = Hoot()+'eduallinstituteuseraccountsget/get';

const AccountsType = ["Admnistrador", "Professor", "Estudante", "Secretário", "Pedagógico", "Financeiro", "Encarregado"]; 
const AccountsColor = ["warning", "info", "danger", "primary", "secondary", "info", "dark"];
 
const columns = [ 
    { 
     field: 'index',
     headerName: 'Nº',
     width:90,  
     resizable: true,
    }, 
    { 
      field: 'username',
      headerName: 'Nome de usúario',
      width:190,  
      resizable: true,
     }, 
     { 
      field: 'name',
      headerName: 'Nome',  
      resizable: true,
      cellRenderer:(props)=>{
        return    <SwitchFromPages link={`employeeinfo/${props.data.id}`}
        menu='3'  menu_item='17'  toggle_btn={
        <div className='ed-flex'>
          <Avatar alt={props.data.name}   src={props.data.picture !== ""  ?  Hoot()+props.data.picture : ""} /> 
          <span className='ml-2'>{props.data.name}</span>
        </div>
      } />
      }
     },  
     { 
        field: 'email',
        headerName: 'Email',  
        resizable: true,
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
        headerName: 'Estado',  
        width:120,
        resizable: true,
        cellRenderer:(props)=>{
            return   props.data.status === 1 ? 
            <Badge bg='info'><div className="text-dark">Activo</div></Badge> :
            <Badge bg='danger'><div className="text-dark">Inactivo</div></Badge>
          }
    },  
    {
      field: 'action',
      headerName: 'Ação',  
       resizable: true,
        cellRenderer:(props) => { 
        return   <div className="ed-flex"> 
        <EditUserModal title='Atualizar ' update='true' get={Hoot()+`eduallsingleuserdata/get/${props.data.id}`}  
          url={Hoot()+`edualluseraccountupdate/update/${props.data.id}`}  toggle_btn={
            <button className="btn-circle btn-edit-timing bg-success text-light">
               <Edit/>
          </button> 
        }/>
       <DeleteModal title='este usúario' url={Hoot()+`edualluseraccountdelete/delete/${props.data.id}`} 
          message='Usúario deletado com sucesso' toggle_btn={
           <button className="btn-circle btn-delete-timing bg-danger ml-2 text-light">
           <Delete />
       </button>
          }/> 
    </div> ;
      }
    } 
]; 

function UsersAccountTable() { 
    const [data, setData] = useState([]);
    const [load, setLoaded] = useState(false);
  
    async function loadData(){
      setLoaded(false);
        const response = await axios.get(TABLEURL); 
        const rows = []; 
        response.data.map((item, index)=>{  
            rows.push({
                id:item.ed_system_account_id,
                username:item.ed_system_account_name,
                name:item.ed_employee_name, 
                index:index+1,
                picture:item.ed_employee_picture,
                email:item.ed_employee_email, 
                charge:item.ed_employee_charge,
                status:item.ed_system_account_status*1
            });
        }); 
        console.log(rows)
        setData(rows); 
       setTimeout(() => {
          setLoaded(true); 
       }, 200);  
    }
  
    useEffect(()=>{
      loadData(); 
    },[]);
  
 
 
 
return (
     <div> 
     {load ? 
      <><></>
        <TableGrid
            TableHead={columns}
            TableBody={data} 
            TableTitle='Contas de usúarios da instituição'
            TableBtn={<button className="btn table-btn-small el-refresh-list bg-main-light  ml-2" onClick={loadData}><Refresh /></button>}
        />
      </> 
       : <> 
        <TableGrid
            TableHead={columns}
            TableBody={[]} 
            TableTitle='Contas de usúarios da instituição'
            TableBtn={<button className="btn table-btn-small el-refresh-list bg-main-light  ml-2" onClick={loadData}><Refresh /></button>}
        /> 
       </> 
      }
     </div>
  );
 

  
}

export default UsersAccountTable

