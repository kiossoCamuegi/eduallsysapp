import React, { useEffect, useState } from 'react'
import styled from 'styled-components';  
import { Badge, Form } from 'react-bootstrap';
import TableGrid from '../../../../General/components/TableGrid';
import { PrintOutlined } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import QuarterlyNotesModal from '../../../../Dashboard/components/modal/Pedagogy/QuarterlyNotesModal';
import { GetClasstitle_byclass, GetStudentNameAndPicture, GetSubject } from '../../../../General/components/InstituteData';
import Hoot from '../../../../General/components/Hoot';
import CRValue from '../../../../General/components/CRValue';
import axios from 'axios';
import DeleteModal from '../../../../Dashboard/components/elements/DeleteModal';
import { Check, Close, Delete, Edit, Refresh } from '@mui/icons-material';
import ReduceTextLength from '../../../../General/components/ReduceTextLength';
import FloorNumber from '../../../../General/components/FloorNumber';
  
const DATA_URL = [
  Hoot()+'eduallsingleclassapi/get/',
  Hoot()+'eduallsingleacademiclevelsapi/get/',
];


const StatusType = [
   <Badge bg={'success'}><Check/> Transito</Badge> ,
   <Badge bg={'danger'}> <Close/> Não transito</Badge> , 
];

const GetColor = (e, max)=>{
   return (e < (max/2)) ?
   <span className='text-danger'>{e}</span>
  :<span className='text-success'>{e}</span>
}


const columns = [ 
  { field: 'index', headerName: 'Nº', width: 90,    resizable: true,  },
  { 
    field: 'student',
    headerName: 'Nome do aluno',
    resizable: true, 
    width:300,
    cellRenderer:(props)=>{
        return  <GetStudentNameAndPicture size={40} ID={props.data.student} />
    } 
  },
    {
    field: 'mac',
    headerName: 'MAC', 
    width:100,
    resizable: true, 
    editable: true,
    cellRenderer:(props)=>{
      return GetColor(props.data.mac*1, props.data.MaxValue)
  }
  },  
  {
    field: 'npp',
    headerName: 'NPP',
    width:100,
    resizable: true, 
    editable: true,
    cellRenderer:(props)=>{
      return GetColor(props.data.npp*1, props.data.MaxValue)
  }
  },
   {
    field: 'npt',
    headerName: 'NPT',
    width:100,
    resizable: true, 
    editable: true,
    cellRenderer:(props)=>{
      return GetColor(props.data.npt*1, props.data.MaxValue)
  }
  },  
  {
    field: 'mt',
    headerName: 'MT',
    width:150,
    editable:false,
    resizable: true, 
    cellRenderer:(props)=>{
        return GetColor(FloorNumber(((props.data.mac*1 + props.data.npp*1 + props.data.npt*1) / 3)), props.data.MaxValue)
    }
  },   
  {
    field: 'finalresult',
    headerName: 'Aproveito',
    width:190,
    editable: true,
    resizable: true, 
    cellRenderer:(props)=>{ 
      return <div className='ed-flex'> {StatusType[props.data.status]} </div>
    }
  },   
  {
    field: 'action',
    headerName: 'Ação', 
    width: 150, 
    sortable:false,  
    resizable: true, 
    cellRenderer:(props)=>{
      return  <div className="ed-flex"> 
    <QuarterlyNotesModal  data={props.data.data} maxvalue={props.data.MaxValue}  title='Atualizar ' update='true'
       get={Hoot()+`eduallsinglequarterlynotebyid/get/${props.data.id}`}  
       url={Hoot()+`eduallquarterlynoteupdate/update/${props.data.id}`} 
        toggle_btn={
         <button className="btn-circle btn-edit-timing bg-success text-light">
            <Edit/>
          </button> 
        }
      />
     <DeleteModal title='esta nota' url={Hoot()+`eduallquarterlynotedelete/delete/${props.data.id}`} 
        message='Horário deletado com sucesso' toggle_btn={
         <button className="btn-circle btn-delete-timing bg-danger ml-2 text-light">
         <Delete/>
     </button>
        }/> 
  </div> ; 
    }
  } 
];


const TABLEURL = [
    Hoot()+"eduallsinglequarterlynotebyqrtsubcls/get/"
]
 

function TeacherStudentMarksTabItem(props){ 
  const [MarksData, setMarksData] = useState([]); 
  const [load, setLoaded] = useState(false);  
 

  async function loadData(C, S, Q){ 
     setLoaded(false); 
       try {
        let MaxValue = 0;
        const response  = await axios.get(TABLEURL[0]+Q+","+S+","+C); 
        const response1 = await axios.get(DATA_URL[0]+`${C}`);  
        const info = await axios.get(DATA_URL[1]+`${response1.data[0].ed_class_academic_level}`);  
        if(info.data.length >= 1){ 
          MaxValue = info.data[0].ed_academic_level_avaliationtype_endat*1;
         }else{
          MaxValue = 0;
         }  
        const Marks = [];
        response.data.map((item, index)=>{
          Marks.push({ 
            index:index+1,
            id:item.ed_quarter_note_id,
            student:item.ed_quarter_note_studentcode,  
            mac:item.ed_quarter_note_mac,
            npp:item.ed_quarter_note_npp,
            npt:item.ed_quarter_note_npt,
            data:props.Data.data,
            quarter:Q,
            subject:S,
            class:C,
            action:true,
            MaxValue:MaxValue,
            status: FloorNumber(((item.ed_quarter_note_mac*1 + item.ed_quarter_note_npp*1 + item.ed_quarter_note_npt*1 ) / 3)) < (MaxValue/2) ? 1 : 0
         });
        });
  
        console.log(response.data);
        setMarksData(Marks);
       } catch (error) {
          console.log(error);
       }
      setLoaded(true); 
  }


 
  useEffect(()=>{  
    setTimeout(() => {
      loadData(
        CRValue("#quarterly_note_subClass").split("|")[0], 
        CRValue("#quarterly_note_subClass").split("|")[1], 
        CRValue("#quarterly_note_quarter")  
     );  
    }, 1000);
 },[]);
 
 const handleInput = (e)=>{   
    e.preventDefault();
    switch (e.target.id) {  
       case "quarterly_note_subClass": 
            loadData(
                e.target.value.split("|")[0], 
                e.target.value.split("|")[1], 
               CRValue("#quarterly_note_quarter")   
            ); 
       break; 
       case "quarterly_note_quarter": 
        loadData(
            CRValue("#quarterly_note_subClass").split("|")[0], 
            CRValue("#quarterly_note_subClass").split("|")[1], 
            e.target.value  
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
                    <div className="title"><h1>Lançar notas</h1></div> 
                    <div className="ed-flex">
                        <Form className="ed-flex" >
                          <Form.Select id="quarterly_note_subClass" onChange={handleInput} style={{minWidth:'300px'}}>
                              {props.Data.data.map((item, index)=>{
                                  return(<option value={item.ed_tch_subject_class + "|"+ item.ed_tch_subject_code}> 
                                      Turma - <GetClasstitle_byclass ID={item.ed_tch_subject_class} /> 
                                       ( <GetSubject ID={item.ed_tch_subject_code} /> )
                                   </option>)
                              })} 
                          </Form.Select>
                          <div className="ml-2">
                             <Form.Select id="quarterly_note_quarter" onChange={handleInput}>
                                  <option value="1">Iº Trimestre</option>
                                  <option value="2">IIº Trimestre</option>
                                  <option value="3">IIIº Trimestre</option>
                              </Form.Select>
                          </div> 
                          <Link>
                              <button className="btn bg-light ml-2 text-dark"><PrintOutlined/> Imprimir</button>
                          </Link>  
                      </Form> 
                       <div className="ml-2">
                          <QuarterlyNotesModal data={props.Data.data} />
                       </div>
                    </div>
                </div>
            </Box>
         </div>
         <div className="table-box">
            {load ?
             <TableGrid 
                  TableHead={columns}
                  TableBody={MarksData} 
                  TableHeight={420}
                  TableTitle={`Notas por turma / disciplina `}
                  TableBtn={<button className="btn table-btn-small el-refresh-list bg-main-light  ml-2"
                  onClick={()=> loadData(
                    CRValue("#quarterly_note_subClass").split("|")[0], 
                    CRValue("#quarterly_note_subClass").split("|")[1], 
                    CRValue("#quarterly_note_quarter")  
                 )}><Refresh/></button>}
                />
                :
                <>
                    <div className="d-none">*</div>
                    <TableGrid 
                      TableHead={columns}
                      TableBody={[]} 
                      TableHeight={420}
                      TableTitle={`Notas por turma / disciplina `}
                      TableBtn={<button className="btn table-btn-small el-refresh-list bg-main-light  ml-2"
                      onClick={()=> loadData(
                        CRValue("#quarterly_note_subClass").split("|")[0], 
                        CRValue("#quarterly_note_subClass").split("|")[1], 
                        CRValue("#quarterly_note_quarter")  
                     )}><Refresh/></button>}
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
   min-height:100px;
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


export default TeacherStudentMarksTabItem