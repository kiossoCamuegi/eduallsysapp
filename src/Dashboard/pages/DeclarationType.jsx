import React from 'react'
import NewDeclarationTypeModal from '../components/modal/NewDeclarationModal'; 

function DeclarationType() {
    document.title = "Criar Status";
    return (
      <div>
      <div className="ed-space">
          <div></div>
          <div className="ed-flex">
             <NewDeclarationTypeModal/>
          </div>
      </div>
      <div className="eduall-table">
   //https://www.youtube.com/watch?v=nNwGKCLbKL8&pp=ygUMbW90aXZhdGlvbmFs
      </div>
    </div>
    )
}

export default DeclarationType