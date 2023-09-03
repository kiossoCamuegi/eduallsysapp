import React from 'react'
import ParentsTable from '../components/Table/ParentsTable' 
import { Link } from 'react-router-dom'; 
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'; 
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined';
import SwitchFromPages from '../../General/components/SwitchFromPages';



function Parents() {
  return (
    <div>
    <div className="ed-space">
      <div></div>
        <div className='ed-flex'> 
           <SwitchFromPages  link='parentsgrid' menu="3" menu_item="141"
              toggle_btn={<button className='btn bg-green-light' > 
                  <BallotOutlinedIcon/>
              </button>}
           />     
            <SwitchFromPages  link='newparent' menu="3" menu_item="142"
                toggle_btn={<button className='btn bg-main ml-2' > 
                     <AddCircleOutlineIcon/> Registrar novo encarregado
                </button>}
            />      
        </div> 
    </div>
    <div className="eduall-table">
        <ParentsTable/>
    </div>
  </div>
  )
}

export default Parents