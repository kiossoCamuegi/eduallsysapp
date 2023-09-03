import React, { useEffect, useState } from 'react'
import Table from './Table';  
import axios from 'axios'; 
import Hoot from '../../../General/components/Hoot'; 
import { Badge } from 'react-bootstrap';
import { Refresh } from '@mui/icons-material';
const TABLEURL = Hoot()+"eduallauditoryregisters/get";


const AuditoryHead = [ 
    'Nº',
    'Ação',  
    'Localização',
    'Usúario',
    'Descrição',
    'Data', 
];


const AuditoryOptions = { 
    selection:true
}
 
 
function AuditoryTable() {
  const [data, setData] = useState([]);
  
  async function loadData(){
       
  }

  useEffect(()=>{
      loadData();
  },[]);
 
  return (
  <> 
  <Table
        TableHead={AuditoryHead}
        TableBody={[]} 
        TableOptions={AuditoryOptions}
        TableTitle='Auditoria (controle de ações)'
        TableBtn={<button className="btn table-btn-small el-refresh-list bg-main-light  ml-2" onClick={loadData}><Refresh/></button>}
    />
  </>
  )
}

export default AuditoryTable