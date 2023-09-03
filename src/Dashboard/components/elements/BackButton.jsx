import { ArrowBack } from '@mui/icons-material' 
import React from 'react'
import { useHistory } from 'react-router-dom';

function BackButton() {
    let history = useHistory();
    const back = ()=>{
        history.goBack()
    }

  return (
    <div>
        <button onClick={()=> back()} className='btn bg-main-light'><ArrowBack/> Voltar</button>
    </div>
  )
}

export default BackButton
