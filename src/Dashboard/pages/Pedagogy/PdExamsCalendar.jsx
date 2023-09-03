import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components';
import ShedulerComponent from '../../../General/ShedulerComponent';
import NewExamModal from '../../components/modal/Pedagogy/NewExamModal';
import { Link } from 'react-router-dom';
import {BsListTask} from "react-icons/bs";
import axios from 'axios';
import Hoot from '../../../General/components/Hoot';
import moment from 'moment';
const TABLEURL = Hoot()+"eduallstudentexamcalendarget/get/"; 

function PdExamsCalendar() { 
    document.title = 'Calendário de provas'; 
    const [data, setData] = useState([]);
    const [load, setLoaded] = useState(false);
  
    async function loadData(){
      setLoaded(false);
        try {
            const response = await axios.get(TABLEURL); 
            const rows = []; 
            response.data.map((item, index)=>{  
              rows.push({
                   title:item.ed_subject_title,
                   start: moment(item.ed_student_exam_date).format("YYYY-MM-DD HH:mm:ss"),  
                   end:moment(item.ed_student_exam_date).format("YYYY-MM-DD HH:mm:ss"), //04:30 PM
                })
            }); 
            setData(rows); 
           setTimeout(() => {
              setLoaded(true);
           }, 100);  
        } catch (error) {
            
        }
    }
  
    useEffect(()=>{
      loadData(); 
    },[]);

    return (
      <div>
        <div className="ed-space">
          <div></div>
            <div className='ed-flex'> 
              <Link className='btn bg-green-light btn-icon' to='/pdg_exams'>
                  <BsListTask/>
              </Link>
               <div className='ml-2'><NewExamModal /></div>
            </div> 
        </div> 
        <Box className='mt-4'>
            <h1 className="title">Calendário de provas</h1>
             {load ? <ShedulerComponent data={data} /> : <ShedulerComponent data={[]} />  } 
        </Box>
      </div>
    )  
}

const Box = styled.div`
   width:100%; 
   border-radius:6px; 
   min-height:164px; 
   background:var(--ed-white);  
   box-shadow:var(--ed-shadow-df); 
   padding:20px; 

   h1.title{
    font-size: 18px;
    font-weight: 600;
    margin: 0px;
    margin-bottom:20px;
 }
 
`;

export default PdExamsCalendar
