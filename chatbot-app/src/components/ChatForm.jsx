import React, { useRef } from 'react';

function ChatForm({chatHistory, setChatHistory, generateBotResponse }) {
  const inputRef = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;

    setChatHistory(prevHistory => [
      ...prevHistory,
      { role: "user", text: userMessage }
    ]);

    inputRef.current.value = '';
    setTimeout(() => setChatHistory((history) =>[...history,{role:"model",text: "Thinking..."}]),600);

    generateBotResponse([...chatHistory, {role: "user", text: userMessage}]);
  };

  return (
    <form className="chat-form" onSubmit={handleFormSubmit}>
      <input
        type="text"
        placeholder="Type a message..."
        className="message-input"
        ref={inputRef}
        aria-label="Message input"
      />
      {/* <button
        className="material-symbols-rounded"
        type="submit"
        aria-label="Send message"
      >
        keyboard_arrow_upward
      </button> */}
    </form>
  );
}

export default ChatForm;
