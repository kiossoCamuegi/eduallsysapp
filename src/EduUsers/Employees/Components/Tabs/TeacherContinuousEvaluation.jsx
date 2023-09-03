import React, { useEffect, useState } from 'react'
import styled from 'styled-components';  
import { Badge, Form } from 'react-bootstrap';
import TableGrid from '../../../../General/components/TableGrid';
import { Edit, PrintOutlined } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import QuarterlyNotesModal from '../../../../Dashboard/components/modal/Pedagogy/QuarterlyNotesModal';
import { GetClasstitle_byclass, GetStudentNameAndPicture, GetSubject } from '../../../../General/components/InstituteData';
import ContinuousAvaliationModal from './SubTabs/Modal/ContinuousAvaliationModal';
import Hoot from '../../../../General/components/Hoot';
import axios from 'axios';
import CRValue from '../../../../General/components/CRValue';
import DeleteModal from '../../../../Dashboard/components/elements/DeleteModal';
import { Delete } from '@mui/icons-material';
  

const TABLEURL = [
    Hoot()+"eduallgetctnavlpointsbysubclass/get/"
];

const columns = [ 
  { field: 'index', headerName: 'Nº', width: 90, resizable: true },
  {
    field: 'name',
    headerName: 'Nome do aluno',
    width:400, 
    resizable: true,
    cellRenderer:(props)=>{
        return  <GetStudentNameAndPicture size={40}  ID={props.data.studentcode}/> 
    }
  },  
  {
    field: 'score',
    headerName: 'Pontos',
    width:120,
    editable:false,
    resizable: true,
    cellRenderer:(props)=>{ 
        if(props.data.score <= 3) {
            return <Badge bg='warning'>{props.data.score}</Badge>;
        }else if(props.data.score <= 4){
            return <Badge bg='primary'>{props.data.score}</Badge>;
        }else if(props.data.score >= 5){
            return <Badge bg='success'>{props.data.score}</Badge>;
        }  
    }
  },   
  {
    field: 'date',
    headerName: 'Data de registro',
    width:170,
    editable: false,
    resizable: true
  },   
  {
    field: 'action',
    headerName: 'Ação', 
    width: 150, 
    sortable:false,  
    resizable: true,
    cellRenderer:(props)=>{
        return <div className="ed-flex">
        <ContinuousAvaliationModal data={props.data.data}  title='Atualizar ' update='true' get={Hoot()+`eduallgetsingletiming/get/${props.data.id}`}  
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


function TeacherContinuousEvaluation(props) {
    const rows = []; 
    const [data, setData] = useState([]);  
    const [load, setLoaded] = useState(false);

    async function loadData(CS, DT){
        console.log(CS);
        setLoaded(false);
        const rows = [];
        try {
             const response = await axios.get(TABLEURL[0]+CS); 
             response.data.map((item, index)=>{
                
                console.log(item);
    
                rows.push({
                    index:index+1,
                    date:item.ed_cn_avl_date,
                    studentcode:item.ed_cn_avl_studentCode,
                    score:item.ed_cn_avl_score,
                    id:item.ed_cn_avl_id,
                    data:props.Data.data
                });
             });
        } catch (error) {
            console.log(error);
        }
         setData(rows);
         setLoaded(true);
     }
   
     useEffect(()=>{
        loadData(
           CRValue("#student_continuous_avaliation_classSub"), 
           null  
        );  
     },[]);
     
     const handleInput = (e)=>{   
        e.preventDefault();
        switch (e.target.id) {  
           case "student_continuous_avaliation_classSub": 
                loadData(
                    e.target.value,  
                    null  
                ); 
           break; 
           case "student_continuous__avaliation_date": 
           loadData(
              CRValue("#student_continuous_avaliation_classSub") ,  
              e.target.value, 
           ); 
         break;   
         default:   
        } 
     }
  
     
    return (
      <Container>
           <div className="top-container">
              <Box>
                  <div className="ed-space">
                      <div className="title"><h1>Adicionar Pontos </h1></div> 
                      <div className="ed-flex">
                          <Form className="ed-flex" >
                            <Form.Select onChange={handleInput} id='student_continuous_avaliation_classSub' 
                            style={{minWidth:'300px'}}>
                                {props.Data.data.map((item, index)=>{
                                    return(<option value={item.ed_tch_subject_id}> 
                                        Turma - <GetClasstitle_byclass ID={item.ed_tch_subject_class} /> 
                                         ( <GetSubject ID={item.ed_tch_subject_code} /> )
                                     </option>)
                                })} 
                            </Form.Select> 
                            <div className="ml-2">
                                <Form.Control type='date' /> 
                            </div>
                            <Link>
                                <button className="btn bg-light ml-2 text-dark"><PrintOutlined/> Imprimir</button>
                            </Link>  
                        </Form> 
                         <div className="ml-2">
                            <ContinuousAvaliationModal data={props.Data.data} />
                         </div>
                      </div>
                  </div>
              </Box>
           </div>
           <div className="table-box">
              {load ?
               <TableGrid 
               TableHead={columns}
               TableBody={data} 
               TableHeight={420}
               TableTitle={`Pontuações `}
             />
             :   
             <>
                 <div className="d-none">*</div> 
                 <TableGrid 
                    TableHead={columns}
                    TableBody={[]} 
                    TableHeight={420}
                    TableTitle={`Pontuações `}
                  />
             </>
            }
           </div>
      </Container>
    )
}



const Container = styled.section`
     display:block;
     width:100%;
     padding:0px 20px;

     .top-container{
         margin-top:-90px;
     } 

     .table-box{
         margin-top:30px;
     }
`;


const Box = styled.div`
   width:100%;
   border-radius:6px; 
   min-height:90px;
   margin-bottom:21px !important;
   background:var(--ed-white);  
   box-shadow:var(--ed-shadow-df); 
   padding:0px 20px;
   position: relative;
   display:flex;
   align-items:center;

   .ed-space{
      align-items:center;
      height:100%; 

      div.ed-flex{
         width:80%; 
         justify-content:flex-end; 
      }

   }


   .form-select{
     max-width:200px;

     input{
         width:100%;
     }
   }
   
    .title h1{
        font-size:18px;
        font-weight:600;
        margin:0px;
    }

    form{
        width:80%; 
        display:flex;
        align-items:center;
        justify-content:flex-end;
    }

   .top-container{
         margin-top:-50px; 
     }

   h5{ 
      font-size:16px;
      font-weight:600; 
   }
`

export default TeacherContinuousEvaluation
