

import React from 'react'
import BooksGrid from '../components/Grid/BooksGrid' 
import { Link } from 'react-router-dom'; 
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'; 
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import { Form } from 'react-bootstrap' 
import { Search } from '@mui/icons-material';
import { LibraryBooksCategoryDataOptions, LibraryPublishersDataOptions, LibraryRackDataOptions, LibraryTypeOfBooksDataOptions } from '../../General/components/InstituteData';

function BooksListGrid() {
    document.title = "Lista dos livros"
    return (
      <div> 
        <div className="ed-space mb-3">
            <div></div>
            <div className='ed-flex'>
              <Link className='btn bg-green-light' to='/library_books'>
                  <SummarizeOutlinedIcon/> Lista dos livros
              </Link>
               <Link className='btn btn-main ml-2' to='/library_registernewbook'> 
                  <AddCircleOutlineIcon/> Registrar novo livro
               </Link>
            </div> 
        </div> 
            <Form>
              <div className='search-box col'>
              <Form.Group>
                    <div className="ed-flex col ed-space">
                     <Search/>
                        <div className="block col-lg-5 ml-2"> 
                            <Form.Control  type="text"  placeholder="Escreva qualquer coisa"  autoFocus /> 
                        </div>
                        <div className="block ml-2 col-lg-3"> 
                            <Form.Select select>
                                  <LibraryRackDataOptions/>
                             </Form.Select> 
                        </div> 
                        <div className="block ml-2 col-lg-3"> 
                            <Form.Select select>
                                  < LibraryBooksCategoryDataOptions/>
                             </Form.Select> 
                        </div>  
                    </div> 
               </Form.Group> 
              </div>
            </Form>  
      <div className="eduall-table">
            
      </div>
      <div className="eduall-grid">
          <BooksGrid/>
      </div>
    </div>
    )
}

export default BooksListGrid