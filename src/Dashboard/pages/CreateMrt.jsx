import React from 'react'
import CreateMrtModal from '../components/modal/CreateMrtModal';
import MrtTable from '../components/Table/MrtTable';

function CreateMrt() {
     document.title = "Atribuição de méritos a estudantes";
     return (
       <div>
       <div className="ed-space">
           <div></div>
           <div className="ed-flex">
              <CreateMrtModal/>
           </div>
       </div>
       <div className="eduall-table">
             <MrtTable/>
       </div>
   </div>
     )
}

 export default CreateMrt