import React, {useState, useEffect} from 'react'
import  {Email, Phone, LinkedIn, Facebook } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Avatar } from '@mui/material';
import axios from 'axios';
import { Delete, Description, Edit} from '@mui/icons-material';
import Hoot from '../../../General/components/Hoot'; 
import { GetAcademiclevel_byclass, GetClassroom_byclass, GetClasstitle_byclass, GetCourse_byclass, GetPeriod_byclass, GetStudentClassroom } from '../../../General/components/InstituteData';
import { styled } from 'styled-components';
import ReactPaginate from 'react-paginate';
 

const URL = Hoot()+"eduallstudentsapi/get/";


const walls = [
    require('../../../Assets/images/covers/student_covers/cv.jpg'), 
];
 
const PopRandomCover =()=>{
    return walls[Math.floor(Math.random() * 1)];
}



function StudentListGrid() { 
  const [data, setData] = useState([]);
  
  async function loadData(){
      try {
        const response = await axios.get(URL);
        setData(response.data);
      } catch (error) {
          console.log(error);
      }
  }

  useEffect(()=>{
      loadData(); 
  },[]);
  

  const Students = [];
  data.map((item, index)=>{ 
        Students.push(
            {
              student_id:item.ed_student_id,
              student_name:item.ed_student_name,
              student_picture:item.ed_student_picture,
              student_class:item.ed_student_class,
              student_linkedin:item.ed_student_linkedin,
              student_email:item.ed_student_email,
              student_phone:item.ed_student_phone,
              student_facebook:item.ed_student_facebook,
            }
        )
  });
 

  return (
      <div className="block">
        <div className="ed-edusers-cards">
        <PaginatedItems itemsPerPage={9}    data={Students} /> 
      </div>
      <div className="ed-space">
            <div className="count"></div>
           <div className="pagination"></div>
      </div>
      </div> 
  )
}



 
function Items({currentItems}){
    return( 
      <div className="ed-edusers-cards small-grids">  
       {currentItems &&
        currentItems.map((item)=>(
            <div className="pd-1">
            <article className="ed-eduser-box" >   
            <div className="cover">
                    <div className="cover-over"  style={{background:'rgba(0,0,0,0.5)'}}>
                    <div className="contacts">
                        <ol>
                            <li>{item.student_email !== "" ? <Link target='_blank' to={item.student_email}><Email/></Link> : ""}</li>
                            <li>{item.student_linkedin !== "" ? <Link target='_blank'  to={item.student_linkedin}><LinkedIn/></Link> : ""}</li>
                            <li>{item.student_phone !== "" ? <Link target='_blank' to={item.student_phone}><Phone/></Link> : ""}</li>
                            <li>{item.student_facebook !== "" ?  <Link target='_blank' to={item.student_facebook} ><Facebook/></Link> : ""}</li>
                        </ol>
                    </div>
                    </div> 
                    <img loading="lazy" role="presentation" className='' src={PopRandomCover()} style={{display:'block'}} alt="#" />
                </div>
           <div className="ed-edusers-details">
            <div className="ed-flex">
                <Link to={`/StudentInfo/${item.student_id}`}>  
                    <Avatar className="avatar-img df" sx={{ width:100, height:100 }}  src={item.student_picture !== ""  ?  Hoot()+item.student_picture : ""}  />
                </Link>
                <div className="block">
                    <Link to={`/StudentInfo/${item.student_id}`}><h5>{item.student_name}</h5></Link>
                    <Link to={`/StudentInfo/${item.student_id}`}>
                       <span>
                          <div className="d-flex">Número de matrícula: <div className="ml-2 text-main-light">{item.student_id}</div></div>
                      </span>
                   </Link>
                </div>
            </div>
            <ul>
                <li>Turma : <GetClasstitle_byclass ID={item.student_class} /></li>
                <li>Classe : <GetAcademiclevel_byclass ID={item.student_class} /> </li>
                <li>Periodo: <GetPeriod_byclass ID={item.student_class} /></li>
                <li>Curso : <GetCourse_byclass ID={item.student_class} /> </li>
                <li>Sala : <GetClassroom_byclass ID={item.student_class} /></li>
            </ul>
            </div> 
        </article>
        </div>
        ))
        }
     </div> 
    )
  }


function PaginatedItems({ itemsPerPage, data, filterValue}) {   
    const FilterData = (data)=>{  
          return data 
     }

    const [itemOffset, setItemOffset] = useState(0); 
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = FilterData(data).slice(itemOffset, endOffset);
    const pageCount = Math.ceil( FilterData(data).length / itemsPerPage); 
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % FilterData(data).length; 
      setItemOffset(newOffset);
    }; 
    return (
      <>
        <Items currentItems={currentItems} />
      <div className="ed-space mr-2">
        <div className='ml-2'> 
            <Title>{FilterData(data).length} items encomtrados na lista </Title>
         </div> 
        <div className='mr-2'>
        <div className="paginate box">
          <ReactPaginate
              breakLabel="..."
              nextLabel=" > "
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel=" < "
              renderOnZeroPageCount={null}
            />
         </div>
        </div>
      </div>
      </>
    );
  }


  const Title = styled.h3`
      font-size:18px;
      margin:0px;
  `;


export default StudentListGrid