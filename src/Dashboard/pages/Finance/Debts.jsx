import { Search } from '@mui/icons-material';
import React, { useRef, useState } from 'react'
import { Form } from 'react-bootstrap';
import { AcademiclevelDataOptions, ClassDataOptions } from '../../../General/components/InstituteData';
import NewfeeManualPaymentModal from '../../components/modal/NewfeeManualPaymentModal';
import ListDebts from '../../components/Table/ListDebts';

function Debts() {
  document.title = "Lista dos alunos devedores (propinas)";
  const [SelectedClass , setSelectedClass]  = useState(null);
  const ChildRef = useRef();

  const FilterByClass = (e)=>{
     setSelectedClass(e.target.value);
     ChildRef.current.loadData();
  }

  return (
    <div>
        <div className="ed-space">
        <div className='ed-flex'>
            <Form>
              <div className='search-box'>
              <Form.Group>
                    <div className="ed-flex m0 fill">
                     <Search/> 
                        <div className="block ml-2"> 
                            <Form.Select onChange={FilterByClass} select> 
                                  <ClassDataOptions/>
                             </Form.Select> 
                        </div> 
                    </div> 
               </Form.Group> 
              </div>
            </Form>
          </div>
            <div className="ed-flex">
               <NewfeeManualPaymentModal />
            </div>
        </div>
        <div className="eduall-table">
             <ListDebts ref={ChildRef} Class={SelectedClass}/>
        </div>
    </div>
  )
}

export default Debts