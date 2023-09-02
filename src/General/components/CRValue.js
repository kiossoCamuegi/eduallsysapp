
export default function CRValue(e) {
   let val =  document.querySelectorAll(e).length >=1 ?  document.querySelectorAll(e)[0].value  : '';
   return val; 
}
 