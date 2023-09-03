import React, { useEffect, useState } from 'react'
import Table from './Table';  
import axios from 'axios';
import { Delete,  Edit, Refresh} from '@mui/icons-material';
 
import Hoot from '../../../General/components/Hoot';
import DeleteModal from '../elements/DeleteModal';
import NewCourseModal from '../modal/NewCourseModal';
import TableGrid from '../../../General/components/TableGrid';
import { GetTime } from '../../../General/components/InstituteData';
const TABLEURL = Hoot()+"eduallgetemployeeattendencebycode/get/";
 

const columns = [ 
    { 
     field: 'index',
     headerName: 'Nº',  
     resizable: true,
     width:90,
    }, 
    { 
      field: 'date',
      headerName: 'Data',  
      resizable: true,
      width:130,
     },
     { 
        field: 'time',
        headerName: 'Periodo',  
        resizable: true,
        cellRenderer:(props)=>{
          return <GetTime  ID={props.data.time} />
        }
     },   
     
];
  

 
function SingleEmployeeAttendanceTable(props) {
    const [data, setData] = useState([]);
    const [load, setLoaded] = useState(false);
    const EmployeeId = props.employeeid;
  
    async function loadData(){
        try {
           setLoaded(false);
           const response = await axios.get(TABLEURL+EmployeeId); 
           const rows = [];  
           console.log(response.data)
           response.data.map((item, index)=>{
               rows.push({
                   index:index+1,
                   id:item.ed_employee_attd_id,
                   date:item.ed_employee_attd_date,
                   time:item.ed_employee_attd_timing
               })
           });
         setData(rows);  
         setLoaded(true); 
        } catch (error) {
            setLoaded(true); 
        }
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
            TableTitle='Hístorico de presença'
            TableHeight={300}
            TableBtn={<button className="btn table-btn-small el-refresh-list bg-main-light  ml-2" onClick={loadData}><Refresh /></button>}
        />
    </div>
    )
  }else{
    return (
      <div> 
        <><div className="d-none">*</div>
        <TableGrid
            TableHead={columns}
            TableBody={[]} 
            TableTitle='Hístorico de presença'
            TableHeight={300}
            TableBtn={<button className="btn table-btn-small el-refresh-list bg-main-light  ml-2" onClick={loadData}><Refresh /></button>}
        />
        </>
    </div>
    )
  }
}




export default SingleEmployeeAttendanceTable
