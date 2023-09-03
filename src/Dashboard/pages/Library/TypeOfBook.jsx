import React from 'react'
import NewTypeOfBookModal from '../../components/modal/Library/NewTypeOfBookModal';
import TypeOfBookTable from '../../components/Table/Library/TypeOfBookTable';

function TypeOfBook() {
    document.title = "Tipos de livros";
    return (
      <div>
      <div className="ed-space">
          <div></div>
          <div className="ed-flex">
             <NewTypeOfBookModal/>
          </div>
      </div>
      <div className="eduall-table">
           <TypeOfBookTable/>
      </div>
    </div>
    )
}

export default TypeOfBook