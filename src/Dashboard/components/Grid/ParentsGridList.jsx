import React, {useState, useEffect} from 'react'
import  {Email, Phone, LinkedIn, Facebook } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Avatar, AvatarGroup } from '@mui/material';  
import axios from 'axios';
import { Delete, Description, Edit} from '@mui/icons-material';
import Hoot from '../../../General/components/Hoot'; 
import { GetAcademiclevel_byclass, GetClassroom_byclass, GetClasstitle_byclass, GetCourse_byclass, GetParentStudentAvatars, GetPeriod_byclass, GetStudentClassroom } from '../../../General/components/InstituteData';
import styled from "styled-components";
import ParentsGrades from '../../../General/components/ParentsGrades';
import RandomAvatarColor from '../../../General/components/RandomAvatarColor';
import DeleteModal from '../elements/DeleteModal';
const URL = Hoot()+"eduallparents/get";


function ParentsGridList() {

  const [data, setData] = useState([]); 
  async function loadData(){
      const response = await axios.get(URL);
      setData(response.data);
  }
  

  useEffect(()=>{
      loadData();   
  },[]);
  

 
  return(
    <Container>   
    {
        data.map((item, index)=>{
        let studentsArray = item.ed_parent_students_code.split('|'); 
         return(
          <Card className='boxItem'> 
           <div className="ed-space">
                <div className="ed-flex">
                    <Link to=''><Avatar className='df' alt={item.ed_parent_name} src={item.ed_parent_picture != ""  ?  Hoot()+item.ed_parent_picture : ""} 
                     sx={{ width: 106, height: 106 }}/></Link>
                    <div className="d-block ml-2 description">
                        <h3 className='name '>Nome : <Link to='' className='text-main label-student-name'>  {item.ed_parent_name} </Link></h3>
                        <h5>Grau parentesco : <Link to='#' className='text-main '> {ParentsGrades(item.ed_parent_grade)} </Link></h5>
                        <h5>Genero : <Link to='' className='text-main '> #  </Link></h5>
                    </div>
                </div>
                <div className="ed-flex">
                <Link to={`/updatestudent/`}>
                    <button  className="btn-circle bg-success text-light">
                        <Edit/>
                    </button>  
                </Link>
                <DeleteModal title='este estudante' url={Hoot()+`eduallstudentdelete/delete/`} 
                  message='Estudante deletado com sucesso' toggle_btn={
                    <button  className="btn-circle bg-danger ml-2 text-light">
                       <Delete />
                    </button>
                }/> 
             </div>
           </div> 
           <div className="ed-wrap mt-4 description">
               <h5>Email : <Link to='' className='text-main '> {item.ed_parent_email}  </Link></h5>
            </div>
           <div className="ed-wrap mt-2 description"> 
               <h5 >Endereço : <Link to='' className='text-main label-student-level'> {item.ed_parent_address} </Link> </h5>
           </div>
           <div className="ed-wrap mt-2 description">
              <h5>Telefones : <Link to='' className='text-main'> {item.ed_parent_phone}   / {item.ed_parent_phone2} </Link></h5>
           </div>  
           <div className="ed-wrap mt-2 description">
               <h5>Nacionalidade : <Link to='' className='text-main '> {item.ed_parent_nacionality} </Link></h5>
           </div>  
           <div className="ed-wrap mt-2 description ml-0">
               <h5>Contacto em caso de emergencia : <Link to='' className='text-main '> {item.ed_parent_emergency_phone	} </Link></h5>
           </div>
           <div className="mt-4 ed-space">
                 <div className='total-students' style={{background: RandomAvatarColor()}}>
                 <div className="count">{studentsArray.length}</div><h5>{ studentsArray.length >= 2 ?  'Educandos' : 'Educando'}</h5>
                  </div>
                 <div>
                 <AvatarGroup max={7} sx={{ '& .MuiAvatar-root': { width: 35, height: 35, fontSize: 13 }}}> 
                       <GetParentStudentAvatars ID={studentsArray}/> 
                  </AvatarGroup>
                 </div>
           </div>
         </Card> 
         )
      })
    }
    </Container>
)  
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
min-height:320px;
background:var(--ed-white);  
box-shadow:var(--ed-shadow-df);
margin:10px;
min-width:48%; 
max-width:48%;


  @media screen and (max-width:1290px){
    min-width:47.4%; 
    max-width:47.4%;
  }

 li{
    list-style:none;
 }

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


.total-students{
    border-radius:20px;
    display:flex;
    align-items:center;
    padding:7px;
    padding-right:15px;
    
    .count{
        margin-right:10px;
        background:var(--ed-white);
        border-radius:100%;
        display:flex;
        align-items:center;
        justify-content:center;

        width:25px;
        height:25px;
        font-size:12px;
        font-weight:bold;
    }

    h5{
      font-size:15px;
       margin:0px;
       color:var(--ed-white);
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

export default ParentsGridList