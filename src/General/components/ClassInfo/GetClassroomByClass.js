import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Hoot from '../Hoot';

const DATA_URL = [
    Hoot()+'eduallsingleclassapi/get/',
    Hoot()+'eduallsingleclassroomapi/get/'
];

export default function GetClassroomByClass(ID){

    const [data, setData] = useState([]); 

    async function loadData(){ 
        const response = await axios.get(DATA_URL[0]+`${ID}`);  
        if(response.data.length >= 1){
            const classroom_response = await axios.get(DATA_URL[1]+`${response.data[0].ed_class_room}`);
            setData(classroom_response);
        }
    };

    useEffect(()=>{
        if(loadData()){
            console.log(data);
        } 
    },[]); 

  return  'SALA X';
} 