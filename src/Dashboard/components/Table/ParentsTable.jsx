import React , {useEffect, useState} from 'react'
import Table from './Table'
import { Avatar } from '@mui/material'; 
import axios from 'axios'
import { Delete, Description, Edit , PreviewOutlined, Refresh } from '@mui/icons-material'; 
import Hoot from '../../../General/components/Hoot'; 
import DeleteModal from '../elements/DeleteModal'; 
import { Link } from 'react-router-dom';
import ParentsGrades from '../../../General/components/ParentsGrades';
import TableGrid from '../../../General/components/TableGrid';
const TABLEURL = Hoot()+"eduallparents/get";
 

const ParentsOptions = {filterType: "checkbox"}
const Genders = ["Masculino", "Femenino"];
 

const columns = [ 
  { 
   field: 'index',
   headerName: 'Nº',  
   resizable: true,
   width:90
  }, 
   { 
    field: 'name',
    headerName: 'Nome',  
    resizable: true,
    cellRenderer:(props)=>{
      return     <div className="ed-flex">
      <Avatar alt="Remy Sharp" src={props.data.picture != ""  ?  Hoot()+props.data.picture : ""} />
      <span className='ml-2'> { props.data.name} </span>
    </div>
    }
   },
   { 
    field: 'gender',
    headerName: 'Genero',  
    resizable: true,
    cellRenderer:(props)=>{
      return Genders[Math.floor(props.data.gender)]
    }
   },
   { 
    field: 'address',
    headerName: 'Endereço',  
    resizable: true, 
   },   
   { 
    field: 'phone',
    headerName: 'Telefone',  
    resizable: true,
    cellRenderer:(props)=>{
      return props.data.phone1 + " /  " +  props.data.phone2
    }
   },   
   { 
    field: 'email',
    headerName: 'E-mail',  
    resizable: true, 
   },   
   { 
    field: 'degree_of_kinship',
    headerName: 'Grau parentesco',  
    resizable: true,
    cellRenderer:(props)=>{
      return ParentsGrades(props.data.degree_of_kinship)
    }
   },   
  {
    field: 'action',
    headerName: 'Ação',  
     resizable: true,
      cellRenderer:(props) => { 
      return    <div className="ed-flex"> 
      <Link to={`/update_parent/${props.data.id}`}>
          <button className="btn-circle bg-success text-light">
              <Edit/>
          </button>
      </Link>
      <button student-code={props.data.id} className="btn-circle bg-warning ml-2 text-light">
          <PreviewOutlined/>
      </button>
      <DeleteModal title='este encarregado' url={Hoot()+`eduallparentdelete/delete/${props.data.id}`} 
       message='Encarregado deletado com sucesso' toggle_btn={
        <button  className="btn-circle bg-danger ml-2 text-light">
           <Delete/>
        </button>
       }/> 
    </div>;
    }
  } 
];


function ParentsTable() { 
  const [data, setData] = useState([]);
  const [load, setLoaded] = useState(false);

  async function loadData(){
    setLoaded(false);
    const response = await axios.get(TABLEURL); 
    const rows = []; 
    response.data.map((item, index)=>{  
      rows.push({
          index:index+1,  
          id:item.ed_parent_id,
          picture:item.ed_parent_picture,
          name:item.ed_parent_name,
          gender:item.ed_parent_gender,
          address:item.ed_parent_address,
          email:item.ed_parent_email,
          phone1:item.ed_parent_phone,
          phone2:item.ed_parent_phone2,
          degree_of_kinship:item.ed_parent_degree_of_kinship
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
          TableTitle='Lista dos encarregados'
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
          TableTitle='Lista dos encarregados'
          TableBtn={<button className="btn table-btn-small el-refresh-list bg-main-light  ml-2" onClick={loadData}><Refresh /></button>}
      />
  </div>
  )
}
}

export default ParentsTable