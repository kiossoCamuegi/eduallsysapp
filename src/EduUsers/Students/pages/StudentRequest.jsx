import React from 'react'
import NavbarStudent from '../Components/NavbarStudent'
import styled from 'styled-components';
import CustomTable from '../Components/CustomTable'; 
import StudentMenu from '../Components/StudentMenu';
import { Badge } from 'react-bootstrap';
import NewRequestModal from '../Components/NewRequestModal';

const RequestHead = [
    'Nº',
    'Tipo de solicitação',
    'Data de solicitação',
    'Status',
    'Descriçao',
    'Ação'
];

const RequestBody = [
     
];

const RequestOptions = {
   filterType : 'checkbox' 
}


function StudentRequest() {
    document.title = "Solicitações de estudante";
    return (
        <div>
            <NavbarStudent/>
            <MyRequest>
                 <StudentMenu/>
                 <div className="box">
                    <div className="ed-space mt-4">
                        <div></div>
                        <div>
                            <NewRequestModal/>
                        </div>
                    </div>
                   <CustomTable
                      TableBody={RequestBody}
                      TableHead={RequestHead}
                      TableOptions={RequestOptions}
                      TableTitle = 'Solicitações de estudante'
                    />
                 </div> 
            </MyRequest>
        </div>
      )
}


const MyRequest = styled.section`
   padding:20px;
   padding-top:140px;
   width:100%;
   display:flex;

   .box{
      width:100%;
      padding-left:30px;
   }
`;


export default StudentRequest