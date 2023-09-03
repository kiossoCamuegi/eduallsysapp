import { useEffect, useState } from "react";
import Hoot from "../../../General/components/Hoot";
import axios from 'axios';
import jwt_decode from 'jwt-decode';  

export default function EmployeeData(e){
    const [UserData, setUserData] = useState({});  
    const DATA_URL = [Hoot()+'eduallsingleuserdata/get/',Hoot()+'token'];
  
    async function loadData(){ 
     const TokenResponse = await axios.get(DATA_URL[1]);  
     const decoded = jwt_decode(TokenResponse.data.accessToken);     
     if(Object.keys(decoded).length > 0){ 
           const response = await axios.get(DATA_URL[0]+`${decoded.cr_usercode}`);   
          if(Object.keys(response.data).length > 0){
                setUserData({
                   email:response.data.USER_INFORMATION.ed_user_account_email,
                   phone:response.data.USER_INFORMATION.ed_userphone,
                   picture:Hoot()+response.data.USER_INFORMATION.ed_user_account_picture,
                   code:response.data.USER_INFORMATION.ed_user_account_id,
                   name:response.data.USER_INFORMATION.ed_user_account_name,
                   firstname:response.data.USER_INFORMATION.ed_user_account_name.split(' ')[0],
                   firstlastname:response.data.USER_INFORMATION.ed_user_account_name.split(' ')[0] + ' '+  response.data.USER_INFORMATION.ed_user_account_name.split(' ')[response.data.USER_INFORMATION.ed_user_account_name.split(' ').length -1],
                   lettername:response.data.USER_INFORMATION.ed_user_account_name.split(' ')[0].split('')[0].toUpperCase()+response.data.USER_INFORMATION.ed_user_account_name.split(' ')[response.data.USER_INFORMATION.ed_user_account_name.split(' ').length -1].split('')[0].toUpperCase()
                }); 
           };    
       }
   };

   useEffect(()=>{
        loadData();
   },[]);


   return [UserData];
}