import React, { useState } from 'react'
import TCCD_coursesGrid from './Components/TCCD_coursesGrid';
import styled from 'styled-components';
import { Grid4x4, ListAltOutlined, TableBar } from '@mui/icons-material';
import TCCD_createCourse from './Components/TCCD_createCourse';
import { ListRounded } from '@material-ui/icons';
import WindowOutlinedIcon from '@mui/icons-material/WindowOutlined';
import TCCD_coursesTable from './Components/TCCD_coursesTable';

function TCCD_courses() {
  const [ActiveTab, setActiveTab] = useState(0);
  const [title, setTitle] = useState('Meus cursos');

  const ChangeTab = (e)=>{
    setActiveTab(e);
      switch (e) {
          case 0:
            setTitle('Meus cursos');
          break; 
          case 1:
            setTitle('Criar Novo Curso');
          break; 
      }
  }
  return (
    <div>
       <div className="ed-space mt-2 mb-2">
        <div className="ed-flex">
            <Title>{title}</Title>
        </div>
        <div className="ed-flex">
           <BoxMenu>        
               <li onClick={()=>ChangeTab(0)}><WindowOutlinedIcon /></li>
               <li onClick={()=>ChangeTab(2)}><ListAltOutlined/></li>
           </BoxMenu> 
           <button onClick={()=>ChangeTab(1)}  className="btn bg-main ml-2"> Criar novo curso</button>
        </div>
      </div>
        {ActiveTab === 0 ?   <TCCD_coursesGrid/> : <></>}
        {ActiveTab === 1 ?   <TCCD_createCourse/> : <></>}
        {ActiveTab === 2 ?   <TCCD_coursesTable /> : <></>}
        {ActiveTab === 3 ?   <TCCD_coursesGrid/> : <></>}
        {ActiveTab === 4 ?   <TCCD_coursesGrid/> : <></>}
        {ActiveTab === 5 ?   <TCCD_coursesGrid/> : <></>}
        {ActiveTab === 6 ?   <TCCD_coursesGrid/> : <></>}
        {ActiveTab === 7 ?   <TCCD_coursesGrid/> : <></>}
        {ActiveTab === 8 ?   <TCCD_coursesGrid/> : <></>}
    </div>
  )
}

const Title = styled.div`
   font-size:18px;
   font-weight:600;
`;

const BoxMenu = styled.ul`
  background:var(--ed-white);  
  box-shadow:var(--ed-shadow-df); 
  border-radius:6px;
  padding:6px 10px;
  display:flex;
  align-items:center;
  height:44px;
  margin:0px;

   li{
    margin:0px 5px;
    cursor:pointer;

    svg{
      width:25px;
      height:25px;
   }
  }
`;

export default TCCD_courses