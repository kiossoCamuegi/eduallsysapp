import React, {useState, useEffect} from 'react'
import Table from '../Table';
import axios from 'axios';
import Hoot from '../../../../General/components/Hoot';
import { Delete, Description, Edit ,OpenInBrowser } from '@mui/icons-material';

const TABLEURL = Hoot()+""

const MostSelledProductsHead = [
 'Produto', 
 'Total vendidos',
 'Quantidade no Stock', 
];
 


const MostSelledProductsOptions  = {
  filterType:'checkbox',
  filter:true
}


function MostSelledProducts() {
    const [data, setData] = useState([]); 
  
    async function loadData(){
        const response = await axios.get(TABLEURL); 
        setData(response.data);
    };
    
    useEffect(()=>{ 
        loadData(); 
    });
 
  
    const MostSelledProductsBody = [];
    data.map((item, index)=>{
        //MostSelledProductsBody.push([]);
    }); 
  
    return (
      <div>
      <Table
          TableHead={MostSelledProductsHead}
          TableBody={MostSelledProductsBody}
          TableOptions={MostSelledProductsOptions}
          TableTitle='Produtos mais vendidos'
      />
   </div>
    )
}

export default MostSelledProducts