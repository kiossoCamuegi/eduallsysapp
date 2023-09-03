import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Navbar from '../../components/elements/Navbar'
import Table from 'react-bootstrap/Table'; 
import { Avatar } from '@mui/material';
import MN_GeneralView from './Components/MN_GeneralView';
import MN_Calendar from './Components/MN_Calendar';
import MN_Activities from './Components/MN_Activities';
import MN_Tasks from './Components/MN_Tasks';
import MN_Dashboard from './Components/MN_Dashboard';
import MN_Settings from './Components/MN_Settings';
import { Link } from 'react-router-dom';
import { BallotOutlined, Dashboard, SettingsOutlined } from '@material-ui/icons';
import { CalendarMonthOutlined, DisplaySettingsOutlined, Logout, SpokeOutlined, TaskAltOutlined } from '@mui/icons-material';
import { UserAccountData } from '../../../General/components/UserAccountData';
import Hoot from '../../../General/components/Hoot';
import EmployeeData from '../../../EduUsers/Employees/Components/EmployeeData';
 


function ManagerProfile() {
  const [activeTab, setActiveTab] = useState(6);  
  const [UserData, setUserData] = useState({}); 
 

 function loadData(){ 
    console.log(EmployeeData);
 };
  


  useEffect(()=>{
      loadData();
  },[]);


  return (
    <div>
        <Navbar logo /> 
        <Container>
          <Menu className='profile-menu-bar'>
            <div className="ed-space">  
                  <div>
                      <ul>
                          <li className={activeTab === 1 ? 'bg-main-light' : '' }><BallotOutlined /></li>
                          <li className={activeTab === 2 ? 'bg-main-light' : '' }><CalendarMonthOutlined /></li>
                          <li className={activeTab === 3 ? 'bg-main-light' : '' }><SpokeOutlined /></li>
                          <li className={activeTab === 4 ? 'bg-main-light' : '' }><TaskAltOutlined /></li>
                          <li className={activeTab === 5 ? 'bg-main-light' : '' }><DisplaySettingsOutlined/> </li>
                          <li className={activeTab === 6 ? 'bg-main-light' : '' }><SettingsOutlined /></li>
                      </ul>
                  </div>
                  <div>
                      
                  </div>
            </div>
          </Menu>
            <Content>
                <div className="tab-container">
                    <div className={`tab-item ${activeTab === 1 ? 'active' : ''}`}>
                        <MN_GeneralView/>
                    </div>
                     <div className={`tab-item ${activeTab === 2 ? 'active' : ''}`}>
                        <MN_Calendar/>
                    </div>
                     <div className={`tab-item ${activeTab === 3 ? 'active' : ''}`}>
                        <MN_Activities/>
                    </div>
                     <div className={`tab-item ${activeTab === 4 ? 'active' : ''}`}>
                       <MN_Tasks/>
                    </div>
                     <div className={`tab-item ${activeTab === 5 ? 'active' : ''}`}>
                       <MN_Dashboard/>
                    </div>
                     <div className={`tab-item ${activeTab === 6 ? 'active' : ''}`}>
                       <MN_Settings data={UserData}  />
                    </div> 
                </div>
            </Content>
             <ProfileBox> 
              <div className="block center"> 
                  <Avatar src= {UserData.picture}  className='df'>{UserData.lettername}</Avatar>
                  <div className="ed-wrap"><h5> {UserData.fisrtlastname} </h5>
                        <div className="code bg-green-light"># {UserData.code} </div> 
                  </div>
              </div>
                <Table className='mt-4'> 
                  <tbody>
                    <tr>
                      <td><span>Telefone</span></td>
                      <td className='text-right' style={{width:'70%'}}><strong> {UserData.phone} </strong></td> 
                    </tr> 
                     <tr>
                      <td><span>Email </span></td>
                      <td className='text-right' style={{width:'70%'}}><strong> {UserData.email} </strong></td> 
                    </tr> 
                     <tr>
                      <td><span>Localização</span></td>
                      <td className='text-right' style={{width:'70%'}}><strong>Luanda, Mutamba</strong></td> 
                    </tr> 
                     <tr>
                      <td><span>Hora local</span></td>
                      <td className='text-right' style={{width:'70%'}}><strong>19:00</strong></td> 
                    </tr> 
                     <tr>
                      <td><span>Função</span></td>
                      <td className='text-right' style={{width:'70%'}}><strong>Diretor pedagogico</strong></td> 
                    </tr>  
                  </tbody>
                </Table> 
                <div className="mt-2">
                     <button className="btn">Editar perfil</button>
                </div>
             </ProfileBox>
        </Container>
    </div>
  )
}


const Container = styled.div`
    width:100%;
    display:flex;
`; 

const Menu = styled.div`
  width:80px;
  min-width:80px;  
  height:calc(100vh - 80px);
  max-height:calc(100vh - 80px); 
  border-right:1px solid #E9ECEF;

  .ed-space{
     flex-direction:column;
     height:100%;  

     div{
        width:100%;
     }

     .btn{
         svg{
            margin:0px;
            fill:var(--ed-dark);
            color:var(--ed-dark);
         }
     }


    

     ul{
        width:100%;
        list-style:none;
        margin:0px !important;
        padding:20px 10px;
        display: flex;
        align-items: center;
        justify-content: center; 
        flex-direction:column;
 
        li{ 
            margin:9px 0;
            width:45px;
            height:45px;
            min-width:45px;
            min-height:45px;
            border-radius:100%;
            display: flex;
            align-items: center;
            justify-content: center;
            animation:pop 0.2s ease-in;
            cursor:pointer;
            transition:all 1s ease;
  
            svg{
                width:23px;
                height:23px;
                fill:var(--ed-dark);
            }
        }

        li.bg-main-light{
           svg{
               color:var(--ed-white) !important;
               fill:var(--ed-white) !important;
           }
        }
     }
  }
`;

const Content = styled.div`
    width:100%;
    display:flex; 
    height:calc(100vh - 80px); 
    max-height:calc(100vh - 80px); 
    background:var(--ed-background-color);
    padding:20px; 
    overflow-y: auto;

  &::-webkit-scrollbar{
      width:6px;
      background-color:transparent;
  }
  
   &::-webkit-scrollbar-thumb{
      background:rgb(219, 219, 219); 
  }

    .tab-container{ 
      width:100%;

        .tab-item{
           display:none;
        }

        .tab-item.active{
            width:100%;
            display:block; 
        }
    }
`;

const ProfileBox = styled.div`
    min-width:350px;
    width:350px; 
    height:calc(100vh - 80px);
    max-height:calc(100vh - 80px);  
    padding:20px;
    position:relative;
    z-index:1000;
    background:var(--ed-white);
    oveflow-y:auto;
    border-left:1px solid #E9ECEF;


   table tr span, table tr strong{
      font-size:14px;
   }

     

    .block.center{
        display:flex;
        align-items:center;
        flex-direction:column;
        text-align:center;


        .MuiAvatar-root{
            width:130px;
            height:130px;
            font-size:40px;
        }
    }


    .text-right{
        text-align:right;
    }

    .btn{
        background:transparent;
        box-shadow:none;
        width:100%;
        margin:20px 0px;
        border:2px solid var(--ed-dark) !important;
        color:var(--ed-dark) !important;
    }

    .ed-wrap{
        margin-top:40px;
        align-items:center;

        h5{
          margin:0px;
          font-size:17px;
          font-weight:600;
        }

        .code{
            margin-left:10px;
            font-size:15px;
            font-weight:500;
            padding:5px;
            display:flex;
            align-items:center;
            border-radius:6px;
        }
    }
`;


export default ManagerProfile