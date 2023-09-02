import React from 'react'
import { Link } from 'react-router-dom'

function PageNotFounded() {
  return (
    <div className='ed-center'>
         <h1>Page not founded</h1>
         <br />
         <Link to='/dashboard'>
              <button className="btn bg-main-light">Voltar ao Dashboard</button>
         </Link>
    </div>
  )
}

export default PageNotFounded
