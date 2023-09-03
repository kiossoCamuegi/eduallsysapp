import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Delete, Description, Edit , PreviewOutlined } from '@mui/icons-material';
import Table from './Table';
import Hoot from '../../../General/components/Hoot'; 
import DeleteModal from '../elements/DeleteModal'; 
import { GetServicePrice, GetServiceTitle, GetStudentName, GetTransportStopName } from '../../../General/components/InstituteData';
import NewTransportPassengerModal from '../modal/NewTransportPassengerModal';
const TABLEURL = Hoot()+"edualltransportpassengerget/get/"; 

const PassengersHead = [ 
    'Nº',
    'Nome do estudante',  
    'Paragem',
    'Serviço',
    'Taxa do serviço de transporte', 
    'Ação'
];


const PassengersOptions = {
    //filterType: 'checkbox',
    selection:true
}
 


function TransportPassengersTable() {
    const [data, setData] = useState([]); 
    const [refresh, setRefresh] = useState(true);
    
  
    async function loadData(){
        const response = await axios.get(TABLEURL); 
        setData(response.data);
    };
    
    useEffect(()=>{ 
      refresh ===  true ? loadData() : console.log("Error");
    });
  
    const PassengersBody = [];
    data.map((item, index)=>{
        PassengersBody.push([
             index+1,
             <GetStudentName ID={item.ed_transport_passenger_code} />,
             <GetTransportStopName ID={item.ed_transport_passenger_stop}/>,
             <GetServiceTitle ID={item.ed_transport_passenger_service}/>,
             <GetServicePrice  ID={item.ed_transport_passenger_service}/>,
             <div className="ed-flex">
             <NewTransportPassengerModal title='Atualizar ' update='true' get={Hoot()+`edualltransportsinglepassengerget/get/${item.ed_transport_passenger_id}`}  
              url={Hoot()+`eduallcourseupdateapi/update/${item.ed_transport_passenger_id}`}  toggle_btn={
             <button  className="btn-circle  bg-success text-light">
                <Edit/>
             </button>} /> 
            <DeleteModal title='este passageiro' url={Hoot()+`edualltransportpassengerdelete/delete/${item.ed_transport_passenger_id}`} message='Passageiro deletado com sucesso' toggle_btn={ 
            <button  className="btn-circle bg-danger ml-2 text-light">
                <Delete/>
            </button>} />
         </div>
        ]);
    }); 
  
  
}

export default TransportPassengersTable