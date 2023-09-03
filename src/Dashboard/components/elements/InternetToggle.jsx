import React, { useEffect, useState } from 'react'
import { BsWifi, BsWifiOff , BsCheck2} from "react-icons/bs";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button'; 

function InternetToggle(props){
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [OnlineStatus, SetOnlineStatus] = useState(null);

    let localApp = true

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };


    const ChangeStatus = (e)=>{
        if(e === true){
            if(window.navigator.onLine){
                SetOnlineStatus(true);
            }else{
                alert("Connecte-se a uma rede");
            }
        }else{
            SetOnlineStatus(false);
        }
       setTimeout(() => {
          handleClose();
       }, 500);
    }

    const checkConnection = async () => {
      let isOnline = null;
      try { 
          const response = await fetch("https://jsonplaceholder.typicode.com/posts");
          isOnline = response.status >= 200 && response.status < 300;
      } catch (error) {
          isOnline = false; 
      } 
      SetOnlineStatus(isOnline);
  }

    useEffect(()=>{ 
        checkConnection();   
        console.log("status",localApp);
     },[]);
 
     
  return (  
    <>
     {localApp !== null ?
       <>
       <div>
       <Button id="internet-toggle-btn"  aria-controls={open ? 'basic-menu' : undefined} 
        aria-haspopup="true"  aria-expanded={open ? 'true' : undefined} onClick={handleClick} >
        <div className={OnlineStatus ? 'on' : 'off' } > {OnlineStatus ? <BsWifi /> : <BsWifiOff/> }</div>
     </Button>
     <Menu id="basic-menu"  anchorEl={anchorEl}
      open={open}onClose={handleClose}MenuListProps={{ 'aria-labelledby': 'internet-toggle-btn', }}>
       <MenuItem onClick={()=>ChangeStatus(true)}>{OnlineStatus ? <div className="check bg-main-light"><BsCheck2 /></div> : <></> } Trabalhar online</MenuItem>
       <MenuItem onClick={()=>ChangeStatus(false)}>{!OnlineStatus ? <div className="check bg-main-light"><BsCheck2 /></div> : <></> } Trabalhar Offline</MenuItem> 
     </Menu>
   </div>
       </>  :  
        <>
      
      </>
      }
    </>
  )
}

/*


const popup = document.querySelector(".popup"),
wifiIcon = document.querySelector(".icon i"),
popupTitle = document.querySelector(".popup .title"),
popupDesc = document.querySelector(".desc"),
reconnectBtn = document.querySelector(".reconnect");
let isOnline = true, intervalId, timer = 10;
const checkConnection = async () => {
    try {
        // Try to fetch random data from the API. If the status code is between 
        // 200 and 300, the network connection is considered online 
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        isOnline = response.status >= 200 && response.status < 300;
    } catch (error) {
        isOnline = false; // If there is an error, the connection is considered offline
    }
    timer = 10;
    clearInterval(intervalId);
    handlePopup(isOnline);
}
const handlePopup = (status) => {
    if(status) { // If the status is true (online), update icon, title, and description accordingly
        wifiIcon.className = "uil uil-wifi";
        popupTitle.innerText = "Restored Connection";
        popupDesc.innerHTML = "Your device is now successfully connected to the internet.";
        popup.classList.add("online");
        return setTimeout(() => popup.classList.remove("show"), 2000);
    }
    // If the status is false (offline), update the icon, title, and description accordingly
    wifiIcon.className = "uil uil-wifi-slash";
    popupTitle.innerText = "Lost Connection";
    popupDesc.innerHTML = "Your network is unavailable. We will attempt to reconnect you in <b>10</b> seconds.";
    popup.className = "popup show";
    intervalId = setInterval(() => { // Set an interval to decrease the timer by 1 every second
        timer--;
        if(timer === 0) checkConnection(); // If the timer reaches 0, check the connection again
        popup.querySelector(".desc b").innerText = timer;
    }, 1000);
}
// Only if isOnline is true, check the connection status every 3 seconds
setInterval(() => isOnline && checkConnection(), 3000);
reconnectBtn.addEventListener("click", checkConnection);


*/

export default InternetToggle
