import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import 'react-select-search/style.css';
import 'react-toastify/dist/ReactToastify.css';
import "tui-calendar/dist/tui-calendar.css";
import './css/Scheduler.css'; 
import './css/responsive.css'; 
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import './css/color.css';  
import 'animate.css';
import 'react-calendar/dist/Calendar.css'; 
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'swiper/css';  
import './css/index.css'; 
import './css/Chat.css'; 
import './css/paginate.css'; 
import './css/Reports.css'; 
import Layout from './Layout/Layout';
import{ createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './Redux/Reducers'
import axios from "axios";  
axios.defaults.withCredentials = true; 
  

const store = createStore(
  rootReducer
);
 
ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
        <Layout/>
    </React.StrictMode>  
  </Provider>, 
  document.getElementById('eduall')
);  