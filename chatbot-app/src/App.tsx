import Chatbot from "./components/Chatbot";
// import index from "./index.css";
const App = () => {
  return (
    <div className="container">
      <div className="chatbot-popup">
        {/* Chat Header */}
        <div className="chat-header">
          <div className="header-info">
            <Chatbot />
            <h2 className="logo-text">Chatbot</h2>
          </div>
          <button className="material-symbols-rounded">
            keyboard_arrow_down
          </button>
        </div>

        {/* Chat Body */}
        <div className="chat-body">
          <div className="message bot-message">
            <Chatbot />
            <p className="message-text">
              Hey there! <br /> I'm your friendly chatbot. How can I assist you today?
            </p>
          </div>

          <div className="message user-message">
            <Chatbot />
            <p className="message-text">
              Lorem ipsum dolor, sit met consectetur adipisicing.
            </p>
          </div>

          {/* Chat Footer */}
          <div className="chat-footer">
            <form action="#" className="chat-form">
              <input
                type="text"
                placeholder="Type a message..."
                className="message-input"
                required
              />
              <button className="material-symbols-rounded">
                keyboard_arrow_upward
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
