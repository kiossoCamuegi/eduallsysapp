import { Avatar } from '@mui/material';
import axios from 'axios';
import React, { useEffect,  useImperativeHandle,  useState , forwardRef  } from 'react' 
import Hoot from '../../../General/components/Hoot';
import SwitchFromPages from '../../../General/components/SwitchFromPages';
import TableGrid from '../../../General/components/TableGrid';
import { GetAcademiclevelAVLendValueStatus, GetAcademiclevel_avlEnValue } from '../../../General/components/InstituteData';
import FloorNumber from '../../../General/components/FloorNumber';

const TABLEURL = [
  Hoot()+"eduallstudentsapi/get/",
  Hoot()+"eduallgetstudentsbyclass/", 
  Hoot()+"eduallsinglequarterlynotebyqrtsubstdqrttyp/get/",
  Hoot()+"eduallsingleclassapi/get/"
];

const columns = [   
    {
      field: 'index',
      headerName: 'Posição',
      width:130,  
    },  
    {
      field: 'position',
      headerName: 'Media final',
      width:120, 
      cellRenderer:(props)=>{
        return  <GetAcademiclevelAVLendValueStatus  class={props.data.studentClass} color 
        score={FloorNumber(props.data.studentFinalScore/props.data.studentTotalSubject)} />
      } 
    }, 
    {
      field: 'name',
      headerName: 'Nome',
      width:350, 
      cellRenderer:(props)=>{
        return    <SwitchFromPages link={`studentinfo/${props.data.studentId}`}
        menu='3'  menu_item='17'  toggle_btn={
        <div className='ed-flex'>
          <Avatar alt={props.data.studentName}   src={props.data.studentPicture != ""  ?  props.data.studentPicture : ""} /> 
          <span className='ml-2'>{props.data.studentName}</span>
        </div>
      } />
     }
    }, 
    {
      field: 'status',
      headerName: 'Situação',
      width:200, 
      cellRenderer:(props)=>{
        return  <GetAcademiclevelAVLendValueStatus  class={props.data.studentClass} 
        score={FloorNumber(props.data.studentFinalScore/props.data.studentTotalSubject)} />
      } 
     } 
];
  

const PdMarksRankingTable = forwardRef((props,ref)=> {
   const [data, setData] = useState([]); 
    const [load, setLoaded] = useState(false);
    const Quarter = props.Filters.quarter ? props.Filters.quarter : 0; 
    const Class = props.Filters.class ? props.Filters.class : 0; 
    const [Total, setTotal] = useState(0);

    async function loadData(){
      let NewData = []; 
      const DT = []
      setLoaded(true);
      const GetData = (response)=>{
        console.log("total estudantes = ", response.data.length); 
        if(response.data.length > 0){
        response.data.map((item, index)=>{
          const getMarks = async()=> {
           try {
            const response2 = await axios.get(TABLEURL[3]+`${item.ed_student_class}`);

            //console.log("we found class  = ", response2.data.length);
 
            if(response2.data.length >= 1){
              const Subjects = response2.data.length >= 1 ? response2.data[0].ed_class_subjects.split(',')  : []; 
 
               //console.log("Total subjects founded = ", Subjects.length);
               NewData.push({
                 studentId:item.ed_student_id, 
                 studentName:item.ed_student_name, 
                 studentPicture:Hoot()+item.ed_student_picture, 
                 studentClass:item.ed_student_class,
                 maxValue:null,
                 studentTotalSubject:Subjects.length,
                 studentMTS:[],
                 studentFinalScore:0
              });
                Subjects.map((sub)=>{
                  const getSubjects = async()=>{
                    const Marks = await axios.get(TABLEURL[2]+`${sub},${item.ed_student_id},${Quarter},${item.ed_student_class}`); 
 
 
                     //console.log("Marks founded = ", Marks.data.length);
 
                    const GetstudentMT = (n1, n2, n3)=>{   
                      let res = ""; 
                      const total = ""+(((n1*1) + (n2*1) + (n3*1)) / 3)+"".split('');
                        for(let i = 0; i < total.length; i++) {
                            if(i <= 4)  res += total[i];
                        } 
                      return FloorNumber(res); 
                    }
                    let MT = 0;
                    if(Marks.data.length >=1){ 
                        Marks.data.map((SCORE)=>{
                             MT = GetstudentMT(SCORE.ed_quarter_note_mac, SCORE.ed_quarter_note_npp, SCORE.ed_quarter_note_npt);
                             for (let i = 0; i < NewData.length; i++) {
                               if(NewData[i].studentId === item.ed_student_id){
                                   NewData[i].studentMTS.push({subject:MT, type:true});
                               }  
                             } 
                        });
                    }else{
                     for (let i = 0; i < NewData.length; i++){
                       if(NewData[i].studentId === item.ed_student_id){
                           NewData[i].studentMTS.push({subject:0, type:false});
                       }  
                     }  
                    }  
 
                    for(let i = 0; i < NewData[i].length; i++) {
                     let res = 0;
                        for (let k = 0; k <  NewData[i].studentMTS.length; k++) { 
                            res += NewData[i].studentMTS[k].subject*1;
                        }
                        NewData[i].studentFinalScore  = res;
                    }   
                     
                     NewData.sort((a, b) => {
                         return a.studentFinalScore - b.studentFinalScore;
                     });
 
                      
                     NewData.map((N, I)=>{
                       DT.push({
                           index:I+1,
                           studentId:N.studentId, 
                           studentName:N.studentName, 
                           studentPicture:N.studentPicture, 
                           studentClass:N.studentClass,
                           maxValue:N.maxValue,
                           studentTotalSubject:N.studentTotalSubject,
                           studentMTS:N.studentMTS,
                           studentFinalScore:N.studentFinalScore
                       });  
 
                       if(I === NewData.length-1){
                          setLoaded(false);   
                       }
                     });  
                     
                  }
                  getSubjects();
                }); 
              } 
           } catch (error) {
              console.clear();
              console.log(error);
              setLoaded(false);
           }
          }
         getMarks(); 
         if(index === response.data.length - 1){
          setData(DT);
          setTotal(DT.length);  
          setTimeout(() => { 
            setLoaded(false);     
            }, 500);
          } 
        }); 
        }else{
          setLoaded(false);
        }  
      }
       
     

        try {
          console.log("type =  ", props.Filters.type)
         if((props.Filters.type ? props.Filters.type : 0)*1 === 0){
          const response = await axios.get(TABLEURL[0]); 
          GetData(response);  
         }else{
           if(Class*1 >= 1){
            const response = await axios.get(TABLEURL[1]+Class*1);  
            GetData(response);
           } 
         }
        } catch (error) {
           console.log(error)
        } 
    }

    
  useImperativeHandle(ref, ()=>({
    RunGetNotes(){ 
       loadData(); 
    }
  }))


    
    useEffect(()=>{ 
      loadData(); 
      console.log(data);
    },[]);
   
     
    return (
      <div>
        <h1 className='d-none'>{Total}</h1>
        {load === true ?   
         <> 
         <TableGrid
             TableHead={columns}
             TableBody={[]} 
             TableTitle='Ranking De Notas'
         />
         </>
        : 
          <> 
          <TableGrid
              TableHead={columns}
              TableBody={data} 
              TableTitle='Ranking De Notas'
          />
          </>
          
        }
    </div>
    ) 
      

})

export default PdMarksRankingTable