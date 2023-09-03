import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Delete, Description, Edit , PreviewOutlined, PrintOutlined, Refresh } from '@mui/icons-material';
import Table from './Table';
import Hoot from '../../../General/components/Hoot';
import { GetAcademicYear, GetAcademicLevel, GetClassroom, GetCourse, GetStudentName, GetStudentPicture } from '../../../General/components/InstituteData';

import DeleteModal from '../elements/DeleteModal';
import MUIDataTable from 'mui-datatables';
import { Badge } from 'react-bootstrap';
import NewStudentTransferModal from '../modal/NewStudentTransferModal';
import DescriptionWindow from '../modal/DescriptionWindow';
import { Link } from 'react-router-dom';
import { Switch } from '@mui/material';
import TableGrid from '../../../General/components/TableGrid';
const TABLEURL = Hoot()+"eduallstudenttransferences/get";
 

const TransferredstudentsHead = [  
    'Nome do aluno',
    'Motivo da transferência',
    'Registrado por', 
    'Data de solicitação',
    'Status',
    'Ação'
];


const columns = [ 
  { 
   field: 'index',
   headerName: 'Nº', 
   width: 90 , 
   resizable: true, 
  },
  { 
      field: 'title',
      headerName: 'Ano académico',  
      resizable: true, 
  }, 
   { 
    field: 'start',
    headerName: 'Data de inicialização',  
    resizable: true, 
   },  
   { 
      field: 'end',
      headerName: 'Data de finalização',  
      resizable: true, 
  },
  {
    field: 'action',
    headerName: 'Ação',  
     resizable: true, 
     cellRenderer:(props) => { 
      return  <div className="ed-flex">
      
       <button academic_year_code={props.data.id} className="btn-circle bg-success text-light">
          <Edit/>
      </button>  
      <DeleteModal title='Ano académico' url={Hoot()+`eduallacademicyeardelete/delete/${props.data.id}`} message='Ano académico deletado com sucesso' toggle_btn={
          <button  className="btn-circle bg-danger btn-delete-academic-year ml-2 text-light">
              <Delete/>
          </button>
      }/>
      </div>;
    }
  } 
];

function TransferStudentStatementTable() {
  const [data, setData] = useState([]);
  const [load, setLoaded] = useState(false);

  async function loadData(){
    /* 
    setLoaded(false); 
      const response = await axios.get(TABLEURL); 
        const rows = []; 
        response.data.map((item, index)=>{  
              rows.push({
              index:index+1,
              id:item.ed_academic_year_id,  
              title:item.ed_academic_year_title,  
              start:item.ed_academic_year_startDate, 
              end:item.ed_academic_year_endDate, 
              action:'',  
          }) 
      }); 
      setData(rows);
      setTimeout(() => {
         setLoaded(true); 
      }, 200);
      */
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
          TableTitle='Transferencias de estudantes'
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
          TableTitle='Transferencias de estudantes'
          TableBtn={<button className="btn table-btn-small el-refresh-list bg-main-light  ml-2" onClick={loadData}><Refresh /></button>}
      />
  </div>
  )
}
}

export default TransferStudentStatementTable