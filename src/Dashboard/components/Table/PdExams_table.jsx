import React, { useEffect, useState } from 'react'
import Table from './Table';  
import axios from 'axios';
import { Delete,  Edit, Refresh} from '@mui/icons-material'; 
import Hoot from '../../../General/components/Hoot';
import DeleteModal from '../elements/DeleteModal';
import NewCourseModal from '../modal/NewCourseModal';
import TableGrid from '../../../General/components/TableGrid';
import NewExamModal from '../modal/Pedagogy/NewExamModal';
import { GetTime } from '../../../General/components/InstituteData';
import moment from 'moment';
const TABLEURL = Hoot()+"eduallstudentexamcalendarget/get/"; 
 let Categories = ["", "Designer", "Arte", "Engenharia", "Saude", "Ciências"] ; 

const columns = [ 
    { 
     field: 'index',
     headerName: 'Nº',  
     resizable: true,
     width:90,
    }, 
    { 
      field: 'subject',
      headerName: 'Disciplina',  
      resizable: true,
      width:300,
     },
     { 
        field: 'class',
        headerName: 'Turma',  
        resizable: true,
     }, 
     { 
        field: 'date',
        headerName: 'Data & Hora',  
        resizable: true,
     },  
    {
      field: 'action',
      headerName: 'Ação',  
       resizable: true, 
       cellRenderer:(props) => { 
        return  <div className="ed-flex">
            <NewExamModal title='Atualizar calendário de prova' update='true' get={Hoot()+`eduallstudentexamcalendargetsingle/get/${props.data.id}`}  
            url={Hoot()+`eduallstudentexamcalendarupdate/update/${props.data.id}`}  toggle_btn={
               <button   className="btn-circle bg-success text-light">
            <Edit/>
            </button>} /> 
        <DeleteModal title='este evento' url={Hoot()+`eduallstudentexamcalendardelete/delete/${props.data.id}`} message='Evento deletado com sucesso' toggle_btn={ 
        <button  className="btn-circle bg-danger ml-2 text-light">
            <Delete/>
        </button>} />
        </div>;
      }
    } 
];
  

function PdExams_table() {  
    const [data, setData] = useState([]);
    const [load, setLoaded] = useState(false);
  
    async function loadData(){
      setLoaded(false);
        try {
            const response = await axios.get(TABLEURL); 
            const rows = []; 
            response.data.map((item, index)=>{  
              rows.push({
              index:index+1,
              id:item.ed_student_exam_id,  
              subject:item.ed_subject_title,
              class:item.ed_class_title,
              date:moment(item.ed_student_exam_date).format("YYYY-MM-DD HH:mm:ss"), 
              action:'',  
              }) 
            }); 
            setData(rows); 
           setTimeout(() => {
              setLoaded(true);
           }, 100);  
        } catch (error) {
            
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
            TableTitle='Calendário de provas'
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
            TableTitle='Calendário de provas'
            TableBtn={<button className="btn table-btn-small el-refresh-list bg-main-light  ml-2" onClick={loadData}><Refresh /></button>}
        />
        </>
    </div>
    )
  }
}

export default PdExams_table;