import React, {useState, useEffect} from 'react'
import Table from './Table';
import axios from 'axios';
import Hoot from '../../../General/components/Hoot';
import { Delete, Description, Edit ,OpenInBrowser, Refresh } from '@mui/icons-material';

const TABLEURL = Hoot()+"eduallcoinsapi/get/"

const CoinsHead = [
 'Nº',
 'Moeda', 
 'Valor em dolar',
 'Valor em euros',
 'Valor de cambio',
 'Imposto',
 'Valor de imposto',
 'Iva',  
 'Ação'
];
 


const CoinsOptions  = {
  filterType:'checkbox',
  filter:true
}

function CoinsTable() {
    const [data, setData] = useState([]); 
  
    async function loadData(){
        const response = await axios.get(TABLEURL); 
        setData(response.data);
    };
    
    useEffect(()=>{ 
        loadData(); 
    });
 
  
    const CoinsBody = [];
    data.map((item, index)=>{
        CoinsBody.push([ 
          index+1,
          item.ed_coin_title, 
          item.ed_coin_value_in_dollar,
          item.ed_coin_value_in_euro,
          item.ed_coin_exchange_value,
          item.ed_coin_tax,
          item.ed_coin_tax_value,
          item.ed_coin_iva, 
          <div className="ed-flex">
          <button coins_code={item.ed_coin_id} className="btn-circle btn-edit-Coins bg-success text-light">
              <Edit/>
          </button> 
          <button Coins_code={item.ed_coin_id} className="btn-circle btn-delete-Coins bg-danger ml-2 text-light">
              <Delete/>
          </button>
          </div>
      ]);
    }); 
  
    return (
      <div>
      <Table
          TableHead={CoinsHead}
          TableBody={CoinsBody}
          TableOptions={CoinsOptions}
          TableTitle='Moedas'
          TableBtn={<button className="btn table-btn-small el-refresh-list bg-main-light  ml-2" onClick={loadData}><Refresh /></button>}
      />
   </div>
    )
}

export default CoinsTable