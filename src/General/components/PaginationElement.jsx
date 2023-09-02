import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';

 
function Items({ currentItems }) {
  return (
    <>
      {currentItems &&
        currentItems.map((item) => (
          <div>
            <h3>Item #{item}</h3>
          </div>
        ))}
    </>
  );
}

function Paginate({ itemsPerPage , items}) {
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
  
  
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  
  
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);
   
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % items.length;
  
      console.log( `User requested page number ${event.selected}, which is offset ${newOffset}`);
  
      
      setItemOffset({ itemsPerPage });
    };
  
    return (
      <>
        <Items currentItems={currentItems} />
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
        />
      </>
    );
}


function PaginationElement(props) { 
    return(
        <div>
            <Paginate items={props.data} itemsPerPage={props.page_items} />
        </div>
    )
}

export default PaginationElement
