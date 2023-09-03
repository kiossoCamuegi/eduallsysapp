import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Delete, Description, Edit , PreviewOutlined } from '@mui/icons-material';
import Table from './Table';
import Hoot from '../../../General/components/Hoot'; 
import NewFinePriceModal from '../modal/NewFinePriceModal';
import DeleteModal from '../elements/DeleteModal';
import MUIDataTable from 'mui-datatables';
const TABLEURL = Hoot()+"";
const Periods = ["AM", "PM"];

const FineHead = [ 
    'Nº',
    'Serviço',  
    'Tipo de multa',
    'Do dia',
    'Até o dia',
    'Valor da multa',  
    'Ação'
];


const FineOptions = {
    //filterType: 'checkbox',
    selection:true
}
 

function FinePricesTable() {
    const [data, setData] = useState([]); 
    const [refresh, setRefresh] = useState(true);
  
    async function loadData(){
        const response = await axios.get(TABLEURL); 
        setData(response.data);
    };
    
    useEffect(()=>{ 
      refresh ===  true ? loadData() : console.log("Error");
    });
  
    const FineBody = [];
    data.map((item, index)=>{
        FineBody.push([]);
    }); 
  
    return (
      <MUIDataTable
      title='Multas dos serviços'
      data={FineBody}
      columns={FineHead}
      options={FineOptions} 
      onSelectionChange={(rows)=>console.log(rows)}
  /> 
    )
}

export default FinePricesTable