import React, { useEffect, useState } from 'react'
import Table from './Table';  
import axios from 'axios';
import { Delete,  Edit, PreviewOutlined, Refresh} from '@mui/icons-material';
 
import Hoot from '../../../General/components/Hoot';
import DeleteModal from '../elements/DeleteModal';
import NewproviderModal from '../modal/NewproviderModal';
import TableGrid from '../../../General/components/TableGrid';
const TABLEURL = Hoot()+"eduallprovidersapi/get/";

 

const columns = [ 
    { 
    field: 'index', 
    headerName: 'Nº',
    with:90,
     resizable: true, 
    },  
    {
        field: 'title',
        headerName: 'Nome do Fornecedor',
         resizable: true, 
    }, 
    {
      field: 'nif',
      headerName: 'Nif',
       resizable: true, 
    }, 
    {
        field: 'phone',
        headerName: 'Telefone',
         resizable: true,  
         cellRenderer:(props)=>{
            return <a  className='text-main-light' target='_blank' href={``}>{props.data.phone}</a>
        }
    },
    {
        field: 'website',
        headerName: 'Website',
         resizable: true, 
        resizable: true, cellRenderer:(props)=>{
            return <a  className='text-main-light' target='_blank'  href={props.data.website}> {props.data.website} </a>
        }
    }, 
    {
        field: 'email',
        headerName: 'Email',
         resizable: true, 
        resizable: true, cellRenderer:(props)=>{
            return <a className='text-main-light' target='_blank'  href={props.data.email}> {props.data.email} </a>
        }
    },
    {
        field: 'country',
        headerName: 'País',
         resizable: true, 
    },  
    {
      field: 'action',
      headerName: 'Ação',  
       resizable: true,
        cellRenderer:(props) => { 
        return    <div className="ed-flex">
        <NewproviderModal  title='Atualizar ' update='true' get={Hoot()+`eduallgetsingleprovider/get/${props.data.id}`}  
        url={Hoot()+`eduallproviderupdateapi/update/${props.data.id}`}  toggle_btn={
        <button class_code={props.data.id} className="btn-circle bg-success text-light">
            <Edit/>
        </button> 
        } />
        <button className="btn-circle bg-warning ml-2 text-light">
           <PreviewOutlined/>
       </button>
        <DeleteModal title='Fornecedor' url={Hoot()+`eduallproviderdelete/delete/${props.data.id}`} 
         message='Fornecedor deletado com sucesso' toggle_btn={
          <button class_code={props.data.id} className="btn-circle bg-danger ml-2 text-light">
             <Delete/>
          </button>
         }/> 
      </div>;
      }
    } 
  ];
  

function ProviderTable() {  
    const [data, setData] = useState([]); 
    const [load, setLoaded] = useState(false);
  
    async function loadData(){
        setLoaded(false);
        const response = await axios.get(TABLEURL);
        const rows = [];
        response.data.map((item, index)=>{ 
          rows.push({
            id:item.ed_provider_id,
            index:index+1,
            nif:item.ed_provider_nif,
            title:item.ed_provider_title, 
            phone:item.ed_provider_phone,
            website:item.ed_provider_website ,
            email:item.ed_provider_email,
            country:item.ed_provider_country,
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
              TableTitle='Lista dos fornecedores'
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
                  TableTitle='Lista dos fornecedores'
                  TableBtn={<button className="btn table-btn-small el-refresh-list bg-main-light  ml-2" onClick={loadData}><Refresh /></button>}
              />
          </div>
          )
    }
}

export default ProviderTable