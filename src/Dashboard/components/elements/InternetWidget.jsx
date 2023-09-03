import React , {useEffect, useState} from 'react'
import CheckInternetConnection from '../../../General/components/CheckInternetConnection'
import WifiIcon from '@mui/icons-material/Wifi';
import WifiOffIcon from '@mui/icons-material/WifiOff';

function InternetWidget() {



  return (
    <div>
      
      {
        CheckInternetConnection() === false ? 
        <div className="col bg-red text-light internet-status-box">
            
            <h1><WifiOffIcon/> Esta sem conexão com a internet</h1></div> 
        :
        <div className="col bg-green text-light internet-status-box">
            <div className="ed-block">
                <div className="ed-flex"><WifiIcon/> <h1>Boa esta conectado a Internet</h1></div>
                <button className="btn btn-cancel" style={{background:"#80ED99"}}>Cancelar</button>
                <button className="btn" style={{background:"#EA3546"}}>Efectuar backup</button>
            </div>
        </div> 
      }
    </div>
  )
}

export default InternetWidget