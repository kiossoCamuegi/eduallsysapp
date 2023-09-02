import axios from "axios";
import Hoot from "./Hoot";


const AuditoryRegister = async(action_type, action, form, description, location)=> { 
     axios.post(Hoot()+'eduallauditoryactionregister/post', {
          auditory_form:form,
          auditory_action:action,
          auditory_action_type:action_type,
          auditory_action_description:description, 
          auditory_location:location
     }).then(()=>{   
      console.clear(); 
     }).catch((error)=>{
          console.log("something went wrong ....");
     }); 
}

export default AuditoryRegister;