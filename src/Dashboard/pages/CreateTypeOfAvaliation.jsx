import React from 'react'
import NewAvaliationTypeModal from '../components/modal/NewAvaliationTypeModal';
import TypeOfAvaliationTable from '../components/Table/TypeOfAvaliationTable';

function CreateTypeOfAvaliation() {
    document.title = 'Criar tipo de avaliação'; 
    return (
      <div>
          <div className="ed-space">
            <div></div>
              <div> 
                  <NewAvaliationTypeModal/>
              </div> 
          </div>
          <div className="eduall-table">
             <TypeOfAvaliationTable/>
          </div>
    </div>
    )
}

export default CreateTypeOfAvaliation