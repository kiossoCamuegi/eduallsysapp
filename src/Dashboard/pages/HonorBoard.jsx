import React from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'; 
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined';
import {LocalPrintshopOutlined} from '@mui/icons-material';  
import { Link } from 'react-router-dom';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import { Form } from 'react-bootstrap' 
import { Search } from '@mui/icons-material';
import HonorBoardGrid from '../components/Grid/HonorBoardGrid';

function HonorBoard() {
  return (
    <>
     <div>
      <div className="ed-space">
        <div>
           <Form>
                <Form.Group className="mb-3"  >
                    <div className="ed-flex fill mt-2">
                     <Search/> 
                        <div className="block ml-2"> 
                            <Form.Select select>
                                  <option selected disabled>Turma</option>
                             </Form.Select> 
                        </div>
                        <div className="block ml-2"> 
                            <Form.Select select>
                                  <option selected disabled>Estrutura academica</option>
                             </Form.Select> 
                        </div>
                        <div className="block ml-2"> 
                            <Form.Select select>
                                  <option selected disabled>Ano academico</option>
                             </Form.Select> 
                        </div>
                        <div className="block ml-2"> 
                            <Form.Select select>
                                  <option selected disabled>Curso</option>
                             </Form.Select> 
                        </div> 
                    </div> 
               </Form.Group> 
            </Form>
        </div>
          <div>
             <Link className='btn bg-green-light' to='/MarksGrid'>
                  <SummarizeOutlinedIcon/> Lista das notas
              </Link>
               <Link className='btn ml-2' to='/NewMarks'> 
                  <AddCircleOutlineIcon/> Registrar notas
               </Link>
            </div> 
        </div> 
        <div className="mt-2 mb-2">
            <Link to="" className="btn ml-2 bg-danger">
                <LocalPrintshopOutlined/> Gerar relatorio
            </Link>
        </div>
        <HonorBoardGrid/>
    </div> 
    </>
  )
}

export default HonorBoard