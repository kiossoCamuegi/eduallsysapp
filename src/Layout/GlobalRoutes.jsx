import React, { useEffect, useState } from 'react'
import axios from 'axios'; 
import jwt_decode from 'jwt-decode';  
import Hoot from '../General/components/Hoot';  
import { useHistory } from "react-router-dom";
import CustomRoutes from './CustomRoutes';  
import ThemeAction from '../Redux/Actions/ThemeAction';  
import StudentRoutes from './StudentRoutes';
import TeacherRoutes from './TeacherRoutes';

function GlobalRoutes({themeReducer}) {     
const [token, setToken] = useState(null); 
const [userType, setUserType] = useState(null);
const navigate = useHistory();  

const refreshToken = async ()=>{  
  try { 
    const response = await axios.get(Hoot()+'token'); 
    const decoded = jwt_decode(response.data.accessToken);   
    setToken(response.data.accessToken); 
    setUserType(decoded.cr_usertype);

    console.log({
        token:response.data.accessToken,
        type:decoded.cr_usertype
    });

  } catch (error) {     
     navigate.push("/");   
  }
}

  
useEffect(()=>{
  setToken(null); 
  setUserType(null);
   refreshToken();  
}, []);
 
  return ( 
    <>  
        {(userType === 0 && token !== null) && <CustomRoutes  mode={themeReducer.mode} color={themeReducer.color} />}
        {(userType === 1  && token !== null) && <TeacherRoutes />}  
        {(userType === 2  && token !== null) &&  <StudentRoutes/>}   
    </>
  )
}

export default GlobalRoutes 

 