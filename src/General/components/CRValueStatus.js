
export default function CRValueStatus(e) {
    let val =  document.querySelectorAll(e).length >=1 ?  (document.querySelectorAll(e)[0].checked === false ? 0 : 1) : 0; 
    return val; 
 }
  