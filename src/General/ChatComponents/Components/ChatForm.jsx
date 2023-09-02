import React, { useState } from 'react'
import { BiSend, BiSmile, BiSticker, BiSolidFile } from 'react-icons/bi'
import {MdAttachFile} from "react-icons/md";
import {FiSend} from "react-icons/fi";
import GifPicker from 'gif-picker-react';
import InputEmoji from 'react-input-emoji'
import CheckinternetStatus from '../../components/CheckinternetStatus';

function ChatForm(props) {
  const [show, setShow] = useState(false);
  const [GifItem , setGifItem] = useState(null);
  const [text, setText] = useState("");

  const getGifImage = (e)=>{ 
      console.clear();
      console.log(e.preview.url);
      setShow(false);
  }

  

  function handleOnEnter(text) {
    console.log("enter", text);
  }

  return (
    <div className='chat-messages-form'> 
        <div className='form' action="">
         <InputEmoji   onChange={setText}   cleanOnEnter
          onEnter={handleOnEnter} borderRadius={6} theme="light" 
           placeholder="Escreva qualquer coisa ..." /> 
            <div className="ed-flex messages-assets">
              <div className="gif-toggle">
                  <div className={show ? "" : "d-none"}> 
                  {CheckinternetStatus() ? <GifPicker locale="pt_PT" onGifClick={getGifImage} tenorApiKey={"AIzaSyAs6jyixfg6l_1hMawHp317rRdN0Fpc1dg"} />: <></> }
              </div> 
                  <div onClick={()=>setShow(show ? false : true)}><BiSticker /> </div>
              </div>
           
            <div className="file-attach">
                 <input type="file" name="" hidden id="chat-form-files" />
                 <label htmlFor="chat-form-files"><MdAttachFile /></label>
            </div>
            </div>
            <button className="btn"><FiSend/></button>
        </div>
        <div className="file-preview">

        </div>
    </div>
  )
}

/*
 <InputEmoji
          value={text}
          onChange={setText}
          cleanOnEnter
          onEnter={handleOnEnter}
          placeholder="Type a message"
        />
*/

export default ChatForm
  