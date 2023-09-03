import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Delete, Description, Edit , PreviewOutlined } from '@mui/icons-material';
import Table from './Table';
import Hoot from '../../../General/components/Hoot';
import { GetAcademicYear, GetAcademicLevel, GetStops, GetCourse } from '../../../General/components/InstituteData';
import DeleteModal from '../elements/DeleteModal'; 
import { Link } from 'react-router-dom';
const TABLEURL = Hoot()+"edualltransportstopsget/get/";
const Periods = ["AM", "PM"];

const StopsHead = [ 
    'Nº',
    'Paragem',  
    'Rota',
    'Estimativa de chegada', 
    'Ação'
];


const StopsOptions = {
    //filterType: 'checkbox',
    selection:true
}
 

function StopsList() {
  const [data, setData] = useState([]); 
  const [refresh, setRefresh] = useState(true);
  

  async function loadData(){
      const response = await axios.get(TABLEURL); 
      setData(response.data);
  };
  
  useEffect(()=>{ 
    refresh ===  true ? loadData() : console.log("Error");
  });

  const StopsBody = [];
  data.map((item, index)=>{
      StopsBody.push([
         index+1,
         item.ed_transport_stop_name,
          "##",
          item.ed_transport_stop_estimate_of_arrival,
          <div className="ed-flex">
            <Link to={`/registerstops/${item.ed_transport_stop_id}`}>
                <button student-code={item.ed_student_id} className="btn-circle bg-success text-light">
                   <Edit/>
               </button> 
            </Link>
            <DeleteModal title='esta paragem' url={Hoot()+`edualltransportstopsdelete/delete/${item.ed_transport_stop_id}`} message='Paragem deletada com sucesso' toggle_btn={ 
               <button  className="btn-circle bg-danger ml-2 text-light">
                   <Delete/>
               </button>} />
          </div>
      ]);
  }); 

 
}

export default StopsList