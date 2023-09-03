import { style } from '@mui/system';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect, useRef , useState} from 'react';
 
import {
    BookmarkAddOutlined,
    GridViewOutlined,
    CurrencyExchangeOutlined,
    PeopleAltOutlined,
    SchoolOutlined,
    DepartureBoardOutlined,  
    TakeoutDiningOutlined,
    MenuBookOutlined, 
    AdminPanelSettingsOutlined,
    SettingsOutlined,
    AppRegistrationOutlined,
    BallotOutlined,
    SummarizeOutlined,
    SettingsInputCompositeOutlined, 
    CheckBoxOutlined, 
    ViewModule, 
    ChevronRightOutlined,  
    AccountCircleOutlined,
    AppsOutageOutlined,
    MenuTwoTone,
    KeyboardArrowLeft,
    KeyboardArrowRight,
    Close,
    Home,
    HomeOutlined,
    PersonAddAltOutlined,
    PersonOutline,
    InfoOutlined,
    MarkAsUnread,
    Grid3x3Outlined,
    ViewColumnOutlined,
 }  from '@mui/icons-material'; 
 import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';

import { InfoRounded, Score, ScoreOutlined } from '@material-ui/icons';
import Tooltip from '../../../General/components/Tooltip';
import { useHistory } from 'react-router-dom';
import { SetFullWindowStatus } from './FullWindowStatus';
const LogoImg = [
    require('../../../Assets/images/logo.png'),
    require('../../../Assets/images/logo-small-white.png'),
]; 

const clickToggleContainer = (container_ref, container_toggle_ref)=>{
    document.addEventListener("onmousedown", (e)=>{
        if(container_toggle_ref.current && 
          container_toggle_ref.current.contains(e.target)){
              container_ref.current.classList.toggle('hide');
          }
          if(container_ref.current.classList.contains("hide")){
              container_toggle_ref.innerHtml = <KeyboardArrowRight/>
          }else{
            container_toggle_ref.current.innerHtml = <KeyboardArrowLeft/>
          }
    });
}

const clickToggleSidebar = (sidebarMenu_ref, sidebarToggle_ref, container_ref)=>{
    document.addEventListener("onmousedown", (e)=>{
       if(sidebarToggle_ref.current
         && sidebarToggle_ref.current.contains(e.target)){
             sidebarMenu_ref.current.classList.toggle("d-none");
        }
    })
}



const Sidebar = (props)  =>{
    const navigate = useHistory();
    const container_ref = useRef(null);
    const container_toggle_ref = useRef(null);  
    const sidebarLeft_ref = useRef(null); 
    const sidebarMenu_ref = useRef(null);
    const sidebarToggle_ref = useRef(null);
    const i = localStorage.getItem("CurrentTab"); 
    const e = localStorage.getItem("CurrentPage"); 
    const  CurrentTab = (JSON.parse(i) ?  i : 1)*1 
    const  CurrentPage = Math.floor(JSON.parse(e) ?  e : null);
    const [ToggleState, setToggleState] = useState(CurrentTab);
    const [Togglecurrentpage, setTogglecurrentpage] = useState(CurrentPage);

     
    clickToggleSidebar(container_ref, sidebarMenu_ref, sidebarToggle_ref);

    const showSidebarMenu = ()=> {   
      if(container_ref.current.classList.contains("hide") && sidebarMenu_ref.current.classList.contains("d-none")
       && !sidebarLeft_ref.current.classList.contains("d-none")){
        sidebarLeft_ref.current.classList.contains("d-none") === false ? sidebarLeft_ref.current.classList.toggle("d-none") : sidebarLeft_ref.current.classList.add("d-none");
        sidebarMenu_ref.current.classList.contains("d-none") === true ? sidebarMenu_ref.current.classList.toggle("d-none") : sidebarMenu_ref.current.classList.remove("d-none");   
 

      }else if(!container_ref.current.classList.contains("hide")){
        container_ref.current.classList.toggle("hide");
        sidebarLeft_ref.current.classList.contains("d-none") === false ? sidebarLeft_ref.current.classList.toggle("d-none") : sidebarLeft_ref.current.classList.add("d-none");
        sidebarMenu_ref.current.classList.contains("d-none") === true ? sidebarMenu_ref.current.classList.toggle("d-none") : sidebarMenu_ref.current.classList.remove("d-none");   
         

      }else{
          container_ref.current.classList.toggle("hide");
          sidebarLeft_ref.current.classList.contains("d-none") === true ? sidebarLeft_ref.current.classList.toggle("d-none") : sidebarLeft_ref.current.classList.remove("d-none");
          sidebarMenu_ref.current.classList.contains("d-none") === false ? sidebarMenu_ref.current.classList.toggle("d-none") : sidebarMenu_ref.current.classList.add("d-none");
 
      }  
    }

    clickToggleContainer(container_ref, container_toggle_ref);

    const showMenu = ()=>    {
        if(!sidebarMenu_ref.current.classList.contains("d-none")){
            sidebarMenu_ref.current.classList.toggle("d-none"); 
        }  
        if(sidebarLeft_ref.current.classList.contains("d-none")){
            sidebarLeft_ref.current.classList.toggle("d-none"); 
         }  
        container_ref.current.classList.toggle('hide'); 
    }
 
    const ChangePage = (e)=>{ 
        localStorage.setItem("CurrentPage", e);
        setTogglecurrentpage(e);
    }

    const toggleTab = (index)=>{
        localStorage.setItem("CurrentTab", index);
        setToggleState(index); 
        if(!sidebarMenu_ref.current.classList.contains("d-none")){
            sidebarMenu_ref.current.classList.toggle("d-none"); 
        }  
        if(sidebarLeft_ref.current.classList.contains("d-none")){
            sidebarLeft_ref.current.classList.toggle("d-none"); 
         }  
         if(container_ref.current.classList.contains("hide")){
          container_ref.current.classList.toggle("hide");  
       }
     }


     const toggleTab2 = (index)=>{
        localStorage.setItem("CurrentTab", index);
        setToggleState(index); 

        if(!sidebarMenu_ref.current.classList.contains("d-none")){
            sidebarMenu_ref.current.classList.toggle("d-none"); 
        }  
        if(sidebarLeft_ref.current.classList.contains("d-none")){
            sidebarLeft_ref.current.classList.toggle("d-none"); 
         }  
         if(container_ref.current.classList.contains("hide")){
            container_ref.current.classList.toggle("hide");  
         }
     }
 

 
setInterval(() => {
    let containerBox = document.querySelectorAll(".dashboard-pages");
    if(containerBox.length >= 1){ 
         if(containerBox[0].querySelectorAll("div").length < 6){ 
            ChangePage(1)
         }else{
            // console.log("Total = "+containerBox[0].querySelectorAll("div").length);
         }
    }    
}, 1000);




  
 return (
    <Container id='dashboard-sidebar'>
        <SidebarLeft id='sidebar-left' className='sidebar-transparent hide d-none' ref={sidebarLeft_ref}>
            <div className="logo bg-main">
                <Link to='/Dashboard'> <img loading="lazy" role="presentation" src={LogoImg[1]} alt="eduallsys" /></Link>
            </div>
            <ul>
                <div className='menu'>
                    <Tooltip  place='right' text='Dashboard' toggle_btn={
                        <Link to='/Dashboard' className={ToggleState === 1 ? "active" : ''}  onClick={()=> toggleTab(1)}><GridViewOutlined/></Link>
                    } /> 
                    {props.Access && props.Access.ed_user_access_myinstitute*1 === 1 ? 
                    <Tooltip  place='right' text='Minha escola' toggle_btn={ 
                        <Link className={ToggleState === 2 ? "active" : ''}  onClick={()=> toggleTab(2)}><SchoolOutlined/></Link> 
                        } />
                   : <></>  } 
                     {props.Access && props.Access.ed_user_access_secretary*1 === 1 ? 
                     <Tooltip  place='right' text='Secretaria' toggle_btn={ 
                        <Link className={ToggleState === 3 ? "active" : ''}  onClick={()=> toggleTab(3)}><PeopleAltOutlined/></Link> 
                        } />
                   : <></>  } 
                    {props.Access && props.Access.ed_user_access_administration*1 === 1 ? 
                    <Tooltip  place='right' text='Administração' toggle_btn={ 
                        <Link className={ToggleState === 4 ? "active" : ''}  onClick={()=> toggleTab(4)} ><AccountCircleOutlined/>  </Link>
                    } /> 
                   : <></>  } 
                    {props.Access && props.Access.ed_user_access_finances*1 === 1 ? 
                    <Tooltip  place='right' text='Finanças' toggle_btn={ 
                        <Link className={ToggleState === 5 ? "active" : ''}  onClick={()=> toggleTab(5)}><CurrencyExchangeOutlined/></Link>
                    } />
                   : <></>  } 
                    {props.Access && props.Access.ed_user_access_pedagogicalarea*1 === 1 ? 
                    <Tooltip  place='right' text='Área pedagógica' toggle_btn={ 
                        <Link className={ToggleState === 6 ? "active" : ''}  onClick={()=> toggleTab(6)} ><BookmarkAddOutlined/></Link>
                    } />
                   : <></>  } 
                    {props.Access && props.Access.ed_user_access_transportation*1 === 1 ? 
                    <Tooltip  place='right' text='Transporte' toggle_btn={ 
                        <Link className={ToggleState === 7 ? "active" : ''}  onClick={()=> toggleTab(7)}><DepartureBoardOutlined/></Link>
                    } />
                   : <></>  }
                      {props.Access && props.Access.ed_user_access_library*1 === 1 ? 
                    <Tooltip  place='right' text='Biblioteca' toggle_btn={ 
                        <Link className={ToggleState === 8 ? "active" : ''}  onClick={()=> toggleTab(8)}><AutoStoriesOutlinedIcon/></Link>
                        } /> 
                   : <></>  }  
                </div> 
                <hr />
                <div className='menu-bottom'>
                  {props.Access && props.Access.ed_user_access_system*1 === 1 ? 
                   <Tooltip  place='right' text='Sistema' toggle_btn={ 
                    <Link className={ToggleState === 11 ? "active" : ''}  onClick={()=> toggleTab(11)}><AppsOutageOutlined/></Link> 
                    } /> 
                   : <></>  } 
                   {props.Access && props.Access.ed_user_access_configuration*1 === 1 ? 
                   <Tooltip  place='right' text='Configurações' toggle_btn={ 
                    <Link className={ToggleState === 12 ? "active" : ''}  onClick={()=> toggleTab(12)}><SettingsOutlined/></Link>
                    } /> 
                   : <></>} 
                </div>
            </ul>
        </SidebarLeft>
        <SidebarMenu className='sidebar-menu' ref={sidebarMenu_ref}>
            <div className="logo bg-main">
                <Link to='#' className='logo-link'> <img loading="lazy" role="presentation" src={LogoImg[0]} alt="eduallsys" /></Link>
            </div>
            <ul>
                <div className='menu'>  
                    <Link to='/dashboard' className={ToggleState === 1 ? "active" : ''}  onClick={()=> toggleTab2(1)}>
                        <div><GridViewOutlined/><span>Dashboard</span></div>
                        <div> <ChevronRightOutlined/></div> 
                    </Link> 
                    {props.Access && props.Access.ed_user_access_myinstitute*1 === 1 ? 
                      <Link  to="#"   className={ToggleState === 2 ? "active" : ''}  onClick={()=> toggleTab2(2)}>
                        <div><SchoolOutlined/><span>Minha escola</span></div>
                        <div> <ChevronRightOutlined/></div> 
                     </Link> 
                   : <></>  } 
                     {props.Access && props.Access.ed_user_access_secretary*1 === 1 ? 
                     <Link  to="#"   className={ToggleState === 3 ? "active" : ''}  onClick={()=> toggleTab2(3)} >
                        <div><PeopleAltOutlined/> <span>Secretaria</span></div>
                        <div> <ChevronRightOutlined/></div> 
                      </Link>
                   : <></>  } 
                    {props.Access && props.Access.ed_user_access_administration*1 === 1 ? 
                       <Link className={ToggleState === 4 ? "active" : ''}  onClick={()=> toggleTab2(4)} >
                          <div><AccountCircleOutlined/><span>Administração</span></div>
                          <div> <ChevronRightOutlined/></div> 
                      </Link>
                   : <></>  } 
                    {props.Access && props.Access.ed_user_access_finances*1 === 1 ? 
                      <Link  to="#"   className={ToggleState === 5 ? "active" : ''}  onClick={()=> toggleTab2(5)}>
                        <div><CurrencyExchangeOutlined/><span>Finanças</span></div>
                         <div> <ChevronRightOutlined/></div> 
                     </Link>
                   : <></>  } 
                    {props.Access && props.Access.ed_user_access_pedagogicalarea*1 === 1 ? 
                      <Link className={ToggleState === 6 ? "active" : ''}  onClick={()=> toggleTab2(6)} >
                        <div><BookmarkAddOutlined/><span>Área Pedagógica</span></div>
                        <div> <ChevronRightOutlined/></div> 
                     </Link>
                   : <></>  } 
                    {props.Access && props.Access.ed_user_access_transportation*1 === 1 ? 
                      <Link  to="#"   className={ToggleState === 7 ? "active" : ''}  onClick={()=> toggleTab2(7)}>
                        <div><DepartureBoardOutlined/><span>Transporte</span></div>
                        <div> <ChevronRightOutlined/></div> 
                     </Link>
                   : <></>  }
                      {props.Access && props.Access.ed_user_access_library*1 === 1 ? 
                    <Link  to="#"   className={ToggleState === 8 ? "active" : ''}  onClick={()=> toggleTab2(8)}>
                        <div><AutoStoriesOutlinedIcon/> <span>Biblioteca</span></div>
                        <div> <ChevronRightOutlined/></div> 
                    </Link> 
                   : <></>  }  
                </div> 
                <div><hr /></div>
                <div>
                {props.Access && props.Access.ed_user_access_system*1 === 1 ? 
                     <Link  to="#"   className={ToggleState === 11 ? "active" : ''}  onClick={()=> toggleTab2(11)}>
                       <div><AppsOutageOutlined/><span>Sistema</span></div>
                       <div> <ChevronRightOutlined/></div> 
                    </Link> 
                   : <></>} 
                   {props.Access && props.Access.ed_user_access_configuration*1 === 1 ? 
                     <Link  to="#"   className={ToggleState === 12 ? "active" : ''}  onClick={()=> toggleTab2(12)}> 
                        <div><SettingsOutlined/> <span>Configurações</span></div>
                        <div> <ChevronRightOutlined/></div> 
                     </Link>
                   : <></>}  
                    <br />
                </div>
            </ul>
        </SidebarMenu>
        <SidebarRight className='sidebar-right hide' ref={container_ref}> 
            <menu className={ToggleState === 1 ? "d-none" : 'd-none'}></menu>
            <menu className={ToggleState === 2 ? "active" : ''}>
                <div className="ed-space">
                    <h2>Minha escola</h2>
                    <div className='close-menu'  ref={container_toggle_ref} onClick={()=> showMenu()}><Close/></div>
                </div>
                <ul>
                <Box className="sidebar-box" >
                    <Title><InfoOutlined/><h1>Instituição</h1> </Title>
                    <ol>
                        <li className={Togglecurrentpage  === 0 ? "active-page" : ''}  onClick={()=> ChangePage(0)} ><Link to="/about_institute">Sobre a Minha Instituição</Link></li>   
                    </ol>
                </Box>
                <Box className="sidebar-box" >
                    <Title><AppRegistrationOutlined/><h1>Configurar instituição</h1> </Title>
                    <ol>
                        <li className={Togglecurrentpage === 1 ? "active-page" : ''}  onClick={()=> ChangePage(1)} ><Link to="/NewCourse">Registrar Curso</Link></li>
                        <li className={Togglecurrentpage  === 2 ? "active-page" : ''}  onClick={()=> ChangePage(2)} ><Link to="/New_academic_year">Criar Ano Academico</Link></li>
                        <li className={Togglecurrentpage  === 3 ? "active-page" : ''}  onClick={()=> ChangePage(3)} ><Link to="/New_classroom">Registrar Salas</Link></li>
                        <li className={Togglecurrentpage  === 5 ? "active-page" : ''}  onClick={()=> ChangePage(5)} ><Link to="/New_employee">Cadastrar  Funcionarios</Link></li>  
                        <li className={Togglecurrentpage  === 6 ? "active-page" : ''}  onClick={()=> ChangePage(6)}><Link to="/Subjects">Registrar Disciplinas</Link></li>
                        <li className={Togglecurrentpage  === 7 ? "active-page" : ''}  onClick={()=> ChangePage(7)} ><Link to="/Timing">Gerar Horarios</Link></li>   
                        <li className={Togglecurrentpage  === 8 ? "active-page" : ''}  onClick={()=> ChangePage(8)} ><Link to="/newacademiclevel">Criar Classe</Link></li>  
                        <li className={Togglecurrentpage  === 9 ? "active-page" : ''}  onClick={()=> ChangePage(9)} ><Link to="/NewCicle">Adicionar Novos ciclos</Link></li> 
                        <li className={Togglecurrentpage  === 4 ? "active-page" : ''}  onClick={()=> ChangePage(4)} ><Link to="/New_class">Adicionar Turmas Novas</Link></li> 
                        <li className={Togglecurrentpage  === 11 ? "active-page" : ''}  onClick={()=> ChangePage(11)} ><Link to="/NewProvider">Registrar Fornecedor</Link></li>  
                        <li className={Togglecurrentpage  === 10 ? "active-page" : ''}  onClick={()=> ChangePage(10)} ><Link to="/NewService">Cadastar Serviços</Link></li>  
                        <li className={Togglecurrentpage  === 12 ? "active-page" : ''}  onClick={()=> ChangePage(12)} ><Link to="/NewSchoolsOfProvenance">Criar Escolas De Proveniência</Link></li>  
                    </ol>
                </Box>  
                </ul>
            </menu>
            <menu className={ToggleState === 3 ? "active" : ''} > 
                <div className="ed-space">
                    <h2>Secretaria</h2>
                    <div className='close-menu'  ref={container_toggle_ref} onClick={()=> showMenu()}><Close/></div>
                </div>
                <ul>
                <Box className="sidebar-box" >
                    <Title><AppRegistrationOutlined/><h1>Registro de informação</h1> </Title>
                    <ol>
                        <li className={Togglecurrentpage  === 13 ? "active-page" : ''}  onClick={()=> ChangePage(13)} ><Link to="/NewStudentBase">Adicionar Estudante</Link></li>
                        <li className={Togglecurrentpage  === 144 ? "active-page" : ''}  onClick={()=> ChangePage(144)} ><Link to="/studentenrollment">Efectuar Matrícula</Link></li>
                        <li className={Togglecurrentpage  === 14 ? "active-page" : ''}  onClick={()=> ChangePage(14)} ><Link to="#">Solicitação de anulação</Link></li>
                        <li className={Togglecurrentpage  === 15 ? "active-page" : ''}  onClick={()=> ChangePage(15)} ><Link to="/feespayments">Pagar Propinas</Link></li>
                        <li className={Togglecurrentpage  === 16 ? "active-page" : ''}  onClick={()=> ChangePage(16)} ><Link to="/requestdeclaration">Solicitar Declarações</Link></li>
                        <li className={Togglecurrentpage  === 25 ? "active-page" : ''}  onClick={()=> ChangePage(25)} ><Link to="/studenttransfer">Solicitar Transferencia</Link></li>
                        <li className={Togglecurrentpage  === 18 ? "active-page" : ''}  onClick={()=> ChangePage(18)} ><Link to="/answerrequests">Atender Solicitações</Link></li>
                        <li className={Togglecurrentpage  === 142 ? "active-page" : ''}  onClick={()=> ChangePage(142)} ><Link to="/newparent">Cadastrar Encarregados</Link></li>
                    </ol>
                </Box>
                <Box className="sidebar-box" >
                    <Title><BallotOutlined/><h1>Listagem de informação</h1></Title>
                    <ol>
                        <li className={Togglecurrentpage  === 17 ? "active-page" : ''}  onClick={()=> ChangePage(17)} ><Link to="/Students">Lista de estudantes</Link></li> 
                        <li className={Togglecurrentpage  === 19 ? "active-page" : ''}  onClick={()=> ChangePage(19)} ><Link to="#">Cartão de estudante</Link></li>
                        <li className={Togglecurrentpage  === 20 ? "active-page" : ''}  onClick={()=> ChangePage(20)} ><Link to="/extracts">Extratos</Link></li>
                        <li className={Togglecurrentpage  === 21 ? "active-page" : ''}  onClick={()=> ChangePage(21)} ><Link to="/enrolledstudents">Matrículas</Link></li>
                        <li className={Togglecurrentpage  === 23 ? "active-page" : ''}  onClick={()=> ChangePage(23)} ><Link to="/confirmedenrollment">Confirmações</Link></li>
                        <li className={Togglecurrentpage  === 141 ? "active-page" : ''}  onClick={()=> ChangePage(141)} ><Link to="/parents">Encarregados</Link></li>
                    </ol>
                </Box>
                <Box className="sidebar-box" >
                    <Title><SummarizeOutlined/><h1>Relatórios</h1> </Title>
                    <ol>
                        <li className={Togglecurrentpage === 22 ? "active-page" : ''}  onClick={()=> ChangePage(22)} ><Link to="/enrollmentanuallreports">Matrículas e Confirmações</Link></li>
                        <li className={Togglecurrentpage === 143 ? "active-page" : ''}  onClick={()=> ChangePage(143)} ><Link to="/enrollmentconfirmationreports">Confirmações anuais</Link></li>
                    </ol>
                </Box> 
                </ul>
            </menu>  
            <menu className={ToggleState === 4 ? "active" : ''}>
                <div className="ed-space">
                    <h2>Administração</h2>
                    <div className='close-menu'  ref={container_toggle_ref} onClick={()=> showMenu()}><Close/></div>
                </div>
                <ul>
                <Box className="sidebar-box" >
                    <Title><AppRegistrationOutlined/><h1>Registro de informação</h1> </Title>
                    <ol>
                        <li className={Togglecurrentpage === 30 ? "active-page" : ''}  onClick={()=> ChangePage(30)} ><Link to="/studenttransfer">Solicitação de transferencia</Link></li> 
                        <li className={Togglecurrentpage === 31 ? "active-page" : ''}  onClick={()=> ChangePage(31)} ><Link to="#">Solicitação de anulação</Link></li> 
                        <li className={Togglecurrentpage === 32 ? "active-page" : ''}  onClick={()=> ChangePage(32)} ><Link to="#">Emição de cartão escolar</Link></li> 
                        <li className={Togglecurrentpage === 38 ? "active-page" : ''}  onClick={()=> ChangePage(38)} ><Link to="#">Emição de comunicado</Link></li> 
                        <li className={Togglecurrentpage === 39 ? "active-page" : ''}  onClick={()=> ChangePage(39)} ><Link to="/smsservices">Serviços de SMS </Link></li> 
                        <li className={Togglecurrentpage === 40 ? "active-page" : ''}  onClick={()=> ChangePage(40)} ><Link to="/emailservices">Serviços de Email </Link></li> 
                        <li className={Togglecurrentpage === 145 ? "active-page" : ''}  onClick={()=> ChangePage(145)} ><Link to="/declarations">Emição de  declaração</Link></li>                         
                    </ol>
                </Box>
                <Box className="sidebar-box" >
                    <Title><BallotOutlined/><h1>Listagem de informação</h1></Title>
                    <ol>
                        <li className={Togglecurrentpage === 146 ? "active-page" : ''}  onClick={()=> ChangePage(146)} ><Link to="/Students"> Listagem de alunos  </Link></li> 
                        <li className={Togglecurrentpage === 147 ? "active-page" : ''}  onClick={()=> ChangePage(147)} ><Link to="/parents">Encarregados de educação </Link></li>
                        <li className={Togglecurrentpage === 148 ? "active-page" : ''}  onClick={()=> ChangePage(148)} ><Link to="/employees">Lista de funcionarios</Link></li> 
                        <li className={Togglecurrentpage === 151 ? "active-page" : ''}  onClick={()=> ChangePage(151)} ><Link to="#">Lista de stock </Link></li> 
                        <li className={Togglecurrentpage === 152 ? "active-page" : ''}  onClick={()=> ChangePage(152)} ><Link to="#">Listagem de transporte</Link></li> 
                    </ol>
                </Box> 
                </ul>
            </menu>  
            <menu className={ToggleState === 5 ? "active" : ''}>
                <div className="ed-space">
                    <h2>Finanças</h2>
                    <div className='close-menu'  ref={container_toggle_ref} onClick={()=> showMenu()}><Close/></div>
                </div>
                <ul>
                <Box className="sidebar-box" >
                    <Title><ViewModule/><h1>Tesouraria</h1> </Title>
                    <ol>
                        <li className={Togglecurrentpage === 61 ? "active-page" : ''}  onClick={()=> ChangePage(61)} ><Link to="/DashboardFinance">Dashboard financeiro</Link></li>  
                        <li className={Togglecurrentpage === 45 ? "active-page" : ''}  onClick={()=> ChangePage(45)} ><Link to="/feespayments">Pagar Propinas</Link></li> 
                        <li className={Togglecurrentpage === 47 ? "active-page" : ''}  onClick={()=> ChangePage(47)} ><Link to="/buspayments">Pagar Transporte</Link></li> 
                        <li className={Togglecurrentpage === 60 ? "active-page" : ''}  onClick={()=> ChangePage(60)} ><Link to="/pointofsales_dashboard">Ponto de venda </Link></li> 
                        <li className={Togglecurrentpage === 50 ? "active-page" : ''}  onClick={()=> ChangePage(50)} ><Link to="/servicepayments">Pagar outros serviços</Link></li> 

                        <li className={Togglecurrentpage === 149 ? "active-page" : ''}  onClick={()=> ChangePage(149)} ><Link to="#">Ponto de vendas</Link></li> 
                        <li className={Togglecurrentpage === 47 ? "active-page" : ''}  onClick={()=> ChangePage(47)} ><Link to="/buspayments">Contas a pagar</Link></li> 
                        <li className={Togglecurrentpage === 60 ? "active-page" : ''}  onClick={()=> ChangePage(60)} ><Link to="/pointofsales_dashboard">Contas a receber</Link></li> 
                        <li className={Togglecurrentpage === 50 ? "active-page" : ''}  onClick={()=> ChangePage(50)} ><Link to="/servicepayments">Abertura e feixo ede caixa </Link></li> 
                    </ol>
                </Box>  
                <Box className="sidebar-box" >
                    <Title><BallotOutlined/><h1>Relatórios</h1></Title>
                    <ol>
                        <li className={Togglecurrentpage === 46 ? "active-page" : ''}  onClick={()=> ChangePage(46)} ><Link to="/Generalpayments">Pagamentos gerais</Link></li> 
                        <li className={Togglecurrentpage === 121 ? "active-page" : ''} onClick={()=> ChangePage(121)} ><Link to="/invoicing">Faturação</Link></li>  
                        <li className={Togglecurrentpage === 51 ? "active-page" : ''}  onClick={()=> ChangePage(51)} ><Link to="/listpayments">Listar pagamentos</Link></li> 
                        <li className={Togglecurrentpage === 52 ? "active-page" : ''}  onClick={()=> ChangePage(52)} ><Link to="/studenttuition">Pagamento de Propinas</Link></li>
                        <li className={Togglecurrentpage === 53 ? "active-page" : ''}  onClick={()=> ChangePage(53)} ><Link to="/transporttuition">Mensalidades de transporte</Link></li>
                        <li className={Togglecurrentpage === 54 ? "active-page" : ''}  onClick={()=> ChangePage(54)} ><Link to="/listfeedebts">Listar Devedores</Link></li>    
                    </ol>
                </Box> 
                <Box className="sidebar-box" >
                    <Title><AppRegistrationOutlined/><h1>Configurações</h1> </Title>
                    <ol>
                        <li className={Togglecurrentpage === 57 ? "active-page" : ''} onClick={()=> ChangePage(57)} ><Link to="/fineprices">Aplicar Multas </Link></li> 
                        <li className={Togglecurrentpage === 58 ? "active-page" : ''}  onClick={()=> ChangePage(58)} ><Link to="/definecoins">Definir Moedas </Link></li> 
                        <li className={Togglecurrentpage === 59 ? "active-page" : ''}  onClick={()=> ChangePage(59)} ><Link to="/iva_and_discounts">Descontos </Link></li> 
                    </ol>
                </Box>
                </ul>
            </menu>
            <menu className={ToggleState === 6 ? "active" : ''}  >
                <div className="ed-space">
                    <h2>Aréa pedagógica</h2>
                    <div className='close-menu'  ref={container_toggle_ref} onClick={()=> showMenu()}><Close/></div>
                </div>
                <ul>
                <Box className="sidebar-box" >
                    <Title><AppRegistrationOutlined/><h1>Registro de informação</h1> </Title>
                    <ol>
                        <li className={Togglecurrentpage === 63 ? "active-page" : ''}  onClick={()=> ChangePage(63)} ><Link to="/timing">Emissão de horários</Link></li> 
                        <li className={Togglecurrentpage === 64 ? "active-page" : ''}  onClick={()=> ChangePage(64)} ><Link to="#">Gestão de efectividade</Link></li> 
                        <li><Link  to="/subjects_assignement">Disciplinas</Link></li>   
                        <li className={Togglecurrentpage === 66 ? "active-page" : ''}  onClick={()=> ChangePage(66)} ><Link to="/curricularplan">Plano curricular</Link></li>   
                        <li className={Togglecurrentpage === 67 ? "active-page" : ''}  onClick={()=> ChangePage(67)} ><Link to="#">Cartão escolar</Link></li>  
                        <li className={Togglecurrentpage === 153 ? "active-page" : ''}  onClick={()=> ChangePage(153)} ><Link to="/pdg_attendance">Livro de ponto</Link></li>  
                        <li className={Togglecurrentpage === 154 ? "active-page" : ''}  onClick={()=> ChangePage(154)} ><Link to="/pdg_exams">Calendário de provas</Link></li>  
                    </ol>
                </Box>
                <Box className="sidebar-box" >
                    <Title><ScoreOutlined /> <h1>Lançar Notas</h1></Title>
                    <ol>
                        <li className={Togglecurrentpage === 68 ? "active-page" : ''}  onClick={()=> ChangePage(68)} ><Link to="/quarterlynotes">Notas  Trimestrais </Link></li>  
                        <li className={Togglecurrentpage === 71 ? "active-page" : ''}  onClick={()=> ChangePage(71)} ><Link to="/feature_notes">Notas do Recurso </Link></li>  
                        <li className={Togglecurrentpage === 72 ? "active-page" : ''}  onClick={()=> ChangePage(72)} ><Link to="#">Matriz de Resultados</Link></li>
                    </ol>
                </Box>
                <Box className="sidebar-box" >
                    <Title><ViewColumnOutlined/> <h1>Turmas</h1></Title>
                    <ol>
                        <li className={Togglecurrentpage === 135 ? "active-page" : ''}  onClick={()=> ChangePage(135)} ><Link to="/studentsbyclass">Listar turmas</Link></li>  
                        <li className={Togglecurrentpage === 136 ? "active-page" : ''}  onClick={()=> ChangePage(136)} ><Link to="/miniguidelines">Mini Pautas-Modelo</Link></li>   
                        <li className={Togglecurrentpage === 137 ? "active-page" : ''}  onClick={()=> ChangePage(137)} ><Link to="/notesbyquarter">Mini Pautas - Trimestrais</Link></li>  
                        <li className={Togglecurrentpage === 138 ? "active-page" : ''}  onClick={()=> ChangePage(138)} ><Link to="/generalagendaforthequarter">Pauta geral</Link></li>       
                    </ol>
                </Box>
                <Box className="sidebar-box" >
                    <Title><BallotOutlined/> <h1>Listar resultados</h1> </Title>
                    <ol>
                        <li className={Togglecurrentpage === 73 ? "active-page" : ''}  onClick={()=> ChangePage(73)} ><Link to="/quarternotes">Pautas Trimestrais </Link></li>  
                        <li className={Togglecurrentpage === 76 ? "active-page" : ''}  onClick={()=> ChangePage(76)} ><Link to="/exam_guidelines">Pautas dos exames </Link></li>
                        <li className={Togglecurrentpage === 77 ? "active-page" : ''}  onClick={()=> ChangePage(77)} ><Link to="/quarternotesbyclass">Pauta final por turma</Link></li> 
                        <li className={Togglecurrentpage === 128 ? "active-page" : ''}  onClick={()=> ChangePage(128)} ><Link to="/studentmarks">Boletim de notas </Link></li>    
                        <li className={Togglecurrentpage === 129 ? "active-page" : ''}  onClick={()=> ChangePage(129)} ><Link to="/schoolmarks">Boletim escolar </Link></li> 
                        <li className={Togglecurrentpage === 130 ? "active-page" : ''}  onClick={()=> ChangePage(130)} ><Link to="/ViewStatistics">Visualizar estatisticas </Link></li> 
                        <li className={Togglecurrentpage === 131 ? "active-page" : ''}  onClick={()=> ChangePage(131)} ><Link to="/quarterfinalagenda">Pauta final do trimestre</Link></li> 
                        <li className={Togglecurrentpage === 132 ? "active-page" : ''}  onClick={()=> ChangePage(132)} ><Link to="/generateterms">Emitir termos </Link></li> 
                        <li className={Togglecurrentpage === 133 ? "active-page" : ''}  onClick={()=> ChangePage(133)} ><Link to="/MarksRanking">Ranking de notas </Link></li> 
                    </ol>
                </Box> 
                </ul>
            </menu>
            <menu className={ToggleState === 7 ? "active" : ''}>
            <div className="ed-space">
                    <h2>Transporte</h2>
                    <div className='close-menu'  ref={container_toggle_ref} onClick={()=> showMenu()}><Close/></div>
                </div>
                <ul>
                <Box className="sidebar-box" >
                    <Title><AppRegistrationOutlined/><h1>Registro de informação</h1> </Title>
                    <ol>
                        <li className={Togglecurrentpage === 80 ? "active-page" : ''}  onClick={()=> ChangePage(80)} ><Link to="/registerroute">Adicionar rotas</Link></li>
                        <li className={Togglecurrentpage === 81 ? "active-page" : ''}  onClick={()=> ChangePage(81)} ><Link to="/registertransportpassengers">Adicionar passageiros</Link></li>
                        <li className={Togglecurrentpage === 82 ? "active-page" : ''}  onClick={()=> ChangePage(82)} ><Link to="/registerstops">Adicionar paragens</Link></li>
                        <li className={Togglecurrentpage === 83 ? "active-page" : ''}  onClick={()=> ChangePage(83)} ><Link to="/registertransportdriver">Registrar motorista</Link></li>
                        <li className={Togglecurrentpage === 84 ? "active-page" : ''}  onClick={()=> ChangePage(84)} ><Link to="/registervehicles">Registrar viatura</Link></li>
                        <li className={Togglecurrentpage === 85 ? "active-page" : ''}  onClick={()=> ChangePage(85)} ><Link to="/vehiclesmaintenance">Registro de manutenção</Link></li> 
                        <li className={Togglecurrentpage === 106 ? "active-page" : ''} onClick={()=> ChangePage(106)} ><Link to="#">Emissão de contratos </Link></li>
                    </ol>
                </Box>
                <Box className="sidebar-box" >
                    <Title><BallotOutlined/><h1>Listagem de informação</h1></Title>
                    <ol>
                        <li className={Togglecurrentpage === 86 ? "active-page" : ''}  onClick={()=> ChangePage(86)} ><Link to="/TransportRoutes">Lista das rotas</Link></li>
                        <li className={Togglecurrentpage === 87 ? "active-page" : ''}  onClick={()=> ChangePage(87)} ><Link to="/transportpassengers">Lista dos passageiros</Link></li>
                        <li className={Togglecurrentpage === 88 ? "active-page" : ''}  onClick={()=> ChangePage(88)} ><Link to="/driversgridlist">Motoristas</Link></li>
                        <li className={Togglecurrentpage === 89 ? "active-page" : ''}  onClick={()=> ChangePage(89)} ><Link to="/vehiclesgridview">Viaturas cadastradas</Link></li>
                        <li className={Togglecurrentpage === 90 ? "active-page" : ''}  onClick={()=> ChangePage(90)} ><Link to="/Transportstops">Paragens registradas</Link></li>
                        <li className={Togglecurrentpage === 91 ? "active-page" : ''}  onClick={()=> ChangePage(91)} ><Link to="/">Contratos</Link></li>
                    </ol>
                </Box>
                <Box className="sidebar-box" >
                    <Title><SummarizeOutlined/><h1>Relatórios</h1> </Title>
                    <ol>
                        <li className={Togglecurrentpage === 100 ? "active-page" : ''}  onClick={()=> ChangePage(100)} ><Link to="/">Relatórios de rotas </Link></li>
                        <li className={Togglecurrentpage === 101 ? "active-page" : ''}  onClick={()=> ChangePage(101)} ><Link to="/">Reclamações dos alunos</Link></li>
                        <li className={Togglecurrentpage === 102 ? "active-page" : ''}  onClick={()=> ChangePage(102)} ><Link to="/">Relatório de viaturas </Link></li>
                        <li className={Togglecurrentpage === 103 ? "active-page" : ''}  onClick={()=> ChangePage(103)} ><Link to="/">Emissão de etinerário</Link></li>
                        <li className={Togglecurrentpage === 104 ? "active-page" : ''}  onClick={()=> ChangePage(104)} ><Link to="/">Controle de kilometragem </Link></li>
                        <li className={Togglecurrentpage === 105 ? "active-page" : ''}  onClick={()=> ChangePage(105)} ><Link to="/">Controle de combustivel</Link></li>
                        <li className={Togglecurrentpage === 107 ? "active-page" : ''}  onClick={()=> ChangePage(107)} ><Link to="/">Faturação </Link></li>
                    </ol>
                </Box> 
                </ul>
            </menu> 
            <menu className={ToggleState === 8 ? "active" : ''} >
            <div className="ed-space">
                    <h2>Biblioteca</h2>
                    <div className='close-menu'  ref={container_toggle_ref} onClick={()=> showMenu()}><Close/></div>
                </div>
                <ul>
                <Box className="sidebar-box" >
                    <Title><AppRegistrationOutlined/><h1>Cadastros da biblioteca</h1> </Title>
                    <ol> 
                        <li className={Togglecurrentpage === 108 ? "active-page" : ''}  onClick={()=> ChangePage(108)} ><Link to="/library_registernewbook">Cadastro de livro </Link></li> 
                        <li className={Togglecurrentpage === 109 ? "active-page" : ''}  onClick={()=> ChangePage(109)} ><Link to="/library_registerrack">Adicionar prateleira</Link></li>
                        <li className={Togglecurrentpage === 110 ? "active-page" : ''}  onClick={()=> ChangePage(110)} ><Link to="/library_registerauthor">Cadastro de autor </Link></li> 
                        <li className={Togglecurrentpage === 111 ? "active-page" : ''}  onClick={()=> ChangePage(111)} ><Link to="/library_registerpublisher">Registrar Editora</Link></li>
                        <li className={Togglecurrentpage === 112 ? "active-page" : ''}  onClick={()=> ChangePage(112)} ><Link to="/library_newtypeofbook">Registrar tipo de livro</Link></li>
                        <li className={Togglecurrentpage === 113 ? "active-page" : ''}  onClick={()=> ChangePage(113)} ><Link to="/library_categories">Adicionar nova catégoria</Link></li>   
                        <li className={Togglecurrentpage === 114 ? "active-page" : ''}  onClick={()=> ChangePage(114)} ><Link to="/">Criar Coleção</Link></li>   
                        <li className={Togglecurrentpage === 140 ? "active-page" : ''}  onClick={()=> ChangePage(140)} ><Link to="/library_borrowbook">Emprestar livros</Link></li>  
                    </ol>
                </Box>
                <Box className="sidebar-box" >
                    <Title><BallotOutlined/><h1>Listagem de informação</h1></Title>
                    <ol>
                        <li className={Togglecurrentpage === 115 ? "active-page" : ''}  onClick={()=> ChangePage(115)} ><Link to="/library_books">Lista dos livros</Link></li>  
                        <li className={Togglecurrentpage === 117 ? "active-page" : ''}  onClick={()=> ChangePage(117)} ><Link to="/library_books_to_receive">Livros não devolvidos</Link></li>
                        <li className={Togglecurrentpage === 118 ? "active-page" : ''}  onClick={()=> ChangePage(118)} ><Link to="/library_books_grid">Grade de livros</Link></li>    
                    </ol>
                </Box>
                <Box className="sidebar-box" >
                    <Title><SummarizeOutlined/><h1>Relatórios</h1> </Title>
                    <ol>
                        <li className={Togglecurrentpage === 119 ? "active-page" : ''}  onClick={()=> ChangePage(119)} ><Link to="/">Entrada e saida de livros</Link></li>  
                        <li className={Togglecurrentpage === 120 ? "active-page" : ''}  onClick={()=> ChangePage(120)} ><Link to="/library_dashboard">Dashboard bibliotecario </Link></li>  
                    </ol>
                </Box> 
                </ul>
            </menu>
            <menu className={ToggleState === 11 ? "active" : ''} >
            <div className="ed-space">
                    <h2>Sistema</h2>
                    <div className='close-menu'  ref={container_toggle_ref} onClick={()=> showMenu()}><Close/></div>
                </div>
                <ul>
                <Box className="sidebar-box" >
                    <Title><AppRegistrationOutlined/><h1>Registro de informação</h1> </Title>
                    <ol>
                    
                        <li className={Togglecurrentpage === 150 ? "active-page" : ''}  onClick={()=> ChangePage(150)} ><Link to="/newuserregister">Contas de usúarios</Link></li> 
                        <li className={Togglecurrentpage === 151 ? "active-page" : ''}  onClick={()=> ChangePage(151)} ><Link to="/usersaccounts">Contas de usúarios</Link></li> 
                        <li className={Togglecurrentpage === 152 ? "active-page" : ''}  onClick={()=> ChangePage(152)} ><Link to="/">Niveis de acesso</Link></li>

                    </ol>
                </Box>
                <Box className="sidebar-box" >
                    <Title><BallotOutlined/><h1>Listagem de informação</h1></Title>
                    <ol>
                        
                    </ol>
                </Box> 
                <Box className="sidebar-box" >
                    <Title><SummarizeOutlined/><h1>Relatórios</h1> </Title>
                    <ol>
                        <li className={Togglecurrentpage === 43 ? "active-page" : ''}  onClick={()=> ChangePage(43)} ><Link to="/systemvisits">Visitas no sistema </Link></li> 
                        <li className={Togglecurrentpage === 33 ? "active-page" : ''}  onClick={()=> ChangePage(33)} ><Link to="/auditory">Auditoria</Link></li> 
                    </ol>
                </Box> 
                <Box className="sidebar-box" >
                    <Title><SettingsInputCompositeOutlined/><h1>Definições de gestão</h1> </Title>
                    <ol>
                        
                    </ol>
                </Box>
                </ul>
            </menu>  
            <menu className={ToggleState === 12 ? "active" : ''} >
            <div className="ed-space">
                    <h2>Configurações</h2>
                    <div className='close-menu'  ref={container_toggle_ref} onClick={()=> showMenu()}><Close/></div>
                </div>
                <ul>
                <Box className="sidebar-box" >
                    <Title><HomeOutlined/><h1>configurações gerais</h1> </Title>
                    <ol> 
                        <li className={Togglecurrentpage === 1 ? "active-page" : ''}  onClick={()=> ChangePage(1)} ><Link to="/">Configurações do servidor</Link></li>
                        <li className={Togglecurrentpage === 1 ? "active-page" : ''}  onClick={()=> ChangePage(1)} ><Link to="/configurate_dashboard">Personalizar o Dashboard</Link></li>
                        <li className={Togglecurrentpage === 1 ? "active-page" : ''}  onClick={()=> ChangePage(1)} ><Link to="/">Pagamentos da instituição</Link></li> 
                        <li className={Togglecurrentpage === 1 ? "active-page" : ''}  onClick={()=> ChangePage(1)} ><Link to="/settings_paymentmethond">Pagamento da licença</Link></li> 
                        <li className={Togglecurrentpage === 1 ? "active-page" : ''}  onClick={()=> ChangePage(1)} ><Link to="/">Permições de usúario</Link></li> 
                        <li className={Togglecurrentpage === 1 ? "active-page" : ''}  onClick={()=> ChangePage(1)} ><Link to="/">Notificações</Link></li> 
                        <li className={Togglecurrentpage === 1 ? "active-page" : ''}  onClick={()=> ChangePage(1)} ><Link to="/">Comunicação</Link></li> 
                        <li className={Togglecurrentpage === 1 ? "active-page" : ''}  onClick={()=> ChangePage(1)} ><Link to="/">Alertas e anúncios</Link></li> 
                        <li className={Togglecurrentpage === 1 ? "active-page" : ''}  onClick={()=> ChangePage(1)} ><Link to="/">Backup de dados</Link></li>  
                        <li className={Togglecurrentpage === 1 ? "active-page" : ''}  onClick={()=> ChangePage(1)} ><Link to="/">Ajuda e  suporte</Link></li>  
                    </ol>
                </Box> 
                <Box className="sidebar-box" >
                    <Title><PersonOutline /><h1>Configurações pessoais</h1> </Title>
                    <ol>
                    <li className={Togglecurrentpage === 1 ? "active-page" : ''}  onClick={()=> ChangePage(1)} ><Link to="/">Notificações</Link></li> 
                    <li className={Togglecurrentpage === 1 ? "active-page" : ''}  onClick={()=> ChangePage(1)} ><Link to="/">A minha conta</Link></li> 
                    <li className={Togglecurrentpage === 1 ? "active-page" : ''}  onClick={()=> ChangePage(1)} ><Link to="/">As minhas ações</Link></li>  
                    </ol>
                </Box>
                </ul>
            </menu> 
            <div ref={container_toggle_ref} className="toggle-sidebar-menu" onClick={()=> showSidebarMenu()} > <MenuTwoTone/> </div>
        </SidebarRight>
    </Container>
  );
}

const Container = styled.div` 
   display:flex;  
`;

const SidebarMenu = styled.div`
    height:100vh;
    background:var(--ed-purple);
    border-right:1px solid #E9ECEF; 
    width:270px; 
    min-width:270px;
    max-width:270px; 

   .logo{
      width:100%;
      display:flex;
      align-items:center;  
      padding-left:20px; 
      margin-bottom:10px;
      height:80px;

       .logo-link:hover{ 
          background:unset !important;
       }

       img{ 
           max-width:200px;
           margin:0px; 
       }
   }

    hr{
        border:1px solid #E9ECEF; 
        width:100%;
        height:1px;
    }
  
    ul{
        padding:5px 10px;
        display:flex;
        flex-direction:column;  
        justify-content:space-between;
        width:100%;
        height:92vh;   
         
        div{
          display:flex;
          flex-direction:column;
  
          a{
              margin:6.5px 0;
              width:100%;
              height:45px;
              min-width:45px;
              min-height:45px; 
              padding:0 10px;
              display: flex;
              align-items: center; 
              justify-content:space-between;
              animation:pop 0.2s ease-in;
              transition:all 0.4s ease-in-out;
              padding-left:15px !important;
              border-radius:6px;

              div{
                display: flex;
                align-items: center; 
                flex-direction:row !important;
              }
              
              cursor:pointer;
              transition:all 1s ease;
    
              svg{
                  width:23px;
                  height:23px;
                  fill:var(--ed-white);
                  color:var(--ed-white);
              }

              span{
                  font-size:15px;
                  margin-left:10px;
                  color:var(--ed-white);
                  
              }
          }

           a:hover, .active{
              background-color:var(--ed-purple-light);
              color:#41365c !important;
              box-shadow: var(--ed-shadow-df); 
          }
        }  


`

const SidebarLeft = styled.div`
  width:80px;
  min-width:80px; 
  background:var(--ed-purple);
  height:100vh;
  border-right:1px solid #E9ECEF;

  .logo {
     width:100%;
     display:flex;
     align-items: center;
     justify-content:center; 
     height:80px;

 

    img{
       width:40px;
       margin:0px;
     }
   }

  hr{
      border:1px solid grey; 
      width:100%;
      height:1px;
  }

  ul{
      padding:6px;
      display:flex;
      flex-direction:column;
      margin:0px;
      justify-content: space-between; 
      width:100%;
      height:92vh; 
      align-items: center;

      @media screen and (max-width:1280px){
         height:90vh;
      }

      div{
        display:flex;
        flex-direction:column;

        a{
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
                fill:var(--ed-white); 
                color:var(--ed-white);
            }
        }

        .active{
            background-color:var(--ed-purple-light) !important;
            color:#41365c !important;
            box-shadow: var(--ed-shadow-df);
        }
      }

      .menu{
          max-height:63vh; 
          overflow-y:auto;
      }

    .menu::-webkit-scrollbar{
        width:0px;
        background: transparent;
      }
    
    .menu::-webkit-scrollbar-thumb{
         width:0px;
         background-color: transparent;
     }
  }
`;


const SidebarRight = styled.div`
   position:relative;  
   background:var(--ed-white);
   animation:pop 0.4s ease-in; 


   .toggle-sidebar-menu{
        width:28px;
        height:28px;
        display:flex;
        align-items:center;
        justify-content:center;
        cursor:pointer;
        text-align: center;
        border-radius:100%;
        background:#000;
        color:var(--ed-white);
        font-size:19px;
        position:absolute;
       bottom:150px;
       z-index:100;
       right:-12px; 

       svg{
         width:18px;
         height:18px; 
       }
   }

   menu{
       padding:0;
       padding-top:20px;
       border:1px solid #E9ECEF; 
       border-left:0px !important;
       width:270px;
       height:100vh;
       min-width:270px;
       max-width:270px; 
       background:var(--ed-white);
       margin:0px;
       animation:pop 0.4s ease-in; 
       display:none;


       li.active-page{  
            list-style:none !important;
            margin-left:-19px;

            a{
                color:var(--white);
                padding:4px 10px;
                border-radius:6px; 
            }
       }

    h2{
        font-size:19px;
        margin:0;
        font-weight:600;
        margin-left:10px;
    }


    .close-menu svg{
      width:20px;
      cursor:pointer;
      margin-right:10px;
      fill:#000 !important;
    }

    ul{
        padding:10px;
        max-height:94vh;
        overflow-y:auto; 


        div:last-child{
            border-bottom:none !important;
        }
    }
 
    ul::-webkit-scrollbar{
        width:0px;
        background: transparent;
     }
 
     ul::-webkit-scrollbar-thumb{
         width:0px;
         background-color: transparent;
     }
   }

   menu.active{
    display:block!important;
  }

`;


const Box = styled.div` 
   margin-bottom:15px;
   padding-bottom:25px;
   border-bottom:1px solid var(--ed-silver);

   ol{
       padding:0;
       padding-left:20px;

       li{
           margin:10px 0;
           list-style:circle !important; 

           a{
               font-size:13.5px;
               color:var(--ed-dark);
               font-weight: normal !important;
           }
       }
   } 

`;

const Title = styled.div`
  display:flex;
  align-items:center;
  margin-top:25px;
  margin-bottom:15px;

  svg{
      fill:var(--dark);
      width:23px;
      height:23px;
      margin-right:10px;
  }

  h1{
      padding:0;
      margin:0;
      font-size:15px;
  }


`;
 


export default Sidebar;