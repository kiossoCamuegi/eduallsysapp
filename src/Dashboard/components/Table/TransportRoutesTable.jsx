import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Delete, Description, Edit , PreviewOutlined } from '@mui/icons-material';
import Table from './Table';
import Hoot from '../../../General/components/Hoot';
import { GetAcademicYear, GetAcademicLevel, GetClassroom, GetCourse, GetVehicleModel } from '../../../General/components/InstituteData';
import NewClassModal from '../modal/NewClassModal';
import DeleteModal from '../elements/DeleteModal'; 
const TABLEURL = Hoot()+"edualltransportroutesget/get/";

 

const TransportHead = [ 
    'Nº',
    'Nome da rota',
    'Veiculo',
    'Ação'
];

 


const TransportOptions = {
    filterType : 'checkbox' 
}

function TransportRoutesTable() {
    const [data, setData] = useState([]); 
    const [refresh, setRefresh] = useState(true);
     

    async function loadData(){
        const response = await axios.get(TABLEURL); 
        setData(response.data);
    };
    
    useEffect(()=>{ 
      refresh ===  true ? loadData() : console.log("Error");
    });
  
    const TransportBody = [];
    data.map((item, index)=>{
        TransportBody.push([ 
           index+1,
          item.ed_transport_route_name, 
          <GetVehicleModel ID={item.ed_transport_route_vehicle} /> , 
          <div className="ed-flex">
            <NewClassModal  title='Atualizar ' update='true' get={Hoot()+`edualltransportsinglerouteget/get/${item.ed_transport_route_id}`}  
            url={Hoot()+`eduallclassupdateapi/update/${item.ed_transport_route_id}`}  toggle_btn={
            <button  className="btn-circle bg-success text-light">
                <Edit/>
            </button> 
            } />
             <button  className="btn-circle bg-warning ml-2 text-light">
                <PreviewOutlined/>
            </button>
            <DeleteModal title='esta rota' url={Hoot()+`edualltransportroutedelete/delete/${item.ed_transport_route_id}`} 
             message='Rota deletada com sucesso' toggle_btn={
              <button  className="btn-circle bg-danger ml-2 text-light">
                 <Delete/>
              </button>
             }/> 
          </div>
      ]);
    }); 

  return (
      <div>
          <Table
                TableBody={TransportBody}
                TableHead={TransportHead}
                TableOptions={TransportOptions}
                TableTitle='Lista das rotas'
            />
      </div>
    
  )
}

export default TransportRoutesTable