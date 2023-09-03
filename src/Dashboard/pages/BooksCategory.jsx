
import React from 'react'
import NewBookCategoryModal from '../components/modal/Library/NewBookCategoryModal' 
import BooksCategoryTable from '../components/Table/BooksCategoryTable'

function BooksCategory() {
    document.title = "Adicionar categoria de livros"
    return (
      <div>
      <div className="ed-space">
          <div></div>
          <div className="ed-flex">
               <NewBookCategoryModal/>
          </div>
      </div>
      <div className="eduall-table">
           <BooksCategoryTable />
      </div>
    </div>
    )
}

export default BooksCategory