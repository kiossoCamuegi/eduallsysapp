import React, {useState, useEffect} from 'react'
import  {  PrintOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Avatar } from '@mui/material';
import axios from 'axios';
import {  Edit} from '@mui/icons-material';
import Hoot from '../../../General/components/Hoot'; 
 import { GetAcademiclevel_byclass, GetClassroom_byclass, GetClasstitle_byclass, GetCourse_byclass, GetPeriod_byclass,   GetStudentParentsAvatars } from '../../../General/components/InstituteData';
import RandomColor from '../../../General/components/RandomColor';
import NewEnrollmentConfirmationModal from '../modal/NewEnrollmentConfirmationModal'; 
import { styled } from 'styled-components';
import ReactPaginate from 'react-paginate';
 
const URL = Hoot()+"eduallstudentsapi/get/";

 

function EnrollmentConfirmationGrid() { 
  const [data, setData] = useState([]); 


  async function loadData(){
      const response = await axios.get(URL);
       const Students = [];
        response.data.map((item, index)=>{ 
          if(item.ed_student_enrolled*1 <= 1){
            Students.push({
              student_id:item.ed_student_id,
              student_name:item.ed_student_name,
              student_picture:item.ed_student_picture,
              student_enrollment_date:item.ed_student_registerDate,
              student_class:item.ed_student_class,
              student_linkedin:item.ed_student_linkedin,
              student_email:item.ed_student_email,
              student_phone:item.ed_student_phone,
              student_facebook:item.ed_student_facebook,
            }
        )} 
       });
      setData(Students);  
  }

  useEffect(()=>{
      loadData(); 
  },[]);
  
 
  return (
      <div className="block">
        <div className="ed-edusers-cards">
           <PaginatedItems itemsPerPage={9} filterValue  data={data} /> 
      </div>
      <div className="ed-space">
            <div className="count"></div>
           <div className="pagination"></div>
      </div>
      <br />
      </div> 
  )
}

 
function Items({currentItems}){
  return( 
    <div className="ed-edusers-cards small-grids">  
     {currentItems &&
      currentItems.map((item)=>(
        <div className="pd-1">
        <article className="ed-eduser-box rm-cover">   
          <div className="ed-edusers-details">
              <div className="ed-flex">
                  <Link to={`/StudentInfo?id${item.student_id}`}>
                      <Avatar  className='avatar-img df' 
                        sx={{ width:80, height:80 }}  src={item.student_picture != ""  ?  Hoot()+item.student_picture : ""}  />
                  </Link>
                  <div className="block">
                      <Link to={`/StudentInfo?id${item.student_id}`}><h5>{item.student_name}</h5></Link>
                      <Link to={`/StudentInfo?id${item.student_id}`}>
                        <span>
                          <div className="d-flex">Número de matrícula: <div className="ml-2 text-main-light">{item.student_id}</div></div>
                        </span>
                      </Link>
                  </div>
              </div>
              <ul>
                  <li>Sala : <GetClassroom_byclass ID={item.student_class} /></li>
                  <li>Turma : <GetClasstitle_byclass ID={item.student_class} /></li>
                  <li>Classe : <GetAcademiclevel_byclass ID={item.student_class} /> </li>
                  <li>Periodo: <GetPeriod_byclass ID={item.student_class} /></li>
                  <li>Curso : <GetCourse_byclass ID={item.student_class} /> </li>
              </ul>
              <div className="action-buttons">
              <div className="ed-flex">
              <NewEnrollmentConfirmationModal title='Atualizar ' update='true' get={Hoot()+`eduallsinglestudentenrollment/get/${item.ed_enroll_confirmation_id}`}  
                  url={Hoot()+`eduallstudentenrollmentconfirmationupdate/update/${item.ed_enroll_confirmation_id}`} student_code={item.ed_enroll_confirmation_student_code}  toggle_btn={
                    <button  className="btn-circle  bg-success text-light">
                      <Edit />
                    </button>} /> 
                    <Link to={`/print_student_enrollment_confirmation/${item.student_id}`} >
                      <button  className="btn-circle bg-warning ml-2 text-light">
                          <PrintOutlined/>
                      </button>
                    </Link>
                </div>
              </div>
              <div className="ed-wrap"><span className="text-main-light">Data de confirmação :</span> {item.student_enrollment_date} </div>
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
      <div>
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

export default EnrollmentConfirmationGrid


/*
 


*/