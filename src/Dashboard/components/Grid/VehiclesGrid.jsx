import React, {useState, useEffect} from 'react'
import  {Email, Phone, LinkedIn, Facebook } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Avatar } from '@mui/material';
import axios from 'axios';
import { Delete, Description, Edit} from '@mui/icons-material';
import Hoot from '../../../General/components/Hoot'; 
import { PreviewOutlined } from '@mui/icons-material' 
import styled from 'styled-components'
 

const URL = Hoot()+"'edualltransportvehicleget/get/";


function VehiclesGrid() {
      
  const [data, setData] = useState([]);
  
  async function loadData(){
      try {
        const response = await axios.get(URL);
        setData(response.data);
      } catch (error) {
          console.log(error);
      }
  }

  useEffect(()=>{
      loadData(); 
  },[]);

  return (
    <div className='ed-wrap'>
          {
           data.map((item, index)=>{
              return(
                <Card>
                    <div className="box">
                        <div className="image">
                        <img loading="lazy" role="presentation" src='' alt="#" />
                        <div className="over">
                             <button className='bg-main-light'><PreviewOutlined /></button>
                             <h2>Autocarro amarelo toyota</h2>
                        </div>
                        </div>
                        </div>
                        <div className="details"> 
                            <ul>
                                <li>Placa : <span>############</span> </li> 
                                <li>Motorista : <span >############</span> </li> 
                                <li>Tipologia : <span >############</span> </li> 
                                <li>Capacidade : <span >############</span> </li>   
                            </ul>
                        </div> 
                    </Card> 
              )
          }) 
        }
    </div>
  )
}

const Card = styled.article`
  padding:20px;
  margin:15px 0;
  display:flex;
  border-radius:6px;
  background:var(--ed-white);
  height:300px;
  width:33%;
  box-shadow:var(--ed-shadow-df);


  ul{
     list-style:none;
     padding:0px;
     padding-left:15px;

     li{
        font-size:14.5px;
        margin-bottom:10px;

          span{
             font-size:12px;
             margin-top:7px;
             color:var(--ed-blue-dark);
          }
     }
  }

  .box{
    height:100%;
    min-width:200px;
    border-radius:6px;
    position:relative;
    overflow:hidden; 

    .image{
        height:100%;
    }

    img{
        width:100%;
        height:100%;
        object-fit:cover;
    }

      .over{
         position:absolute;
         left:0px;
         width:100%;
         height:100%;
         background:var(--ed-trp-2);
         top:0px;
         padding:10px;

           h2{
               color:var(--ed-white);
               font-size:16px;
           }

          button{
             width:40px;
             height:40px;

              border-radius:100%;
                svg{
                   fill:var(--ed-white);
               }
            }
           
      }
  }

  @media screen and (max-width:1280px){
      width:33.3%;
      padding:10px;
      margin:15px 0px;
  }
   

`


export default VehiclesGrid