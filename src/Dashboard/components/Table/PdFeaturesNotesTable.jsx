
import React , {useState, useEffect, forwardRef, useImperativeHandle} from 'react' 
import axios from 'axios'
import Hoot from '../../../General/components/Hoot';
import { Delete,  Edit, Refresh  } from '@mui/icons-material';
import DeleteModal from '../elements/DeleteModal';
import NewYearModal from '../modal/NewYearModal';
import TableGrid from '../../../General/components/TableGrid';
import SwitchFromPages from '../../../General/components/SwitchFromPages';
import { Avatar } from '@mui/material';
import FloorNumber from '../../../General/components/FloorNumber';
import { GetSchoolNoteExam, GetSchoolNoteExamResult, GetSchoolNoteFeatured } from '../../../General/components/InstituteData';
import NewStudentFeaturedNotesModal from '../modal/NewStudentFeaturedNotesModal';

const TABLEURL = [
  Hoot()+"eduallsinglequarterlynotebyqrtsubstdqrttyp/get/",
  Hoot()+"eduallgetstudentsbyclass/",
  Hoot()+'eduallsingleclassapi/get/',
  Hoot()+'eduallsingleacademiclevelsapi/get/',
  Hoot()+"eduallgetstudentexamscorebyclassubject/",
];

const columns = [ 
  { 
    field: 'index',
    headerName: 'Nº', 
    width: 90 , 
    resizable: true, 
   },
   { 
       field: 'student_name',
       headerName: 'Nome do estudante',  
       width:400 , 
       resizable: true, 
       cellRenderer:(props)=>{
           return    <SwitchFromPages link={`studentinfo/${props.data.student_id}`}
           menu='3'  menu_item='17'  toggle_btn={
           <div className='ed-flex'>
             <Avatar alt={props.data.student_name}   src={props.data.student_picture !== ""  ?  props.data.student_picture : ""} /> 
             <span className='ml-2'>{props.data.student_name}</span>
           </div>
         } />
        }
   }, 
   { 
    field: 'student_mfd',
    headerName: 'MFD',  
    width:80, 
    resizable: true, 
    cellRenderer:(props) =>{
       return <span className='text-danger'>{props.data.student_mfd}</span>
    }
   }, 
    { 
      field: 'examscore',
      headerName: 'Nota do exame',  
      width:160, 
      resizable: true, 
      cellRenderer:(props)=>{
         return <>
           {props.data.student_examscore_null === true ?  <span className="text-main-light">#</span> :
              <>
               {(props.data.student_examscore < (props.data.avaliation_value/2))  ?
                 <span className="text-danger">{props.data.student_examscore}</span> :
                 <span className="text-success">{props.data.student_examscore}</span>
                }
              </> 
           } 
         </>
      }
     }, 
     { 
      field: 'result',
      headerName: 'Media final (MF)',  
      width:150, 
      resizable: true, 
      cellRenderer:(props)=>{
        return <GetSchoolNoteExamResult  class={props.data.current_class} subject={props.data.current_subject} student={props.data.student_code } />
      }
     },
     { 
        field: 'featurescore',
        headerName: 'Nota do recurso', 
        width:160,  
        resizable: true, 
       cellRenderer:(props)=>{
         return  <GetSchoolNoteFeatured  class={props.data.current_class} subject={props.data.current_subject} student={props.data.student_code } />
      }
    }, 
    {
      field: 'action',
      headerName: 'Ação',  
       resizable: true, 
       cellRenderer:(props) => { 
        return  <div className="ed-flex">
          {props.data.student_examscore_null === true   ?
            <button disabled className="btn-circle bg-secondary text-light">
                <Edit/>
            </button> 
            :
          <NewStudentFeaturedNotesModal data={{subject:props.data.current_subject, student:props.data.student_code, class:props.data.current_class, maxvalue:props.data.avaliation_value}}  
            get={Hoot()+`eduallgetstudentfeaturedscorebyclassubject/${props.data.current_subject},${props.data.student_code},${props.data.current_class}`}  
            url={Hoot()+`eduallstudentfeaturedscoreupdate/update/`}  toggle_btn={
            <button className="btn-circle bg-success text-light">
                <Edit/>
            </button> 
            }/> 
          }
        </div>;
      }
    } 
  ];


const PdFeaturesNotesTable  = forwardRef((props,ref)=>{
  const [Data, setData] = useState([]);
  const [load, setLoaded] = useState(false);
  const Class = props.ClassId ? props.ClassId : 0;
  const Subject = props.SubjectId ? props.SubjectId : 0;  


 const OrderByName = (a, b)=>{
  if(a.student_name < b.student_name)  return -1;
  if(a.student_name > b.student_name)  return 1;
  return 0;
 }

  async function loadData(){ 
     try {

         setLoaded(false);
         let rows = []; 
         let i = 1;
         let tt = 0;
         let MAXVALUE = null; 
         
         //get academiclevel avaliation value 
          if(Class !== null && Class > 0 && Subject > 0 && Subject !== null){
            const response0 = await axios.get(TABLEURL[2]+`${Class}`);   
          if(response0.data.length >= 1){
              const info = await axios.get(TABLEURL[3]+`${response0.data[0].ed_class_academic_level}`); 
              const data = info.data; 
             if(data.length >= 1){
                MAXVALUE =  data[0].ed_academic_level_avaliationtype_endat ? 
                data[0].ed_academic_level_avaliationtype_endat*1 : 0;


                if(data[0].ed_academic_level_forExam*1 === 1 ){
                  const response = await axios.get(TABLEURL[1]+Class);   
                  response.data.map((student, index)=>{ 
                    const getStudentData = async(student, index)=>{
                          try {
                           const response1 = await axios.get(TABLEURL[0]+`${Subject},${student.ed_student_id},${1},${Class}`); 
                           const response2 = await axios.get(TABLEURL[0]+`${Subject},${student.ed_student_id},${2},${Class}`); 
                           const response3 = await axios.get(TABLEURL[0]+`${Subject},${student.ed_student_id},${3},${Class}`); 
     
                           let data = [{
                               q1:response1.data,
                               q2:response2.data,
                               q3:response3.data
                           }];  
                  
                            if(data.length >= 1){
                              let n1, n2, n3 = 0 
                                  
                            data[0].q1.length >= 1 ? n1 = GetstudentMT(data[0].q1[0].ed_quarter_note_mac, data[0].q1[0].ed_quarter_note_npp, data[0].q1[0].ed_quarter_note_npt) : n1 = 0;
                            data[0].q2.length >= 1 ? n2 = GetstudentMT(data[0].q2[0].ed_quarter_note_mac, data[0].q2[0].ed_quarter_note_npp, data[0].q2[0].ed_quarter_note_npt) : n2 = 0;
                            data[0].q3.length >= 1 ? n3 = GetstudentMT(data[0].q3[0].ed_quarter_note_mac, data[0].q3[0].ed_quarter_note_npp, data[0].q3[0].ed_quarter_note_npt) : n3 = 0;
                  
                            let n = ""+(((n1 !== NaN ? n1*1 : 0) + (n2 !== NaN ? n2*1 : 0) + (n3 !== NaN ? n3*1 : 0)) / 3)+"".split("");
                            let res = "";
                            for(let i = 0; i < n.length; i++){if(i <= 2)  res += n[i];}  
                  
                  
                            if(res*1  < (MAXVALUE / 2)){ 
                              const response4 = await axios.get(TABLEURL[4]+`${Subject},${student.ed_student_id}},${Class}`); 
                               let ExamScore = response4.data.length >= 1  ? response4.data[0].ed_student_exam_score : 0;
                               let ExamScoreStatus = response4.data.length >= 1  ? false : true;
                               let finalResult = FloorNumber((res*1 * 0.4) + (ExamScore * 0.6))
 

                              if(finalResult < (MAXVALUE / 2)){ 
                                rows.push({
                                  index:i++,
                                  avaliation_value:MAXVALUE ,
                                  current_class:Class*1,
                                  current_subject:Subject*1,
                                  student_code:student.ed_student_id,
                                  student_name:student.ed_student_name,
                                  student_picture:Hoot()+student.ed_student_picture,
                                  student_mfd:res*1,
                                  student_examscore_null:ExamScoreStatus, 
                                  student_examscore:ExamScore, 
                                }); 
                              } 
                            } 
                            tt++;

                             if(response.data.length === tt){
                               setData(rows.sort(OrderByName));  
                               setLoaded(true);
                             } 
     
                           }
                          } catch(error){
                               console.log(error);
                               setLoaded(true);
                          }
                   }
                    getStudentData(student, index);


                     
                   });  
                   
                   
               
                } 

             }
            } 
          }
           /// end
        

     } catch (error) {
          console.log(error);
          setLoaded(true);
     }
  };

   const GetstudentMT = (n1, n2, n3)=>{   
      let res = ""; 
      const total = ""+(((n1*1) + (n2*1) + (n3*1)) / 3)+"".split('');
        for(let i = 0; i < total.length; i++) {
            if(i <= 3)  res += total[i];
        } 
      return FloorNumber(res); 
   } 


   
useImperativeHandle(ref, ()=>({
  RunGetNotes(){
    console.log("printing the class code : "+ Class);
    loadData();
  }
}))



useEffect(()=>{
 loadData(); 
},[]);


if(load){ 
  return (
  <div>
    <TableGrid
        TableHead={columns}
        TableBody={Data} 
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
        TableBtn={<button className="btn table-btn-small el-refresh-list bg-main-light  ml-2" onClick={loadData}><Refresh /></button>}
    />
</div>
)
}
})


export default PdFeaturesNotesTable
