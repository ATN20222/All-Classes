
import React, { useState } from "react";
import "./ChatComponent.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp, faPaperPlane, faX } from "@fortawesome/free-solid-svg-icons";
import MessageReceived from "./MessageReceived";
import MessageSent from "./MessageSent";

const ChatComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (e) => {
    // if (e.key === "Enter" && !e.shiftKey) {
    //   e.preventDefault(); 
    //   if (message.trim()) {
    //     onSubmit(message);
    //     setMessage(""); 
    //   }
    // }
  };

  const onSubmit = async (msg)=>{
    console.log("msg",msg);
  }

  const handleChange = (e) => {
    setMessage(e.target.value);
  };
  return (
<div className={`chat-container ${isOpen ? "chat-open" : ""}`}>
<div className="chat-header" onClick={toggleChat}>
        <span className="ChattedName">Ahmed Sabry</span>
        <span>  {isOpen ? <FontAwesomeIcon icon={faChevronDown}/> : <FontAwesomeIcon icon={faChevronUp}/>}</span>
      </div>
      {isOpen && (
        <div className="chat-body">

          <div className="MessagesContainer p-2">
            <MessageReceived text={"hello"} timestamp="Nov 27, 2024, 10:15 AM" />
            <MessageSent text={'hello hello'} timestamp="Nov 27, 2024, 10:15 AM" />
          </div>

          <div className="chat-input">
            <textarea 
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              type="text" 
              value={message}
              placeholder="Type a message..." 
            />
            <button 
            
            onClick={() => {
              if (message.trim()) {
                onSubmit(message);
                setMessage("");
              }
            }}  
            >
              <FontAwesomeIcon icon={faPaperPlane}/>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatComponent;
