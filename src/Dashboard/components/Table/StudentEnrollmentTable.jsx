import React , {useState, useEffect} from 'react'
import { Avatar } from '@mui/material'; 
import Table from './Table';
import axios from 'axios'; 
import Hoot from '../../../General/components/Hoot';
import { GetAcademicYear_byclass, GetClasstitle_byclass, GetServiceWithPrice, GetServiceTitle, GetStudentName, GetStudentPicture } from '../../../General/components/InstituteData';
import { CheckCircleOutline } from '@material-ui/icons'; 
import NewEnrollmentConfirmationModal from '../modal/NewEnrollmentConfirmationModal';
import { Link } from 'react-router-dom';
import { Delete, Edit, PrintOutlined, Refresh } from '@mui/icons-material';
import DeleteModal from '../elements/DeleteModal';
import SwitchFromPages from '../../../General/components/SwitchFromPages';
import { flexbox } from '@mui/system';
import TableGrid from '../../../General/components/TableGrid';
import moment from 'moment';
const TABLEURL = Hoot()+"eduallstudentenrollments/get/";
 

const columns = [ 
    {field: 'index', headerName: 'Nº', width:90}, 
    {
      field: 'name',
      headerName: 'Nome',  
      resizable: true, 
      cellRenderer:(props)=>{
        return    <SwitchFromPages link={`studentinfo/${props.data.id}`}
        menu='3'  menu_item='17'  toggle_btn={
        <div className='ed-flex'>
          <Avatar alt={props.data.name}   src={props.data.picture != ""  ?  Hoot()+props.data.picture : ""} /> 
          <span className='ml-2'>{props.data.name}</span>
        </div>
      } />
     }
    }, 
    {
      field: 'class',
      headerName: 'Turma',
       resizable: true, 
       width:120,
       cellRenderer:(props)=>{
        return  <GetClasstitle_byclass INDEX='3'  ID={props.data.class}/>
      }
    }, 
    {
      field: 'academicyear',
      headerName: 'Ano académico',
      resizable: true, 
      width:160,
       cellRenderer:(props)=>{
        return   <GetAcademicYear_byclass INDEX='3'  ID={props.data.class}/>
      }
    },
    {
        field: 'servicecode',
        headerName: 'Serviço (Valor da matrícula)',
         resizable: true,
         width:200,
          cellRenderer:(props)=>{
          return <GetServiceWithPrice INDEX='4'  ID={props.data.service}/> 
        }
      },  
      {
        field: 'date',
        headerName: 'Data de registro',
        resizable: true, 
      },
    {
      field: 'action',
      headerName: 'Ação',
       resizable: true,
        cellRenderer:(props) => { 
        return  <div className="ed-flex">
        <NewEnrollmentConfirmationModal title='Atualizar ' confirmation studentCode={props.data.id} toggle_btn={
        <button  className="btn-circle  bg-success text-light">
           <Edit />
        </button>} /> 
       <DeleteModal fullmessage title='Deseja cancelar esta confirmação de matrícula' url={Hoot()+`eduallenrollmentconfirmationcancel/put/${props.data.id}`} 
       message='Confirmação de matrícula deletada com sucesso' toggle_btn={ 
       <button  className="btn-circle bg-danger ml-2 text-light">
           <Delete />
       </button>} />
       <Link to={`/print_student_enrollment/${props.data.id}`}>
           <button className="btn bg-warning btn-circle ml-2"><PrintOutlined/></button>
       </Link>
       </div>;
      }
    } 
  ];
  



function StudentEnrollmentTable () { 
    const [data, setData] = useState([]); 
    const [load, setLoaded] = useState(false);
     
    async function loadData(){
      setLoaded(false);
        const response = await axios.get(TABLEURL);  
        const rows = [];
        response.data.map((item, index)=>{    
            rows.push({ 
                index:index+1,
                id:item.ed_student_id,
                picture:item.ed_student_picture,
                name:item.ed_student_name,   
                class:item.ed_enrollment_class,   
                service:item.ed_enrollment_service,   
                date:moment(item.ed_enrollment_registerDate).format("YYYY-MM-DD HH:mm:ss"), 
                action:'',  
            }) 
      }); 
     setData(rows);
    setTimeout(() => {
       setLoaded(true);
    }, 200);
    };
    
    useEffect(()=>{ 
      loadData(); 
    },[]);
    
   
  if(load){
    return (
      <div>
        <TableGrid
            TableHead={columns}
            TableBody={data} 
            TableTitle='Matrículas'
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
            TableTitle='Matrículas'
            TableBtn={<button className="btn table-btn-small el-refresh-list bg-main-light  ml-2" onClick={loadData}><Refresh/></button>}
        />
    </div>
    )  
  }

}

export default StudentEnrollmentTable 


 