import { useHistory } from "react-router-dom";
import Hoot from "./Hoot";
import axios from "axios";


export default function Logout(props){ 
  const navigate = useHistory(); 

 const SignOut = async(e)=>{
    try {
        localStorage.setItem("CurrentTab", 1);
        localStorage.setItem("CurrentPage", null);
        await axios.delete(Hoot()+'logout');  
        if (e !== null) {
           localStorage.setItem("eduallswitchuser", e);
           navigate.push('/');   
        }else{
           localStorage.removeItem("eduallswitchuser");
           navigate.push('/');  
        }
    } catch (error) {
       console.log("something went wrong");
    }  
 }

   return (  
    <div onClick={()=> SignOut(null)}>
        {props.toggle_btn ? props.toggle_btn : <></>}
    </div>)
}