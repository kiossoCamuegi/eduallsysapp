
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Hoot from '../General/components/Hoot';
import GetPicture from '../General/components/GetPicture';
import NumberToPrice from '../General/components/NumberToPrice';
const TABLEURL = Hoot()+"eduallstudentsapi/get/";


function MyImages() {
    const [data, setData] = useState([]); 
  
    async function loadData(){
        let number = 1525;
         let val = NumberToPrice(number); 
         console.log(val);
    }
  
    useEffect(()=>{
        loadData(); 
    },[]);




  return (
    <div className='pd-2'>
       {
        data.map((item, index)=>{
              return(
                  <div className='ed-flex'>
                      <img loading="lazy" role="presentation" src={GetPicture(item.ed_student_picture)}  style={{width:50,height:50}}  alt="" />
                     <h6>{ item.ed_student_name}</h6>
                  </div> 
              )
        })
       }
    </div>
  )
}

export default MyImages
