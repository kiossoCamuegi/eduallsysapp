import React from 'react'
import { useHistory } from 'react-router-dom'
import Hoot from './Hoot';

function SwitchFromPages(props) {
  const navigate = useHistory();

  const Switch = ()=>{
      const page = props.link ? '/'+props.link : Hoot()+'logout';

      const menuitem = props.menu_item ? Math.floor(props.menu_item) : null;
      if(menuitem !== null){localStorage.setItem("CurrentPage", menuitem);}

      const menu = props.menu ? Math.floor(props.menu) : null;
      if(menu !== null){localStorage.setItem("CurrentTab", menu);}

      navigate.push(page);
  }

  return (
    <div onClick={Switch} style={{cursor:'pointer'}}>
        {
            props.toggle_btn ? props.toggle_btn : <></>
        }
    </div>
  )
}

export default SwitchFromPages