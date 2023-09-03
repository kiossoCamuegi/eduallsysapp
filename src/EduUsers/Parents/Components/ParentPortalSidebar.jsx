import { InfoOutlined } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import React, { Component, useState } from 'react'
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import Hoot from '../../../General/components/Hoot';
import ReduceTextLength from '../../../General/components/ReduceTextLength';
import { GetClass, GetClasstitle_byclass } from '../../../General/components/InstituteData';
import {FaRegUserCircle} from "react-icons/fa";
import {PiChalkboardTeacherLight,PiFilmScriptLight,PiStudent,PiExamLight,PiWarningBold,PiUsers} from "react-icons/pi";
import {BsCoin,BsHandThumbsUp,BsQuestionOctagon} from "react-icons/bs";
import {MdOutlineSportsBaseball,MdOutlineAddTask} from "react-icons/md"
import {HiOutlineExternalLink} from "react-icons/hi"

class ParentPortalSidebar extends Component{
//const [ActiveTab, setActiveTab] = useState(0);

 

 state = {
   ActiveTab:0
 }

 SidebarLinks = {
   data:[
    {link:"#", icon:<FaRegUserCircle/>, title:"perfil do estudante", code:0},
    {link:"#", icon:<PiChalkboardTeacherLight/>, title:"Aprendizado", code:5},
    {link:"#", icon:<BsCoin/>, title:"Gestão de pagamentos", code:6},
    {link:"#", icon:<MdOutlineSportsBaseball/>, title:"Actividades", code:7},
    {link:"#", icon:<PiFilmScriptLight/>, title:"Plano curricular", code:8},
    {link:"#", icon:<PiExamLight/>, title:"Exames",code:9},
    {link:"#", icon:<BsHandThumbsUp/>, title:"Recomendações", code:10},
    {link:"#", icon:<BsQuestionOctagon/>, title:"Avaliação continua", code:11},
    {link:"#", icon:<PiUsers/>, title:"Professores",code:12},
    {link:"#", icon:<PiWarningBold/>, title:"Avisos", code:13},
    {link:"#", icon:<MdOutlineAddTask/>, title:"Tarefas e Projetos",code:14},
    {link:"#", icon:<PiStudent/>, title:"Colegas de turma", code:15}, 
]}


ChangePage = (e)=>{
  this.setState(state=>({ ActiveTab:e}));
}

//onClick={()=> this.ChangePage(index+1)} 

render(){
  return (
    <Sidebar>
       <div className="info-badge">
          <div className="ed-block">
               <h3>Painel de encarregado</h3>
               <span>{this.props.data.user_childs.length} estudantes</span>
          </div>
          <div className="info-link">
              <Link to="#"><InfoOutlined /></Link>
          </div>
       </div>
        <div className="childs">
           <ul>
           {this.props.data.user_childs.map((item, index)=>{
                   return(  
                      <li key={index} onClick={()=>this.props.ChangeStudent(item.ed_student_id)}  className={`${this.props.ActiveStudent*1 === item.ed_student_id*1 ? "active" : ""}`}> 
                       <div className="avatar-box">
                         <Avatar  src={Hoot()+item.ed_student_picture} sx={{width:45,height:45}} alt={item.ed_student_name}  />
                          <div className="status"></div>
                        </div> 
                        <div className="block ml-2"> 
                               <div className="name"><ReduceTextLength text={item.ed_student_name} length="25" /></div> 
                            <span><div className="d-flex">Turma - <GetClasstitle_byclass ID={item.ed_student_class}  /> </div></span>
                        </div> 
                        </li>   
                      )  
                })} 
           </ul>
        </div> 
        <hr />
        <ul className="sidebar-links">
           {this.SidebarLinks.data.map((item, index)=>{
               return(
                    <li key={index}  onClick={()=>this.props.ChangeTabPage(item.code)}  className={`${this.props.ActiveTab === item.code ? "active" : ""}`}>
                        <div className="icon">{item.icon}</div>
                        <div className="text ml-2">{item.title}</div>
                    </li>
               )
           })}
        </ul>
    </Sidebar>
 );
}}

const Sidebar = styled.div`
  height:100vh;
  max-height:100vh;
  overflow-y:auto;
  width:340px;
  min-width:340px;
  background:var(--ed-white);
  padding:20px;
  padding-top:90px;
  border-right:1px solid #eaeaee; 


  &&::-webkit-scrollbar{
    width:6px !important;
    background-color:transparent !important;
  }
    
    &&::-webkit-scrollbar-thumb{
        background:rgb(219, 219, 219) !important; 
    }


  .info-badge{
      display:flex;
      justify-content:space-between;
      align-items:center;
      border-radius:6px;
      padding:10px 15px;
      border-left:6px solid var(--ed-purple-light); 
      background:#e7e5ff;

        h3{
            font-size:16px;
            margin:5px 0px;
            font-weight:600;
        }

        span{
            font-size:15px;
           color:var(--ed-grey-text);
           font-weight:600;
        }

        .info-link{
            svg{
                width:40px;
                height:40px;
                color:var(--ed-purple-light);
            }
        }
  }


  ul{
    padding:0px;
    margin:0px;
  }


  .childs{
     ul{ 


        li{
            display:flex;
            align-items:center;
            margin:0px;
            margin-top:10px;
            padding:10px;
            width:100%;
            padding:10px;
            border-radius:6px; 
            display:flex;
            align-items:center; 
            border:1px solid #eaeaee;
            cursor:pointer;

            .name{
                font-size:15px; 
                font-weight:600;
                color:var(--ed-dark);
            }
    
            span{
                font-size:15px;
                color:var(--ed-grey-text);
            }

        }


        
      li.active{
        border-left:6px solid var(--ed-green) !important; 
      }


     }
  }


  hr{
    background:#eaeaee;
    border-color:#eaeaee;
  }

    .sidebar-links{ 
         margin:0px;
         padding:0px;

        li{
            display:flex;
            align-items:center;
            margin:5px 0px;
            padding:10px;
            list-style:none;
            color:var(--ed-dark);
            cursor:pointer;

            svg{
                width:20px;
                height:20px;
            }
        }


        li.active{
           border-left:6px solid var(--ed-purple-light);
           color:var(--ed-purple-light);

             svg{
                  color:var(--ed-purple-light);
             }
        }
     
        


    }
`;

export default ParentPortalSidebar
