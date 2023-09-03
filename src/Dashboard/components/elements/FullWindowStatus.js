
function SetFullWindowStatus(e) {
    if(e === true){
         localStorage.setItem("eduall_hide_menu", 1);
    }else{
        localStorage.setItem("eduall_hide_menu", 0);
    } 
 }
  
 
function  GetFullWindowStatus(e) {
    let status = JSON.parse(localStorage.getItem("eduall_hide_menu"));
   if(e === null || e === undefined){
    if(status !== null || status !== undefined) return status*1 === 1 ? true :  false;  
      return false;
   }else{
      return e;
   }
 }



 export {SetFullWindowStatus, GetFullWindowStatus}
  