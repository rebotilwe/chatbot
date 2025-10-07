import { useState, useEffect, useRef } from "react";
import Chatbot from "./components/Chatbot";
import ChatForm from "./components/ChatForm";
import ChatMessage from "./components/ChatMessage";

const App = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const chatEndRef = useRef(null);

  const generateBotResponse = async(history)=>{

    history = history.map(({role,text}) => ({role, parts: [{text}]}))
const requestOptions = {
  method:"POST",
  Headers: { "Content-Type":"application/json"},
  body: JSON.stringify({contents:history})
}
try{
const response = await fetch(import.meta.env.REACT_APP_GEMINI_API_KEY, requestOptions);
const data = await response.json();
if(!response.ok) throw new Error(data.error.message || "Something went wrong!");
console.log(data)
}catch (error){
  console.log(error);

};

  };

  // Auto-scroll when chatHistory updates
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  return (
    <div className="container">
      <div className="chatbot-popup">
        {/* Chat Header */}
        <div className="chat-header">
          <div className="header-info">
            <Chatbot />
            <h2 className="logo-text">Chatbot</h2>
          </div>
          <button
            className="material-symbols-rounded"
            aria-label="Minimize chat"
          >
            keyboard_arrow_down
          </button>
        </div>

        {/* Chat Body */}
        <div className="chat-body">
          <div className="message bot-message">
            <p className="message-text">
              Hey there! <br /> I'm your friendly chatbot. How can I assist you today?
            </p>
          </div>

          {/* Render chat history */}
          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}

          {/* Scroll anchor */}
          <div ref={chatEndRef} />

          {/* Chat Footer */}
          <div className="chat-footer">
            <ChatForm chatHistory={chatHistory} setChatHistory={setChatHistory} generateBotResponse={generateBotResponse} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
