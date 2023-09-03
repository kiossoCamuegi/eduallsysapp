import React, { useEffect, useState } from 'react'
import TableGrid from '../../../../../../General/components/TableGrid';
import { Avatar, AvatarGroup } from '@mui/material';
import { Refresh } from '@mui/icons-material';
import styled from 'styled-components';
const Levels = ["Iniciante", "Intermediario", "Avanaçado", "Mestre"];


const columns = [  
    { 
        field: 'title',
        headerName: 'Nome do curso', 
        resizable: true, 
        width:300,
        cellRenderer:(props)=>{
            return <Box className='ed-flex'>
                <img loading="lazy" role="presentation" class="img-thumbnail" src={props.data.imageSrc} alt="" />
                <h5>{props.data.title}</h5>
            </Box>
        }
    },
    { 
      field: 'students',
      headerName: 'Nº de estudantes matriculados',
      resizable: true,
      width:300,
     cellRenderer:(props)=>{
        return <div className='ed-block'>
            <AvatarGroup max={5}>
                {props.data.Images.map((el, i)=>{
                    return(
                        <Avatar alt="Remy Sharp" src={el} key={i} /> 
                    )
                })
                }
            </AvatarGroup>
            <div className="mt-2">
                <small>+234 alunos cadastrados</small>
            </div>
        </div>
      }
     },
     { 
        field: 'level',
        headerName: 'Nivel', 
     }, 
     { 
        field: 'createdDate',
        headerName: 'Data de criação', 
     }, 
    {
      field: '',
      headerName: 'Ação', 
       resizable: true, cellRenderer:(props) => { 
        return  <div className="ed-flex">
            
        </div>;
      }
    } 
];
  
function TCCD_coursesTable() {
    const Data = [
        {
            id:0, title:'Css design  para iniciantes',level:1, price:'0 kz', createdDate:'Criado aos 20 de Maio de 2020',
           imageSrc:require('../../../../../../Assets/images/courses/0.jpg'),
           Images :[
            require("../../../../../../Assets/images/avatars/avatar-0.jpg"),
            require("../../../../../../Assets/images/avatars/avatar-1.jpg"), 
            require("../../../../../../Assets/images/avatars/dp-2.jpg"), 
            require("../../../../../../Assets/images/avatars/dp-3.jpg"),  
            require("../../../../../../Assets/images/avatars/dp-4.jpg"), 
            require("../../../../../../Assets/images/avatars/dp-5.jpg"), 
            require("../../../../../../Assets/images/avatars/dp-6.jpg"),  
        ]
        },
        {
            id:1, title:'Aprenda javascript com 10 projectos',level:2, price:'0 kz', createdDate:'Criado aos 20 de Maio de 2020', 
           imageSrc:require('../../../../../../Assets/images/courses/1.jpg'),
           Images :[
            require("../../../../../../Assets/images/avatars/avatar-0.jpg"), 
            require("../../../../../../Assets/images/avatars/dp-1.jpg"), 
            require("../../../../../../Assets/images/avatars/dp-2.jpg"), 
            require("../../../../../../Assets/images/avatars/dp-3.jpg"),  
            require("../../../../../../Assets/images/avatars/dp-4.jpg"), 
            require("../../../../../../Assets/images/avatars/dp-5.jpg"), 
            require("../../../../../../Assets/images/avatars/dp-6.jpg"),  
        ]
        },
        {
          id:2,title:'Wordpress development for pros',level:0, price:'0 kz', createdDate:'Criado aos 20 de Maio de 2020', 
          imageSrc:require('../../../../../../Assets/images/courses/2.jpg'),
          Images :[
            require("../../../../../../Assets/images/avatars/avatar-0.jpg"), 
            require("../../../../../../Assets/images/avatars/dp-1.jpg"), 
            require("../../../../../../Assets/images/avatars/dp-2.jpg"), 
            require("../../../../../../Assets/images/avatars/dp-3.jpg"),  
            require("../../../../../../Assets/images/avatars/dp-4.jpg"), 
            require("../../../../../../Assets/images/avatars/dp-5.jpg"), 
            require("../../../../../../Assets/images/avatars/dp-6.jpg"),  
        ]
        },
        {
            id:3,title:'Sass development architecture',level:2, price:'0 kz', createdDate:'Criado aos 20 de Maio de 2020', 
            imageSrc:require('../../../../../../Assets/images/courses/3.jpg'),
            Images :[
                require("../../../../../../Assets/images/avatars/avatar-0.jpg"),
                require("../../../../../../Assets/images/avatars/avatar-1.jpg"),
                require("../../../../../../Assets/images/avatars/dp-3.jpg") ,
                require("../../../../../../Assets/images/avatars/dp-4.jpg"), 
                require("../../../../../../Assets/images/avatars/dp-5.jpg"), 
                require("../../../../../../Assets/images/avatars/dp-6.jpg"),  
            ]
        },
        {
             id:4, title:'Node.js API deployment',level:3, price:'0 kz', createdDate:'Criado aos 20 de Maio de 2020',
             imageSrc:require('../../../../../../Assets/images/courses/4.jpg'),
             Images :[
                require("../../../../../../Assets/images/avatars/avatar-0.jpg"),
                require("../../../../../../Assets/images/avatars/avatar-1.jpg"),
                require("../../../../../../Assets/images/avatars/dp-3.jpg"), 
                require("../../../../../../Assets/images/avatars/dp-3.jpg"),  
                require("../../../../../../Assets/images/avatars/dp-4.jpg"), 
                require("../../../../../../Assets/images/avatars/dp-5.jpg"), 
                require("../../../../../../Assets/images/avatars/dp-6.jpg"),  
            ]
        },
        {
            id:5,title:'Fullstack development',level:0, price:'0 kz', createdDate:'Criado aos 20 de Maio de 2020', 
            imageSrc:require('../../../../../../Assets/images/courses/5.jpg'),
            Images:[
                require("../../../../../../Assets/images/avatars/avatar-0.jpg"),
                require("../../../../../../Assets/images/avatars/avatar-1.jpg"), 
                require("../../../../../../Assets/images/avatars/avatar-7.jpg"),
                require("../../../../../../Assets/images/avatars/dp-1.jpg"), 
                require("../../../../../../Assets/images/avatars/dp-2.jpg"), 
                require("../../../../../../Assets/images/avatars/dp-3.jpg"),  
                require("../../../../../../Assets/images/avatars/dp-4.jpg"), 
                require("../../../../../../Assets/images/avatars/dp-5.jpg"), 
                require("../../../../../../Assets/images/avatars/dp-6.jpg"),  
            ]
        },
        {
            id:6,title:'Vue.js course from 0% to 100%',level:0, price:'0 kz', createdDate:'Criado aos 20 de Maio de 2020',
             imageSrc:require('../../../../../../Assets/images/courses/6.jpg'),
             Images:[
                require("../../../../../../Assets/images/avatars/avatar-0.jpg"),
                require("../../../../../../Assets/images/avatars/avatar-1.jpg"), 
                require("../../../../../../Assets/images/avatars/dp-2.jpg"), 
                require("../../../../../../Assets/images/avatars/dp-3.jpg"),  
                require("../../../../../../Assets/images/avatars/dp-4.jpg"), 
                require("../../../../../../Assets/images/avatars/dp-5.jpg"), 
                require("../../../../../../Assets/images/avatars/dp-6.jpg"),  
            ]
         },
        {
            id:7,title:'Arquitectura de computadores',level:'', price:'0 kz', createdDate:'Criado aos 20 de Maio de 2020',
             imageSrc:require('../../../../../../Assets/images/courses/7.jpg'),
             Images :[
                require("../../../../../../Assets/images/avatars/avatar-0.jpg"),
                require("../../../../../../Assets/images/avatars/avatar-1.jpg"),
                require("../../../../../../Assets/images/avatars/dp-3.jpg"),
                require("../../../../../../Assets/images/avatars/avatar-3.jpg"),
                require("../../../../../../Assets/images/avatars/avatar-4.jpg"),
                require("../../../../../../Assets/images/avatars/avatar-5.jpg"),
                require("../../../../../../Assets/images/avatars/avatar-6.jpg"),
                require("../../../../../../Assets/images/avatars/avatar-7.jpg"),
                require("../../../../../../Assets/images/avatars/dp-1.jpg"), 
                require("../../../../../../Assets/images/avatars/dp-2.jpg"), 
                require("../../../../../../Assets/images/avatars/dp-3.jpg"),  
                require("../../../../../../Assets/images/avatars/dp-4.jpg"), 
                require("../../../../../../Assets/images/avatars/dp-5.jpg"), 
                require("../../../../../../Assets/images/avatars/dp-6.jpg"),  
            ]
         }
    ];
    const [data, setData] = useState([]); 
    const [load, setLoaded] = useState(false);
   
    async function loadData(){
        //const response = await axios.get(TABLEURL);
        setData(Data);
        setLoaded(true);
    }
  
    useEffect(()=>{
        loadData();  
    },[]);
  

   
    if(load){
        return (
            <div>
              <TableGrid
                  TableHead={columns}
                  TableBody={data} 
                  TableTitle=''
                  TableHeight={420}
                  TableBtn={<button className="btn table-btn-small el-refresh-list bg-main-light  ml-2" onClick={loadData}><Refresh /></button>}
              />
          </div>
          ) 
    }
}
const Box = styled.div`
 padding:7px;
    
   h5{
      font-size:15px;
      margin:0px;
      margin-left:10px;  
    }

   img{
       width:100px;
       min-height:70px;
   }
`;

export default TCCD_coursesTable
