import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Delete, Description, Edit , PreviewOutlined, Refresh } from '@mui/icons-material';
import Table from './Table';
import Hoot from '../../../General/components/Hoot';
import { GetAcademicYear, GetAcademicLevel, GetClassroom, GetCourse, GetSubjectAsOption } from '../../../General/components/InstituteData';
import NewClassModal from '../modal/NewClassModal';
import DeleteModal from '../elements/DeleteModal'; 
import TableGrid from '../../../General/components/TableGrid';
const TABLEURL = Hoot()+"eduallclassapi/get/";
const Periods = ["Manha", "Tarde"];
 


const columns = [ 
  { field: 'index', headerName: 'Nº', width: 90,resizable: true },
  {
    field: 'title',
    headerName: 'Turma',
    width:110,
    resizable: true,
  },  
  {
    field: 'course',
    headerName: 'Curso',
    resizable: true, 
    width:230,
    cellRenderer:(props)=>{
      return <GetCourse INDEX='4' ID={props} />
    }
  },
  {
    field: 'period',
    headerName: 'Periodo',
    width:130,
    editable: true 
  },
  {
    field: 'academiclevel',
    headerName: 'Classe',
     resizable: true,
     width:150,
    cellRenderer:(props)=>{
      return <GetAcademicLevel INDEX='6' ID={props} />
    }
  },
  {
    field: 'classroom',
    headerName: 'Nº da Sala',
     resizable: true, 
     width:120,
     cellRenderer:(props)=>{
      return <GetClassroom INDEX='7' ID={props} />
    }
  }, 
  {
    field: 'academicyear',
    headerName: 'Ano letivo',
    resizable: true,
    width:130,
    cellRenderer:(props)=>{
      return <GetAcademicYear INDEX='8' ID={props}  />
    }
  },
  {
    field: 'action',
    headerName: 'Ação', 
    resizable: true,
    cellRenderer:(props) => { 
      return <div className="ed-flex">
          <NewClassModal  title='Atualizar ' update='true' get={Hoot()+`eduallsingleclassapi/get/${props.data.id}`}  
          url={Hoot()+`eduallclassupdate/update/${props.data.id}`}  toggle_btn={
          <button  className="btn-circle bg-success text-light">
              <Edit/>
          </button> 
          } />
          <DeleteModal title='esta turma' url={Hoot()+`eduallclassdelete/delete/${props.data.id}`} 
           message='Turma deletada com sucesso' toggle_btn={
            <button  className="btn-circle bg-danger ml-2 text-light">
               <Delete/>
            </button>
           }/> 
        </div> ;
    }
  } 
];

 

function ClassList(props) {
  const [data, setData] = useState([]); 
  const [load, setLoaded] = useState(false);
   
  async function loadData(){
    setLoaded(false);
      const response = await axios.get(TABLEURL); 
      const rows = [];
      response.data.map((item, index)=>{  
          rows.push({
          index:index+1,
          id:item.ed_class_id,
          title:item.ed_class_title,  
          code:item.ed_class_code,  
          course:item.ed_class_course,
          period:Periods[Math.floor(item.ed_class_period)],
          academiclevel:item.ed_class_academic_level,
          classroom:item.ed_class_room,
          academicyear:item.ed_class_year, 
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
          TableTitle='Lista das turmas'
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
          TableTitle='Lista das turmas'
          TableBtn={<button className="btn table-btn-small el-refresh-list bg-main-light  ml-2" onClick={loadData}><Refresh/></button>}
      />
  </div>
  ) 
 }
}

export default ClassList
 

 