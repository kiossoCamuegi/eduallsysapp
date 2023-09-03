import axios from "axios";
import Hoot from "../../General/components/Hoot";
const URL = Hoot()+'eduallenrolloperationregister/post';

export default function EnrollOperationAction(data) {
   try {
       const register = async()=>{
        axios.post(URL, data).then(()=>{  
             console.clear();  
          }).catch((error)=>{
             console.log(error); 
          }); 
       }
       register();
   } catch (error) {
       console.log("something bad", error);
   }
}
 