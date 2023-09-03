import React, { useEffect, useState } from 'react'
import Table from './Table';  
import axios from 'axios';
import { Delete,  Edit, PreviewOutlined} from '@mui/icons-material';
import Hoot from '../../../General/components/Hoot';
import DeleteModal from '../elements/DeleteModal';
import NewMaintenenceModal from '../modal/NewMaintenenceModal';
import { GetVehicleModel } from '../../../General/components/InstituteData';
const TABLEURL = Hoot()+"edualltransportmaintenanceget/get/";


const MaintenanceHead = [ 
    'Nº',
    'Viatura',   
    'Data de registro',
    'Ação'
];
 
const MaintenanceOptions = {
    filterType: 'checkbox'
}



function MaintenanceTable() {
    const [data, setData] = useState([]);
  
    async function loadData(){
        const response = await axios.get(TABLEURL);
        setData(response.data);
    }
  
    useEffect(()=>{
        loadData();
    });
  
    const MaintenanceBody = [];
    data.map((item, index)=>{
        if(item != null){
          MaintenanceBody.push([
               index+1,
               <GetVehicleModel ID={item.ed_transport_maintenance_vehicle} />,
               item.ed_transport_maintenance_registerDate,
               <div className="ed-flex">
               <NewMaintenenceModal  title='Atualizar ' update='true' get={Hoot()+`edualltransportsinglemaintenanceget/get/${item.ed_transport_maintenance_id}`}  
               url={Hoot()+`eduallclassupdateapi/update/${item.ed_transport_maintenance_id}`}  toggle_btn={
               <button  className="btn-circle bg-success text-light">
                   <Edit/>
               </button> 
               } />
                <button className="btn-circle bg-warning ml-2 text-light">
                    <PreviewOutlined/>
                </button>
               <DeleteModal title='esta manutenção' url={Hoot()+`edualltransportmaintenancedelete/delete/${item.ed_transport_maintenance_id}`} 
                message='Manuetnção  deletada com sucesso' toggle_btn={
                 <button  className="btn-circle bg-danger ml-2 text-light">
                    <Delete/>
                 </button>
                }/> 
             </div>
           ]);
        }
    });
  
    return (
      <Table
          TableHead={MaintenanceHead}
          TableBody={MaintenanceBody}
          TableOptions={MaintenanceOptions}
          TableTitle='Viaturas para manutenção'
      />
      )
}

export default MaintenanceTable