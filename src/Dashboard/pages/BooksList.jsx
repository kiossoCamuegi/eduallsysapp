import { AddCircleOutline } from '@material-ui/icons'
import { BallotOutlined } from '@mui/icons-material'
import React from 'react'
import { Link } from 'react-router-dom'
import BooksListTable from '../components/Table/BooksListTable'

function BooksList() {
    document.title = "Lista dos livros"
    return (
      <div>
      <div className="ed-space">
          <div></div>
          <div className="ed-flex">
          <Link className='btn btn-icon bg-green-light' to='/library_books_grid'>
                <BallotOutlined />
            </Link>
             <Link className='btn btn-main ml-2' to='/library_registernewbook'> 
                   <AddCircleOutline />Registrar novo livro
               </Link>
          </div>
      </div>
      <div className="eduall-table">
           <BooksListTable/>
      </div>
    </div>
    )
}

export default BooksList