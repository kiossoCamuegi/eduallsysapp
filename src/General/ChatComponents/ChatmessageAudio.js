import { PlayArrow } from '@material-ui/icons'
import React from 'react'

function ChatmessageAudio() {
  return (
    <div>
        <div className="message-audio" src=''>
            <div className="message-audio-box">
                <audio></audio>
                <div className="controls">
                    <div className="playPauseBtn">
                        <PlayArrow/>
                    </div>
                    <div className="range-bar">
                            <input type="range"  />
                    </div>
                    <div className="total-time">10:19</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ChatmessageAudio