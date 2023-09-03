import React, { useEffect, useState } from 'react'
import Table from './Table';  
import axios from 'axios';
import { Delete,  Edit, PreviewOutlined} from '@mui/icons-material';
 
import Hoot from '../../../General/components/Hoot';
import DeleteModal from '../elements/DeleteModal';
import NewVehicleModal from '../modal/NewVehicleModal';
const TABLEURL = Hoot()+"edualltransportvehicleget/get/";


const VehicleHead = [ 
    'Matrícula (Placa)',
    'Modelo',  
    'Motorista',
    'Tipologia',
    'Valor da viatura',
    'Data de aquisição',
    'Capacidade',
    'Ação'
];
 

const VehicleOptions = {
    filterType: 'checkbox'
}


function VehiclesTable() {
    const [data, setData] = useState([]);
  
    async function loadData(){
        const response = await axios.get(TABLEURL);
        setData(response.data);
    }
  
    useEffect(()=>{
        loadData();
    });
  
    const VehicleBody = [];
    data.map((item, index)=>{
        if(item != null){
          VehicleBody.push([ 
              item.ed_transport_vehicle_plate,
              <div className="ed-flex">
                    <img loading="lazy" role="presentation" src={item.ed_transport_vehicle_picture != "" ? Hoot()+item.ed_transport_vehicle_picture : "#"} alt="#" className='tableImg'  />
                    <span className="ml-2">{item.ed_transport_vehicle_model}</span>
              </div>,
              "#############",
              item.ed_transport_vehicle_typology,
              item.ed_transport_vehicle_value,
              item.ed_transport_vehicle_acquisition_date,
              item.ed_transport_vehicle_capacity,
              <div className="ed-flex">
                <NewVehicleModal  title='Atualizar ' update='true' get={Hoot()+`edualltransportsinglevehicleget/get/${item.ed_transport_vehicle_id}`}  
                url={Hoot()+`eduallclassupdateapi/update/${item.ed_transport_vehicle_id}`}  toggle_btn={
                <button className="btn-circle bg-success text-light">
                    <Edit/>
                </button> 
                } />
                 <button student-code={item.ed_student_id} className="btn-circle bg-warning ml-2 text-light">
                    <PreviewOutlined/>
                </button>
                <DeleteModal title='este veiculo' url={Hoot()+`edualltransportvehicledelete/delete/${item.ed_transport_vehicle_id}`} 
                message='Veiculo deletado com sucesso' toggle_btn={
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
          TableHead={VehicleHead}
          TableBody={VehicleBody}
          TableOptions={VehicleOptions}
          TableTitle='Lista das viaturas'
      />
      )
}

export default VehiclesTable