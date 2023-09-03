import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Hoot from '../../../../General/components/Hoot';
import { Avatar, AvatarGroup } from '@mui/material';

function ActiveTeachersAvatars() {

    const [data, setData] = useState([]); 
    const [load, setLoaded] = useState(false);
     
     async function loadData(){
        const response = await axios.get(Hoot()+"eduallgetemployeebyjobtitle/get/0");  
        let row = []; 
        response.data.map((item, index)=>{
            row.push({name:item.ed_employee_picture, picture:Hoot()+item.ed_employee_picture,color:item.ed_employee_avatar_color});
        })
        setData(row);
        setLoaded(true);
    };
    
    useEffect(()=>{ 
      loadData(); 
    },[]); 
 
    
   if(load){
    return (
        <div>
           <AvatarGroup max={7}>
            {data.map((item, index)=>{
                return(
                    <Avatar alt={item.name} style={{background:`${item.color}`}} src={item.picture} key={index}  /> 
                )
            })
            }
        </AvatarGroup>
        </div>
      )
   }
}

export default ActiveTeachersAvatars
