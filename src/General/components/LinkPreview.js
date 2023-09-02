import React from 'react'
import { Link } from 'react-router-dom'
import ReduceTextLength from './ReduceTextLength';
const Image = require('../../Assets/images/covers/lms.jpg');
const Icon =  require('../../Assets/images/icons/youtube.png');
function LinkPreview(props){
  return (
    <div className={props.maxSize ? "ed-link-preview maxsize" : "ed-link-preview"}>
        <Link target='_blank' to='#'>
        <div className="ed-link-header">
            <img loading="lazy" role="presentation" src={Image} alt="#" />
        </div>
        <div className="ed-link-body">
                <h2>Mastery with fullstack Bootcamp cloning the world 15 top  apps.</h2>
                <small>
                    <ReduceTextLength text='You will learn how to build a whole applications  like Zoom,    Skype, Jitsi,  netflix , spotify facebook...' />
                </small>
                <div className="ed-flex">
                    <div className="icon">
                       <img loading="lazy" role="presentation" src={Icon} alt="" />
                    </div>
                    <span><ReduceTextLength text='https://therealdeveloper.io' /></span>
                </div>
            </div>
        </Link>
    </div>
  )
}

export default LinkPreview