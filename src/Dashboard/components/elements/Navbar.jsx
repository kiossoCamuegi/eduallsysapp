import { Link } from 'react-router-dom';
import styled from 'styled-components';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import ThemeModal from './ThemeModal';
import { Button} from 'react-bootstrap';  
import MenuDropdown from './MenuDropdown'; 
import { Apps, BugReport, BugReportOutlined } from '@mui/icons-material';  
import NotificationModal from '../modal/NotificationModal';
import UserModalMenu from './UserModalMenu';
  

const LogoImg = [
    require('../../../Assets/images/logo.png'),
    require('../../../Assets/images/logo-small-white.png'),
]; 

const Navbar = (props)=>{ 
    return (
        <NavbarContainer className='ed-container-navbar'> 
            <div className="ed-space">
                <div className="ed-nav-items">
                 {props.logo ?  
                   <Link to='/dashboard' >
                     <div className="ed-logo bg-main"> 
                          <img loading="lazy" role="presentation" src={LogoImg[1]} alt="eduallsys" /> 
                     </div>
                   </Link>
                 : 
                  <></>
                 }
                <div className="ed-nav-item">  
                    <Button className='bg-white text-dark'>
                        <Apps/>   
                    </Button>
                    <MenuDropdown/>  
                </div>
                </div> 
                <div className="ed-nav-item">

                    <div className="ed-icons">
                        <NotificationModal Toggle={ 
                            <>
                            <NotificationsNoneRoundedIcon />
                            <div className="count bg-danger">0</div> 
                            </>
                        }/>
                        <Link to="/chat" style={{marginLeft:'20px',marginRight:'20px'}}>
                        <MailOutlineRoundedIcon/>
                        <div className="count bg-danger">0</div>
                        </Link>
                        <ThemeModal  Toggle={<ColorLensOutlinedIcon/>} />  
                    </div>
                    <div className="ed-avatar">
                        <div className="ed-flex">
                            <UserModalMenu data={props.userdata} />
                        </div>
                    </div>
                </div>
            </div> 
      </NavbarContainer>
    );
}

const NavbarContainer = styled.nav`
    width:100%; 
    height:80px;  
    background:var(--ed-white);
    border-bottom:1px solid #E9ECEF;
    z-index:100; 
    display:flex;
    align-items:center;
    justify-content:center;

    .ed-nav-item{  
        padding:20px;    
        height:80px;     
    }

    .ed-nav-items{
        display:flex; 
        height:80px; 
    }

    .ed-logo{
        min-width:80px; 
        width:80px;
        display:flex;
        align-items: center;
        justify-content:center; 
        height:80px; 
   
       img{
          width:40px;
          height:40px;
          margin:0px;
        }
    }

    .user-menu-avatar{
        cursor:pointer;
    }

    button{ 
      box-shadow:unset; 
      border:1px solid var(--ed-silver-light) !important;
      
        svg{
            margin:0px !important;
            fill:var(--ed-blue-dark);
        } 
    }

    ul, ol{
       list-style:none !important;  
    }

    li{
        list-style:none !important;
    }
`;

export default Navbar;