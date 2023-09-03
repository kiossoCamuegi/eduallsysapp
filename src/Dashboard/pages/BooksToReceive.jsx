
import React from 'react'
import { AddCircleOutline } from '@material-ui/icons'
import { BallotOutlined } from '@mui/icons-material' 
import { Link } from 'react-router-dom'
import BorrowBookModal from '../components/modal/BorrowBookModal'
import BooksToReceiveTable from '../components/Table/BooksToReceiveTable'

function BooksToReceive() {
    document.title = "Livros não devolvidos";
    return (
      <div>
      <div className="ed-space">
          <div></div>
          <div className="ed-flex">
            <Link className='btn bg-green-light' to='/library_books_grid'>
                <BallotOutlined />
            </Link> 
            <div className="ml-2">
               <BorrowBookModal />
            </div>
          </div>
      </div>
      <div className="eduall-table">
           <BooksToReceiveTable/>
      </div>
    </div>
    )
}

export default BooksToReceive