import jwtDecode from 'jwt-decode';
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Hoot from './Hoot';
import { useHistory } from 'react-router-dom';


export const EduallDataCheck =(props)=>{
    const TABLEURL =[ Hoot()+props.link, Hoot()+"token/"]; 
    const [data, setData] = useState([]); 
    const [expire, SetExpire] = useState('');
    const [token, SetToken] = useState('');
    const history  = useHistory ();
    const axiosJWT = axios.create(); 
    let Loaded = false;

const Intercept = ()=>{ 
  /* if(Loaded === false){
      axiosJWT.interceptors.request.use(async(config)=>{
        const currentDate = new Date();
        if((expire * 1000) < currentDate.getTime()){
            const response = await axios.get(TABLEURL[1]);
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            SetToken(response.data.accessToken);
            const decoded = jwtDecode(response.data.accessToken);
            SetExpire(decoded.exp);
    
            console.log("Getting right ....");
            Loaded = true;
        }
        return config;
    },(error)=>{
        console.log("printing error")
        console.log(error);
        return Promise.reject(error);
    }); 
   } */
}
 

async function refreshToken(){
    try {
        const response = await axios.get(TABLEURL[1]);
        SetToken(response.data.accessToken);
        const decoded = jwtDecode(response.data.accessToken);
        SetExpire(decoded.exp)
        loadData();
    } catch (error) {
       if(error.response){
           Logout(null);
       }
    }
}


  async function loadData(){
      const response = await axiosJWT.get(TABLEURL[0],{
        headers:{
           Authorization:`Bearer ${token}`
        }
      }); 
    setData(response);
    props.Get(response);
  }; 


  async function Logout(e){
    try {
      localStorage.setItem("CurrentTab", 1);
      localStorage.setItem("CurrentPage", null);
      await axios.delete(Hoot()+'logout');  
      if (e !== null) {
         localStorage.setItem("eduallswitchuser",e);
         history.push('/');   
      }else{
         localStorage.removeItem("eduallswitchuser");
         history.push('/');
      }
  } catch (error) {
     console.log("something went wrong");
  }
  }
 

  useEffect(()=>{ 
      Intercept();
      refreshToken();
  },[]);    
}