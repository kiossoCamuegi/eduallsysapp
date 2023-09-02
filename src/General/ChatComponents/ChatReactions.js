import React from 'react'

function ChatReactions(props) {
  return (
    <div>
        <div>
            {props.toggle_btn ? props.toggle_btn : ''}
        </div>
    </div>
  )
}

export default ChatReactions