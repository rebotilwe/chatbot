import React from "react";
import Chatbot from "./Chatbot";

function ChatMessage({ chat }) {
  // Dynamically set the message class
  const messageClass =
    chat.role === "model" ? "bot-message" : "user-message";

  return (
    <div className={`message ${messageClass}`}>
      {chat.role === "model" && <Chatbot />}
      <p className="message-text">{chat.text}</p>
    </div>
  );
}

export default ChatMessage;
