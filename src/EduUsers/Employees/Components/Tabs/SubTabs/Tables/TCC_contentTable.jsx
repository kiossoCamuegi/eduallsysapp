import React, { useEffect, useState } from 'react'
import DeleteModal from '../../../../../../Dashboard/components/elements/DeleteModal';
import { Delete, Edit, Refresh } from '@mui/icons-material';
import Hoot from '../../../../../../General/components/Hoot';
import TableGrid from '../../../../../../General/components/TableGrid';
import axios from 'axios';
import AddFileModal from '../Modal/AddFileModal';
const TABLEURL = Hoot()+'edualltimings/get/';

const columns = [ 
    { 
     field: 'index',
     headerName: 'Nº',  
     resizable: true,
     width:90,
    }, 
    { 
      field: 'title',
      headerName: 'Nome do ficheiro',  
      resizable: true,
      width:300,
     },
     { 
        field: 'availablestatus',
        headerName: 'Disponiblidade',  
        resizable: true,
     },
     { 
        field: 'typeandsize',
        headerName: 'Tipo de ficheiro & Tamanho',  
        resizable: true,
        width:300
     }, 
     { 
        field: 'date',
        headerName: 'Data de registro',  
        resizable: true,
     },
    {
      field: 'action',
      headerName: 'Ação',  
       resizable: true, cellRenderer:(props) => { 
        return  <div className="ed-flex">
            <AddFileModal title='Atualizar ' update='true' get={Hoot()+`eduallsinglecoursesapi/get/${props.data.id}`}  
            url={Hoot()+`eduallcourseupdate/update/${props.data.id}`}  toggle_btn={
            <button   className="btn-circle  bg-success text-light">
               <Edit/>
            </button>} /> 
        <DeleteModal title='este curso' url={Hoot()+`eduallcoursedelete/delete/${props.data.id}`} message='Curso deletado com sucesso' toggle_btn={ 
        <button  className="btn-circle bg-danger ml-2 text-light">
            <Delete/>
        </button>} />
        </div>;
      }
    } 
];
  
function TCC_contentTable() {
    const [data, setData] = useState([]);
    const [load, setLoaded] = useState(false);
  
    async function loadData(){
      setLoaded(false); 
        const response = await axios.get(TABLEURL);
        const rows = []; 
          response.data.map((item, index)=>{   
             // rows.push({}) 
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
        <div className="d-none"><button className="btn table-btn-small el-refresh-list bg-main-light  ml-2" onClick={loadData}><Refresh /></button></div>
        <TableGrid
            TableHead={columns}
            TableBody={data} 
            TableTitle='Arquivos anexados'
            TableBtn={ <div className='ed-flex'> 
                <div className="ml-2">
                    <AddFileModal/>
                </div>
            </div>}
        />
        <br />
    </div>
    )
  }else{
    return (
      <div>
        <div className="d-none">*</div>
        <TableGrid
            TableHead={columns}
            TableBody={[]} 
            TableTitle='Arquivos anexados'
            TableBtn={<button className="btn table-btn-small el-refresh-list bg-main-light  ml-2" onClick={loadData}><Refresh /></button>}
        />
        <br />
    </div>
    )
  }
}

export default TCC_contentTable
