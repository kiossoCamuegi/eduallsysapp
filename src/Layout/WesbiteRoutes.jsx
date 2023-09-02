import React from 'react' 
import { Route } from 'react-router-dom'
import Home from '../Website/Home'

function WesbiteRoutes() {
  return (
    <>
       <Route path='/info' component={Home} />
    </>
  )
}

export default WesbiteRoutes
