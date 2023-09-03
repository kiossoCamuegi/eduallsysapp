import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Delete,  Edit , Refresh } from '@mui/icons-material';
import Hoot from '../../../General/components/Hoot';
import { GetServiceTitle, GetServicePriceNumb, GetServiceCointText } from '../../../General/components/InstituteData';
import DeleteModal from '../elements/DeleteModal'; 
import TableGrid from '../../../General/components/TableGrid';
import { Badge } from 'react-bootstrap';
import NewFinePriceModal from '../modal/NewFinePriceModal';
const TABLEURL = Hoot()+"eduallgetservicefines/get/"; 


const columns = [ 
  {field:'index', headerName:'Nº', width:60},
  {
    field: 'service',
    headerName: 'Nome do serviço',
    width:300, 
    resizable: true, cellRenderer:(props)=>{
      return <GetServiceTitle ID={props.data.service}/>
    }
  }, 
  {
    field: 'vltype',
    headerName: 'Tipo de multa',
    width:130, 
    resizable: true, cellRenderer:(props)=>{
      return props.data.vltype*1 === 0 ? <Badge className='bg-info'>Percentagem</Badge> : <Badge className='bg-warning'>Valor Fixo</Badge> 
    }
  }, 
  {
    field: 'value',
    headerName: 'Valor da multa',
    width:160,
    sortable:false,
    resizable: true, cellRenderer:(props)=>{
      return   props.data.vltype*1 === 0 ? 
      <Badge className='bg-primary'>{props.data.value} % {' ( '} {Math.floor((props.data.value*1 * GetServicePriceNumb(props.data.service))  / 100 )}
      { ' '+ GetServiceCointText(props.data.service)} {' ) '} </Badge> :
      <Badge className='bg-warning'>{props.data.value} {GetServiceCointText(props.data.service)}</Badge> 
    }
  },
  {
    field: 'scholarshipHolders',
    headerName: 'AP. aos Bolseiros',
    width:150, 
    resizable: true, cellRenderer:(props)=>{
      return props.data. scholarshipHolders*1 === 1 ? <Badge className='bg-danger'>Aplicar</Badge> : <Badge className='bg-secondary'>Não Aplicar</Badge>
    }
  },
  {
    field: 'incrementValue',
    headerName: 'Incrementar  valor',
    width:210,
   sortable:false,
     resizable: true, cellRenderer:(props)=>{
      return <> {props.data.incrementValue === 0 ? 
      <span className='text-red'>Não Incrementar</span> :  
      <span>Incrementar a cada {props.data.daysafterprevmonth} dias </span>}</>
    }
  },
  {
    field: 'daysafterprevmonth',
    headerName: 'AP. depois de',
    width:120,
    sortable:false,
     resizable: true, cellRenderer:(props)=>{
      return <> {props.data.daysafterprevmonth} dias</>
    }
  },
  {
    field: 'parentsChildrens',
    headerName: 'AP. para encarregados com',
    width:230,
    sortable:false,
     resizable: true, cellRenderer:(props)=>{
      return <>{props.data.parentsChildrens >= 1 ?  
        <Badge className='bg-dark text-light'> {props.data.parentsChildrens} educandos</Badge> :
        <Badge className='bg-dark text-red'>Aplicar multa</Badge>
       }</>
    }
  },  
  {
    field: 'action',
    headerName: 'Ação', 
    width: 100, 
    sortable:false,
     resizable: true, cellRenderer:(props) => { 
      return <div className="ed-flex">
          <NewFinePriceModal  title='Atualizar ' update={true} get={Hoot()+`eduallgetsinglefine/get/${props.data.id}`}  
          url={Hoot()+`eduallfineupdate/update/${props.data.id}`}  toggle_btn={
          <button  className="btn-circle bg-success text-light">
              <Edit/>
          </button> 
          } />
          <DeleteModal title='esta multa' url={Hoot()+`eduallfinedelete/delete/${props.data.id}`} 
           message='Multa deletada com sucesso' toggle_btn={
            <button  className="btn-circle bg-danger ml-2 text-light">
               <Delete/>
            </button>
           }/> 
        </div> ;
    }
  } 
]; 

function FinesTable() {
    const [data, setData] = useState([]);  
    const [load, setLoaded] = useState(false);

    async function loadData(){
      setLoaded(false);
        const response = await axios.get(TABLEURL); 
        const rows = [];
        response.data.map((item, index)=>{ 
          rows.push({
              index:index+1,
              id:item.ed_fine_id, 
              service:item.ed_fine_service,
              vltype:item.ed_fine_value_type,
              value:item.ed_fine_value,
              scholarshipHolders:item.ed_fine_for_scholarshipholders,
              incrementValue:item.ed_fine_increment_value,
              parentsChildrens:item.ed_fine_parentsChildrens,
              daysafterprevmonth:item.ed_fine_daysafterprevmonth,
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
          TableTitle='Multas aplicadas'
          TableBtn={<button className="btn table-btn-small el-refresh-list bg-main-light  ml-2" onClick={loadData}><Refresh/></button>}
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
          TableTitle='Multas aplicadas'
          TableBtn={<button className="btn table-btn-small el-refresh-list bg-main-light  ml-2" onClick={loadData}><Refresh/></button>}
      />
  </div>
) 
}
}

export default FinesTable


 

 