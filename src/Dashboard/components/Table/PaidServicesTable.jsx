import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { Delete, Description, Edit , PreviewOutlined, PrintOutlined } from '@mui/icons-material';
import Table from './Table';
import Hoot from '../../../General/components/Hoot';
import NewClassRoomModal from '../modal/NewClassRoomModal';
import DeleteModal from '../elements/DeleteModal';
import { GetServiceTitle } from '../../../General/components/InstituteData';

const TABLEURL = Hoot()+"eduallservicepaymentsapi/get";
const ServicesHead = [  
    'Nº',
    'Nome do aluno',
    'Serviço',
    'Preço',
    'Quantidade',
    'Multa', 
    'Desconto',
    'Total',
    'Mês',
    'Ação'
];

 

const ServicesOptions = {
    filterType: 'checkbox'
}



function PaidServicesTable() {
    
  const [data, setData] = useState([]); 
  async function loadData(){
      const response = await axios.get(TABLEURL); 
      setData(response.data);
  };
  
  useEffect(()=>{ 
      loadData(); 
  });

  const ServicesBody = [];
  data.map((item, index)=>{
      ServicesBody.push([  
        '1','Pedro  Mateus Carlito',
        <GetServiceTitle ID='' /> ,
        '17.000.00 Kz','2',
        '0.00 Kz', '0.00 Kz','34.000.00 Kz','Janeiro',
        <div className="ed-flex">
        <Link className="btn-circle bg-success text-light">
            <Edit/>
        </Link>
         <Link to='/' className="btn-circle bg-warning ml-2 text-light">
            <PrintOutlined/>
        </Link>
         <DeleteModal title='esta Sala' url={Hoot()+`eduallclassroomdelete/delete/${item.ed_classroom_id}`} message='Sala deletada com sucesso' toggle_btn={
            <button classroom_code={item.ed_classroom_id} className="btn-circle bg-danger ml-2 text-light">
                <Delete/>
           </button>
         }/>
        </div>
    ]);
  }); 
    return (
        <Table
          TableHead={ServicesHead}
          TableBody={ServicesBody}
          TableOptions={ServicesOptions}
          TableTitle="Serviços Pagos"
        />
    )
}

export default PaidServicesTable