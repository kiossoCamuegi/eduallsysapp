import React, { useRef, useState } from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'; 
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import { Form } from 'react-bootstrap' 
import { Search } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import ParentsGridList from '../components/Grid/ParentsGridList';
import SwitchFromPages from '../../General/components/SwitchFromPages';

function ParentsGrid() {
  document.title = "Lista de encarregados";
  const [StudentClassFilter, setStudentClassFilter] = useState(null);
  const [StudentNameFilter, setStudentNameFilter] = useState(null);
  const ChildRef = useRef();


  const FilterData = (a, e)=>{  
    a === 1 ?  setStudentNameFilter(e.target.value) : setStudentClassFilter(e.target.value);
    ChildRef.current.ChangeFilter(a === 1 ? 1 : 0);
 }


  return (
    <div>
        <div className="ed-space">
          <div className="ed-block col-lg-4">
              <Form className='col'>
                  <div className="search-box ">
                  <Form.Group>
                      <div className="ed-flex m0 fill">
                      <Search/>
                          <div className="block col  ml-2"> 
                              <Form.Control  type="text" onChange={(e)=>FilterData(1, e)}  placeholder="Escreva qualquer coisa"  autoFocus /> 
                          </div> 
                      </div> 
                  </Form.Group> 
                  </div>
              </Form>
            </div>
            <div className='ed-flex'> 
               <SwitchFromPages  link='Parents' menu="3" menu_item="141"
              toggle_btn={<button className='btn bg-green-light'> 
                  <SummarizeOutlinedIcon/> 
              </button>}
             />     
            <SwitchFromPages  link='newparent' menu="3" menu_item="142"
                toggle_btn={<button className='btn bg-main ml-2' > 
                     <AddCircleOutlineIcon/> Registrar novo encarregado
                </button>}
              />      
            </div> 
        </div>
        <div className="eduall-grid">
            <ParentsGridList/>
        </div>
     </div>   
  )
}

export default ParentsGrid