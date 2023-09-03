import React, {useState, useEffect} from 'react'
import Table from './Table';
import { Delete,  Edit, Refresh, VisibilityOutlined } from '@mui/icons-material';
import  axios  from 'axios';
import Hoot from '../../../General/components/Hoot';
import DeleteModal from '../elements/DeleteModal';
import NewServiceModal from '../modal/NewServiceModal';
import { GetProviderName } from '../../../General/components/InstituteData';
import TableGrid from '../../../General/components/TableGrid';
import NumberToPrice from '../../../General/components/NumberToPrice';
const TABLEURL = Hoot()+'eduallservicesapi/get/';

 
const ServiceMethods = ["Diario", "Semanal", "Mensal", "Anual", "Outro"];

const columns = [ 
  { field: 'index', headerName: 'Nº', width: 90,resizable: true },
  {
    field: 'title',
    headerName: 'Serviço', 
    resizable: true,
  },
  {
    field: 'method',
    headerName: 'Metodo de cobrança', 
    resizable: true,
  },
  {
    field: 'price',
    headerName: 'Preço do serviço', 
    resizable: true,
  },
  {
    field: 'provider',
    headerName: 'Fornecedor', 
    resizable: true,
    resizable: true, cellRenderer:(props)=>{
      return <GetProviderName INDEX='5' ID={props}/>
    }
  },
  {
    field: 'action',
    headerName: 'Ação', 
    width: 240, 
    sortable:false,
    resizable: true,
    cellRenderer:(props) => { 
      return  <div className="ed-flex">
      <button service-code={props.data.id}  className="btn-circle bg-warning btn-view-description text-light">
          <VisibilityOutlined/>
       </button>
      <NewServiceModal   title='Atualizar ' update='true' get={Hoot()+`eduallsingleserviceapi/get/${props.data.id}`}  
       url={Hoot()+`eduallserviceupdate/update/${props.data.id}`}  toggle_btn={
         <button className="btn-circle btn-edit-service bg-success ml-2 text-light">
           <Edit/> 
        </button>
      } />
     <DeleteModal  title='este serviço' url={Hoot()+`eduallservicedelete/delete/${props.data.id}`} 
      message='Serviço deletado com sucesso' toggle_btn={
         <button service-code={props.data.id}   className="btn-circle bg-danger btn-delete-service ml-2 text-light">
            <Delete/>
         </button>
        } />
     </div>;
    }
  } 
];


function ServicesTable() {      
  const [data, setData] = useState([]); 
  const [load, setLoaded] = useState(false);

  async function loadData(){
      setLoaded(false);
      const response = await axios.get(TABLEURL); 
      const rows = [];
      response.data.map((item, index)=>{ 
        rows.push({
          id:item.ed_service_id,
          index:index+1,
          title:item.ed_service_title ,
          method: ServiceMethods[item.ed_service_type*1],  
          price: NumberToPrice(item.ed_service_price)+ " "+ item.ed_service_coin ,
          provider:item.ed_service_provider,
          action:'',  
       })
      }); 
      setData(rows);
      setTimeout(() => {
        setLoaded(true);
      }, 200);
  };
  
  useEffect(()=>{ 
      loadData();  
  },[]);
 
 

  if(load){
      return (
      <div>
        <TableGrid
            TableHead={columns}
            TableBody={data} 
            TableTitle='Lista dos Serviços'
            TableBtn={<button className="btn table-btn-small el-refresh-list bg-main-light  ml-2" onClick={loadData}><Refresh /></button>}
        />
    </div>
    )
  }else{
    return (
      <div>
        <div className="d-none">*</div>
        <TableGrid
            TableHead={columns}
            TableBody={[]} 
            TableTitle='Lista dos Serviços'
            TableBtn={<button className="btn table-btn-small el-refresh-list bg-main-light  ml-2" onClick={loadData}><Refresh /></button>}
        />
    </div>
    )
  }
  
}

export default ServicesTable