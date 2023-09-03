import React from 'react'
import NavbarStudent from '../Components/NavbarStudent'
import styled from 'styled-components';
import CustomTable from '../Components/CustomTable'; 
import StudentMenu from '../Components/StudentMenu';
import { Badge } from 'react-bootstrap';
import MenuLeft from '../../Components/MenuLeft';
import SidebarLeft from '../Components/SidebarLeft';

const CallsHead = [
    'Nº',
    'Disciplina',
    'Chamada',
    'Data & Hora'
];

const CallsBody = [
    ['1','Matematica', <Badge bg='primary' text='light'>Presente</Badge> , '12 de Maio de 2022 as 10:34'],
    ['2','Geologia', <Badge bg='info' text='light'>Falta com justificativa</Badge> , '12 de Maio de 2022 as 10:34'],
    ['3','Quimica', <Badge bg='warning' text='light'>Falta</Badge> , '12 de Maio de 2022 as 10:34'], 
    ['4','Francês', <Badge bg='danger' text='light'>Falta vermelha</Badge> , '12 de Maio de 2022 as 10:34'],
    ['5','Matematica', <Badge bg='primary' text='light'>Presente</Badge> , '12 de Maio de 2022 as 10:34'],
    ['6','Geologia', <Badge bg='info' text='light'>Falta com justificativa</Badge> , '12 de Maio de 2022 as 10:34'],
    ['7','Quimica', <Badge bg='warning' text='light'>Falta</Badge> , '12 de Maio de 2022 as 10:34'], 
    ['8','Francês', <Badge bg='danger' text='light'>Falta vermelha</Badge> , '12 de Maio de 2022 as 10:34'],
    ['9','Matematica', <Badge bg='primary' text='light'>Presente</Badge> , '12 de Maio de 2022 as 10:34'],
    ['10','Geologia', <Badge bg='info' text='light'>Falta com justificativa</Badge> , '12 de Maio de 2022 as 10:34'],
    ['11','Quimica', <Badge bg='warning' text='light'>Falta</Badge> , '12 de Maio de 2022 as 10:34'], 
    ['12','Francês', <Badge bg='danger' text='light'>Falta vermelha</Badge> , '12 de Maio de 2022 as 10:34']
];

const CallsOptions = {
   filterType : 'checkbox' 
}


function StudentCalls() {
  return (
    <div>
        <NavbarStudent/>
         <Container>
        <div className="box">
            <SidebarLeft />
            <MenuLeft/>
        </div>
            <MyCalls> 
               <div className="box">
                  <CustomTable
                     TableBody={CallsBody}
                     TableHead={CallsHead}
                     TableOptions={CallsOptions}
                     TableTitle = 'Chamadas (controle de presença na turma)'
                  />
               </div> 
         </MyCalls>
         </Container>
    </div>
  )
}


const Container = styled.div`
     display:flex; 
`;


const MyCalls = styled.section`
   padding:20px;
   padding-top:140px;
   width:100%;
   display:flex;

   .box{
      width:100%;
      padding-left:30px;
   }
`;

 


export default StudentCalls