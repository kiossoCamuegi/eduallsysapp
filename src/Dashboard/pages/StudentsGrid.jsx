
import React from 'react'
import { Link } from 'react-router-dom';
import StudentListGrid from '../components/Grid/StudentListGrid' 
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'; 
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import { Form } from 'react-bootstrap' 
import { Search } from '@mui/icons-material';
import SwitchFromPages from '../../General/components/SwitchFromPages';

function StudentsGrid() {
    document.title = 'Lista dos estudantes grade'; 
    return (
      <div>
        <div className="ed-space">
          <div className='ed-flex'>
            <Form>
              <div className='search-box'>
              <Form.Group>
                    <div className="ed-flex m0 fill">
                     <Search/>
                        <div className="block ml-2"> 
                            <Form.Control  type="text"  placeholder="Escreva qualquer coisa"  autoFocus /> 
                        </div>
                        <div className="block ml-2"> 
                            <Form.Select select>
                                  <option selected disabled>Turma</option>
                             </Form.Select> 
                        </div> 
                    </div> 
               </Form.Group> 
              </div>
            </Form>
          </div>
            <div className='ed-flex'> 
               <SwitchFromPages  link='Students' menu="3" menu_item="17"
                    toggle_btn={<button className='btn bg-green-light'> 
                        <SummarizeOutlinedIcon/> Lista de estudantes
                    </button>}
                 />  
                 <SwitchFromPages  link='NewStudentBase' menu="3" menu_item="13"
                    toggle_btn={<button className='btn ml-2 btn-main'>
                        <AddCircleOutlineIcon/> Registrar novo estudante
                    </button>}
                 />  
            </div> 
        </div>
        <div className="eduall-table">
            <StudentListGrid/>
        </div>
      </div>
    )
}

export default StudentsGrid