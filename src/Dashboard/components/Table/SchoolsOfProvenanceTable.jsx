import React, {useEffect, useState} from 'react'
import Table from './Table';
import { Delete, Edit, Refresh } from '@mui/icons-material'; 
import axios from 'axios'  
import DeleteModal from '../elements/DeleteModal'; 
import { Link } from 'react-router-dom';
import Hoot from '../../../General/components/Hoot';
import TableGrid from '../../../General/components/TableGrid';
const TABLEURL = Hoot()+"eduallschoolsofprovenance/get/";



const columns = [ 
  { field: 'index', headerName: 'Nº', width: 90 },
  {
    field: 'title',
    headerName: 'Nome da escola',
    width:200,
    editable: true,
  },
  {
    field: 'country',
    headerName: 'País',
    width:200,
    editable: true,
  },
  {
    field: 'address',
    headerName: 'Endereço',
    width:200,
    editable: true,
  },
  {
    field: 'email',
    headerName: 'Email',
    width:200,
    editable: true,
  }, 
  {
    field: 'action',
    headerName: 'Ação', 
    width: 150, 
    sortable:false,
     resizable: true, cellRenderer:(props) => { 
      return <div className="ed-flex"> 
      <Link to={`/NewSchoolsOfProvenance?schoolofprovenance_id=${props.data.id}`} className="btn-circle bg-success text-light">
          <Edit/>
      </Link>  
      <DeleteModal title='esta escola de proveniência' url={Hoot()+`eduallschoolofprovenancedelete/delete/${props.data.id}`} 
       message='Turma deletada com sucesso' toggle_btn={
        <button  className="btn-circle bg-danger ml-2 text-light">
           <Delete/>
        </button>
       }/> 
    </div>;
    }
  } 
];

function SchoolsOfProvenanceTable() { 
    const [data, setData] = useState([]); 
    const [load, setLoaded] = useState(false);
  
    async function loadData(){
       setLoaded(false);
        const response = await axios.get(TABLEURL); 
        const rows = []; 
        response.data.map((item, index)=>{ 
          rows.push({
            id:item.ed_schools_of_provenance_id,
            index:index+1,  
            title:item.ed_schools_of_provenance_name, 
            country:item.ed_schools_of_provenance_country,
            address:item.ed_schools_of_provenance_address, 
            email:item.ed_schools_of_provenance_email, 
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
              TableTitle="Lista das escolas de proveniência"
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
              TableTitle="Lista das escolas de proveniência"
              TableBtn={<button className="btn table-btn-small el-refresh-list bg-main-light  ml-2" onClick={loadData}><Refresh /></button>}
          />
      </div>
      )
    }
   
}

export default SchoolsOfProvenanceTable