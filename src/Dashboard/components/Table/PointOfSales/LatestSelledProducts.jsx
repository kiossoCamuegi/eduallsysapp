import React, {useState, useEffect} from 'react'
import Table from '../Table';
import axios from 'axios';
import Hoot from '../../../../General/components/Hoot';
import { Delete, Description, Edit ,OpenInBrowser } from '@mui/icons-material';

const TABLEURL = Hoot()+""

const LatestSelledProductsHead = [
 'Produto', 
 'Total vendidos', 
 'Data de venda' 
];

const LatestSelledProductsOptions  = {
  filterType:'checkbox',
  filter:true
}


function LatestSelledProducts() {
    const [data, setData] = useState([]); 
  
    async function loadData(){
        const response = await axios.get(TABLEURL); 
        setData(response.data);
    };
    
    useEffect(()=>{ 
        loadData(); 
    });
 
  
    const LatestSelledProductsBody = [];
    data.map((item, index)=>{
        //LatestSelledProductsBody.push([]);
    }); 
  
    return (
      <div>
      <Table
          TableHead={LatestSelledProductsHead}
          TableBody={LatestSelledProductsBody}
          TableOptions={LatestSelledProductsOptions}
          TableTitle='Produtos vendidos recentemente'
      />
   </div>
    )
}

export default LatestSelledProducts