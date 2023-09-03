import React, {useState, useEffect} from 'react'
import Table from './Table'
import { Delete, Description, Edit ,OpenInBrowser, Refresh } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Hoot from '../../../General/components/Hoot';
import DeleteModal from '../elements/DeleteModal';
import NewTime from '../modal/NewTime';
import TableGrid from '../../../General/components/TableGrid';
const TABLEURL = Hoot()+'edualltimings/get/';
  
 
const columns = [ 
  { 
   field: 'index',
   headerName: 'Nº',
   width:90,  
   resizable: true,
  },
  { 
    field: 'time',
    headerName: 'Horário',  
    resizable: true,
    width:300,
   },
   { 
    field: 'duration',
    headerName: 'Duração',  
    resizable: true,
   },  
  {
    field: 'action',
    headerName: 'Ação',  
     resizable: true,
      cellRenderer:(props) => { 
      return   <div className="ed-flex">
      <NewTime  title='Atualizar ' update='true' get={Hoot()+`eduallgetsingletiming/get/${props.data.id}`}  
       url={Hoot()+`edualltimingupdate/update/${props.data.id}`} 
        toggle_btn={
         <button className="btn-circle btn-edit-timing bg-success text-light">
            <Edit/>
          </button> 
        }
      />
     <DeleteModal title='este horário' url={Hoot()+`edualltimingdelete/delete/${props.data.id}`} 
        message='Horário deletado com sucesso' toggle_btn={
         <button className="btn-circle btn-delete-timing bg-danger ml-2 text-light">
         <Delete/>
     </button>
        }/> 
  </div> ;
    }
  } 
];


function TimeList() {  
  const [data, setData] = useState([]);
  const [load, setLoaded] = useState(false);

  async function loadData(){
    setLoaded(false); 
      const response = await axios.get(TABLEURL);
      const rows = []; 
        response.data.map((item, index)=>{  
          let hs = item.ed_timing_hour_start; 
          let he = item.ed_timing_hour_end; 
          let ms = item.ed_timing_minute_start; 
          let me = item.ed_timing_minute_end;  
            rows.push({
                  index:index+1,
                  id:item.ed_timing_id, 
                  time:hs+'H'+ ' : '+  ms+' MN' + ' | ' +  he+' H'+ ' : '+  me+' MN',  
                  duration:Math.floor(he - hs)+' H ' + ' : '+ (Math.floor(me - ms) < 0 ? 0 : Math.floor(me - ms)) + ' MN',  
                  action:'',  
              }) 
          });  
      setData(rows); 
      setTimeout(() => {
        setLoaded(true); 
      }, 200);
  }

  useEffect(()=>{
      loadData(); 
  },[]);

 


if(load){
    return (
    <div>
      <TableGrid
          TableHead={columns}
          TableBody={data} 
          TableTitle='Lista dos Horários'
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
          TableTitle='Lista dos Horários'
          TableBtn={<button className="btn table-btn-small el-refresh-list bg-main-light  ml-2" onClick={loadData}><Refresh /></button>}
      />
  </div>
  )
}
}

export default TimeList