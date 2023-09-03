import { Avatar } from '@mui/material';
import React, {useState, useEffect} from 'react'  
import { Link } from 'react-router-dom'; 
import styled from 'styled-components';
import { GetAcademiclevel_byclass, GetClassroom_byclass, GetAcademicYearCode, GetClasstitle_byclass, GetCourse_byclass, GetPeriod_byclass } from '../../../General/components/InstituteData';
import axios from 'axios'; 
import Hoot from '../../../General/components/Hoot';  
import { GetAcademicYearCodeByClass } from '../../../General/components/GetAcademicYearCodeByClass'; 
const TABLE_URL = [Hoot()+"edualltransportpassengerget/get/", Hoot()+"eduallsinglestudentapi/get/"];


function TransportStudentsGrid(props) {

    const [data, setData] = useState([]);
    const [PassengerInfo, setPassengerInfo] = useState([]); 
  
    async function loadData(){
        const response = await axios.get(TABLE_URL[0]);
        setData(response.data);
    }
  
    

    useEffect(()=>{
        loadData(); 
    },[]);
    

   
    
     const Students = [];
        const getData = async()=> {
            for(let i = 0; i < data.length; i++) {
                const response = await axios.get(TABLE_URL[1]+`${data[i].ed_transport_passenger_code}`)
                Students.push({student:response.data, service:data[i]}); 
            }  
        }
        if (getData()){
             
  return(
    <Container>   
    {
      Students.map((student, index)=>{
         return(
          <Card className='boxItem'> 
          <div className="ed-flex">
              <Link to=''><Avatar alt=''   src=''  sx={{ width: 106, height: 106 }}/></Link>
              <div className="d-block ml-2 description">
                   <h3 className='name '>Nome : <Link to='' className='text-main label-student-name'>   </Link></h3>
                   <h5>Serviço : <Link to='' className='text-main '> # </Link></h5>
                   <h5>Rota : <Link to='' className='text-main '> #  </Link></h5>
              </div>
          </div>
           <div className="ed-wrap mt-4 description">
               <h5>Turma : <Link to='' className='text-main '> <GetClasstitle_byclass ID="21" />  </Link></h5>
               <h5 className="ml-2">Classe : <Link to='' className='text-main label-student-level'> <GetAcademiclevel_byclass ID="21" /> </Link> </h5>
               <h5 className='ml-2'>Sala : <Link to='' className='text-main room'> {<GetClassroom_byclass ID="21" />} </Link></h5>
           </div>
           <div className="ed-wrap mt-2 description">
               <h5>Curso : <Link to='' className='text-main '><GetCourse_byclass ID="21" /></Link></h5>
               <h5 className='ml-2'>Periodo : <Link to='' className='text-main '><GetPeriod_byclass ID="21" /> </Link></h5>
           </div>  
         </Card> 
         )
      })
    }
    </Container>) 
 }



}

const Container = styled.section`
     width:100%;
     margin:10px 0px;
     display:flex;
     flex-wrap:wrap;
`;

const Card = styled.article` 
border-radius:6px;   
padding:20px; 
min-height:250px;
background:var(--ed-white);  
box-shadow:var(--ed-shadow-df);
margin:10px;
min-width:47.5%; 
max-width:47.5%;

.ex{
    font-size:16px;
    margin-top:8px;
    margin-right:25px;

    .dot{
        width:20px;
        height:20px;
        border-radius:100%;
        margin-right:10px;
        border:3px solid var(--ed-white);
        box-shadow:var(--ed-shadow-df);
    }

    .dot.warning{
        background:#FFBD00;
    }

    .dot.success{
        background:#52B69A;
    }

    .dot.other{
        background:#CED4DA;
    }
}



.description{
    .name{
        font-size:18px;
        margin-bottom:15px;
        margin-top:10px;
    }

    h5{
        font-size:16px;
    }
}

h2{
    margin:10px 0;
    font-size:18px;
    font-weight:600;
}
`

export default TransportStudentsGrid