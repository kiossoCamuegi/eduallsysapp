import React, {useState, useEffect} from 'react'
import {Form, Offcanvas} from 'react-bootstrap'
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import { Save } from '@mui/icons-material';

import { useDispatch } from 'react-redux'

import ThemeAction from '../../../Redux/Actions/ThemeAction'
import { Check } from '@material-ui/icons';
import KeyShortcut from '../../../General/components/KeyShortcut';

const mode_settings = [
    {
        id: 'light',
        name: 'Light',
        background: 'ed-white-main',
        class: 'theme-mode-light'
    },
    {
      id: 'lightBar',
      name: 'Light without bars',
      background: 'ed-white',
      class: 'theme-mode-light-bar'
     },
    {
        id: 'dark',
        name: 'Dark',
        background: 'ed-dark',
        class: 'theme-mode-dark'
    },
    {
      id: 'darkBlue',
      name: 'Dark blue',
      background: 'ed-blue-dark-light',
      class: 'theme-mode-dark-blue'
  }
]

const color_settings = [
    {
        id: 'blue',
        name: 'Blue',
        background: 'ed-blue',
        background_two:'ed-blue-light',
        class: 'theme-color-blue'
    },
    {
        id: 'red',
        name: 'Red',
        background: 'ed-red',
        background_two:'ed-red-light',
        class: 'theme-color-red'
    },
    {
      id: 'pink',
      name: 'Pink',
      background: 'ed-pink',
      background_two:'ed-pink-light',
      class: 'theme-color-pink'
    },
    {
      id: 'brown',
      name: 'Brown',
      background: 'ed-brown',
      background_two:'ed-brown-light',
      class: 'theme-color-brown'
   },
    {
        id: 'cyan',
        name: 'Cyan',
        background: 'ed-cyan',
        background_two:'ed-cyan-light',
        class: 'theme-color-cyan'
    },
    {
      id: 'purple',
      name: 'Purple',
      background: 'ed-purple',
      background_two:'ed-purple-light',
      class: 'theme-color-purple'
   },
    {
        id: 'green',
        name: 'Green',
        background: 'ed-green',
        background_two:'ed-green-light',
        class: 'theme-color-green'
    },
    {
        id: 'orange',
        name: 'Orange',
        background: 'ed-orange',
        background_two:'ed-orange-light',
        class: 'theme-color-orange'
    },
    {
      id: 'custommer',
      name: 'Customer',
      background: 'ed-customer-color',
      background_two:'ed-customer-color-light',
      class: 'theme-color-customer'
  },
]

const ThemeModal = props => { 
    const [show, setShow] = useState(false); 
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true); 
   
    const [currMode, setcurrMode] = useState('light') 
    const [currColor, setcurrColor] = useState('purple')
   
    const [PrimaryColor, SetPrimaryColor] = useState("");
    const [SeconderyColor, SetSeconderyColor] = useState("");

    const CrDashStyle = localStorage.getItem("DashboardStyle") ? localStorage.getItem("DashboardStyle") : 3
    const [DashboardStyle , setDashboardStyle] = useState(CrDashStyle);

    const ChangeDashboardStyle = (e)=>{
        setDashboardStyle(e)
        localStorage.setItem("DashboardStyle");
    }
 
    const dispatch = useDispatch()

    const setMode = mode => {
        setcurrMode(mode.id)
        localStorage.setItem('themeMode', mode.class)
        dispatch(ThemeAction.setMode(mode.class))
    }

    const setColor = color => {
        setcurrColor(color.id)
        localStorage.setItem('colorMode', color.class)
        document.body.classList.toggle(color.class);
        dispatch(ThemeAction.setColor(color.class))
    }


   const ChangeCustomerColor =(e)=>{
       switch (e.target.id) {
        case "primary-color":
              localStorage.setItem("customer-primary-color", e.target.value);
              document.documentElement.style.setProperty("--ed-customer-color", e.target.value);   
              SetPrimaryColor(e.target.value);
          break;
          case "secondary-color":
            localStorage.setItem("customer-secondery-color", e.target.value);
            document.documentElement.style.setProperty("--ed-customer-color-light", e.target.value);
            SetSeconderyColor(e.target.value);       
         break;
       }
   } 

    useEffect(() => {
        const themeClass = mode_settings.find(e => e.class === localStorage.getItem('themeMode', 'theme-mode-light')) 
        const colorClass = color_settings.find(e => e.class === localStorage.getItem('colorMode', 'theme-color-purple'))

        SetPrimaryColor(localStorage.getItem("customer-primary-color") !== null ? localStorage.getItem("customer-primary-color") : "#fff");
        SetSeconderyColor(localStorage.getItem("customer-secondery-color") !== null ? localStorage.getItem("customer-secondery-color") : "#fff");
        document.documentElement.style.setProperty("--ed-customer-color-light", SeconderyColor);
        document.documentElement.style.setProperty("--ed-customer-color", PrimaryColor);  

        if (themeClass !== undefined) setcurrMode(themeClass.id) 
        if (colorClass !== undefined) setcurrColor(colorClass.id)

    }, []);



  /*
    document.onkeydown = (e)=>{
      if(e.key.toLocaleLowerCase() === "t"){ 
          if(KeyShortcut('t', null, "themecolorpanel")){
             e.preventDefault();
             show === false ? handleShow() : handleClose(); 
          };  
       }  
    }*/


    return (
      <div>
        <a className='switchTheme'><li onClick={handleShow} className="me-2">{props.Toggle}</li></a>
        <Offcanvas placement='end' id="offcanvasRight" show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Aparéncia</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
             <div className="container-theme">
                  <ul className="theme-mode">
                    <h2 className="title">Escolher um Tema</h2>
                       {
                         mode_settings.map((item, index)=>(
                           <li key={index} onClick={()=> setMode(item)}>
                             <div className={`check ${item.id === currMode ? 'active': ''}`}></div>
                              <div  className='ed-flex' >
                                   <div className={`color`} style={{background:`var(--${item.background})`}}>
                                       {item.id === "lightBar" ? <div className='bg-main color-half'></div> : <></>}
                                    </div> 
                              </div>
                              <span className='ml-2'>{item.name}</span>
                           </li>
                         ))
                       }
                  </ul>
                  <ul className="theme-color">
                      <h2 className="title">Escolher uma Cor</h2>
                      {
                         color_settings.map((item, index)=>(
                           <li key={index} onClick={()=> setColor(item)}>
                             <div className={`${item.id === currColor ? 'active': ''}`}></div>
                              <div  className='ed-flex' >
                                   <div className={`color`}  style={{background:`var(--${item.background})`}}></div>
                                   <div className={`color`}  style={{background:`var(--${item.background_two})`}}></div>
                              </div>
                              <span className='ml-2'>{item.name}</span>
                           </li>
                         ))
                       }
                  </ul>
                  <ul>
                    <h2 className="title">Custumizar dashboard</h2>
                    <div className="sidebar-boxes">
                      
                         <div onClick={()=>ChangeDashboardStyle(1)}  className={DashboardStyle !== 1 ? "box light"  : "box light active-sidebar-style"}>
                             <div className="box-option">
                              <div className="side-item"> 
                                  <div className="left">
                                      <div className="active-option bg-main"></div>
                                  </div>
                                  <div className="right">
                                    <div className="column">
                                          <div></div>
                                          <div className='b2'></div>
                                          <div className='b3'></div>
                                    </div>
                                    <div className="column">
                                          <div className='b2'></div>
                                          <div></div>
                                          <div className='b3'></div>
                                    </div>
                                  </div>
                              </div>
                           </div> 
                         </div>

                                               
                         <div onClick={()=>ChangeDashboardStyle(2)}  className={DashboardStyle !== 2 ? "box"  : "box active-sidebar-style"}>
                             <div className="box-option">
                              <div className="side-item"> 
                                  <div className="left"><div className="active-option bg-main"></div></div>
                                  <div className="right">
                                    <div className="column">
                                          <div></div>
                                          <div className='b2'></div>
                                          <div className='b3'></div>
                                    </div>
                                    <div className="column">
                                          <div className='b2'></div>
                                          <div></div>
                                          <div className='b3'></div>
                                    </div>
                                  </div>
                              </div>
                           </div> 
                         </div>

                                               
                         <div  onClick={()=>ChangeDashboardStyle(3)}  className={DashboardStyle !== 3 ? "box navbar-main"  : "box navbar-main active-sidebar-style"}>
                             <div className="box-option">
                              <div className="side-item"> 
                                  <div className="bg-main left"><div className="active-option bg-main-light"></div></div>
                                  <div className="right">
                                    <div className="column">
                                          <div></div>
                                          <div className='b2'></div>
                                          <div className='b3'></div>
                                    </div>
                                    <div className="column">
                                          <div className='b2'></div>
                                          <div></div>
                                          <div className='b3'></div>
                                    </div>
                                  </div>
                              </div>
                           </div> 
                         </div> 

                         <div  onClick={()=>ChangeDashboardStyle(4)}  className={DashboardStyle !== 4 ? "box dark-simple"  : "box dark-simple active-sidebar-style"}>
                          <div className="check-item">
                              <div className="check"><Check/></div>
                          </div>
                             <div className="box-option">
                              <div className="side-item"> 
                                  <div className="left"><div className="active-option bg-main-light"></div></div>
                                  <div className="right">
                                    <div className="column">
                                          <div></div>
                                          <div className='b2'></div>
                                          <div className='b3'></div>
                                    </div>
                                    <div className="column">
                                          <div className='b2'></div>
                                          <div></div>
                                          <div className='b3'></div>
                                    </div>
                                  </div>
                              </div>
                           </div> 
                         </div>  
                    
                    </div>
                  </ul>
                  <ul>
                      <h2 className="title">Gerar tema custumizado</h2>
                      <Form id='ed-set-theme' className='col-12'> 
                           <Form.Group className='col-12 mt-4'> 
                               <div className="block col-12  mb-4">
                                  <Form.Label>Cor primária</Form.Label>
                                  <Form.Control onChange={ChangeCustomerColor} value={PrimaryColor} id="primary-color" type='color'/>
                               </div>
                               <div className="block col-12 mb-4">
                                  <Form.Label>Cor secundária</Form.Label>
                                  <Form.Control onChange={ChangeCustomerColor} value={SeconderyColor} id="secondary-color" type='color'/>
                               </div> 
                               <Form.Group className="mb-3 ml-2 d-flex align-center" controlId="formBasicCheckbox">
                                  <Form.Check type="checkbox" label="Aplicar tema para toda instituição" />
                              </Form.Group>
                               <button className="btn btn-main col-12" id=""><Save/> Salvar e aplicar</button>
                               <div className="mt-4">
                                  <p>
                                      <span className='text-danger'>*</span>
                                      <small className='ml-2'>
                                         os temas aplicados neste formulario poderão ser salvos para futuras alterações
                                         de design para sua interface ou para interface da sua instituição ou para todos os usuarios 
                                         da plataforma Eduall.
                                      </small>
                                  </p>
                               </div>
                           </Form.Group> 
                      </Form>
                  </ul>
             </div>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    );
}
export default ThemeModal
 