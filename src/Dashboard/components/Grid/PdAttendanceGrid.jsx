import { PreviewOutlined, Search } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap';
import { styled } from 'styled-components';
import Hoot from '../../../General/components/Hoot';
import axios from 'axios';
import { ClassDataOptions, GetAcademicYear_byclass, GetAcademiclevel_byclass, GetClassroom_byclass, GetClasstitle_byclass, GetCourse_byclass, GetEmployeAttendanceValue, GetJobTitle, GetPeriod_byclass } from '../../../General/components/InstituteData';
import ReactPaginate from 'react-paginate';
import SwitchFromPages from '../../../General/components/SwitchFromPages';
import CalcAgeByBirthday from "../../../General/components/CalcAgeByBirthday";
import {BsCalendarDay} from "react-icons/bs";
import { Add } from '@material-ui/icons';

const TABLEURL = [
    Hoot()+"eduallstudentsapi/get/",
    Hoot()+"eduallemployeesget/get/"
];


function PdAttendanceGrid(props){
     const [CurrentItem, SetCurrentItem] = useState(0);

  return (
     <Container>
           <div className="grid-header"> 
                <div className="ed-space">
                    <div>
                       <h1>Controle de faltas</h1>
                    </div>
                    <div>
                        <Form>
                            <Form.Select onChange={(e)=>SetCurrentItem(e.target.value*1)}>
                                <option value="0" selected>Estudantes</option>
                                <option value="1">Funcionários</option>
                            </Form.Select>
                        </Form>
                    </div>
                </div>
           </div>
           <div className="grid-body"> 
               {CurrentItem === 0 ? <PdAttendanceStudents /> : <></>}
               {CurrentItem === 1 ? <PdAttendanceEmployee /> : <></>}    
           </div>
     </Container>
  )
}



function PdAttendanceStudents(props){ 
   const [data, setData] = useState([]);
   const [load, setLoaded] = useState(false);
   const [filterValue, SetFilterValue] = useState(''); 
   const [ClassValue, SetClassValue] = useState(""); 

  async function loadData(){
    setLoaded(false);
      const response = await axios.get(TABLEURL[0]); 
      const rows = [];
      response.data.map((item, index)=>{  
        rows.push({
          index:index+1,
          id:item.ed_student_id,
          picture:Hoot()+item.ed_student_picture,
          name:item.ed_student_name,  
          age:CalcAgeByBirthday(item.ed_student_birthday)+ " anos",  
          identityCard:item.ed_student_identityCard,
          class:item.ed_student_class.toString(),
          cicle:'',
          status:item.ed_student_status,
          gender:item.ed_student_gender, 
          action:'',  
       }) 
    }); 
      setData(rows);
     setTimeout(() => {
       setLoaded(true);
     }, 200); 
  }

  const ChangeFilterValue = (e)=>{
     SetFilterValue(e);
  }

  useEffect(()=>{
      loadData(); 
  },[]);

    return(
     <section>
        <div className="filters">
          <Form> 
              <Form.Group>
                    <div className="ed-flex m0 fill">
                     <Search/>
                        <div className="block ml-2 col"> 
                            <Form.Control  type="text" onChange={(e)=>ChangeFilterValue(e.target.value)} placeholder="Escreva qualquer coisa"  autoFocus /> 
                        </div>
                        <div className="block ml-2"> 
                            <Form.Select select onChange={(e)=>ChangeFilterValue(e.target.value)}> 
                                  <ClassDataOptions />
                             </Form.Select> 
                        </div> 
                    </div> 
               </Form.Group>  
            </Form>
        </div> 
        <div className="block mt-2">
           <PaginatedItems itemsPerPage={9} filterValue={filterValue}  data={data} /> 
        </div>  
      </section>
    )
}



function PdAttendanceEmployee(props){ 
   const [data, setData] = useState([]);
   const [load, setLoaded] = useState(false);
   const [filterValue, SetFilterValue] = useState(''); 
   const [ClassValue, SetClassValue] = useState(""); 

  async function loadData(){
    setLoaded(false);
      const response = await axios.get(TABLEURL[1]); 
      const rows = [];
      response.data.map((item, index)=>{  
        rows.push({
          index:index+1,
          id:item.ed_employee_id,
          picture:Hoot()+item.ed_employee_picture,
          name:item.ed_employee_name,  
          age:CalcAgeByBirthday(item.ed_employee_birthday)+ " anos",  
          identityCard:item.ed_employee_identityCard, 
          status:item.ed_employee_status,
          gender:item.ed_employee_gender, 
          charge:item.ed_employee_charge,
          action:'',  
       }) 
    }); 
      setData(rows);
     setTimeout(() => {
       setLoaded(true);
     }, 200); 
  }

  const ChangeFilterValue = (e)=>{
     SetFilterValue(e);
  }

  useEffect(()=>{
      loadData(); 
  },[]);

    return(
      <>
        {load  ?
         <section>
         <button onClick={loadData} className="el-refresh-list d-none  ">refresh</button>
           <div className="filters">
             <Form> 
                 <Form.Group>
                       <div className="ed-flex m0 fill">
                        <Search/>
                           <div className="block ml-2 col"> 
                               <Form.Control  type="text" onChange={(e)=>ChangeFilterValue(e.target.value)} placeholder="Escreva qualquer coisa"  autoFocus /> 
                           </div>
                           <div className="block ml-2"> 
                               <Form.Select select onChange={(e)=>ChangeFilterValue(e.target.value)}> 
                                     <ClassDataOptions />
                                </Form.Select> 
                           </div> 
                       </div> 
                  </Form.Group>  
               </Form>
           </div> 
           <div className="block mt-2">
              <PaginatedItems2 itemsPerPage={9} filterValue={filterValue}  data={data} /> 
           </div>  
         </section> 
        : <></> 
        }
      </>
    )
}
 
function Items({currentItems}){
    return( 
      <div className="ed-edusers-cards">  
       {currentItems &&
        currentItems.map((item)=>(
            <div className="card-box">
            <div className="ed-space">
            <div className="ed-flex">
                  <div>
                    <SwitchFromPages link={`studentinfo/${item.id}`}
                      menu='3'  menu_item='17'  toggle_btn={
                        <Avatar className='df' sx={{width:120,height:120}} src={item.picture} alt={item.name} />    
                     } /> 
                  </div>
                  <div className="ed-block ml-2">
                      <div className="ed-flex">
                        <SwitchFromPages link={`studentinfo/${item.id}`}
                         menu='3'  menu_item='17'  toggle_btn={<h4>{item.name}</h4>} />
                      </div>
                      <div className="ed-wrap">
                          <div className="mr-2 ed-flex text-secondary mt-2"><div className="dot bg-black mr-1"></div>Turma - <GetClasstitle_byclass ID={item.class} /></div>
                          <div className="mr-2 ed-flex text-secondary mt-2"><div className="dot bg-black mr-1"></div>Sala - <GetClassroom_byclass ID={item.class} /></div>
                          <div className="mr-2 ed-flex text-secondary mt-2"><div className="dot bg-black mr-1"></div>Curso - <GetCourse_byclass ID={item.class} /></div>
                          <div className="mr-2 ed-flex text-secondary mt-2"><div className="dot bg-black mr-1"></div>Classe - <GetAcademiclevel_byclass  ID={item.class} /></div>
                          <div className="mr-2 ed-flex text-secondary mt-2"><div className="dot bg-black mr-1"></div>Periodo - <GetPeriod_byclass ID={item.class} /></div>
                          <div className="mr-2 ed-flex text-secondary mt-2"><div className="dot bg-black mr-1"></div>Anó academico - <GetAcademicYear_byclass ID={item.class} /></div>
                      </div>
                     <div className="ed-flex mt-2">
                        <div className="count badge bg-danger">
                              Número de faltas - <strong>89</strong>
                          </div>
                          <div className="count badge bg-success ml-2">
                              Número de presenças -  <strong>903</strong>
                          </div>
                     </div>
                  </div>
              </div>
               <div className="btn-actions ed-flex">
                   <button className="btn btn-circle bg-warning"> 
                      <PreviewOutlined />
                   </button>
               </div>
            </div>
          </div>
        ))
        }
     </div> 
    )
  }


  function Items2({currentItems}){
   return( 
     <div className="ed-edusers-cards">  
      {currentItems &&
       currentItems.map((item)=>(
           <div className="card-box">
           <div className="ed-space">
           <div className="ed-flex">
                 <div>
                   <SwitchFromPages link={`studentinfo/${item.id}`}
                     menu='3'  menu_item='17'  toggle_btn={
                     <div className="avatar-container">
                        <Avatar className='df' sx={{width:120,height:120}} src={item.picture} alt={item.name} />  
                        <div className="status bg-green"></div> 
                    </div>
                    } /> 
                 </div> 
                 <div className="ed-block ml-2">
                     <div className="ed-flex">
                       <SwitchFromPages link={`studentinfo/${item.id}`}
                        menu='3'  menu_item='17'  toggle_btn={<h4>{item.name}</h4>} />
                     </div>
                     <div className="mr-2 ed-flex text-secondary mt-2"><GetJobTitle ID={item.charge} /></div>
                    <div className="ed-flex mt-2">
                       <div className="count badge bg-danger">
                             Número de faltas - <strong><GetEmployeAttendanceValue Type={1} ID={item.id} /> </strong>
                         </div>
                         <div className="count badge bg-success ml-2">
                             Número de presenças -  <strong><GetEmployeAttendanceValue Type={0} ID={item.id} /></strong>
                         </div>
                    </div>
                 </div>
             </div>
              <div className="btn-actions ed-flex">
                  <button className="btn btn-circle bg-main-light"> 
                     <Add />
                  </button>
                  <button className="btn ml-2 btn-circle bg-warning"> 
                     <PreviewOutlined />
                  </button>
              </div>
           </div>
           <div className="ed-block"> 
               <h5>
               <div className="ed-flex subtitle mt-4">
                  <BsCalendarDay/>  <div className="ml-2">Horarios de trabalho</div>
               </div>
               </h5>
               <div className="ed-wrap mt-2">
                   {[1,2,3,4].map((timing, tmIndex)=>(
                       <div className="tm mr-2 mt-2" key={tmIndex} >Seg Fr - 10:30 / 12:30</div>
                   ))}
               </div>
           </div>
         </div>
       ))
       }
    </div> 
   )
 }



  function PaginatedItems({ itemsPerPage, data, filterValue}) {   
    const FilterData = (data)=>{  
          return data.filter((item)=>
                item.name.toLowerCase().includes(filterValue) ||
                item.gender.toLowerCase().includes(filterValue) ||
                item.age.toLowerCase().includes(filterValue) ||
                item.identityCard.toLowerCase().includes(filterValue) 
          ); 
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
        <div className="paginate">
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


   
  function PaginatedItems2({ itemsPerPage, data, filterValue}) {   
   const FilterData = (data)=>{  
         return data.filter((item)=>
               item.name.toLowerCase().includes(filterValue) ||
               item.gender.toLowerCase().includes(filterValue) ||
               item.age.toLowerCase().includes(filterValue) ||
               item.identityCard.toLowerCase().includes(filterValue) 
         ); 
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
       <Items2 currentItems={currentItems} />
     <div className="ed-space mr-2">
       <div className='ml-2'> 
           <Title>{FilterData(data).length} items encomtrados na lista </Title>
        </div> 
       <div className='mr-2'>
       <div className="paginate">
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

const Container = styled.div`
border-radius:6px;  
margin-bottom:50px !important;
background:var(--ed-white);  
box-shadow:var(--ed-shadow-df);
margin-top:30px;

   .grid-header{
      padding:20px;
      background:#f8f8f8; 
      border-bottom:1px solid var(--ed-white-smoke);
     h1{
        font-size: 18px;
        font-weight: 600;
        margin: 0px;
      }
   }

   .grid-body{
      width:100%; 
    
    .filters{
        padding:10px 20px; 
        border-bottom:1px solid var(--ed-white-smoke);
    }


 

       .card-box{
          width:100%;
          padding:20px;
          border-bottom:1px solid var(--ed-white-smoke);

          .ed-space{
             align-items:flex-start;
           }

           h4{
            font-size: 18px;
            font-weight: 600;
            margin: 0px;
           }

           .MuiAvatar-root {
              font-size:30px !important;
           }

           .avatar-container{
               position:relative;
               width:120px;
               height:120px;  
      
               .status{
                  width:22px;
                  height:22px;
                  position:absolute;
                  top:7px;
                  right:5px;
                  border:4px solid var(--ed-white);
                  border-radius:100%;
                  box-shadow:var(--ed-shadow-df);
               }
         }
    
    
         .tm{
             padding:10px 20px;
             margin-right:15px;
             border-radius:6px;
             cursor:pointer;
             transition:all 1s ease-in-out;
             border:1px solid var(--ed-silver-light);
         }

           .ed-wrap{
              max-width:950px;
               .dot{
                  width:6px;
                  height:6px;
                  border-radius:100%;
               }
           }


       }
   }



     
`;

export default PdAttendanceGrid
