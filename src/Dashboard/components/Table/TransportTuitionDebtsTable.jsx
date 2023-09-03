import React, {useState, useEffect} from 'react'
import Table from './Table';
import axios from 'axios';
import Hoot from '../../../General/components/Hoot';
import { Delete, Description, Edit ,OpenInBrowser } from '@mui/icons-material';
import DeleteModal from '../elements/DeleteModal';
import NewCicleModal from '../modal/NewCicleModal';

const TABLEURL = Hoot()+""

const CicleHead = [
 'Nome do aluno',
 'Turma', 
 'Mês pago',
 'Serviço',
 'Multa',
 'Data de pagamento',  
 'Ação'
];
 


const CicleOptions  = {
  filterType:'checkbox',
  filter:true
}


function TransportTuitionDebtsTable() {
    const [data, setData] = useState([]); 
  
    async function loadData(){
        const response = await axios.get(TABLEURL); 
        setData(response.data);
    };
    
    useEffect(()=>{ 
        loadData(); 
    });
  
    const CicleBody = [];
    data.map((item, index)=>{
        CicleBody.push([ 
            
        ]);
    }); 
  
    return (
      <div>
      <Table
          TableHead={CicleHead}
          TableBody={CicleBody}
          TableOptions={CicleOptions}
          TableTitle='Alunos com divida no transporte'
      />
   </div>
    )
}

export default TransportTuitionDebtsTable