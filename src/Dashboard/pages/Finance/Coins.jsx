import React from 'react'
import NewCoinModal from '../../components/modal/NewCoinModal';
import CoinsTable from '../../components/Table/CoinsTable';

function Coins() {
    document.title = "Defenir moedas";
    return (
       <div>
           <div className="ed-space">
               <div className='ed-flex'>
                    
               </div>
               <div>
                   <NewCoinModal/>
              </div>
           </div>
            <CoinsTable/>
       </div>
    )
}

export default Coins