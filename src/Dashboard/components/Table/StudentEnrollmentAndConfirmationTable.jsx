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

const TABLEURL = Hoot()+"eduallstudentsapi/get/";
 

const columns = [ 
    {field: 'id',
     headerName: 'Nº de matrícula',
     width:180,
     resizable: true, 
    }, 
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
       cellRenderer:(props)=>{
        return  <GetClasstitle_byclass INDEX='3'  ID={props}/>
      }
    }, 
    {
      field: 'academicyear',
      headerName: 'Ano académico',
      resizable: true, 
       cellRenderer:(props)=>{
        return   <GetAcademicYear_byclass INDEX='3'  ID={props}/>
      }
    },
    {
        field: 'servicecode',
        headerName: 'Serviço (Valor para confirmação)',
         resizable: true,
          cellRenderer:(props)=>{
          return <GetServiceWithPrice INDEX='4'  ID={props}/> 
        }
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
       <DeleteModal fullmessage title='Deseja cancelar esta matrícula' url={Hoot()+`eduallenrollmentconfirmationcancel/put/${props.data.id}`} 
       message='Matrícula deletada com sucesso' toggle_btn={ 
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
  



function StudentEnrollmentAndConfirmationTable() { 
    const [data, setData] = useState([]); 
    const [load, setLoaded] = useState(false);
     
    async function loadData(){
      setLoaded(false);
        const response = await axios.get(TABLEURL);  
        const rows = [];
        response.data.map((item, index)=>{   
          if(item.ed_student_enrolled > 1){
              rows.push({ 
                  id:item.ed_student_id,
                  picture:item.ed_student_picture,
                  name:item.ed_student_name,   
                  class:item.ed_student_class,   
                  service:item.ed_student_enrolledConfirmation_service,    
                  action:'',  
              }) 
          }
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
            TableTitle='Matrículas Confirmadas'
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
            TableTitle='Matrículas Confirmadas'
            TableBtn={<button className="btn table-btn-small el-refresh-list bg-main-light  ml-2" onClick={loadData}><Refresh/></button>}
        />
    </div>
    )  
  }

}

export default StudentEnrollmentAndConfirmationTable
          


