import React from 'react'
import SwitchFromPages from '../../General/components/SwitchFromPages';
import StudentTuitionTable from '../components/Table/StudentTuitionTable';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'; 

function StudentTuition() {
    document.title = 'Pagamentos de propina'; 
    return (
      <div>
        <div className="ed-space">
          <div></div>
            <div> 
                <SwitchFromPages  link='feespayments' menu="5" menu_item="45"
                   toggle_btn={<button className='btn bg-main ml-2'> 
                       <AddCircleOutlineIcon /> Efectuar pagamento de propina
                   </button>}
                />            
            </div> 
        </div>
        <div className="eduall-table">
             <StudentTuitionTable/>
        </div>
      </div>
    )
}

export default StudentTuition