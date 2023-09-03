import React from 'react'
import NewUserAccount from '../components/modal/NewUserAccount'; 

function UserAccounts() {
    document.title = 'Cadastro de usúarios'; 
    return (
      <div>
        <div className="ed-space">
          <div></div>
            <div> 
               <NewUserAccount/>
            </div> 
        </div>
        <div className="eduall-table">
             
        </div>
      </div>
    )
}

export default UserAccounts