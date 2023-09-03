import React from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'; 
import SchoolsOfProvenanceTable from '../components/Table/SchoolsOfProvenanceTable';
import { Link } from 'react-router-dom';

function SchoolsOfProvenance() {
    document.title = 'Lista dos serviços'; 
    return (
      <div>
        <div className="ed-space">
          <div></div>
            <div> 
               <Link to="/NewSchoolsOfProvenance" className="btn btn-main">
                   <AddCircleOutlineIcon/> Criar Nova escola de proveniência
                </Link>
            </div> 
        </div>
        <div className="eduall-table">
            <SchoolsOfProvenanceTable/>
        </div>
      </div>
    )
}

export default SchoolsOfProvenance