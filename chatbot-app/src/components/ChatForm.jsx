import React, { useRef } from "react";

function ChatForm({ chatHistory, setChatHistory, generateBotResponse }) {
  const inputRef = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;

    // Add user's message immediately
    setChatHistory((prevHistory) => [
      ...prevHistory,
      { role: "user", text: userMessage },
    ]);

    // Clear input
    inputRef.current.value = "";

    // Optional: show "Thinking..." before the bot responds
    setChatHistory((prevHistory) => [
      ...prevHistory,
      { role: "model", text: "Thinking..." },
    ]);

    // Generate the actual bot response
    generateBotResponse(
      [...chatHistory, { role: "user", text: userMessage }],
      setChatHistory
    );
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
        className="send-btn material-symbols-rounded"
        type="submit"
        aria-label="Send message"
      >
        keyboard_arrow_upward
      </button> */}
    </form>
  );
}

export default ChatForm;
