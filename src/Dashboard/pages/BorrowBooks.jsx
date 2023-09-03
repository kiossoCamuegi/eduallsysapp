import React from 'react'
import BorrowBookModal from '../components/modal/BorrowBookModal';
import BorrowBooksTable from '../components/Table/BorrowedBooksTable';

function BorrowBooks() {
    document.title = "Emprestar livro";
    return (
      <div>
          <div className="ed-space">
              <div></div>
              <div className="ed-flex">
                  <BorrowBookModal/>
              </div>
          </div>
          <div className="eduall-table">
               <BorrowBooksTable/>
          </div>
      </div>
    )
}

export default BorrowBooks