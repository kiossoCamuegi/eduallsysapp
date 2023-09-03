import { AddCircleOutline } from '@mui/icons-material'
import React from 'react'
import { Link } from 'react-router-dom'
import NewDeclarationModal from '../components/modal/NewDeclarationModal'
import DeclarationsTable from '../components/Table/DeclarationsTable'

function Declarations() {
    document.title = "Lista das declarações"
    return (
      <div>
      <div className="ed-space">
          <div></div>
          <div className="ed-flex">
               <NewDeclarationModal/>
          </div>
      </div>
      <div className="eduall-table">
           <DeclarationsTable/>
      </div>
    </div>
    )
}

export default Declarations