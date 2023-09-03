import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Delete, Description, Edit , PreviewOutlined, Refresh } from '@mui/icons-material';
import Table from './Table';
import Hoot from '../../../General/components/Hoot'; 
const TABLEURL = Hoot()+"";
let Status = ["Activo", "Inactivo"];

const AnuallEnrollmentOperatorHead = [ 
    'Nome',
    'Nome do aluno',  
    'Turma',
    'Tipo de operação', 
    'Data da operação'
];


const AnuallEnrollmentOperatorOptions = {
    //filterType: 'checkbox',
    selection:true
}

function AnuallEnrollmentOperatorsTable() {
    const [data, setData] = useState([]); 
  const [refresh, setRefresh] = useState(true);
   
  async function loadData(){
      {/*const response = await axios.get(TABLEURL); 
  setData(response.data);*/}
  };
  
  useEffect(()=>{ 
       
  });

  const AnuallEnrollmentOperatorBody = [];
  data.map((item, index)=>{
     // AnuallEnrollmentOperatorBody.push([]);

  }); 

  return ( 
    <Table
        TableHead={AnuallEnrollmentOperatorHead}
        TableBody={AnuallEnrollmentOperatorBody}
        TableOptions={AnuallEnrollmentOperatorOptions}
        TableTitle='Operadores de matriculas e confirmações'
        TableBtn={<button className="btn table-btn-small el-refresh-list bg-main-light  ml-2" onClick={loadData}><Refresh/></button>}
    /> 
  )
}

export default AnuallEnrollmentOperatorsTable