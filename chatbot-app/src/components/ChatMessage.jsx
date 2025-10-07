import React from 'react'
import Chatbot from './Chatbot'

function ChatMessage({chat}) {
  return (
    <div className={`message ${chat.role === "model" ? 'bot' : 'user'} -message`}>
        {chat.role === "model" && <Chatbot/>}
     <p className="message-text">
              {chat.text}
            </p>
            </div>
  )
}

export default ChatMessage
