import React from 'react'
import NewAuthorModal from '../components/modal/NewAuthorModal'
import AuthorTable from '../components/Table/AuthorTable'

function Authors() {
    document.title = "Registrar autores"
    return (
      <div>
      <div className="ed-space">
          <div></div>
          <div className="ed-flex">
           <NewAuthorModal/>
          </div>
      </div>
      <div className="eduall-table">
           <AuthorTable/>
      </div>
    </div>
    )
}

export default Authors