import React, {useState, useEffect, forwardRef, useImperativeHandle} from 'react' 
import axios from 'axios'; 
import Hoot from '../../../General/components/Hoot';  
import SmallStudentCard from './GridComponents/SmallStudentCard';
const URL = Hoot()+"eduallstudentsapi/get/";

 
const  SmallStudentsGrid = forwardRef((props, ref)=>{
    const [data, setData] = useState([]);
    const [FilterType, SetFilterType] = useState(1); 
    const [Loaded, SetLoaded] = useState(false);
    
 
    async function loadData(){
        const response = await axios.get(URL);
        setData(response.data);
    } 


    let filterValue = props.FilterByName ? props.FilterByName : '';
    let filterClassValue = props.FilterByClass ? props.FilterByClass : '';

    useImperativeHandle(ref, ()=>({
        ChangeFilter(e){
            SetFilterType(e);
        }
    }))
   

    useEffect(()=>{
        loadData(); 
        setTimeout(() => {
            SetLoaded(true);
        }, 1000);
    },[]);
    

    const FilterData = (data)=>{ 
        return data.filter((item)=>
          item.ed_student_name.toLowerCase().includes(filterValue) ||
          item.ed_student_email.toLowerCase().includes(filterValue) ||
          item.ed_student_phone.toLowerCase().includes(filterValue) ||
          item.ed_student_code.toLowerCase().includes(filterValue) ||
          item.ed_student_identityCard.toLowerCase().includes(filterValue) ||
          item.ed_student_address.toLowerCase().includes(filterValue) 
       ); 
    }

  


  return (<><SmallStudentCard GetData={props.GetData} data={FilterData(data)} /></>)
  
})
 

 
export default SmallStudentsGrid