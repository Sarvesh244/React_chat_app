import React, { useState } from "react";
import "./App.css";
import Picker from '@emoji-mart/react'
const user_list = ["Alan", "Bob", "Carol", "Dean", "Elin"];

const App = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== "") {
      const randomUser = user_list[Math.floor(Math.random() * user_list.length)];
      const newMessage = {
        id: Date.now(),
        user: randomUser,
        text: inputValue,
        likes: 0
      };
      console.log(Date.now())
      setMessages([...messages, newMessage]);
      setInputValue("");
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendMessage();
    }
  };
  const handleToggleEmojiPicker = () => {
    setShowEmojiPicker((prevState) => !prevState);
  };

  const handleSelectEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setInputValue(inputValue + emoji);
  };

  const handleOutsideClick = (event) => {
    const emojiPicker = document.querySelector(".emoji-mart");
    if (emojiPicker && !emojiPicker.contains(event.target)) {
      setShowEmojiPicker(false);
    }
  };
  React.useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);
  const handleLike = (messageId) => {
    const updatedMessages = messages.map((message) => {
      if (message.id === messageId) {
        return {
          ...message,
          likes: message.likes + 1
        };
      }
      return message;
    });

    setMessages(updatedMessages);
  };

  return (
    <div className="chat-container">
      <div className="message-thread">
        {messages.map((message) => (
          <div key={message.id} className="message">
            <span className="username">{message.user}</span>
            <div className="sc">
  <div className="tc">
              <span className="text">{message.text}</span>
  </div>

              <button className="like-button" onClick={() => handleLike(message.id)}>
                <img className="lb" alt="like" src="https://img.uxwing.com/wp-content/themes/uxwing/download/hand-gestures/like-button-icon.svg" />  ({message.likes})
              </button>
            </div>

          </div>
        ))}
      </div>
      <div className="input-box">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
        />
        <button className="emoji-button" onClick={handleToggleEmojiPicker}>
          😄
        </button>
        {showEmojiPicker && (
          <Picker
            set="apple"
            onSelect={handleSelectEmoji}
            showPreview={false}
            showSkinTones={false}
            style={{ position: "absolute", bottom: "50px", right: "10px" }}
          />
        )}
      </div>
    </div>
  );
};

export default App;
