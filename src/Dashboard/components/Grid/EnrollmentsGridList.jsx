import React, {useState, useEffect} from 'react'
import  {Email, Phone, LinkedIn, Facebook, PrintOutlined, Refresh, Search } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Avatar, AvatarGroup } from '@mui/material';
import axios from 'axios';
import { Delete, Description, Edit} from '@mui/icons-material';
import Hoot from '../../../General/components/Hoot'; 
import { GetAcademiclevel_byclass, GetClassroom_byclass, GetClasstitle_byclass, GetCourse_byclass, GetPeriod_byclass, GetServicePrice, GetStudentClassroom, GetStudentParentsAvatars } from '../../../General/components/InstituteData';
import { Badge, Form } from 'react-bootstrap';
import RandomColor from '../../../General/components/RandomColor'; 
import RandomAvatarColor from '../../../General/components/RandomAvatarColor';
import SupervisedUserCircleOutlinedIcon from '@mui/icons-material/SupervisedUserCircleOutlined'; 
import SwitchFromPages from '../../../General/components/SwitchFromPages';
import NewEnrollmentConfirmationModal from '../modal/NewEnrollmentConfirmationModal';
import ReactPaginate from 'react-paginate';
import { styled } from 'styled-components';
import moment from 'moment';

const URL = Hoot()+"eduallstudentenrollments/get/";
const walls = [
    require('../../../Assets/images/covers/student_covers/1.jpg'),
    require('../../../Assets/images/covers/student_covers/2.jpg'),
    require('../../../Assets/images/covers/student_covers/3.jpg'),
    require('../../../Assets/images/covers/student_covers/4.jpeg'),
];
  


function EnrollmentsGridList() {
    const [data, setData] = useState([]);
    const [Loaded, setLoaded] = useState(false);
    const [filterValue, SetFilterValue] = useState(''); 
  
    async function loadData(){
        const response = await axios.get(URL);
        if(response.data.length >= 1){
            const response = await axios.get(URL);
            const Students = [];
             response.data.map((item, index)=>{  
                  Students.push(item);  
            }); 
            setData(Students);
            setLoaded(true); 
        } 
    }
  
    useEffect(()=>{
        loadData(); 
        setTimeout(() => {
            loadData(); 
        }, 1000);
    },[]);

 
  
    const Students = [];
    data.map((item, index)=>{  
       Students.push({item});
    }); 

 

    return (
       <div>
         <div className="ed-space mt-4">
            <div className='col-lg-4'>
            <Form className='col'>
                <div className="search-box ">
                <Form.Group>
                    <div className="ed-flex m0 fill">
                    <Search/>
                        <div className="block col  ml-2"> 
                            <Form.Control onChange={(e)=>SetFilterValue(e.target.value)} type="text"  placeholder="Escreva qualquer coisa"  autoFocus /> 
                        </div> 
                    </div> 
                </Form.Group> 
                </div>
            </Form>
            </div>
            <div><button className="btn table-btn-small el-refresh-list bg-main-light  ml-2" onClick={loadData}><Refresh /></button></div> 
        </div> 
        <div className="block mt-2">
           <PaginatedItems itemsPerPage={9} filterValue={filterValue}  data={data} /> 
        </div> 
        <br />
       </div>

    )
}


 
function Items({currentItems}){
    return( 
      <div className="ed-edusers-cards">  
       {currentItems &&
        currentItems.map((item)=>(
            <div className="pd-1" key={item.ed_student_id}>
              <article className="ed-eduser-box rm-cover">   
              <div className="ed-edusers-details">
                  <div className="ed-flex">
                  <SwitchFromPages link={`studentinfo/${item.ed_student_id}`}
                      menu='3'  menu_item='17'  toggle_btn={
                        <Avatar  className='avatar-img df' alt={item.ed_student_name}
                        sx={{ width:100, height:100 }}  src={Hoot()+item.ed_student_picture}  />
                      } 
                      />
                      <div className="block">
                      <SwitchFromPages link={`studentinfo/${item.ed_student_id}`}
                       menu='3'  menu_item='17'  toggle_btn={
                        <h5>{item.ed_student_name}</h5> 
                       }/> 
                          <Link to="/StudentInfo"><span className="text-primary-light">Nº de matrícula : {item.ed_student_id} </span></Link>
                      </div>
                  </div>
                  <ul>
                      <li>Sala : <GetClassroom_byclass ID={item.ed_enrollment_class} /></li>
                      <li>Turma : <GetClasstitle_byclass ID={item.ed_enrollment_class} /></li>
                      <li>Classe : <GetAcademiclevel_byclass ID={item.ed_enrollment_class} /> </li>
                      <li>Periodo: <GetPeriod_byclass ID={item.ed_enrollment_class} /></li>
                      <li>Curso : <GetCourse_byclass ID={item.ed_enrollment_class} /> </li>
                  </ul>
                  <div className="action-buttons">
                  <div className="ed-flex"> 
                        <NewEnrollmentConfirmationModal  update studentCode={item.ed_student_id}  title='Atualizar'  toggle_btn={
                            <button  className="btn-circle  bg-success text-light">
                                <Edit />
                            </button>} />   
                        <Link to={`/print_student_enrollment/${item.ed_student_id}`}>
                        <button  className="btn-circle bg-warning ml-2 text-light">
                            <PrintOutlined/>
                        </button>
                      </Link> 
                    </div>
                  </div>
                   <div className="ed-wrap"><span className="text-main-light">Data de matrícula :</span> {moment(item.ed_enrollment_registerDate).format("YYYY-MM-DD HH:mm:ss")} </div>
                   <div className="parents ed-space mt-4">
                         <div className='ed-flex'><SupervisedUserCircleOutlinedIcon/><strong>Encarregados :</strong></div>
                        <AvatarGroup max={7} sx={{ '& .MuiAvatar-root': { width: 35, height: 35, fontSize: 13 }}}> 
                             {item ?  <GetStudentParentsAvatars   ID={item.ed_student_id} />  : <></>}
                        </AvatarGroup> 
                   </div>
                   <div className="mt-2 ed-wrap"> 
                            <Badge bg='success' className='mt-2' > {item.ed_student_gender === "male" ? 'Matrículado' : 'Matrículada'} </Badge>  
                             <div className="ml-1">
                                <Badge className='mt-2' bg='warning'><div className="ed-flex">Valor da matrícula : 
                                 <div style={{margin:'0px 5px'}}><GetServicePrice  ID={item.ed_enrollment_service} /></div></div></Badge>
                             </div>
                        
                   </div>
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
        return data.filter((item)=>
          item.ed_student_name.toLowerCase().includes(filterValue) ||
          item.ed_student_email.toLowerCase().includes(filterValue) ||
          item.ed_student_phone.toLowerCase().includes(filterValue) ||
          item.ed_student_code.toLowerCase().includes(filterValue) ||
          item.ed_student_identityCard.toLowerCase().includes(filterValue) ||
          item.ed_student_address.toLowerCase().includes(filterValue) 
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
 
export default EnrollmentsGridList