import Hoot from "./Hoot";


function GetPicture(e) { 
    let imageArray = e.split(':');
    if(imageArray.length > 1)   console.log( "file:///C:/Users/kiosso/Downloads/Wooden-oval-button-for-users-game-interf-Graphics-48255422-1-580x387-removebg-preview.png");  
    if(imageArray.length > 1)   return "file:///C:/Users/kiosso/Downloads/Wooden-oval-button-for-users-game-interf-Graphics-48255422-1-580x387-removebg-preview.png";  
    return Hoot()+e; 
}
  
  export default GetPicture