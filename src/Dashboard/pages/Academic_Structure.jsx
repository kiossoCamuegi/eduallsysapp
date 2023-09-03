import React from 'react'
import NewAcademicStructureModal from '../components/modal/NewAcademicStructureModal'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'; 
import { Link } from 'react-router-dom';

function Academic_Structure() {
  document.title = "Estrutura Académica"
  return (
    <div>
        <div className="ed-space">
            <div></div>
            <div className="ed-flex">
              <Link to='/New_academic_year' className="btn bg-success text-light mrr-1">
                 <AddCircleOutlineIcon/>  Criar ano academico
              </Link>
               <NewAcademicStructureModal/>
            </div>
        </div>
        <div className="eduall-table">
            
        </div>
    </div>
  )
}

export default Academic_Structure