import React from 'react' 
import PointOfSaleNavbar from '../../../components/elements/Finance/PointOfSaleNavbar'
import NewProductModal from '../../../components/modal/NewProductModal';
import ProductsTable from '../../../components/Table/ProductsTable';

function NewProduct() { 
  document.title = 'Lista dos produtos'; 
    return (
      <div>
        <PointOfSaleNavbar/>
        <div className="ed-space pd-4 mt-4">
          <div></div>
            <div> 
               <NewProductModal/>
            </div> 
        </div>
        <div className="eduall-table">
            <div className="pd-4">
                 <ProductsTable/>
            </div>
        </div>
      </div>
    )
}
export default NewProduct