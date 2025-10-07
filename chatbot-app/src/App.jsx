import { useState } from "react";
import Chatbot from "./components/Chatbot";
import ChatForm from "./components/ChatForm";
import ChatMessage from "./components/ChatMessage"; // ✅ add this

const App = () => {
  const [chatHistory, setChatHistory] = useState([]);

  return (
    <div className="container">
      <div className="chatbot-popup">
        {/* Chat Header */}
        <div className="chat-header">
          <div className="header-info">
            <Chatbot />
            <h2 className="logo-text">Chatbot</h2>
          </div>
          <button className="material-symbols-rounded" aria-label="Minimize chat">
            keyboard_arrow_down
          </button>
        </div>

        {/* Chat Body */}
        <div className="chat-body">
          <div className="message bot-message">
            {/* <Chatbot /> */}
            <p className="message-text">
              Hey there! <br /> I'm your friendly chatbot. How can I assist you today?
            </p>
          </div>

          {/* Render chat history */}
          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />   
          ))}

          {/* Chat Footer */}
          <div className="chat-footer">
            <ChatForm setChatHistory={setChatHistory} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
