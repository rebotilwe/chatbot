import { useState, useEffect, useRef } from "react";
import Chatbot from "./components/Chatbot";
import ChatForm from "./components/ChatForm";
import ChatMessage from "./components/ChatMessage";

const App = () => {
  const [chatHistory, setChatHistory] = useState([]);
    const [showChatbot, setShowChatbot] = useState(false);
  const chatEndRef = useRef(null);
  const chatBodyRef = useRef();

const generateBotResponse = async (history, setChatHistory) => {
  const contents = history.map(({ role, text }) => ({
    role,
    parts: [{ text }],
  }));

  try {
    const response = await fetch(import.meta.env.VITE_GEMINI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": import.meta.env.VITE_GEMINI_API_KEY,
      },
      body: JSON.stringify({ contents }),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(JSON.stringify(data, null, 2));

    console.log("Gemini response:", data);

    // Get the bot's actual reply
    const botReply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I'm sorry, I couldn't generate a response.";

    // Replace the "Thinking..." message with the actual reply
    setChatHistory((prev) => [
      ...prev.slice(0, -1),
      { role: "model", text: botReply },
    ]);
  } catch (error) {
    console.error("Error generating bot response:", error);
  }
};




  // Auto-scroll when chatHistory updates
  // useEffect(() => {
  //   chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [chatHistory]);
  useEffect(() => {
    chatBodyRef.current.scrollTo({top: chatBodyRef.current.scrollHeight, behavior: "smooth"});
  },[chatHistory]);

  return (
 <div className={`container ${showChatbot ? "show-chatbot" : ""}`}>
  <button
    onClick={() => setShowChatbot(prev => !prev)}
    id="chatbot-toggler"
  >
    {showChatbot ? (
      <span className="material-symbols-rounded">close</span>
    ) : (
      <span className="material-symbols-rounded">mode_comment</span>
    )}
  </button>
      <div className="chatbot-popup">
        {/* Chat Header */}
        <div className="chat-header">
          <div className="header-info">
            <Chatbot />
            <h2 className="logo-text">Chatbot</h2>
          </div>
          <button onClick={() => setShowChatbot((prev) => !prev)}
            className="material-symbols-rounded"
            aria-label="Minimize chat"
          >
            keyboard_arrow_down
          </button>
        </div>

        {/* Chat Body */}
        <div  ref={chatBodyRef} className="chat-body">
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
