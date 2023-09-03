import React, {useState, useEffect} from 'react'
import Table from './Table';
import { Delete,  Edit, VisibilityOutlined } from '@mui/icons-material';
import  axios  from 'axios';
import Hoot from '../../../General/components/Hoot';
import DeleteModal from '../elements/DeleteModal';
import NewServiceModal from '../modal/NewServiceModal';
import { GetProviderName } from '../../../General/components/InstituteData';
const TABLEURL = Hoot()+'edualldriversapi/get/';

const driversHead = [
    'Nº do bilhete de identificação',
    'Nome',
    'Tipo de fornecedor',
    'Representante',
    'Endereço',
    'Bairro',
    'Telefone', 
    'Ação'
];

const driversOptions = {
    filterType: 'checkbox'
}


function DriversTable() {    
    const [data, setData] = useState([]);  
    async function loadData(){
        const response = await axios.get(TABLEURL); 
        setData(response.data);
    };
    
    useEffect(()=>{loadData();});
   
  const driversBody = [];
  data.map((item, index)=>{  
    driversBody.push([

    ]); 
  });
  
    return (
      <Table
        TableHead={driversHead}
        TableBody={driversBody}
        TableOptions={driversOptions}
        TableTitle="Motoristas"
      />
    )
}

export default DriversTable