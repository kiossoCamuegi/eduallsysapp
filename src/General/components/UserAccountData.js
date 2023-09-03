import React, {useState, useEffect} from 'react';
import Hoot from './Hoot';
import axios from 'axios';
import jwt_decode from 'jwt-decode';  

const DATA_URL = [
    Hoot()+'eduallsingleuserdata/get/',
];

export function UserAccountData() { 
        const [data, setData] = useState([]);   
        const [load, SetLoad] = useState(false);

        async function loadData(){ 
           const TokenResponse = await axios.get(Hoot()+'token');  
          const decoded = jwt_decode(TokenResponse.data.accessToken);   
      
          if(Object.keys(decoded).length > 0){ 
                const response = await axios.get(DATA_URL[0]+`${decoded.cr_usercode}`);  
                setData([response.data]);   
            }
        };

        useEffect(()=>{
            loadData();  
            SetLoad(true);
        },[]);  

     if (load === true && data.length > 0 ){ 
         return [data];
     }

       
} 