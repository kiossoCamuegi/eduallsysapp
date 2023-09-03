import { Alert } from "react-bootstrap";

 
function KeyCombinations() {
  document.addEventListener("keydown", function (e){
       if (e.ctrlKey && e.key.toLocaleLowerCase() === 'Z'){
           alert("hi")
       }   
  })
}

export default KeyCombinations