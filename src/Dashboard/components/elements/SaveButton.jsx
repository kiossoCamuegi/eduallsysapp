import { Done, Refresh } from '@mui/icons-material';
import React, { useState } from 'react'
import { Button } from 'react-bootstrap'

function SaveButton(props){
const Data = ()=>{ 
    let status = props.status;
    if(status === 0){
        return <div className='sm-loader'></div> 
    }else if(status === 1){
          return <> <Refresh/>  Tentar novamente</>
    }else if(status === 2){  
      return <>{ props.icon ? props.icon : <></>} { props.title ? props.title : 'Salvar' } </>
    }else if (status === null){
        return <>{ props.icon ? props.icon : <></>} { props.title ? props.title : 'Salvar' } </>
    }
}

  return (
    <div className='small-loader-item'>
        <Button disabled={props.disable ? true : (props.status === 0 ? true : false)}  className={props.class ? `${props.class}` : "btn btn-main ml-2"} type="submit"> 
             { Data() }
        </Button>
    </div>
  )
}

export default SaveButton