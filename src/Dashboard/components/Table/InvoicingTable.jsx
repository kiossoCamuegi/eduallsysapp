import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Delete, Description, Edit , PreviewOutlined } from '@mui/icons-material';
import Table from './Table';
import Hoot from '../../../General/components/Hoot';
import { GetAcademicYear, GetAcademicLevel, GetFeepaymentsDebts, GetCourse } from '../../../General/components/InstituteData';
import NewClassModal from '../modal/NewClassModal';
import DeleteModal from '../elements/DeleteModal';
import MUIDataTable from 'mui-datatables';
const TABLEURL = Hoot()+"eduallclassapi/get/";
const Periods = ["AM", "PM"];

const FeepaymentsDebtsHead = [  
    'Nome do aluno',
    'Data',
    'Total Liq',
    'Desconto Com',
    'Desconto Fin',  
    'Data de pagamento', 
    'Ação'
];

const FeepaymentsDebtsOptions = {
    filterType: 'checkbox'
}
 

function InvoicingTable() {
    const [data, setData] = useState([]); 
    const [refresh, setRefresh] = useState(true);
    
    const FeepaymentsDebtsActions = [{
      icon:'delete',
      tooltip:'Delete all selected rows',
       onClick:()=>console.log("selected some itens")
    }]
  
    async function loadData(){
        const response = await axios.get(TABLEURL); 
        setData(response.data);
    };
    
    useEffect(()=>{ 
      refresh ===  true ? loadData() : console.log("Error");
    });
  
    const FeepaymentsDebtsBody = [];
    data.map((item, index)=>{
        // FeepaymentsDebtsBody.push([]);
    }); 

   return (
     <MUIDataTable
        title='Listagem faturação'
        data={FeepaymentsDebtsBody}
        columns={FeepaymentsDebtsHead}
        options={FeepaymentsDebtsOptions}
        actions={FeepaymentsDebtsActions}
        onSelectionChange={(rows)=>console.log(rows)}
    /> 
    )
}

export default InvoicingTable