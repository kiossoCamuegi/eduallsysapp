import React from 'react'
import styled from 'styled-components';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline'; 
import PlayLessonOutlinedIcon from '@mui/icons-material/PlayLessonOutlined'; 
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { Avatar } from '@mui/material';
import Typography from '@mui/material/Typography';
import TableUser from '../../Components/TableUser';
import ProfileCalendar from '../../Components/ProfileCalendar';
import AddsGenerator from '../../Components/AddsGenerator';

function StudentProfileGlobal() { 
    
    const TasksHead = [  
        'Titulo',  
        'Tipo', 
        'Data de registro',
        'Data de conclusão',
        'Ação'
    ];
    
    
    const TasksOptions = {
        filterType: 'checkbox'
    }

    const TasksBody = [];

  return (
      <>
         <Container>
            <BoxFlex className='mb-2' style={{justifyContent:'space-around'}}>
                <Box className='mrb-2 boxItem'>
                        <div><PeopleOutlineIcon/></div>
                        <Block >
                            <h3>0 </h3>
                            <span> chamadas </span>
                        </Block>
                </Box>
                <Box className='mrb-2 boxItem '>
                        <div><PlayLessonOutlinedIcon/></div>
                        <Block>
                            <h3>0</h3>
                            <span> Compras </span>
                        </Block>
                </Box>
                <Box className='boxItem' >
                        <div><AssignmentOutlinedIcon/></div>
                        <Block>
                            <h3>0 </h3>
                            <span> Publicações </span>
                        </Block>
                </Box>
                <Box className='boxItem'>
                        <div><BadgeOutlinedIcon/></div>
                        <Block>
                            <h3>0</h3>
                            <span> Solicitações </span>
                        </Block>
                </Box>
            </BoxFlex>   

            {/* extra data */}


         </Container>
      </>
  )
}

const  Container = styled.div`
    width:100%; 
`;

const Block = styled.div`
  padding:0px 20px;
  display:flex;
  align-items:center;
  flex-direction:column; 
   
`


const BoxFlex = styled.div`
    display:flex;    
    width:auto;

    .full-box{
        width:60%; 
    }
 
`;

const Box = styled.div`
    width:23.9%; 
    border-radius:6px; 
    height:150px;
    margin-bottom:21px !important;
    background:var(--ed-white);  
    box-shadow:var(--ed-shadow-df);
    display:flex;
    align-items:center;
    justify-content:space-between;
    padding:20px;
    position: relative;

 

    svg{
        width:45px;
        height:45px;
        fill:var(--ed-dark);
    }

    h3{
        text-transform:capitalize;
        font-size:27px;
        color:var(--ed-dark);
        font-weight:600;
    }

    span{
        font-size:13px;
        color:var(--ed-dark);
    }
`;


export default StudentProfileGlobal