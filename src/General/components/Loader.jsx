import React from 'react' 
import logo from '../../Assets/images/logo-small-white.png'; 

function Loader(props) {
  return (
    <div className={`loaderBox ${props.absolute ? ' absolute ' : ''} ${props.small ? ' small ' : ''} 
    ${props.ssmall ? ' ssmall ' : ''}  ${props.bg ? 'bg-main' : ''} `} >
       {props.logo ? 
         <>
            <img loading="lazy" role="presentation" src={logo}  alt="" />
         </>
          :
        <div className='spinnerLoad'>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span> 
        </div>
       }
    </div>
  )
}
export default Loader;