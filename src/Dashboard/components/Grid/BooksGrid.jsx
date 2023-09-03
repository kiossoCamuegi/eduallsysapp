
import { Star } from '@material-ui/icons'
import { StarHalf } from '@mui/icons-material'
import { Avatar } from '@mui/material'
import React ,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import Pagination from '@mui/material/Pagination';
import Hoot from '../../../General/components/Hoot'
import axios from 'axios'
import { GetAuthorName } from '../../../General/components/InstituteData'
import { styled } from 'styled-components'
import ReactPaginate from 'react-paginate'
const URL = Hoot()+`edualllibrarybooks/get`;   

function BooksGrid(props) {  
 const [data, setData] = useState([]); 
  
 async function loadData(){
     const response = await axios.get(URL);
     setData(response.data); 
 }

 useEffect(()=>{
     loadData(); 
 },[]);


  return (
     <div>
        <PaginatedItems itemsPerPage={12}    data={data} /> 
        <br />
     </div>
  )
}


 
function Items({currentItems}){
    return( 
      <div className="ed-wrap library-books-grid">  
       {currentItems &&
        currentItems.map((item)=>(
            <div className="book-card">
            <img loading="lazy" role="presentation"  src={item.ed_library_book_picture !== ""  ?  Hoot()+item.ed_library_book_picture : ""} alt="" />
            <h3> {item.ed_library_book_title} </h3>
            <div className="ed-flex"> 
            <h5> Autor : <span><GetAuthorName ID={item.ed_library_book_author}/> </span> </h5>
            </div>
            <div className="ed-flex mt-2 classification">
                <Star/>
                <Star/>
                <Star/>
                <Star/>
                <StarHalf/>
                <span>4.5</span>
            </div>
        </div> 
        ))}
     </div> 
    )
  }


function PaginatedItems({ itemsPerPage, data, filterValue}) {   
    const FilterData = (data)=>{  
          return data 
     }

    const [itemOffset, setItemOffset] = useState(0); 
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = FilterData(data).slice(itemOffset, endOffset);
    const pageCount = Math.ceil( FilterData(data).length / itemsPerPage); 
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % FilterData(data).length; 
      setItemOffset(newOffset);
    }; 
    return (
      <>
        <Items currentItems={currentItems} />
      <div className="ed-space mr-2">
        <div className="ml-2" > 
            <Title>{FilterData(data).length} items encomtrados na lista </Title>
         </div> 
        <div>
        <div className="paginate box mr-2">
          <ReactPaginate
              breakLabel="..."
              nextLabel=" > "
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel=" < "
              renderOnZeroPageCount={null}
            />
         </div>
        </div>
      </div>
      </>
    );
  }


  const Title = styled.h3`
      font-size:18px;
      margin:0px;
  `;

 

export default BooksGrid